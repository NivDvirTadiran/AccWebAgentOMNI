// FILE NAME     : accapi_work_thread.cpp
// -----------------------------------------------------------------------
//==========================[ Interface Dependencies ]================
#ifdef WIN32
#pragma warning(disable:4786)
#endif
// Infrastructure
#include <er_std_override.h>
#include <sollib.h>
#include <errno.h>
#include <map>
#include <openssl/md5.h>
#include <proj_gen.h>
#include <bswlog.h>
#include <bswinifile.h>
#include <bswcritsection.h>
#include <dbi_statement.h>
#include <dbi_resultset.h>
#include <dbi_dbmanager.h>
#include "lrl_le_defs.h"
#include "fullhttps_hook.h"
#include "ivr_ivrserveriface.h"
#include "./base64.h"
#include "accapi_crm_types.h"
#include "accapi_work_thread.h"
#include "accapi_ps_work_thread.h"
#include "accapi_entities.h"
#include "third_party_actions.h"
#include "accapi_web_gccs.h"

extern "C"
{
#include <smntrapi.h>
}
//---------------------------------- globals ------------------------
AGENTINFO_MAP agents_db;
SRV_MAP srv_db; // also gccs
GRP_MAP grp_db; //also gccs
CP_MAP  cp_db; //also gccs
WU_MAP  wu_db;
RC_MAP  rc_db;
COS_MAP cos_db;
CONN_MAP conn_db;
// gccs maps
SUP_MAP sup_map;
IVR_APP ivrapp_map;
LNG_MAP lng_db;
DL_MAP dl_map;
//
string ivrapp_map_json = ""; // done
string mail_db_json = "";//done
string dbConnections_db_json = ""; //done
string wsConnections_db_json = ""; //done
string lng_db_json = "";//done
string dll_json = "";
string srv_db_json = "";// done
string grp_db_json = ""; //done
string cp_db_json = "[]"; //dones
string irn_json = "[]"; //done

BswCritSection_c AGENTINFO_MUTEX;
BswCritSection_c reportLock_mutex;
AgentDbInfo_c* AGENTINFOfind(Ulong_t agent_id);
time_t  popfromqueue = 0;
time_t  pushtoqueue = 0;
//--------------------------------------------------------
void my_sleep(int sec);
extern string my_IP;


//==========================[ Static Singletons ]=====================
static AccapiEntities_c& accapi_entities_obj = AccapiEntities_c::GetAccapiEntitiesObj();


//=======================================[ReplaceSpesialJsonChars]==========================
string ReplaceSpesialJsonChars(char* s)
{
  string js = "";
  js = "";
  bool f = false;
  int len = strlen(s);
  char* q = NULL;
  for (int i = 0; i < len; ++i)
  {
    if (s[i] == 34) { js += "\\\""; } //  "
    else if (s[i] == '\\') { js += "\\\\"; }
    else if (s[i] == '\t') { js += "\\\t"; }
    else { js += s[i]; }
  }
  return js;
}

//=======================================[CheckStuckInLock]==============================
int CheckStuckInLock(AccapiWorkThread_c* SWT, int check_intreval, int check_timeout) {
  int count;
  accapi_my_print(0, "+++++++++Enter CheckStuckInLock +++++++++++++++\n");
  while (true)
  {
    Sleep(61000);
    if ((pushtoqueue) > (popfromqueue + 60))
    {
      count = AGENTINFO_MUTEX.GetLockCount();
      accapi_my_print(0, "CheckStuckInLock, AGENTINFO_MUTEX count: %d\n", count);
      count = reportLock_mutex.GetLockCount();
      accapi_my_print(0, "CheckStuckInLock, reportLock_mutex count: %d\n", count);
    }
  }
  return 0;
}

//=======================================[makekey]========================================
std::string makekey(const std::string& input, int inputLen)
{
  // md5 vars
  const char password[] = "password";
  unsigned char hash[MD5_DIGEST_LENGTH];
#ifndef WIN32
  MD5((const unsigned char*)input.c_str(), (int)input.length(), hash);
#endif
  char mdString[33];
  for (int i = 0; i < 16; i++)
  {
    sprintf(&mdString[i * 2], "%02x", (unsigned int)hash[i]);
  }
  return (char*)&mdString[0];
}


//=======================================[replace]======================================
bool replace(std::string& str, const std::string& from, const std::string& to) {
  size_t start_pos = str.find(from);
  if (start_pos == std::string::npos)
    return false;
  str.replace(start_pos, from.length(), to);
  return true;
}

//=======================================[replaceAll]====================================
void replaceAll(std::string& str, const std::string& from, const std::string& to) {
  if (from.empty())
    return;
  size_t start_pos = 0;
  while ((start_pos = str.find(from, start_pos)) != std::string::npos) {
    str.replace(start_pos, from.length(), to);
    start_pos += to.length(); // In case 'to' contains 'from', like replacing 'x' with 'yx'
  }
}

map<string, int>* webServerClient = new map<string, int>();

int Split(char* source, std::vector<string>& dest, char* search);
extern vector<string> RecieveQueu;

string GetRequesfromQueue(void);
extern vector<string> RecieveQueu;

extern AccapiPSThread_c* PST;

#include <sea_provider.h>
AccapiWorkThread_c* SWT = NULL;
//CEMAX
  //string CEMaxurl = "https://tbsu.cemax.cloud/api/Security/Security.svc/security/api/";
string CEMaxurlApi = "";
string CEMaxurlRegister = "";
string CEMaxuser = "apiUser";
string CEMaxpass = "CEMaxF5!";


//====================================================================
static SeaProvider_c& sea_provider = SeaProvider_c::GetSeaProvider();
static Ulong_t requestid = 1;

//===============================[getActionCode]===========================
//static int getActionCode(string action)
int AccapiWorkThread_c::getActionCode(string action)
{
  for (int i = 0; i < 200; ++i)
  {
    if (OPR[i].m_ActionCode == 999)
    {
      return -1;
    }
    if (action == OPR[i].m_ActionStr)
    {
      return OPR[i].m_ActionCode;
    }
  }
  return -1;
}

//===============================[ALL CRM EVENT METHODS]===================
//===============================[getActionCode]===========================
int getEventCode(string event)
{
  for (int i = 0; i < 50; ++i)
  {
    if (HTTPEVENTS[i].m_ActionCode == 999)
    {
      return -1;
    }
    if (event == HTTPEVENTS[i].m_ActionStr)
    {
      return HTTPEVENTS[i].m_ActionCode;
    }
  }
  return -1;
}

//
int ParseAsyncHook(string dll_note, vector<KeywordAndparam>& ParsedRequest);
//
map<int, Event_c> Events_map;


// ====================== [Read accAgentEvents.cfg..ini] ====================
int ReadAndPrepareaccAgentEvents(string& gccsstr) {
  string b64 = "";
  string accAgentEvents = "../Agents/accAgentEvents.cfg";
  Events_map.clear();
  if (SWT->ConvertFileToB64(accAgentEvents, b64) == BSWRC_FAIL)
  {
    accapi_my_print(0, " ++ Fail to read  accAgentEvents => cannot open accAgentEvents.cfg\n");
  }
  string events;
  vector<KeywordAndparam> KAP;

  bool b = Base64::Decode(b64, &events);
  int res = ParseAsyncHook(events, KAP);
  gccsstr = "";
  if (res == -1)
  {
    accapi_my_print(0, "prepareAgentEvents, ERROR parse accAgentEvents.cfg\n");
    return -1;
  }
  accapi_my_print(0, "Number of Keywords: %d\n", KAP.size());
  int textOffset = -1;
  Event_c* eventObj = NULL;
  Action_c* actionObj = NULL;
  EntityFilter_c* filterObj = NULL;
  for (int i = 0; i < KAP.size(); ++i)
  {
    char a[30]; sprintf(&a[0], "%d", KAP[i].MaxItems);
    gccsstr += KEYWORDS[KAP[i].Keyword].m_KeywodnStr; gccsstr += "#1#"; gccsstr += KAP[i].Param + "#1#"; gccsstr += KAP[i].Param1; gccsstr += "#9#\n";
    //    gccsstr += KAP[i].Delimter; gccsstr += "#4#"; gccsstr += &a[0]; gccsstr += "#5#";  gccsstr += "#3##9#\n";

    switch (KAP[i].Keyword)
    {
      case EVENT:
      {
        if (eventObj != NULL)
        {
          if (actionObj != NULL)
          {
            actionObj->m_hookText = events.substr(textOffset, KAP[i].TextOffset - textOffset);
            eventObj->m_ActionVec.push_back(*actionObj);
            actionObj = NULL;
          }
          Events_map[eventObj->m_Type] = *eventObj;
          eventObj = NULL;
        }
        int ecode = getEventCode(KAP[i].Param);
        if (ecode == -1)
        {
          accapi_my_print(0, "ReadAndPrepareaccAgentEvents, Error: offset: %d, unknown Event: %s\n", KAP[i].TextOffset, KAP[i].Param.c_str());
          return -1;
        }
        eventObj = new Event_c;
        eventObj->m_Type = ecode;
      }
      break;
      //
      case ACTION:
      {
        if (actionObj != NULL)
        {
          actionObj->m_hookText = events.substr(textOffset, KAP[i].TextOffset - textOffset);
          eventObj->m_ActionVec.push_back(*actionObj);
          actionObj = NULL;
        }

        actionObj = new Action_c;
        actionObj->m_Desc = KAP[i].Param;
        textOffset = KAP[i].TextOffset;
      }
      break;
      //
      case IRNX:
      case SERVICEX:
      case GROUPX:
      {
        if (actionObj == NULL)
        {
          accapi_my_print(0, "ReadAndPrepareaccAgentEvents, Error: Missing Action before Filter,  offset: %d, filter: %s\n",
            KAP[i].TextOffset, KEYWORDS[KAP[i].Keyword].m_KeywodnStr.c_str());
          return -1;
        }
        if (filterObj != NULL)
        {
          actionObj->m_FilterVec.push_back(*filterObj);
          filterObj = NULL;
        }
        filterObj = new EntityFilter_c;
        filterObj->m_Type = KAP[i].Keyword;
        filterObj->m_filter = KAP[i].Param;
      }
      break;
      //
      default:
      if (filterObj != NULL)
      {
        actionObj->m_FilterVec.push_back(*filterObj);
        filterObj = NULL;
      }
      break;
    }
  }
  accapi_my_print(4, "\n%s\n", gccsstr.c_str());
  //
  if (actionObj != NULL)
  {
    actionObj->m_hookText = events.substr(textOffset, events.length() - textOffset);
    eventObj->m_ActionVec.push_back(*actionObj);
    Events_map[eventObj->m_Type] = *eventObj;
    //
    //for (int j = 0; j < eventObj->m_ActionVec.size(); ++j)
    //{
    //  Action_c a = eventObj->m_ActionVec[j];
    //  accapi_my_print(4,"Action, Desc: %s, filter size: %d\n", a.m_Desc.c_str(), a.m_FilterVec.size());
    //  for (int k = 0; k < a.m_FilterVec.size(); ++k)
    //  {
    //    accapi_my_print(4, "   Type: %d, filter: %s\n", a.m_FilterVec[k].m_Type, a.m_FilterVec[k].m_filter.c_str());

    //  }
    //  accapi_my_print(4, "------------------------------------\nHookText, text\n %s\n", a.m_hookText.c_str());
    //}
    //accapi_my_print(4, "================================================\n\n");

  }
  //accapi_my_print(0, "%s. offset: %d\n", KEYWORDS[KAP[i].Keyword].m_KeywodnStr.c_str(), KAP[i].TextOffset);
  return 0;
}


//===============================[HookFilter]===========================================
Action_c* HookFilter(int eventCode, string irn, string service, string group)
{
  map<int, Event_c>::iterator it;
  it = Events_map.find(eventCode);
  Action_c* found = NULL;
  if (it != Events_map.end()) // find hook event
  {
    for (int i = 0; i < it->second.m_ActionVec.size() && found == NULL; ++i)
    {
      Action_c* a = &(it->second.m_ActionVec[i]);
      if (a->m_FilterVec.size() == 0)
      {
        found = a;
        return found;
      }
      else
      {
        for (int j = 0; j < a->m_FilterVec.size() && found == NULL; ++j)
        {
          if (a->m_FilterVec[j].m_filter == "")
          {
            found = a;
            accapi_my_print(0, "FILTER, found empty text filter: %s\n", KEYWORDS[a->m_FilterVec[j].m_Type].m_KeywodnStr.c_str());
            return found;
          };

          switch (a->m_FilterVec[j].m_Type)
          {
            case IRNX:
              if (irn == a->m_FilterVec[j].m_filter) { found = a; accapi_my_print(0, "FILTER, found IRN: %s\n", irn.c_str()); }
            break;
            case SERVICEX:
              if (service == a->m_FilterVec[j].m_filter) { found = a; accapi_my_print(0, "FILTER, found SERVICE: %s\n", service.c_str()); }
            break;
            case GROUPX:
              if (group == a->m_FilterVec[j].m_filter) { found = a; accapi_my_print(0, "FILTER, found GROUP: %s\n", group.c_str()); }
            break;
            //
            //default: {found = a; accapi_my_print(0, "FILTER, Empty filter - always execute this event: %s\n", group.c_str()); }
          }
        }
      }
    }
  }
  return found;
}


// ===================================[ ExecFullHttp ] ===========================
void ReplaceScfNameById(char* cpfX, REPORT report);
//
Ulong_t ExecuteFromHookEx(Ulong_t call_id, char* serialized_cp, Ulong_t& exit_code, Ulong_t timeout, string dll_note);
//
int ExecFullHttpThread(REPORT report, Action_c* action, const string cpf)
{
  //17-Jul-2024 YR BZ#59783
  int res = -1;
  AgentDbInfo_c* ADI = AGENTINFOfind(report.m_AgentId);

  if (action == NULL)
    return res;

  if (ADI == NULL)
    return res;

  accapi_my_print(0, "ExecFullHttpThread ==> %s   %s\n", action->m_Desc.c_str(), action->m_hookText.c_str());

  char* cpfX = new char[32000 + 1];
  string req = action->m_hookText;
  string cpfY = "";
  memset(&cpfX[0], 0, 31999);
  sprintf(&cpfX[0], "%s", cpf.c_str());
  Ulong_t exitcode = 0;
  accapi_my_print(0, "ExecFullHttpThread ==> Before ExecuteFromHookEx - CP Data In: %s\n", cpfX);
  res = ExecuteFromHookEx((Ulong_t)0, &cpfX[0], exitcode, (Ulong_t)30, req);
  accapi_my_print(0, "ExecFullHttpThread ==> After ExecuteFromHookEx - RetCode: %d, CP Data Out: %s\n", res, cpfX);
  report.m_Action = "UpdateCP";
  ReplaceScfNameById(cpfX, report);
  report.m_MoreDetail = &cpfX[0];
  report.m_DetailedAction = HTTPEVENTS[ADI->m_LastEvent].m_ActionStr;
  SWT->m_sea_reply.UpdateAgentDbInfo(ADI->m_Number, AccapiCrmType_c::Login, report, ADI->m_AgentWSid, ADI->m_SessionId);
  my_sleep(100);
  delete[] cpfX;
  return res;
}


// ===================================[ SimpleExecFullHttp ] ===========================
int SimpleExecFullHttp(void*, const string request, const string cpf)
{
  char* cpfX = new char[32000 + 1];
  memset(&cpfX[0], 0, 31999);
  sprintf(&cpfX[0], "%s", cpf.c_str());
  Ulong_t exitcode = 0;
  int   res = ExecuteFromHookEx((Ulong_t)0, &cpfX[0], exitcode, (Ulong_t)30, request);
  my_sleep(100);
  delete[] cpfX;
  return res;
}

//====================================[ end hook functions ==========================


//=======================[getCemaxObj]===============================================
CEMax* getCemaxObj()
{
  return SWT->m_CEMax;
}

//===============================[AGENTINFOfind]======================================
AgentDbInfo_c* AGENTINFOfind(Ulong_t agent_id)
{
  AgentDbInfo_c* ADI = NULL;
  AGENTINFO_MAP_IT it;
  AGENTINFO_MUTEX.Lock();
  //
  it = agents_db.find(agent_id);
  if (it != agents_db.end())
  {
    ADI = &it->second;
  }
  AGENTINFO_MUTEX.Unlock();

  return ADI;
}

//==============================[AGENTINFOfindByExtension]==================================
string AGENTINFOfindByExtension(string extension, string agent_no)
{
  AGENTINFO_MUTEX.Lock();

  AgentDbInfo_c* ADI = NULL;
  string name = "";
  AGENTINFO_MAP_IT it = agents_db.begin();
  for (it; it != agents_db.end(); ++it)
  {
    ADI = &(*it).second;
    if (ADI->m_allready_confirmed == true && extension == ADI->m_Extenstion)
    {
      name = &ADI->m_Name[0];
      break;
    }
  }
  AGENTINFO_MUTEX.Unlock();

  return name;
}

//==============================[ PrepareDeniedDetails ]===========================
void PrepareDeniedDetails(Ushort_t cause, AgentDbInfo_c* ADI, string ext, REPORT& report)
{
  string s;
  switch (cause)
  {
    case SAME_AGENT_LOGGED_IN_TO_ANOTHER_STATION:
    case LOGGED_ON_TO_ANOTHER_EXT: // Logged on to another extension, get the extension it logged to
      accapi_my_print(0, "PrepareDeniedDetails-> agent: %s, Logged on to another extension %s, try to Log to ext: %s\n", ADI->m_Name, ADI->m_TempExtension.c_str(), ext.c_str());
      ADI->m_Extenstion = ADI->m_TempExtension;
      report.m_MoreDetail = (char*)"prevext:" + ADI->m_TempExtension + (char*)";ext:" + ext;
    break;
    //
    case AGENT_ALREADY_LOGGED_AT_LRL: //Same agent logged in on same extension - logoff
      accapi_my_print(0, "PrepareDeniedDetails-> agent: %s, Logged on to same extension %s\n", s.c_str(), ext.c_str());
    break;
    //
    case EXTENSION_IS_ALREADY_IN_USE_BY_AGENT:
      s = AGENTINFOfindByExtension(ext, &ADI->m_Number[0]);
      accapi_my_print(0, "PrepareDeniedDetails-> agent: %s, Extension already in use %s\n", s.c_str(), ext.c_str());
      report.m_MoreDetail = (char*)"agt:" + s + (char*)";ext:" + ext;
    break;
    default:break;
  }
}

//==============================[ push report]=================================
void PushReportToAgent(AgentDbInfo_c* ADI, REPORT& report)
{
  reportLock_mutex.Lock();
  ADI->m_report.push_back(report);
  reportLock_mutex.Unlock();
}

//==============================[ SendPersonalStatistics ]=================================
void SendPersonalStatistics(char* ev_data)
{
  vector<string> v;
  int count = Split(ev_data, v, (char*)"|");
  if (count < 10)
  {
    accapi_my_print(0, "SendPersonalStatistics wrong data: %s\n", ev_data);
    return;
  }
  Ulong_t id = atoi(v[1].c_str());
  AgentDbInfo_c* ADI = AGENTINFOfind(id);
  if (ADI == NULL)
  {
    accapi_my_print(0, "SendPersonalStatistics can't find agent id : %s\n", v[1].c_str());
    return;
  }
  REPORT report;
  report.m_DevId = ev_data;
  ADI->m_StartStateTime = time(0);
  ADI->m_Changed = true;
  report.m_ClientId = ADI->m_AgentWSid;
  report.m_SessionId = ADI->m_SessionId;
  report.m_Action = "__personalStatistics";
  PushReportToAgent(ADI, report);
}
//
//==============================[ ClearAgentReport ]=================================
void ClearAgentReport(vector<REPORT>& report)
{
  reportLock_mutex.Lock();
  report.clear();
  reportLock_mutex.Unlock();
}
//
//==============================[ SendPersonalStatisticsGrp ]=================================
void SendPersonalStatisticsGrp(char* ev_data)
{
  AGENTINFO_MAP_IT it;
  AGENTINFO_MUTEX.Lock();
  for (it = agents_db.begin(); it != agents_db.end(); ++it)
  {
    AgentDbInfo_c* ADI = &(it->second);
    if (ADI->m_allready_confirmed == true)
    {
      REPORT report;
      report.m_DevId = ev_data;
      ADI->m_StartStateTime = time(0);
      ADI->m_Changed = true;
      report.m_ClientId = ADI->m_AgentWSid;
      report.m_SessionId = ADI->m_SessionId;
      report.m_Action = "__personalGrpStatistics";
      PushReportToAgent(ADI, report);
      //ADI->m_report.push_back(report);
    }
  }
  AGENTINFO_MUTEX.Unlock();
}


//==============================[ prepareOneGroup ]=================================
void prepareOneGroup(Groups_c& GRP, string& json)
{
  char grpid[100], isactive[10];
  sprintf(&grpid[0], "%d", GRP.m_GrpId);

  sprintf(&isactive[0], "%d", (Ulong_t)GRP.m_on);

  json += "{\"group_id\":"; json += &grpid[0]; json += ",";
  string name = &GRP.m_GrpName[0];

  replaceAll(name, "\"", "-");

  json += "\"group_name\":\""; json += name; json += "\",";
  json += "\"group_remarks\":"; json += &grpid[0]; json += ",";
  json += "\"group_is_active\":"; json += &isactive[0]; json += "},";
}

//==============================[ preapreAgennJsontxt ]=================================
/*{"agent":
[
{"agent":
[
         {"person_first_name":"test1", "person_last_name":"test1", "legacy_ident_id":"678","person_email_address":"", "person_is_active":1,"person_mobile_phone_no":"","person_password":"test"},
 ]
*/
string preapreAgennJsontxt()
{
  AGENTINFO_MAP_IT it;
  string json = "{\"agent\":[";
  GRP_MAP_IT itg;

  AGENTINFO_MUTEX.Lock();
  for (it = agents_db.begin(); it != agents_db.end(); ++it)
  {
    AgentDbInfo_c& ADI = it->second;
    string name = &ADI.m_Name[0];
    replaceAll(name, "\"", "-");

    json += "{\"person_first_name\":\""; json += name; json += "\",";
    json += "\"person_last_name\":\""; json += name; json += "\",";
    json += "\"legacy_ident_id\":\""; json += &ADI.m_Number[0]; json += "\",";
    json += "\"person_email_address\":\""; json += ""; json += "\",";
    json += "\"person_is_active\":"; json += "1"; json += ",";
    json += "\"person_mobile_phone_no\":\""; json += ""; json += "\",";
    json += "\"person_password\":\""; json += &ADI.m_Pass[0];
    json += "\",\"groups\":[";
    std::vector<string> g;
    int count = Split((char*)ADI.m_primary_groups.c_str(), g, (char*)"|");
    if (g.size() < 2)
    {
      json += "]},";
    }
    else
    {
      //accapi_my_print(0, "ADI groups : % d, %s\n", ADI.m_primary_groups.c_str());

      for (int i = 0; i < g.size(); ++i)
      {
        if (g[i] != "") //
        {
          Ulong_t t = atoi(g[i].c_str());
          itg = grp_db.find(t);
          if (itg != grp_db.end())
          {
            prepareOneGroup(itg->second, json);
          }
        }
      }
      json = json.substr(0, json.length() - 1);
      json += "]},";
    }
  }
  json = json.substr(0, json.length() - 1);
  json += "],\"action_type_id\":2}";
  AGENTINFO_MUTEX.Unlock();
  accapi_my_print(0, "preapreAgennJsontxt==> %.256s\n", json.c_str());
  return json;

}


//==============================[ preapreGroupsJsontxt ]=================================
/*
{"groups": [{"group_id":-1, "group_name":"aa","group_remarks":"111","group_is_active": 1}],"action_type_id":4}
*/
string preapreGroupsJsontxt()
{
  GRP_MAP_IT it;
  string json = "{\"groups\":[";
  AGENTINFO_MUTEX.Lock();
  for (it = grp_db.begin(); it != grp_db.end(); ++it)
  {
    prepareOneGroup(it->second, json);
  }
  json = json.substr(0, json.length() - 1);
  json += "],\"action_type_id\":2}";
  AGENTINFO_MUTEX.Unlock();
  accapi_my_print(5, "preapreGroupsJsontxt==> %s\n", json.c_str());
  return json;
}


//==============================[ GetCEMaxToken ]=================================
Ulong_t GetCEMaxToken()
{
  if (SWT->m_CEMax == NULL)
  {
    return -1;
  }
  Ulong_t res = SWT->m_CEMax->CEMaxInit();
  if (res == 0)
  {
    string groupsjson = preapreGroupsJsontxt();
    res = SWT->m_CEMax->SendGroups(groupsjson);
    //
    string agentsJson = preapreAgennJsontxt();
    res = SWT->m_CEMax->SendAgents(agentsJson);
  }
  return res;
}

//
// ========================[SendAllAgentsIamINIdleMode]============================
void SendAllAgentsIamINIdleMode()
{
  AGENTINFO_MAP_IT it;
  if (agents_db.size() <= 1) return;
  AGENTINFO_MUTEX.Lock();
  string jsonstring = "[";
  for (it = agents_db.begin(); it != agents_db.end(); ++it)
  {
    AgentDbInfo_c& ADIX = it->second;
    if (ADIX.m_allready_confirmed == true && ADIX.m_LoginLogout == true)
    {
      string name = &ADIX.m_Name[0];
      string number = &ADIX.m_Number[0];

      replaceAll(name, "\"", "-");
      jsonstring += "{\"name\": \"" + name;
      jsonstring += "\", \"number\": \"" + number;
      jsonstring += "\", \"ext\": \"" + ADIX.m_Extenstion;
      jsonstring += "\"} ,";
    }
  }
  jsonstring = jsonstring.substr(0, jsonstring.length() - 1);
  jsonstring += "]";
  accapi_my_print(6, "SendAllAgentsIamINIdleMode, %s\n", jsonstring.c_str());

  string B64 = "";
  Base64::Encode(jsonstring, &B64);

  for (it = agents_db.begin(); it != agents_db.end(); ++it)
  {
    AgentDbInfo_c& ADIX = it->second;
    if (ADIX.m_allready_confirmed == true && ADIX.m_LoginLogout == true)
    {
      REPORT report;
      report.m_Action = "agentLoginsList";
      report.m_MoreDetail = B64;
      SWT->m_sea_reply.UpdateAgentDbInfo(ADIX.m_Agent_id, 0, report);
    }
  }
  AGENTINFO_MUTEX.Unlock();
}


//==============================[ CheckKeepAlive ]=================================
int CheckKeepAlive(AccapiWorkThread_c* SWT, int keepalive_check_intreval, int keepalive_timeout)
{
  AGENTINFO_MAP_IT it;
  while (1)
  {
    time_t ttt = time(0);
    //accapi_my_print(0,"CheckKeepAlive ttt %d\n", ttt);
    AGENTINFO_MUTEX.Lock();
    for (it = agents_db.begin(); it != agents_db.end(); ++it)
    {
      AgentDbInfo_c& ADI = it->second;
      if (ADI.m_allready_confirmed == true)
      {
        int diff = ttt - ADI.m_LastKeeAliveTime;
        //2019-06-19 AlisherM & Shaul BZ#50087: check if time values are valid
        if ((ADI.m_LastKeeAliveTime < 1560950842) || (ttt < 1560950842))
        {
          accapi_my_print(0, "CheckKeepAlive WARNING: agent %s, sessionid %s, diff %d, keepalive_check_intreval %d, keepalive_timeout %d, ttt %d, m_LastKeeAliveTime %d\n", &ADI.m_Number[0], ADI.m_SessionId.c_str(), diff, keepalive_check_intreval, keepalive_timeout, ttt, ADI.m_LastKeeAliveTime);
        }

        //2019-06-19 AlisherM & Shaul BZ#50088: print warning message every 30-60-90 sec, and force logoff after 120 sec
        if (diff > keepalive_timeout)
        {
          accapi_my_print(0, "CheckKeepAlive WARNING: agent %s, sessionid %s, diff %d > keepalive_timeout %d, force logoff agent due to keepalive timeout, sending agentDenied, ttt %d, m_LastKeeAliveTime %d\n", &ADI.m_Number[0], ADI.m_SessionId.c_str(), diff, keepalive_timeout, ttt, ADI.m_LastKeeAliveTime);
          //sea_provider.LogoutAgent(requestid++,ADI.m_Agent_id);
          SWT->agentDisconnect(&ADI, true);
          REPORT report;
          // try to logon to other extension and denied for some reason
          report.m_Action = "agentDenied";
          report.m_CallingCalledDevId = ADI.m_Extenstion;
          report.m_Code1 = 16;
          SWT->m_sea_reply.UpdateAgentDbInfo(ADI.m_Number, AccapiCrmType_c::Login, report, ADI.m_AgentWSid, ADI.m_SessionId);
          //sendResponse(ADI.m_AgentWSid,"KEEPALIVE CHECK");
        }
        else if (diff > keepalive_check_intreval)
        {
          accapi_my_print(0, "CheckKeepAlive WARNING: agent %s, sessionid %s, diff %d > keepalive_check_intreval %d, ttt %d, m_LastKeeAliveTime %d\n", &ADI.m_Number[0], &ADI.m_SessionId[0], diff, keepalive_check_intreval, ttt, ADI.m_LastKeeAliveTime);
        }
      }
    }
    AGENTINFO_MUTEX.Unlock();
    my_sleep(keepalive_check_intreval * 1000);
    //accapi_my_print(0,"Check keealive interval %d\n", keepalive_check_intreval);
  }
  return 0;
}
//==============================[getClassOfServiceById]=================================
string getClassOfServiceById(Ulong_t cosid)
{
  string cosStr = "";
  COS_c* cos = NULL;
  COS_MAP_IT it;

  AGENTINFO_MUTEX.Lock();
  it = cos_db.find(cosid);
  if (it != cos_db.end())
  {
    cos = it->second;
    cosStr = cos->m_CosStr;
  }
  AGENTINFO_MUTEX.Unlock();
  accapi_my_print(5, "getClassOfServiceById, cos-id: %d, %s\n", cosid, cosStr.c_str());
  return cosStr;
}
//==============================[ strncmpiX ]
int strncmpiX(const char* str1, const char* str2, int n)
{
  if (!str1 || !str2)
  {
    SetLastError(ERROR_INVALID_PARAMETER);
    return -1;
  }
  if (n != (int)strlen(str2))
  {
    return -1;
  }
  //n = min(min(n, (int) strlen(str1)), (int) strlen(str2));

  for (int i = 0; i < n; ++i)
  {
    int ret = tolower(*str1) - tolower(*str2);
    if (ret) return ret;
    str1++;
    str2++;
  }
  return 0;
}
//==============================[AGENTINFOfindByAgenNumber]==========================================
//==============================[AGENTINFOfindByAgenNumber]==========================================
AgentDbInfo_c* AGENTINFOfindByAgentName(string agent_name)
{
  vector<string> splited;
  int count = Split((char*)agent_name.c_str(), splited, (char*)"@");
  if (splited.size() < 1) return NULL;
  AGENTINFO_MAP_IT it = agents_db.begin();
  int x;
  for (it; it != agents_db.end(); ++it)
  {
    AgentDbInfo_c& ADI = (*it).second;
    x = strncmpiX(splited[0].c_str(), &(ADI.m_Name[0]), (int)splited[0].length());
    if (x == 0)
    {
      return &ADI;
    }
    if (agent_name == &ADI.m_Number[0])
    {
      return &ADI;
    }
  }
  return NULL;
}
//==============================[AGENTINFOfindByAgenNumber]==========================================
AgentDbInfo_c* AGENTINFOfindByAgenNumber(string agent_no)
{
  AGENTINFO_MUTEX.Lock();

  SWT->m_IsSSOfreeSseating = FALSE;
  SWT->m_IsSSO = FALSE;
  if (EosHAGetSSOStatus() == EOS_HA_SSO_ENABLE) SWT->m_IsSSO = TRUE;
  //
  if (EosHAGetSSOFreeSeating() == EOS_HA_SSO_ENABLE) SWT->m_IsSSOfreeSseating = TRUE;
  //
  if (SWT->m_IsSSO == TRUE)
  {
    AGENTINFO_MUTEX.Unlock();
    return AGENTINFOfindByAgentName(agent_no);
  }
  AgentDbInfo_c* ADI = NULL, * A;
  AGENTINFO_MAP_IT it = agents_db.begin();
  for (it; it != agents_db.end(); ++it)
  {
    A = &(*it).second;
    if (agent_no == &A->m_Number[0])
    {
      ADI = A;
      break;
    }
  }
  AGENTINFO_MUTEX.Unlock();
  return ADI;
}
//
//=======================================[CheckSelectedSript]=====================================
string CheckSelectedSript(string name , Ulong_t scriptId)
{
  AGENTINFO_MUTEX.Lock();
  string ret = (char*)"";
  string supname = "";
  SUP_MAP_IT it = sup_map.begin();
  for (it; it != sup_map.end(); ++it)
  {
    SUP_c& sup = it->second;
    supname = &sup.m_supName[0];
    if (sup.m__supEntriesVec.size() == 1)
    {
      if (supname != name)
      {
        if (sup.m__supEntriesVec[0]->selectedScript == scriptId)
        {
          ret = supname;
          break;
        }
      }
    }

  }
  AGENTINFO_MUTEX.Unlock();

  return ret;
}
//=======================================[CheckSameSupIp]=====================================
bool CheckSameSupIp(string ip,string &loggedUser)
{
  loggedUser = "";
  AGENTINFO_MUTEX.Lock();
  bool ret = false;
  SUP_MAP_IT it = sup_map.begin();
  for (it; it != sup_map.end(); ++it)
  {
    SUP_c& sup = it->second;
    if (sup.m__supEntriesVec.size() == 1)
    {
      if (sup.m__supEntriesVec[0]->m_Ip == ip && sup.m__supEntriesVec[0]->m_ClientId != -1)
      {
        loggedUser = sup.m_supName;
        ret = true;
        break;
      }
    }
  }
  AGENTINFO_MUTEX.Unlock();

  return ret;
}

// 
//=======================================[getSupUser]===========================================
SUP_c* getSupUser(string user)
{
  char* s = (char*)user.c_str();
  //for (int i = 0; i < user.length(); ++i)
  //  s[i] = tolower(s[i]);

  SUP_MAP_IT it = sup_map.find(user);
  if (it != sup_map.end())
  {
    return &it->second;
  }
  return NULL;
}


//===============================[SendToAuditLog ]======================================
int SendToAuditLog(string     loginName,
                   string     displayName,
                   string     userId,
                   string     serverName,
                   string     actionType,
                   string     objectType,
                   string     objectId,
                   int        objectTenant,
                   string     userIp);
//


//===============================[AgentExists ]======================================
int AgentExists(string agent_no, int clientId, string sessionId, string action, string& params)
{
  AgentDbInfo_c* ADI = AGENTINFOfindByAgenNumber(agent_no);

  if (ADI != NULL)
  {
    ADI->m_LastKeeAliveTime = time(0);
    if (action == "Logon" || action == "Logongate")
    {
      (*ADI).m_AgentWSid = clientId;
      (*ADI).m_SessionId = sessionId;
      ClearAgentReport((*ADI).m_report); // every logon agent clear all messages for him
    }
    else
    {
      if ((strstr(params.c_str(), "KEEPALIVE,true")) != NULL)
      {
        EosHAServerStatus_t  serverstaus = EosHAGetLocalStatus(__FILE__, __LINE__);
        if (!(EOS_HAS_ACTIVE_SA == serverstaus || EOS_HAS_ACTIVE == serverstaus))
        {
          accapi_my_print(0, "AgentExists Keepalive identify not active: client id = %d\n", clientId);
          return -1000;
        }

        if (ADI->m_allready_confirmed == false) // web agent think it logoned but accapi not
        {
          accapi_my_print(0, " ***** Send Relogon to Agent no: %s *****\n", agent_no.c_str());
          REPORT report;
          report.m_Action = "ReLogon";
          SWT->m_sea_reply.UpdateAgentDbInfo(agent_no.c_str(), AccapiCrmType_c::Login, report, clientId, sessionId);
        }
      }
    }
    //if ()
    return 0;
  }
  else //check supervisor
  {
    SUP_c* sup = getSupUser(agent_no);
    if (sup == NULL) {
      return -1; 
    }
    supEntry* entry = NULL;
    time_t lastDate = time(0);
    if (action.find("suplogon") == string::npos)
    //if (action != "suplogon" && action != "suplogongate")
    {
      sup->m_LastKeeAliveTime = time(0);
      return 0;
    }
    else
    //if (action == "suplogon" || action == "suplogongate")
    {
      ACC_WebApps_t   sup_type = WEB_APP_NULL;
      vector<string>  v;
      Split((char*)params.c_str(), v, (char*)",");
      string loggedUser = "";
      bool sameIp = CheckSameSupIp(v[4], loggedUser);
      int smclientid = -1;

      if (action == "admin_suplogon")
        sup_type = WEB_ADMIN;
      else if (action == "admin_suplogongate")
        sup_type = WEB_ADMIN_GATE;
      else if (action == "gccs_suplogon")
        sup_type = WEB_GCCS;
      else if (action == "gccs_suplogongate")
        sup_type = WEB_GCCS_GATE;

      if (v.size() >= 8)
      {
        smclientid = atoi(v[7].c_str());
      }
      if (sameIp == true && sup->m__supEntriesVec.size() == 0)
      {
        if (loggedUser != "" && agent_no != loggedUser)
        {
          accapi_my_print(0, "AgentExists, Ignore user on same IP: %s\n", v[4].c_str());
          return -17;
        }

      }
      if (sup->m__supEntriesVec.size() == 1)
      {
        entry = sup->m__supEntriesVec[0];
        if (sameIp == true)
        {
          if (entry->sessionId == sessionId && (lastDate - sup->m_LastKeeAliveTime) < 120)
          {
            accapi_my_print(0, "AgentExists, Ignore user on same IP: %s\n", v[4].c_str());
            return -17;
          }
          if ((entry->m_ClientId != -1) && (entry->m_supType == sup_type))
          {
            SWT->SupLogoff(action, sup, entry, "Old user logoff when it should not send logon");
          }

        }
        //7-Jul-2024 YR BZ#59733
        //if ((lastDate - sup->m_LastKeeAliveTime) > 120) // no keeaplive from this sup user with 2 minutes logoff and continue to suplogon
        //{
        //  SWT->SupLogoff(action, sup, entry, " User logoff when it should it do not get keepalive more than 120 secs");
        //}
        //else if (v.size() >= 8)
        //{
        //  accapi_my_print(0, "AgentExists, client id: %s\n", v[7].c_str());
        //  if (smclientid > 0)
        //  {
        //    SWT->SupLogoff(action, sup, entry, " May accapi Crashed, so logoff from SM");
        //  }
        //}
        //else
        //{
        //  accapi_my_print(0, "Agent Already Logoned: %s\n", v[4].c_str());
        //  return -18;
        //}
      }
      entry = new supEntry(sup_type, sessionId, clientId, &sup->m_supName[0], sup->m_supLevel);
      accapi_my_print(0, "AgentExists, Add new user on supervisor: %s, sessionId: %s\n", entry->m_supName.c_str(), sessionId.c_str());
      sup->m__supEntriesVec.push_back(entry);
      entry->m_sid = clientId;
    }
  }
  return 0;//agent not exists
}



//===============================[AGENTINFOerase]======================================
void AGENTINFOerase(Ulong_t agent_id)
{
  AGENTINFO_MAP_IT it;
  AGENTINFO_MUTEX.Lock();
  it = agents_db.find(agent_id);

  if (it != agents_db.end())
  {
    if (it->second.m_allready_confirmed == true) // not logged in
    {
      it->second.m_allready_confirmed = false;
      sprintf(it->second.m_Pass, "Deleted\0");
      accapi_my_print(0, "AGENTINFOerase==> logic  erase agent no: %s, because it still logoned\n", it->second.m_Number);

      REPORT report;
      report.m_Code1 = 19; // agent not exists any more
      report.m_Action = "forcedLogoff";
      string ext = it->second.m_Extenstion;
      SWT->m_sea_reply.UpdateAgentDbInfo(it->second.m_Number, AccapiCrmType_c::Login, report, it->second.m_AgentWSid, it->second.m_SessionId);
    }
    else
    {
      agents_db.erase(it);
    }
  }
  AGENTINFO_MUTEX.Unlock();
}
void AGENTINFOinsert(Ulong_t agent_id, AgentDbInfo_c* ADI)
{
  AGENTINFO_MUTEX.Lock();
  agents_db[agent_id] = *ADI;
  AGENTINFO_MUTEX.Unlock();
}

#define SEC_WEB_AGENT                         "WEB-AGENT"
#define VAL_PORT                              "Port"
#define VAL_PORT_DEFAULT                      9275
#define VAL_KEEPALIVE_CHECK_INTERVAL          "KeepAliveCheckInterval"
#define VAL_KEEPALIVE_CHECK_INTERVAL_DEFAULT  30
#define VAL_KEEPALIVE_TIMEOUT                 "KeepAliveTimeout"
#define VAL_KEEPALIVE_TIMEOUT_DEFAULT         600
#define VAL_WEBPORT_NE                        999
#define VAL_WEBPORT_DEFAULT                   8445
#define STR_FAIL                              "9"
#define GETSTRING_ERROR                       1
#define SEC_NET                               "NET"
#define VAL_EXT_IPADDRESS                     "ExtWebIpAddress"
#define VAL_EXT_PORT                          "ExtWebPort"

int dummyInterval = 1000;
int dummyAgent = 1001;

//===============================[GetMoreParamsFromSoftParam]========================
string my_IP = "";
// get statiscis flag and number of online threads from soft_param
void     GetMoreParamsFromSoftParam(string& ip_Address, int* portNo, int* webPortNo, int* keepalive_check_intreval, int* keepalive_timeout, string& crmCode)
{
  char cBuff[_MAX_PATH + 10];
  LONG  lResult;
  char a[_MAX_PATH];
  crmCode = "Acc Web Agent";
  ip_Address = "127.0.0.1";
  BswIniFile_c iniFile("../Registry.ini");
  BswIniFile_c CloudIniFile("/home/aeonixadmin/cloud.ini");
  // from cloud.ini
  lResult = CloudIniFile.GetString(SEC_NET, VAL_EXT_IPADDRESS, STR_FAIL, cBuff, sizeof(cBuff));
  *webPortNo = CloudIniFile.GetInt(SEC_NET, VAL_EXT_PORT, VAL_WEBPORT_DEFAULT);
  // from registery.ini
  Ulong_t u = iniFile.GetString("NET", "IpAddress", "\0", &a[0], sizeof(a));
  *portNo = iniFile.GetInt(SEC_WEB_AGENT, VAL_PORT, VAL_PORT_DEFAULT);
  if (u != 0) {
    ip_Address = &a[0];
    my_IP = ip_Address;
  }
  accapi_my_print(0, "GetMoreParamsFromSoftParam()==> Acc web server IP: %s, web Port No: %d, local port: %d\n", ip_Address.c_str(), *webPortNo, *portNo);

  //===============================================
  // create cemax if exists in registery.ini
  SWT->m_CEMax = NULL;
  u = iniFile.GetString("CEMAX", "ApiUrl", "\0", &a[0], sizeof(a));
  if (u != 0) // CEMAX exists
  {
    CEMaxurlApi = &a[0];
    u = iniFile.GetString("CEMAX", "RegisterUrl", "\0", &a[0], sizeof(a));
    CEMaxurlRegister = &a[0];
    //
    int Cemaxport = VAL_WEBPORT_DEFAULT;
    if (*webPortNo != VAL_WEBPORT_NE)
    {
      Cemaxport = *webPortNo;
    }
    string cemaxToaccUrl = ip_Address;
    if (lResult != GETSTRING_ERROR) {
      cemaxToaccUrl = &cBuff[0];
    }
    sprintf(&cBuff[0], "https://%s:%d/accAgent", cemaxToaccUrl.c_str(), Cemaxport);
    cemaxToaccUrl = &cBuff[0];

    //
    accapi_my_print(0, "GetMoreParamsFromSoftParam==>\n CEMAX API URL: %s,\n CEMAX Register URL: %s,CemaxToAccUrl: %s \n",
      CEMaxurlApi.c_str(), CEMaxurlRegister.c_str(), cemaxToaccUrl.c_str());

    if (!CEMaxurlApi.empty() && !CEMaxurlRegister.empty())
    {
      accapi_my_print(0, "CEMAX URL's were found, Initiating CEMAX Connector");
      SWT->m_CEMax = new CEMax(CEMaxurlApi, CEMaxurlRegister, cemaxToaccUrl, CEMaxuser, CEMaxpass);
    }
    else
    {
      accapi_my_print(0, "CEMAX URL's are EMPTY");
    }
  }

  //==================================
  *keepalive_check_intreval = iniFile.GetInt(SEC_WEB_AGENT, VAL_KEEPALIVE_CHECK_INTERVAL, VAL_KEEPALIVE_CHECK_INTERVAL_DEFAULT);
  *keepalive_timeout = iniFile.GetInt(SEC_WEB_AGENT, VAL_KEEPALIVE_TIMEOUT, VAL_KEEPALIVE_TIMEOUT_DEFAULT);
  accapi_my_print(0, "++++ accapi params:  ip address: %s, %s %d, %s %d, %s %d, CRM type: %s +++\n", ip_Address.c_str(), VAL_PORT, *portNo, VAL_KEEPALIVE_CHECK_INTERVAL, *keepalive_check_intreval, VAL_KEEPALIVE_TIMEOUT, *keepalive_timeout, crmCode.c_str());

  dummyInterval = iniFile.GetInt(SEC_WEB_AGENT, "dummyInterval", 0);
  dummyAgent = iniFile.GetInt(SEC_WEB_AGENT, "dummyAgent", 0);
  accapi_my_print(0, "*** dummyInterval: %d, dummyAgent: %d\n", dummyInterval, dummyAgent);
  //
  return;// string(&ipAddress[0]);
}
//============================[getDialList]====================================
void getDialList()
{
  DBManager_c db_manager1;
  Statement_c  diallist_st;
  diallist_st.SetQuery("select dl_id, dl_name from dial_lists");
  ResultSet_c  dl_rs;
  RetCode_t    executionResult;
  Ulong_t      dl_counter = 0;
  bool         complete_init_dl = true;
  //
  RetCode_t rc = db_manager1.ExecuteSelectSyn(diallist_st, dl_rs, executionResult);
  while (dl_rs.Next())
  {
    char name[NAME_SIZEX + 1];
    Diallist_c* dl = new Diallist_c();
    dl_rs.GetUlongByName("dl_id", dl->m_DlId); // Get the dl_id from the DBI
    dl_rs.GetStringByName("dl_name", &name[0]);
    dl->m_DlName = &name[0];
    dl_map[dl->m_DlName] = *dl;
    accapi_my_print(5, "getDialList()==> id: %d, name: %s\n", dl->m_DlId, dl->m_DlName.c_str());
    dl_counter++;
  }
}
//============================[getCOSTableFromDB]====================================
//184, '', 'select * from classes_of_service', '', ''
//185, '', 'select * from classes_of_service where cos_id = %1', '', ''

void getCOSTableFromDB()
{
  DBManager_c db_manager1;
  Statement_c  cos_st;
  cos_st.SetQuery("select * from classes_of_service");
  ResultSet_c  cos_rs;
  RetCode_t    executionResult;
  Ulong_t      cos_counter = 0;
  bool         complete_init_cos = true;

  cos_db.clear();

  RetCode_t rc = db_manager1.ExecuteSelectSyn(cos_st, cos_rs, executionResult);

  while (cos_rs.Next())
  {
    COS_c* cos = new COS_c();
    Ulong_t cos_id;
    cos_rs.GetUlongByName("cos_id", cos_id); // Get the cos_id from the DBI
    cos->SetCOSMembers(cos_rs);
    accapi_my_print(5, "getCOSTableFromDB, %s, %s\n", cos->m_cos_name, cos->m_CosStr.c_str());
    cos_db[cos_id] = cos;
    cos_counter++;
  }
  accapi_my_print(0, "+++++++++++++++  COS Map Size - %d\n", cos_db.size());
}
//========================[getLangTableFromDB]===================================

//SELECT lg_id, lg_name FROM lg_vendor
void getLangTableFromDB()
{
  DBManager_c db_manager1;
  Statement_c  lng_st;
  lng_st.SetQuery("SELECT lg_id, lg_name  FROM lg_vendor where used_flag = 1");
  ResultSet_c  lng_rs;
  RetCode_t    executionResult;
  Ulong_t      lng_counter = 0;
  bool         complete_init_cos = true;

  lng_db.clear();
  lng_db_json = "[";
  char json[256];

  RetCode_t rc = db_manager1.ExecuteSelectSyn(lng_st, lng_rs, executionResult);

  while (lng_rs.Next())
  {
    LNG_c* lng = new LNG_c();
    Ulong_t lg_id;
    lng_rs.GetUlongByName("lg_id", lg_id); // Get the cos_id from the DBI
    lng->m_LngId = lg_id;
    lng_rs.GetStringByName("lg_name", lng->m_LngName);
    lng_db[lg_id] = *lng;
    lng_counter++;
    sprintf(&json[0], "{\"key\": %d, \"value\": \"%s\"},\n", lng->m_LngId, ReplaceSpesialJsonChars(lng->m_LngName).c_str());
    lng_db_json += json;
  }
  if (lng_counter > 0)
  {
    lng_db_json[lng_db_json.length() - 2] = '\n';
    lng_db_json[lng_db_json.length() - 1] = ']';
    lng_db_json += "\n";
  }
  else { lng_db_json = "[]\n"; }

  accapi_my_print(3, "lng_db_json:\n%s", lng_db_json.c_str());
}

//========================[getMailAccountsTableFromDB]===================================
void getMailAccountsTableFromDB()
{
  DBManager_c db_manager1;
  Statement_c  st;
  st.SetQuery("SELECT mail_acc_id, mail_acc_name  FROM mail_accounts");
  ResultSet_c  rs;
  RetCode_t    executionResult;
  Ulong_t      counter = 0;
  bool         complete_init_cos = true;

  mail_db_json = "[";
  char json[256];

  RetCode_t rc = db_manager1.ExecuteSelectSyn(st, rs, executionResult);

  while (rs.Next())
  {
    Ulong_t id;
    char name[256];
    rs.GetUlongByName("mail_acc_id", id);
    rs.GetStringByName("mail_acc_name", name);
    counter++;
    sprintf(&json[0], "{\"key\": %d, \"value\": \"%s\"},\n", id, ReplaceSpesialJsonChars(name).c_str());
    mail_db_json += json;
  }
  if (counter > 0)
  {
    mail_db_json[mail_db_json.length() - 2] = '\n';
    mail_db_json[mail_db_json.length() - 1] = ']';
    mail_db_json += "\n";
  }
  else { mail_db_json = "[]\n"; }
  accapi_my_print(5, "mail_db_json:\n%s", mail_db_json.c_str());
}
//========================[getDbConnectionsTableFromDB]===================================
int  getConn_db(int conn_id, CONN_MAP_IT& it) {
  it = conn_db.find(conn_id);
  if (it != conn_db.end()) return 0;
  return -1;
}
void getDbConnectionsTableFromDB()
{
  DBManager_c db_manager1;
  Statement_c  st;
  st.SetQuery("SELECT conn_name_id, conn_name, drv_type, dsn,timeout, login_name, login_pwd, ws_server  FROM edbc_conn_name_info");
  ResultSet_c  rs;
  RetCode_t    executionResult;
  Ulong_t      dbcounter = 0, wscounter = 0;
  bool         complete_init_cos = true;

  dbConnections_db_json = "[{\"key\": -1, \"value\": \"(not defined )\"},";
  wsConnections_db_json = "[{\"key\": -1, \"value\": \"(not defined )\"},";
  char json[256];

  conn_db.clear();

  RetCode_t rc = db_manager1.ExecuteSelectSyn(st, rs, executionResult);

  while (rs.Next())
  {
    Connection_c* conn = new Connection_c();
    rs.GetUlongByName("drv_type", conn->m_drv_type);
    rs.GetUlongByName("conn_name_id", conn->m_Id);
    rs.GetStringByName("conn_name", conn->m_name);
    rs.GetStringByName("dsn", conn->m_dsn);
    rs.GetStringByName("login_name", conn->m_login_name);
    rs.GetStringByName("login_pwd", conn->m_login_pwd);
    rs.GetStringByName("ws_server", conn->m_ws_server);
    //
    sprintf(&json[0], "{\"key\": %d, \"value\": \"%s\",\"wsdl\": \"%s\"},\n", conn->m_Id, ReplaceSpesialJsonChars(conn->m_name).c_str(), ReplaceSpesialJsonChars(conn->m_ws_server).c_str());
    if (conn->m_drv_type < 3) // WEb Service 
    {
      dbConnections_db_json += json;
      dbcounter++;
    }
    else
    {
      wsConnections_db_json += json;
      wscounter++;
    }
    conn_db[conn->m_Id] = conn;
  }
  if (dbcounter > 0)
  {
    dbConnections_db_json[dbConnections_db_json.length() - 2] = '\n';
    dbConnections_db_json[dbConnections_db_json.length() - 1] = ']';
    dbConnections_db_json += "\n";
  }
  else { dbConnections_db_json = "[]\n"; }
  accapi_my_print(3, "dbConnections_db_json:\n%s", dbConnections_db_json.c_str());
  if (wscounter > 0)
  {
    wsConnections_db_json[wsConnections_db_json.length() - 2] = '\n';
    wsConnections_db_json[wsConnections_db_json.length() - 1] = ']';
    wsConnections_db_json += "\n";
  }
  else { wsConnections_db_json = "[]\n"; }
  accapi_my_print(3, "wsConnections_db_json:\n%s", wsConnections_db_json.c_str());

}

//========================[GetAgentGroups]===================================
void GetAgentGroups(AgentDbInfo_c* ADI)
{
  //SELECT * FROM grp_agent g where agent_id = 1;
  Statement_c st;
  ResultSet_c rs;
  rs.clear();
  char q[120];
  sprintf(&q[0], "SELECT agent_id,group_id FROM grp_agent where agent_id = %d", ADI->m_Agent_id);
  st.SetQuery(q);
  bool brc;
  DBManager_c dbi_mngr;
  RetCode_t executionResult;
  RetCode_t bswrc = BSWRC_FAIL;
  if (!(dbi_mngr.IsProxyOK()))
  {
    return;
  }
  accapi_my_print(5, "GetAgentGroups: query: %s\n", &q[0]);
  Ulong_t group_id;
  char* gg = new char[32000 + 1]; gg[0] = 0;

  rs.clear();
  bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);
  //
  while (rs.Next())
  {
    brc = rs.GetUlongByName("group_id", group_id);
    if (brc)
    {
      sprintf(&gg[strlen(gg)], "%d|", group_id);
    }
  }
  ADI->m_primary_groups = &gg[0];
  accapi_my_print(12, "GetAgentGroups, agent_no: %s,groups: %s\n", ADI->m_Number, ADI->m_primary_groups.c_str());
  delete[] gg;
}
//=================================[getsupagents]===========================================

void getsupagents()
{
  DBManager_c db_manager1;
  Statement_c  sup_st;
  sup_st.SetQuery("select user_id,agent_id,sup_name,sup_password, sup_level FROM sup");
  ResultSet_c  sup_rs;
  RetCode_t    executionResult;
  Ulong_t      sup_counter = 0;
  bool         complete_init_sup = true;
  RetCode_t rc = db_manager1.ExecuteSelectSyn(sup_st, sup_rs, executionResult);
  sup_map.clear();
  while (sup_rs.Next())
  {
    Ulong_t agent_id;
    SUP_c* supRec = new SUP_c();
    sup_rs.GetUlongByName("agent_id", agent_id); // Get the agent_id from the DBI
    supRec->m_agentId = agent_id;

    AgentDbInfo_c* ADI = AGENTINFOfind(agent_id);
    if (ADI != NULL)
    {
      ADI->m_Sup = 1;
      accapi_my_print(5, "getsupagents, found sup agent  FromDB, %s, ADI->m_Sup: %d\n", ADI->m_Number, ADI->m_Sup);
    }

    sup_rs.GetStringByName("sup_name", supRec->m_supName);
    //for (int i = 0; supRec->m_supName[i] != 0; ++i) 
    //  supRec->m_supName[i] = tolower(supRec->m_supName[i]);
    sup_rs.GetStringByName("sup_password", supRec->m_supPass);
    sup_rs.GetUlongByName("sup_level", supRec->m_supLevel);
    sup_rs.GetUlongByName("user_id", supRec->m_userId);
    string s = &supRec->m_supName[0];
    accapi_my_print(5, "getsuptable %s,%s,%d\n", supRec->m_supName, supRec->m_supPass, supRec->m_supLevel);
    sup_map[s] = *supRec;
  }
  accapi_my_print(0, "+++++++++++++++  Sup Map Size - %d\n", sup_map.size());
}

//===========================================[LoadIVrApp]=================================================
void LoadIVrApp()
{
  DBManager_c db_manager1;
  Statement_c  app_st;
  app_st.SetQuery("select ivr_app_id,  ivr_app_name, min_handling_time, max_handling_time, ivr_interval_time FROM ivr_apps");
  ResultSet_c  app_rs;
  RetCode_t    executionResult;
  Ulong_t      app_counter = 0;
  bool         complete_init_app = true;
  //
  RetCode_t rc = db_manager1.ExecuteSelectSyn(app_st, app_rs, executionResult);
  ivrapp_map.clear();
  ivrapp_map_json = "[";
  //
  char json[512];
  while (app_rs.Next())
  {
    IvrApp_c* appRec = new IvrApp_c();
    app_rs.GetStringByName("ivr_app_name", appRec->m_ivr_app_name);
    app_rs.GetUlongByName("ivr_app_id", appRec->m_ivr_app_id);
    app_rs.GetUlongByName("min_handling_time", appRec->m_min_handling_time);
    app_rs.GetUlongByName("max_handling_time", appRec->m_max_handling_time);
    app_rs.GetUlongByName("ivr_interval_time", appRec->m_ivr_interval_time);
    ivrapp_map[appRec->m_ivr_app_id] = *appRec;
    app_counter++;
    sprintf(&json[0], "{\"key\": %d, \"value\": \"%s\"},\n", appRec->m_ivr_app_id, ReplaceSpesialJsonChars(appRec->m_ivr_app_name).c_str());
    ivrapp_map_json += json;
  }
  if (app_counter > 0)
  {
    ivrapp_map_json[ivrapp_map_json.length() - 2] = '\n';
    ivrapp_map_json[ivrapp_map_json.length() - 1] = ']';
    ivrapp_map_json += "\n";
  }
  else { ivrapp_map_json = "[]\n"; }

  accapi_my_print(5, "ivrapp_map_json:\n%s", ivrapp_map_json.c_str());
}

AGENTINFO_MAP_IT agent_db_iterator;
//=================================[GetAgentsFromDB]===========================================
void GetAgentsFromDB(bool isChanged)
{
  AGENTINFO_MAP agents_db_temp;
  Statement_c st;
  ResultSet_c rs;
  AgentDbInfo_c agent_info;
  rs.clear();
  st.SetQuery("SELECT agent_id,a_name,a_number,a_is_logged, cos_id, a_password FROM agent where agent_status = 'a'");
  bool brc;
  DBManager_c dbi_mngr;
  RetCode_t executionResult;
  RetCode_t bswrc = BSWRC_FAIL;

  if (!(dbi_mngr.IsProxyOK()))
  {
    return;
  }
  rs.clear();
  //agents_db.clear();

  bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);

  while (rs.Next())
  {
    brc = rs.GetUlongByName("agent_id", agent_info.m_Agent_id);
    if (brc)
      rs.GetStringByName("a_name", agent_info.m_Name);
    if (brc)
      rs.GetStringByName("a_number", (char*)agent_info.m_Number);
    //if (brc)
    //{
    //	brc = rs.GetStringByName("a_is_logged",temp_flag);
    //}
    if (brc)
    {
      brc = rs.GetStringByName("a_password", agent_info.m_Pass);
    }
    brc = rs.GetUlongByName("cos_id", agent_info.m_Cos_Id);
    if (brc && agent_info.m_Cos_Id == 1)
    {
      accapi_my_print(5, "agent namel %s,cosId: %d\n", agent_info.m_Name, agent_info.m_Cos_Id);
    }

    agent_info.m_StateCode = AccapiCrmType_c::SignOut; // start with signeout
    agent_info.m_Changed = false;
    GetAgentGroups(&agent_info);
    agents_db[agent_info.m_Agent_id] = agent_info;
  }

  accapi_my_print(0, "+++++++++++++++  Agents Map Size - %d\n", agents_db.size());
  
  getsupagents();
  
  agent_db_iterator = agents_db.begin();
}
//=================================[CheckSignedAasdeleted]================================
void CheckSignedAasdeleted(string agentNumber)
{
  //this agent was deleted while it was logon - so not realy deleted
  AgentDbInfo_c* ADI = AGENTINFOfindByAgenNumber(agentNumber); // old one
  if (ADI != NULL)
  {
    if ((strcmp(&ADI->m_Pass[0], "Deleted")) == 0)
    {
      accapi_my_print(0, "CheckSignedAasdeleted==> permanent erase agent no: %s, After logic delete\n", agentNumber.c_str());
      AGENTINFOerase(ADI->m_Agent_id);
    }
  }
}
//================================[void UpdateAgenGrpDB(]===========================================
void UpdateAgenGrpDB(Ulong_t id, Commands_e command)
{
  AgentDbInfo_c* ADI = AGENTINFOfind(id); // old one
  if (ADI != NULL)
  {
    GetAgentGroups(ADI);
  }
}
//=================================[GetAgentsFromDB]===========================================
void UpdateAgentsFromDB(Ulong_t id, Commands_e command)
{
  AGENTINFO_MAP agents_db_temp;
  Statement_c st;
  ResultSet_c rs;
  AgentDbInfo_c agent_info;
  rs.clear();
  char query[200]; query[0] = 0;
  sprintf(&query[0], "SELECT agent_id,a_name,a_number,a_is_logged, cos_id, a_password FROM agent where agent_status = 'a' AND agent_id = %d", id);
  st.SetQuery(query);
  bool brc;
  char    temp_flag[2];
  DBManager_c dbi_mngr;
  RetCode_t executionResult;
  RetCode_t bswrc = BSWRC_FAIL;

  if (!(dbi_mngr.IsProxyOK()))
  {
    return;
  }
  rs.clear();
  if (command == CMD_DELETE)
  {
    AGENTINFOerase(id);
    return;
  }
  bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);
  while (rs.Next())
  {
    brc = rs.GetUlongByName("agent_id", agent_info.m_Agent_id);
    brc = rs.GetStringByName("a_name", agent_info.m_Name);
    brc = rs.GetStringByName("a_password", agent_info.m_Pass);
    brc = rs.GetStringByName("a_number", (char*)agent_info.m_Number);
    brc = rs.GetStringByName("a_is_logged", temp_flag);
    brc = rs.GetUlongByName("cos_id", agent_info.m_Cos_Id);
    agent_info.m_StateCode = AccapiCrmType_c::SignOut; // start with signeout
    agent_info.m_Changed = false;
    CheckSignedAasdeleted((char*)agent_info.m_Number);
    AgentDbInfo_c* ADI = AGENTINFOfind(agent_info.m_Agent_id); // old one
    if (ADI != NULL)
    {
      memcpy(&ADI->m_Number[0], &agent_info.m_Number[0], sizeof(agent_info.m_Number));
      memcpy(&ADI->m_Name[0], &agent_info.m_Name[0], sizeof(agent_info.m_Name));
      memcpy(&ADI->m_Pass[0], &agent_info.m_Pass[0], sizeof(agent_info.m_Pass));
      ADI->m_Cos_Id = agent_info.m_Cos_Id;
      GetAgentGroups(ADI);
      AGENTINFO_MUTEX.Lock();
      agents_db[ADI->m_Agent_id] = *ADI;
      AGENTINFO_MUTEX.Unlock();
      accapi_my_print(5, "UpdateAgentsFromDB, Update agent details no:  %s,%s\n", agent_info.m_Number, agent_info.m_Pass);
      //AGENTINFO_MUTEX.Lock();// Bug 52746 SW
    }
    else
    {
      GetAgentGroups(&agent_info);
      accapi_my_print(3, "Insert new agent, add new agent no: %s,%s\n", agent_info.m_Number, agent_info.m_Pass);
      AGENTINFO_MUTEX.Lock();
      agents_db[agent_info.m_Agent_id] = agent_info; // new one
      AGENTINFO_MUTEX.Unlock();
    }
  }
  getsupagents();
}
//=============================[GetServicesFromDB]==========================================
//SELECT srv_id, srv_name FROM `services`;
void GetServicesFromDB()
{
  Statement_c st;
  ResultSet_c rs;
  Srvss_c ServiceX;
  rs.clear();
  st.SetQuery("SELECT srv_id, srv_name, srv_number FROM services");
  bool brc;
  DBManager_c dbi_mngr;
  RetCode_t executionResult;
  RetCode_t bswrc = BSWRC_FAIL;

  if (!(dbi_mngr.IsProxyOK()))
  {
    return;
  }
  rs.clear();
  srv_db.clear();
  char json[512];
  Ulong_t counter = 0;
  srv_db_json = "[";

  bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);

  while (rs.Next())
  {
    brc = rs.GetUlongByName("srv_id", ServiceX.m_SrvId);
    memset(ServiceX.m_SrvName, 0, NAME_SIZEX + 1);
    rs.GetStringByName("srv_name", ServiceX.m_SrvName);
    //28-Dec-2022 YR BZ#57277
    if (ServiceX.m_SrvName[strlen(ServiceX.m_SrvName)-1] == 0x0d)
    {
      accapi_my_print(0, "Found 0x0d on service name %s - removed\n", ServiceX.m_SrvName);
      ServiceX.m_SrvName[strlen(ServiceX.m_SrvName)-1] = 0x0;
    }

    srv_db[ServiceX.m_SrvId] = ServiceX;
    counter++;
    memset(json, 0, sizeof(json));
    sprintf(&json[0], "{\"key\": %d, \"value\": \"%s\"},\n", ServiceX.m_SrvId, ReplaceSpesialJsonChars(ServiceX.m_SrvName).c_str());
    srv_db_json += json;
  }
  if (counter > 0)
  {
    srv_db_json[srv_db_json.length() - 2] = '\n';
    srv_db_json[srv_db_json.length() - 1] = ']';
    srv_db_json += "\n";
  }
  else { srv_db_json = "[]\n"; }

  accapi_my_print(0, "+++++++++++++++  Services Map Size - %d\n", srv_db.size());
  accapi_my_print(3, "srv_db_json:\n%s", srv_db_json.c_str());
}
//==============================[getGccsCp]=========================================
map<int, int> cp_readOrWriteMap;
//
void getGccsCp()
{
  cp_readOrWriteMap.clear();
  Statement_c st;
  ResultSet_c rs;
  rs.clear();
  st.SetQuery("SELECT cp_id, cp_obj_id FROM ccs_call_profile_cp_object WHERE (cp_obj_id = 990 OR cp_obj_id = 991)");
  bool brc;
  DBManager_c dbi_mngr;
  RetCode_t executionResult;
  RetCode_t bswrc = BSWRC_FAIL;
  CP_MAP_IT it;
  //
  if (!(dbi_mngr.IsProxyOK()))
  {
    return;
  }
  rs.clear();
  bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);

  while (rs.Next())
  {
    Ulong_t id;
    Ulong_t objid;
    brc = rs.GetUlongByName("cp_id", id);
    brc = rs.GetUlongByName("cp_obj_id", objid);//990 or 991
    cp_readOrWriteMap[id] = objid;
  }
}
//==============================[GetCPFromDB]=========================================
void GetCPFromDB()
{
  Cp_c        CpX;
  DBManager_c dbi_mngr;
  CpField_t*  fields_arr_ptr;
  Ulong_t     num_of_fields = 0;
  Ulong_t     index = 0;

  cp_mngr.ReInitCpFieldMgr();
  cp_db.clear();
  //
  getGccsCp(); // get cpf for gccs read write
  //
  num_of_fields = cp_mngr.GetNumberOfFields();

  if (num_of_fields > 0)
  {
    std:map<int, int>::iterator it;
    Ulong_t prevId = -1;
    char json[512];
    cp_db_json = "[";
    fields_arr_ptr = new CpField_t[num_of_fields];
    //
    CpX.m_CPId = cp_mngr.GetFirstFieldId();

    int writex = -1;
    //for (index = 1; CpX.m_CPId > 0 &&  index < num_of_fields + 1; index++)
    while (CpX.m_CPId > 0)
    {
      CpX.m_CPName = cp_mngr.GetFieldNameViaId(CpX.m_CPId);
      cp_db[CpX.m_CPId] = CpX;
      //
      if (CpX.m_CPId < 100) {
        writex = -1;
        it = cp_readOrWriteMap.find((int)CpX.m_CPId);
        if (it != cp_readOrWriteMap.end()) writex = it->second;
      }
      else writex = 991;
      //
      if (writex != -1)
      {
        memset(json, 0, 512);
        sprintf(&json[0], "{\"key\": %d, \"value\": \"%s\",\"value2\": %d},\n", CpX.m_CPId, CpX.m_CPName.c_str(), writex);
        cp_db_json += &json[0];
      }
      CpX.m_CPId = cp_mngr.GetNextFieldId();
      //
      if (prevId == CpX.m_CPId)
      {
        accapi_my_print(0, "Double CpX.m_CPId:\n", CpX.m_CPId);
        break;
      }
      prevId = CpX.m_CPId;
    }
    cp_db_json[cp_db_json.length() - 2] = '\n';
    cp_db_json[cp_db_json.length() - 1] = ']';
    cp_db_json += "\n";
    //accapi_my_print(3, "cp_db_json:\n%s", cp_db_json.c_str());
  }
  //
}
//============================[ReplaceScfNameById(&cpfX[0]);]
void ReplaceScfNameById(char* cpfX, REPORT report)
{
  std::vector<string>  v;
  std::vector<string>  vi;
  int len = Split(cpfX, v, (char*)"|");
  cpfX[0] = 0;
  for (int i = 0; i < v.size(); ++i) {
    int len1 = Split((char*)v[i].c_str(), vi, (char*)":");
    if (vi.size() != 2) continue;
    CP_MAP_IT it = cp_db.begin();
    for (it; it != cp_db.end(); ++it)
    {
      Cp_c& cp = it->second;
      if (cp.m_CPName == vi[0])
      {
        sprintf(cpfX, "%d|%s^", cp.m_CPId, vi[1].c_str());
        CallProfileField_c cp1(cp.m_CPId, vi[1].c_str());
        CallProfile_c cp2;
        cp2.SetField(cp1);
        Eid_c e;
        sea_provider.ExecuteExternalHookReply(report.m_CallId, cp2, e);
        //((CallProfile_c*)report.m_cp)->SetField(cp1);
        //sea_provider.ExecuteExternalHookReply(report.m_CallId, *(CallProfile_c*)(report.m_cp), e);
        break;
      }
    }
  }
  accapi_my_print(0, "============== ReplaceScfNameById: %s =======================\n", cpfX);
}
//========================[GetIrns]=================================
int GetIrns()
{
  Statement_c st;
  ResultSet_c rs;
  rs.clear();
  st.SetQuery("SELECT irn_dn  FROM irn");
  bool brc;
  DBManager_c dbi_mngr;
  RetCode_t executionResult;
  RetCode_t bswrc = BSWRC_FAIL;
  if (!(dbi_mngr.IsProxyOK()))
  {
    return 0;
  }
  rs.clear();
  irn_json = "[";
  Ulong_t counter = 0;
  bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);
  //
  char oneIrn[24];
  while (rs.Next())
  {
    brc = rs.GetStringByName("irn_dn", oneIrn);
    irn_json += &oneIrn[0];
    irn_json += ",";
  }
  if (irn_json[irn_json.length() - 1] == ',') {
    irn_json = irn_json.substr(0, irn_json.length() - 1);
  }
  irn_json += "]";
  accapi_my_print(3, "IRNS JSON: %s\n", irn_json.c_str());
  return 0;
}
//============================[GetGroupsFromDB]===========================================
//SELECT group_id, g_name  FROM `grp`;
void GetGroupsFromDB()
{
  Statement_c st;
  ResultSet_c rs;
  Groups_c  GroupsX;
  rs.clear();
  st.SetQuery("SELECT group_id, g_number, g_name  FROM grp");
  bool brc;
  DBManager_c dbi_mngr;
  RetCode_t executionResult;
  RetCode_t rc = BSWRC_FAIL;
  //
  if (!(dbi_mngr.IsProxyOK()))
  {
    return;
  }
  rs.clear();
  grp_db.clear();
  grp_db_json = "[";
  char json[512];
  Ulong_t counter = 0;
  //
  rc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);
  if ((rc == BSWRC_OK) && (executionResult == BSWRC_OK))
  {
    while (rs.Next())
    {
      brc = rs.GetUlongByName("group_id", GroupsX.m_GrpId);
      rs.GetStringByName("g_number", GroupsX.m_GrpNumber);
      rs.GetStringByName("g_name", GroupsX.m_GrpName);
      grp_db[GroupsX.m_GrpId] = GroupsX;
      counter++;
      sprintf(&json[0], "{\"m_id\": %s, \"m_name\": \"%s\"},\n", GroupsX.m_GrpNumber, ReplaceSpesialJsonChars(GroupsX.m_GrpName).c_str());
      grp_db_json += json;
    }
  }
  else {
    accapi_my_print(0, "ERROR, Request for get groups from acc  failed; ex result = %d\n", executionResult);
  }
  if (counter > 0)
  {
    grp_db_json[grp_db_json.length() - 2] = '\n';
    grp_db_json[grp_db_json.length() - 1] = ']';
    grp_db_json += "\n";
  }
  else {
    grp_db_json = "[]\n";
    accapi_my_print(0, "ERROR, Got  0 groups from acc  failed\n");
  }

  accapi_my_print(0, "+++++++++++++++  Groups Map Size - %d\n", grp_db.size());
  accapi_my_print(5, "grp_db_json:\n%s", grp_db_json.c_str());

}
//================================[GetWUFromDB]=======================================
//SELECT w_name, w_number FROM `wu_code`;
void GetWUFromDB()
{
  Statement_c st;
  ResultSet_c rs;
  WrapUpCodes_c WrapUpCodesX;
  rs.clear();
  st.SetQuery("SELECT w_name, w_number FROM wu_code;");
  bool brc;
  DBManager_c dbi_mngr;
  RetCode_t executionResult;
  RetCode_t bswrc = BSWRC_FAIL;

  if (!(dbi_mngr.IsProxyOK()))
  {
    return;
  }
  rs.clear();
  wu_db.clear();

  bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);

  while (rs.Next())
  {
    brc = rs.GetUlongByName("w_number", WrapUpCodesX.m_WUId);
    if (brc)
      rs.GetStringByName("w_name", WrapUpCodesX.m_WUName);
    if (brc)
    {
      wu_db[WrapUpCodesX.m_WUId] = WrapUpCodesX;
    }
  }
}
//==================================[GetRcFromDB]=====================================
//SELECT rc_id, rc_shortname,rc_name, rc_number FROM `release_codes`;
void GetRcFromDB()
{
  Statement_c st;
  ResultSet_c rs;
  ReleaseCodes_c  ReleaseCodesX;
  rs.clear();
  st.SetQuery("SELECT rc_id, rc_shortname,rc_name, rc_number FROM release_codes");
  bool brc;
  DBManager_c dbi_mngr;
  RetCode_t executionResult;
  RetCode_t bswrc = BSWRC_FAIL;

  if (!(dbi_mngr.IsProxyOK()))
  {
    return;
  }
  rs.clear();
  rc_db.clear();

  bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);

  while (rs.Next())
  {
    brc = rs.GetUlongByName("rc_id", ReleaseCodesX.m_RCId);
    if (brc)
      rs.GetStringByName("rc_name", ReleaseCodesX.m_RCName);
    if (brc)
    {
      rc_db[ReleaseCodesX.m_RCId] = ReleaseCodesX;
    }
  }
}


//================================[AccapiWorkThread_c::bcWorkThread_c]===================
AccapiWorkThread_c::AccapiWorkThread_c()
{
  m_CEMax = NULL;
  m_IsSSO = FALSE; //SOLSOL
}
//================================[~AccapiWorkThread_c]==================================
AccapiWorkThread_c::~AccapiWorkThread_c()
{

}
//================================[AccapiWorkThread_c::Init]=============================
RetCode_t AccapiWorkThread_c::Init()
{
  return BSWRC_OK;
}
//================================[AccapiWorkThread_c::Terminate]========================
RetCode_t AccapiWorkThread_c::Terminate()
{
  m_sea_reply.Terminate();
  accapi_my_print(0, "AccapiWorkThread_c::Terminate\n");
  return BSWRC_OK;
}
//================================[AccapiWorkThread_c::SetPreoper]=======================
void AccapiWorkThread_c::SetPreoper()
{

}
//================================[AccapiWorkThread_c::IsPreoperDone]====================
Bool_t AccapiWorkThread_c::IsPreoperDone() const
{
  return true;
}
string  crmCode;
static AccapiEntities_c EntityMgr;
int InitAccApiServer(string ip, int portNo, int webPort);
//================================[AccapiWorkThread_c::GetAllTables]===================
void AccapiWorkThread_c::GetAllTables(bool isChanged)
{
  time_t start_time = time(0);
  accapi_my_print(0, "AccapiWorkThread_c::GetAllTables=> start: %d\n", start_time);
  getCOSTableFromDB();
  GetServicesFromDB();
  GetGroupsFromDB();
  GetWUFromDB();
  GetRcFromDB();
  GetCPFromDB();
  LoadIVrApp();
  getLangTableFromDB();
  getMailAccountsTableFromDB();
  getDbConnectionsTableFromDB();
  getsupagents();
  GetIrns();
  string gccsstr = "";
  ReadAndPrepareaccAgentEvents(gccsstr);
  accapi_my_print(0, "AccapiWorkThread_c::GetAllTables=> end:    %d, took: %d seconds\n", time(0), time(0) - start_time);
}
//================================[Send SSO on/off to accapi service TOMCAT on connect]=========
string  getSSOState()
{
  SWT->m_IsSSOfreeSseating = FALSE;
  SWT->m_IsSSO = FALSE;
  if (EosHAGetSSOStatus() == EOS_HA_SSO_ENABLE)  SWT->m_IsSSO = TRUE;
  //
  if (EosHAGetSSOFreeSeating() == EOS_HA_SSO_ENABLE)  SWT->m_IsSSOfreeSseating = TRUE;
  //
  string s = (SWT->m_IsSSO == TRUE) ? " ,SSO=1," : " ,SSO=0,";
  s += (SWT->m_IsSSOfreeSseating == TRUE) ? "SEATING=1" : "SEATING=0";

  s += (char*)",AccVersion=";
  s += (char*)SuGetEpicVersion();
  return s;
}

//================================[AccapiWorkThread_c::SetOperational]===================

Thread* CheckKeepAliveThread = 0;
Thread* sendDummyThread = 0;
//void ChangeLogLevel(int new_log_level);
void AccapiWorkThread_c::SetOperational()
{
  SWT = this;
  int portNo;

  accapi_my_print_init((char*)"../Log/accapi.log");
  accapiChangeLogLevel(3);
  accapi_my_print(0, "+++++++++++++++++++++++++++++++++++ ACCAPI STARTED ++++++++++++++++++++++++\n");

  // load all required tables from ecc db
  GetAllTables(false);
  GetAgentsFromDB(false); //get and fill all agent from ecc DB
  //
  string ipAddr;
  int webPort = 8445;
  //
  int keepalive_check_intreval;
  int keepalive_timeout;
  GetMoreParamsFromSoftParam(ipAddr, &portNo, &webPort, &keepalive_check_intreval, &keepalive_timeout, crmCode);
  //
  AccapiCrmType_c* crmObject = NULL;
  //
  m_web_gccs = new AccapiWebGccs_c();
  m_web_admin = new AccapiWebAdmin_c();
  //
  //EntityMgr = AccapiEntities_c::GetEntityMgr(this);
  accapi_entities_obj.InitSystemParam();
  //
  if (crmCode == "Acc Web Agent") // Aspect® Workforce Management
  {
    crmObject = (AccapiCrmType_c*) new AccapiCrmType_c();
  }
  m_conn_timer.m_CrmObject = crmObject;

  m_AccapiSmManager = new AccapiSmManager_c(this);
  m_AccapiSmManager->CreateProxy(false);
  //
  m_sea_reply.Init();

  // SOLSOL GetCPFromDB();
  // CEMAX

  m_sea_reply.SetOperational(crmCode);
  ThreadMgr::Spawn(InitAccApiServer, ipAddr, portNo, webPort);
  CheckKeepAliveThread = ThreadMgr::Spawn(CheckKeepAlive, this, keepalive_check_intreval, keepalive_timeout);

  //ThreadMgr::Spawn(CheckStuckInLock,this,60,60);

  m_conn_timer.Start(1000);

}

//================================[AccapiWorkThread_c::OnIdle]===================
void  AccapiWorkThread_c::OnIdle()
{
  PostEventHandling();
}
//===========================================================================
string BaseEtas = "ewoJImFjdGl2YXRlX2h0dHAiOiBmYWxzZSwKCSJDUk0iOiBbCgkJewoJCQkiRXZlbnQiOiAiT25Mb2dvbiIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25SZUxvZ29uIiwKCQkJIlVSTCI6ICIiCgkJfSwKCQl7CgkJCSJFdmVudCI6ICJPbkRlbmllZCIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25FeGl0IiwKCQkJIlVSTCI6ICIiCgkJfSwKCQl7CgkJCSJFdmVudCI6ICJPbkxvZ2dlZEluIiwKCQkJIlVSTCI6ICIiCgkJfSwKCQl7CgkJCSJFdmVudCI6ICJPbkxvZ2dlZE91dCIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25IZWxkIiwKCQkJIlVSTCI6ICIiCgkJfSwKCQl7CgkJCSJFdmVudCI6ICJPblJldHJpZXZlZCIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25JbmNvbWluZyIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25Db25uZWN0ZWQiLAoJCQkiVVJMIjogIiIKCQl9LAoJCXsKCQkJIkV2ZW50IjogIk9uQ29uZmVyZW5jZWQiLAoJCQkiVVJMIjogIiIKCQl9LAoJCXsKCQkJIkV2ZW50IjogIk9uUmVsZWFzZWQiLAoJCQkiVVJMIjogIiIKCQl9LAoJCXsKCQkJIkV2ZW50IjogIk9uUmVzdW1lZCIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25XcmFwVXAiLAoJCQkiVVJMIjogIiIKCQl9LAoJCXsKCQkJIkV2ZW50IjogIk9uUmVhZHkiLAoJCQkiVVJMIjogIiIKCQl9LAoJCXsKCQkJIkV2ZW50IjogIk9uQ2xlYXJlZCIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25SZXNlcnZlZCIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25TeXN0ZW1BdmFpbGFibGUiLAoJCQkiVVJMIjogIiIKCQl9LAoJCXsKCQkJIkV2ZW50IjogIk9uRmFpbGVkIiwKCQkJIlVSTCI6ICIiCgkJfSwKCQl7CgkJCSJFdmVudCI6ICJPblNpbGVudFN0YXJ0ZWQiLAoJCQkiVVJMIjogIiIKCQl9LAoJCXsKCQkJIkV2ZW50IjogIk9uSW5jb21pbmdFeCIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25Db25uZWN0ZWRFeCIsCgkJCSJVUkwiOiAiIgoJCX0KCV0sCgkiQWdlbnRTZXR1cCI6IFsKCQl7CgkJCSJuYW1lIjogIlRvb2xiYXIiLAoJCQkic2V0dXAiOiBbCgkJCQl7CgkJCQkJInZhbHVlIjogIm9uVG9wIiwKCQkJCQkidmlld1ZhbHVlIjogIkFsd2F5IE9uIHRvcCIsCgkJCQkJInNlbGVjdGVkIjogZmFsc2UsCgkJCQkJImRhdGEiOiAiIgoJCQkJfSwKCQkJCXsKCQkJCQkidmFsdWUiOiAiTGFyZ2VJY29ucyIsCgkJCQkJInZpZXdWYWx1ZSI6ICJMYXJnIGljb25zIiwKCQkJCQkic2VsZWN0ZWQiOiBmYWxzZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJBdXRvUmVzaXplIiwKCQkJCQkidmlld1ZhbHVlIjogIkF1dG8gcmVzaXplIiwKCQkJCQkic2VsZWN0ZWQiOiBmYWxzZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJTdGF0dXNCYXIiLAoJCQkJCSJ2aWV3VmFsdWUiOiAiU3RhdHVzIGJhciIsCgkJCQkJInNlbGVjdGVkIjogZmFsc2UsCgkJCQkJImRhdGEiOiAiIgoJCQkJfQoJCQldCgkJfSwKCQl7CgkJCSJuYW1lIjogIlBlcnNvbmFsIE9wdGlvbnMiLAoJCQkic2V0dXAiOiBbCgkJCQl7CgkJCQkJInZhbHVlIjogIlN0YXJ0TWluIiwKCQkJCQkidmlld1ZhbHVlIjogIlN0YXJ0IG1pbmltaXplIiwKCQkJCQkic2VsZWN0ZWQiOiBmYWxzZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJFbmFibGVDbG9zZVgiLAoJCQkJCSJ2aWV3VmFsdWUiOiAiRW5hYmxlIGNsb3NpbmcgdmlhIHN5c3RlbSBtZW51IFwieFwiIiwKCQkJCQkic2VsZWN0ZWQiOiBmYWxzZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJPcGVuT25Gb3JlUmVsZWFzZSIsCgkJCQkJInZpZXdWYWx1ZSI6ICJPcGVuIFRvb2xiYXIgb24gXCJGb3JjZWQgUmVsZWFzZVwiIHN0YXRlIiwKCQkJCQkic2VsZWN0ZWQiOiBmYWxzZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJNaW5PblJlbGVhc2UiLAoJCQkJCSJ2aWV3VmFsdWUiOiAiQWxsb3cgbWluaW1pemUgdGhlIHRvb2xiYXIgaW4gXCJSZWxlYXNlXCIgc3RhdGUiLAoJCQkJCSJzZWxlY3RlZCI6IGZhbHNlLAoJCQkJCSJkYXRhIjogIiIKCQkJCX0sCgkJCQl7CgkJCQkJInZhbHVlIjogIk9wZW5PblJpbmciLAoJCQkJCSJ2aWV3VmFsdWUiOiAiT3BlbiBUb29sYmFyIG9uIFJpbmciLAoJCQkJCSJzZWxlY3RlZCI6IGZhbHNlLAoJCQkJCSJkYXRhIjogIiIKCQkJCX0sCgkJCQl7CgkJCQkJInZhbHVlIjogIk1pbk9uQW5zd2VyIiwKCQkJCQkidmlld1ZhbHVlIjogIk1pbmltaXplIG9uIGFuc3dlciIsCgkJCQkJInNlbGVjdGVkIjogZmFsc2UsCgkJCQkJImRhdGEiOiAiIgoJCQkJfSwKCQkJCXsKCQkJCQkidmFsdWUiOiAiT3Blbk9uUXVldWVkQ2FsbCIsCgkJCQkJInZpZXdWYWx1ZSI6ICJPcGVuIFRvb2xiYXIgb24gUXVldWVkIENhbGwiLAoJCQkJCSJzZWxlY3RlZCI6IGZhbHNlLAoJCQkJCSJkYXRhIjogIiIKCQkJCX0KCQkJXQoJCX0sCgkJewoJCQkibmFtZSI6ICJSaW5nIiwKCQkJInNldHVwIjogWwoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJWb2ljZSIsCgkJCQkJInZpZXdWYWx1ZSI6ICJWb2ljZSIsCgkJCQkJInNlbGVjdGVkIjogdHJ1ZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJNYWlsIiwKCQkJCQkidmlld1ZhbHVlIjogIk1haWwiLAoJCQkJCSJzZWxlY3RlZCI6IGZhbHNlLAoJCQkJCSJkYXRhIjogIiIKCQkJCX0sCgkJCQl7CgkJCQkJInZhbHVlIjogIkNoYXQiLAoJCQkJCSJ2aWV3VmFsdWUiOiAiQ2hhdCIsCgkJCQkJInNlbGVjdGVkIjogZmFsc2UsCgkJCQkJImRhdGEiOiAiIgoJCQkJfSwKCQkJCXsKCQkJCQkidmFsdWUiOiAiT3V0Ym91bmRDYWxsQ29uZmlybSIsCgkJCQkJInZpZXdWYWx1ZSI6ICJPdXRib3VuZCBDYWxsIENvbmZpcm1hdGlvbiIsCgkJCQkJInNlbGVjdGVkIjogZmFsc2UsCgkJCQkJImRhdGEiOiAiIgoJCQkJfQoJCQldCgkJfSwKCQl7CgkJCSJuYW1lIjogIlJpbmcgQWxlcnQiLAoJCQkic2V0dXAiOiBbCgkJCQl7CgkJCQkJInZhbHVlIjogIlJpbmdPbmNlIiwKCQkJCQkidmlld1ZhbHVlIjogIlJpbmcgT25jZSIsCgkJCQkJInNlbGVjdGVkIjogdHJ1ZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJDb250aW51b3VzUmluZyIsCgkJCQkJInZpZXdWYWx1ZSI6ICJDb250aW51b3VzUmluZyIsCgkJCQkJInNlbGVjdGVkIjogZmFsc2UsCgkJCQkJImRhdGEiOiAiIgoJCQkJfQoJCQldCgkJfSwKCQl7CgkJCSJuYW1lIjogIlJpbmcgVG9uZSIsCgkJCSJzZXR1cCI6IFsKCQkJCXsKCQkJCQkidmFsdWUiOiAiRGVmYXVsdFJpbmciLAoJCQkJCSJ2aWV3VmFsdWUiOiAiRGVmYXVsdCAoc3BlYWtlciBCZWVwIiwKCQkJCQkic2VsZWN0ZWQiOiBmYWxzZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJXYXZlRmlsZSIsCgkJCQkJInZpZXdWYWx1ZSI6ICJGaWxlIChXYXZlIGZpbGVzIG9ubHksUmVxdWlyZWQgc291bmQgY2FyZCkiLAoJCQkJCSJzZWxlY3RlZCI6IHRydWUsCgkJCQkJImRhdGEiOiAiUmluZzA2LndhdiIKCQkJCX0KCQkJXQoJCX0sCgkJewoJCQkibmFtZSI6ICJRdWV1ZSBBbGVydCIsCgkJCSJzZXR1cCI6IFsKCQkJCXsKCQkJCQkidmFsdWUiOiAiU3BlYWtlckJlZXAiLAoJCQkJCSJ2aWV3VmFsdWUiOiAiU3BlYWtlciBCZWVwIChSaW5nIE9uY2UpIiwKCQkJCQkic2VsZWN0ZWQiOiB0cnVlLAoJCQkJCSJkYXRhIjogIiIKCQkJCX0sCgkJCQl7CgkJCQkJInZhbHVlIjogIldhdmVGaWxlIiwKCQkJCQkidmlld1ZhbHVlIjogIkZpbGUgKFdhdmUgZmlsZXMgb25seSxSZXF1aXJlZCBzb3VuZCBjYXJkKSIsCgkJCQkJInNlbGVjdGVkIjogZmFsc2UsCgkJCQkJImRhdGEiOiAidGVsZXBob25lcmluZy0xLndhdiIKCQkJCX0KCQkJXQoJCX0sCgkJewoJCQkibmFtZSI6ICJQb3B1cCB3aW5kb3dzIiwKCQkJInNldHVwIjogWwoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJTcGVha2VyQmVlcCIsCgkJCQkJInZpZXdWYWx1ZSI6ICJTcGVha2VyIEJlZXAgKFJpbmcgT25jZSkiLAoJCQkJCSJzZWxlY3RlZCI6IHRydWUsCgkJCQkJImRhdGEiOiAiIgoJCQkJfSwKCQkJCXsKCQkJCQkidmFsdWUiOiAiV2F2ZUZpbGUiLAoJCQkJCSJ2aWV3VmFsdWUiOiAiRmlsZSAoV2F2ZSBmaWxlcyBvbmx5LFJlcXVpcmVkIHNvdW5kIGNhcmQpIiwKCQkJCQkic2VsZWN0ZWQiOiBmYWxzZSwKCQkJCQkiZGF0YSI6ICJ0ZWxlcGhvbmVyaW5nLTEud2F2IgoJCQkJfQoJCQldCgkJfQoJXSwKCSJUb29sQmFyIjogewoJCSJCdXR0b25zIjogWwoJCQl7CgkJCQkiQnV0dG9uIjogIkxvZ2luUHJpbWFyeUdyb3VwcyIsCgkJCQkiZGF0YSI6ICIiCgkJCX0sCgkJCXsKCQkJCSJCdXR0b24iOiAiUmVsZWFzZSIsCgkJCQkiZGF0YSI6ICIiCgkJCX0sCgkJCXsKCQkJCSJCdXR0b24iOiAiTG9naW5Hcm91cCIsCgkJCQkiZGF0YSI6ICIiCgkJCX0sCgkJCXsKCQkJCSJCdXR0b24iOiAiR3JvdXBzTWFuYWdlciIsCgkJCQkiZGF0YSI6ICIiCgkJCX0sCgkJCXsKCQkJCSJCdXR0b24iOiAiUmVsZWFzZXdpdGhDb2RlIiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJBZ2VudFJlYWR5IiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJXcmFwdXBDb2RlIiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJXcmFwdXBNYW51YWxDb250cm9sIiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJNYWtlTkFDYWxsIiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJDbGVhckNvbm5lY3Rpb24iLAoJCQkJImRhdGEiOiAiIgoJCQl9LAoJCQl7CgkJCQkiQnV0dG9uIjogIkhvbGQiLAoJCQkJImRhdGEiOiAiIgoJCQl9LAoJCQl7CgkJCQkiQnV0dG9uIjogIlJldHJpZXZlIiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJUcmFuc2ZlckNhbGwiLAoJCQkJImRhdGEiOiAiIgoJCQl9LAoJCQl7CgkJCQkiQnV0dG9uIjogIlN0YXJ0Q29uc3VsdGF0aW9uIiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJDb21wbGV0ZVRyYW5zZmVyIiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJDb21wbGV0ZUNvbmZlcmVuY2UiLAoJCQkJImRhdGEiOiAiIgoJCQl9CgkJXQoJfSwKCSJDYWxsc1N0YXR1cyI6IHsKCQkiQ29sdW1ucyI6IFsKCQkJewoJCQkJIkluZGV4IjogIjEwMDA3IiwKCQkJCSJGb3JtYXQiOiAiMCIsCgkJCQkiSGVhZGVyIjogIlN0YXR1cyIsCgkJCQkiU29ydCI6ICIxIiwKCQkJCSJXaWR0aCI6ICIxMDAiCgkJCX0sCgkJCXsKCQkJCSJJbmRleCI6ICIxMDAwOSIsCgkJCQkiRm9ybWF0IjogIjAiLAoJCQkJIkhlYWRlciI6ICJjYWxsaW5nIiwKCQkJCSJTb3J0IjogIjEiLAoJCQkJIldpZHRoIjogIjEwMCIKCQkJfSwKCQkJewoJCQkJIkluZGV4IjogIjEwMDAyIiwKCQkJCSJGb3JtYXQiOiAiMCIsCgkJCQkiSGVhZGVyIjogImNhbGxlZCIsCgkJCQkiU29ydCI6ICIxIiwKCQkJCSJXaWR0aCI6ICIxMDAiCgkJCX0sCgkJCXsKCQkJCSJJbmRleCI6ICIxIiwKCQkJCSJGb3JtYXQiOiAiMCIsCgkJCQkiSGVhZGVyIjogIkROSVMiLAoJCQkJIlNvcnQiOiAiMSIsCgkJCQkiV2lkdGgiOiAiNzUiCgkJCX0KCQldCgl9LAoJIkFDRENhbGxzIjogewoJCSJDb2x1bW5zIjogWwoJCQl7CgkJCQkiSW5kZXgiOiAiMiIsCgkJCQkiRm9ybWF0IjogIjAiLAoJCQkJIkhlYWRlciI6ICJDYWxsaW5nIiwKCQkJCSJTb3J0IjogIjEiLAoJCQkJIldpZHRoIjogIjEwMCIKCQkJfSwKCQkJewoJCQkJIkluZGV4IjogIjEiLAoJCQkJIkZvcm1hdCI6ICIwIiwKCQkJCSJIZWFkZXIiOiAiRE5JUyIsCgkJCQkiU29ydCI6ICIxIiwKCQkJCSJXaWR0aCI6ICI3NSIKCQkJfSwKCQkJewoJCQkJIkluZGV4IjogIjEwMDAwIiwKCQkJCSJGb3JtYXQiOiAiMCIsCgkJCQkiSGVhZGVyIjogIkFDRCBHcm91cCIsCgkJCQkiU29ydCI6ICIxIiwKCQkJCSJXaWR0aCI6ICIxMDAiCgkJCX0sCgkJCXsKCQkJCSJJbmRleCI6ICIzIiwKCQkJCSJGb3JtYXQiOiAiMCIsCgkJCQkiSGVhZGVyIjogIlByaW9yaXR5IiwKCQkJCSJTb3J0IjogIjEiLAoJCQkJIldpZHRoIjogIjUzIgoJCQl9LAoJCQl7CgkJCQkiSW5kZXgiOiAiOSIsCgkJCQkiRm9ybWF0IjogIjAiLAoJCQkJIkhlYWRlciI6ICJRdWV1ZSBQb3NpdGlvbiIsCgkJCQkiU29ydCI6ICIxIiwKCQkJCSJXaWR0aCI6ICIxMDAiCgkJCX0sCgkJCXsKCQkJCSJJbmRleCI6ICIxNSIsCgkJCQkiRm9ybWF0IjogIjAiLAoJCQkJIkhlYWRlciI6ICJNZWRpYSIsCgkJCQkiU29ydCI6ICIxIiwKCQkJCSJXaWR0aCI6ICIxMDAiCgkJCX0KCQldCgl9LAoJIkNhbGxzTG9nIjogewoJCSJDb2x1bW5zIjogWwoJCQl7CgkJCQkiSW5kZXgiOiAiMTAwMTUiLAoJCQkJIlNvcnQiOiAiMSIsCgkJCQkiSGVhZGVyIjogIkNyZWF0aW9uIFRpbWUiLAoJCQkJIldpZHRoIjogIjEwMCIsCgkJCQkiRm9ybWF0IjogIjAiCgkJCX0sCgkJCXsKCQkJCSJJbmRleCI6ICIyIiwKCQkJCSJTb3J0IjogIjEiLAoJCQkJIkhlYWRlciI6ICJDYWxsZXIiLAoJCQkJIldpZHRoIjogIjEwMCIsCgkJCQkiRm9ybWF0IjogIjAiCgkJCX0sCgkJCXsKCQkJCSJJbmRleCI6ICIxMDAwMiIsCgkJCQkiRm9ybWF0IjogIjAiLAoJCQkJIkhlYWRlciI6ICJDYWxsZWQiLAoJCQkJIlNvcnQiOiAiMSIsCgkJCQkiV2lkdGgiOiAiMTAwIgoJCQl9LAoJCQl7CgkJCQkiSW5kZXgiOiAiMzgiLAoJCQkJIkZvcm1hdCI6ICIwIiwKCQkJCSJIZWFkZXIiOiAiQUNEIEdyb3VwIiwKCQkJCSJTb3J0IjogIjEiLAoJCQkJIldpZHRoIjogIjEwMCIKCQkJfSwKCQkJewoJCQkJIkluZGV4IjogIjEwMDA3IiwKCQkJCSJGb3JtYXQiOiAiMCIsCgkJCQkiSGVhZGVyIjogIkxhc3QgU3RhdGUiLAoJCQkJIlNvcnQiOiAiMSIsCgkJCQkiV2lkdGgiOiAiMTAwIgoJCQl9LAoJCQl7CgkJCQkiSW5kZXgiOiAiMSIsCgkJCQkiRm9ybWF0IjogIkxlZnQiLAoJCQkJIkhlYWRlciI6ICJUcnVuayIsCgkJCQkiU29ydCI6ICIxIiwKCQkJCSJXaWR0aCI6ICIxMDAiCgkJCX0sCgkJCXsKCQkJCSJJbmRleCI6ICIxMDAxNCIsCgkJCQkiRm9ybWF0IjogIjAiLAoJCQkJIkhlYWRlciI6ICJEZWxldGlvbiBUaW1lIiwKCQkJCSJTb3J0IjogIjEiLAoJCQkJIldpZHRoIjogIjEwMCIKCQkJfQoJCV0KCX0sCgkiVGVsZXBob255IjogewoJCSJOdW1iZXJPZkFjdGlvbnMiOiAiNDAiLAoJCSJhY3Rpb25zIjogWwoJCQl7CgkJCQkiSWR4IjogIjAiLAoJCQkJIkNhcHRpb24iOiAiQW5zd2VyIiwKCQkJCSJGdW5jdGlvbiI6ICJBbnN3ZXIiLAoJCQkJIkRhdGEiOiAiIgoJCQl9LAoJCQl7CgkJCQkiSWR4IjogIjEiLAoJCQkJIkNhcHRpb24iOiAiRGlzY29ubmVjdCIsCgkJCQkiRnVuY3Rpb24iOiAiQ2xlYXJDb25uZWN0aW9uIiwKCQkJCSJEYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIklkeCI6ICIyIiwKCQkJCSJDYXB0aW9uIjogIkNhbGwiLAoJCQkJIkZ1bmN0aW9uIjogIk1ha2VOQUNhbGwiLAoJCQkJIkRhdGEiOiAiIgoJCQl9CgkJXQoJfSwKCSJTQVZFRF9OVU1CRVJTIjogewoJCSJNYWtlQ2FsbE51bWJlcnMiOiBbCgkJCSIiLAoJCQkiIiwKCQkJIiIKCQldCgl9Cn0=";
//
//================================[AccapiWorkThread_c::LogoffAllAgents]==================
void LogoffAllAgents(int clientid)
{
  SWT->LogoffAllAgents(clientid);
}
void AccapiWorkThread_c::LogoffAllAgents(int clientid)
{
  AGENTINFO_MAP_IT it = agents_db.begin();
  for (it; it != agents_db.end(); ++it)
  {
    AgentDbInfo_c& ADI = (*it).second;
    if (ADI.m_AgentWSid == clientid && ADI.m_allready_confirmed == true)
    {
      //sea_provider.LogoutAgent(requestid++,ADI.m_Agent_id);
      //
      agentDisconnect(&ADI, true);
      //
      accapi_my_print(0, "AccapiWorkThread_c::LogoffAllAgents, agentDisconnect: %s\n", ADI.m_Number);
    }
    //sea_provider.Logout(requestid++
  }
}

//================================[AccapiWorkThread_c::agentDisconnect]==================
void AccapiWorkThread_c::agentDisconnect(AgentDbInfo_c* ADI, bool isFromLogon)
{
  accapi_my_print(0, "--- AccapiWorkThread_c::agentDisconnect , agent no: %s, sessionid: %s\n", ADI->m_Number, ADI->m_SessionId.c_str());

  m_AccapiSmManager->m_proxy_obj->WebAgentDisconnected(ADI->m_SmClientId, ADI->m_Number, ADI->m_SessionId);
  //
  m_sea_reply.RemoveDeviceMonitor(m_sea_reply.GetRequestId(), ADI->m_Extenstion, 0);
  m_sea_reply.RemoveFromAgents_device_Map(ADI->m_Extenstion);
  //
  ADI->m_allready_confirmed = false;
  ADI->m_Ip = "";
}

//================================[AccapiWorkThread_c::LogoffX]==================
void AccapiWorkThread_c::LogoffX(AgentDbInfo_c* ADI, bool isFromLogon)
{
  m_AccapiSmManager->WebAgentLoggedOff(ADI->m_SmClientId, ADI->m_Number, ADI->m_SessionId, ADI->m_Extenstion);
  ADI->m_SmClientId = -1;
  ADI->m_allready_confirmed = false;
  ADI->m_Ip = "";
}

//======================================[gccsSupLogoff]===========================
void AccapiWorkThread_c::SupLogoff(string action, SUP_c* sup, supEntry* entry, string note)
{
  if (action.find("gccs") != string::npos)
    m_web_gccs->gccsSupLogoff(sup, entry, note);
  else if (action.find("admin") != string::npos)
    m_web_admin->adminSupLogoff(sup, entry, note);
}


//======================================[ConvertFileToB64]========================
//2019-09-23 AlisherM BZ#50840: read file and convert it to Base64 string 
RetCode_t AccapiWorkThread_c::ConvertFileToB64(string FileName, string& B64, Ulong_t min_len)
{
  FILE* fp = fopen(FileName.c_str(), "r");
  if (fp == NULL)
  {
    accapi_my_print(0, "AccapiWorkThread_c::ConvertFileToB64 ERROR: failed to open file %s\n", FileName.c_str());
    return BSWRC_FAIL;
  }
  fseek(fp, 0, SEEK_END);
  long fileSize = ftell(fp);
  fseek(fp, 0, SEEK_SET);

  //2020-01-02 AlisherM: merged changes of Shaul: check min length of the file
  if (fileSize < min_len)
  {
    accapi_my_print(0, "AccapiWorkThread_c::ConvertFileToB64 ERROR: file %s is corrupted (len %d < min_len %d) \n", FileName.c_str(), fileSize, min_len);
    fclose(fp);
    return BSWRC_FAIL;
  }

  char* area = new char[fileSize + 2];
  memset(area, 0, fileSize + 1);
  if (area == NULL)
  {
    accapi_my_print(0, "AccapiWorkThread_c::ConvertFileToB64 ERROR: cannot allocate area for file %s\n", FileName.c_str());
    fclose(fp);
    return BSWRC_FAIL;
  }

  int len = fread(area, 1, fileSize, fp);

  fclose(fp);
  string input = area;
  // accapi_my_print(0, "'%s\n%s'\n", FileName.c_str(), input.c_str());


  B64 = "";
  Base64::Encode(input, &B64);
  delete[] area;
  accapi_my_print(0, "AccapiWorkThread_c::ConvertFileToB64 read file %s (size %d), converted to Base64 (size %d): %.70s\n", FileName.c_str(), fileSize, B64.length(), B64.c_str());

  return BSWRC_OK;
} //ConvertFileToB64


//================================[AccapiWorkThread_c::SendAllLists]==================
void AccapiWorkThread_c::SendAllLists(AgentDbInfo_c* ADI, bool all)
{
  string agentNo = &(ADI->m_Number[0]);
  REPORT report;
  bool send_end = true;
  //
  accapi_my_print(0, "+++++ Send Groups to Agent %s, total Groups: %d +++++\n", agentNo.c_str(), grp_db.size());
  report.m_Action = "__groups";
  GRP_MAP_IT it = grp_db.begin();
  for (it; it != grp_db.end(); ++it)
  {
    Groups_c& grp = (*it).second;
    report.m_CallId = grp.m_GrpId;
    report.m_DevId = &grp.m_GrpName[0];
    m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
    //accapi_my_print(0,"{\"key\": %d,\"value\": \"%s\"},\n",grp.m_GrpId,&grp.m_GrpName[0]);
  }
  // send call profile fields
  report.m_Action = "__callprofiles";
  CP_MAP_IT itx = cp_db.begin();
  accapi_my_print(0, "+++++ Send callprofiles to Agent %s, total CPF: %d +++++\n", agentNo.c_str(), cp_db.size());
  for (itx; itx != cp_db.end(); ++itx)
  {
    Cp_c& cps = (*itx).second;
    report.m_CallId = cps.m_CPId;
    report.m_DevId = &cps.m_CPName[0];
    m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
  }
  // send release cause

  report.m_Action = "__releasecodes";
  RC_MAP_IT ity = rc_db.begin();
  accapi_my_print(0, "+++++ Send Release Codes to Agent %s, total RC: %d +++++\n", agentNo.c_str(), rc_db.size());
  for (ity; ity != rc_db.end(); ++ity)
  {
    ReleaseCodes_c& RC = (*ity).second;
    report.m_CallId = RC.m_RCId;
    report.m_DevId = &RC.m_RCName[0];
    m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
  }
  // send wrap up codes
  report.m_Action = "__wrapupcodes";
  WU_MAP_IT itw = wu_db.begin();
  accapi_my_print(0, "+++++ Send Wrapup Codes to Agent %s, total WC: %d +++++\n", agentNo.c_str(), wu_db.size());
  for (itw; itw != wu_db.end(); ++itw)
  {
    WrapUpCodes_c& WU = (*itw).second;
    report.m_CallId = WU.m_WUId;
    report.m_DevId = &WU.m_WUName[0];
    m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
  }
  // send services
  report.m_Action = "__services";
  SRV_MAP_IT its = srv_db.begin();
  accapi_my_print(0, "+++++ Send Services to Agent %s, total Services: %d +++++\n", agentNo.c_str(), srv_db.size());
  for (its; its != srv_db.end(); ++its)
  {
    Srvss_c& SRV = (*its).second;
    report.m_CallId = SRV.m_SrvId;
    report.m_DevId = &SRV.m_SrvName[0];
    m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
  }
  report.m_CallId = 0;
  report.m_DevId = "";
  // agent detalis
  report.m_Action = "__agentsdetails";
  AGENTINFO_MAP_IT ita = agents_db.begin();
  string s = "";
  string id = "";
  string desc = "";
  accapi_my_print(0, "+++++ Send Agents Details to Agent %s, total Agents: %d +++++\n", agentNo.c_str(), agents_db.size());
  for (ita; ita != agents_db.end(); ++ita)
  {
    AgentDbInfo_c& ADI1 = (*ita).second;
    id = &ADI1.m_Number[0];
    desc = &ADI1.m_Name[0];
    s += id + ";" + desc + "|";
    if (s.length() > 20000)
    {
      report.m_MoreDetail = s;
      m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
      s = "";
    }
  }
  if (s.length() > 0)
  {
    report.m_MoreDetail = s;
    m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
  }

  //24-Jul-2019 BZ#50339
  report.m_MoreDetail = "";
  //---------------------
  // Send __etasini
  report.m_Action = "__etasini";
  string b64 = "";
  //read personal ETAS.json
  string etasName = "../Agents/" + agentNo + +"/ETAS.json";
  if (ConvertFileToB64(etasName, b64, 1000) == BSWRC_FAIL)
  {
    //if personal failed, then read general ETAS.json
    etasName = "../Agents/ETAS.json";
    if (ConvertFileToB64(etasName, b64, 1000) == BSWRC_FAIL)
    {
      //if both failed, then send default (hardcoded) ETAS.json
      accapi_my_print(0, " ++ SendAllLists=> ERROR: cannot open ETAS.json for agent %s, Send default ETAS.json from memory send BaseEtas\n", agentNo.c_str());
      b64 = BaseEtas;
      //prevent sending action "_endautosend", so agent side will have indication that didn't get all information
      send_end = false;
    }
  }

  report.m_CallId = 0;
  report.m_DevId = b64;
  m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);

  // ====================== Send __crmjson ====================
  //2019-09-23 AlisherM BZ#50840: read and send CRM.json
  report.m_Action = "__crmjson";
  b64 = "";
  report.m_DevId = b64;
  string crm_json = "../Agents/CRM.json";
  if (ConvertFileToB64(crm_json, b64) == BSWRC_FAIL)
  {
    accapi_my_print(0, " ++ Send CRM.json=> cannot open CRM.json for agent %s\n", agentNo.c_str());
    //prevent sending action "_endautosend", so agent side will have indication that didn't get all information
    send_end = false;
  }
  report.m_CallId = 0;
  report.m_DevId = b64;
  m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);

  // ====================== Send __phonebook ====================
  report.m_MoreDetail = "";
  report.m_Action = "__phonebook";
  b64 = "";
  string phonebookName = "../Agents/phonebook.json";
  if (ConvertFileToB64(phonebookName, b64) == BSWRC_FAIL)
  {
    accapi_my_print(0, " ++ Send phonebook=> cannot open phonebook.json for agent %s\n", agentNo.c_str());
    //prevent sending action "_endautosend", so agent side will have indication that didn't get all information
    //send_end = false;
  }
  else
  {
    report.m_DevId = b64;
    report.m_CallId = 0;
    report.m_MoreDetail = "";
    report.m_DetailedAction = "";
    m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
  }
  if (send_end)
  {
    // send end auto send table
    my_sleep(100);
    accapi_my_print(0, "End Auto send needed tables\n");
    report.m_Action = "_endautosend";
    report.m_DevId = "_endautosend";
    m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
  }
  if (send_end)
  {
    // send end auto send table
    my_sleep(100);
    accapi_my_print(0, "End Auto send needed tables\n");
    report.m_Action = "_endautosend";
    report.m_DevId = "_endautosend";
    m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
  }
  string gccstr = "";
  ReadAndPrepareaccAgentEvents(gccstr);
}

//----------------------------------

//bool getValueByNamefromJsonstring(string& jsonstring, char* name, string& result);
void personal_statistics_req(Ulong_t agent_id);


//================================[AccapiWorkThread_c::PostEventHandling]=========
void AccapiWorkThread_c::PostEventHandling()
{
  string req = "";
  while ((req = GetRequesfromQueue()) != "")
  {
    RetCode_t       rc = BSWRC_OK;

    if (req == "")
    {
      return;
    }
    vector<string> splited;
    int count = Split((char*)req.c_str(), splited, (char*)",");
    int code = getActionCode(splited[0]);
    ErConnId_t ConnId;
    ErConnId_t HeldConnId;

    accapi_my_print(0, "req (splited %d): %s\n", count, req.c_str());
   //splited: suplogongate, 3221102510133, ea, e460fc1be303324a04275c52f6d83f24, 0:0:0:0:0:0:0:1
   //accapi_my_print(0, "splited(count %d): %s, %s, %s, %s, %s\n", count, splited[0].c_str(), splited[1].c_str(), splited[2].c_str(), splited[3].c_str(), splited[4].c_str());

    //GCCS requests
    if ( (code >= GCCS_REQUEST_START) && (code < ADMIN_REQUEST_START) )
    {
      m_web_gccs->HandleGccsRequest(code, splited);
      return;
    }
    // Admin requests
    else if (code >= ADMIN_REQUEST_START)
    {
      m_web_admin->HandleAdminRequest(code, splited);
      return;
    }

    // Agent requests
    AgentDbInfo_c* ADI = AGENTINFOfindByAgenNumber(splited[2]);
    if (ADI == NULL)
    {
      accapi_my_print(0, "AccapiWorkThread_c::PostEventHandling => NULL ADI %s\n", splited[2].c_str());
      return; // no such agent number
    }
    //
    ADI->m_LastKeeAliveTime = time(0); // update last time get something from this agent
    //
    if (count > 0)
    {
      if (code != API_GETPERSONALSTATISTICS) {
        accapi_my_print(6, "AccapiWorkThread_c:: POP  queue size: %d => %.400s, \n", RecieveQueu.size(), req.c_str());
      }
      //
      switch (code)
      {
        case API_GETPERSONALSTATISTICS:
          personal_statistics_req(ADI->m_Agent_id);
          break;

        case API_AGENTLOG:
          {
            string b64;
            bool b = Base64::Decode(splited[5], &b64);
            if (b == false)
            {
              b64 = "fail to decode b64: " + splited[5];
            }
            accapi_my_print(0, "%s, %s, %s, %s, %s\n", splited[0].c_str(), splited[2].c_str(), splited[3].c_str(), splited[4].c_str(), b64.c_str());
          }
          break;
        //
        case API_AGENTDETAILS:
          {
            break;
            REPORT report;
            report.m_Action = "__agentsdetails";
            AGENTINFO_MAP_IT it = agents_db.begin();
            string s = "";
            string id = "";
            string desc = "";
            for (it; it != agents_db.end(); ++it)
            {
              AgentDbInfo_c& ADI = (*it).second;
              id = &ADI.m_Number[0];
              desc = ADI.m_Name;
              s += id + ";" + desc + "|";
              if (s.length() > 20000)
              {
                report.m_MoreDetail = s;
                m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
                s = "";
              }
            }
            if (s.length() > 0)
            {
              report.m_MoreDetail = s;
              m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
            }
          }
          break;

        //
        case API_SERVICES:
        {
          break;
          REPORT report;
          report.m_Action = "__services";
          SRV_MAP_IT it = srv_db.begin();
          for (it; it != srv_db.end(); ++it)
          {
            Srvss_c& ADI = (*it).second;
            report.m_CallId = ADI.m_SrvId;
            report.m_DevId = &ADI.m_SrvName[0];
            m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
          }
        }
        break;

      //
      case API_GROUPS:
        {
          break;
          REPORT report;
          report.m_Action = "__groups";
          GRP_MAP_IT it = grp_db.begin();
          for (it; it != grp_db.end(); ++it)
          {
            Groups_c& ADI = (*it).second;
            report.m_CallId = ADI.m_GrpId;
            report.m_DevId = &ADI.m_GrpName[0];
            m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
          }
          break;
        }
        break;

      //
      case API_CALLPROFILES:
        {
          break;
          REPORT report;
          report.m_Action = "__callprofiles";
          CP_MAP_IT it = cp_db.begin();
          for (it; it != cp_db.end(); ++it)
          {
            Cp_c& ADI = (*it).second;
            report.m_CallId = ADI.m_CPId;
            report.m_DevId = &ADI.m_CPName[0];
            m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
          }
          break;
        }

      //
      case API_WRAPUPCODES:
        {
          break;
          REPORT report;
          report.m_Action = "__wrapupcodes";
          WU_MAP_IT it = wu_db.begin();
          for (it; it != wu_db.end(); ++it)
          {
            WrapUpCodes_c& ADI = (*it).second;
            report.m_CallId = ADI.m_WUId;
            report.m_DevId = &ADI.m_WUName[0];
            m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
          }
          break;
        }

      //
      case API_REASECODES:
        {
          break;
          REPORT report;
          report.m_Action = "__releasecodes";
          RC_MAP_IT it = rc_db.begin();
          for (it; it != rc_db.end(); ++it)
          {
            ReleaseCodes_c& ADI = (*it).second;
            report.m_CallId = ADI.m_RCId;
            report.m_DevId = &ADI.m_RCName[0];
            m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
          }
          break;
        }
        break;

      //
      case API_GETETAS:
        {
          break;
          REPORT report;
          report.m_Action = "__etasini";
          report.m_CallId = 0;
          accapi_my_print(0, " ++ cannot open ETAS.json for agent Send default etas.json in memory %s\n", splited[2].c_str());
          report.m_DevId = BaseEtas;
          m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
        }
        break;

      //
      case API_SAVEETASINI:
        {
          string s = splited[3];
          if (ADI->m_EtasiniPart != "")
          {
            s = ADI->m_EtasiniPart + splited[3];
            ADI->m_EtasiniPart = "";
          }
          string b64 = s;
          if (b64.length() < 1000)
          {
            accapi_my_print(0, "API_SAVEETASINI=> etas.json too short ,not saved: %s\n", b64.c_str());
            break;
          }
          string output = "";
          bool b = Base64::Decode(b64, &output);
          if (b == false)
          {
            accapi_my_print(0, "API_SAVEETASINI=> FAILED to decode ETAS.json for agent: %s, len: %d %.70s\n", splited[2].c_str(), output.length(), output.c_str());
            break;
          }
          if (strlen(output.c_str()) < 1000)
          {
            accapi_my_print(0, "API_SAVEETASINI=> ETAS.json  corrupt  for agent: %s, len: %d %.70s\n", splited[2].c_str(), output.length(), output.c_str());
            break;
          }
          string etasName = "../Agents/" + splited[2];//   + "/ETAS.json";
          CreateDirectory(etasName.c_str(), 0);
          etasName += "/ETAS.json";
          accapi_my_print(0, "API_SAVEETASINI=>   fnm: %s\n", etasName.c_str());
          FILE* fp = fopen(etasName.c_str(), "wb");
          if (fp == NULL)
          {
            accapi_my_print(0, "API_SAVEETASINI=> CANNOT Update ETAS.json for agent: %s, errno: %d\n", splited[2].c_str(), errno);
            break;;
          }
          int len = fwrite(output.c_str(), 1, output.length(), fp);
          fclose(fp);
          if (len == -1)
          {
            accapi_my_print(0, "API_SAVEETASINI=> CANNOT Update ETAS.json for agent %s\n", splited[2].c_str());
            break;;
          }

        }
        break;

      //
      case API_SAVEPHONEBOOK:
        {
          string s = splited[3];
          if (ADI->m_PhonbookPart != "")
          {
            s = ADI->m_PhonbookPart + splited[3];
          }
          accapi_my_print(0, "API_SAVEPHONEBOOK=> ADI->m_PhonbookPart len: %d + splited[3] len: %d = %d\n",
            ADI->m_PhonbookPart.length(), splited[3].length(), s.length());
          ADI->m_PhonbookPart = "";
          string b64 = s;
          string output = "";
          bool b = Base64::Decode(b64, &output);
          if (b == false)
          {
            accapi_my_print(0, "API_SAVEPHONEBOOK=> FAILED to decode phonebook.json for agent: %s, len: %d %.70s\n", splited[2].c_str(), output.length(), output.c_str());
            break;
          }
          //
          if (output.length() < 50) {
            accapi_my_print(0, "API_SAVEPHONEBOOK=> too short phonebook: %d length\n do not write it\n", output.length());
          }
          string phoneName = "../Agents";//" + splited[2];//   + "/ETAS.json";
          //CreateDirectory(phoneName.c_str(),0);
          phoneName += "/phonebook.json";
          char bkphone[120];
          sprintf(&bkphone[0], "%s.%ld\0", phoneName.c_str(), time(0));
          accapi_my_print(0, "API_SAVEPHONEBOOK=>   fnm: %s, backup: %s\n", phoneName.c_str(), bkphone);
          rename(phoneName.c_str(), (const char*)&bkphone[0]);
          FILE* fp = fopen(phoneName.c_str(), "w");
          if (fp == NULL)
          {
            accapi_my_print(0, "API_SAVEPHONEBOOK=> CANNOT Update  phonebook.json for agent: %s, errno: %d\n", splited[2].c_str(), errno);
            break;
          }
          int len = fwrite(output.c_str(), 1, output.length(), fp);
          fclose(fp);
          if (len == -1)
          {
            accapi_my_print(0, "API_SAVEPHONEBOOK=> CANNOT Update ETAS.json for agent %s\n", splited[2].c_str());
            break;
          }
        }
        break;

      //
      case API_LOGOFFALL:
        {
          AGENTINFO_MAP_IT it = agents_db.begin();
          for (it; it != agents_db.end(); ++it)
          {
            //AgentDbInfo_c &ADI = (*it).second;
            //sea_provider.Logout(requestid++
          }
        }
        break;

      case API_LOGON:// agent logon with password, going to sm1
        {
          REPORT report;
          report.m_Action = "forcedLogoff";
          string ext = splited[4];
          ADI->m_TempExtension = ADI->m_Extenstion;
          ADI->m_Extenstion = ext;

          ADI->m_Ip = splited[5];
          char session[120];
          sprintf(&session[0], "%d:%s", ADI->m_AgentWSid, ADI->m_SessionId.c_str());
          string version = splited[7];
          string server_version = SuGetEpicVersion();
          if (version != server_version)
          {
            report.m_Action = "agentDenied";
            report.m_Code1 = WRONG_ETAS_VERSION;
            report.m_CallingCalledDevId = ADI->m_Extenstion;
            report.m_JoiningCalledDevId = server_version + "/" + version;
            m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), AccapiCrmType_c::Login, report, ADI->m_AgentWSid, ADI->m_SessionId);
            accapi_my_print(0, "API_LOGON ==> logon denied, wrong web agent %s version, server: %s, agent: %s\n", splited[2].c_str(), server_version.c_str(), version.c_str());
            break;
          }
          //Base64::Decode(splited[7], &version);
          accapi_my_print(0, "API_LOGON, Agent No: %s, session:%s,web agent version %s\n", splited[2].c_str(), session, version.c_str());
          if (m_IsSSO == FALSE)
          {
            string passmd5 = splited[3];
            string newPass = ADI->m_SessionId; newPass += (char*)":"; newPass += &ADI->m_Pass[0];
            string newPassMd5 = makekey(newPass, newPass.length());
            /*
            accapi_my_print(0, "API_LOGON, splited[0]: %s, splited[1]: %s, splited[2]: %s, splited[3]: %s, splited[4]: %s, splited[5]: %s, splited[6]: %s, splited[7]: %s, splited[8]: %s, splited[9]: %s\n",
                      splited[0].c_str(),
                      splited[1].c_str(),
                      splited[2].c_str(),
                      splited[3].c_str(),
                      splited[4].c_str(),
                      splited[5].c_str(),
                      splited[6].c_str(),
                      splited[7].c_str(),
                      splited[8].c_str(),
                      splited[9].c_str());
            accapi_my_print(0, "API_LOGON, agent no: %s, session:%s,web agent version %s\n", splited[2].c_str(), session, version.c_str());
            */
            if (newPassMd5 == passmd5)
            {
              rc = m_AccapiSmManager->m_proxy_obj->ConfirmWebAgent(splited[2].c_str(),  //agent number
                                                                   &ADI->m_Pass[0],     //agent password
                                                                   splited[4].c_str(),  //agent extension
                                                                   session,  //
                                                                   ADI->m_AgentWSid,
                                                                   splited[6].c_str(),  // Tomact IP
                                                                   "",                  // Mail address
                                                                   version.c_str(),     // Mail password -  client version
                                                                   ADI->m_Ip.c_str());  // agennt ip
            }
            else
            {
              report.m_Action = "agentDenied";
              report.m_Code1 = WRONG_PASSWORD;
              report.m_CallingCalledDevId = ADI->m_Extenstion;
              report.m_JoiningCalledDevId = server_version + "/" + version;
              m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), AccapiCrmType_c::Login, report, ADI->m_AgentWSid, ADI->m_SessionId);
              accapi_my_print(0, "API_LOGON ==> logon denied, wrong web agent %s password, server: C: %s / S: %s\n", splited[2].c_str(), passmd5.c_str(), newPassMd5.c_str());
            }
          }
          else //SSO on
          {
            accapi_my_print(0, "LOGON SSO AGENT: %s\n", &ADI->m_Name[0]);
            rc = m_AccapiSmManager->m_proxy_obj->ConfirmSSOWebAgent(splited[2].c_str(),  //agent principal name
                                                                    splited[4].c_str(),  //agent extension
                                                                    session,  //
                                                                    ADI->m_AgentWSid,
                                                                    splited[6].c_str(),  // Tomact IP
                                                                    ADI->m_Ip.c_str());  // agennt ip 
          }
        }
        break;

      //
      case API_LOGONGATE:// agent logon By accGate, going to sm1
        {
          REPORT report;
          report.m_Action = "forcedLogoff";
          string ext = splited[4];
          ADI->m_TempExtension = ADI->m_Extenstion;
          ADI->m_Extenstion = ext;

          ADI->m_Ip = splited[5];
          char session[120];
          sprintf(&session[0], "%d:%s", ADI->m_AgentWSid, ADI->m_SessionId.c_str());
          string version = splited[7];
          string server_version = SuGetEpicVersion();
          if (version != server_version)
          {
            report.m_Action = "agentDenied";
            report.m_Code1 = WRONG_ETAS_VERSION;
            report.m_CallingCalledDevId = ADI->m_Extenstion;
            report.m_JoiningCalledDevId = server_version + "/" + version;
            m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), AccapiCrmType_c::Login, report, ADI->m_AgentWSid, ADI->m_SessionId);
            accapi_my_print(0, "API_LOGONGATE ==> logon denied, wrong web agent %s version, server: %s, agent: %s\n", splited[2].c_str(), server_version.c_str(), version.c_str());
            break;
          }
          //Base64::Decode(splited[7], &version);
          accapi_my_print(0, "API_LOGONGATE, agent no: %s, session:%s,web agent version %s\n", splited[2].c_str(), session, version.c_str());
          if (m_IsSSO == FALSE)
          {
            rc = m_AccapiSmManager->m_proxy_obj->ConfirmWebAgent(splited[2].c_str(),  //agent number
                                                                 "alreadyCertif",     //agent password
                                                                 splited[4].c_str(),  //agent extension
                                                                 session,  //
                                                                 ADI->m_AgentWSid,
                                                                 splited[6].c_str(),  // Tomact IP
                                                                 "",                  // Mail address
                                                                 version.c_str(),     // Mail password -  client version
                                                                 ADI->m_Ip.c_str());  // agennt ip
          }
          else //SSO on
          {
            accapi_my_print(0, "LOGON SSO AGENT: %s\n", &ADI->m_Name[0]);
            rc = m_AccapiSmManager->m_proxy_obj->ConfirmSSOWebAgent(splited[2].c_str(),  //agent principal name
                                                                    splited[4].c_str(),  //agent extension
                                                                    session,  //
                                                                    ADI->m_AgentWSid,
                                                                    splited[6].c_str(),  // Tomact IP
                                                                    ADI->m_Ip.c_str());  // agennt ip 
          }
        }
        break;

        //Base64::Decode(splited[7], &version);
      case API_LOGOFF:
        {
          accapi_my_print(0, "Agent logged off: %s\n", splited[2].c_str(), splited[5].c_str());
          if (splited[5] == "false") {
            LogoffX(ADI, false);
          }
          else {
            agentDisconnect(ADI, false);
          }
        }
        break;

      case API_LOGIN:
        {
          bool release = false;
          if (splited[5] == "false") release = true;
          sea_provider.LoginAgent(requestid++, splited[2], "", splited[4], "", "", ER_NULL_ID, ER_NULL_DEV_ID, true, release, true, ADI->m_SmClientId);
        }
        break;

      //
      case API_LOGOUT:
        sea_provider.LogoutAgent(requestid++, ADI->m_Agent_id);
        break;

      //
      case API_LOGINGROUP:
        {
          Ulong_t id = atoi(splited[6].c_str());
          bool isPrimaray = (splited[7] == "1");
          accapi_my_print(0, "API_LOGINGROUP=> %s, groupid: %d, primary = %d\n", splited[2].c_str(), id, isPrimaray);
          sea_provider.LoginAgent(requestid++, splited[2], "", splited[4], "", "", id, "", isPrimaray, false, true, ADI->m_SmClientId);
        }
        break;

      //
      case API_LOGOUTGROUP:
        {
          Ulong_t id = atoi(splited[6].c_str());
          accapi_my_print(0, "API_LOGOUTGROUP=> %s, groupid: %d\n", splited[2].c_str(), id);
          sea_provider.LogoutAgent(requestid++, ADI->m_Agent_id, (char*)"", id);
        }
        break;

      //
      case API_RELEASE:
        sea_provider.ReleaseAgent(requestid++, splited[2], (Ulong_t)atoi(splited[3].c_str()));
        break;

      //
      case API_RESUME:
        sea_provider.ResumeAgent(requestid++, splited[2]);
        break;

      //
      case API_MAKECALL:
        {
          // DL_MAP_IT it;
          // it = dl_map.find(splited[5]);
          // if (it != dl_map.end())
          // {
            // char ss[512];
            // Ulong_t dl_id = it->second.m_DlId;
            // sprintf(&ss[0],"||DIAL_LIST_ID:%d||",dl_id);
            // string s = &ss[0];
            // sea_provider.MakeOACDCall(requestid++,splited[2],splited[4],s);
            // break;
          // // string lob = "";
          // }
          //------------------------------

          //2019-10-07 AlisherM BZ#50840: fullnumber = outbound_prefix + dialed_number ; NOTE: outbound_prefix is optional
          string fullnumber = splited[5] + splited[4];
          accapi_my_print(0, "API_MAKECALL, dialed_number %s, outbound_prefix %s, fullnumber: %s\n", splited[4].c_str(), splited[5].c_str(), fullnumber.c_str());
          sea_provider.MakeCall(requestid++, splited[3], fullnumber);
        }
        break;

      //
      case API_ANSWERCALL:
        ConnId.m_call_id = atoi(splited[3].c_str());
        ConnId.m_dev_id = splited[4];
        accapi_my_print(0, "API_ANSWERCALL, call id: %d,dev_id:%s\n", ConnId.m_call_id, ConnId.m_dev_id.c_str());
        sea_provider.AnswerCall(requestid++, ConnId);
        break;

      //
      case API_DISCONNECT:
        ConnId.m_call_id = atoi(splited[3].c_str());
        ConnId.m_dev_id = splited[4];
        sea_provider.ClearConn(requestid++, ConnId);
        break;

      //
      case API_HOLD:
        ConnId.m_call_id = atoi(splited[3].c_str());
        ConnId.m_dev_id = splited[4];
        sea_provider.HoldCall(requestid++, ConnId);
        break;

      //
      case API_RETRIEVE:
        ConnId.m_call_id = atoi(splited[3].c_str());
        ConnId.m_dev_id = splited[4];
        sea_provider.RetrieveCall(requestid++, ConnId);
        break;

      //
      case API_SINGLESTEPTRANSFER:
        ConnId.m_call_id = atoi(splited[3].c_str());
        ConnId.m_dev_id = splited[4];
        sea_provider.SingleStepTransfer(requestid++, ConnId, splited[5]);
        break;

        //
      // DivertCall( ErRequestId_t reqId, ErDevId_t destDevId)
      case API_DIVERTCALL:
        ConnId.m_call_id = atoi(splited[3].c_str());
        ConnId.m_dev_id = splited[4];
        sea_provider.DivertCall(requestid++, EDT_DEFLECTION, ConnId, splited[5]);
        break;

      //
      case API_STARTTRANSFER:
        ConnId.m_call_id = atoi(splited[3].c_str());
        ConnId.m_dev_id = splited[4];
        sea_provider.ConsultationCall(requestid++, ECT_TRANSFER, ConnId, splited[5]);
        break;

      //
      case API_COMPLETETRANSFER:
        HeldConnId.m_call_id = atoi(splited[3].c_str());
        HeldConnId.m_dev_id = splited[4];
        ConnId.m_call_id = atoi(splited[5].c_str());
        ConnId.m_dev_id = splited[6];
        sea_provider.TransferCall(requestid++, HeldConnId, ConnId);
        break;

      //
      case API_STARTCONFERNCE:
        ConnId.m_call_id = atoi(splited[3].c_str());
        ConnId.m_dev_id = splited[4];
        sea_provider.ConsultationCall(requestid++, ECT_CONFERENCE, ConnId, splited[5]);
        break;

      //
      case API_COMPLETECONFERENCE:
        HeldConnId.m_call_id = atoi(splited[3].c_str());
        HeldConnId.m_dev_id = splited[4];
        ConnId.m_call_id = atoi(splited[5].c_str());
        ConnId.m_dev_id = splited[6];
        sea_provider.ConferenceCall(requestid++, HeldConnId, ConnId);
        break;

      //
      case API_ALTERNANTECALL:
        HeldConnId.m_call_id = atoi(splited[3].c_str());
        HeldConnId.m_dev_id = splited[4];
        ConnId.m_call_id = atoi(splited[5].c_str());
        ConnId.m_dev_id = splited[6];
        sea_provider.AlternateCall(requestid++, ConnId, HeldConnId);
        break;

      //
      case API_RECONNECTHELDCALL:
        HeldConnId.m_call_id = atoi(splited[3].c_str());
        HeldConnId.m_dev_id = splited[4];
        ConnId.m_call_id = atoi(splited[5].c_str());
        ConnId.m_dev_id = splited[6];
        sea_provider.ReconnectHeldCall(requestid++, ConnId, HeldConnId);
        break;

      //
      case API_SWAPCALL:
        HeldConnId.m_call_id = atoi(splited[3].c_str());
        HeldConnId.m_dev_id = splited[4];
        ConnId.m_call_id = atoi(splited[5].c_str());
        ConnId.m_dev_id = splited[6];
        sea_provider.AlternateCall(requestid++, ConnId, HeldConnId);
        break;

      //
      case API_WRAPUP:
        sea_provider.SetAgentMode(requestid++, ADI->m_Agent_id, ADI->m_Number, WRAP_EXIT, splited[3]);//
        break;

      //
      case API_SETWRAPUPCODE:
        accapi_my_print(0, "API_SETMANUELWRAPUP, agent: %s, code: %s\n", splited[2].c_str(), splited[3].c_str());
        sea_provider.SetAgentMode(requestid++, ADI->m_Agent_id, ADI->m_Number, WRAP_CODE, splited[3]);//
        break;

      //
      case API_SETMANUELWRAPUP:
        accapi_my_print(0, "API_SETMANUELWRAPUP, agent: %s\n", splited[2].c_str());
        sea_provider.SetAgentMode(requestid++, ADI->m_Agent_id, ADI->m_Number, WRAP_EXTEND);
        break;

      //
      case API_QUERYAGENTCALLS:
        sea_provider.QueryAgent(requestid++, ADI->m_Agent_id, splited[3], QUERY_WEB_AGENT_INFO, ADI->m_SmClientId);//QUERY_AGENT_INFO);
        break;

      //
      case API_BARGIN:
        accapi_my_print(0, "me: %s, API_BARGIN, agent: %s device:%s\n", ADI->m_Number, splited[3].c_str(), splited[4].c_str());
        sea_provider.ActivateCCFeature(requestid++, splited[3], splited[4], CC_BARGE_IN);
        break;

      //
      case API_SILENTMONITOR:
        accapi_my_print(0, "me: %s, API_SILENTMONITOR, agent: %s device:%s\n", ADI->m_Number, splited[3].c_str(), splited[4].c_str());
        sea_provider.ActivateCCFeature(requestid++, splited[3], splited[4], CC_SILENT_MONITOR);
        break;

      //
      case API_WHISPER:
        accapi_my_print(0, "me: %s, API_WHISPER, agent: %s device:%s\n", ADI->m_Number, splited[3].c_str(), splited[4].c_str());
        sea_provider.ActivateCCFeature(requestid++, splited[3], splited[4], CC_WHISPER);
        break;

      //
      case API_STARTRECORDING:
        accapi_my_print(0, "API_STARTRECORDING, agent: %s\n", splited[2].c_str());
        //30-Jan-2020 YR BZ#51147
        sea_provider.StartRecording(requestid++, ADI->m_Number, ADI->m_Extenstion);
      break;

      //
      case API_STOPRECORDING:
        accapi_my_print(0, "API_STOPRECORDING, agent: %s\n", splited[2].c_str());
        //30-Jan-2020 YR BZ#51147
        sea_provider.StartRecording(requestid++, ADI->m_Number, ADI->m_Extenstion, true);
      break;

      //
      //13-Aug-2023 YR BZ#58203
      case API_SUSPENDRECORDING:
        ConnId.m_call_id = atoi(splited[3].c_str());
        ConnId.m_dev_id = splited[4];
        accapi_my_print(0, "API_SUSPENDRECORDING, agent: %s, callid: %s\n", splited[2].c_str(), splited[3].c_str());
        sea_provider.RecordingActivation(requestid++, ADI->m_Number, ADI->m_Extenstion, ConnId.m_call_id, true);
      break;

      //
      case API_RESUMERECORDING:
        ConnId.m_call_id = atoi(splited[3].c_str());
        ConnId.m_dev_id = splited[4];
        accapi_my_print(0, "API_RESUMERECORDING, agent: %s\n", splited[2].c_str());
        sea_provider.RecordingActivation(requestid++, ADI->m_Number, ADI->m_Extenstion, ConnId.m_call_id, false);
      break;

      //
      case API_GETGROUPQUEUEINFO:
        sea_provider.GetGroupQueueInfo(requestid++, ADI->m_Number, ADI->m_Extenstion, splited[4]);
      break;

      //
      case API_GETGROUPQUEUECPINFO:
      {
        GRP_MAP_IT itg;
        Ulong_t g_id = atoi(splited[4].c_str());
        itg = grp_db.find(g_id);
        string gs = "";
        if (itg != grp_db.end())
        {
          gs = &(itg->second.m_GrpNumber)[0];
        }
        //accapi_my_print(3,"==================================API_GETGROUPQUEUECPINFO==> group number: %s\n", gs.c_str());
        sea_provider.GetGroupQueueCPInfo(requestid++, ADI->m_Number, ADI->m_Extenstion, gs);
      }
      break;

      case API_ACDPICKUPCALL:
        accapi_my_print(0, "API_ACDPICKUPCALL=> Agent No: %s, Call id: %s\n", ADI->m_Number, splited[4].c_str());
        sea_provider.PickupCall(requestid++, ADI->m_Number, ADI->m_Extenstion, splited[4]);
        break;

      //
      case API_KEEPALIVE:
        accapi_my_print(0, "KEEPLIVE: %s\n", ADI->m_Number);
        ADI->m_LastKeeAliveTime = time(0);
        break;

      //
      case API_SETONLINE:
        {
          Ulong_t actionXX = SETONLINE;
          if (splited[6].substr(0, 5) == "Test=")
          {
            GetCEMaxToken();
          }
          else
          {
            //accapi_my_print(0,"API_SETONLINE => Agent No: %s, on: %s\n",ADI->m_Number,splited[4].c_str());
            if (splited[4] == "false") actionXX = SETOFFLINE;
            sea_provider.DoSeaGenAction(requestid++, actionXX, ADI->m_Number, ADI->m_Extenstion, splited[6]);
          }
        }
        break;

      //
      case API_CONFIRMOUTBOUNDCALLRESULT:
        {
          bool b = splited[4].c_str()[0] == '1' ? true : false;
          accapi_my_print(3, "ConfirmOutboundCallResult=> Agent: %s, CallId: %s, ok: %d\n", ADI->m_Number, splited[3].c_str(), b);
          sea_provider.ConfirmOutboundCallResult(requestid++, ADI->m_Number, atoi(splited[3].c_str()), b);
        }
        break;

      //
      case API_OUTBOUNDREINSERT:
        sea_provider.ReinsertOutboundCall(requestid++, atoi(splited[3].c_str()), atoi(splited[4].c_str()));
        break;

      //
      case API_SUPERVISORHELP:
        sea_provider.SupervisorHelpRequest(requestid++, ADI->m_Number, (bool)atoi(splited[4].c_str()));
        break;

      //5-12-2022 YR BZ#57155
      case API_RECORDGREETING:
        sea_provider.RecordGreeting(requestid++, ADI->m_Number);
        break;

        //
      case API_AGENTOMNIMESSAGE:
        {
        ErCallId_t call_id = atoi(splited[3].c_str());
        ErDevId_t message = splited[4];
        accapi_my_print(0, "API_AGENTOMNIMESSAGE, agent: %s\n", splited[2].c_str());
        sea_provider.AgentOmniMessage(requestid++, ADI->m_Number, ADI->m_Extenstion, call_id, message);
        }
        break;

      default:
        switch (code)
        {
          case API_SAVEETASPART:
            ADI->m_EtasiniPart += splited[3];
            accapi_my_print(0, "API_SAVEETASPART=> len: %d / %d\n", splited[3].length(), ADI->m_EtasiniPart.length());
            break;
            //
          case API_SAVEPHONEBOOKPART:
            ADI->m_PhonbookPart += splited[3];
            accapi_my_print(0, "API_SAVEPHONEBOOKPART=> len: %d / %d\n", splited[3].length(), ADI->m_PhonbookPart.length());
            break;
            //
          default: accapi_my_print(0, "AccapiWorkThread_c::PostEventHandling, Unknown action code: %s\n", splited[0].c_str());
        }
        break;
      }//end switch
    }//end if (count > 0)
  }//end while
}


//================================[ Global Functions ]=================================


//=============================== [ accapiMyPrint ] ===================================
#ifdef ER_LINUX
#include <errno.h>
#include <sys/stat.h>
#include <sys/types.h>
#else
#include  <io.h>
#include  <stdlib.h>
#endif
#ifdef VS_2019
#include <corecrt_io.h>
#endif // VS_2019


static  Mutex accapiSendMutex;
static  bool  SendMutexInited = false;
static  FILE* recvlogfd = 0;
char accapi_print_fnm[255] = "../Log/accapi.log\0";
char accapi_print_level_fnm[255];

int notescount = 0;
int accapi_my_print_level = 3; //current print level

//----------------------- accapi_my_print_init -----------------------------//
void accapi_my_print_init(char* fnm)
{

  if (SendMutexInited == false) {
    SendMutexInited = true;
    sprintf(accapi_print_fnm, "%s\0", fnm);
    sprintf(accapi_print_level_fnm, "%s.level\0", fnm);
  }
}

//----------------------- accapiChangeLogLevel -----------------------------//
void accapiChangeLogLevel(int new_log_level)
{
  if (accapi_my_print_level != new_log_level)
  {
    accapi_my_print(-1, (char*)"++++++++++ Change log level from %d to %d ++++++++++\n", accapi_my_print_level, new_log_level);
    accapi_my_print_level = new_log_level;
  }
}

//----------------------- accapiCheckChangeLogLevel ------------------------//
void accapiCheckChangeLogLevel()
{
  int res = access(accapi_print_level_fnm, 0);
  if (res != -1)
  {
    FILE* FD = fopen(accapi_print_level_fnm, "r");
    char s[20]; memset(s, 0, 19);

    if (FD == NULL) return;
    fgets(&s[0], 5, FD);
    fclose(FD);
    int i = atoi(s);
    accapiChangeLogLevel(i);
    remove(accapi_print_level_fnm);
  }
}

//----------------------- accapi_my_print ----------------------------------//
void accapi_my_print(int level, const char* fmt, ...)
{
  if (level > accapi_my_print_level)
  {
    return;
  }
  if ((level > 0) && (accapi_my_print_level & 0x10) && (accapi_my_print_level != level))
  {
    return;
  }
  struct tm tmx;
  int mili = 0;
  time_t ti = time(0);
#ifndef _WIN32
  timeval MikroTime;
  gettimeofday(&MikroTime, NULL);
  mili = MikroTime.tv_usec / 1000;
  localtime_r(&ti, &tmx);
#else
  SYSTEMTIME  sys_time;
  GetLocalTime(&sys_time);
  mili = sys_time.wMilliseconds;
  localtime_s(&tmx, &ti);
#endif
  // update print level

  accapiSendMutex.Lock();// EnterCriticalSection(&accapiSendMutex);
  if (notescount > 150000)
  {
    char to[256];
    //2016-11-23 AlisherM BZ#40951: change format of filename (better for sorting)
    sprintf(to, "%s.%04d-%02d-%02d_%02d%02d%02d", accapi_print_fnm,
      (tmx.tm_year + 1900), (tmx.tm_mon + 1), tmx.tm_mday, tmx.tm_hour, tmx.tm_min, tmx.tm_sec);
    rename(accapi_print_fnm, to);
    printf("%s renamed to %s\r\n", accapi_print_fnm, to);
    recvlogfd = 0;
    notescount = 0;
  }
  if (recvlogfd == 0)
  {
    recvlogfd = fopen(accapi_print_fnm, "a+");
    if (recvlogfd == 0)
    {
      int errnoX = errno;
#ifdef _WIN32
      errnoX = (int)GetLastError();
#endif
      er_printf("error open ..%s %s  %error: d\n", accapi_print_fnm, errnoX, fmt);
      accapiSendMutex.Unlock(); // SOLSOL 16.7.16 Bug 40449 for some reason the open file failed on windows
      return;
    }
  }
#ifdef WIN32
  unsigned long  tid = GetCurrentThreadId();
#else
  unsigned long  tid = pthread_self(); //GetCurrentThreadId((DWORD *) NULL);
#endif

  fprintf(recvlogfd, "%04d-%02d-%02d %02d:%02d:%02d.%03d [thread %#10x, level %d] ",
    (tmx.tm_year + 1900), (tmx.tm_mon + 1), tmx.tm_mday, tmx.tm_hour, tmx.tm_min, tmx.tm_sec, mili, tid, level);
  va_list argptr;
  va_start(argptr, fmt);
  vfprintf(recvlogfd, fmt, argptr);
  va_end(argptr);
  notescount++;
  fflush(recvlogfd);
  fclose(recvlogfd);
  recvlogfd = NULL;
  accapiSendMutex.Unlock(); //LeaveCriticalSection(&accapiSendMutex);
} //
//==========================================================


