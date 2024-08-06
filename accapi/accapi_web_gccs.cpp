#ifdef _WIN32
#pragma warning(disable:4996)
#pragma warning(disable: 4786)
#endif

//==========================[ Interface Dependencies ]================

//#include "er_std_override.h"
//#ifdef _WIN32
//#pragma warning(disable: 4786)
//#endif

//#include "er_std_override.h"
#include <iostream>
#include <errno.h>
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

#include "accapi_entities.h"
#include "accapi_crm_types.h"
#include "accapi_work_thread.h"
#include "accapi_web_gccs.h"
#include "accapi_sea_reply.h"
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

using namespace std;

//==========================[ Static Singletons ]=====================
static AccapiEntities_c& accapi_entities_obj = AccapiEntities_c::GetAccapiEntitiesObj();


//==========================[ Global Functions ]======================
void my_sleep(int sec);                                                                                                 //accapi_tcp_server.cpp
void SendNotification(supEntry* userentry, string action, Ulong_t code, string data);                                   //accapi_tcp_server.cpp
Ulong_t ExecuteFromHookEx(Ulong_t call_id, char* serialized_cp, Ulong_t& exit_code, Ulong_t timeout, string dll_note);
int ReadAndPrepareaccAgentEvents(string& gccsstr);
//
int hiesghtScriptId = 0;


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
//
// 
// int Split(char* source, std::vector<string>& dest, char* search);
// ===================================[ prepareJsonResults ] ===========================
void  prepareJsonResults(ORecordset* rs, char* errmess, char* sql, string& json)
{
  bool     rc_GetODBCFieldInfo;
  SqlRetCode_e errrc = SQL_OK;
  DBCell_c cell;
  char* strstrX = new char[4096 + 1];
  Ulong_t row_size;
  //==========================================================
  // Read the MetaData
  CODBCFieldInfo info;
  DBColMD_s col;
  // get number of cololms
  Ushort_t nFields = rs->GetColumnCount();
  if (nFields == 0) {
    json = "[] }";
    return;
  }
  json = "{\"Test\":\"SQL\", \"Title\" :\"Database_Test_Query\",\"COLS\" : [";
  for (Ushort_t index = 0; index < nFields; index++)
  {
    rc_GetODBCFieldInfo = rs->GetODBCFieldInfo_(index, info, sql, errmess);
    if (rc_GetODBCFieldInfo)
    {
      //return (sql, BswMakeRc(BSW_SEV_ERROR, FC_EDBI, DB_READ_ERROR), errmess);
    }
    col.ctype = info.m_nSQLType;
    col.csize = info.m_nPrecision;
    col.name = (LPCTSTR)info.m_strName;
    json += "\"" + col.name + "\",";
    col.isNullable = (info.m_nNullability != 0);
    //brs.addMetaDataCol(col);
  }
  json = json.substr(0, json.length() - 1);
  json += "],\"Rows\" : [";
  //==========================================================
  try
  {
    int counter = 0;
    int max_recs = 100;
    ODBVariant varValue;
    while (!rs->IsEOF())
    {
      // if we have reached the maximum records to reply in the request,
      // than we end the loop
      if (counter >= max_recs)
      {
        break;
      }
      counter++;
      json += "[";
      string row = "";
      row_size = 0;

      for (short index = 0; index < nFields; index++)
      {
        CODBCFieldInfo info;

        rs->GetFieldValue(index, varValue);
        rs->GetODBCFieldInfo(index, info);

        if (varValue.IsNull()) {
          cell.cell_dbType = 0; //SQL_NULL
          json += "\"" + cell.strVal + "\",";
        }
        else
          //brs.GetColumnType(index, cell.cell_dbType);
          cell.Clear();
        varValue.GetFullData(info.m_nSQLType, cell.unionVal.bVal, cell.unionVal.cVal, cell.unionVal.iVal, cell.unionVal.lVal, strstrX, cell.tsVal, cell.dVal, cell.unionVal.hVal);
        if (strlen(strstrX) == 0)
        {
          char a[512];
          varValue.GetString(&a[0]);
          strcpy(strstrX, a);
        }
        cell.strVal = strstrX;
        row += "\"" + cell.strVal + "\",";
        //cellVect.push_back(cell);
        cell.Clear();
        varValue.Clear(); //SOLSOL  Clear Variant after push it to cell

      }  // end for( short index = 0; index < nFields; index++)
      row = row.substr(0, row.length() - 1);
      json += row; row = "";
      json += "],";
      rs->MoveNext();
    }  // while
    json = json.substr(0, json.length() - 1);
    json += "]\n}";
    accapi_my_print(0, "prepareJsonResults=> \n%s\n", json.c_str());
  }
  catch (...)
  {
    // any exception while the resultset reading is made, should be
    // coutch here, and than we send an error mesage to the client
    char* errmess = (char*)"EDbi Exception in ExecuteSelect. Cannot read from RecordSet !!!";
    accapi_my_print(0, "Exeption in prepareJsonResults: %s\n", errmess);
  }
  delete[] strstrX;
}


// ===================================[ TestSqlstatement ] ===========================
int TestSqlstatement(supEntry* entry, string sql, int conn_id)
{
  string sqlX = "";
  string cpfY = "";
  Base64::Decode(sql, &sqlX);
  string json = "{\"Test\":\"SQL\", \"Title\" :\"Database_Test_Query\",\"Error\" : \"";

  ODBI odbi;
  ORecordset* rs = NULL;
  ConnRetCode_e    conn_ret = DATABASE_NOT_FOUND;
  SqlRetCode_e sql_ret = SQL_FAIL;
  Ulong_t      dl_counter = 0;
  accapi_my_print(0, "TestSqlstatement, conn id:%d, sql: %s\n", conn_id, sqlX.c_str());
  CONN_MAP_IT it;
  int found = getConn_db(conn_id, it);
  if (found == 0)
  {
    char* errmsg = new char[4096 + 1];
    memset(errmsg, 0, 4096);
    Connection_c conn = *(it->second);
    //conn_ret = odbi.OpenDatabase(conn.m_dsn, conn.m_login_name, conn.m_login_pwd, errmsg);
    conn_ret = odbi.OpenDatabase(conn.m_dsn, errmsg);
    accapi_my_print(0, "TestSqlstatement, CONNECT dsn:%s, ret: %d\n", conn.m_dsn, conn_ret);
    if (conn_ret == CONNECTION_OK)
    {
      if ((stricmp(sqlX.c_str(), "select ")) != 0)
      {
        //select
        sql_ret = odbi.ExecuteSelect(sqlX.c_str(), &rs, errmsg);
        if (sql_ret == SQL_OK)
        {
          prepareJsonResults(rs, &errmsg[0], (char*)sqlX.c_str(), json);
          rs->Close();
        }
        else {
          json += +errmsg; json += "\"}";
        }
      }
      else
      {
        sql_ret = odbi.ExecuteUpdate(sqlX.c_str(), errmsg);
        //update
        json += +errmsg; json += "\"}";
        accapi_my_print(0, "TestSqlstatement, UPDATE ret:%d, msg: %s\n", sql_ret, errmsg);
      }
      odbi.CloseDatabase();
    }
    else // wrong conn id
    {
      json += +errmsg; json += "\"}";
    }
    //
    delete[] errmsg;
    string  B64 = "";
    //accapi_my_print(0, "TestSqlstatement(),\n%s", json.c_str());
  }
  else
  {
    json += "No Such Connection\"}";
  }
  string  B64 = "";
  string  B64A = "";
  Base64::Encode(json, &B64);
  Base64::Encode(sqlX, &B64A);
  SendNotification(entry, "sqlResponse", sql_ret, B64 + "," + B64A);
  my_sleep(250);
  return 0;
}


// ===================================[ ExecFullHttp ] ===========================
int ExecFullHttp(supEntry* entry, const string request, const string cpf)
{
  char* cpfX = new char[32000 + 1];
  string req = "";
  string cpfY = "";
  Base64::Decode(request, &req);
  Base64::Decode(cpf, &cpfY);
  memset(&cpfX[0], 0, 31999);
  er_sprintf(&cpfX[0], "%s", cpfY.c_str());
  Ulong_t exitcode = 0;
  int   res = ExecuteFromHookEx((Ulong_t)0, &cpfX[0], exitcode, (Ulong_t)30, req);
  if (entry != NULL) {
    string  B64 = "";
    Base64::Encode(&cpfX[0], &B64);
    SendNotification(entry, "httpResponse", exitcode, B64);
  }
  my_sleep(100);
  delete[] cpfX;
  return res;
}


// ===================================[ AudioConvert ] ===============================
int AudioConvert(supEntry* userentry, const string convertScript, const string fullfnm)
{
  time_t t0 = time(0);
  int ret = system(convertScript.c_str());
  time_t t1 = time(0);
  if (ret == 0)
  {
    EosDelFile(0, (EosFileName_t*)fullfnm.c_str());
    accapi_my_print(0, "GCCS_UPLOADIVRFILE user:%s,  convert took %d secs\n", userentry->m_supName.c_str(), (t1 - t0));
  }
  else
  {
    accapi_my_print(0, "user: %s, ERROR LoadIvr files: %s\n", userentry->m_supName.c_str(), convertScript.c_str());
  }
  return 0;
}


//========================[ text2SpeechUrl ]=============================================
// get statiscis flag and number of online threads from soft_param
char text2SpeechUrl[256];
RetCode_t AccapiWebGccs_c::GetMoreParamsFromSoftParam()
{
  RetCode_t       rc = BSWRC_OK;
  RetCode_t       execute_result = BSWRC_OK;
  ResultSet_c     result_set;
  Statement_c     st;

  static DBManager_c db_manager1;

  char cmnd[1024];
  er_sprintf(&cmnd[0], "select param_id, str_val  from soft_param where param_id = 400000000");
  st.SetQuery(&cmnd[0]);
  result_set.clear();
  //
  rc = db_manager1.ExecuteSelectSyn(st, result_set, execute_result);

  while (result_set.Next())
  {
    result_set.GetStringByName("str_val", &text2SpeechUrl[0]);
    accapi_my_print(0, "Text2Speech URl: %s\n", &text2SpeechUrl[0]);
  }
  return rc;
}


//===================== UpdateSoftParam ==============================
void AccapiWebGccs_c::UpdateSoftParam(string param_id_str, string param_value, string param_type, string param_class)
{
  RetCode_t       rc = BSWRC_OK;
  RetCode_t       execute_result = BSWRC_OK;
  Ulong_t         val = 0, val1 = 0;
  ResultSet_c     result_set;
  Statement_c     st;

  static DBManager_c db_manager1;

  char cmnd[1024];
  er_sprintf(&cmnd[0], "INSERT INTO soft_param(param_id, str_val, param_type, param_class, param_name)  VALUES(%s, \"%s\", \"s\", 5, \"%.30s\")",
    param_id_str.c_str(), param_value.c_str(), param_value.c_str());
  st.SetQuery(&cmnd[0]);
  result_set.clear();
  char errorMsg[1024];
  memset(&errorMsg[0], 0, sizeof(errorMsg));
  rc = db_manager1.ExecuteUpdateSyn(st, execute_result, &errorMsg[0]);
  if (execute_result != BSWRC_OK)
    accapi_my_print(0, "UpdateSoftParam, Insert FAILED, ErrNo: %s, try to update\n", &errorMsg[0]);
  else
    accapi_my_print(0, "UpdateSoftParam,Insert SUCCEEDED,%s\n", &cmnd[0]);

  er_sprintf(&cmnd[0], "UPDATE soft_param  SET str_val = \"%s\" where param_id = %s ", param_value.c_str(), param_id_str.c_str());

  memset(&errorMsg[0], 0, sizeof(errorMsg));
  st.SetQuery(&cmnd[0]);
  result_set.clear();
  rc = db_manager1.ExecuteUpdateSyn(st, execute_result, &errorMsg[0]);
  if (execute_result != BSWRC_OK)
  {
    accapi_my_print(0, "UpdateSoftParam,Update FAILED,  ErrNo: %s, try to update\n", &errorMsg[0]);
    return;
  }
  accapi_my_print(0, "UpdateSoftParam,Update SUCCEEDED,%s\n", execute_result, &cmnd[0]);
}


//===================== SendScripts ==============================
void AccapiWebGccs_c::SendScripts(supEntry* userentry, string name_Chronical)
{
  string allscriptd = "[";
  int script_id = 0;
  Byte_t* data = (Byte_t*) new char[DEF_BYTE_ARR_LEN + 1];
  int arr_len = DEF_BYTE_ARR_LEN;
  memset(&data[0], 0, DEF_BYTE_ARR_LEN);
  char* json = new char[64000 + 1];
  ResultSet_c* rs = new ResultSet_c();
  int name_choronical = name_Chronical == (char*)"chronological" ? 1 : 0;
  RetCode_t rc = GetFirstCCS(script_id, data, arr_len, name_choronical, rs);
  char* b64 = new char[DEF_BYTE_ARR_LEN * 4 + 1];

  while (rc == 0)
  {
    char scripidStr[15];
    er_sprintf(&scripidStr[0], "%d", script_id);
    memset(&b64[0], 0, DEF_BYTE_ARR_LEN * 4);
    Base64::Encode((const char*)&data[0], arr_len, &b64[0], arr_len * 4);
    //accapi_my_print(0,"script id: %d, len: %d,  data: %s\n",script_id, arr_len, &data[0]);
    memset(json, 0, sizeof(json));
    er_sprintf(&json[0], "{\"key\": %d, \"value\": \"%s\"},\n", script_id, &b64[0]);
    allscriptd += json;
    arr_len = DEF_BYTE_ARR_LEN;
    rc = GetNextCCS(script_id, data, arr_len, rs);
    if (script_id < 10000 && script_id > hiesghtScriptId)
    {
      hiesghtScriptId = script_id;
    }
  }
  allscriptd[allscriptd.length() - 2] = '\n';
  allscriptd[allscriptd.length() - 1] = ']';
  allscriptd += "\n";
  string bb64 = "";
  accapi_entities_obj.sendOneTable(userentry, "gccsScripts", allscriptd);
  accapi_my_print(0, "SendScripts ==> hiesghtScriptId: %d\n", hiesghtScriptId);
  delete[] b64;
  delete[] json;
  delete[] data;
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


//======================================[SendAllGccsLists]===========================
void AccapiWebGccs_c::SendAllGccsLists(supEntry* userentry)
{
  SendScripts(userentry, "byname");

  //IVR files
  vector<string> files_vec;
  string JsonStr = "[";
  string dir_s = "../IVR";
  //
  list_dirs(dir_s, files_vec, "", ".ulaw", JsonStr);
  JsonStr[JsonStr.length() - 2] = ']';//over comma
  JsonStr[JsonStr.length() - 1] = '\n';
  accapi_entities_obj.sendOneTable(userentry, "ivrFiles", JsonStr);
  //
  JsonStr = "[";
  dir_s = "../lib/hooks";
  list_dirs(dir_s, files_vec, "", "so", JsonStr);
  JsonStr[JsonStr.length() - 2] = ']';//over comma
  JsonStr[JsonStr.length() - 1] = '\n';
  accapi_entities_obj.sendOneTable(userentry, "libs", JsonStr);
  //
  accapi_entities_obj.sendOneTable(userentry, "languages", lng_db_json);
  accapi_entities_obj.sendOneTable(userentry, "services", srv_db_json);
  accapi_entities_obj.sendOneTable(userentry, "cpf", cp_db_json);
  accapi_entities_obj.sendOneTable(userentry, "groups", grp_db_json);
  accapi_entities_obj.sendOneTable(userentry, "contacts", mail_db_json);
  accapi_entities_obj.sendOneTable(userentry, "sql_connections", dbConnections_db_json);
  accapi_entities_obj.sendOneTable(userentry, "ws_connections", wsConnections_db_json);
  accapi_entities_obj.sendOneTable(userentry, "applications", ivrapp_map_json);
  accapi_entities_obj.sendOneTable(userentry, "irns", irn_json);

  //
  string gccsstr = "";
  //ReadAndPrepareaccAgentEvents(gccsstr);
  if(PrepareToSend_AgentEvents(gccsstr) == BSWRC_OK)
    accapi_entities_obj.sendOneTable(userentry, "ws_file", gccsstr);
  //GetGccs_CRMjson(gccsstr);
  if (PrepareToSend_AgentCRMjson(gccsstr) == BSWRC_OK)
    accapi_entities_obj.sendOneTable(userentry, "crm_file", gccsstr);
}


// ====================== [PrepareToSend_AgentEvents] ====================
int AccapiWebGccs_c::PrepareToSend_AgentEvents(string& gccsstr)
{
  return ReadAndPrepareaccAgentEvents(gccsstr);
}


// ====================== [PrepareToSend_AgentCRMjson] ====================
int AccapiWebGccs_c::PrepareToSend_AgentCRMjson(string& gccsstr)
{
  string b64 = "";
  gccsstr = "";
  string accAgentEvents = "../Agents/CRM.json";
  if (SWT->ConvertFileToB64(accAgentEvents, b64) == BSWRC_FAIL)
  {
    accapi_my_print(0, " ++ Fail to read AgentCRMjson => cannot open CRM.json\n");
    return -1;
  }
  else
  {
    bool b = Base64::Decode(b64, &gccsstr);
  }
  return 0;
}


SUP_c* getSupUser(string agent_no);
std::string makekey(const std::string& input, int inputLen);
//======================================[HandleGccsRequest]===========================
void AccapiWebGccs_c::HandleGccsRequest(int code, vector<string> params)
{
  RetCode_t   rc = BSWRC_OK;
  string      action = "";

  if (params.size() < 2)
    return;

  SUP_c* sup = getSupUser(params[2]);
  if (sup == NULL)
  {
    accapi_my_print(0, "AccapiWebGccs_c::HandleGccsRequest => SupUser NOT FOUND %s\n", params[2].c_str());
    return; // no such agent number
  }
  accapi_my_print(0, "AccapiWebGccs_c::HandleGccsRequest => %s User(params[2]): %s, session(params[1]) %s \n", params[0].c_str(), params[2].c_str(), params[1].c_str());

  string sessionX = params[1];
  //
  supEntry* userentry = sup->getSupentry(sessionX);
  if (userentry == NULL) // new session
  {
    if ((code != GCCS_LOGOFF && params[3] != "FORCE") ||
        (sup->m__supEntriesVec.size() == 0))
    {
      accapi_my_print(0, "AccapiWebGccs_c::HandleGccsRequest => No User Entry found in SupUser\n");
      return; // no such agent number
    }
    sup->m__supEntriesVec[0]->sessionId = params[1];
    userentry = sup->m__supEntriesVec[0];
  }

  //
  switch (code)
  {
    case GCCS_LOGON:
    {
      RetCode_t cause = BSWRC_OK;
      Ulong_t   client_Id = userentry->m_sid;
      Ushort_t  sup_level = sup->m_supLevel;
      Ulong_t   user_id = sup->m_userId;
      Ulong_t   agent_id = sup->m_agentId;
      string    versionX = params[6];

      //
      //supEntry SE = get
      userentry->m_Ip = params[4];

      char session[120];
      er_sprintf(&session[0], "%d:%s", userentry->m_sid, sessionX.c_str());
      string server_version = SuGetEpicVersion();
      if (versionX != server_version)
      {
        char v[128];
        er_sprintf(v, "%s/%s", server_version.c_str(), versionX.c_str());
        accapi_my_print(0, "GCCS_LOGON ==> logon denied, wrong sup user %s server version: %s, version: %s\n", sup->m_supName, server_version.c_str(), versionX.c_str());
        SendNotification(userentry, "supDenied", WRONG_ETAS_VERSION, &v[0]);
        sup->deleteSupentry(userentry->sessionId);
        break;
      }
      accapi_my_print(0, "GCCS_LOGON ==> sup name: %s, session:%s, version %s\n", params[2].c_str(), sessionX.c_str(), versionX.c_str());
      if (SWT->m_IsSSO == FALSE)
      {
        string passmd5 = params[3];
        string newPass = userentry->sessionId; newPass += (char*)":"; newPass += &sup->m_supPass[0];
        string newPassMd5 = makekey(newPass, newPass.length());
        if (newPassMd5 == passmd5)
        {
          rc = SWT->m_AccapiSmManager->m_proxy_obj->LoginWebVisorSync(WEB_GCCS,
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
          accapi_my_print(0, "GCCS_LOGON ==> sup logon Denied , INVALID_SUPERVISOR_NAME_OR_PWD %s\n", sup->m_supName);
          SendNotification(userentry, "supDenied", INVALID_SUPERVISOR_NAME_OR_PWD, "");
          break;
        }
      }
      else //SSO on
      {
        accapi_my_print(0, "GCCS_LOGON SSO User: %s\n", &sup->m_supName[0]);
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

      action = "suplogon";
      if (cause > BSWRC_OK)
      {
        accapi_my_print(0, "supDenied user: %s, cause: %d\n", userentry->m_supName.c_str(), cause);
        action = "supDenied";
      }
      else
      {
        userentry->m_ClientId = client_Id;
        userentry->m_supLevel = sup_level;
        SendAllGccsLists(userentry);
        SendToAuditLog(userentry->m_supName, "WEBGCCS", "", "", "Login", "", "", 0, my_IP);//userentry->m_Ip);
        GetMoreParamsFromSoftParam();
      }
      char prms[256] = "\0";
      er_sprintf(&prms[0], "%s,%d", &text2SpeechUrl[0], userentry->m_ClientId);
      SendNotification(userentry, action, cause, &prms[0]);
      if (cause > BSWRC_OK)
      {
        sup->deleteSupentry(userentry->sessionId);
      }
    }
    break;
    //
    case GCCS_LOGON_GATE:
    {
      RetCode_t cause = BSWRC_OK;
      Ulong_t   client_Id = userentry->m_sid;
      Ushort_t  sup_level = sup->m_supLevel;
      Ulong_t   user_id = sup->m_userId;
      Ulong_t   agent_id = sup->m_agentId;
      string    versionX = params[6];

      //
      //supEntry SE = get
      userentry->m_Ip = params[4];

      char session[120];
      er_sprintf(&session[0], "%d:%s", userentry->m_sid, sessionX.c_str());
      string server_version = SuGetEpicVersion();
      if (versionX != server_version)
      {
        char v[128];
        er_sprintf(v, "%s/%s", server_version.c_str(), versionX.c_str());
        SendNotification(userentry, "supDenied", WRONG_ETAS_VERSION, &v[0]);
        accapi_my_print(0, "GCCS_LOGON_GATE ==> logon denied, wrong sup user %s server version: %s, version: %s\n",
          sup->m_supName, server_version.c_str(), versionX.c_str());
        sup->deleteSupentry(userentry->sessionId);
        break;
      }
      accapi_my_print(0, "GCCS_LOGON_GATE, agent no: %s, session:%s,web agent version %s\n", params[2].c_str(), sessionX.c_str(), versionX.c_str());
      if (SWT->m_IsSSO == FALSE)
      {
        string passmd5 = params[3];
        accapi_my_print(0, "GCCS_LOGON_GATE passmd5: %s\n", passmd5.c_str());
        string newPass = userentry->sessionId; newPass += (char*)":"; newPass += &sup->m_supPass[0];
        accapi_my_print(0, "GCCS_LOGON_GATE newPass: %s\n", newPass.c_str());
        string newPassMd5 = makekey(newPass, newPass.length());
        accapi_my_print(0, "GCCS_LOGON_GATE newPassMd5: %s\n", newPassMd5.c_str());
        //if (newPassMd5 == passmd5)
        //{
        rc = SWT->m_AccapiSmManager->m_proxy_obj->LoginWebVisorSync(WEB_GCCS_GATE,
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
        /*}
        else
        {
          SendNotification(userentry, "supDenied", INVALID_SUPERVISOR_NAME_OR_PWD, "");
          accapi_my_print(0, "GCCS_LOGON ==> sup logon Denied , wrong sup user %s\n",
            sup->m_supName);
          break;
        }*/
      }
      else //SSO on
      {
        accapi_my_print(0, "GCCS_LOGON SSO User: %s\n", &sup->m_supName[0]);
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
      string action = "suplogon";
      if (cause > BSWRC_OK)
      {
        accapi_my_print(0, "supDenied user: %s, cause: %d\n", userentry->m_supName.c_str(), cause);
        action = "supDenied";
      }
      else {
        userentry->m_ClientId = client_Id;
        userentry->m_supLevel = sup_level;
        SendAllGccsLists(userentry);
        SendToAuditLog(userentry->m_supName, "WEBGCCS", "", "", "Login", "", "", 0, my_IP);//userentry->m_Ip);
        GetMoreParamsFromSoftParam();
      }
      char prms[256] = "\0";
      er_sprintf(&prms[0], "%s,%d", &text2SpeechUrl[0], userentry->m_ClientId);
      SendNotification(userentry, action, cause, &prms[0]);
      if (cause > BSWRC_OK)
      {
        sup->deleteSupentry(userentry->sessionId);
      }
    }
    break;
    //
    case GCCS_RELOAD_SCRIPTS:
      SendScripts(userentry, params[3]);
    break;
    //
    case GCCS_LOGOFF:
      gccsSupLogoff(sup, userentry, "");
    break;
    //
    case GCCS_SAVESCRIPT:
    {
      accapi_my_print(0, "Save script user: %s, name: %s,%s,new: %s\n", params[2].c_str(), params[3].c_str(), params[4].c_str(), params[6].c_str());
      size_t outlen = params[5].length() + 10000 + 1;
      char* fromb64 = new char[outlen + 10000];
      memset(fromb64, 0, outlen);
      size_t inLen = params[5].length();
      bool b = Base64::Decode(params[5].c_str(), inLen, fromb64, outlen);
      Ulong_t  id = atoi(params[3].c_str());
      if (id < 10000)// delete all virtual scripts
      {
        DeleteVirtualCCS(id);
      }
      int res = StoreCCS(id, (char* const)params[4].c_str(), (Byte_t*)fromb64, outlen, (char*)"");
      if (res != 0)
      {
        accapi_my_print(0, "!!ERROR!! GCCS_SAVESCRIPT, cause: %d\n", res);
      }
      else {
        AdminUpdate(EosNtoHL(ADU_UPDATE), EosNtoHL(TBLID_CCS_HDR), EosNtoHL(id), 0);
        if (id < 10000)
        {
          string isNew = params[6] == "false" ? "Update" : "Add";
          SendToAuditLog(userentry->m_supName, "WEBGCCS", "", "", isNew, params[4], params[3], 0, my_IP);// userentry->m_Ip);
        }
      }

    }
    break;
    //
    case GCCS_DELTETESCRIPT:
    {
      Ulong_t s_id = atoi(params[3].c_str());
      accapi_my_print(0, "Delete script user: %s, Script id: %s,name: %s\n", params[2].c_str(), params[3].c_str(), params[4].c_str());
      char* ScriptRefArray[MAX_REFERENCES];
      for (int i = 0; i < MAX_REFERENCES; i++)
        ScriptRefArray[i] = new char[MAX_NAME_LEN + 10];
      int arr_len = 0;
      GetScriptReferences(s_id, arr_len, ScriptRefArray);

      string prms = params[3] + ",";
      for (int t = 0; t < arr_len; ++t)
      {
        for (int ss = 0; ss < strlen(ScriptRefArray[t]); ++ss)
        {
          if (ScriptRefArray[t][ss] == ',') ScriptRefArray[t][ss] = ';';
        }
        string s = ScriptRefArray[t];
        prms += s + "|||";
      }
      prms += ", , , ";
      accapi_my_print(0, "GCCS_DELTETESCRIPT: ref len: %d,  %s", arr_len, prms.c_str());
      string b64 = "";
      Base64::Encode(prms, &b64);

      SendNotification(userentry, "CofirmDelete", arr_len, b64);
      if (arr_len == 0) {
        rc = DeleteCCS(atoi(params[3].c_str()));
        if (rc != 0)
        {
          accapi_my_print(0, "!!ERROR!! Failed to delete script id:  %s,rc: %d\n", params[3].c_str(), rc);
        }
        else
        {
          Ulong_t  id = atoi(params[3].c_str());
          accapi_my_print(3, "Delete script id:  %s\n", params[3].c_str());
          if (id < 10000)
          {
            SendToAuditLog(userentry->m_supName, "WEBGCCS", "", "", "Delete", params[4], params[3], 0, my_IP);// userentry->m_Ip);
          }
        }
      }
    }
    break;
    //
    //
    case GCCS_RENAMESCRIPT:
    break;
    //
    case GCCS_UPLOADIVRFILE:
    //GCCS_uploadIvrFile,4841391808184,folder(3),10secs_heb.wav(4),0(5),16(6),29000(7)
    accapi_my_print(0, "%s,%s,(3-folder): %s,(4-filename): %s,(no 5): %s,(total 6): %s,(b64 len 7): %d\n",
      params[0].c_str(), params[2].c_str(), params[3].c_str(), params[4].c_str(), params[5].c_str(), params[6].c_str(), params[7].length());
    {
      bool ret = false;
      string fnm = params[4];
      Ulong_t total = atoi(params[6].c_str());
      if (userentry->m_uploadFiles == NULL)
      {
        userentry->m_uploadFiles = new UploadFile(fnm, total);
      }
      Ulong_t idx = atoi(params[5].c_str());
      userentry->m_uploadFiles->parts[idx] = params[7];
      userentry->m_uploadFiles->count++;
      if (userentry->m_uploadFiles->count == total) // end all parts
      {
        string all = "";
        for (size_t i = 0; i < userentry->m_uploadFiles->parts.size(); ++i)
        {
          if (userentry->m_uploadFiles->parts[i].empty()) // some error
          {
            accapi_my_print(0, "!! ERROR UPLOAD FILE, idx: %d, %s Is empty\n"), idx, fnm.c_str();
            delete userentry->m_uploadFiles;
            userentry->m_uploadFiles = NULL;
            break;
          }
          ret = true;
          all += userentry->m_uploadFiles->parts[i];
        }

        if (ret == true)
        {
          size_t outlen = all.length() + 10000 + 1;
          char* fromb64 = new char[outlen + 10000];
          memset(fromb64, 0, outlen);
          size_t inLen = all.length();
          bool b = Base64::Decode(all.c_str(), inLen, &fromb64[0], outlen);
          accapi_my_print(0, "GCCS_UPLOADIVRFILE File %s  length: %d \n", fnm.c_str(), outlen);
          EosCreateDirectory(0, (EosFileName_t*)"../uploadivr");
          char fullpath[1024];
          char convertScript[1024];
          er_sprintf(&fullpath[0], "../uploadivr/%s", fnm.c_str());
          FILE* fd = fopen(fullpath, "wb");
          if (fd == NULL)
          {
            accapi_my_print(0, "!! ERROR (%d) UPLOAD FILE, cannot open file for write: %s \n"), errno, fnm.c_str();
            ret = false;
          }
          else
          {
            fwrite(fromb64, outlen, 1, fd);
            fclose(fd);
            // /home/aeonixadmin/aeonix/local/bin/audioConvert.sh ./uploadivr/ "./IVR/english files/"
            // /home/aeonixadmin/aeonix/local/bin/audioConvert.sh /opt/acc/uploadivr "/opt/acc/IVR/english files"

            accapi_my_print(0, "GCCS_UPLOADIVRFILE OK : %s \n", fnm.c_str());
            er_sprintf(&convertScript[0], " /home/aeonixadmin/aeonix/local/bin/audioConvert.sh /opt/acc/uploadivr \"%s\" 1>../Log/ivrconvert.log 2>>../Log/ivrconvert.log",
              params[3].c_str());
            accapi_my_print(0, "GCCS_UPLOADIVRFILE convert : %s \n", &convertScript[0]);
            //
            string full = &fullpath[0];
            string convertS = &convertScript[0];
            ThreadMgr::Spawn(AudioConvert, userentry, *(&convertS), *(&full));
          }
          delete[] fromb64;
          delete userentry->m_uploadFiles;
          userentry->m_uploadFiles = NULL;
        }
      }
    }

    break;
    //
    case GCCS_UPDATESOFTPARAM:
      accapi_my_print(0, "%s,%s,(3): %s,(4): %s,(5): %s\n",
        params[0].c_str(), params[2].c_str(), params[3].c_str(), params[4].c_str(), params[5].c_str());
      UpdateSoftParam(params[3], params[4]);

    break;
    //
    case GCCS_TEST_EXECUTE_SQL:
      ThreadMgr::Spawn(TestSqlstatement, userentry, params[4], atoi(params[3].c_str()));
    break;
    //
    case GCCS_TEST_EXECUTE_ASYNCHOOK:
      ThreadMgr::Spawn(ExecFullHttp, userentry, params[3], params[4]);
    break;
    //
    case GCCS_SAVEWSFILE:
    {
      string b64 = "";
      b64 = userentry->wsfile_part + params[3];
      userentry->wsfile_part = "";
      if (b64.length() < 256)
      {
        accapi_my_print(0, "GCCS_SAVEWSFILE=> too short ,not saved: %s\n", b64.c_str());
        break;
      }
      string output = "";
      bool b = Base64::Decode(b64, &output);
      if (b == false)
      {
        accapi_my_print(0, "GCCS_SAVEWSFILE=> FAILED to decode  %s, len: %d %.70s\n", params[2].c_str(), output.length(), output.c_str());
        break;
      }
      string wsName = "../Agents/accAgentEvents.cfg";//" + splited[2];//   + "/ETAS.json";
      //CreateDirectory(phoneName.c_str(),0);
      char wsBk[120];
      er_sprintf(&wsBk[0], "%s.%ld\0", wsName.c_str(), time(0));
      accapi_my_print(0, "GCCS_SAVEWSFILE=>   fnm: %s, backup: %s\n", wsName.c_str(), wsBk);
      rename(wsName.c_str(), (const char*)&wsBk[0]);
      FILE* fp = fopen(wsName.c_str(), "w");
      if (fp == NULL)
      {
        accapi_my_print(0, "GCCS_SAVEWSFILE=> CANNOT Update  accAgentEvents.cfg for user: %s, errno: %d\n", params[2].c_str(), errno);
        break;
      }
      int len = fwrite(output.c_str(), 1, output.length(), fp);
      fclose(fp);
      if (len == -1)
        accapi_my_print(0, "GCCS_SAVEWSFILE=> CANNOT Update accAgentEvents.cfg for user %s\n", params[2].c_str());
      else
      {
        string gccsstr = "";
        // refresh events vector
        ReadAndPrepareaccAgentEvents(gccsstr);
      }
    }
    break;
    //
    case GCCS_SAVEWSFILEPART:
      userentry->wsfile_part += params[3];
      accapi_my_print(0, "GCCS_SAVEWSFILEPART=> len: %d / %d\n", params[3].length(), userentry->wsfile_part.length());
    break;

    case GCCS_SAVECRMFILE:
    {
      string b64 = "";
      b64 = userentry->crmfile_part + params[3];
      userentry->wsfile_part = "";
      if (b64.length() < 256)
      {
        accapi_my_print(0, "GCCS_SAVECRMFILE=> too short ,not saved: %s\n", b64.c_str());
        break;
      }
      string output = "";
      bool b = Base64::Decode(b64, &output);
      if (b == false)
      {
        accapi_my_print(0, "GCCS_SAVECDRMFILE=> FAILED to decode  %s, len: %d %.70s\n", params[2].c_str(), output.length(), output.c_str());
        break;
      }
      string crmName = "../Agents/CRM.json";//" + splited[2];//   + "/ETAS.json";
      //CreateDirectory(phoneName.c_str(),0);
      char wsBk[120];
      er_sprintf(&wsBk[0], "%s.%ld\0", crmName.c_str(), time(0));
      accapi_my_print(0, "GCCS_SAVECRMFILE=>   fnm: %s, backup: %s\n", crmName.c_str(), wsBk);
      rename(crmName.c_str(), (const char*)&wsBk[0]);
      FILE* fp = fopen(crmName.c_str(), "w");
      if (fp == NULL)
      {
        accapi_my_print(0, "GCCS_SAVECRMFILE=> CANNOT Update  CRM.json for user: %s, errno: %d\n", params[2].c_str(), errno);
        break;
      }
      int len = fwrite(output.c_str(), 1, output.length(), fp);
      fclose(fp);
      if (len == -1)
        accapi_my_print(0, "GCCS_SAVECRMFILE=> CANNOT Update CRM.json for user %s\n", params[2].c_str());
    }
    break;
    //
    case GCCS_SAVECRMFILEPART:
      userentry->crmfile_part += params[3];
      accapi_my_print(0, "GCCS_SAVECRMFILEPART=> len: %d / %d\n", params[3].length(), userentry->crmfile_part.length());
    break;

    case GCCS_GETNEWSCRIPTID:
      hiesghtScriptId++;
      SendNotification(userentry, "newscriptid", hiesghtScriptId, "");
    break;
    //
    case GCCS_SELECTEDSCRIPT:
    {
      userentry->selectedScript = atoi(params[3].c_str());
      string used = CheckSelectedSript(&sup->m_supName[0], userentry->selectedScript);
      if (used != "")
      {
        SendNotification(userentry, "scriptAlreadyUsed", userentry->selectedScript, "Script already selected by: " + used);
      }
    }
    break;
    //
    default:
      accapi_my_print(0, "HandleGccsRequest(), unhandle action: %s", params[0].c_str());
    break;
  }
}


//======================================[gccsSupLogoff]===========================
void AccapiWebGccs_c::gccsSupLogoff(SUP_c* sup, supEntry* entry, string note)
{
  RetCode_t       rc = BSWRC_OK;
  rc = SWT->m_AccapiSmManager->m_proxy_obj->LogoutWebVisorSync(entry->m_ClientId);
  if (rc == BSWRC_OK)
  {
    SendToAuditLog(entry->m_supName, "WEBGCCS", "", "", "Logout", "", "", 0, my_IP);//userentry->m_Ip);
    sup->m__supEntriesVec.clear();
    accapi_my_print(0, "gccsSupLogoff => %s sm ClientId: %d %s\n", sup->m_supName, entry->m_ClientId, note.c_str());
  }
}



