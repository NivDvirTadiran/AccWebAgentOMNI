//
// PROJECT & ID  : ACCAPI Solutions
// FILE NAME     : accapi_sea_reply.h
// AUTHOR        : Shahar Sperling
// CREATION DATE : 23-Apr-2007
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


//==========================[ Interface Dependencies ]================


#ifndef ACCAPI_SEA_REPLY_H
#define ACCAPI_SEA_REPLY_H

#include <er_map.h>
#include <sea_ipreply.h>
#include <svc_reply_code.h>
#include "accapi_crm_types.h"
#include "accapi_timer.h"
//#include "sbc_socket.h"

_USING_BSW

//==========================[ Constants & Macros ]====================

//==========================[ Types and Data structures ]=============
static CpFieldMgr_c& cp_mngr = CpFieldMgr_c::GetCpFieldMgr();

//==========================[ Classes ]===============================

/*
======================================================================
  Class Name: SbcSeaReply_c

  Description:

  Author: Shahar Sperling

======================================================================
*/


struct AgentInfo_s
{
  Ulong_t        agent_id;
  ErDevId_t      device_id;
  ErMonitorId_t  monitor_id;
};

class AccapiSeaReply_c : public ISeaPreply_c
{

//============================ Public Section ========================
public:

  AccapiSeaReply_c(){
    m_request_id = 0;
    all_agents_monitor_id = 0;
  }
  ~AccapiSeaReply_c();
  enum {
    NULL_ACK,
    REGISTER_ACK,
    MONITOR_DEV_ACK,
    MONITOR_ALL_AGENT_ACK,
    NUM_ACKS,
  };
  RetCode_t Init(void);
  void SetOperational(string appName);
  void Terminate();

  RetCode_t RegisterAck(Bool_t  success);
  ErRequestId_t GetRequestId();
  void SeaRegisterAck(Ushort_t ack_type, bool success, ErMonitorId_t monitor_id = 0);
  RetCode_t AddDeviceMonitorAck(ErRequestId_t     related_req_id,
                                ErDevId_t         device_id,
                                Bool_t            success,
                                ErMonitorId_t     monitor_id);

  RetCode_t AddAllAgentsMonitorAck(ErRequestId_t     er_req_id,
                                   Bool_t            success,
                                   ErMonitorId_t     monitor_id);

  RetCode_t AgentLogin(ErMonitorId_t&     monitor_id,
                       ErReportId_t&      report_id,
                       LrlAgentLogin2_c&  agent_login);

  RetCode_t AgentLogout(ErMonitorId_t&     monitor_id,
                        ErReportId_t&      report_id,
                        LrlAgentLogout2_c& agent_logout);

  RetCode_t AddDeviceMonitor(Ulong_t    request_id,
                             ErDevId_t  dev_id,
                             ErDevId_t agent_number,
                             Bool_t     rr_device = false,
                             Bool_t     agent_device = true);

  RetCode_t RemoveDeviceMonitor(Ulong_t       request_id,
                                ErDevId_t     dev_id,
                                ErMonitorId_t monitor_id);

  RetCode_t Delivered(ErMonitorId_t&       monitor_id,
                      ErReportId_t&        report_id,
                      BccDelivered_c&      delivered,
                      ErConnStateVal_t&    local_conn_state_val,
                      ErDevId_t&           local_dev_id);

  RetCode_t Diverted(ErMonitorId_t&       monitor_id,
                     ErReportId_t&        report_id,
                     BccDiverted_c&       diverted,
                     ErConnStateVal_t&    local_conn_state_val,
                     ErDevId_t&           local_dev_id);

  RetCode_t Transferred(ErMonitorId_t&       monitor_id,
                        ErReportId_t&        report_id,
                        BccTransferred_c&    xfered,
                        ErConnStateVal_t&    local_conn_state_val,
                        ErDevId_t&           local_dev_id);

  RetCode_t Established(ErMonitorId_t&       monitor_id,
                        ErReportId_t&        report_id,
                        BccEstablished_c&    established,
                        ErConnStateVal_t&    local_conn_state_val,
                        ErDevId_t&           local_dev_id);

  RetCode_t CallCleared(ErMonitorId_t&       monitor_id,
                        ErReportId_t&        report_id,
                        BccCallCleared_c&    call_cleared,
                        ErConnStateVal_t&    local_conn_state_val,
                        ErDevId_t&           local_dev_id);

  RetCode_t ConnCleared(ErMonitorId_t&       monitor_id,
                        ErReportId_t&        report_id,
                        BccConnCleared_c&    conn_cleared,
                        ErConnStateVal_t&    local_conn_state_val,
                        ErDevId_t&           local_dev_id);

  RetCode_t ServiceInitiated(ErMonitorId_t&         monitor_id,
                             ErReportId_t&          report_id,
                             BccServiceInitiated_c& service_initiated,
                             ErConnStateVal_t&      local_conn_state_val,
                             ErDevId_t&             local_dev_id);

  bool CheckActivateAsyncHook(string event,ErDevId_t devId, CallProfile_c*cp, REPORT& report, AgentDbInfo_c* ADI=NULL, string groupx="");

  bool RemoveInsertToAgents_device_Map(ErDevId_t device_id,Ulong_t agent_id);
  bool RemoveFromAgents_device_Map(ErDevId_t device_id);




  // SOLSOL==================================================

  AgentDbInfo_c* GetAgentObjByDevId(ErDevId_t dev_id);

  RetCode_t AgentRelease(ErMonitorId_t& monitor_id, ErReportId_t& report_id, LrlAgentRelease2_c& agent_release);

  RetCode_t AgentResume(ErMonitorId_t& monitor_id, ErReportId_t& report_id, LrlAgentResume2_c& agent_resume);

  RetCode_t UpdateAgentMode(ErMonitorId_t& monitor_id, ErReportId_t& report_id, LrlUpdateAgentMode2_c& agent_mode); //for wrap-up, exit wrap-up

  RetCode_t Held(ErMonitorId_t&     monitor_id,
                 ErReportId_t&      report_id,
                 BccHeld_c&         held,
                 ErConnStateVal_t&  local_conn_state_val,
                 ErDevId_t&         local_dev_id);

  RetCode_t Retrieved(ErMonitorId_t&       monitor_id,
                      ErReportId_t&        report_id,
                      BccRetrieved_c&      retrieved,
                      ErConnStateVal_t&    local_conn_state_val,
                      ErDevId_t&           local_dev_id);

  RetCode_t Conferenced(ErMonitorId_t&       monitor_id,
                        ErReportId_t&        report_id,
                        BccConferenced_c&    conferenced,
                        ErConnStateVal_t&    local_conn_state_val,
                        ErDevId_t&           local_dev_id);
  RetCode_t AgentAtStation(ErMonitorId_t&              monitor_id,
                            ErReportId_t&               report_id,
                            LrlAgentAtStationInfo2_c&   agent_at_station_info);

  RetCode_t AgentNoLongerAtStation(ErMonitorId_t&              monitor_id,
                                   ErReportId_t&               report_id,
                                   LrlAgentNoLongerAtStationInfo2_c& agent_no_longer_at_station_info);


  RetCode_t Failed(ErMonitorId_t&       monitor_id,
                    ErReportId_t&        report_id,
                    BccFailed_c&         failed,
                    ErConnStateVal_t&    local_conn_state_val,
                    ErDevId_t&           local_dev_id);

  RetCode_t Originated(ErMonitorId_t&       monitor_id,
                        ErReportId_t&        report_id,
                        BccOriginated_c&     originated,
                        ErConnStateVal_t&    local_conn_state_val,
                        ErDevId_t&           local_dev_id);

  RetCode_t DeviceStatus(ErMonitorId_t        monitor_id,
                         ErReportId_t         report_id,
                         ErDevId_t            device_id,
                         ErDeviceStatus_t     device_status,
                         ErCause_t            cause,
                         ErPrivateData_s&     private_data);

  //SOLSOL for Rapid response 28.10.2013
  RetCode_t GroupQueueInfo(ErMonitorId_t&         monitor_id,
                           ErReportId_t&          report_id,
                           LrlGroupQueueInfo2_c&  group_queue_info);

  //SOLSOLX 2018
  RetCode_t GroupQueueCPInfo(ErMonitorId_t&           monitor_id,
                             ErReportId_t&            report_id,
                             LrlGroupQueueCPInfo2_c&  group_queue_info);

  //SOLSOLX PU 2018
  RetCode_t PickupCallReply(ErMonitorId_t&    monitor_id,
                            ErReportId_t&     report_id,
                            LrlPickupInfo2_c& lrlpickupinfo2);

  // general sea api action SOLSOLY 2019
  RetCode_t SeaGenActionReply(ErRequestId_t   request_id,
                              Ulong_t         action,
                              ErDevId_t       agent_number,
                              ErDevId_t       agent_ext,
                              std::string     more_parmas,
                              SvcReplyCode_t& reply_code);

  RetCode_t ForcedWrapup(ErMonitorId_t&              monitor_id,
                          ErReportId_t&               report_id,
                          LrlForcedWrapup2_c&         forced_wrapup);

  RetCode_t ConfirmOutboundCallRequest(ErMonitorId_t&                 monitor_id,
                                        ErReportId_t&                  report_id,
                                        LrlConfirmOutboundCallReq2_c&  lrl_confirm_outbound_call_req);

  RetCode_t AgentInfo(ErMonitorId_t &monitor_id, ErReportId_t &report_id, LrlAgentInfo2_c &agent_info);

  RetCode_t UpdateAgentDbInfo(ErDevId_t dev_id, int state, struct REPORT& report);
  RetCode_t UpdateAgentDbInfo(Ulong_t agent_id, int state, struct REPORT& report);
  RetCode_t UpdateAgentDbInfo(const char* agentId, int state, struct REPORT& report, int client_id = -1, string sessionid = "");
  RetCode_t CallRecording(ErMonitorId_t   monitor_id,
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
                          ErCause_t       cause);

  RetCode_t CallOmniMessage(ErMonitorId_t   monitor_id,
                            ErReportId_t    report_id,
                            ErCallId_t      call_id,
                            bool            status,
                            ErDevId_t       from,
                            ErDevId_t       to_agent,
                            ErDevId_t       message,
                            ErCause_t       cause);

  RetCode_t AgentLoginFailed(ErMonitorId_t&                monitor_id,
                               ErReportId_t&                report_id,
                               LrlAgentLoginFailedInfo2_c&  agent_login_failed_info);//add in 12/2019 SOLSOL 
//============================ Protected Section ========================
protected:
  //SbcSocket_c*                    m_sender;
  ErMonitorId_t                   all_agents_monitor_id;
  ErMap_c<string,string>          m_ringing_agents; // for force release event
  ErMap_c<Ulong_t,string>         calls_map; // for right cancelled event in transferred call
  ErMap_c<ErDevId_t,AgentInfo_s>  agents_devices_map; // for single step transferred event
  ErMap_c<ErCallId_t,ErDevId_t>   m_connected_agents; // for single step transferred event

//============================ Private Section ========================
private:
  ErRequestId_t           m_request_id;
}; // class SbcSeaReply_c


//===================================================[ http events ]==============================================
enum
{
    OnLogon = 0,
    OnLogoff = 1,
    OnLoggedIn = 2,
    OnLoggedOut = 3,
    OnReady = 4,
    OnReleased = 5,
    OnResumed = 6,
    OnWrapUp = 7,
    OnReserved = 8,
    OnSilentStarted = 9,
    OnDenied = 10,
    OnIncoming = 11,
    OnIncomingACD = 12,
    OnConnected = 13,
    OnConnectedACD = 14,
    OnHeld = 15,
    OnRetrieved = 16,
    OnConferenced = 17,
    OnCleared = 18,
    OnClearedACD = 19
};

struct opertaion
{
    string m_ActionStr;
    int    m_ActionCode;
};

//======================================================
static opertaion HTTPEVENTS[50] = {
    {"OnLogOn",         OnLogon},         //    =  0,
    {"OnLogoff",        OnLogoff},        //    =  1,
    {"OnLoggedIn",      OnLoggedIn},      //    =  2,
    {"OnLoggedOut",     OnLoggedOut},     //    =  3,
    {"OnReady",         OnReady},         //    =  4,
    {"OnReleased",      OnReleased},      //    =  5,
    {"OnResumed",       OnResumed},       //    =  6,
    {"OnWrapUp",        OnWrapUp},        //    =  7,
    {"OnReserved",      OnReserved},      //    =  8,
    {"OnSilentStarted", OnSilentStarted}, //    =  9
    {"OnDenied",        OnDenied},        //    = 10,
    {"OnIncoming",      OnIncoming},      //    = 11,
    {"OnIncomingACD",   OnIncomingACD},   //    = 12,
    {"OnConnected",     OnConnected},     //    = 13,
    {"OnConnectedACD",  OnConnectedACD},  //    = 14
    {"OnHeld",          OnHeld},          //    = 15,
    {"OnRetrieved",     OnRetrieved},     //    = 16,
    {"OnConferenced",   OnConferenced},   //    = 17,
    {"OnCleared",       OnCleared},       //    = 18,
    {"OnClearedACD",    OnClearedACD},    //    = 19
    {"ENDDD",           999},             //    = 999
};

class EntityFilter_c
{
public:
    int m_Type;
    string m_filter;
};

class Action_c
{
public:
    string m_Desc;
    vector<EntityFilter_c> m_FilterVec;
    string m_hookText;
};

class Event_c
{
public:
    int m_Type;
    vector<Action_c> m_ActionVec;
};

#endif
