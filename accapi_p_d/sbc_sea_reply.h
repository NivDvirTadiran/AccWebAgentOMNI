//
// PROJECT & ID  : SBC Solutions
// FILE NAME     : sbc_sea_reply.h
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


#ifndef SBC_SEA_REPLY_H
#define SBC_SEA_REPLY_H

#include <sea_ipreply.h>
#include "crmalltypes.h"
#include "sbc_timer.h"
#include <svc_reply_code.h>
//#include "sbc_socket.h"
#include <er_map.h>

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

class SbcSeaReply_c : public ISeaPreply_c
{

//============================ Public Section ========================
public:

  SbcSeaReply_c(){
    m_request_id = 0;
    all_agents_monitor_id = 0;
  }
  ~SbcSeaReply_c();
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
  RetCode_t ServiceInitiated(ErMonitorId_t&          monitor_id,
	  ErReportId_t&           report_id,
	  BccServiceInitiated_c&  service_initiated,
	  ErConnStateVal_t&       local_conn_state_val,
	  ErDevId_t&              local_dev_id);

  bool RemoveInsertToAgents_device_Map(ErDevId_t device_id,Ulong_t agent_id);
  bool RemoveFromAgents_device_Map(ErDevId_t device_id);




  // SOLSOL==================================================
    RetCode_t AgentRelease(ErMonitorId_t&  monitor_id, ErReportId_t& report_id, LrlAgentRelease2_c&  agent_release);

    RetCode_t AgentResume(ErMonitorId_t& monitor_id, ErReportId_t&       report_id, LrlAgentResume2_c&  agent_resume);

    RetCode_t UpdateAgentMode(ErMonitorId_t&  monitor_id, ErReportId_t&              report_id, LrlUpdateAgentMode2_c&     agent_mode); //for wrap-up, exit wrap-up

    RetCode_t Held(ErMonitorId_t&               monitor_id,
                           ErReportId_t&        report_id,
                           BccHeld_c&           held,
                           ErConnStateVal_t&    local_conn_state_val,
                           ErDevId_t&           local_dev_id);

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
									 
									 
    RetCode_t Failed(ErMonitorId_t&				  monitor_id,
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
	RetCode_t GroupQueueInfo(ErMonitorId_t&            monitor_id,  
                             ErReportId_t&             report_id,
	    					 LrlGroupQueueInfo2_c&     group_queue_info);

	//SOLSOLX 2018
	RetCode_t GroupQueueCPInfo(ErMonitorId_t&            monitor_id,  
                               ErReportId_t&             report_id,
							   LrlGroupQueueCPInfo2_c&     group_queue_info);

	//SOLSOLX PU 2018
	RetCode_t PickupCallReply(ErMonitorId_t&        monitor_id,
							  ErReportId_t&           report_id,
                              LrlPickupInfo2_c         &lrlpickupinfo2);


     RetCode_t AgentInfo(ErMonitorId_t &monitor_id, ErReportId_t &report_id, LrlAgentInfo2_c &agent_info);
	
	RetCode_t UpdateAgentDbInfo(ErDevId_t dev_id,int state, struct REPORT &report);
	RetCode_t UpdateAgentDbInfo(Ulong_t agent_id ,int state,struct REPORT &report);
	RetCode_t UpdateAgentDbInfo(const char *agentId, int state, struct REPORT &report,int client_id = -1,string sessionid = "");
//	RetCode_t UpdateAgentDbInfo(ErDevId_t dev_id,int state,string res_code);
//	RetCode_t UpdateAgentDbInfo(Ulong_t agent_id,int state,string res_code);
	RetCode_t CallRecording(ErMonitorId_t   monitor_id,
                                    ErReportId_t    report_id,
                                    ErDevId_t       device_id,
                                    ErConnId_t      recorded_conn_id,
                                    bool            status,
                                    ErName_t        URI,
                                    ErName_t        codec,
                                    ErName_t        format,
                                    ErName_t        sample_rate,
                                    ErName_t        type,
                                    ErCause_t       cause);


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


#endif
