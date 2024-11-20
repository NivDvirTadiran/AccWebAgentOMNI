//
// PROJECT & ID  : ACCAPI Solutions
// FILE NAME     : accapi_timer.h
// AUTHOR        : Eli Sh.
// CREATION DATE : 01-May-2007
// -----------------------------------------------------------------------
// - MODULE VERSION:
//   ==============
//
// - MODULE DESCRIPTION:
//   ==================
//
// - REMARKS:
//  =========
//
//
//
//
//
//====================================================================
#ifndef ACCAPI_TIMER_H
#define ACCAPI_TIMER_H

//==========================[ Interface Dependencies ]================
#include <er_std_override.h>
#include <map>
#include <vector>
#include <string>
#include <time.h>
#include <memory.h>
#include <bswtimer.h>
#include "lrl_le_defs.h"
#include <mgen_iddgen.h>
#include <dbi_resultset.h>
#include <sm_serviceiface.h>
#include "accapi_crm_types.h"

using namespace std;

#define NAME_SIZEX 256
//===================[ Groups ]=======================
struct Groups
{
  int    m_grp_id;
  bool   m_primary;
};
//===================[ REPORT ]=======================
struct REPORT
{
  REPORT() {
    m_Code1 = -1;
    m_Code2 = -1;
    m_CallId = 0xFFFFFFFF;
    m_IsAcd = "N";
    m_SessionId = "";
    m_ClientId = -1;
    m_Done = false;
    m_cp = NULL;
  }

  string          m_Action;
  string          m_DetailedAction;
  string          m_MoreDetail;
  string          m_DevId;
  string          m_CallingCalledDevId;
  string          m_JoiningCalledDevId;
  string          m_OriginalCalledDevId;
  string          m_LastRedirectDevId;
  Ulong_t         m_CallId;
  int             m_Code1;
  int             m_Code2;
  string          m_IsAcd;
  int             m_ClientId;
  string          m_SessionId;
  bool            m_Done;
  Ulong_t         m_AgentId; // just to able move info into thread
  vector<Groups>  m_Groups;
  //CallProfile_c* m_cp;
  void*           m_cp;
};


//===================[ AgentDbInfo_c ]=======================
class AgentDbInfo_c
{
public:
  AgentDbInfo_c()
  {
    m_State = "";
    m_LoginLogout = true;
    m_Sup = 0;
    m_SmClientId = -1;
    m_AgentWSid = -1;
    m_SessionId = "";
    m_Agent_id = 0;
    m_TimeInState = 0;
    m_StateCode = 0;
    m_PrevStateCode = 0;
    m_TempExtension = "";
    m_Extenstion = "";
    m_ReasonCode = "";
    memset(m_Name, 0, sizeof(char[NAME_SIZEX + 1]));
    memset(m_Number, 0, AGENT_NUM_DIGITS + 1);
    m_Changed = false;
    m_StartStateTime = time(0);
    m_allready_confirmed = false;
    m_primary_groups = "";
    m_LastKeeAliveTime = time(0);
    m_Pass[0] = 0;
    m_Cos_Id = -1;
    m_PhonbookPart = "";
    m_EtasiniPart = "";
    m_Ip = "";
    m_isLogin = false;
    m_LastEvent = -1;
    m_LastEventTime = 0;
    m_ignore_keepalive = false;
  }

  bool      m_isLogin;
  Ulong_t   m_Sup;
  Ulong_t   m_SmClientId;
  Ulong_t   m_Agent_id;   //Db Id
  Ulong_t   m_Cos_Id;
  char      m_Name[NAME_SIZEX + 1];
  char      m_Number[AGENT_NUM_DIGITS + 1];
  string    m_Extenstion;
  string    m_TempExtension;
  int       m_StateCode; // in WFM up to 3 digits
  int       m_PrevStateCode; // in WFM up to 3 digits
  int       m_TimeInState;
  string    m_ReasonCode;
  time_t    m_StartStateTime;
  bool      m_Changed;
  int       m_AgentWSid;
  string    m_SessionId;
  bool      m_allready_confirmed;
  string    m_primary_groups;
  time_t    m_LastKeeAliveTime;
  char      m_Pass[NAME_SIZEX + 1];
  string    m_PhonbookPart;
  string    m_EtasiniPart;
  string    m_Ip;
  string    m_State;
  bool      m_LoginLogout;
  int       m_LastEvent;      // avoid send same event in less than second
  time_t    m_LastEventTime;  // avoid send same event in less than second
  bool      m_ignore_keepalive;
  vector<REPORT> m_report;
};

typedef std::map<Ulong_t,AgentDbInfo_c> AGENTINFO_MAP;
typedef AGENTINFO_MAP::iterator AGENTINFO_MAP_IT;

//===================[ UploadFile ]=======================
class UploadFile
{
public: 
  string          filename;
  Ulong_t         count;
  Ulong_t         totalParts;
  vector<string>  parts;
  //
  UploadFile(string fnm, Ulong_t total)
  {
    filename = fnm;
    count = 0;
    totalParts = total;
    parts.resize(total);
  }
};


//===================[ supEntry ]=======================
class supEntry
{
public:
  string        m_supName;
  ACC_WebApps_t m_supType;
  Ulong_t       m_ClientId;
  string        sessionId;
  int           m_sid;
  string        m_Ip;
  Ushort_t      m_supLevel;
  UploadFile*   m_uploadFiles;
  string        wsfile_part;
  string        crmfile_part;
  Ulong_t       selectedScript;
  //g
  supEntry(ACC_WebApps_t sup_type, string session, int sid, string name, Ushort_t level);
};


//===================[ SUP_c ]=======================
class SUP_c
{
public:
  Ulong_t           m_userId;
  char              m_supName[NAME_SIZEX + 1];
  char              m_supPass[NAME_SIZEX + 1];
  Ulong_t           m_supLevel;
  Ulong_t           m_agentId;
  vector<supEntry*> m__supEntriesVec;
  time_t            m_LastKeeAliveTime;

  SUP_c();
  ~SUP_c();

  supEntry* getSupentry(string sessionId);
  void      addSupentry(supEntry* sup_entry);
  void      setSupentry(string sessionId, Ulong_t clientId);
  void      deleteSupentry(string sessionId);
};

//
typedef std::map<string,SUP_c>  SUP_MAP;
typedef SUP_MAP::iterator       SUP_MAP_IT;


//===================[ IvrApp_c ]=======================
class IvrApp_c{
public:
  Ulong_t m_ivr_app_id;
  char m_ivr_app_name[NAME_SIZEX + 1];
  Ulong_t m_min_handling_time;
  Ulong_t m_max_handling_time;
  Ulong_t m_ivr_interval_time;
  IvrApp_c() {
    memset(m_ivr_app_name, 0, sizeof(char[NAME_SIZEX + 1]));
    m_ivr_app_id = -1;
    m_min_handling_time = 0;
    m_max_handling_time = 0;
    m_ivr_interval_time = 0;
  }
};

typedef std::map<Ulong_t,IvrApp_c>  IVR_APP;
typedef IVR_APP::iterator           IVR_APP_IT;


//===================[ COS_c ]=======================
class COS_c {
 public:
   COS_c() { m_CosStr = ""; };

   void SetId(Ulong_t cos_id) { m_cos_id = cos_id; }
   void SetCOSMembers(ResultSet_c  cos_rs)
   {
     m_cos_info.m_cos_id = m_cos_id;
     // Get the cos_name from the DBI
     cos_rs.GetStringByName("cos_name", m_cos_name);
     cos_rs.GetBoolByName("acd_pickup_from_queue", m_cos_info.m_acd_pickup_from_queue);
     cos_rs.GetBoolByName("acd_specific_login", m_cos_info.m_acd_specific_login);
     cos_rs.GetBoolByName("disp_change_toolbar_layout", m_cos_info.m_disp_change_toolbar_layout);
     cos_rs.GetBoolByName("disp_change_windows_layout", m_cos_info.m_disp_change_windows_layout);
     cos_rs.GetBoolByName("call_status_window", m_cos_info.m_disp_win_call_status);
     cos_rs.GetBoolByName("acd_call_window", m_cos_info.m_disp_win_acd_call);
     cos_rs.GetBoolByName("calls_log_window", m_cos_info.m_disp_win_calls_log);
     cos_rs.GetBoolByName("setup_window", m_cos_info.m_disp_win_setup);
     cos_rs.GetBoolByName("telephony_window", m_cos_info.m_disp_win_telephony);
     cos_rs.GetBoolByName("agentboard_window", m_cos_info.m_disp_win_agentboard);
     cos_rs.GetBoolByName("chat_tree_window", m_cos_info.m_disp_win_chat_tree);
     cos_rs.GetBoolByName("enable_dde4outgoing", m_cos_info.m_enable_dde_for_outgoing);
     m_CosStr = "";
     char cos_str[200];
     sprintf(&cos_str[0], "%s|%d|%d|%d|%d|%d|%d|%d|%d|%d|%d|%d|%d|",
             m_cos_name,
             m_cos_info.m_acd_pickup_from_queue,
             m_cos_info.m_acd_specific_login,
             m_cos_info.m_disp_change_toolbar_layout,
             m_cos_info.m_disp_change_windows_layout,
             m_cos_info.m_disp_win_call_status,
             m_cos_info.m_disp_win_acd_call,
             m_cos_info.m_disp_win_calls_log,
             m_cos_info.m_disp_win_setup,
             m_cos_info.m_disp_win_telephony,
             m_cos_info.m_disp_win_agentboard,
             m_cos_info.m_disp_win_chat_tree,
             m_cos_info.m_enable_dde_for_outgoing);
     m_CosStr = &cos_str[0];
   }

   ClassOfService_s  GetCOSInfo() { return m_cos_info; }

   // avoid assignment operator

   Ulong_t           m_cos_id;
   char              m_cos_name[NAME_LENGTH];
   ClassOfService_s  m_cos_info;
   string            m_CosStr;

}; // class COS_c

typedef std::map<Ulong_t, COS_c *>  COS_MAP;
typedef COS_MAP::iterator           COS_MAP_IT;


//===================[ Srvss_c ]=======================
class Srvss_c
{
public:
  Srvss_c()
  {
    m_SrvId = -1;
    m_SrvName[0] = 0;
  }
  Ulong_t   m_SrvId;
  char      m_SrvName[NAME_SIZEX + 1];
};

typedef std::map<Ulong_t,Srvss_c> SRV_MAP;
typedef SRV_MAP::iterator         SRV_MAP_IT;


//
class Diallist_c
{
public:
  Diallist_c()
  {
    m_DlId = -1;
    m_DlName = "";
  }
  Ulong_t   m_DlId;
  string    m_DlName;
};

typedef std::map<string,Diallist_c> DL_MAP;
typedef DL_MAP::iterator DL_MAP_IT;


//
//SELECT group_id, g_name  FROM `grp`;
//===================[ Groups_c ]=======================
class Groups_c
{
public:
  Groups_c()
  {
    m_GrpId = -1;
    memset(&m_GrpName[0], 0, NAME_SIZEX);
    memset(&m_GrpNumber[0], 0, 11);
    m_on = false;
  }
  Ulong_t     m_GrpId;
  char        m_GrpNumber[12];
  char        m_GrpName[NAME_SIZEX + 1];
  bool        m_on;
};

typedef std::map<Ulong_t,Groups_c> GRP_MAP;
typedef GRP_MAP::iterator GRP_MAP_IT;


//===================[ Cp_c ]=======================
class Cp_c
{
public:
  Cp_c()
  {
    m_CPId = -1;
    m_CPName = "";
  }
  Ulong_t   m_CPId;
  string    m_CPName;
};

typedef std::map<Ulong_t,Cp_c>  CP_MAP;
typedef CP_MAP::iterator        CP_MAP_IT;


//===================[ WrapUpCodes_c ]=======================
class WrapUpCodes_c
{
public:
  WrapUpCodes_c()
  {
    m_WUId = -1;
    m_WUName[0] = 0;
  }
  Ulong_t   m_WUId;
  char      m_WUName[NAME_SIZEX + 1];
};

typedef std::map<Ulong_t,WrapUpCodes_c> WU_MAP;
typedef WU_MAP::iterator                WU_MAP_IT;


//===================[ ReleaseCodes_c ]=======================
class ReleaseCodes_c
{
public:
  ReleaseCodes_c()
  {
    m_RCId = -1;
    m_RCName[0] = 0;
  }
  Ulong_t   m_RCId;
  char      m_RCName[NAME_SIZEX + 1];
};

typedef std::map<Ulong_t,ReleaseCodes_c> RC_MAP;
typedef RC_MAP::iterator                 RC_MAP_IT;


//===================[ LNG_c ]=======================
class LNG_c
{
public:
  LNG_c()
  {
    m_LngId = -1;
    m_LngName[0] = 0;
  }
  Ulong_t   m_LngId;
  char      m_LngName[NAME_SIZEX + 1];
};

typedef std::map<Ulong_t, LNG_c> LNG_MAP;
typedef LNG_MAP::iterator        LNG_MAP_IT;

//===================[ LNG_c ]=======================
class Connection_c
{
public:
  Connection_c()
  {
    m_Id = -1;
    m_name[0] = 0;
    m_dsn[0] = 0;
    m_login_pwd[0] = 0;
    m_login_name[0] = 0;
    m_timeout = 10;
    m_drv_type = -1;
    m_ws_server[0] = 0;
  }

  Ulong_t   m_Id;
  char      m_dsn[65];
  char      m_name[65];
  char      m_login_pwd[65];
  char      m_login_name[65];
  Ulong_t   m_timeout;
  Ulong_t   m_drv_type;
  char      m_ws_server[512];
};

typedef std::map<Ulong_t, Connection_c *> CONN_MAP;
typedef CONN_MAP::iterator                CONN_MAP_IT;


/*==========================[ Defines ]==================================*/
#define REGISTER_RETRY    5000

_USING_BSW

//==========================[ Constants & Macros ]====================

//==========================[ Types and Data structures ]=============



//==========================[ Classes ]===============================

/*
======================================================================
  Class Name: AccapiTimer_c

  Description:

  Author: Eli Shmueli

======================================================================
*/

class AccapiTimer_c : public BswTimer_c
{
public:
  AccapiTimer_c();
  AccapiTimer_c(Ushort_t type);
  void InitPtr();

  void OnTimer();
  bool IsOn() {
    return isTicking;
  }

  void setTicking(bool ticking) {
    isTicking = ticking;
  }

  enum {
    CONNECT_AGAIN,
    CONNECTED
  };
public:
  GenCrmType_c* m_CrmObject;
  //SendFormat_t  m_send_format;

private:
  Ushort_t m_type;
  bool isTicking;
};

#endif

