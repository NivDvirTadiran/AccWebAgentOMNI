//
// PROJECT & ID  : ACCAPI Solutions
// FILE NAME     : accapi_work_thread.h
// AUTHOR        : Shahar Sperling
// CREATION DATE : 23-Apr-2007
// -----------------------------------------------------------------------
//====================================================================

//==========================[ Interface Dependencies ]================


#ifndef ACCAPI_WORK_THREAD_H
#define ACCAPI_WORK_THREAD_H

#include <bswthread.h>
#include "accapi_sea_reply.h"
#include "accapi_sm_manager.h"
#include "accapi_CEMax.h"
#include "accapi_web_gccs.h"
#include "accapi_web_admin.h"

//#include "sbc_socket.h"

_USING_BSW

//==========================[ Constants & Macros ]====================
static const int BUF_SIZE = 20000;
static const int DEF_BYTE_ARR_LEN = 31000;

//==========================[ Types and Data structures ]=============

//==========================[ Global Functions ]======================
int getEventCode(string event);

string CheckSelectedSript(string name, Ulong_t scriptId);

void accapi_my_print_init(char* fnm);
void accapi_my_print(int level, const char* fmt, ...);
void accapiChangeLogLevel(int new_log_level);

//==========================[ Classes ]===============================

/*
======================================================================
  Class Name: AccapiWorkThread_c

  Description:

  Author: Shahar Sperling

======================================================================
*/

class AccapiWorkThread_c : public BswThread_c
{
//============================ Public Section ========================
public:

  // ctor
  AccapiWorkThread_c();

  // dtor
  ~AccapiWorkThread_c();

  // inherited from BswObject_c
  RetCode_t SerializeTo(BswStream_c& dest) {
    return BSWRC_OK;
  }

  RetCode_t SerializeFrom(BswStream_c& dest) {
    return BSWRC_OK;
  }

  void Dump(BswStream_c&    dump,
            BswDumpLevel_e  self_lvl = BSW_DUMP_LVL_MED,
            BswDumpLevel_e  memb_lvl = BSW_DUMP_LVL_MED) const {
  }

  // inherited from BswThread_c

  RetCode_t Init();

  RetCode_t Terminate();

  const char* GetThreadName() const {
    return "AWA_T2";
  }

  void  OnIdle();


  Bool_t IsInitDone() const {
    return true;
  }

  void SetPreoper();

  Bool_t IsPreoperDone() const;

  void SetOperational();

  void PostEventHandling();
  void SendAllLists(AgentDbInfo_c* ADI, bool all);
  RetCode_t ConvertFileToB64(string FileName, string& B64, Ulong_t min_len = 0);

  void LogoffX(AgentDbInfo_c* ADI, bool isFromLogon);
  void agentDisconnect(AgentDbInfo_c* ADI, bool isFromLogon);
  void LogoffAllAgents(int clientid);
  void SupLogoff(string action, SUP_c* sup, supEntry* entry, string note);
  void GetAllTables(bool isChanged = false);

  int  getActionCode(string action);

  AccapiTimer_c m_conn_timer;

  AccapiSeaReply_c    m_sea_reply;
  AccapiSmManager_c*  m_AccapiSmManager;

  BOOL    m_IsSSO;
  BOOL    m_IsSSOfreeSseating;
  CEMax*  m_CEMax;

  AccapiWebGccs_c*  m_web_gccs;
  AccapiWebAdmin_c* m_web_admin;

//============================ Protected Section ========================
protected:

//============================ Private Section ========================
private:

}; // class SbcWorkThread_c

enum
{
  API_AGENTDETAILS        = 0,
  API_LOGIN               = 1, //-->ConfirmWebAgent
  API_LOGON               = 2, //-->LogonPrimaryGroups
  API_LOGOUT              = 3, //-->LogoutPrimaryGroups
  API_LOGINGROUP          = 4,
  API_LOGOUTGROUP         = 5,
  API_RELEASE             = 6,
  API_RESUME              = 7,
  API_MAKECALL            = 8,
  API_ANSWERCALL          = 9,
  API_DISCONNECT          = 10,
  API_HOLD                = 11,
  API_RETRIEVE            = 12,
  API_SINGLESTEPTRANSFER  = 13,
  API_STARTTRANSFER       = 14,
  API_COMPLETETRANSFER    = 15,
  API_STARTCONFERNCE      = 16,
  API_COMPLETECONFERENCE  = 17,
  API_DIVERTCALL          = 18,
  API_ALTERNANTECALL      = 19,
  API_RECONNECTHELDCALL   = 20,
  API_SWAPCALL            = 21,
  API_BARGIN              = 22,
  API_SILENTMONITOR       = 23,
  API_STARTRECORDING      = 24,
  API_SETAGENTSTATE       = 25,
  API_WRAPUP              = 26,
  API_WHISPER             = 27,
  API_STOPRECORDING       = 28,
  API_SUSPENDRECORDING    = 29,
  API_RESUMERECORDING     = 30,
  API_SERVICES            = 60,
  API_GROUPS              = 61,
  API_CALLPROFILES        = 62,
  API_WRAPUPCODES         = 63,
  API_REASECODES          = 64,
  API_LOGOFFALL           = 65,
  API_QUERYAGENTCALLS     = 66,
  API_GETETAS             = 67,
  API_SAVEETAS            = 68,
  API_LOGOFF              = 69,
  API_SAVEETASINI         = 70,
  API_SETWRAPUPCODE       = 71,
  API_SETMANUELWRAPUP     = 72,
  API_GETGROUPQUEUEINFO   = 73,
  API_GETGROUPQUEUECPINFO = 74,
  API_ACDPICKUPCALL       = 75,
  API_KEEPALIVE           = 76,
  API_SAVEPHONEBOOK       = 78,
  API_AGENTLOG            = 79,
  API_SAVEETASPART        = 80,
  API_SAVEPHONEBOOKPART   = 81,
  API_GETPERSONALSTATISTICS = 82,
  API_SETONLINE           = 83,
  API_ACCADMINUPDATE      = 84,
  API_CONFIRMOUTBOUNDCALLRESULT = 85,
  API_TRANSFERTOAGENT     = 86,
  API_OUTBOUNDREINSERT    = 87,
  API_SUPERVISORHELP      = 88,
  API_LOGONGATE           = 89, //-->LogonPrimaryGroups By accGate
  API_RECORDGREETING      = 90,
  API_AGENTOMNIMESSAGE    = 91,

  //GCCS API CODES
  GCCS_REQUEST_START      = 1000,
  GCCS_LOGON              = 1001,
  GCCS_LOGOFF             = 1002,
  GCCS_SAVESCRIPT         = 1003,
  GCCS_DELTETESCRIPT      = 1004,
  GCCS_RENAMESCRIPT       = 1005,
  GCCS_REFRESH            = 1006,
  GCCS_RELOAD_SCRIPTS     = 1007,
  GCCS_UPLOADIVRFILE      = 1008,
  GCCS_UPDATESOFTPARAM    = 1009,
  GCCS_TEST_EXECUTE_SQL   = 1010,
  GCCS_TEST_EXECUTE_ASYNCHOOK = 1011,
  GCCS_SCRIPT_REFERENCE   = 1012,
  GCCS_SAVEWSFILE         = 1013,
  GCCS_SAVEWSFILEPART     = 1014,
  GCCS_SAVECRMFILE        = 1015,
  GCCS_SAVECRMFILEPART    = 1016,
  GCCS_GETNEWSCRIPTID     = 1017,
  GCCS_SELECTEDSCRIPT     = 1018,
  GCCS_LOGON_GATE         = 1019,

  //ADMIN API CODES
  ADMIN_REQUEST_START     = 2000,
  ADMIN_LOGON             = 2001,
  ADMIN_LOGON_GATE        = 2002,
  ADMIN_LOGOFF            = 2003,
  ADMIN_GETIVRFILES       = 2004,
  ADMIN_GETBACKUPFILES    = 2005,
  ADMIN_GETODBCFILE       = 2006,
  ADMIN_BACKUPNOW         = 2007,
  ADMIN_BACKUPCONFIG      = 2008,
  ADMIN_RESTOREDB         = 2009,
  ADMIN_DBACTIONSTATUS    = 2010,
  ADMIN_UPDATE            = 2011

};

static opertaion OPR[200] =
{
  {"getallagentsdetails",     API_AGENTDETAILS},
  {"login",                   API_LOGIN},
  {"logon",                   API_LOGON},
  {"logongate",               API_LOGONGATE},
  {"logout",                  API_LOGOUT},
  {"logingroup",              API_LOGINGROUP },
  {"logoutgroup",             API_LOGOUTGROUP},
  {"release",                 API_RELEASE},
  {"resume",                  API_RESUME},
  {"makecall",                API_MAKECALL},
  {"answercall",              API_ANSWERCALL},
  {"disconnectcall",          API_DISCONNECT},
  {"holdcall",                API_HOLD},
  {"retrievecall",            API_RETRIEVE},
  {"singlesteptransfer",      API_SINGLESTEPTRANSFER},
  {"starttransfer",           API_STARTTRANSFER},
  {"completetransfer",        API_COMPLETETRANSFER},
  {"startconference",         API_STARTCONFERNCE},
  {"completeconference",      API_COMPLETECONFERENCE},
  {"divertcall",              API_DIVERTCALL},
  {"alternatecall",           API_ALTERNANTECALL},
  {"reconnnectheldcall",      API_RECONNECTHELDCALL},
  {"swapcall",                API_SWAPCALL},
  {"bargin",                  API_BARGIN},
  {"silentmonitor",           API_SILENTMONITOR},
  {"startrecording",          API_STARTRECORDING},
  {"setagentstate",           API_SETAGENTSTATE},
  {"wrapup",                  API_WRAPUP},
  {"whisper",                 API_WHISPER},
  {"stoprecording",           API_STOPRECORDING},
  {"suspendrecording",        API_SUSPENDRECORDING},
  {"resumerecording",         API_RESUMERECORDING},
  {"getservices",             API_SERVICES},
  {"getgroups",               API_GROUPS},
  {"getcallprofiles",         API_CALLPROFILES},
  {"getwrapupcodes",          API_WRAPUPCODES},
  {"getreleasecodes",         API_REASECODES},
  {"LogOffAllAgents",         API_LOGOFFALL},
  {"QueryAgentCalls",         API_QUERYAGENTCALLS},
  {"getetas",                 API_GETETAS},
  {"getetas",                 API_SAVEETAS},
  {"logoff",                  API_LOGOFF},
  {"saveetasini",             API_SAVEETASINI},
  {"setwrapupcode",           API_SETWRAPUPCODE},
  {"setManuelwrapup",         API_SETMANUELWRAPUP},
  {"getGroupQueueInfo",       API_GETGROUPQUEUEINFO},
  {"getGroupQueueCPInfo",     API_GETGROUPQUEUECPINFO},
  {"PickupCall",              API_ACDPICKUPCALL},
  {"keepalive",               API_KEEPALIVE},
  {"savephonebook",           API_SAVEPHONEBOOK},
  {"__agentLog",              API_AGENTLOG},
  {"saveetasini*",            API_SAVEETASPART},
  {"savephonebook*",          API_SAVEPHONEBOOKPART},
  {"getPersonalStatistics",   API_GETPERSONALSTATISTICS},
  {"SetOnline",               API_SETONLINE},
  {"accadminupdate",          API_ACCADMINUPDATE},
  {"ConfirmOutboundCallResult", API_CONFIRMOUTBOUNDCALLRESULT},
  {"transfertoagent",         API_TRANSFERTOAGENT},
  {"outboundreinsert",        API_OUTBOUNDREINSERT},
  {"supervisorhelp",          API_SUPERVISORHELP},
  {"recordgreeting",          API_RECORDGREETING},
  {"agentomnimessage",        API_AGENTOMNIMESSAGE},
  {"suplogon",                GCCS_LOGON},          //To Remove
  {"gccs_suplogon",           GCCS_LOGON},
  {"gccs_suplogongate",       GCCS_LOGON_GATE},
  {"gccs_logoff",             GCCS_LOGOFF},
  {"gccs_savescript",         GCCS_SAVESCRIPT},
  {"gccs_deltetescript",      GCCS_DELTETESCRIPT},
  {"gccs_renamescript",       GCCS_RENAMESCRIPT},
  {"gccs_refresh",            GCCS_REFRESH },
  {"gccs_reloadscripts",      GCCS_RELOAD_SCRIPTS},
  {"gccs_uploadivrfile",      GCCS_UPLOADIVRFILE},
  {"gccs_updatesoftparam",    GCCS_UPDATESOFTPARAM},
  {"gccs_test_execute_sql",   GCCS_TEST_EXECUTE_SQL},
  {"gccs_test_execute_asynchook", GCCS_TEST_EXECUTE_ASYNCHOOK},
  {"gccs_script_reference",   GCCS_SCRIPT_REFERENCE},
  {"gccs_savewsfile",         GCCS_SAVEWSFILE},
  {"gccs_savewsfile*",        GCCS_SAVEWSFILEPART},
  {"gccs_savecrmfile",        GCCS_SAVECRMFILE},
  {"gccs_savecrmfile*",       GCCS_SAVECRMFILEPART},
  {"gccs_getnewscriptid",     GCCS_GETNEWSCRIPTID},
  {"gccs_selectedscript",     GCCS_SELECTEDSCRIPT},
  {"admin_suplogon",          ADMIN_LOGON},
  {"admin_suplogongate",      ADMIN_LOGON_GATE},
  {"admin_logoff",            ADMIN_LOGOFF},
  {"admin_getivrfiles",       ADMIN_GETIVRFILES},
  {"admin_getbackupfiles",    ADMIN_GETBACKUPFILES},
  {"admin_getodbcfile",       ADMIN_GETODBCFILE},
  {"admin_backupnow",         ADMIN_BACKUPNOW},
  {"admin_backupconfig",      ADMIN_BACKUPCONFIG},
  {"admin_restoredb",         ADMIN_RESTOREDB},
  {"admin_dbactionstatus",    ADMIN_DBACTIONSTATUS},
  {"admin_update",            ADMIN_UPDATE},
  {"",999}
};

#endif
