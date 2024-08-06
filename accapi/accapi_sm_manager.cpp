// AccapiSmManager_c.cpp: implementation of the AccapiSmManager_c class.
//
//////////////////////////////////////////////////////////////////////
#include <er_std_override.h>
#include "accapi_crm_types.h"
#include "accapi_work_thread.h"
#include "base64.h"
#include "accapi_timer.h"
#include "accapi_CEMax.h"
extern AGENTINFO_MAP agents_db;
void my_sleep(int sec);

extern "C" {
  #include <sgen.h>
}



#ifdef _DEBUG
#undef THIS_FILE
static char THIS_FILE[]=__FILE__;
#define new DEBUG_NEW
#endif

#include "proj_gen.h"
#include "accapi_sm_manager.h"
#include "accapi_sea_reply.h"
CEMax *getCemaxObj();

static Ulong_t SuSupInstanceIsUpCounter = 0;
static Ulong_t silent_logon_retry_counter = 0;

void accapi_my_print(int level,const char* fmt, ...);

BswLog_c& GetLog()
{
  static BswLog_c glog( BswMakeLogSite(FC_AWA,1) );
  if(!glog.IsProxyValid())
    glog.RecreateProxy();
  return glog;
} 
//////////////////////////////////////////////////////////////////////
// Construction/Destruction
//////////////////////////////////////////////////////////////////////
// default log for the Etas

/*----------------------------------[ AccapiSmManager_c::~AccapiSmManager_c ]----------------------------------------*/
AccapiSmManager_c::~AccapiSmManager_c()
{
  DestroyProxy();
  if (m_reply_obj)
    delete m_reply_obj;
}

AccapiSmManager_c::AccapiSmManager_c(AccapiWorkThread_c *SWT)
{
  m_SbcWorkThread = SWT;
  m_reply_obj = NULL;
  m_proxy_obj = NULL;
}


/*----------------------------------[ AccapiSmManager_c::ReConfirmEtas ]-------*/
// after disconnecting from server, we should confirm the etas again
//----------------------------------------------------------------------------
bool AccapiSmManager_c::ReConfirmEtas()
{
  // Destroy the current proxy
  DestroyProxy();

  //return ConfirmSSO();
  return true;
}


/*----------------------------------[ AccapiSmManager_c::CreateProxy ]--------------------------------------*/
//  Create the proxy to SM (destroy old proxy if exists)
//----------------------------------------------------------------------------
RetCode_t AccapiSmManager_c::CreateProxy(bool sso)
{
  int             not_expected_reply = BswMakeRc( BSW_SEV_ERROR, BSW_FAC_EVE, 0 );
  int             loop_CreateProxy = 0;
  RetCode_t       rc = BSWIPC_RC_TIMEOUT;
  BswServiceId_t  sid = BswMakeServiceID(FC_SM,1);

  GetLog()(LOGL_INFO) << "AccapiSmManager_c::CreateProxy() invoked (sso " << sso << ")\n" << LOG_TERMINATOR;

  //MN1002476 Doron G. 12-07-2009

  if(m_proxy_obj)
    DestroyProxy();

  if(m_reply_obj){
    delete m_reply_obj;
    m_reply_obj = NULL;
  }

  if(!m_proxy_obj)
  {
    rc = BswCreateProxy( sid, NULL, 0, (BswService_c*&)m_proxy_obj );

    if( rc == BSWRC_OK && m_proxy_obj )
    {
      SuSupInstanceIsUpCounter = 0;
      silent_logon_retry_counter = 0;
      //
      GetLog()(LOGL_INFO) << "AccapiSmManager_c::CreateProxy  Success " << LOG_TERMINATOR;
      accapi_my_print(0, "AccapiSmManager_c::CreateProxy Success\n");
      //

      m_reply_obj = new AccapiSmReply_c;
      m_reply_obj->m_SbcWorkThread = m_SbcWorkThread;
      rc = m_proxy_obj->RegisterWebAgentMngr(m_reply_obj, "ACC_WEB_AGENT");
      if (rc != BSWRC_OK)
      {
        //
        GetLog()(LOGL_INFO) << "RegisterWebAgentMngr  Failed " << LOG_TERMINATOR;
        accapi_my_print(0, "RegisterWebAgentMngr  Failed\n");
        //
        return rc;
      }

      GetLog()(LOGL_INFO) << "RegisterWebAgentMngr  Success " << LOG_TERMINATOR;
      accapi_my_print(0, "RegisterWebAgentMngr  Success\n");

      if (sso)
      {
      }
      else
      {
        //GetLog()(LOGL_INFO) << "proxy->ConfirmETAS: Sending login info to SM"
          //                  << LOG_TERMINATOR;
      }
      //Show the sending login info dialog only if it is not silent agent
    }//end if( rc == BSWRC_OK && m_proxy_obj )
  }

  if (rc != BSWRC_OK) {
    GetLog()(LOGL_ERROR) << "Fail creating SM Proxy: rc=" << rc << LOG_TERMINATOR;
  }
  else
    GetLog()(LOGL_INFO) << "Create SM Proxy OK" << LOG_TERMINATOR;

  return rc;
}


AgentDbInfo_c *AGENTINFOfindByAgenNumber(string agent_no);

/*----------------------------------[ -------------------------------- ]----------------------------------------*/
RetCode_t AccapiSmManager_c::WebAgentLoggedOff(Ulong_t   client_id,
                                               string    agent_number,
                                               string    webagent_session_id,
                                               string    ext)
{
  AgentDbInfo_c* ADI = AGENTINFOfindByAgenNumber(agent_number);

  if (ADI == NULL)
  {
    accapi_my_print(0, "AccapiSmManager_c::WebAgentLoggedOff AgentDbInfo_c NOT Found: %s\n", agent_number.c_str());
    GetLog()(LOGL_INFO) << "AccapiSmManager_c::WebAgentLoggedOff AgentDbInfo_c NOT Found: " << agent_number.c_str() << LOG_TERMINATOR;
    return BSWRC_FAIL;
  }

  m_proxy_obj->WebAgentLoggedOff(ADI->m_SmClientId, agent_number, ADI->m_SessionId, (char*)ext.c_str());


  m_SbcWorkThread->m_sea_reply.RemoveDeviceMonitor(m_SbcWorkThread->m_sea_reply.GetRequestId(), ext, 0);
  m_SbcWorkThread->m_sea_reply.RemoveFromAgents_device_Map(ADI->m_Extenstion);

  accapi_my_print(0, "--- AccapiSmManager_c::WebAgentLoggedOff , agent no: %s\n", agent_number.c_str());
  GetLog()(LOGL_INFO) << "AccapiSmManager_c::WebAgentLoggedOff, agent: " << agent_number.c_str() << LOG_TERMINATOR;

  ADI->m_allready_confirmed = false;
  //
  CEMax* cemax = getCemaxObj();
  if (cemax != NULL) {
    cemax->SendAgentLogOff(&ADI->m_Number[0]);
  }
  //


  return BSWRC_OK;
}

/*----------------------------------[ AccapiSmManager_c::DestroyProxy ]--------------------------------------*/
// Destroy the SM proxy
//----------------------------------------------------------------------------
void AccapiSmManager_c::DestroyProxy()
{  
  if (m_proxy_obj)
  {
    BswServiceId_t sid = BswMakeServiceID( FC_SM, 1 );
    //if (m_confirmed_and_connected)
    BswDestroyProxy( sid, (BswService_c*&)m_proxy_obj );
    m_proxy_obj = NULL;


  }
}

/*----------------------------------[ AccapiSmManager_c::ETASConfirmed ]----------------------------------------*/
RetCode_t AccapiSmReply_c::ETASConfirmed (Ulong_t client_Id, Ulong_t agent_Id, char * agent_Name, time_t server_time )
{ 
  RetCode_t   rc = BSWRC_OK;

  //sm_mgr.EtasConfirmed( client_Id, agent_Id, agent_Name);
  
  return BSWRC_OK;
}

/*----------------------------------[ AccapiSmReply_c::AccapiSmReply_c ]----------------------------------------*/
AccapiSmReply_c::AccapiSmReply_c()
{
}

/*----------------------------------[ AccapiSmReply_c::ETASDenied ]----------------------------------------*/
RetCode_t AccapiSmReply_c::ETASDenied(Ushort_t cause, Ulong_t client_Id, char * used_by_agent, Byte_t method_no)
{
  return BSWRC_OK;
}

/*----------------------------------[ AccapiSmReply_c::ClientDown ]------------------------------------------*/
RetCode_t AccapiSmReply_c::ClientDown(Ulong_t client_Id)
{ 
  GetLog()(LOGL_DETAILED) << "AccapiSmReply_c::ClientDown() invoked \n" 
                          << LOG_TERMINATOR;
  
  return BSWRC_OK;
}
/*----------------------------------[ AccapiSmReply_c::AreYouAlive ]-----------------------------------------*/
RetCode_t AccapiSmReply_c::AreYouAlive(Ulong_t client_Id)
{
  GetLog()(LOGL_DETAILED) << "AccapiSmReply_c::AreYouAlive() invoked \n" << LOG_TERMINATOR;
  
  return BSWRC_OK;
}

/*----------------------------------[ AccapiSmReply_c::AreYouAlive ]-----------------------------------------*/
RetCode_t AccapiSmReply_c::VisorConfirmed(Ulong_t client_id, Ulong_t visor_id, void *user_info)
{ 
  GetLog()(LOGL_DETAILED) << "AccapiSmReply_c::VisorConfirmed() invoked \n" 
                          << LOG_TERMINATOR;
  
  return BSWRC_OK;
}

/*----------------------------------[ AccapiSmReply_c::AreYouAlive ]-----------------------------------------*/
RetCode_t AccapiSmReply_c::VisorDenied(Ushort_t cause, Ulong_t client_id, Byte_t method_no, char * version)
{
  GetLog()(LOGL_DETAILED) << "AccapiSmReply_c::VisorDenied() invoked \n" 
                          << LOG_TERMINATOR;
  
  return BSWRC_OK;
}

int  AccapiSmReply_c::AgentSSOConfirmed(unsigned int,unsigned int,char *,char *,char *,char *,long)
{
	return 0;
}
int  AccapiSmReply_c::SSODisabled(void)
{
	 accapi_my_print(0,"AccapiSmReply_c::SSODisabled(),  Set SSO: false\n");
	//m_SbcWorkThread->m_IsSSO = false;
	return 0;
}
AccapiSmReply_c::~AccapiSmReply_c(void)
 {
 }
/*----------------------------------[ AccapiSmManager_c::AgentSSOConfirmed ]----------------------------------------*/

/*----------------------------------[ AccapiSmReply_c::AgentSSODenied ]----------------------------------------*/
RetCode_t AccapiSmReply_c::AgentSSODenied(Ushort_t cause, Ulong_t client_Id, char * used_by_agent)
{
  GetLog()(LOGL_INFO) << "AccapiSmReply_c::AgentSSODenied() invoked \n" 
                          << LOG_TERMINATOR;
  
  //MN1002741, MN1002753 Doron G.21-09-2009
  
  return BSWRC_OK;
}
AgentDbInfo_c *AGENTINFOfind(Ulong_t agent_id);
void accapi_my_print(int level,const char* fmt, ...);
string getClassOfServiceById(Ulong_t cosid);


/*----------------------------------[ AccapiSmReply_c::WebAgentConfirmed ]-------------------*/
int Split(char *source, std::vector<string> &dest ,char *search);
void GetAgentGroups(AgentDbInfo_c *ADI);
RetCode_t AccapiSmReply_c::WebAgentConfirmed(Ulong_t client_Id,
                                        Ulong_t agent_Id,
                                        char *  agent_number,
                                        char *  agent_name)
{
  RetCode_t rc = BSWRC_OK;
  if (memcmp(agent_number, "SSO,", 4) == 0)
  {
    vector<string> v;
    Split(agent_number, v, (char*)",");
    return WebAgentSSOConfirmed(client_Id, agent_Id, (char*)v[1].c_str(), (char*)v[2].c_str(), agent_name, 0);
  }

  accapi_my_print(0, "AccapiSmReply_c::WebAgentConfirmed agent no: %s\n", agent_number);
  GetLog()(LOGL_INFO) << "AccapiSmReply_c::WebAgentConfirmed  agent: " << agent_number << ")\n" << LOG_TERMINATOR;


  AgentDbInfo_c* ADI = AGENTINFOfind(agent_Id);
  if (ADI == NULL)
  {
    accapi_my_print(0, "--- AccapiSmReply_c::WebAgentConfirmed Failed: agent no: %s\n", agent_number);
    return BSWRC_FAIL;
  }
  ADI->m_SmClientId = client_Id;

  //
  bool b = m_SbcWorkThread->m_sea_reply.RemoveInsertToAgents_device_Map(ADI->m_Extenstion, ADI->m_Agent_id);
  // b = false device already monitor on this agent
  if (b == true) {
    rc = m_SbcWorkThread->m_sea_reply.AddDeviceMonitor(m_SbcWorkThread->m_sea_reply.GetRequestId(), ADI->m_Extenstion, ADI->m_Number);
  }
  GetAgentGroups(ADI);

  REPORT report;
  report.m_Action = "logon";
  report.m_Code2 = ADI->m_Sup;
  report.m_Code1 = 0; // came from confirm
  report.m_MoreDetail = ADI->m_primary_groups;
  Base64::Encode(&ADI->m_Pass[0], &report.m_LastRedirectDevId);
  //
  report.m_DetailedAction = getClassOfServiceById(ADI->m_Cos_Id);
  accapi_my_print(0, "AccapiSmReply_c::WebAgentConfirmed COsStr: %s\n", report.m_DetailedAction.c_str());
  report.m_CallingCalledDevId = ADI->m_Extenstion;
  report.m_Code1 = 0;
  Base64::Encode(&ADI->m_Name[0], &report.m_JoiningCalledDevId);
  m_SbcWorkThread->m_sea_reply.UpdateAgentDbInfo(agent_number, AccapiCrmType_c::Login, report);
  ADI->m_allready_confirmed = true;
  m_SbcWorkThread->SendAllLists(ADI, true);
  //
  CEMax* cemax = getCemaxObj();
  if (cemax != NULL) {
    cemax->SendAgentLogon(&ADI->m_Number[0]);
  }
  m_SbcWorkThread->m_sea_reply.CheckActivateAsyncHook("OnLogOn", "", NULL, report, ADI);
  //


  return BSWRC_OK;
}

void PrepareDeniedDetails(Ushort_t cause,AgentDbInfo_c *ADI,string ext, REPORT &report);
/*----------------------------------[ AccapiSmReply_c::WebAgentDenied ]----------------------------------------*/
RetCode_t AccapiSmReply_c::WebAgentDenied(Ushort_t cause,
                                          Ulong_t  agent_Id,
                                          char *   agent_number,
                                          char *   ext,
                                          char *   agent_session_id)
{
  AgentDbInfo_c* ADI = AGENTINFOfind(agent_Id);
  if (ADI == NULL)
  {
    accapi_my_print(0, "AccapiSmReply_c::WebAgentDenied Failed: agent no: %s, extension: %s, cause: %d\n", agent_number, ext, cause);
    GetLog()(LOGL_INFO) << "AccapiSmReply_c::WebAgentDenied Failed to find agent, cause: " << ext << " agent: " << agent_number << ")\n" << LOG_TERMINATOR;
    return BSWRC_FAIL;
  }
  //
  vector<string> v;
  Split(agent_session_id, v, (char*)":");
  int client_id = -1;
  char* session = agent_session_id;
  if (v.size() == 2)
  {
    client_id = atoi(v[0].c_str());
    session = (char*)v[1].c_str();
  }

  REPORT report;
  GetLog()(LOGL_INFO) << "AccapiSmReply_c::WebAgentDenied , cause: " << cause << " agent: " << agent_number << ")\n" << LOG_TERMINATOR;
  if (ADI->m_Extenstion != ext)
  {
    accapi_my_print(0, "AccapiSmReply_c::WebAgentDenied() , cause: %d, agent no: %s, ext: %s / %s, session: %s, client_id: %d\n", cause, agent_number, ext, ADI->m_Extenstion.c_str(), agent_session_id, client_id);
  }
  else
  {
    accapi_my_print(0, "AccapiSmReply_c::WebAgentDenied() , cause: %d, agent no: %s, ext: %s , session: %s, client_id: %d\n", cause, agent_number, ext, agent_session_id, client_id);
  }

  if (cause != 9 && cause != 11) //   EXTENSION_IS_ALREADY_IN_USE_BY_AGENT, AGENT_ALREADY_LOGGED_AT_LRL,

  {
    m_SbcWorkThread->m_sea_reply.RemoveDeviceMonitor(m_SbcWorkThread->m_sea_reply.GetRequestId(), ext, 0);
    m_SbcWorkThread->m_sea_reply.RemoveFromAgents_device_Map(ext);
  }
  else // same agt/ext
  {
    accapi_my_print(0, "AccapiSmReply_c::WebAgentDenied() , cause: %d, agent no: %s, ext: %s , session: %s, same egt/ext, keep device monitor\n", cause, agent_number, ext, agent_session_id);
  }
  report.m_Action = "agentDenied";
  report.m_Code1 = cause;
  report.m_CallingCalledDevId = ADI->m_Extenstion;
  report.m_JoiningCalledDevId = ext;
  //ADI->m_allready_confirmed = false;

  //
  PrepareDeniedDetails(cause, ADI, ext, report);

  //
  m_SbcWorkThread->m_sea_reply.UpdateAgentDbInfo(agent_number, AccapiCrmType_c::Login, report, client_id, session);
  bool b = m_SbcWorkThread->m_sea_reply.CheckActivateAsyncHook("OnDenied", "", NULL, report, ADI);

  my_sleep(250);
  // was not in login - just denied

  // zero old vars
  return BSWRC_OK;
}

/*----------------------------------[ AccapiSmReply_c::WebAgentSSOConfirmed ]----------------------------------------*/
 RetCode_t AccapiSmReply_c::WebAgentSSOConfirmed(Ulong_t client_Id,
                                                 Ulong_t agent_Id,
                                                 char *  a_name,
                                                 char *  a_number,
                                                 char *  a_default_alias,
                                                 //char *  authenticated_server, Not Required
                                                 time_t  time)
 {
   RetCode_t rc = BSWRC_OK;

   accapi_my_print(0, "AccapiSmReply_c::WebAgentSSOConfirmed agent no: %s\n", a_number);
   GetLog()(LOGL_INFO) << "AccapiSmReply_c::WebAgentSSOConfirmed  agent: " << a_number << ")\n" << LOG_TERMINATOR;


   AgentDbInfo_c* ADI = AGENTINFOfind(agent_Id);
   if (ADI == NULL)
   {
     accapi_my_print(0, "--- AccapiSmReply_c::WebAgentSSOConfirmed Failed: agent no: %s\n", a_number);
     return BSWRC_FAIL;
   }
   ADI->m_SmClientId = client_Id;
   ADI->m_Extenstion = a_default_alias;
   //
   bool b = m_SbcWorkThread->m_sea_reply.RemoveInsertToAgents_device_Map(ADI->m_Extenstion, ADI->m_Agent_id);
   // b = false device already monitor on this agent
   if (b == true) {
     rc = m_SbcWorkThread->m_sea_reply.AddDeviceMonitor(m_SbcWorkThread->m_sea_reply.GetRequestId(), ADI->m_Extenstion, ADI->m_Number);
   }
   GetAgentGroups(ADI);

   REPORT report;
   report.m_Action = "logon";
   report.m_Code1 = 0; // came from confirm
   report.m_MoreDetail = ADI->m_primary_groups;
   //
   report.m_DetailedAction = getClassOfServiceById(ADI->m_Cos_Id);
   accapi_my_print(0, "AccapiSmReply_c::WebAgentSSOConfirmed COsStr: %s\n", report.m_DetailedAction.c_str());
   report.m_CallingCalledDevId = ADI->m_Extenstion;
   report.m_Code1 = 0;
   report.m_Code2 = ADI->m_Sup;
   m_SbcWorkThread->m_sea_reply.UpdateAgentDbInfo(a_number, AccapiCrmType_c::Login, report);
   //ADI->m_allready_confirmed = true;

   accapi_my_print(0, "--- AccapiSmReply_c::WebAgentSSOConfirmed Confirmed: agent no: %s,primary groups: %s, sup: %d\n", a_number, ADI->m_primary_groups.c_str(), ADI->m_Sup);
   m_SbcWorkThread->SendAllLists(ADI, true);
   CEMax* cemax = getCemaxObj();
   if (cemax != NULL) {
     cemax->SendAgentLogon(&ADI->m_Number[0]);
   }
   m_SbcWorkThread->m_sea_reply.CheckActivateAsyncHook("OnLogOn", "", NULL, report, ADI);
   return BSWRC_OK;
 }
 /*----------------------------------[ AccapiSmReply_c::WebAgentDenied ]----------------------------------------*/
 RetCode_t AccapiSmReply_c::WebAgentSSODenied(Ushort_t cause,
                                              Ulong_t  agent_Id,
                                              char *   agent_number,
                                              char *   ext,
                                              char *   used_by_agent,
                                              char *   session_id)
{
   AgentDbInfo_c* ADI = AGENTINFOfind(agent_Id);
   if (ADI == NULL)
   {
     accapi_my_print(0, "AccapiSmReply_c::WebAgentSSODenied Failed: agent no: %s, cause: %s\n", agent_number, used_by_agent);
     GetLog()(LOGL_INFO) << "AccapiSmReply_c::WebAgentSSODenied Failed to find agent, cause: " << used_by_agent << " agent: " << agent_number << ")\n" << LOG_TERMINATOR;
     return BSWRC_FAIL;
   }
   accapi_my_print(0, "--- AccapiSmReply_c::WebAgentSSODenied , cause: %s, agent no: %s, name: %s\n", used_by_agent, agent_number, ADI->m_Name);
   GetLog()(LOGL_INFO) << "AccapiSmReply_c::WebAgentSSODenied , cause: " << used_by_agent << " agent: " << ADI->m_Name << LOG_TERMINATOR;

   return WebAgentDenied(cause, agent_Id, agent_number, ext, session_id);
}




