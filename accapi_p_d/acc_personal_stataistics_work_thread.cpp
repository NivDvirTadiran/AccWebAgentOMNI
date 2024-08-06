//
// PROJECT & ID  : AccWebAgent Solutions
// FILE NAME     : acc_personal_stataistics_work_thread.cpp
// AUTHOR        : Shaul Waller
// CREATION DATE : 1-Jul-2019
// -----------------------------------------------------------------------
//====================================================================

//==========================[ Interface Dependencies ]================

#ifdef WIN32
#pragma warning(disable:4786)
#endif

#include <er_std_override.h>
#include <string>
#include <sollib.h>
#include <errno.h>
using namespace std;

extern "C" {

//#include "mgen_srv.h"
#include "sgen.h"
#include "oeve.h"
#include "ogen.h"
#include "othr.h"
}

#include <bswlog.h>
#include <proj_gen.h>
#include <dbi_statement.h>
#include <dbi_resultset.h>
#include <dbi_dbmanager.h>
#include <bswcritsection.h>
#include <mccn_opcodes.h>
#include <mcsa_csanla.h>
#include "crmalltypes.h"
#include "sbc_timer.h"
#include "acc_personal_stataistics_work_thread.h"

#define CSA_TH2     124  //UtlThrIDByName((char *) "CSA_TH2")  //124
#define CSA_Q4      126  //UtlQueIDByName((char *) "CSA_Q4")  //48   For thread 3
#define AWA_TH3     178  //UtlThrIDByName((char *) "AWA_TH3") 
#define AWA_Q3      179  // UtlQueIDByName((char *) "AWA_Q3") 
extern GRP_MAP grp_db;
string getOpcodeStr(EosOpCode_t opcode)
{
  string codeStr = "";	
  switch (opcode) 
  {
	case NLA_CSA_start: codeStr =  "NLA_CSA_start "; break;
	case NLA_CSA_personal_statistics_req: codeStr  = "NLA_CSA_personal_statistics_req";break;
	case NLA_CSA_reg_for_grp_agents_req: codeStr =  "NLA_CSA_reg_for_grp_agents_req"; break;
	case NLA_CSA_reg_for_grps_req: codeStr =  "NLA_CSA_reg_for_grps_req"; break;
	case NLA_CSA_reg_for_super_grps_req: codeStr =  "NLA_CSA_reg_for_super_grps_req"; break;
	case NLA_CSA_reg_for_grp_trunks_req: codeStr =  "NLA_CSA_reg_for_grp_trunks_req"; break;
	case NLA_CSA_reg_for_trunk_grps_req: codeStr =  "NLA_CSA_reg_for_trunk_grps_req"; break;
	case NLA_CSA_reg_for_agent_req: codeStr =  "NLA_CSA_reg_for_agent_req"; break;
	case NLA_CSA_reg_for_dnis_req: codeStr =  "NLA_CSA_reg_for_dnis_req"; break;
	case NLA_CSA_reg_for_ivr_ports_req: codeStr =  "NLA_CSA_reg_for_ivr_ports_req"; break;
	case NLA_CSA_reg_for_ivr_group_req: codeStr =  "NLA_CSA_reg_for_ivr_group_req"; break;
	case NLA_CSA_reg_for_ivr_app_req: codeStr =  "NLA_CSA_reg_for_ivr_app_req"; break;
	case WEB_CSA_reg_for_ivr_app_req: codeStr =  "WEB_CSA_reg_for_ivr_app_req"; break;// PVL_WEB 3-8-2009  1004043 
	case WEB_CSA_reg_for_ivr_group_req: codeStr =  "WEB_CSA_reg_for_ivr_group_req"; break;// PVL_WEB 3-8-2009   1004043
	case WEB_CSA_reg_for_ivr_ports_req: codeStr =  "WEB_CSA_reg_for_ivr_ports_req"; break;// PVL_WEB 3-8-2009 1004043
	case WEB_CSA_reg_for_mailbox_req: codeStr =  "WEB_CSA_reg_for_mailbox_req"; break;// PVL_WEB 3-8-2009 1004043
	case NLA_CSA_unreg_for_grp_agents_req: codeStr =  "NLA_CSA_unreg_for_grp_agents_req"; break;
	case NLA_CSA_unreg_for_grps_req: codeStr =  "NLA_CSA_unreg_for_grps_req"; break;
	case NLA_CSA_unreg_for_grp_trunks_req: codeStr =  "NLA_CSA_unreg_for_grp_trunks_req"; break;
	case NLA_CSA_unreg_for_trunk_grps_req: codeStr =  "NLA_CSA_unreg_for_trunk_grps_req"; break;
	case NLA_CSA_unreg_for_super_grps_req: codeStr =  "NLA_CSA_unreg_for_super_grps_req"; break;
	case NLA_CSA_unreg_for_agent_req: codeStr =  "NLA_CSA_unreg_for_agent_req"; break;
	case NLA_CSA_unreg_for_dnis_req: codeStr =  "NLA_CSA_unreg_for_dnis_req"; break;
	case NLA_CSA_unreg_for_ivr_ports_req: codeStr =  "NLA_CSA_unreg_for_ivr_ports_req"; break;
	case NLA_CSA_unreg_for_ivr_group_req: codeStr =  "NLA_CSA_unreg_for_ivr_group_req"; break;
	case NLA_CSA_unreg_for_ivr_app_req: codeStr =  "NLA_CSA_unreg_for_ivr_app_req"; break;
	case NLA_CSA_synch_agent_status_req: codeStr =  "NLA_CSA_synch_agent_status_req (NIY)"; break;
	case NLA_CSA_set_refresh_interval_req: codeStr =  "NLA_CSA_set_refresh_interval_req"; break;
	case NLA_CSA_update_online: codeStr =  "NLA_CSA_update_online"; break;
	case NLA_CSA_agent_logout_req: codeStr =  "NLA_CSA_agent_logout_req"; break;
	case NLA_CSA_agent_login_req: codeStr =  "NLA_CSA_agent_login_req"; break;
	case NLA_CSA_reg_for_mailbox_req: codeStr =  "NLA_CSA_reg_for_mailbox_req"; break;
	case NLA_CSA_unreg_for_mailbox_req: codeStr =  "NLA_CSA_unreg_for_mailbox_req"; break;
	case NLA_CSA_agent_login_status_req: codeStr =  "NLA_CSA_agent_login_status_req"; break;
	case NLA_CSA_online_client_register: codeStr =  "NLA_CSA_online_client_register"; break;
	case CSA_NLA_soft_params_event: codeStr = "CSA_NLA_soft_params_event";break;
	default: codeStr =  "unknown_opcode";
  }
  return codeStr;
}	
//====================================[  ] =======================================
string getEventStr(EosOpCode_t opcode)
{
	string eventstr = "";
	switch (opcode)
	{
	   case CSA_NLA_group_statistics_event      : eventstr = "CSA_NLA_group_statistics_event      "; break; 	
	   case CSA_NLA_personal_statistics_event   : eventstr = "CSA_NLA_personal_statistics_event   "; break; 
	   case CSA_NLA_agents_dynamic_info_event   : eventstr = "CSA_NLA_agents_dynamic_info_event   "; break; 
	   case CSA_NLA_logged_in_event             : eventstr = "CSA_NLA_logged_in_event             "; break; 
	   case CSA_NLA_logged_out_grp_agents_event : eventstr = "CSA_NLA_logged_out_grp_agents_event "; break; 
	   case CSA_NLA_agents_full_info_event      : eventstr = "CSA_NLA_agents_full_info_event      "; break; 
	   case CSA_NLA_record_on_grp_agents_event  : eventstr = "CSA_NLA_record_on_grp_agents_event  "; break; 
	   case CSA_NLA_record_off_grp_agents_event : eventstr = "CSA_NLA_record_off_grp_agents_event "; break;
	   case CSA_NLA_grps_info_event             : eventstr = "CSA_NLA_grps_info_event             "; break; 
	   case CSA_NLA_grps_last_period_info_event : eventstr = "CSA_NLA_grps_last_period_info_event "; break; 
	   case CSA_NLA_grps_ds_info_event          : eventstr = "CSA_NLA_grps_ds_info_event          "; break; 
	   case CSA_NLA_super_grps_event            : eventstr = "CSA_NLA_super_grps_event            "; break; 
	   case CSA_NLA_super_grps_ds_event         : eventstr = "CSA_NLA_super_grps_ds_event         "; break; 
	   case CSA_NLA_trunks_info_event           : eventstr = "CSA_NLA_trunks_info_event           "; break; 
	   case CSA_NLA_trunk_grps_info_event       : eventstr = "CSA_NLA_trunk_grps_info_event       "; break; 
	   case CSA_NLA_keep_alive_event            : eventstr = "CSA_NLA_keep_alive_event            "; break; 
	   case CSA_NLA_offline_complete_event      : eventstr = "CSA_NLA_offline_complete_event      "; break; 
	   case CSA_NLA_single_agent_full_info_event: eventstr = "CSA_NLA_single_agent_full_info_event"; break; 
	   case CSA_NLA_logged_out_agent_event      : eventstr = "CSA_NLA_logged_out_agent_event      "; break; 
	   case CSA_NLA_record_on_agent_event       : eventstr = "CSA_NLA_record_on_agent_event       "; break; 
	   case CSA_NLA_record_off_agent_event      : eventstr = "CSA_NLA_record_off_agent_event      "; break; 
	   case CSA_NLA_dnis_info_event             : eventstr = "CSA_NLA_dnis_info_event             "; break; 
	   case CSA_NLA_dnis_last_period_info_event : eventstr = "CSA_NLA_dnis_last_period_info_event "; break; 
	   case CSA_NLA_ivr_group_info_event		: eventstr = "CSA_NLA_ivr_group_info_event		"; break;		  
	   case CSA_NLA_ivr_group_ports_info_event  : eventstr = "CSA_NLA_ivr_group_ports_info_event  "; break; 
	   case CSA_NLA_ivr_application_info_event  : eventstr = "CSA_NLA_ivr_application_info_event  "; break; 
	   case CSA_NLA_mailbox_info_event		    : eventstr = "CSA_NLA_mailbox_info_event"; break;
	   case CSA_NLA_soft_params_event  			: eventstr = "CSA_NLA_soft_params_event";break;	   
	   case CSA_NLA_agents_logged_in_status_info_event  : eventstr = "CSA_NLA_agents_logged_in_status_info_event "; break;
	   case CSA_NLA_agent_logged_in_minimal_info_event  : eventstr = "CSA_NLA_agent_logged_in_minimal_info_event "; break;
	   case CSA_NLA_agent_logged_out_minimal_info_event : eventstr = "CSA_NLA_agent_logged_out_minimal_info_event"; break;
	   case CSA_NLA_agent_record_on_minimal_info_event  : eventstr = "CSA_NLA_agent_record_on_minimal_info_event "; break;
	   case CSA_NLA_agent_record_off_minimal_info_event : eventstr = "CSA_NLA_agent_record_off_minimal_info_event"; break;
	   default: break;
	}
	return eventstr;
	
}


//NLA_CSA_001 - register event

void my_print(int level,const char* fmt, ...);
//
static BswLog_c& GetLog() {

  static BswLog_c   log(BswMakeLogSite(FC_AWA, 1), LM_PUBLIC, LOGL_INFO);

  if (!log.IsProxyValid())
	  log.RecreateProxy();

  return log;
}

// register for online

/*--------------------------[ sendEventToCsi ]---------------------------*/
      // event_header.op_code := Nla_Csa_reg_for_grp_agents_req_op_code;
      // event_header.dest_que_id := Csa_Que_Id;
      // event_header.reply_que_id := Nla_Que_Id;
      // event_header.data_len := sizeof(reg_req);
      // event_header.dest_info := -1;   //Fix Bug 05.02.2002
      // reg_req.ent_id := grp_id;
      // reg_req.refresh_rate := RefRate.GetRate;
      // reg_req.tbl_type := ord(TblSlideWin);
      // //erc :=
      // EosCreateAndSendEvent (Nla_Id, Csa_Que_id, event_header, @reg_req,
                                 // sizeof(reg_req) );
 


EosRetCode_t  sendEventToCsi(
										const CcnOpCode_t opcode,
										Byte_t * const    event_data,
										Ushort_t          event_data_len)
{
    EosRetCode_t           ret_val;
    EosEventHeader_t  hdr;

    hdr.op_code       = opcode;
    hdr.dest_que_id   = CSA_Q4;
    hdr.reply_que_id  = AWA_Q3;
    hdr.data_len      = event_data_len;
	
	//
    ret_val = EosCreateAndSendEvent(
                    AWA_TH3,
                    hdr.dest_que_id,
                    hdr,
                    event_data,
                    hdr.data_len);
     return ret_val;
  }

/*
======================================================================
	Class Name: PersonalStatisticsThread_c
	Description: acc web agent personal staticstics  work thread
	Author: Shaul Waller
======================================================================
*/

PersonalStatisticsThread_c *PST = NULL;
//============================ [ctor PersonalStatisticsThread_c] ====
	PersonalStatisticsThread_c::PersonalStatisticsThread_c()
	{
		PST = this;
	}

//============================ [dtor ~PersonalStatisticsThread_c] ===
	PersonalStatisticsThread_c::~PersonalStatisticsThread_c()
	{
	}

//============================ [Init] ===============================
	RetCode_t PersonalStatisticsThread_c::Init()
	{
		return BSWRC_OK;
	}
//============================ [Terminate] ==========================
	RetCode_t PersonalStatisticsThread_c::Terminate()
	{
		return BSWRC_OK;
	}
//============================ [SetPreoper] =========================
	void PersonalStatisticsThread_c::SetPreoper()
	{
	}
//============================ [IsPreoperDone] =======================
	Bool_t PersonalStatisticsThread_c::IsPreoperDone() const
	{
		return true;
	}
//============================ [SetOperational] ======================
	void PersonalStatisticsThread_c::SetOperational()
	{
	}

/*-----------------------[ RegisterAgent ]------------------------------------*/
// occurs each agent logon
void personal_statistics_req(Ulong_t agent_id)
{
	NLA_CSA_001 nlaCsa1;
	nlaCsa1.entity_id = agent_id;
	nlaCsa1.refresh_interval = 0;
	my_print(6,"personal_statistics_req (CSA_Q4)  ==> send %s to CSA_Q4, agent id: %d\n", (char *) "NLA_CSA_personal_statistics_req",agent_id);
	sendEventToCsi((CcnOpCode_t) NLA_CSA_personal_statistics_req,(Byte_t *) &nlaCsa1.entity_id,sizeof(NLA_CSA_001));
}	

AgentDbInfo_c *AGENTINFOfind(Ulong_t agent_id);

/*-----------------------[ HandleEosMessage ]---------------------------------*/
void SendPersonalStatistics(char * ev_data);
void SendPersonalStatisticsGrp(char * ev_data);
//
void PersonalStatisticsThread_c::HandleEosMessage(	EosOpCode_t        op_code,
													EosEventHeader_t&  ev_hdr,
													Ushort_t           ev_len,
													void              *ev_data)
{
  RetCode_t  rc = BSWRC_OK;

  switch (op_code )
  {
	  
	 case CSA_NLA_soft_params_event:
	 {
	    NlaSoftParams_t *softparam = ( NlaSoftParams_t *) ev_data;
		my_print(0,"CSA_NLA_soft_params_event==> max_agents: %d\n", softparam->max_agents);
	 }
	 break;
	 //
	 case CSA_NLA_agent_logged_in_minimal_info_event:

	 {
		 CSA_NLA_minimal_logged_in_event_t *logged_in = (CSA_NLA_minimal_logged_in_event_t *)  ev_data;
		 GRP_MAP_IT it = grp_db.find(logged_in->group_id);
		 my_print(0,"PST::HandleEosMessage ==> group logged in , agent no: %s ,group name: %s\n",logged_in->agent_info.agent_num,it->second.m_GrpName); 
	 }
	 break;
	 case CSA_NLA_agent_logged_out_minimal_info_event:
	 {
		CSA_NLA_logged_out_event_t *loggedout = (CSA_NLA_logged_out_event_t *) ev_data;
		AgentDbInfo_c *AGT =  AGENTINFOfind(loggedout->agent_data_base_id);
		if (AGT != NULL)
		{
			GRP_MAP_IT it = grp_db.find(loggedout->group_id);
			my_print(3,"PST::HandleEosMessage ==> loggedout, agent no: %s ,group name: %s\n",AGT->m_Number,it->second.m_GrpName); 
		}
		
	 }
	 //
	 case CSA_NLA_personal_statistics_event:
	 {
		 
		 my_print(3,"PST::HandleEosMessage ==> %s\n", (char *) ev_data);
		 SendPersonalStatistics((char *) ev_data);
	 break;
		
	 }
	 case CSA_NLA_group_statistics_event:
		 my_print(6,"PST::HandleEosMessage ==> %s\n", (char *) ev_data);
		 SendPersonalStatisticsGrp((char *) ev_data);
 	 break;
 
	default: 
	  my_print(0,"PST::HandleEosMessage ==> get opcode %d / %s,\n",op_code, getEventStr(op_code).c_str());
	 GetLog() << "PersonalStatisticsThread_c::HandleEosMessage opcode: "<< op_code << "\n"  << LOG_TERMINATOR;
	break;
  }

}
//============================ [SetOperational] ======================
	void PersonalStatisticsThread_c::OnIdle()
	{
		personal_statistics_req(0xFFFFFFFF);
	}	




