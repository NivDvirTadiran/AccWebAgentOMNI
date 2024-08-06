//
// PROJECT & ID  : SBC Solutions
// FILE NAME     : sbc_sea_reply.cpp
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
#include "sbc_sea_reply.h"
#include <sea_provider.h>
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

void my_print(int level,const char* fmt, ...);

EosRetCode_t sendEventToP_S_Thread(const Ulong_t  opcode,Byte_t * const event_data,	Ushort_t event_data_len) 
{
	EosRetCode_t ret_val;
	EosEventHeader_t hdr;

	hdr.op_code = opcode;
	hdr.dest_que_id = AWA_Q3;
	hdr.reply_que_id = -1;
	hdr.data_len = event_data_len;

	my_print(0, "sendEventToCsi ==> send  %d  to AWA_Q3\n", opcode);
	//
	ret_val = EosCreateAndSendEvent(
			AWA_TH3,
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
bool IsACDCall(CallProfile_c& cp);
//================================[AddGroupsToReport]======================================
static void AddGroupsToReport(GroupInfo_t **groups,REPORT &report)
{
  //sea_log << "AddGroupsToReport() [" << report.m_Action.c_str() << "] - Num of Groups: " << report.m_Code1 << LOG_TERMINATOR;
  for (int j = 0; j < report.m_Code1;++j)
  {
    struct Groups g;
    g.m_primary = groups[j]->primary;
    g.m_grp_id =  groups[j]->grp_id;
    report.m_Groups.push_back(g);
  }
}
//================================[Init]======================================
RetCode_t SbcSeaReply_c::Init()
{
  RetCode_t rc = BSWRC_OK;
  //m_sender = sender_socket;
  rc = sea_provider.Init(this);
  my_print(0,"SbcSeaReply_c::Init\n");
  //20-May-2019 YR BZ#49760 - called from GetAllTables()
  //cp_mngr.InitCpFieldMgr();
  return rc;
}
//================================[~SbcSeaReply_c]======================================
SbcSeaReply_c::~SbcSeaReply_c()
{
  //BswLog_c sea_log_d(BswMakeLogSite(FC_CRM_IFACE,1),LM_INTER_CSCI, LOGL_INFO);
  if (all_agents_monitor_id != 0)
  {
    sea_provider.RemoveAllAgentsMonitor(GetRequestId(),all_agents_monitor_id);
    //sea_log_d << "SbcSeaReply_c::Terminate - RemoveAllAgentsMonitor" << LOG_TERMINATOR;
  }
  sea_provider.Unregister();//app_name);
}
//================================[~GetRequestId]======================================
ErRequestId_t SbcSeaReply_c::GetRequestId()
{
  m_request_id++;

  if (m_request_id == 0)
    m_request_id = 1;
  return m_request_id;
}
string APPNAME = "";
//================================[SetOperational]======================================
void SbcSeaReply_c::SetOperational(string appName)
{
	APPNAME = appName;
	RetCode_t rc = BSWRC_OK;
	app_name =  appName;
    rc = sea_provider.Unregister(app_name);
	rc = sea_provider.Register(app_name,FC_AWA,"FC_AWA");

	//rc = sea_provider.Register(app_name,FC_CRM_IFACE,"FC_CRM_IFACE");
	if (rc == BSWRC_OK)
	{
			sea_log << "SbcSea_provider.Register() [" << appName.c_str() << "]" << LOG_TERMINATOR;
	}
}
//================================[Terminate]======================================
void SbcSeaReply_c::Terminate()
{
  if (all_agents_monitor_id != 0)
  {
    sea_provider.RemoveAllAgentsMonitor(GetRequestId(),all_agents_monitor_id);
    sea_log << "SbcSeaReply_c::Terminate - RemoveAllAgentsMonitor"<< LOG_TERMINATOR;
  }
  sea_provider.Unregister();//app_name);
  sea_log << "SbcSeaReply_c::Unregister" << LOG_TERMINATOR;
}
//================================[RegisterAck]======================================
RetCode_t SbcSeaReply_c::RegisterAck(Bool_t  success)
{
  RetCode_t rc = BSWRC_OK;
  SeaRegisterAck(REGISTER_ACK,success);
  if (!success)
    return BSWRC_FAIL;
  return rc;
}
//================================[RemoveFromAgents_device_Map]=======================
bool SbcSeaReply_c::RemoveFromAgents_device_Map(ErDevId_t device_id)
{
    RetCode_t rc = BSWRC_OK;
	bool b = true;
	AgentInfo_s agent_info;
	rc = agents_devices_map.Remove(device_id,agent_info);
	if (rc == BSWRC_OK)
	{
		sea_log << "RemoveFromAgents_device_Map found and remove old devId = " << device_id.c_str() << ", agentId = " << agent_info.agent_id << LOG_TERMINATOR;
	}
	return true;
}
//================================[RemoveInsertToAgents_device_Map]======================================
bool SbcSeaReply_c::RemoveInsertToAgents_device_Map(ErDevId_t device_id,Ulong_t agent_id)
{
    RetCode_t rc = BSWRC_OK;
	bool b = true;
	AgentInfo_s agent_info;
	rc = agents_devices_map.Remove(device_id,agent_info);
	if (rc == BSWRC_OK)
	{
		sea_log << "RemoveInsertToAgents_device_Map found and remove old devId = " << device_id.c_str() << ", agentId = " << agent_info.agent_id << LOG_TERMINATOR;
	}
	agent_info.agent_id = agent_id;
	agent_info.device_id = device_id;
	agent_info.monitor_id = 0;
	rc = agents_devices_map.Insert(device_id,agent_info); //update agent info with monitor id
	if (rc != BSWRC_OK)
	{
		sea_log << "RemoveInsertToAgents_device_Map failed to insert devId = " << device_id.c_str() << ", agentId = " << agent_info.agent_id << LOG_TERMINATOR;
		b = false;
	}
	return b;
}
//================================[AddDeviceMonitorAck]======================================
RetCode_t SbcSeaReply_c::AddDeviceMonitorAck(ErRequestId_t     related_req_id,
                                             ErDevId_t         device_id,
                                             Bool_t            success,
                                             ErMonitorId_t     monitor_id)
{
  RetCode_t rc = BSWRC_OK;
  SeaRegisterAck(MONITOR_DEV_ACK,success,monitor_id);

  sea_log << "AddDeviceMonitorAck device_id = " << device_id.c_str() << LOG_TERMINATOR;
  my_print(0,"SbcSeaReply_c::AddDeviceMonitorAck() ==>  device_id, dev: %s\n",device_id.c_str(),success == TRUE ? "success" : "FALSE");

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
	rc = agents_devices_map.Insert(device_id,agent_info);
  }
    else
  {
	  sea_log << "AddDeviceMonitorAck device_id Failed to insert to agents_devices_map: " << device_id.c_str() << LOG_TERMINATOR;
	  my_print(0,"SbcSeaReply_c::AddDeviceMonitorAck() ==>  device_id Failed to insert to agents_devices_map, dev: %s\n",device_id.c_str());
  }
  return rc;
}
//================================[AddAllAgentsMonitorAck]======================================
RetCode_t SbcSeaReply_c::AddAllAgentsMonitorAck(ErRequestId_t     er_req_id,
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
void SbcSeaReply_c::SeaRegisterAck(Ushort_t ack_type, bool success, ErMonitorId_t monitor_id)
{
  switch(ack_type)
  {
    case REGISTER_ACK:
      if (success) {
        sea_log << "SbcSeaReply_c::SeaRegisterAck(REGISTER_ACK) == success, %s\n" << LOG_TERMINATOR;
		my_print(0,"SbcSeaReply_c::SeaRegisterAck(REGISTER_ACK) == success\n",APPNAME.c_str());
        sea_provider.AddAllAgentsMonitor(GetRequestId());
      }
      else{
		  
        sea_provider.Register(APPNAME,FC_AWA,"FC_AWA");
		my_print(0,"SbcSeaReply_c::SeaRegisterAck(REGISTER_ACK) == failure, retring ,%s,%s\n","FC_AWA",APPNAME.c_str());
        sea_log << "SbcSeaReply_c::SeaRegisterAck(REGISTER_ACK) == failure, retrying\n" << APPNAME.c_str() << LOG_TERMINATOR;
      }
    break;
    case MONITOR_DEV_ACK:
      if (success) {
        sea_log << "SbcSeaReply_c::AddDeviceMonitorAck(MONITOR_DEV_ACK) == success\n"
                << "monitor_id: " << monitor_id << LOG_TERMINATOR;
		 my_print(0,"SbcSeaReply_c::AddDeviceMonitorAck(MONITOR_DEV_ACK) == success\n");
      }
      else{
        sea_log << "SbcSeaReply_c::AddDeviceMonitorAck(MONITOR_DEV_ACK) == failure!!!\nn"
                << "monitor_id: " << monitor_id << LOG_TERMINATOR;
				 my_print(0,"SbcSeaReply_c::AddDeviceMonitorAck(MONITOR_DEV_ACK) == failure!!!\n");
      }
    break;
    case MONITOR_ALL_AGENT_ACK:
      if (success) {
        sea_log << "SbcSeaReply_c::AddAllAgentsMonitorAck(MONITOR_ALL_AGENT_ACK) == success\n"
                << "monitor_id: " << monitor_id << LOG_TERMINATOR;
        all_agents_monitor_id = monitor_id;
      }
      else{
        sea_log << "SbcSeaReply_c::AddAllAgentsMonitorAck(MONITOR_ALL_AGENT_ACK) == failure!!!\nn"
                << "monitor_id: " << monitor_id << LOG_TERMINATOR;
      }
    break;
    default:
      if (success) {
        sea_log << "SbcSeaReply_c::SeaRegisterAck == success,  !!!  WARNING  !!! Unknown Ack type \n" << LOG_TERMINATOR;
      }
      else{
        sea_log << "SbcSeaReply_c::SeaRegisterAck == failed,  !!!  WARNING  !!! Unknown Ack type \n" << LOG_TERMINATOR;
      }
    break;
  }
}
extern CP_MAP  cp_db;
extern CP_MAP  cp_db;

string STATE_STR [] = 
{
  "N/A",
  "NULL",
  "Initiiated",
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
RetCode_t SbcSeaReply_c::AgentInfo(ErMonitorId_t &monitor_id, ErReportId_t &report_id, LrlAgentInfo2_c &agent_info)
{
    REPORT report;
	report.m_Action = "agentinfo";
	
	LrlAgentCallsInfo2_c *agent_calls_info = agent_info.GetLrlAgentCallsInfo();
	 RetCode_t rc = BSWRC_OK;
	char t[32000]; t[0] = 0;
	Ulong_t agent_id = agent_calls_info->GetAgentId();
	string agent_no = "";
    AGENTINFO_MAP_IT it = agents_db.find(agent_id);

	if (it != agents_db.end())
	{
		agent_no = &(it->second.m_Number[0]);
		my_print(0,"\n--SbcSeaReply_c::AgentInfo START agent id: %d, agent no: %s\n",agent_id, agent_no.c_str());
	}
	else
	{
		my_print(0,"\n--SbcSeaReply_c::AgentInfo START agent id: %d not found\n",agent_id);
		return rc;
	}
	Ulong_t num_od_calls =  agent_calls_info->GetNumCalls();
	my_print(0,"SbcSeaReply_c::AgentInfo,agent id: %d - %s, num of calls: %d\n", agent_id,agent_no.c_str(), num_od_calls);
	if (num_od_calls > 0)
	{
		LrlCallInfo_t **LCI =  agent_calls_info->GetCallInfoArray();
		for( Ulong_t i = 0; i < agent_calls_info->GetNumCalls(); i++)
		{
   		  bool isacd = IsACDCall(LCI[i]->call_profile);
		  string acd = "N";
  		  if (isacd == true)
	      {
			acd =  "ACD";
		  }
		  string dev_id = LCI[i]->call_info.m_conn_info_arr[i].m_conn_id.m_dev_id;
		  ErConnStateVal_t callState = LCI[i]->call_info.m_conn_info_arr->m_state_val;
		  string creationTime = LCI[i]->call_info.m_creation_time;
		  string callStateStr = callState <= ECS_NUM_STATES ? STATE_STR[callState] :  STATE_STR[0];
		  Ulong_t call_id =  LCI[i]->call_info.m_conn_info_arr[i].m_conn_id.m_call_id;
		  sprintf(&t[strlen(&t[0])],(char *) "%s;%d;%d;%s;%s;",dev_id.c_str(),call_id,callState,callStateStr.c_str(),acd.c_str());
		  //my_print(0,"SbcSeaReply_c::AgentInfo, dev id: %s, call id: %d, call state: %d - %s creation time: %s\n", dev_id.c_str() ,call_id,callState,callStateStr.c_str(),creationTime.c_str());
		  //
		  CallProfileField_c *CPF = (CallProfileField_c *) &((LCI[i]->call_profile).GetFirstField());
		  while (CPF->QueryId() != 0)
		  {
			const char *s  = CPF->AsStr();
			int num = CPF->QueryId();
			sprintf(&t[strlen(&t[0])],(char *) "%d|",CPF->QueryId());
			CP_MAP::iterator it =  cp_db.find(num);
			if (it != cp_db.end())
			{
				char *s1 = &(it->second.m_CPName[0]);
				sprintf(&t[strlen(&t[0])],(char *)"%s|",s1);
				//sprintf(&t[strlen(&t[0])],"id: %d - %s value: %s;\n",CPF->QueryId(),s1,s);
				//my_print(0,"%s\n",t);         
			}
			else
			{
				sprintf(&t[strlen(&t[0])],(char *)"|");
				//my_print(0,"cp num: %d NOT FOUND\n",num);    
			}
			sprintf(&t[strlen(&t[0])],(char *)"%s^",s);
			CPF = (CallProfileField_c *)  &((LCI[i]->call_profile).GetNextField());
		  }
		  sprintf(&t[strlen(&t[0])],";~~");

		}
		report.m_MoreDetail = &t[0];
		my_print(0,"%s\n",t);
	}

    //28-Mar-2019 SW BZ#49188
    report.m_Code1 = agent_info.GetLrlLoginInfo()->GetNumOfGroup();
	report.m_Code2 = agent_info.GetLrlLoginInfo()->GetOnRelease();
    //report.m_Code2 = agent_info.GetLrlLoginInfo()->GetCause();

	AddGroupsToReport(agent_info.GetLrlLoginInfo()->GetGroupInfoArr(),report);

	report.m_DevId = it->second.m_Extenstion;
	rc = UpdateAgentDbInfo(report.m_DevId,WFM::CallsStatus,report);
	my_print(0,"\n-------------SbcSeaReply_c::AgentInfo END\n");

	 return rc;
}
//===========================[ Failed ]=======================================
 RetCode_t SbcSeaReply_c::Failed(ErMonitorId_t&				  monitor_id,
                             ErReportId_t&        report_id,
                             BccFailed_c&         failed,
                             ErConnStateVal_t&    local_conn_state_val,
                             ErDevId_t&           local_dev_id)
 {
	 my_print(0,"SbcSeaReply_c::Failed: %d, dev: %s\n",local_conn_state_val, local_dev_id.c_str());
     sea_log << "SbcSeaReply_c::Failed, local_conn_state_val "  << local_conn_state_val << ", dev: " << local_dev_id.c_str() << LOG_TERMINATOR;
	 	 RetCode_t rc = BSWRC_OK;
		 return rc;
 }
//===========================[ Originated ]=======================================
 RetCode_t SbcSeaReply_c::Originated(ErMonitorId_t&       monitor_id,
                                 ErReportId_t&        report_id,
                                 BccOriginated_c&     originated,
                                 ErConnStateVal_t&    local_conn_state_val,
                                 ErDevId_t&           local_dev_id)
 {
	     my_print(0,"SbcSeaReply_c::Originated: %d\n",local_conn_state_val);
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
string devStatStr[EDS_NUM_STATUS_TYPES + 20] = {"UNKNOWN","BUSY","IDLE","IN_SERVICE","OUT_OF_SERVICE",
                                            "CFW_ALL","CFW_ALL_CANCELED","DND","DND_CANCELED",
                                            "MDU_PREVENT_LOGIN"};
RetCode_t SbcSeaReply_c::DeviceStatus(ErMonitorId_t        monitor_id,
				   ErReportId_t         report_id,
				   ErDevId_t            device_id,
				   ErDeviceStatus_t     device_status,
				   ErCause_t            cause,
				   ErPrivateData_s&     private_data)		
{
		RetCode_t rc = BSWRC_OK;
	    if (device_status < 0  || device_status >= EDS_NUM_STATUS_TYPES)
		{
			my_print(0,"SbcSeaReply_c::DeviceStatus !! Unknown device status !! dev: %s, %d\n",device_id.c_str(),device_status);
			return rc;
		}
        my_print(0,"SbcSeaReply_c::DeviceStatus dev: %s, %s\n",device_id.c_str(),devStatStr[device_status].c_str());
	    REPORT report;
		report.m_Action = "deviceStatus";
		report.m_DevId = device_id;	
		report.m_Code1 = (Ulong_t) device_status;
		report.m_Code2 = (Ulong_t) cause;		
		report.m_DetailedAction = devStatStr[device_status].c_str();
		UpdateAgentDbInfo(report.m_DevId,WFM::CallsStatus,report);
	 	
		return rc;
}									   

	//--------------------------------------------------------------------------------------------------
//=================================================================

void personal_statistics_req();
/* When agent login we can find his device Id and monitor it */
RetCode_t SbcSeaReply_c::AgentLogin(ErMonitorId_t&     monitor_id,
                                    ErReportId_t&      report_id,
                                    LrlAgentLogin2_c&  agent_login)
{
  RetCode_t rc = BSWRC_OK;
  AgentInfo_s agent_info;
  ErDevId_t dev_id = agent_login.GetAgtDevId();
  rc = agents_devices_map.Get(dev_id,agent_info);
  if (rc != BSWRC_OK)
  {
	  sea_log << "AgentLogin device " << dev_id.c_str() << " not found, not web agent " << agent_login.GetAgtNumber().c_str()  << LOG_TERMINATOR;
	  return BSWRC_FAIL;
  }
	  REPORT report;
		report.m_Action = "login";
	  report.m_CallingCalledDevId = dev_id.c_str();
	  report.m_Code1 = agent_login.GetNumOfGroup();
	  //
   sea_log << "AgentLogin(),agent no: " << agent_login.GetAgtNumber().c_str() << ", Num of groups: " << report.m_Code1  << LOG_TERMINATOR;
	  AddGroupsToReport(agent_login.GetGroupInfoArr(),report);
	  rc = UpdateAgentDbInfo(dev_id,WFM::Logon,report);
  
	 return rc;
  }

RetCode_t SbcSeaReply_c::AddDeviceMonitor(Ulong_t    request_id,
                                          ErDevId_t  dev_id,
                                          ErDevId_t agent_number,
                                          Bool_t     rr_device,
                                          Bool_t     agent_device)
{
  RetCode_t rc = BSWRC_OK;
  rc = sea_provider.AddDeviceMonitor(request_id,dev_id,rr_device,agent_device,true,agent_number);
  sea_log << "Add Device to monitoring: request_id: " << request_id << ", dev_id: "
    << dev_id.c_str() << LOG_TERMINATOR;
	my_print(0,"SbcSeaReply_c::AddDeviceMonitor, dev: %s\n ", dev_id.c_str());
  return rc;
}



/* When agent logout we can find his device Id and "unmonitor" it */
RetCode_t SbcSeaReply_c::AgentLogout(ErMonitorId_t&     monitor_id,
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
	  AddGroupsToReport(agent_logout.GetGroupInfoArr(),report);
	  rc = UpdateAgentDbInfo(dev_id,WFM::SignOut,report);
  }
  return rc;
}


RetCode_t SbcSeaReply_c::RemoveDeviceMonitor(Ulong_t       request_id,
                                             ErDevId_t     dev_id,
                                             ErMonitorId_t monitor_id)
{
  RetCode_t rc = BSWRC_OK;
  AgentInfo_s	agent_info;

  rc = agents_devices_map.Get(dev_id,agent_info);
  if (rc != BSWRC_OK)
  {
  	my_print(0,"!!!SbcSeaReply_c::RemoveDeviceMonitor, dev: %s Failed to get agentinfo\n ", dev_id.c_str());
	sea_log << "!!!Sending RemoveDeviceMonitor, Failed to get agentinfo, dev_id: " << dev_id.c_str() << ", monitor_id: " << agent_info.monitor_id << LOG_TERMINATOR;
  }
  else
  {
  my_print(0,"SbcSeaReply_c::RemoveDeviceMonitor, dev: %s\n ", dev_id.c_str());
  sea_log << "Sending RemoveDeviceMonitor: dev_id: " << dev_id.c_str() << ", monitor_id: " << agent_info.monitor_id << LOG_TERMINATOR;
  }

  rc = sea_provider.RemoveDeviceMonitor(request_id,dev_id,agent_info.monitor_id);
  return rc;
}
//======================================[ServiceInitiated]==============================================
RetCode_t SbcSeaReply_c::ServiceInitiated(ErMonitorId_t& monitor_id,
	ErReportId_t&           report_id,
	BccServiceInitiated_c&  service_initiated,
	ErConnStateVal_t&       local_conn_state_val,
	ErDevId_t&              local_dev_id)
{
	RetCode_t rc = BSWRC_OK;
	ErDevId_t dev_id;

	REPORT report;  
	report.m_DevId = local_dev_id;
	bool b = IsACDCall(service_initiated.GetEventCP());
	if (b == true)
	{
		report.m_IsAcd = "ACD";
	}
	report.m_CallingCalledDevId = service_initiated.GetPrimaryDevId();
	report.m_CallId = service_initiated.GetPrimaryCallId();
	report.m_Action = "Initiated";
	my_print(0,"SbcSeaReply_c::ServiceInitiated dev: %s\n",local_dev_id.c_str());  
	UpdateAgentDbInfo(local_dev_id, 0, report);
	return rc;
}
//======================================[Delivered]============================================
RetCode_t SbcSeaReply_c::Delivered(ErMonitorId_t&       monitor_id,
                                   ErReportId_t&        report_id,
                                   BccDelivered_c&      delivered,
                                   ErConnStateVal_t&    local_conn_state_val,
                                   ErDevId_t&           local_dev_id)
{
  RetCode_t rc = BSWRC_OK;
  ErDevId_t dev_id;

  sea_log << "SbcSeaReply_c::Delivered()\n"
          << "agent = " << delivered.GetOriginallyCalledDevId().c_str()
          << "\ncalling dev id = " << delivered.GetCallingDevId().c_str()
          << "\ncall id = " << delivered.GetAlertingConnId().m_call_id << "\nmonitor_id = " << monitor_id
          << ", local_dev_id = " << local_dev_id.c_str() << LOG_TERMINATOR;


  if( IsAgentDevice(delivered.GetOriginallyCalledDevId(),agents_devices_map) && IsACDCall(delivered.GetEventCP()))
  {
    m_ringing_agents.Insert(delivered.GetAlertingConnId().m_dev_id.c_str(),delivered.GetAni().c_str());
  }
  REPORT report;  report.m_DevId = local_dev_id;
  bool b = IsACDCall(delivered.GetEventCP());
  if (b == true)
  {
		report.m_IsAcd =  "ACD";
  }
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
   
   CallProfileField_c  cur_fld =  delivered.GetEventCP().GetFirstField();
  string s = "";
  char c[512];
  while (cur_fld.QueryId() != 0)
  {
	  
     sprintf(&c[0],"%d|%s^",cur_fld.QueryId(),&cur_fld.AsStr()[0]);	 
	 s += (char *) &c[0];
	 //my_print(0,"cp id: %d, %s\n", cur_fld.QueryId(),cur_fld.AsStr()); 
    cur_fld = delivered.GetEventCP().GetNextField();
  }
  report.m_MoreDetail  = s;
  UpdateAgentDbInfo(local_dev_id,0,report);


  return rc;
}
//======================================[Diverted]======================================
RetCode_t SbcSeaReply_c::Diverted(ErMonitorId_t&       monitor_id,
                                  ErReportId_t&        report_id,
                                  BccDiverted_c&       diverted,
                                  ErConnStateVal_t&    local_conn_state_val,
                                  ErDevId_t&           local_dev_id)
{
  RetCode_t rc = BSWRC_OK;
  string dev = diverted.GetDivertedFromConnId().m_dev_id.c_str();
  string ani;

  rc = m_ringing_agents.Get(dev,ani);
  if (rc == BSWRC_OK)  // force release case!
  {
    m_ringing_agents.Remove(dev,ani);

  }
  REPORT report;  report.m_DevId = local_dev_id;
    bool b = IsACDCall(diverted.GetEventCP());
  if (b == true)
  {
		report.m_IsAcd  = "ACD";
  }
  report.m_CallingCalledDevId  = dev;
  report.m_JoiningCalledDevId  = diverted.GetDivertedToDevId();
  report.m_CallId = diverted.GetPrimaryCallId();
  report.m_Code1 = diverted.GetDivertedFromConnId().m_call_id;
  report.m_Action = "diverted";
  CallProfileField_c cp_field;
  CallProfileField_c  cur_fld = diverted.GetEventCP().GetFirstField();
  string s = "";
   char c[512];
  while (cur_fld.QueryId() != 0)
  {
     sprintf(&c[0],"%d|%s^",cur_fld.QueryId(),&cur_fld.AsStr()[0]);	 
	 s += (char *) &c[0];	 //my_print(0,"cp id: %d, %s\n", cur_fld.QueryId(),cur_fld.AsStr()); 
    cur_fld = diverted.GetEventCP().GetNextField();
  }
  report.m_MoreDetail  = s;
  UpdateAgentDbInfo(local_dev_id,0,report);

  return rc;
}
//======================================[Transferred]===================================================
RetCode_t SbcSeaReply_c::Transferred(ErMonitorId_t&       monitor_id,
                                     ErReportId_t&        report_id,
                                     BccTransferred_c&    xfered,
                                     ErConnStateVal_t&    local_conn_state_val,
                                     ErDevId_t&           local_dev_id)
{
  RetCode_t rc = BSWRC_OK;

  sea_log << "SbcSeaReply_c::Transferred()" << "\nagent transferred = " << xfered.GetTransferredDevId().c_str()
          << "\nagent transferred to = " << xfered.GetTransferredToDevId().c_str()
          << "\nagent transferring = " << xfered.GetTransferringDevId().c_str()
          << "\nPrimary call id = " << xfered.GetPrimaryCallId() << "\nSecondary call id = " << xfered.GetSecondaryCallId()
          << "\nResultant call id = " << xfered.GetResultantCallId() << "\nmonitor_id = " << monitor_id
          << ", local_dev_id = " << local_dev_id.c_str() << LOG_TERMINATOR;

  //rc = calls_map.Insert(xfered.GetResultantCallId(), xfered.GetTransferredToDevId().c_str());
  REPORT report;  report.m_DevId = local_dev_id;
  bool b = IsACDCall(xfered.GetEventCP());
  if (b == true)
  {
		report.m_IsAcd =  "ACD";
  }
  report.m_CallingCalledDevId  = xfered.GetTransferringDevId();
  report.m_JoiningCalledDevId  = xfered.GetTransferredDevId();
  report.m_OriginalCalledDevId = xfered.GetTransferredToDevId();
  my_print(0,"SbcSeaReply_c::Transferred, dev_id: %s,Transferring: %s, Transferred: %s, TransferredTo: %s\n",
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
  CallProfileField_c  cur_fld =  xfered.GetEventCP().GetFirstField();
  string s = "";
  char c[512];
  while (cur_fld.QueryId() != 0)
  {
	  
     sprintf(&c[0],"%d|%s^",cur_fld.QueryId(),&cur_fld.AsStr()[0]);	 
	 s += (char *) &c[0];
	 //my_print(0,"cp id: %d, %s\n", cur_fld.QueryId(),cur_fld.AsStr()); 
    cur_fld = xfered.GetEventCP().GetNextField();
  }  
  report.m_MoreDetail  = s;
  //
  report.m_CallingCalledDevId  = xfered.GetTransferredDevId();
  report.m_JoiningCalledDevId = xfered.GetTransferredToDevId();
  if (local_dev_id == xfered.GetTransferredToDevId())
  {
	report.m_Action = "transferredtome";
	UpdateAgentDbInfo(xfered.GetTransferredToDevId(),0,report);
	return BSWRC_OK;
  }
  if (local_dev_id == xfered.GetTransferredDevId())
  {
	report.m_Action = "transferreddev";
    report.m_CallingCalledDevId  = xfered.GetTransferredDevId();
	UpdateAgentDbInfo(xfered.GetTransferredDevId(),0,report);
  }
  return BSWRC_OK;
}
//======================================[Established]====================================
RetCode_t SbcSeaReply_c::Established(ErMonitorId_t&       monitor_id,
                                     ErReportId_t&        report_id,
                                     BccEstablished_c&    established,
                                     ErConnStateVal_t&    local_conn_state_val,
                                     ErDevId_t&           local_dev_id)
{
  RetCode_t rc1,rc2;
  AgentInfo_s agent_info;

  sea_log << "SbcSeaReply_c::Established()" << "\nagent = " << established.GetOriginallyCalledDevId().c_str() << "\ncalling dev id = "
          << established.GetCallingDevId().c_str() << "\ncall id = " << established.GetJoiningConnId().m_call_id
          << "\nmonitor_id = " << monitor_id << ", local_dev_id = " << local_dev_id.c_str() << LOG_TERMINATOR;

  REPORT report;
  report.m_DevId = local_dev_id;
  bool b = IsACDCall(established.GetEventCP());
  if (b == true)
  {
		report.m_IsAcd  = "ACD";
  }
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
  
  //UpdateAgentDbInfo(CallingCalledDevId,0,report);
  UpdateAgentDbInfo(local_dev_id,0,report);

  return BSWRC_OK;
}
//======================================[CallCleared]=============================================================
RetCode_t SbcSeaReply_c::CallCleared(ErMonitorId_t&       monitor_id,
                                     ErReportId_t&        report_id,
                                     BccCallCleared_c&    call_cleared,
                                     ErConnStateVal_t&    local_conn_state_val,
                                     ErDevId_t&           local_dev_id)
{
  RetCode_t rc = BSWRC_OK;
  string agnt;
  string ani;

  sea_log << "SbcSeaReply_c::CallCleared()" << "\ncall id = " << call_cleared.GetClearedCallId()
          << "\nmonitor_id = " << monitor_id << ", local_dev_id = " << local_dev_id.c_str() << LOG_TERMINATOR;
 //		  

	REPORT report;
    report.m_Action = "cleared";
    report.m_DetailedAction = "device";
	report.m_DevId = local_dev_id;
    report.m_CallingCalledDevId = call_cleared.GetPrimaryDevId();
    report.m_CallId = call_cleared.GetClearedCallId();
    rc = UpdateAgentDbInfo(local_dev_id,0,report);

  return 	rc ;//UpdateAgentDbInfo(local_dev_id,WFM::Logon,"");
}
//======================================[ConnCleared]====================================
RetCode_t SbcSeaReply_c::ConnCleared(ErMonitorId_t&       monitor_id,
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

    sea_log << "SbcSeaReply_c::ConnCleared()" << "\nclearedDev = " << clearedDev.c_str()
            << "\ncall id = " << conn_cleared.GetClearedConnId().m_call_id << "\nmonitor_id = " << monitor_id
            << ", local_dev_id = " << local_dev_id.c_str();

    if(clearedDev != local_dev_id)
    {
      sea_log << "\n!!!  Ignore when (clearedDev != local_dev_id)";
      return rc;
    }

    sea_log << LOG_TERMINATOR;

	REPORT report;
	report.m_Action = "cleared";
	report.m_DetailedAction = "connection";
	report.m_DevId = clearedDev;
	report.m_CallingCalledDevId = local_dev_id;
	report.m_CallId = conn_cleared.GetClearedConnId().m_call_id;
	rc = UpdateAgentDbInfo(clearedDev,0,report);
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

//======================================[IsACDCall]============================================================
bool IsACDCall(CallProfile_c& cp) // check if this call is ACD call (return true)
{
	CallProfileField_c cp_field;
   cp_field = cp.GetField(CallProfile_c::AGENT_EXT);
  if (cp_field.QueryId() != 0)
    return true; // It is ACD call
  else
    return false;
}
//======================================[AgentRelease]=========================================================

RetCode_t SbcSeaReply_c::AgentRelease(ErMonitorId_t&       monitor_id,
                                         ErReportId_t&        report_id,
                                         LrlAgentRelease2_c&  agent_release)
{
  ErDevId_t agent_number = agent_release.GetAgtNumber();
  ErDevId_t agent_dev = agent_release.GetAgtDevId();
  RetCode_t rc = BSWRC_OK;
  REPORT report;
  report.m_Action = "release";
  sea_log << "SbcSeaReply_c::AgentRelease() [" << "]" << LOG_TERMINATOR;

  report.m_CallingCalledDevId = agent_dev;
  //
  if (agent_release.GetCause() > 1)
  {
    report.m_DetailedAction = "code";
    report.m_Code1 = agent_release.GetCause();
  }
	// no groups in release
  //GroupInfo_t* GI = agent_release.GetGroupInfoArr();
  //AddGroupsToReport(&GI,report);

    rc = UpdateAgentDbInfo(agent_dev,0,report);
  return rc;
}


//=================================[AgentResume]=========================================================
RetCode_t SbcSeaReply_c::AgentResume(ErMonitorId_t&      monitor_id,
                                        ErReportId_t&       report_id,
                                        LrlAgentResume2_c&  agent_resume)
{
  ErDevId_t agent_number = agent_resume.GetAgtNumber();
  ErDevId_t agent_dev = agent_resume.GetAgtDevId();

  	REPORT report;
    report.m_Action = "resume";
    report.m_CallingCalledDevId = agent_dev;
    sea_log << "SbcSeaReply_c::AgentResume() ["  << "]" << LOG_TERMINATOR;
	
    // no groups in resume
    //GroupInfo_t* GI = agent_resume.GetGroupInfoArr();
    //AddGroupsToReport(&GI,report);

    return UpdateAgentDbInfo(agent_dev,0,report);
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
 "no_mode",
};

RetCode_t SbcSeaReply_c::UpdateAgentMode(ErMonitorId_t&          monitor_id,
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
    sea_log << "SbcSeaReply_c::UpdateAgentMode - RSRV for Call Id " << agent_mode.GetModeCall() << "\n";
    agent_mode.GetCallInfo().call_profile.DumpToLog(sea_log);
    sea_log << LOG_TERMINATOR;
	//
	CallProfileField_c *CPF = (CallProfileField_c *) &agent_mode.GetCallInfo().call_profile.GetFirstField();
	//string s = "";
	char c[512];
	char t[16000]; t[0] = 0;
	while (CPF->QueryId() != 0)
	{
		const char *s  = CPF->AsStr();
		int num = CPF->QueryId();
		sprintf(&t[strlen(&t[0])],(char *) "%d|",CPF->QueryId());
		CP_MAP::iterator it =  cp_db.find(num);
		if (it != cp_db.end())
		{
			char *s1 = &(it->second.m_CPName[0]);
			sprintf(&t[strlen(&t[0])],(char *)"%s|",s1);
		}
		else
		{
			sprintf(&t[strlen(&t[0])],(char *)"|");
		}
		sprintf(&t[strlen(&t[0])],(char *)"%s^",s);
		CPF = (CallProfileField_c *)  (CallProfileField_c *) &agent_mode.GetCallInfo().call_profile.GetNextField();
	}
	sprintf(&t[strlen(&t[0])],";~~");	
	report.m_MoreDetail = (char *) &t;
  }
  report.m_CallId = agent_mode.GetModeCall();
  report.m_DetailedAction = "idle";
  if (mode <= NO_MODE)
  {
    report.m_DetailedAction = agentModeStr[mode];
  }
 
  if (report.m_DetailedAction  != "")
  {
	  UpdateAgentDbInfo(agent_dev,0,report);
  }
  return rc;
}
//=================================[Held]=========================================
RetCode_t SbcSeaReply_c::Held(ErMonitorId_t& monitor_id, ErReportId_t& report_id, BccHeld_c& held, ErConnStateVal_t&local_conn_state_val, ErDevId_t& local_dev_id)
{
    AgentInfo_s agent_info;
	ErDevId_t dev_id = held.GetHoldingConnId().m_dev_id;
	RetCode_t rc = agents_devices_map.Get(dev_id,agent_info); // it done here because here we have agent id
	if (monitor_id != agent_info.monitor_id)
	{
		// must be same monitor id of the holding dev
		return BSWRC_OK; // ignore it.
	}
  	REPORT report;
	 bool b = IsACDCall(held.GetEventCP());
	if (b == true)
	{
		report.m_IsAcd =  "ACD";
	}
  	report.m_Action = "hold";
  	report.m_CallingCalledDevId = dev_id;
	report.m_CallId = held.GetPrimaryCallId();

  	UpdateAgentDbInfo(dev_id,0,report);
	return BSWRC_OK;
}
//=================================[Retrieved]=========================================
RetCode_t SbcSeaReply_c::Retrieved(ErMonitorId_t&       monitor_id,
                        ErReportId_t&        report_id,
                        BccRetrieved_c&      retrieved,
                        ErConnStateVal_t&    local_conn_state_val,
                        ErDevId_t&           local_dev_id)
{
    AgentInfo_s agent_info;
	ErDevId_t dev_id = retrieved.GetPreviouslyHoldingConnId().m_dev_id;
	RetCode_t rc = agents_devices_map.Get(dev_id,agent_info); // it done here because here we have agent id
	if (monitor_id != agent_info.monitor_id)
	{
		// must be same monitor id of the holding dev
		return BSWRC_OK; // ignore it.
	}
    bool b = IsACDCall(retrieved.GetEventCP());

  	REPORT report;
	if (b == true)
	{
		report.m_IsAcd =  "ACD";
	}
  	report.m_Action = "retrieve";
  	report.m_CallingCalledDevId = dev_id;
	report.m_CallId = retrieved.GetPrimaryCallId();

  	UpdateAgentDbInfo(dev_id,0,report);
	return BSWRC_OK;
}
//===============================[Conferenced]===========================================
RetCode_t SbcSeaReply_c::Conferenced(ErMonitorId_t&       monitor_id,
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
    bool b = IsACDCall(conferenced.GetEventCP());
	if (b == true)
	{
		report.m_IsAcd =  "ACD";
	}
	if (local_dev_id == conferenced.GetConferencingDevId())
	{	
		report.m_Action = "conferencing";
		rc = UpdateAgentDbInfo(conferenced.GetConferencingDevId(),WFM::Conference,report);
	}
	if (local_dev_id == conferenced.GetConferencedDevId())
	{	
		report.m_Action = "conferenced";
		rc = UpdateAgentDbInfo(conferenced.GetConferencedDevId(),WFM::Conference,report);
	}
	else if (local_dev_id == conferenced.GetConferencedToDevId())
	{
		report.m_Action = "conferencedto";
		rc = UpdateAgentDbInfo(conferenced.GetConferencedToDevId(),WFM::Conference,report);
	}

	return rc;
}
//================================[AgentAtStation]======================================
RetCode_t SbcSeaReply_c::AgentAtStation(ErMonitorId_t&              monitor_id,
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
	RetCode_t SbcSeaReply_c::AgentNoLongerAtStation(ErMonitorId_t&              monitor_id,
                                     ErReportId_t&               report_id,
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
	RetCode_t SbcSeaReply_c::GroupQueueInfo(ErMonitorId_t&            monitor_id,  
                             ErReportId_t&             report_id,
	    					 LrlGroupQueueInfo2_c&     group_queue_info)
	{
		 return BSWRC_OK;
	}
//===================================[GroupQueueCPInfo]=======================================
	//SOLSOLX 2018
	 //"10;1|5001;2|2003;3|100;4|6;7|2018-11-25;8|09:11:55;9|1;10|0;11|09:31:09;12|2003;14|ENGLISH;15|1;16|5;39|;40|4444713;52|6;53|5001;111|1234567890;1007|80;^11;1|5001;2|2002;3|76;4|6;7|2018-11-25;8|09:38:".
	RetCode_t SbcSeaReply_c::GroupQueueCPInfo(ErMonitorId_t&            monitor_id,  
                               ErReportId_t&             report_id,
							   LrlGroupQueueCPInfo2_c&     group_queue_info)

	{
		REPORT report;
	  	report.m_Action = "GroupQueueCPInfo";
	  	report.m_DevId = group_queue_info.GetGroup_number();
		report.m_MoreDetail = group_queue_info.getVPs();
	    sea_log << "SbcSeaReply_c::GroupQueueCPInfo()\n  group number: " << group_queue_info.GetAgentNumber().c_str() << LOG_TERMINATOR;
		UpdateAgentDbInfo(group_queue_info.GetAgentNumber().c_str(),WFM::Inbound_1,report);


		 return BSWRC_OK;
	}
//===================================[PickUpCallReply]=======================================
// SOLSOLX PU 2018
	RetCode_t SbcSeaReply_c::PickupCallReply(ErMonitorId_t&        monitor_id,
							  ErReportId_t&           report_id,
                              LrlPickupInfo2_c         &lrlpickupinfo2)
   {
	  RetCode_t rc = BSWRC_OK;
	  return rc;
   }

//===================================[UpdateAgentDbInfo devid]=======================================
RetCode_t SbcSeaReply_c::UpdateAgentDbInfo(ErDevId_t dev_id,int state, struct REPORT &report)
{
	  AgentInfo_s agent_info;
	  RetCode_t rc = agents_devices_map.Get(dev_id,agent_info); // it done here because here we have agent id
	  if (rc == BSWRC_OK)
	  {
		  // update agent table with device id;
		  AGENTINFO_MAP_IT it = agents_db.find(agent_info.agent_id);
		  if (it != agents_db.end())
		  {
			 AgentDbInfo_c &ADI = (*it).second;
			 ADI.m_Extenstion = dev_id;
			 if (state == -999999)
			 {
				ADI.m_StateCode = ADI.m_PrevStateCode;
			 }
			 else if (state < 0) // by example: in case of retrieve from hold by example
			 {
				 ADI.m_PrevStateCode = ADI.m_StateCode; // save state before current new state
				 ADI.m_StateCode = (state * -1); // save state before in case of hold
			 }
			 else
			 {
				ADI.m_StateCode = state;
			 }
			 ADI.m_StartStateTime = time(0);
			 ADI.m_Changed = true;
			 report.m_ClientId = ADI.m_AgentWSid;
			 report.m_SessionId =  ADI.m_SessionId;
			 ADI.m_report.push_back(report);
		  }
	  }
  	  else
	 {
		sea_log << "SbcSeaReply_c::UpdateAgentDbInfo device_id not found: " << dev_id.c_str() << LOG_TERMINATOR;
	 }
	 return rc;
}
//===================================[UpdateAgentDbInfo agent id]=======================================
RetCode_t SbcSeaReply_c::UpdateAgentDbInfo(Ulong_t agent_id,int state, struct REPORT &report)
{
	  RetCode_t rc = BSWRC_OK;
	  if (rc == BSWRC_OK)
	  {
		  // update agent table with device id;
		  //printf("aid:%d, report.m_devid:%s\r\n", agent_id, report.m_DevId.c_str());
		  AGENTINFO_MAP_IT it = agents_db.find(agent_id);
		  if (it != agents_db.end())
		  {
			 AgentDbInfo_c &ADI = (*it).second;
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
			 report.m_SessionId =  ADI.m_SessionId;
			 ADI.m_report.push_back(report);
		  }
	  }
	 return rc;
}
//=================================[CallRecording]=========================================
RetCode_t SbcSeaReply_c::CallRecording(ErMonitorId_t   monitor_id,
                                    ErReportId_t    report_id,
                                    ErDevId_t       device_id,
                                    ErConnId_t      recorded_conn_id,
                                    bool            status,
                                    ErName_t        URI,
                                    ErName_t        codec,
                                    ErName_t        format,
                                    ErName_t        sample_rate,
                                    ErName_t        type,
                                    ErCause_t       cause){
	RetCode_t rc = BSWRC_OK;
  	REPORT report;
  	report.m_Action = "callrecordingOnOff";
    report.m_DevId = recorded_conn_id.m_dev_id;
	report.m_Code1 = (int) status;
	
	my_print(0,"SbcSeaReply_c::CallRecording devid %s, status: %d\n",report.m_DevId.c_str(),report.m_Code1);
	Sleep(500);
	rc = UpdateAgentDbInfo(report.m_DevId,WFM::CallsStatus,report);
	return BSWRC_OK;
    }

//=================================[UpdateAgentDbInfo agentNo]=========================================
RetCode_t SbcSeaReply_c::UpdateAgentDbInfo(const char *agentNo, int state, struct REPORT &report,int client_id,string sessionid)
{
	RetCode_t rc = BSWRC_FAIL;
	AGENTINFO_MAP_IT it;// = agents_db.find(agent_id);
	for (it = agents_db.begin(); it != agents_db.end(); ++it)
	{

		AgentDbInfo_c &ADI = (*it).second;
		int found = strcmp(agentNo, ADI.m_Number);
		if (found != 0) continue;
		ADI.m_StartStateTime = time(0);
		ADI.m_Changed = true;
		//---------------------------
		if (client_id != -1)
		{
			 report.m_ClientId =  client_id;
			 report.m_SessionId = sessionid;
		}
		else
		{
 			 report.m_ClientId = ADI.m_AgentWSid;
			 report.m_SessionId =  ADI.m_SessionId;
		}

        if (report.m_DevId.length() > 29000)
        {
          my_print(0, "UpdateAgentDbInfo=> action: %s,  Seperate m_DevId length = %d\n", report.m_Action.c_str(),report.m_DevId.length());
          string actoin = report.m_Action;
          report.m_Action += "*";
          string more = report.m_DevId;
          int l = report.m_DevId.length() / 29000;
          int z = 0;
          int sendlen = 0;
          for (z; z < l;++z)
          {
            report.m_DevId = more.substr(z * 29000,29000);
            ADI.m_report.push_back(report);
            sendlen += 29000;

          }
          report.m_Action = actoin;
          report.m_DevId = more.substr(sendlen,more.length() - sendlen);
        }
        ADI.m_report.push_back(report);
		rc = BSWRC_OK;
			break;
	}
	return rc;
}
//=====================================[ send Message to AWA_Q3]============================

