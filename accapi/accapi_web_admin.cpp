#ifdef _WIN32
#pragma warning(disable:4996)
#pragma warning(disable: 4786)
#endif
//#include "er_std_override.h"
//#ifdef _WIN32
//#pragma warning(disable: 4786)
//#endif

//#include "er_std_override.h"
#include <iostream>
#include <errno.h>
using namespace std;
//
#include <dbbroker.h>
#include <adupdate.h>
#include "accapi_timer.h"
#include "./base64.h"
#include "../SolLib/sollib.h"
#include <dbi_odbi.h>
#include <dbi_odbvariant.h>
#include <util_dbidefs.h>
#include <dbi_statement.h>
#include <dbi_resultset.h>
#include <dbi_dbmanager.h>
#include <sm_serviceiface.h>

#include "accapi_crm_types.h"
#include "accapi_work_thread.h"
#include "accapi_web_admin.h"
//#include "fullhttps_hook.h"

extern "C"
{
#include <oendian.h>
#include <dbbroker.h>
#include <othr.h>
  //#include <odynlib.h>
#include <smntrapi.h>
#include <ofil.h>
}

#define DBI_Q5        64
#define DBI_T5        64
#define AWA_TH2      177  //UtlThrIDByName((char *) "AWA_TH2") 
#define AWA_TH3      178  //UtlThrIDByName((char *) "AWA_TH3") 

#define DB_ACTION_IDLE          0
#define DB_ACTION_IN_PROCESS    1

void my_sleep(int sec);
void SendNotification(supEntry* userentry, string action, Ulong_t code, string data);
Ulong_t ExecuteFromHookEx(Ulong_t call_id, char* serialized_cp, Ulong_t& exit_code, Ulong_t timeout, string dll_note);
int ReadAndPrepareaccAgentEvents(string& gccsstr);
string Odbcini2Json();
//void DistributeAdminUpdate(string params);
//

//
extern string my_IP;
extern AccapiWorkThread_c* SWT;
int sendResponse(int clientId, string response);
int SendToAuditLog(string     loginName,
                   string     displayName,
                   string     userId,
                   string     serverName,
                   string     actionType,
                   string     objectType,
                   string     objectId,
                   int        objectTenant,
                   string     userIp);
// gccs tables
const int TBLID_SOFT_PARAM = 1;
const int TBLID_CCS_HDR = 4;

int getConn_db(int conn_id, CONN_MAP_IT& it);
int Split(char* source, std::vector<string>& dest, char* search);


//=============================== Admin Send Notification ==============================
//{"sessionid":"1672091655610","direction":"f_s","agentNo":"1001","action":"logon","params":"1608387772,1001,logon,,8|64|,,2001,16nXnNeV157XmSDXkNeR16jXkteZ15w=,,MQ==,0,0,0,,N"},
void AccapiWebAdmin_c::AdminSendNotification(int clientId, string& session, string& supname, string action, string data)
{
  char* buf = new char[64000 + 1];
  char fixdata[256];
  string data_part = "";
  int len = data.length();
  int idx = 0;
  int partNo = 0;
  //accapi_my_print(3, "\nAdminSendNotification,data len: %d,  action: %s\n%s\n", data.length(), action.c_str(), data.c_str());
  do
  {
    memset(&buf[0], 0, 64000);
    data_part = data.substr(idx, 30000);
    string actionX = (len > 30000) ? "==" + action : action;
    //
    sprintf(&fixdata[0], "%ld,%s,%s\0", time(0), supname.c_str(), actionX.c_str());
    //
    sprintf(&buf[0], "[{\"sessionid\":\"%s\",\"direction\":\"af_s\",\"agentNo\":\"%s\",\"action\":\"%s\",\"params\": \"%s, ,%s,%d,,,,,,,,,,\"}]",
            session.c_str(),
            supname.c_str(),
            actionX.c_str(),
            fixdata,
            data_part.c_str(),
            partNo);
    //
    sendResponse(clientId, (char*)&buf[0]);
    accapi_my_print(3, "Admin SendNotification,part: %d, idx: %d, %d,  %.150s\n", partNo, idx, clientId, &buf[0]);

    idx += 30000;
    len -= 30000;
    partNo++;
  } while (len > 0);
  delete[] buf;
}


//=============================== list_dirs ==============================
int list_dirs(const std::string& _dir, std::vector<std::string>& _files, std::string _current_dir, string extension, string& JsonStrX);
extern string ivrapp_map_json;
extern string mail_db_json;
extern string dbConnections_db_json;
extern string wsConnections_db_json;
extern string lng_db_json;
extern string grp_db_json;
extern string cp_db_json;
extern string dll_json;
extern string srv_db_json;
extern string irn_json;


//======================================[SendWebAdminLists]=========================
int AccapiWebAdmin_c::sendOdbcFile(int clientId, string& session, string& user, string action, string data)
{
  string  B64 = "";
  Base64::Encode(data, &B64);
  AdminSendNotification(clientId, session, user, action, B64);
  return 0;
}


//string JsonStr = "";
//======================================[SendWebAdminLists]=========================
int  AccapiWebAdmin_c::SendWebAdminIvrs(int clientId, string& session, string& user, string action)
{
  //IVR files
  vector<string> files_vec;
  string JsonStr = "[";
  string dir_s = "../IVR";
  string json_str = "";
  //
  list_dirs(dir_s, files_vec, "", ".ulaw", JsonStr);
  JsonStr[JsonStr.length() - 2] = ']';//over comma
  JsonStr[JsonStr.length() - 1] = '\n';
  string 	B64 = "";
  Base64::Encode(JsonStr, &B64);
  AdminSendNotification(clientId, session, user, action, B64);
  return 0;
}


//======================================[SendWebAdminBackups]=======================
int  AccapiWebAdmin_c::SendWebAdminBackups(int clientId, string& session, string& user, string action)
{
  //backup files
  vector<string> files_vec;
  string JsonStr = "[";
  string dir_s = "../backup";
  string json_str = "";
  //
  list_dirs(dir_s, files_vec, "", ".gz", JsonStr);
  JsonStr[JsonStr.length() - 2] = ']';//over comma
  JsonStr[JsonStr.length() - 1] = '\n';
  string  B64 = "";
  Base64::Encode(JsonStr, &B64);
  AdminSendNotification(clientId, session, user, action, B64);
  return 0;
}


//======================================[SendWebAdminLists]=========================
int  AccapiWebAdmin_c::SendWebAdminDBActionStatus(int clientId, string& session, string& user, string action, string data)
{
  AdminSendNotification(clientId, session, user, action, data);
  return 0;
}


////
SUP_c* getSupUser(string agent_no);
std::string makekey(const std::string& input, int inputLen);


//======================================[sendEventToDbi]===============================
EosRetCode_t  AccapiWebAdmin_c::sendEventToDbi(const EosOpCode_t  opcode,
                                               Byte_t* const      event_data,
                                               Ushort_t           event_data_len)
{
  EosRetCode_t        ret_val;
  EosEventHeader_t    hdr;

  hdr.op_code = opcode;
  hdr.dest_que_id = DBI_Q5;
  hdr.reply_que_id = -1;
  hdr.data_len = event_data_len;
  //
  ret_val = EosCreateAndSendEvent(AWA_TH2,
                                  hdr.dest_que_id,
                                  hdr,
                                  event_data,
                                  hdr.data_len);
  accapi_my_print(0, "sendEventToDbi:retval: %d,  %d,%s\n", ret_val, opcode, event_data);

  return ret_val;
}


//===============================[getDBActionStatusCode]=================
int AccapiWebAdmin_c::getDBActionStatusCode(string action)
{
  for (int i = 0; i < 200; ++i)
  {
    if (DBACTION[i].m_ActionCode == 999)
    {
      return -1;
    }
    if (action == DBACTION[i].m_ActionStr)
    {
      return DBACTION[i].m_ActionCode;
    }
  }
  return -1;
}


//===============================[isDBActionAllowed]=================
int AccapiWebAdmin_c::isDBActionAllowed()
{
  string backup_flag_file = "/opt/acc/tmp/BACKUP_FLAG.txt";
  string restore_flag_file = "/opt/acc/tmp/RESTORE_FLAG.txt";

  FILE* fp = fopen(backup_flag_file.c_str(), "r");
  if (fp != NULL)
    return DB_ACTION_IN_PROCESS;
  else
  {
    fp = fopen(restore_flag_file.c_str(), "r");
    if (fp != NULL)
      return DB_ACTION_IN_PROCESS;
  }
  return DB_ACTION_IDLE;
}


//===============================[getDBActionStatus]=================
int AccapiWebAdmin_c::getDBActionStatus(string action, string& status)
{
  int code = getDBActionStatusCode(action);
  Ulong_t ret_status = 0;

  switch(code)
  {
    case BACKUP_NOW:
    {
      string backup_flag_file = "/opt/acc/tmp/BACKUP_FLAG.txt";
      FILE* fp = fopen(backup_flag_file.c_str(), "r");
      if (fp != NULL)
        status = "ongoing,1,In Process";
      else
        status = "finished,100,Completed";
    }
    break;
    case BACKUP_CONFIG:
    {
      string restore_flag_file = "/opt/acc/tmp/BACKUP_FLAG.txt";
      FILE* fp = fopen(restore_flag_file.c_str(), "r");
      if (fp != NULL)
        status = "ongoing,1,In Process";
      else
        status = "finished,100,Completed";
    }
    break;
    case RESTORE_DB:
    {
      string restore_flag_file = "/opt/acc/tmp/RESTORE_FLAG.txt";
      FILE* fp = fopen(restore_flag_file.c_str(), "r");
      if (fp != NULL)
        status = "ongoing,1,In Process";
      else
        status = "finished,100,Completed";
    }
    break;
    default:
      accapi_my_print(0, "getDBActionStatus(), unknown action: %s", action.c_str());
      break;

  }
  return -1;
}


//======================================[HandleAdminRequest]===========================
void AccapiWebAdmin_c::HandleAdminRequest(int code, vector<string> params)
{
  RetCode_t   rc = BSWRC_OK;
  string      result = "";

  if (params.size() < 2)
    return;

  SUP_c* sup = getSupUser(params[2]);
  if (sup == NULL)
  {
    accapi_my_print(0, "AccapiWebAdmin_c::HandleAdminRequest => SupUser NOT FOUND %s\n", params[2].c_str());
    return; // no such agent number
  }

  int session_i = params.size()-1;
  string session_pi = params[session_i-1];
  string sessionX = session_pi;

  accapi_my_print(0, "AccapiWebAdmin_c::HandleAdminRequest => %s User(params[2]): %s, session(params[%d]) %s \n", params[0].c_str(), params[2].c_str(), session_i-1, params[session_i-1].c_str());

  //
  supEntry* userentry = sup->getSupentry(session_pi);
  if (userentry == NULL) // new session
  {
    if ((code != ADMIN_LOGOFF && params[3] != "FORCE") ||
      (sup->m__supEntriesVec.size() == 0))
    {
      accapi_my_print(0, "AccapiWebAdmin_c::HandleAdminRequest => No User Entry found in SupUser\n");
      return; // no such agent number
    }
    sup->m__supEntriesVec[0]->sessionId = params[1];
    userentry = sup->m__supEntriesVec[0];
  }


// ----------------------------------------------------------------
// -----------------------CCADMIN REQUESTS-------------------------
// ----------------------------------------------------------------
// -- distribute --
  char c[256]; c[0] = 0;

 
  RetCode_t       cause = BSWRC_OK;
  Ulong_t         client_Id = userentry->m_sid;
  Ushort_t        sup_level = sup->m_supLevel;
  Ulong_t         user_id = sup->m_userId;
  Ulong_t         agent_id = sup->m_agentId;
  string          versionX = params[6];
  char            session[120];
  char            prms[256] = "\0";
  string          server_version = SuGetEpicVersion();
  string          action = "";
  string          jsonStr = "";
  //vector<string>  v;
  //int             count = Split((char*)result.c_str(), v, (char*)",");

  userentry->m_Ip = params[4];
  sprintf(&session[0], "%d:%s", userentry->m_sid, sessionX.c_str());
  //
  switch (code)
  {
    case ADMIN_LOGON:
      //
      //char session[120];
      //sprintf(&session[0], "%d:%s", userentry->m_sid, sessionX.c_str());
      if (versionX != server_version)
      {
        char v[128];
        sprintf(v, "%s/%s", server_version.c_str(), versionX.c_str());
        SendNotification(userentry, "supDenied", WRONG_ETAS_VERSION, &v[0]);
        accapi_my_print(0, "ADMIN_LOGON ==> logon denied, wrong sup user %s server version: %s, version: %s\n",
          sup->m_supName, server_version.c_str(), versionX.c_str());
        sup->deleteSupentry(userentry->sessionId);
        break;
      }
      accapi_my_print(0, "ADMIN_LOGON ==> sup name: %s, session:%s, version %s\n", params[2].c_str(), sessionX.c_str(), versionX.c_str());
      if (SWT->m_IsSSO == FALSE)
      {
        string passmd5 = params[3];
        string newPass = userentry->sessionId; newPass += (char*)":"; newPass += &sup->m_supPass[0];
        string newPassMd5 = makekey(newPass, newPass.length());
        if (newPassMd5 == passmd5)
        {
          rc = SWT->m_AccapiSmManager->m_proxy_obj->LoginWebVisorSync(WEB_ADMIN,
                                                                      params[2].c_str(),  //user name
                                                                      &sup->m_supPass[0], //user password
                                                                      session,  //
                                                                      userentry->m_Ip.c_str(),
                                                                      params[5].c_str(),  // Tomact IP
                                                                      cause,
                                                                      client_Id,
                                                                      sup_level,
                                                                      user_id,
                                                                      agent_id);
        }
        else
        {
          SendNotification(userentry, "admin_supdenied", INVALID_SUPERVISOR_NAME_OR_PWD, "");
          accapi_my_print(0, "ADMIN_LOGON ==> admin_supdenied , wrong sup user %s\n", sup->m_supName);
          break;
        }
      }
      else //SSO on
      {
        accapi_my_print(0, "ADMIN_LOGON SSO User: %s\n", &sup->m_supName[0]);
        rc = SWT->m_AccapiSmManager->m_proxy_obj->LoginSSOWebVisorSync(params[2].c_str(),  //user name
                                                                       session,  //
                                                                       userentry->m_Ip.c_str(),
                                                                       params[5].c_str(),  // Tomact IP
                                                                       cause,
                                                                       client_Id,
                                                                       sup_level,
                                                                       user_id,
                                                                       agent_id);
      }

      action = "admin_suplogon";
      if (cause > BSWRC_OK)
      {
        accapi_my_print(0, "admin_supdenied user: %s, cause: %d\n", userentry->m_supName.c_str(), cause);
        action = "admin_supdenied";
      }
      else
      {
        userentry->m_ClientId = client_Id;
        userentry->m_supLevel = sup_level;
        SendToAuditLog(userentry->m_supName, "WEBADMIN", "", "", "Login", "", "", 0, my_IP);//userentry->m_Ip);
      }
      sprintf(&prms[0], "%d", userentry->m_ClientId);
      SendNotification(userentry, action, cause, &prms[0]);
      if (cause > BSWRC_OK)
      {
        sup->deleteSupentry(userentry->sessionId);
      }
      break;

    //
    case ADMIN_LOGON_GATE:
      //
      if (versionX != server_version)
      {
        char v[128];
        sprintf(v, "%s/%s", server_version.c_str(), versionX.c_str());
        SendNotification(userentry, "admin_supdenied", WRONG_ETAS_VERSION, &v[0]);
        accapi_my_print(0, "ADMIN_LOGON_GATE ==> logon denied, wrong sup user %s server version: %s, version: %s\n",
          sup->m_supName, server_version.c_str(), versionX.c_str());
        sup->deleteSupentry(userentry->sessionId);
        break;
      }
      accapi_my_print(0, "ADMIN_LOGON_GATE, agent no: %s, session:%s,web agent version %s\n", params[2].c_str(), sessionX.c_str(), versionX.c_str());
      if (SWT->m_IsSSO == FALSE)
      {
        string passmd5 = params[3];
        accapi_my_print(0, "ADMIN_LOGON_GATE passmd5: %s\n", passmd5.c_str());
        string newPass = userentry->sessionId; newPass += (char*)":"; newPass += &sup->m_supPass[0];
        accapi_my_print(0, "ADMIN_LOGON_GATE newPass: %s\n", newPass.c_str());
        string newPassMd5 = makekey(newPass, newPass.length());
        accapi_my_print(0, "ADMIN_LOGON_GATE newPassMd5: %s\n", newPassMd5.c_str());

        rc = SWT->m_AccapiSmManager->m_proxy_obj->LoginWebVisorSync(WEB_ADMIN_GATE,
                                                                    params[2].c_str(),  //user name
                                                                    "",                 //user password
                                                                    session,            //
                                                                    userentry->m_Ip.c_str(),
                                                                    params[5].c_str(),  // Tomact IP
                                                                    cause,
                                                                    client_Id,
                                                                    sup_level,
                                                                    user_id,
                                                                    agent_id);
      }
      else //SSO on
      {
        accapi_my_print(0, "ADMIN_LOGON_GATE SSO User: %s\n", &sup->m_supName[0]);
        rc = SWT->m_AccapiSmManager->m_proxy_obj->LoginSSOWebVisorSync(params[2].c_str(),  //user name
                                                                       session,  //
                                                                       userentry->m_Ip.c_str(),
                                                                       params[5].c_str(),  // Tomact IP
                                                                       cause,
                                                                       client_Id,
                                                                       sup_level,
                                                                       user_id,
                                                                       agent_id);
      }
      action = "admin_suplogongate";
      if (cause > BSWRC_OK)
      {
        accapi_my_print(0, "supDenied user: %s, cause: %d\n", userentry->m_supName.c_str(), cause);
        action = "admin_supdenied";
      }
      else {
        userentry->m_ClientId = client_Id;
        userentry->m_supLevel = sup_level;
        SendToAuditLog(userentry->m_supName, "WEBADMIN", "", "", "Login", "", "", 0, my_IP);//userentry->m_Ip);
      }
      sprintf(&prms[0], "%d", userentry->m_ClientId);
      SendNotification(userentry, action, cause, &prms[0]);
      if (cause > BSWRC_OK)
      {
        sup->deleteSupentry(userentry->sessionId);
      }
      break;

    //
    case ADMIN_LOGOFF:
      adminSupLogoff(sup, userentry, "");
      break;

    //
    case ADMIN_GETIVRFILES:
      action = "admin_ivrfiles";
      SendWebAdminIvrs(client_Id, sessionX, userentry->m_supName, action);
      break;

    //
    case ADMIN_GETBACKUPFILES:
      action = "admin_backupfiles";
      SendWebAdminBackups(client_Id, sessionX, userentry->m_supName, action);
      break;

    //
    case ADMIN_GETODBCFILE:
      action = "admin_odbcfiles";
      jsonStr = Odbcini2Json();
      sendOdbcFile(client_Id, sessionX, userentry->m_supName, action, jsonStr);
      break;

    //
    case ADMIN_BACKUPNOW:
      accapi_my_print(0, "clientId %d, BACKUP_NOW\n", client_Id);
      if(isDBActionAllowed() == DB_ACTION_IDLE)
        sendEventToDbi(BACKUP_NOW, (Byte_t*)&c, 0);
      else
        accapi_my_print(0, "clientId %d, DB Action is in process, BACKUP_NOW - Not Allowed\n", client_Id);
      break;

    //
    case ADMIN_BACKUPCONFIG:
      accapi_my_print(0, "clientId %d, ADMIN_BACKUPCONFIG\n", client_Id);
      if (isDBActionAllowed() == DB_ACTION_IDLE)
        sendEventToDbi(BACKUP_CONFIG, (Byte_t*)&c, 0);
      else
        accapi_my_print(0, "clientId %d, DB Action is in process, BACKUP_CONFIG - Not Allowed\n", client_Id);
      break;

    //
    case ADMIN_RESTOREDB:
      sprintf(&c[0], "%s", params[4].c_str());
      accapi_my_print(0, "clientId %d, RESTORE_DB: %s\n", client_Id, &c[0]);
      if (isDBActionAllowed() == DB_ACTION_IDLE)
        sendEventToDbi(RESTORE_DB, (Byte_t*)&c, strlen(c));
      else
        accapi_my_print(0, "clientId %d, DB Action is in process, RESTORE_DB - Not Allowed\n", client_Id);
      break;

      //
    case ADMIN_DBACTIONSTATUS:
    {
      string status;
      action = "admin_dbactionstatus";
      accapi_my_print(0, "clientId %d, ADMIN_DBACTIONSTATUS ==> %s\n", client_Id, params[4].c_str());
      getDBActionStatus(params[4], status);
      SendWebAdminDBActionStatus(client_Id, sessionX, userentry->m_supName, action, status);
      break;
    }

    //
    //case ADMIN_UPDATE:
    //  accapi_my_print(0, "clientId %d, ADMIN_UPDATE\n", client_Id);
    //  DistributeAdminUpdate(&c[0]);
    //  break;

    //
    default:
      accapi_my_print(0, "HandleAdminRequest(), unknown action: %s", params[0].c_str());
      break;
  }
}


//======================================[adminSupLogoff]===========================
void AccapiWebAdmin_c::adminSupLogoff(SUP_c* sup, supEntry* entry, string note)
{
  RetCode_t       rc = BSWRC_OK;
  rc = SWT->m_AccapiSmManager->m_proxy_obj->LogoutWebVisorSync(entry->m_ClientId);
  if (rc == BSWRC_OK)
  {
    SendToAuditLog(entry->m_supName, "WEBADMIN", "", "", "Logout", "", "", 0, my_IP);//userentry->m_Ip);
    //18-Aug-2024 YR BZ#59940
    sup->deleteSupentry(entry->sessionId);
    accapi_my_print(0, "adminSupLogoff => %s sm ClientId: %d %s\n", sup->m_supName, entry->m_ClientId, note.c_str());
  }
}



