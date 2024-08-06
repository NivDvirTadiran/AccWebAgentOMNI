// accapi_smmanager_c.h: interface for the AccapiSmManager_c class.
//
//////////////////////////////////////////////////////////////////////
#ifndef ACCAPI_SMMANAGER_C
#define ACCAPI_SMMANAGER_C

//#if !defined(AFX_ETASSMMANAGER_C_H__25583BD3_A4CD_11D3_AB80_0090276003C3__INCLUDED_)
//#define AFX_ETASSMMANAGER_C_H__25583BD3_A4CD_11D3_AB80_0090276003C3__INCLUDED_

#if _MSC_VER > 1000
#pragma once
#endif // _MSC_VER > 1000

#include <bswgen.h>
#include "sm_serviceiface.h"

//#include "..\..\er_ip_bridge\ip_mngr.h"
//#include "..\..\er_ip_bridge\http_monitor_socket.h"

enum{ADD,SUB};


#define SSO_SERVER_PORT 1455
#define SSO_SERVICE_NAME "ACC-SSO/ACCSERVER"


// forward declaration
class SbcWorkThread_c;

class AccapiSmMReply_c : public IsmServiceReply_c  
{
public:
  //ctor
  AccapiSmMReply_c();
  SbcWorkThread_c * m_SbcWorkThread;

  //dtor
  ~AccapiSmMReply_c();

  virtual RetCode_t ETASConfirmed (Ulong_t client_Id, Ulong_t agent_Id, char * agent_Name, time_t time ); 
  virtual RetCode_t ETASDenied(Ushort_t cause, Ulong_t client_Id, char * used_by_agent, Byte_t method_no); 
  virtual RetCode_t ETASIniCfg(Ulong_t client_Id, BswMemStream_c&  stream){ return BSWRC_OK; }
  //26-Jul-2017 YR BZ#44047
  virtual RetCode_t ClientSaveETASIniCfg(Ulong_t message_ref, Ulong_t server_message_ref, bool first, bool eof, char* line_buffer){return BSWRC_OK;}
  virtual RetCode_t ETASIniNewLine(Ulong_t client_Id, char * line_buffer, bool eof){return BSWRC_OK;}
  virtual RetCode_t ClientDown(Ulong_t client_Id);
  virtual RetCode_t AreYouAlive(Ulong_t client_Id);   
  virtual RetCode_t VisorConfirmed(Ulong_t client_id, Ulong_t visor_id, void *user_info);
  virtual RetCode_t VisorDenied(Ushort_t cause, Ulong_t client_id, Byte_t method_no, char* version); 

  virtual RetCode_t EtasCfgPersisted(Ulong_t client_id, Ulong_t nReason){return BSWRC_OK;}

  virtual RetCode_t AgentSSOConfirmed(Ulong_t client_Id, Ulong_t agent_Id, char * a_name, char * a_number, char *  a_default_alias, char *  authenticated_server, time_t  time);

  virtual RetCode_t AgentSSODenied(Ushort_t cause, Ulong_t  client_Id, char *  used_by_agent);

  virtual RetCode_t VisorSSOConfirmed(Ulong_t client_id, Ulong_t visor_id, void*   user_info){
    return BSWRC_FAIL;
  }

  virtual RetCode_t VisorSSODenied(Ushort_t cause, Ulong_t  client_Id, char*  version){
    return BSWRC_FAIL;
  }

  virtual RetCode_t WebAgentConfirmed(Ulong_t client_Id,
                                      Ulong_t agent_Id,
                                      char *  agent_number,
                                      char *  agent_name);

  virtual RetCode_t WebAgentDenied(Ushort_t cause,
                                   Ulong_t  agent_Id,
                                   char *   agent_number,
                                   char *   ext,
                                   char *   agent_session_id = (char*)"");

  RetCode_t WebAgentSSOConfirmed(Ulong_t client_Id,
                                 Ulong_t agent_Id,
                                 char *  a_name,
                                 char *  a_number,
                                 char *  a_default_alias,
                                 //char *  authenticated_server, Not Required
                                 time_t  time);
  RetCode_t WebAgentSSODenied(Ushort_t cause,
                              Ulong_t  agent_Id,
                              char *   agent_number,
                              char *   ext,
                              char *   used_by_agent,
							  char *   session_id);

  RetCode_t SSOStatus(bool sso_status){return BSWRC_OK;}

  virtual RetCode_t SSODisabled();

  RetCode_t WaitForINITimerExpire(Ulong_t client_id, Ulong_t agent_id, char * agent_name ); 


private:
  //26-Jul-2017 YR BZ#44047
  Ulong_t                           m_num_messages;
   bool                              m_wait_for_ini_timer_flag;

}; 
class AccapiSmManager_c  
{
public:
  //SbcWorkThread_c *m_SbcWorkThread;
  AccapiSmManager_c(SbcWorkThread_c *SWT);
  virtual ~AccapiSmManager_c();
  SbcWorkThread_c * m_SbcWorkThread;
  AccapiSmMReply_c m_AccapiSmMReply;
  IsmService_c*          m_proxy_obj;

  //
  bool    WebAgentConfirm(const string & agent_number, const string& agent_pwd,string extension);
  bool    ReConfirmEtas();
  bool    ConfirmSSO();
  RetCode_t RegisterWebAgentMngr(IsmServiceReply_c * reply_ptr,const char *description);


  RetCode_t CreateProxy(bool sso = false);
  void    DestroyProxy();
  //
  //time_t  m_shiftedTime;

  bool alreadyConfirmed(){ return m_allready_confirmed; }

  RetCode_t WebAgentLoggedOff(Ulong_t   client_id,
                              string    agent_number,
                              string    webagent_session_id,
							  string    ext);


protected:

private:
  time_t                 m_shiftedTime;
  Ushort_t               m_shiftedTimeSign;
  AccapiSmMReply_c*  m_reply_obj;
  Ulong_t                m_client_id;
  Ulong_t                m_agent_id;
  string               m_agent_name;
  string               m_agent_number;
  string               m_agent_password;
  //15-Apr-2018 YR BZ#46372
  Bool_t                 m_in_confirm_process;
  Bool_t                 m_allready_confirmed;
  Bool_t                 m_confirmed_and_connected;
  RetCode_t              m_still_alive;
 
  bool                   m_silent_activated;
  bool                   m_wait_for_cfg_persisted;

  //CEtasProgressDlg     * m_wait2serverDlg;
  //EtasCreateSmProxyTh_c  * m_wait2serverTh;

};

#endif // !defined(AFX_ETASSMMANAGER_C_H__25583BD3_A4CD_11D3_AB80_0090276003C3__INCLUDED_)
