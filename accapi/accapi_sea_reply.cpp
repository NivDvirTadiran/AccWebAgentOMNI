//
// PROJECT & ID  : ACCAPI Solutions
// FILE NAME     : accapi_sea_reply.cpp
// AUTHOR        : Shahar Sperling
// CREATION DATE : 23-Apr-2007
// -----------------------------------------------------------------------
#ifdef WIN32
#pragma warning(disable:4786)
#pragma warning(disable:4996)
#include <io.h>
#else
#include <unistd.h>
#endif
#include <er_std_override.h>
#include "accapi_sea_reply.h"
#include <sea_provider.h>
#include "fullhttps_hook.h";
#include "accapi_CEMax.h"
#include "accapi_work_thread.h"
#include "sollib.h"
#include "cp.h"
#include <map>
extern "C" {

//#include "mgen_srv.h"
#include "sgen.h"
#include "oeve.h"
#include "ogen.h"
#include "othr.h"
}
#define CSA_TH2     124  //UtlThrIDByName((char *) "CSA_TH2")  //124
#define CSA_Q4      126  //UtlQueIDByName((char *) "CSA_Q4")  //48   For thread 3
#define AWA_TH3     178  //UtlThrIDByName((char *) "AWA_TH3") 
#define AWA_Q3      179  // UtlQueIDByName((char *) "AWA_Q3") 

CEMax *getCemaxObj();
void accapi_my_print(int level,const char* fmt, ...);
int ExecFullHttpThread(REPORT report, Action_c* action, const string cpf);
Action_c* HookFilter(int eventCode, string irn, string service, string group);
AgentDbInfo_c* AGENTINFOfind(Ulong_t agent_id);
AgentDbInfo_c* AGENTINFOfindByAgenNumber(string agent_no);
extern GRP_MAP grp_db;
extern CP_MAP  cp_db;
extern SRV_MAP srv_db;


//---------------------------------------------------------------------------------------------------------
EosRetCode_t sendEventToP_S_Thread(const Ulong_t  opcode,Byte_t * const event_data, Ushort_t event_data_len) 
{
  EosRetCode_t ret_val;
  EosEventHeader_t hdr;

  hdr.op_code = opcode;
  hdr.dest_que_id = AWA_Q3;
  hdr.reply_que_id = -1;
  hdr.data_len = event_data_len;

  accapi_my_print(0, "sendEventToCsi ==> send  %d  to AWA_Q3\n", opcode);
  //
  ret_val = EosCreateAndSendEvent(AWA_TH3,
                                  hdr.dest_que_id,
                                  hdr,
                                  event_data,
                                  hdr.data_len);
  return ret_val;
}


extern AGENTINFO_MAP agents_db;
ExtAppName_t app_name = "";


//==========================[ Static Variables ]=======================
static SeaProvider_c& sea_provider = SeaProvider_c::GetSeaProvider();
static BswLog_c sea_log(BswMakeLogSite(FC_AWA,1),LM_INTER_CSCI, LOGL_INFO);
//==========================[ Local Variables ]=======================
bool IsAgentDevice(ErDevId_t dev_id,ErMap_c<ErDevId_t,AgentInfo_s> agents_devices_map);
string IsACDCall(CallProfile_c& cp);
//================================[AddGroupsToReport]======================================
static void AddGroupsToReport(GroupInfo_t **groups,REPORT &report)
{
  //sea_log << "AddGroupsToReport() [" << report.m_Action.c_str() << "] - Num of Groups: " << report.m_Code1 << LOG_TERMINATOR;
  accapi_my_print(3, "AddGroupsToReport(), group count  %d\n", report.m_Code1);
  for (int j = 0; j < report.m_Code1; ++j)
  {
    struct Groups g;
    g.m_primary = groups[j]->primary;
    g.m_grp_id = groups[j]->grp_id;
    report.m_Groups.push_back(g);
  }
}
//================================[Init]======================================
RetCode_t AccapiSeaReply_c::Init()
{
  RetCode_t rc = BSWRC_OK;
  //m_sender = sender_socket;
  rc = sea_provider.Init(this);
  accapi_my_print(0,"AccapiSeaReply_c::Init\n");
  //20-May-2019 YR BZ#49760 - called from GetAllTables()
  //cp_mngr.InitCpFieldMgr();
  return rc;
}
//================================[~AccapiSeaReply_c]======================================
AccapiSeaReply_c::~AccapiSeaReply_c()
{
  //BswLog_c sea_log_d(BswMakeLogSite(FC_CRM_IFACE,1),LM_INTER_CSCI, LOGL_INFO);
  if (all_agents_monitor_id != 0)
  {
    sea_provider.RemoveAllAgentsMonitor(GetRequestId(),all_agents_monitor_id);
    //sea_log_d << "AccapiSeaReply_c::Terminate - RemoveAllAgentsMonitor" << LOG_TERMINATOR;
  }
  sea_provider.Unregister();//app_name);
}

//================================[~GetRequestId]======================================
ErRequestId_t AccapiSeaReply_c::GetRequestId()
{
  m_request_id++;

  if (m_request_id == 0)
    m_request_id = 1;
  return m_request_id;
}


string APPNAME = "";
//================================[SetOperational]======================================
void AccapiSeaReply_c::SetOperational(string appName)
{
  APPNAME = appName;
  RetCode_t rc = BSWRC_OK;
  app_name = appName;
  rc = sea_provider.Unregister(app_name);
  rc = sea_provider.Register(app_name, FC_AWA, "FC_AWA");

  //rc = sea_provider.Register(app_name,FC_CRM_IFACE,"FC_CRM_IFACE");
  if (rc == BSWRC_OK)
  {
    sea_log << "SbcSea_provider.Register() [" << appName.c_str() << "]" << LOG_TERMINATOR;
  }
}


//================================[Terminate]======================================
void AccapiSeaReply_c::Terminate()
{
  if (all_agents_monitor_id != 0)
  {
    sea_provider.RemoveAllAgentsMonitor(GetRequestId(),all_agents_monitor_id);
    sea_log << "AccapiSeaReply_c::Terminate - RemoveAllAgentsMonitor"<< LOG_TERMINATOR;
  }
  sea_provider.Unregister();//app_name);
  sea_log << "AccapiSeaReply_c::Unregister" << LOG_TERMINATOR;
}


//================================[RegisterAck]======================================
RetCode_t AccapiSeaReply_c::RegisterAck(Bool_t  success)
{
  RetCode_t rc = BSWRC_OK;
  SeaRegisterAck(REGISTER_ACK,success);
  if (!success)
    return BSWRC_FAIL;
  return rc;
}


//======================================[IsAgentDevice]=========================================
bool IsAgentDevice(ErDevId_t dev_id,ErMap_c<ErDevId_t,AgentInfo_s> agents_devices_map)
{ // check if the alerting device is monitored
  RetCode_t rc = BSWRC_OK;
  AgentInfo_s agent_info;
  rc = agents_devices_map.Get(dev_id,agent_info);
  if (rc == BSWRC_OK)
    return true;
  else
    return false;
}


int Split(char *source, std::vector<string> &dest ,char *search);
//======================================[PrepareCallProfile]============================================================
void PrepareCallProfile(CallProfile_c& cp, string &result, string &irn, string &service, string& group) // check if this call is ACD call (return true)
{
 // replace all comma in CPF value to '@#$'
  CallProfileField_c cp_field;
  CallProfileField_c  cur_fld = cp.GetFirstField();
  char c[2048];
  vector<string> v;
  int cpid = -1;
  while (cur_fld.QueryId() != 0)
  {
    char *value = (char *) &cur_fld.AsStr()[0];
    string s1 = "";
    int l = Split(value,v,(char *) ",");
    if (v.size() > 0)
    {
      s1 = v[0];
      for (int i = 1; i < (int) v.size();++i)
      {
        s1 += "@#$"; s1 += v[i];
      }
    }
    cpid = cur_fld.QueryId();
    sprintf(&c[0], "%d|%s^", cpid, (char*)s1.c_str());
    if (cpid == CallProfile_c::DNIS) { irn = s1; }
    if (cpid == CallProfile_c::SERVICE_ID) { service = s1; }
    if (cpid == CallProfile_c::GROUP_ID) { group = s1; }
    result += (char*)&c[0];  //accapi_my_print(0,"cp id: %d, %s\n", cur_fld.QueryId(),cur_fld.AsStr()); 
    cur_fld = cp.GetNextField();
  }
}

//======================================[PrepareCallProfile]============================================================
void PrepareCallProfileForHook(CallProfile_c& cp, string& result, string& irn, string& service, string& group,string &body); // check if this call is ACD call (return true)
void PrepareCallProfileForHook(CallProfile_c& cp, string& result, string& irn, string& service, string& group, string& body) // check if this call is ACD call (return true)
{
  // replace all comma in CPF value to '@#$'
  result = "||";
  CallProfileField_c cp_field;
  CallProfileField_c  cur_fld = cp.GetFirstField();
  char c[2048];
  vector<string> v;
  int cpid = -1;
  string s1 = "";
  while (cur_fld.QueryId() != 0)
  {
    cpid = cur_fld.QueryId();
    char* value = (char*)&cur_fld.AsStr()[0];
    CP_MAP::iterator it = cp_db.find(cpid);
    if (it != cp_db.end())
    {
      char* s1 = &(it->second.m_CPName[0]);
      sprintf(&c[0], "%s:%s|", s1, value);
      body += "{\"key\": \""; body += s1; body += "\",";
      body += "\"value\": \""; body += value; body += "\"},";
      if (cpid == CallProfile_c::DNIS) { irn = value; }
      if (cpid == CallProfile_c::SERVICE_ID)
      {
        Ulong_t sid = atoi(value);
        SRV_MAP_IT it = srv_db.find(sid);
        if (it != srv_db.end()) {
          value = it->second.m_SrvName;
        }
        service = value;
      }
      if (cpid == CallProfile_c::GROUP_ID) { group = value; }
      result += (char*)&c[0];
    }
    result += "|";
    cur_fld = cp.GetNextField();
  }
  body += "]";
  accapi_my_print(0, "PrepareCallProfileForHook: %s\n", body.c_str());
}

//======================================[IsACDCall]============================================================
string IsACDCall(CallProfile_c& cp) // check if this call is ACD call (return true)
{
  string typeStr = "N";
  CallProfileField_c agt_ext_field = cp.GetField(CallProfile_c::AGENT_EXT);
  CallProfileField_c call_type_field = cp.GetField(CallProfile_c::CALL_TYPE);
  if(agt_ext_field.QueryId() != 0)
  {
    if(call_type_field.AsInt() == ECT_OMNI)
      typeStr = "OMNI";
    else if((call_type_field.AsInt() >= ECT_CALLBACK) && (call_type_field.AsInt() <= ECT_OUT_ACD))
      typeStr = "OACD";
    else
      typeStr = "ACD";
  }
  accapi_my_print(4,"IsACDCall==> type: %s\n", typeStr.c_str());
  return typeStr;
}
//============================================[Check AsyncHook]==========================================
extern map<int, Event_c> Events_map;
bool AccapiSeaReply_c::CheckActivateAsyncHook(string eventX, ErDevId_t devId, CallProfile_c *cp, REPORT& report, AgentDbInfo_c* ADIX,string groupx)
{
  AgentDbInfo_c* ADI = ADIX;
  string s = "";
  string irn = "";
  string service = "";
  string group = groupx;
  string event = eventX;
  //accapi_my_print(0, "CheckActivateAsyncHook ==> %s\n", eventX.c_str());
  map<int, Event_c>::iterator it;
  if (ADIX == NULL)
  {
    AgentInfo_s agent_info;
    agents_devices_map.Get(devId, agent_info);//agent_id
    report.m_AgentId = agent_info.agent_id;

    ADI = AGENTINFOfind(agent_info.agent_id);
    if (ADI == NULL) {
      accapi_my_print(0, "CheckActivateAsyncHook ==> %s, cannot find agent by id: %d\n", eventX.c_str(), agent_info.agent_id);
      return false;
    }
  }
  if (cp != NULL)
  {
    report.m_IsAcd = IsACDCall(*cp);
    if (report.m_IsAcd == "ACD" && ADI->m_Extenstion == report.m_JoiningCalledDevId)
      event += "ACD";
    else if (report.m_IsAcd != "ACD" && ADI->m_Extenstion == report.m_JoiningCalledDevId)
      event = eventX;
    else
      event = "";
    accapi_my_print(0, "CheckActivateAsyncHook ==> %s joinnig %s, ACD: %s\n", event.c_str(), report.m_JoiningCalledDevId.c_str(), report.m_IsAcd.c_str());
  }

  int eventCode = getEventCode(event);
  it = Events_map.find(eventCode);
  if (it == Events_map.end())
    return false;

  report.m_cp = cp;
  string body = "[";
  if (cp != NULL)
    PrepareCallProfileForHook(*cp, s, irn, service, group, body);
  //
  if (ADI != NULL && s == "")
  {
    s = "||AgentNo:"; s += &ADI->m_Number[0]; s += "|"; s += "Ext:";  s += ADI->m_Extenstion; s += "|"; s += "Event:"; s += event; s += "||";
  }
  accapi_my_print(0, "CheckActivateAsyncHook ==> %s - s: %s\n", event.c_str(), s.c_str());
  //accapi_my_print(0, "CheckActivateAsyncHook 2, %s device CPF's ==> %s\n", event.c_str(), s.c_str());

  //
  accapi_my_print(0, "CheckActivateAsyncHook ==> %s - Check Hook Filter IRN: %s, SERVICE: %s, GROUP: %s\n", event.c_str(), irn.c_str(), service.c_str(), group.c_str());
  //accapi_my_print(0, "%s, Filter==> IRN : %s, SERVICE: %s, GROUP: %s\n", event.c_str(), irn.c_str(), service.c_str(), group.c_str());
  Action_c* A = HookFilter(eventCode, irn, service, group);
  if (A != NULL) // found filter
  {
    if ((time(0) - ADI->m_LastEventTime) < 2 && ADI->m_LastEvent == eventCode)
      return false;
    //17-Jul-2024 YR BZ#59783
    if (A->m_Desc.empty())
    {
      accapi_my_print(0, "CheckActivateAsyncHook ==> %s - Action Description is Empty, NOT EXECUTE !!!!!\n", event.c_str());
      return false;
    }
    ADI->m_LastEvent = eventCode;
    ADI->m_LastEventTime = time(0);
    string cpfX = s;
    accapi_my_print(0, "CheckActivateAsyncHook ==> %s - Action Found, Before Spawn ExecFullHttpThread\n", event.c_str());
    ThreadMgr::Spawn(ExecFullHttpThread, report, A, cpfX);
    accapi_my_print(0, "CheckActivateAsyncHook ==> %s - Action Found, After Spawn ExecFullHttpThread\n", event.c_str());
    return true;
  }
  accapi_my_print(0, "CheckActivateAsyncHook ==> %s - Action Not Found, NOT EXECUTE !!!!!\n", event.c_str());
  //accapi_my_print(0, " CheckActivateAsyncHook=> !!!! Filters not found: event %s not executed !!!!!\n", event.c_str());
  return false;
}

//================================[RemoveFromAgents_device_Map]=======================
bool AccapiSeaReply_c::RemoveFromAgents_device_Map(ErDevId_t device_id)
{
  RetCode_t rc = BSWRC_OK;
  bool b = true;
  AgentInfo_s agent_info;
  rc = agents_devices_map.Remove(device_id, agent_info);
  if (rc == BSWRC_OK)
  {
    sea_log << "RemoveFromAgents_device_Map found and remove old devId = " << device_id.c_str() << ", agentId = " << agent_info.agent_id << LOG_TERMINATOR;
  }
  return true;
}

//================================[RemoveInsertToAgents_device_Map]======================================
bool AccapiSeaReply_c::RemoveInsertToAgents_device_Map(ErDevId_t device_id,Ulong_t agent_id)
{
  RetCode_t rc = BSWRC_OK;
  AgentInfo_s agent_info;
  bool b = true;
  rc = agents_devices_map.Get(device_id, agent_info);

  if (rc == BSWRC_OK)
  {
    if (agent_info.agent_id == agent_id) //same agent on same device
    {
      accapi_my_print(0, "RemoveInsertToAgents_device_Map=> dev: %s same agt/ext, don't insert it\n", device_id.c_str());
      sea_log << "RemoveInsertToAgents_device_Map=> devId = " << device_id.c_str() << ", agentId = " << agent_info.agent_id << ",  same agt/ext, don't insert it" << LOG_TERMINATOR;
      return false; // already exists on same agent do nothing
    }
  }
  rc = agents_devices_map.Remove(device_id, agent_info);
  if (rc == BSWRC_OK)
  {
    sea_log << "RemoveInsertToAgents_device_Map found and remove old devId = " << device_id.c_str() << ", agentId = " << agent_info.agent_id << LOG_TERMINATOR;
  }
  agent_info.agent_id = agent_id;
  agent_info.device_id = device_id;
  agent_info.monitor_id = 0;
  rc = agents_devices_map.Insert(device_id, agent_info); //update agent info with monitor id
  if (rc != BSWRC_OK)
  {
    sea_log << "RemoveInsertToAgents_device_Map failed to insert devId = " << device_id.c_str() << ", agentId = " << agent_info.agent_id << LOG_TERMINATOR;
    b = false;
  }
  return b;
}

//================================[AddDeviceMonitorAck]======================================
RetCode_t AccapiSeaReply_c::AddDeviceMonitorAck(ErRequestId_t     related_req_id,
                                                ErDevId_t         device_id,
                                                Bool_t            success,
                                                ErMonitorId_t     monitor_id)
{
  RetCode_t rc = BSWRC_OK;
  SeaRegisterAck(MONITOR_DEV_ACK,success,monitor_id);

  sea_log << "AddDeviceMonitorAck device_id = " << device_id.c_str() << LOG_TERMINATOR;
  accapi_my_print(0,"AccapiSeaReply_c::AddDeviceMonitorAck() ==>  device_id, dev: %s\n",device_id.c_str(),success == TRUE ? "success" : "FALSE");

  if (!success)
  {
    RemoveFromAgents_device_Map(device_id);
    return BSWRC_FAIL;
  }
  AgentInfo_s agent_info;

  rc = agents_devices_map.Remove(device_id,agent_info);

  if (rc == BSWRC_OK)
  {
    agent_info.monitor_id = monitor_id;
    rc = agents_devices_map.Insert(device_id, agent_info);
  }
  else
  {
    sea_log << "AddDeviceMonitorAck device_id Failed to insert to agents_devices_map: " << device_id.c_str() << LOG_TERMINATOR;
    accapi_my_print(0, "AccapiSeaReply_c::AddDeviceMonitorAck() ==>  device_id Failed to insert to agents_devices_map, dev: %s\n", device_id.c_str());
  }
  return rc;
}


//================================[AddAllAgentsMonitorAck]======================================
RetCode_t AccapiSeaReply_c::AddAllAgentsMonitorAck(ErRequestId_t     er_req_id,
                                                   Bool_t            success,
                                                   ErMonitorId_t     monitor_id)
{
  RetCode_t rc = BSWRC_OK;
  SeaRegisterAck(MONITOR_ALL_AGENT_ACK,success,monitor_id);
  if (!success)
    return BSWRC_FAIL;
  sea_log << "AddAllAgentsMonitorAck" << LOG_TERMINATOR;
  return rc;
}


//================================[SeaRegisterAck]======================================
void AccapiSeaReply_c::SeaRegisterAck(Ushort_t ack_type, bool success, ErMonitorId_t monitor_id)
{
  switch(ack_type)
  {
    case REGISTER_ACK:
      if (success) {
        sea_log << "AccapiSeaReply_c::SeaRegisterAck(REGISTER_ACK) == success, %s\n" << LOG_TERMINATOR;
        accapi_my_print(0, "AccapiSeaReply_c::SeaRegisterAck(REGISTER_ACK) == success\n", APPNAME.c_str());
        sea_provider.AddAllAgentsMonitor(GetRequestId());
      }
      else{
        sea_provider.Register(APPNAME,FC_AWA,"FC_AWA");
        accapi_my_print(0, "AccapiSeaReply_c::SeaRegisterAck(REGISTER_ACK) == failure, retring ,%s,%s\n", "FC_AWA", APPNAME.c_str());
        sea_log << "AccapiSeaReply_c::SeaRegisterAck(REGISTER_ACK) == failure, retrying\n" << APPNAME.c_str() << LOG_TERMINATOR;
      }
    break;
    case MONITOR_DEV_ACK:
      if (success) {
        sea_log << "AccapiSeaReply_c::AddDeviceMonitorAck(MONITOR_DEV_ACK) == success\n"
                << "monitor_id: " << monitor_id << LOG_TERMINATOR;
        accapi_my_print(0, "AccapiSeaReply_c::AddDeviceMonitorAck(MONITOR_DEV_ACK) == success\n");
      }
      else{
        sea_log << "AccapiSeaReply_c::AddDeviceMonitorAck(MONITOR_DEV_ACK) == failure!!!\nn"
                << "monitor_id: " << monitor_id << LOG_TERMINATOR;
        accapi_my_print(0, "AccapiSeaReply_c::AddDeviceMonitorAck(MONITOR_DEV_ACK) == failure!!!\n");
      }
    break;
    case MONITOR_ALL_AGENT_ACK:
      if (success) {
        sea_log << "AccapiSeaReply_c::AddAllAgentsMonitorAck(MONITOR_ALL_AGENT_ACK) == success\n"
                << "monitor_id: " << monitor_id << LOG_TERMINATOR;
        all_agents_monitor_id = monitor_id;
      }
      else{
        sea_log << "AccapiSeaReply_c::AddAllAgentsMonitorAck(MONITOR_ALL_AGENT_ACK) == failure!!!\nn"
                << "monitor_id: " << monitor_id << LOG_TERMINATOR;
      }
    break;
    default:
      if (success) {
        sea_log << "AccapiSeaReply_c::SeaRegisterAck == success,  !!!  WARNING  !!! Unknown Ack type \n" << LOG_TERMINATOR;
      }
      else{
        sea_log << "AccapiSeaReply_c::SeaRegisterAck == failed,  !!!  WARNING  !!! Unknown Ack type \n" << LOG_TERMINATOR;
      }
    break;
  }
}

string STATE_STR [] = 
{
  "N/A",
  "NULL",
  "Initiated",
  "ROUTE_WAIT",
  "Ringing",
  "Connected",
  "FAILED",
  "Hold",
  "QUEUED",
  "UNKNOWN",
  "SILENT_MONITOR",      //ECS_SILENT_MONITORED - the device we want to listen on
  "SILENT_MONITOR_A", //ECS_SILENT_MONITORING - the device listening to ECS_SILENT_MONITORED
  "BARGE_IN",         //ECS_BARGED_IN_ON - The device that we are barging in on (in conversation, and heres a tone as we barge in)
  "BARGE_IN_A",       //ECS_BARGING_IN - The device barging in on ECS_BARGED_IN_ON
  "WHISPER",          //ECS_WHISPERED_ON - The party that will not hear us when we activate whisper
  "WHISPER_A",        //ECS_WHISPERING - the device that activates the whispering to ECS_WHISPERED_TO
  "WHISPER_ON",       //ECS_WHISPERED_TO - the party that will hear ECS_WHISPERING once whisper is activated.
  "RECORDING", 
  "NUM_STATES"  // used for unknown ErConnStateVal_t
};


//==========================[ AgentInfo ]=======================================
RetCode_t AccapiSeaReply_c::AgentInfo(ErMonitorId_t &monitor_id, ErReportId_t &report_id, LrlAgentInfo2_c &agent_info)
{
  REPORT report;
  report.m_Action = "agentinfo";

  LrlAgentCallsInfo2_c* agent_calls_info = agent_info.GetLrlAgentCallsInfo();
  RetCode_t rc = BSWRC_OK;
  char t[32000]; t[0] = 0;
  Ulong_t agent_id = agent_calls_info->GetAgentId();
  string agent_no = "";
  AGENTINFO_MAP_IT it = agents_db.find(agent_id);

  if (it != agents_db.end())
  {
    agent_no = &(it->second.m_Number[0]);
    accapi_my_print(0, "\n--AccapiSeaReply_c::AgentInfo START agent id: %d, agent no: %s\n", agent_id, agent_no.c_str());
  }
  else
  {
    accapi_my_print(0, "\n--AccapiSeaReply_c::AgentInfo START agent id: %d not found\n", agent_id);
    return rc;
  }
  Ulong_t num_od_calls = agent_calls_info->GetNumCalls();
  accapi_my_print(0, "AccapiSeaReply_c::AgentInfo,agent id: %d - %s, num of calls: %d\n", agent_id, agent_no.c_str(), num_od_calls);
  if (num_od_calls > 0)
  {
    LrlCallInfo_t** LCI = agent_calls_info->GetCallInfoArray();
    for (Ulong_t i = 0; i < agent_calls_info->GetNumCalls(); i++)
    {
      string acd = IsACDCall(LCI[i]->call_profile);
      string dev_id = LCI[i]->call_info.m_conn_info_arr[i].m_conn_id.m_dev_id;
      ErConnStateVal_t callState = LCI[i]->call_info.m_conn_info_arr->m_state_val;
      string creationTime = LCI[i]->call_info.m_creation_time;
      string callStateStr = callState <= ECS_NUM_STATES ? STATE_STR[callState] : STATE_STR[0];
      Ulong_t call_id = LCI[i]->call_info.m_conn_info_arr[i].m_conn_id.m_call_id;
      sprintf(&t[strlen(&t[0])], (char*)"%s;%d;%d;%s;%s;", dev_id.c_str(), call_id, callState, callStateStr.c_str(), acd.c_str());
      //accapi_my_print(0,"AccapiSeaReply_c::AgentInfo, dev id: %s, call id: %d, call state: %d - %s creation time: %s\n", dev_id.c_str() ,call_id,callState,callStateStr.c_str(),creationTime.c_str());
      //
      CallProfileField_c* CPF = (CallProfileField_c*)&((LCI[i]->call_profile).GetFirstField());
      while (CPF->QueryId() != 0)
      {
        const char* s = CPF->AsStr();
        int num = CPF->QueryId();
        sprintf(&t[strlen(&t[0])], (char*)"%d|", CPF->QueryId());
        CP_MAP::iterator it = cp_db.find(num);
        if (it != cp_db.end())
        {
          char* s1 = &(it->second.m_CPName[0]);
          sprintf(&t[strlen(&t[0])], (char*)"%s|", s1);
          //sprintf(&t[strlen(&t[0])],"id: %d - %s value: %s;\n",CPF->QueryId(),s1,s);
          //accapi_my_print(0,"%s\n",t);         
        }
        else
        {
          sprintf(&t[strlen(&t[0])], (char*)"|");
          //accapi_my_print(0,"cp num: %d NOT FOUND\n",num);    
        }
        sprintf(&t[strlen(&t[0])], (char*)"%s^", s);
        CPF = (CallProfileField_c*)&((LCI[i]->call_profile).GetNextField());
      }
      sprintf(&t[strlen(&t[0])], ";~~");

    }
    report.m_MoreDetail = &t[0];
    accapi_my_print(0, "%s\n", t);
  }

  //28-Mar-2019 SW BZ#49188
  report.m_Code1 = agent_info.GetLrlLoginInfo()->GetNumOfGroup();
  report.m_Code2 = agent_info.GetLrlLoginInfo()->GetOnRelease();
  //report.m_Code2 = agent_info.GetLrlLoginInfo()->GetCause();

  AddGroupsToReport(agent_info.GetLrlLoginInfo()->GetGroupInfoArr(), report);

  report.m_DevId = it->second.m_Extenstion;
  rc = UpdateAgentDbInfo(report.m_DevId, AccapiCrmType_c::CallsStatus, report);
  accapi_my_print(0, "\n-------------AccapiSeaReply_c::AgentInfo END\n");

  return rc;
}


//===========================[ Failed ]=======================================
 RetCode_t AccapiSeaReply_c::Failed(ErMonitorId_t&      monitor_id,
                                    ErReportId_t&       report_id,
                                    BccFailed_c&        failed,
                                    ErConnStateVal_t&   local_conn_state_val,
                                    ErDevId_t&          local_dev_id)
 {
   accapi_my_print(0, "AccapiSeaReply_c::Failed: %d, dev: %s\n", local_conn_state_val, local_dev_id.c_str());
   sea_log << "AccapiSeaReply_c::Failed, local_conn_state_val " << local_conn_state_val << ", dev: " << local_dev_id.c_str() << LOG_TERMINATOR;
   RetCode_t rc = BSWRC_OK;
   return rc;
 }


//===========================[ Originated ]=======================================
 RetCode_t AccapiSeaReply_c::Originated(ErMonitorId_t&       monitor_id,
                                        ErReportId_t&        report_id,
                                        BccOriginated_c&     originated,
                                        ErConnStateVal_t&    local_conn_state_val,
                                        ErDevId_t&           local_dev_id)
 {
   accapi_my_print(0, "AccapiSeaReply_c::Originated: %d\n", local_conn_state_val);
   RetCode_t rc = BSWRC_OK;
   return rc;
 }


 //===========================[ DeviceStatus ]=======================================
 // enum{
  // EDS_UNKNOWN = 0,
  // EDS_BUSY,
  // EDS_IDLE,
  // EDS_IN_SERVICE,
  // EDS_OUT_OF_SERVICE,
  // EDS_CFW_ALL,
  // EDS_CFW_ALL_CANCELED,
  // EDS_DND,
  // EDS_DND_CANCELED,
  // EDS_MDU_PREVENT_LOGIN, //2017-09-26 AlisherM BZ#44332: in MDU mode if user/extension have more than one endpoints and none of them set as useByApp, then prevent agent to login on this extension
  // EDS_NUM_STATUS_TYPES
// };
string devStatStr[EDS_NUM_STATUS_TYPES + 20] = {"UNKNOWN",
                                                "BUSY",
                                                "IDLE",
                                                "IN_SERVICE",
                                                "OUT_OF_SERVICE",                          
                                                "CFW_ALL",
                                                "CFW_ALL_CANCELED",
                                                "DND",
                                                "DND_CANCELED",
                                                "MDU_PREVENT_LOGIN",
                                                "SUSPEND_RECORDING_FAILED",
                                                "RESUME_RECORDING_FAILED"};

RetCode_t AccapiSeaReply_c::DeviceStatus(ErMonitorId_t        monitor_id,
                                         ErReportId_t         report_id,
                                         ErDevId_t            device_id,
                                         ErDeviceStatus_t     device_status,
                                         ErCause_t            cause,
                                         ErPrivateData_s&     private_data)
{
  RetCode_t rc = BSWRC_OK;
  if (device_status < 0 || device_status >= EDS_NUM_STATUS_TYPES)
  {
    accapi_my_print(0, "AccapiSeaReply_c::DeviceStatus !! Unknown device status !! dev: %s, %d\n", device_id.c_str(), device_status);
    return rc;
  }
  accapi_my_print(0, "AccapiSeaReply_c::DeviceStatus dev: %s, %s\n", device_id.c_str(), devStatStr[device_status].c_str());
  REPORT report;
  report.m_Action = "deviceStatus";
  report.m_DevId = device_id;
  report.m_Code1 = (Ulong_t)device_status;
  report.m_Code2 = (Ulong_t)cause;
  report.m_DetailedAction = devStatStr[device_status].c_str();
  UpdateAgentDbInfo(report.m_DevId, AccapiCrmType_c::CallsStatus, report);

  return rc;
}


//--------------------------------------------------------------------------------------------------
//=================================================================
void SendAllAgentsIamINIdleMode();
void personal_statistics_req();
/* When agent login we can find his device Id and monitor it */
RetCode_t AccapiSeaReply_c::AgentLogin(ErMonitorId_t&     monitor_id,
                                       ErReportId_t&      report_id,
                                       LrlAgentLogin2_c&  agent_login)
{
  RetCode_t rc = BSWRC_OK;
  AgentInfo_s agent_info;
  ErDevId_t dev_id = agent_login.GetAgtDevId();
  rc = agents_devices_map.Get(dev_id,agent_info);
  if (rc != BSWRC_OK)
  {
    sea_log << "AgentLogin device " << dev_id.c_str() << " not found, not web agent " << agent_login.GetAgtNumber().c_str() << LOG_TERMINATOR;
    return BSWRC_FAIL;
  }
  REPORT report;
  report.m_Action = "login";
  report.m_CallingCalledDevId = dev_id.c_str();
  report.m_Code1 = agent_login.GetNumOfGroup();
  //
  sea_log << "AgentLogin(),agent no: " << agent_login.GetAgtNumber().c_str() << ", Num of groups: " << report.m_Code1 << LOG_TERMINATOR;
  AddGroupsToReport(agent_login.GetGroupInfoArr(), report);
  rc = UpdateAgentDbInfo(dev_id, AccapiCrmType_c::Logon, report);
  CEMax* cemax = getCemaxObj();
  if (cemax != NULL) {
    cemax->SendAgentLogin(agent_login.GetAgtNumber());
  }
  GRP_MAP_IT it;
  string gname = "";

  for (int ii = 0; ii < report.m_Groups.size(); ++ii)
  {
    it = grp_db.find(report.m_Groups[ii].m_grp_id);
    if (it != grp_db.end())
    {
      gname = it->second.m_GrpName;
      bool b = CheckActivateAsyncHook("OnLoggedIn", dev_id, NULL, report, NULL, gname);
      if (b) break;
    }
  }
  AgentDbInfo_c* ADI = AGENTINFOfindByAgenNumber(agent_login.GetAgtNumber());
  if (ADI != NULL)
  {
    ADI->m_LoginLogout = true;
    SendAllAgentsIamINIdleMode();
  }

  return rc;
}

//======================================[AddDeviceMonitor]==============================================
RetCode_t AccapiSeaReply_c::AddDeviceMonitor(Ulong_t    request_id,
                                             ErDevId_t  dev_id,
                                             ErDevId_t  agent_number,
                                             Bool_t     rr_device,
                                             Bool_t     agent_device)
{
  RetCode_t rc = BSWRC_OK;
  rc = sea_provider.AddDeviceMonitor(request_id,dev_id,rr_device,agent_device,true,agent_number);
  sea_log << "Add Device to monitoring: request_id: " << request_id << ", dev_id: "
    << dev_id.c_str() << LOG_TERMINATOR;
  accapi_my_print(0, "AccapiSeaReply_c::AddDeviceMonitor, dev: %s\n ", dev_id.c_str());
  return rc;
}


//======================================[AgentLogout]==============================================
/* When agent logout we can find his device Id and "unmonitor" it */
RetCode_t AccapiSeaReply_c::AgentLogout(ErMonitorId_t&     monitor_id,
                                        ErReportId_t&      report_id,
                                        LrlAgentLogout2_c& agent_logout)
{
  RetCode_t rc = BSWRC_OK;
  AgentInfo_s agent_info;
  ErDevId_t dev_id = agent_logout.GetAgtDevId();
  rc = agents_devices_map.Get(dev_id,agent_info);
  if (rc == BSWRC_OK)
  {
    REPORT report;
    report.m_Action = "logout";
    report.m_CallingCalledDevId = dev_id.c_str();
    report.m_Code1 = agent_logout.GetNumOfGroup();
    //
    AddGroupsToReport(agent_logout.GetGroupInfoArr(), report);
    rc = UpdateAgentDbInfo(dev_id, AccapiCrmType_c::SignOut, report);
    CEMax* cemax = getCemaxObj();
    if (cemax != NULL) {
      cemax->SendAgentLogout(agent_logout.GetAgtNumber());
    }
    GRP_MAP_IT it;
    string gname = "";
    for (int ii = 0; ii < report.m_Groups.size(); ++ii)
    {
      it = grp_db.find(report.m_Groups[ii].m_grp_id);
      if (it != grp_db.end())
      {
        gname = it->second.m_GrpName;
        bool b = CheckActivateAsyncHook("OnLoggedOut", dev_id, NULL, report, NULL, gname);
        if (b) break;
      }
    }
    AgentDbInfo_c* ADI = AGENTINFOfindByAgenNumber(agent_logout.GetAgtNumber());
    if (ADI != NULL)
    {
      ADI->m_LoginLogout = false;
      SendAllAgentsIamINIdleMode();
    }
  }
  return rc;
}


//======================================[RemoveDeviceMonitor]==============================================
RetCode_t AccapiSeaReply_c::RemoveDeviceMonitor(Ulong_t       request_id,
                                                ErDevId_t     dev_id,
                                                ErMonitorId_t monitor_id)
{
  RetCode_t rc = BSWRC_OK;
  AgentInfo_s agent_info;

  rc = agents_devices_map.Get(dev_id,agent_info);
  if (rc != BSWRC_OK)
  {
    accapi_my_print(0, "!!!AccapiSeaReply_c::RemoveDeviceMonitor, dev: %s Failed to get agentinfo\n ", dev_id.c_str());
    sea_log << "!!!Sending RemoveDeviceMonitor, Failed to get agentinfo, dev_id: " << dev_id.c_str() << ", monitor_id: " << agent_info.monitor_id << LOG_TERMINATOR;
  }
  else
  {
  accapi_my_print(0,"AccapiSeaReply_c::RemoveDeviceMonitor, dev: %s\n ", dev_id.c_str());
  sea_log << "Sending RemoveDeviceMonitor: dev_id: " << dev_id.c_str() << ", monitor_id: " << agent_info.monitor_id << LOG_TERMINATOR;
  }

  rc = sea_provider.RemoveDeviceMonitor(request_id,dev_id,agent_info.monitor_id);
  return rc;
}

//======================================[ServiceInitiated]==============================================
RetCode_t AccapiSeaReply_c::ServiceInitiated(ErMonitorId_t&          monitor_id,
                                             ErReportId_t&           report_id,
                                             BccServiceInitiated_c&  service_initiated,
                                             ErConnStateVal_t&       local_conn_state_val,
                                             ErDevId_t&              local_dev_id)
{
  RetCode_t rc = BSWRC_OK;
  ErDevId_t dev_id;

  REPORT report;
  report.m_DevId = local_dev_id;
  report.m_IsAcd = IsACDCall(service_initiated.GetEventCP());
  report.m_CallingCalledDevId = service_initiated.GetPrimaryDevId();
  report.m_CallId = service_initiated.GetPrimaryCallId();
  report.m_Action = "Initiated";
  accapi_my_print(0, "AccapiSeaReply_c::ServiceInitiated dev: %s\n", local_dev_id.c_str());
  UpdateAgentDbInfo(local_dev_id, 0, report);
  return rc;
}


AgentDbInfo_c* GetAgentObjByDevId(ErDevId_t dev_id);
//======================================[Delivered]============================================
RetCode_t AccapiSeaReply_c::Delivered(ErMonitorId_t&       monitor_id,
                                      ErReportId_t&        report_id,
                                      BccDelivered_c&      delivered,
                                      ErConnStateVal_t&    local_conn_state_val,
                                      ErDevId_t&           local_dev_id)
{
  RetCode_t rc = BSWRC_OK;
  ErDevId_t dev_id;

  sea_log << "AccapiSeaReply_c::Delivered()\n"
          << "agent = " << delivered.GetOriginallyCalledDevId().c_str()
          << "\ncalling dev id = " << delivered.GetCallingDevId().c_str()
          << "\nalerting dev id = " << delivered.GetAlertingConnId().m_dev_id.c_str()
          << "\ncall id = " << delivered.GetAlertingConnId().m_call_id
          << "\nmonitor_id = " << monitor_id
          << ", local_dev_id = " << local_dev_id.c_str() << LOG_TERMINATOR;

  REPORT report;  
  report.m_DevId = local_dev_id;
  report.m_IsAcd = IsACDCall(delivered.GetEventCP());
  report.m_CallingCalledDevId  = delivered.GetCallingDevId();
  report.m_JoiningCalledDevId  = delivered.GetAlertingConnId().m_dev_id;
  report.m_CallId = delivered.GetAlertingConnId().m_call_id;
  report.m_Code1 = delivered.GetEventCallType(); //calltype
  report.m_Code2 = delivered.GetCause(); // call cause

  report.m_Action = "Delivered";
  //
  ErPrivateData_s privateData = delivered.GetPrivateData();
  report.m_DetailedAction =  privateData.m_acd_group;
  //
   
  string cp = "";
  string irn = "";
  string service = "";
  string group = "";
  PrepareCallProfile(delivered.GetEventCP(),cp,irn,service,group);
  report.m_MoreDetail = cp;
  CEMax* cemax = getCemaxObj();
  if (report.m_CallingCalledDevId != report.m_DevId)
  {
    AgentDbInfo_c* ADI = GetAgentObjByDevId(local_dev_id);
    if (cemax != NULL && ADI != NULL)
    {
      cemax->SendAgentRinging(&ADI->m_Number[0], cp);
    }
    CheckActivateAsyncHook("OnIncoming", local_dev_id, &delivered.GetEventCP(), report);
  }
  //
  UpdateAgentDbInfo(local_dev_id,0,report);


  return rc;
}


//======================================[Diverted]======================================
RetCode_t AccapiSeaReply_c::Diverted(ErMonitorId_t&       monitor_id,
                                     ErReportId_t&        report_id,
                                     BccDiverted_c&       diverted,
                                     ErConnStateVal_t&    local_conn_state_val,
                                     ErDevId_t&           local_dev_id)
{
  RetCode_t rc = BSWRC_OK;
  string dev = diverted.GetDivertedFromConnId().m_dev_id.c_str();
  string ani;

  REPORT report;  report.m_DevId = local_dev_id;
  report.m_IsAcd = IsACDCall(diverted.GetEventCP());
  report.m_CallingCalledDevId  = dev;
  report.m_JoiningCalledDevId  = diverted.GetDivertedToDevId();
  report.m_CallId = diverted.GetPrimaryCallId();
  report.m_Code1 = diverted.GetDivertedFromConnId().m_call_id;
  report.m_Action = "diverted";

  string s = "";
  string irn = "";
  string service = "";
  string group = "";
  PrepareCallProfile(diverted.GetEventCP(), s, irn, service, group);

  report.m_MoreDetail  = s;
  UpdateAgentDbInfo(local_dev_id,0,report);

  return rc;
}


//======================================[Transferred]===================================================
RetCode_t AccapiSeaReply_c::Transferred(ErMonitorId_t&       monitor_id,
                                        ErReportId_t&        report_id,
                                        BccTransferred_c&    xfered,
                                        ErConnStateVal_t&    local_conn_state_val,
                                        ErDevId_t&           local_dev_id)
{
  RetCode_t rc = BSWRC_OK;

  sea_log << "AccapiSeaReply_c::Transferred()" << "\nagent transferred = " << xfered.GetTransferredDevId().c_str()
          << "\nagent transferred to = " << xfered.GetTransferredToDevId().c_str()
          << "\nagent transferring = " << xfered.GetTransferringDevId().c_str()
          << "\nPrimary call id = " << xfered.GetPrimaryCallId() << "\nSecondary call id = " << xfered.GetSecondaryCallId()
          << "\nResultant call id = " << xfered.GetResultantCallId() << "\nmonitor_id = " << monitor_id
          << ", local_dev_id = " << local_dev_id.c_str() << LOG_TERMINATOR;

  //rc = calls_map.Insert(xfered.GetResultantCallId(), xfered.GetTransferredToDevId().c_str());
  REPORT report;  report.m_DevId = local_dev_id;
  report.m_IsAcd = IsACDCall(xfered.GetEventCP());
  report.m_CallingCalledDevId  = xfered.GetTransferringDevId();
  report.m_JoiningCalledDevId  = xfered.GetTransferredDevId();
  report.m_OriginalCalledDevId = xfered.GetTransferredToDevId();
  accapi_my_print(0,"AccapiSeaReply_c::Transferred, dev_id: %s,Transferring: %s, Transferred: %s, TransferredTo: %s\n",
          local_dev_id.c_str(),
          xfered.GetTransferringDevId().c_str(),
          xfered.GetTransferredDevId().c_str(),
          xfered.GetTransferredToDevId().c_str());
  report.m_Code1 = xfered.GetPrimaryCallId();
  report.m_Code2 = xfered.GetSecondaryCallId();
  report.m_CallId = xfered.GetResultantCallId();
  //
  if (local_dev_id == xfered.GetTransferringDevId())
  {
    report.m_Action = "transferred";
    UpdateAgentDbInfo(xfered.GetTransferringDevId(),0,report);
    return BSWRC_OK;
  }
  // get call profile
  string s = "";
  string irn = "";
  string service = "";
  string group = "";
  PrepareCallProfile(xfered.GetEventCP(), s, irn, service, group);
  //
  report.m_MoreDetail  = s;
  //
  report.m_CallingCalledDevId  = xfered.GetTransferredDevId();
  report.m_JoiningCalledDevId = xfered.GetTransferredToDevId();
  if (local_dev_id == xfered.GetTransferredToDevId())
  {
    report.m_Action = "transferredtome";
    UpdateAgentDbInfo(xfered.GetTransferredToDevId(), 0, report);
    return BSWRC_OK;
  }
  if (local_dev_id == xfered.GetTransferredDevId())
  {
    report.m_Action = "transferreddev";
    report.m_CallingCalledDevId = xfered.GetTransferredDevId();
    UpdateAgentDbInfo(xfered.GetTransferredDevId(), 0, report);
  }

  return BSWRC_OK;
}


//======================================[Established]====================================
RetCode_t AccapiSeaReply_c::Established(ErMonitorId_t&       monitor_id,
                                        ErReportId_t&        report_id,
                                        BccEstablished_c&    established,
                                        ErConnStateVal_t&    local_conn_state_val,
                                        ErDevId_t&           local_dev_id)
{
  RetCode_t rc1,rc2;
  AgentInfo_s agent_info;

  sea_log << "AccapiSeaReply_c::Established()\n"
          << "agent = " << established.GetOriginallyCalledDevId().c_str()
          << "\ncalling dev id = " << established.GetCallingDevId().c_str()
          << "\njoining dev id = " << established.GetJoiningConnId().m_dev_id.c_str()
          << "\ncall id = " << established.GetJoiningConnId().m_call_id
          << "\nmonitor_id = " << monitor_id << ", local_dev_id = " << local_dev_id.c_str() << LOG_TERMINATOR;

  REPORT report;
  report.m_DevId = local_dev_id;
  report.m_IsAcd = IsACDCall(established.GetEventCP());
  report.m_CallingCalledDevId  = established.GetCallingDevId();
  report.m_JoiningCalledDevId  = established.GetJoiningConnId().m_dev_id;
  report.m_OriginalCalledDevId = established.GetOriginallyCalledDevId();;
  report.m_LastRedirectDevId =   established.GetLastRedirectionDevId();
  report.m_CallId = established.GetJoiningConnId().m_call_id;
  report.m_Code1 = established.GetEventCallType(); //calltype
  report.m_Code2 = established.GetCause(); // call cause

  report.m_Action = "established";

  // check inbound/outbound/ agent to agent call
  rc1 = agents_devices_map.Get(report.m_CallingCalledDevId,agent_info);//agent_id
  rc2 = agents_devices_map.Get(report.m_JoiningCalledDevId ,agent_info);
  if (rc1 == BSWRC_OK && rc2 == BSWRC_OK)
  {
    report.m_DetailedAction = "internal";
  }
  //check outbound
  else if (rc1 == BSWRC_OK && rc2 != BSWRC_OK)
  {
    report.m_DetailedAction = "outbound";
  }
  //check inbound
  else if (rc1 != BSWRC_OK && rc2 == BSWRC_OK)
  {
    report.m_DetailedAction = "inbound";
  }
  UpdateAgentDbInfo(local_dev_id, 0, report);
  CheckActivateAsyncHook("OnConnected", local_dev_id, &established.GetEventCP(), report);

  if (established.GetJoiningConnId().m_dev_id.find("WHISPER") != string::npos)
  {
    ErDevId_t whisper("WHISPER/");
    REPORT report2;
    report2.m_DevId = established.GetJoiningConnId().m_dev_id.substr(whisper.length());
    report2.m_IsAcd = IsACDCall(established.GetEventCP());
    report2.m_CallingCalledDevId = established.GetCallingDevId();
    report2.m_JoiningCalledDevId = established.GetJoiningConnId().m_dev_id;
    report2.m_OriginalCalledDevId = established.GetOriginallyCalledDevId();;
    report2.m_LastRedirectDevId = established.GetLastRedirectionDevId();
    report2.m_CallId = established.GetJoiningConnId().m_call_id;
    report2.m_Code1 = established.GetEventCallType(); //calltype
    report2.m_Code2 = established.GetCause(); // call cause

    report2.m_Action = "established";
    report2.m_DetailedAction = "whisper";

    UpdateAgentDbInfo(report2.m_DevId, 0, report2);
  }
 
  return BSWRC_OK;
}


//======================================[CallCleared]=============================================================
RetCode_t AccapiSeaReply_c::CallCleared(ErMonitorId_t&       monitor_id,
                                        ErReportId_t&        report_id,
                                        BccCallCleared_c&    call_cleared,
                                        ErConnStateVal_t&    local_conn_state_val,
                                        ErDevId_t&           local_dev_id)
{
  RetCode_t rc = BSWRC_OK;
  string agnt;
  string ani;

  sea_log << "AccapiSeaReply_c::CallCleared()" << "\ncall id = " << call_cleared.GetClearedCallId()
          << "\nmonitor_id = " << monitor_id << ", local_dev_id = " << local_dev_id.c_str() << LOG_TERMINATOR;

  REPORT report;
  report.m_Action = "cleared";
  report.m_DetailedAction = "device";
  report.m_DevId = local_dev_id;
  report.m_CallingCalledDevId = call_cleared.GetPrimaryDevId();
  report.m_CallId = call_cleared.GetClearedCallId();

  rc = UpdateAgentDbInfo(local_dev_id, 0, report);
  CheckActivateAsyncHook("OnCleared", local_dev_id, &call_cleared.GetEventCP(), report);

  CEMax* cemax = getCemaxObj();
  if (cemax != NULL) {
    AgentDbInfo_c* ADI = GetAgentObjByDevId(local_dev_id);
    if (ADI != NULL)
    {
      cemax->SendAgentDisconnected(&ADI->m_Number[0]);
    }
  }

  return rc ;//UpdateAgentDbInfo(local_dev_id,WFM::Logon,"");
}


//======================================[ConnCleared]====================================
RetCode_t AccapiSeaReply_c::ConnCleared(ErMonitorId_t&       monitor_id,
                                        ErReportId_t&        report_id,
                                        BccConnCleared_c&    conn_cleared,
                                        ErConnStateVal_t&    local_conn_state_val,
                                        ErDevId_t&           local_dev_id)
{
  RetCode_t rc = BSWRC_OK;
  string clearedDev;
  string ani;
  string agnt;
  clearedDev = conn_cleared.GetClearedConnId().m_dev_id.c_str();

  sea_log << "AccapiSeaReply_c::ConnCleared()"
          << "\nclearedDev = " << clearedDev.c_str()
          << "\ncall id = " << conn_cleared.GetClearedConnId().m_call_id
          << "\nmonitor_id = " << monitor_id << ", local_dev_id = " << local_dev_id.c_str()
          << LOG_TERMINATOR;

  if(clearedDev != local_dev_id)
  {
    sea_log << "\n!!!  Ignore when (clearedDev != local_dev_id)" << LOG_TERMINATOR;
    return rc;
  }

  REPORT report;
  report.m_Action = "cleared";
  report.m_DetailedAction = "connection";
  report.m_DevId = clearedDev;
  report.m_CallingCalledDevId = local_dev_id;
  report.m_JoiningCalledDevId = local_dev_id;

  report.m_CallId = conn_cleared.GetClearedConnId().m_call_id;

  rc = UpdateAgentDbInfo(clearedDev, 0, report);
  CheckActivateAsyncHook("OnCleared", local_dev_id, &conn_cleared.GetEventCP(), report);


  if (clearedDev.find("WHISPER") != string::npos)
  {
    ErDevId_t whisper("WHISPER/");

    REPORT report2;
    report2.m_Action = "cleared";
    report2.m_DetailedAction = "whisper";
    report2.m_DevId = clearedDev.substr(whisper.length());
    report2.m_CallingCalledDevId = local_dev_id;
    report2.m_JoiningCalledDevId = local_dev_id;
    report2.m_CallId = conn_cleared.GetClearedConnId().m_call_id;
    UpdateAgentDbInfo(report2.m_DevId, 0, report2);
  }

  return rc;
}


//======================================[AgentRelease]=========================================================
RetCode_t AccapiSeaReply_c::AgentRelease(ErMonitorId_t&       monitor_id,
                                         ErReportId_t&        report_id,
                                         LrlAgentRelease2_c&  agent_release)
{
  ErDevId_t agent_number = agent_release.GetAgtNumber();
  ErDevId_t agent_dev = agent_release.GetAgtDevId();
  RetCode_t rc = BSWRC_OK;
  REPORT report;
  report.m_Action = "release";
  sea_log << "AccapiSeaReply_c::AgentRelease() [" << "]" << LOG_TERMINATOR;

  report.m_CallingCalledDevId = agent_dev;
  //
  if (agent_release.GetCause() > 1)
  {
    report.m_DetailedAction = "code";
    report.m_Code1 = agent_release.GetCause();
  }
  rc = UpdateAgentDbInfo(agent_dev, 0, report);
  CEMax* cemax = getCemaxObj();
  if (cemax != NULL) {
    cemax->SendAgentReleaseResume(agent_release.GetAgtNumber(), "release");
  }
  CheckActivateAsyncHook("OnReleased", agent_dev, NULL, report);

  return rc;
}


//=================================[AgentResume]=========================================================
RetCode_t AccapiSeaReply_c::AgentResume(ErMonitorId_t&      monitor_id,
                                        ErReportId_t&       report_id,
                                        LrlAgentResume2_c&  agent_resume)
{
  RetCode_t rc = BSWRC_OK;
  ErDevId_t agent_number = agent_resume.GetAgtNumber();
  ErDevId_t agent_dev = agent_resume.GetAgtDevId();

  REPORT report;
  report.m_Action = "resume";
  report.m_CallingCalledDevId = agent_dev;
  sea_log << "AccapiSeaReply_c::AgentResume() [" << "]" << LOG_TERMINATOR;

  // no groups in resume
  //GroupInfo_t* GI = agent_resume.GetGroupInfoArr();
  //AddGroupsToReport(&GI,report);

  rc = UpdateAgentDbInfo(agent_dev, 0, report);
  CEMax* cemax = getCemaxObj();

  if (cemax != NULL) {
    cemax->SendAgentReleaseResume(agent_resume.GetAgtNumber(), "resume");
  }
  CheckActivateAsyncHook("OnResume", agent_dev, NULL, report);

  return rc;
}


//======================================[UpdateAgentMode]================================================
  //IDLE, 
  //BUSY,
  //UNAVAIL,
  //RING,
  //RSRV,
  //TALK,
  //WRAP,
  //WRAP_EXIT, // == WRAP_END
  //WRAP_CODE,
  //WRAP_EXTEND,
  //OTALK,
  //EMAIL,
  //ECHAT,
  //NO_MODE

 /* Ulong_t GetAgentID(){
    return m_agent_id;
  }

  AgentMode_t GetAgentMode(){
    return m_agent_mode;
  }

  ErDevId_t GetAgtDevId() const{
    return m_agt_dev_id;
  }
  ErDevId_t  GetAgtNumber() const{
    return m_agent_number;
  }

  ErDevId_t  GetModeCode() const{
    return m_mode_with_code;
  }

  ErCallId_t  GetModeCall() const{
    return m_mode_with_call;
   }*/

string agentModeStr [] = 
{
 "idle",     
 "busy",     
 "unavailable",
 "ring",  
 "rsrv",     
 "talk",     
 "wrapup",     
 "wrap_exit",
 "wrap_code",
 "wrap_extend",
 "otalk",
 "email",    
 "echat",
 "omni",
 "no_mode",
};

RetCode_t AccapiSeaReply_c::UpdateAgentMode(ErMonitorId_t&          monitor_id,
                                            ErReportId_t&           report_id,
                                            LrlUpdateAgentMode2_c&  agent_mode) //for wrap-up, exit wrap-up
{
  ErDevId_t agent_number = agent_mode.GetAgtNumber();
  ErDevId_t agent_dev = agent_mode.GetAgtDevId();
  RetCode_t rc = BSWRC_OK;
  REPORT report;
  //
  report.m_Action = "updateagentmode";
  report.m_CallingCalledDevId = agent_dev;
  Ulong_t mode  = agent_mode.GetAgentMode();

  //29-Jul-2019 YR BZ#50368
  if(mode == RSRV)
  {
    sea_log << "AccapiSeaReply_c::UpdateAgentMode - RSRV for Call Id " << agent_mode.GetModeCall() << "\n";
    agent_mode.GetCallInfo().call_profile.DumpToLog(sea_log);
    sea_log << LOG_TERMINATOR;
    //
    CallProfileField_c* CPF = (CallProfileField_c*)&agent_mode.GetCallInfo().call_profile.GetFirstField();
    //string s = "";
    char t[16000]; t[0] = 0;
    while (CPF->QueryId() != 0)
    {
      const char* s = CPF->AsStr();
      int num = CPF->QueryId();
      sprintf(&t[strlen(&t[0])], (char*)"%d|", CPF->QueryId());

      //25-Jan-2023 YR BZ#57376 - Field names are not required
      //CP_MAP::iterator it = cp_db.find(num);
      //if (it != cp_db.end())
      //{
      //  char* s1 = &(it->second.m_CPName[0]);
      //  sprintf(&t[strlen(&t[0])], (char*)"%s|", s1);
      //}
      //else
      //{
      //  sprintf(&t[strlen(&t[0])], (char*)"|");
      //}
      sprintf(&t[strlen(&t[0])], (char*)"%s^", s);
      CPF = (CallProfileField_c*)(CallProfileField_c*)&agent_mode.GetCallInfo().call_profile.GetNextField();
    }
    sprintf(&t[strlen(&t[0])], ";~~");
    report.m_MoreDetail = (char*)&t;
  }
  report.m_CallId = agent_mode.GetModeCall();
  report.m_DetailedAction = "";
  if (mode <= NO_MODE)
  {
    report.m_DetailedAction = agentModeStr[mode];
  }
 
  if (report.m_DetailedAction  != "")
  {
    accapi_my_print(3, "UpdateAgentMode, Agent no: %s, mode: %d - %s\n", agent_number.c_str(), mode, report.m_DetailedAction.c_str());
    UpdateAgentDbInfo(agent_dev, 0, report);
    if (report.m_DetailedAction == "wrapup") {
      // CheckActivateAsyncHook("OnWrapUp", agent_mode.GetAgtDevId(), agent_mode.GetCallInfo().GetCallProfile(), report);
      CheckActivateAsyncHook("OnWrapUp", agent_mode.GetAgtDevId(), NULL, report);
    }
    if (report.m_DetailedAction == "idle") {
      CheckActivateAsyncHook("OnReady", agent_mode.GetAgtDevId(), NULL, report);
    }
  }
  //
  
  //AgentDbInfo_c *ADI = AGENTINFOfindByAgenNumber(agent_number);
  //if (ADI != NULL)
  //{
  //  string state = agentModeStr[mode];
  //  if (state != ADI->m_State && state == "idle" && ADI->m_LoginLogout == true)
  //  {
  //    ADI->m_State = agentModeStr[mode];
  //    SendAllAgentsIamINIdleMode(ADI);
  //  }
  //}

  return rc;
}


//=================================[Held]=========================================
RetCode_t AccapiSeaReply_c::Held(ErMonitorId_t&     monitor_id,
                                 ErReportId_t&      report_id,
                                 BccHeld_c&         held,
                                 ErConnStateVal_t&  local_conn_state_val,
                                 ErDevId_t&         local_dev_id)
{
  AgentInfo_s agent_info;
  ErDevId_t dev_id = held.GetHoldingConnId().m_dev_id;
  RetCode_t rc = agents_devices_map.Get(dev_id, agent_info); // it done here because here we have agent id
  if (monitor_id != agent_info.monitor_id)
  {
    // must be same monitor id of the holding dev
    return BSWRC_OK; // ignore it.
  }
  string s = "";
  string irn = "";
  string service = "";
  string group = "";
  PrepareCallProfile(held.GetEventCP(), s, irn, service, group);

  REPORT report;
  report.m_IsAcd = IsACDCall(held.GetEventCP());
  report.m_Action = "hold";
  report.m_CallingCalledDevId = dev_id;
  report.m_CallId = held.GetPrimaryCallId();

  UpdateAgentDbInfo(dev_id, 0, report);
  CheckActivateAsyncHook("OnHeld", dev_id, NULL, report, NULL);
  return BSWRC_OK;
}


//=================================[Retrieved]=========================================
RetCode_t AccapiSeaReply_c::Retrieved(ErMonitorId_t&       monitor_id,
                                      ErReportId_t&        report_id,
                                      BccRetrieved_c&      retrieved,
                                      ErConnStateVal_t&    local_conn_state_val,
                                      ErDevId_t&           local_dev_id)
{
  AgentInfo_s agent_info;
  ErDevId_t dev_id = retrieved.GetPreviouslyHoldingConnId().m_dev_id;
  RetCode_t rc = agents_devices_map.Get(dev_id, agent_info); // it done here because here we have agent id
  if (monitor_id != agent_info.monitor_id)
  {
    // must be same monitor id of the holding dev
    return BSWRC_OK; // ignore it.
  }

  string s = "";
  string irn = "";
  string service = "";
  string group = "";
  PrepareCallProfile(retrieved.GetEventCP(), s, irn, service, group);

  REPORT report;
  report.m_IsAcd = IsACDCall(retrieved.GetEventCP());
  report.m_Action = "retrieve";
  report.m_CallingCalledDevId = dev_id;
  report.m_CallId = retrieved.GetPrimaryCallId();

  UpdateAgentDbInfo(dev_id, 0, report);
  CheckActivateAsyncHook("OnRetrieved", dev_id, NULL, report, NULL);

  return BSWRC_OK;
}

//===============================[Conferenced]===========================================
RetCode_t AccapiSeaReply_c::Conferenced(ErMonitorId_t&       monitor_id,
                                        ErReportId_t&        report_id,
                                        BccConferenced_c&    conferenced,
                                        ErConnStateVal_t&    local_conn_state_val,
                                        ErDevId_t&           local_dev_id)
{
  //conferenced.WriteToLog(sea_log,conferenced.GetCause());
  RetCode_t rc = BSWRC_OK;
  REPORT report;
  report.m_Action = "conferenced";
  report.m_DevId = local_dev_id;
  report.m_CallingCalledDevId = conferenced.GetConferencedDevId();
  report.m_JoiningCalledDevId = conferenced.GetConferencingDevId();
  report.m_OriginalCalledDevId = conferenced.GetConferencedToDevId();
  report.m_CallId = conferenced.GetResultantCallId();
  report.m_Code1 = conferenced.GetPrimaryCallId();
  report.m_Code2 = conferenced.GetSecondaryCallId();
  //

  report.m_IsAcd = IsACDCall(conferenced.GetEventCP());
  if (local_dev_id == conferenced.GetConferencingDevId())
  {
    report.m_Action = "conferencing";
    rc = UpdateAgentDbInfo(conferenced.GetConferencingDevId(), AccapiCrmType_c::Conference, report);
  }
  if (local_dev_id == conferenced.GetConferencedDevId())
  {
    string s = "";
    string irn = "";
    string service = "";
    string group = "";
    PrepareCallProfile(conferenced.GetEventCP(), s, irn, service, group);
    report.m_Action = "conferenced";
    rc = UpdateAgentDbInfo(conferenced.GetConferencedDevId(), AccapiCrmType_c::Conference, report);
    CheckActivateAsyncHook("OnConferenced", local_dev_id, &conferenced.GetEventCP(), report);
  }
  else if (local_dev_id == conferenced.GetConferencedToDevId())
  {
    report.m_Action = "conferencedto";
    rc = UpdateAgentDbInfo(conferenced.GetConferencedToDevId(), AccapiCrmType_c::Conference, report);
  }

  return rc;
}


//================================[AgentAtStation]======================================
RetCode_t AccapiSeaReply_c::AgentAtStation(ErMonitorId_t&              monitor_id,
                                           ErReportId_t&               report_id,
                                           LrlAgentAtStationInfo2_c&   agent_at_station_info)
{
  REPORT report;
  report.m_Action = "AgentAtStation";
  report.m_DetailedAction = "signin";
  report.m_CallingCalledDevId = agent_at_station_info.GetAgtDevId();
  //UpdateAgentDbInfo(agent_at_station_info.GetAgtDevId(),WFM::SignIn,report);
  return BSWRC_OK;
}


//=================================[AgentNoLongerAtStation]===========================================
RetCode_t AccapiSeaReply_c::AgentNoLongerAtStation(ErMonitorId_t& monitor_id,
  ErReportId_t& report_id,
  LrlAgentNoLongerAtStationInfo2_c& agent_no_longer_at_station_info)
{
  REPORT report;
  report.m_Action = "AgentAtStation";
  report.m_DetailedAction = "signout";
  report.m_CallingCalledDevId = agent_no_longer_at_station_info.GetAgtDevId();
  //UpdateAgentDbInfo(agent_no_longer_at_station_info.GetAgtDevId(),WFM::SignIn,report);
  return BSWRC_OK;
}


//===================================[GroupQueueInfo]=======================================
  //SOLSOL for Rapid response 28.10.2013
RetCode_t AccapiSeaReply_c::GroupQueueInfo(ErMonitorId_t&         monitor_id,
                                           ErReportId_t&          report_id,
                                           LrlGroupQueueInfo2_c&  group_queue_info)
{
  return BSWRC_OK;
}


//===================================[GroupQueueCPInfo]=======================================
  //SOLSOLX 2018
   //"10;1|5001;2|2003;3|100;4|6;7|2018-11-25;8|09:11:55;9|1;10|0;11|09:31:09;12|2003;14|ENGLISH;15|1;16|5;39|;40|4444713;52|6;53|5001;111|1234567890;1007|80;^11;1|5001;2|2002;3|76;4|6;7|2018-11-25;8|09:38:".
RetCode_t AccapiSeaReply_c::GroupQueueCPInfo(ErMonitorId_t&          monitor_id,
                                             ErReportId_t&           report_id,
                                             LrlGroupQueueCPInfo2_c& group_queue_info)
{
  GRP_MAP_IT itg;;
  string gid = "";
  for (itg = grp_db.begin(); itg != grp_db.end(); ++itg)
  {
    string s1 = &(itg->second.m_GrpNumber)[0];
    string s2 = group_queue_info.GetGroup_number();
    //accapi_my_print(3,"==================================GroupQueueCPInfo==> group number: %s,%s\n", s1.c_str(),s2.c_str());

    if (s1 == s2)
    {
      char s[23], * ss = &s[0];
      sprintf(ss, "%d", itg->second.m_GrpId);
      gid = ss;
      //accapi_my_print(3,"    ==================================GroupQueueCPInfo==> group number: found: %s\n", gid.c_str());
      break;
    }
  }
  REPORT report;
  report.m_Action = "GroupQueueCPInfo";
  report.m_DevId = gid;
  report.m_MoreDetail = group_queue_info.getVPs();
  //sea_log << "AccapiSeaReply_c::GroupQueueCPInfo()\n  group number: " << group_queue_info.GetGroup_number().c_str() << LOG_TERMINATOR;
  UpdateAgentDbInfo(group_queue_info.GetAgentNumber().c_str(), AccapiCrmType_c::Inbound_1, report);
  return BSWRC_OK;
}


//===================================[PickUpCallReply]=======================================
// SOLSOLX PU 2018
RetCode_t AccapiSeaReply_c::PickupCallReply(ErMonitorId_t&     monitor_id,
                                            ErReportId_t&      report_id,
                                            LrlPickupInfo2_c&  lrlpickupinfo2)
{
  RetCode_t rc = BSWRC_OK;
  return rc;
}

//===================================[SeaGenActionReply]=======================================
// general sea api action SOLSOLY 2019
RetCode_t AccapiSeaReply_c::SeaGenActionReply(ErRequestId_t   request_id,
                                              Ulong_t         action,
                                              ErDevId_t       agent_number,
                                              ErDevId_t       agent_ext,
                                              std::string     more_parmas,
                                              SvcReplyCode_t& reply_code)
{
  RetCode_t rc = BSWRC_OK;
  sea_log << "AccapiSeaReply_c::SeaGenActionReply()"
          << "\nAgent no: " << agent_number.c_str()
          << "\naction: " << action
          << "\nmore_parmas " << more_parmas.c_str()
          << "\nreplay_code " << reply_code << LOG_TERMINATOR;

  // for now reply ok to set onlne, reply denied to set offline = confirm/denied
  CEMax* cemax = getCemaxObj();
  if (cemax != NULL)
  {
    string a = "confirm";
    if (reply_code == 1) a = "denied";
    cemax->SendAgentConfirmOnline(agent_number, a);
  }

  return rc;
}


//===================================[ForcedWrapup]=======================================
RetCode_t AccapiSeaReply_c::ForcedWrapup(ErMonitorId_t&        monitor_id,
                                         ErReportId_t&         report_id,
                                         LrlForcedWrapup2_c&   forced_wrapup)
{
  RetCode_t rc = BSWRC_OK;
  sea_log << "AccapiSeaReply_c::ForcedWrapup()"
          << "\nAgent Id: " << forced_wrapup.GetAgentNumber().c_str()
          << LOG_TERMINATOR;
  accapi_my_print(3, "AccapiSeaReply_c::ForcedWrapup()=> %s\n", forced_wrapup.GetAgentNumber().c_str());

  REPORT report;
  report.m_Action = "ForcedWrapupCode";
  UpdateAgentDbInfo(forced_wrapup.GetAgentNumber().c_str(), AccapiCrmType_c::Inbound_1, report);
  return rc;
}


//===================================[ForcedWrapup]=======================================
RetCode_t AccapiSeaReply_c::ConfirmOutboundCallRequest(ErMonitorId_t&                 monitor_id,
                                                       ErReportId_t&                  report_id,
                                                       LrlConfirmOutboundCallReq2_c&  lrl_confirm_outbound_call_req)
{
  RetCode_t rc = BSWRC_OK;
  sea_log << "AccapiSeaReply_c::ConfirmOutboundCallRequest()"
          << "\nAgent Number: " << lrl_confirm_outbound_call_req.GetAgentNumber().c_str()
          << "\nCall Id: " << lrl_confirm_outbound_call_req.GetCallId()
          << "\nTimeout: " << lrl_confirm_outbound_call_req.GetTimeout()
          << LOG_TERMINATOR;
  accapi_my_print(3, "AccapiSeaReply_c::ConfirmOutboundCallRequest()=>agent: %s, callId: %d, timeout: %d\n",
            lrl_confirm_outbound_call_req.GetAgentNumber().c_str(),
            lrl_confirm_outbound_call_req.GetCallId(),
            lrl_confirm_outbound_call_req.GetTimeout());

  REPORT report;
  report.m_Action = "ConfirmOutboundCallRequest";
  report.m_CallId = lrl_confirm_outbound_call_req.GetCallId();
  report.m_Code1 = lrl_confirm_outbound_call_req.GetTimeout();
  UpdateAgentDbInfo(lrl_confirm_outbound_call_req.GetAgentNumber().c_str(), AccapiCrmType_c::Inbound_1, report);
  return rc;
}


string SvcDescArr[] =
{
  "Ok",
  "Call cannot be picked-up from queue",
  "Invalid ID",
  "Max agents logged in",
  "Agent already logged in",
  "No assigned group",
  "Invalid group",
  "Invalid wrap code",
  "Login failed due to lack of license.",
  "Email address or Email password \nis not defined on server.", //MN1001850 Doron G. 16-03-2009
  "Email address is not valid.",
  "Extension already in use",
  "Your extension has lost connection to the telephony system.\nYou are now logged out of all your groups",
  "Your extension is set to call forward all",
  "An agent can be logged in to only one group while handling predictive outbound",
  "Your extension is set to do not disturb",
  "",
  "No call.",
  "Agent is not idle.",
  "Call is ringing.",
  "",
  "",
  "",
  "",
  "You try to login to more groups then allowed",
  "Email Account is already in use",
  "Transfer Emails allowed only to an agent in the same group",
  "Transfer Chat allowed only to an agent in the same group",
  "Trying connect to other server due to ISLAND mode",
  "Can't logon agent, device defined as 'Ctrl via CTI' is logged out or not set in Aeonix Web",
  "You're already logged in with extension ",
  "Unknown"
};


RetCode_t AccapiSeaReply_c::AgentLoginFailed(ErMonitorId_t&              monitor_id,
                                             ErReportId_t&               report_id,
                                             LrlAgentLoginFailedInfo2_c& agent_login_failed_info)
{
  RetCode_t rc = BSWRC_OK;
  string evtNameStr = agent_login_failed_info.GetEvtNameStr();
  string agentNo = agent_login_failed_info.GetAgentNumber();
  Ulong_t cause = agent_login_failed_info.GetFailCause();
  if (cause > LAST_REPLY_CODE)
  {
    cause = LAST_REPLY_CODE;
  }
  sea_log << "AgentLoginFailed - Agent no:  " << agentNo.c_str() << ", cause: " << cause << "evtNameStr: " << evtNameStr.c_str() << LOG_TERMINATOR;
  accapi_my_print(0, "AccapiSeaReply_c::AgentLoginFailed agent no:  %s, cause: %d, evt Name: %s\n", agentNo.c_str(), cause, evtNameStr.c_str());
  REPORT report;
  report.m_Action = "agentCauses";
  report.m_DetailedAction = SvcDescArr[cause];
  report.m_DevId = agent_login_failed_info.GetAgtDevId();
  report.m_Code1 = (Ulong_t)cause;
  report.m_Code2 = (Ulong_t)cause;
  UpdateAgentDbInfo(agentNo.c_str(), AccapiCrmType_c::CallsStatus, report);

  return rc;
}


//=================================[CallRecording]=========================================
RetCode_t AccapiSeaReply_c::CallRecording(ErMonitorId_t   monitor_id,
                                          ErReportId_t    report_id,
                                          ErDevId_t       device_id,
                                          ErConnId_t      recorded_conn_id,
                                          bool            status,
                                          bool            suspend,
                                          ErName_t        URI,
                                          ErName_t        codec,
                                          ErName_t        format,
                                          ErName_t        sample_rate,
                                          ErName_t        type,
                                          ErCause_t       cause)
{
  RetCode_t rc = BSWRC_OK;
  REPORT report;
  report.m_Action = "callrecordingOnOff";
  report.m_DevId = recorded_conn_id.m_dev_id;
  report.m_Code1 = (int)status;
  report.m_Code2 = (int)suspend;
  report.m_DetailedAction = type;
  report.m_MoreDetail = URI;

  accapi_my_print(0, "AccapiSeaReply_c::CallRecording devid %s, status: %d, suspend: %d, type: %s, URL: %s\n", report.m_DevId.c_str(), report.m_Code1, report.m_Code2, report.m_DetailedAction.c_str(), report.m_MoreDetail.c_str());
  Sleep(500);
  if(type == "REC_LINK")
    rc = UpdateAgentDbInfo(report.m_DevId, AccapiCrmType_c::CallsStatus, report);
  return BSWRC_OK;
}


//=================================[CallOmniMessage]=========================================
RetCode_t AccapiSeaReply_c::CallOmniMessage(ErMonitorId_t   monitor_id,
                                            ErReportId_t    report_id,
                                            ErCallId_t      call_id,
                                            bool            status,
                                            ErDevId_t       from,
                                            ErDevId_t       to_agent,
                                            ErDevId_t       message,
                                            ErCause_t       cause)
{
  RetCode_t rc = BSWRC_OK;
  REPORT report;
  report.m_Action = "callomnimessage";
  report.m_DevId = to_agent;
  report.m_CallId = call_id;
  report.m_Code1 = (int)status;
  //report.m_DetailedAction = message;
  report.m_MoreDetail = message;

  accapi_my_print(0, "AccapiSeaReply_c::CallOmniMessage devid %s, status: %d, message: %s\n", report.m_DevId.c_str(), report.m_Code1, report.m_MoreDetail.c_str());
  Sleep(500);
  rc = UpdateAgentDbInfo(report.m_DevId, AccapiCrmType_c::CallsStatus, report);
  return BSWRC_OK;
}


void PushReportToAgent(AgentDbInfo_c* ADI, REPORT& report);
//===================================[ GetAgentObjByDevId]==========================================
AgentDbInfo_c* AccapiSeaReply_c::GetAgentObjByDevId(ErDevId_t dev_id)
{
  AgentInfo_s agent_info;
  RetCode_t rc = agents_devices_map.Get(dev_id, agent_info); // it done here because here we have agent id
  if (rc == BSWRC_OK)
  {
    // update agent table with device id;
    AGENTINFO_MAP_IT it = agents_db.find(agent_info.agent_id);
    if (it != agents_db.end())
    {
      AgentDbInfo_c* ADI = &(*it).second;
      return ADI;
    }
  }
  return NULL;
}


//===================================[UpdateAgentDbInfo devid]=======================================
RetCode_t AccapiSeaReply_c::UpdateAgentDbInfo(ErDevId_t dev_id,int state, struct REPORT &report)
{
  AgentDbInfo_c* ADI = GetAgentObjByDevId(dev_id);
  if (ADI != NULL)
  {
    // update agent table with device id;
    ADI->m_Extenstion = dev_id;
    if (state == -999999)
    {
      ADI->m_StateCode = ADI->m_PrevStateCode;
    }
    else if (state < 0) // by example: in case of retrieve from hold by example
    {
      ADI->m_PrevStateCode = ADI->m_StateCode; // save state before current new state
      ADI->m_StateCode = (state * -1); // save state before in case of hold
    }
    else
    {
      ADI->m_StateCode = state;
    }
    ADI->m_StartStateTime = time(0);
    ADI->m_Changed = true;
    report.m_ClientId = ADI->m_AgentWSid;
    report.m_SessionId = ADI->m_SessionId;
    PushReportToAgent(ADI, report);
    //ADI.m_report.push_back(report);
  }
  else
  {
    sea_log << "AccapiSeaReply_c::UpdateAgentDbInfo device_id not found: " << dev_id.c_str() << LOG_TERMINATOR;
  }
  return BSWRC_OK;
}


//===================================[UpdateAgentDbInfo agent id]=======================================
RetCode_t AccapiSeaReply_c::UpdateAgentDbInfo(Ulong_t agent_id,int state, struct REPORT &report)
{
  RetCode_t rc = BSWRC_OK;
  if (rc == BSWRC_OK)
  {
    // update agent table with device id;
    //printf("aid:%d, report.m_devid:%s\r\n", agent_id, report.m_DevId.c_str());
    AGENTINFO_MAP_IT it = agents_db.find(agent_id);
    if (it != agents_db.end())
    {
      AgentDbInfo_c& ADI = (*it).second;
      //ADI.m_Extenstion = dev_id;
      if (state == -999999)
      {
        ADI.m_StateCode = ADI.m_PrevStateCode;
      }
      else if (state < 0) // by example: in case of retrieve from hold by example
      {

        ADI.m_PrevStateCode = ADI.m_StateCode;
        ADI.m_StateCode = (state * -1); // save state before in case of hold
      }
      else
      {
        ADI.m_StateCode = state;

      }
      //ADI.m_Line = res_code;
      ADI.m_StartStateTime = time(0);
      ADI.m_Changed = true;
      report.m_ClientId = ADI.m_AgentWSid;
      report.m_SessionId = ADI.m_SessionId;
      PushReportToAgent(&ADI, report);
      //ADI.m_report.push_back(report);
    }
  }
  return rc;
}


//=================================[UpdateAgentDbInfo agentNo]=========================================
RetCode_t AccapiSeaReply_c::UpdateAgentDbInfo(const char *agentNo, int state, struct REPORT &report,int client_id,string sessionid)
{
  RetCode_t rc = BSWRC_FAIL;
  AGENTINFO_MAP_IT it;// = agents_db.find(agent_id);
  for (it = agents_db.begin(); it != agents_db.end(); ++it)
  {
    AgentDbInfo_c& ADI = (*it).second;
    int found = strcmp(agentNo, ADI.m_Number);
    if (found != 0) continue;
    ADI.m_StartStateTime = time(0);
    ADI.m_Changed = true;
    //---------------------------
    if (client_id != -1)
    {
      report.m_ClientId = client_id;
      report.m_SessionId = sessionid;
    }
    else
    {
      report.m_ClientId = ADI.m_AgentWSid;
      report.m_SessionId = ADI.m_SessionId;
    }

    if (report.m_DevId.length() > 29000)
    {
      accapi_my_print(0, "UpdateAgentDbInfo=> agent NO: %s, action: %s,  Seperate m_DevId length = %d\n", agentNo, report.m_Action.c_str(), report.m_DevId.length());
      string actoin = report.m_Action;
      report.m_Action += "*";
      string more = report.m_DevId;
      int l = report.m_DevId.length() / 29000;
      int z = 0;
      int sendlen = 0;
      for (z; z < l; ++z)
      {
        report.m_DevId = more.substr(z * 29000, 29000);
        PushReportToAgent(&ADI, report);
        //ADI.m_report.push_back(report);
        sendlen += 29000;
      }
      report.m_Action = actoin;
      report.m_DevId = more.substr(sendlen, more.length() - sendlen);
    }
    PushReportToAgent(&ADI, report);
    //ADI.m_report.push_back(report);
    rc = BSWRC_OK;
    break;
  }
  return rc;
}
//=====================================[ send Message to AWA_Q3]============================
