//
// PROJECT & ID  : SBC Solutions
// FILE NAME     : sbc_timer.h
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
#ifndef SBC_TIMER_H
#define SBC_TIMER_H

//==========================[ Interface Dependencies ]================
#include <er_std_override.h>
#include <memory.h>
#include <bswtimer.h>
#include "lrl_le_defs.h"
#include <mgen_iddgen.h>
#include <dbi_resultset.h>
#include <string>
#include <map>
#include <vector>
using namespace std;
#include <time.h>
#define NAME_SIZEX 256
struct Groups
{
	int    m_grp_id;
	bool   m_primary;
};
struct REPORT
{
	REPORT() {m_Code1 = -1;m_Code2 = -1;m_CallId = 0xFFFFFFFF; m_IsAcd = "N";m_SessionId = ""; m_ClientId=-1; m_Done = false;}
	string m_Action;
	string m_DetailedAction;
	string m_MoreDetail;
	string m_DevId;
	string m_CallingCalledDevId;
	string m_JoiningCalledDevId;
	string m_OriginalCalledDevId;
	string m_LastRedirectDevId;
	Ulong_t m_CallId;
	int    m_Code1;
	int    m_Code2;
	string   m_IsAcd;
	int    m_ClientId;
	string m_SessionId;
	bool   m_Done;
	vector<Groups> m_Groups;
};

class AgentDbInfo_c {
public:
	AgentDbInfo_c() 
	{
        m_Sup = 0;
		m_SmClientId  = -1;
		m_AgentWSid = -1;
		m_SessionId = "";
		m_Agent_id = 0;
		m_TimeInState = 0;
		m_StateCode = 0;
		m_PrevStateCode = 0;
		m_TempExtension = "";
		m_Extenstion = "";
		m_ReasonCode = "";
		memset(m_Name,0,sizeof(char[NAME_SIZEX+1]));
		memset(m_Number,0,AGENT_NUM_DIGITS+1);
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
	}
	bool      m_isLogin;
	Ulong_t   m_Sup;
	Ulong_t   m_SmClientId;
    Ulong_t	  m_Agent_id;   //Db Id
	Ulong_t   m_Cos_Id;
    char	  m_Name[NAME_SIZEX+1];
	char 	  m_Number[AGENT_NUM_DIGITS+1];
	string    m_Extenstion;
	string    m_TempExtension;
	int		  m_StateCode; // in WFM up to 3 digits
	int		  m_PrevStateCode; // in WFM up to 3 digits
	int       m_TimeInState;
	string    m_ReasonCode;
	time_t    m_StartStateTime;
	bool      m_Changed;
	int 	  m_AgentWSid;
	string    m_SessionId;
	bool m_allready_confirmed;
	string    m_primary_groups;
	time_t    m_LastKeeAliveTime;
	char      m_Pass[NAME_SIZEX+1];
	string    m_PhonbookPart;
	string    m_EtasiniPart;
	string    m_Ip;
	vector<REPORT> m_report;
};
typedef std::map<Ulong_t,AgentDbInfo_c> AGENTINFO_MAP;
typedef AGENTINFO_MAP::iterator AGENTINFO_MAP_IT;
//
class COS_c {
 public:
	COS_c(){m_CosStr = "";};
 
    void SetId(Ulong_t cos_id){ m_cos_id = cos_id; }
    void SetCOSMembers( ResultSet_c  cos_rs )
	{
		  m_cos_info.m_cos_id = m_cos_id;
		  // Get the cos_name from the DBI
		  cos_rs.GetStringByName("cos_name",m_cos_name);
		  cos_rs.GetBoolByName("acd_pickup_from_queue",m_cos_info.m_acd_pickup_from_queue);
		  cos_rs.GetBoolByName("acd_specific_login",m_cos_info.m_acd_specific_login);
		  cos_rs.GetBoolByName("disp_change_toolbar_layout",m_cos_info.m_disp_change_toolbar_layout);
		  cos_rs.GetBoolByName("disp_change_windows_layout",m_cos_info.m_disp_change_windows_layout);
		  cos_rs.GetBoolByName("call_status_window",m_cos_info.m_disp_win_call_status);
		  cos_rs.GetBoolByName("acd_call_window",m_cos_info.m_disp_win_acd_call);
		  cos_rs.GetBoolByName("calls_log_window",m_cos_info.m_disp_win_calls_log);
		  cos_rs.GetBoolByName("setup_window",m_cos_info.m_disp_win_setup);
		  cos_rs.GetBoolByName("telephony_window",m_cos_info.m_disp_win_telephony);
		  cos_rs.GetBoolByName("agentboard_window",m_cos_info.m_disp_win_agentboard);
		  cos_rs.GetBoolByName("chat_tree_window",m_cos_info.m_disp_win_chat_tree);
		  cos_rs.GetBoolByName("enable_dde4outgoing",m_cos_info.m_enable_dde_for_outgoing);
		  m_CosStr = "";
		  char cos_str[200];
		  sprintf(&cos_str[0],"%s|%d|%d|%d|%d|%d|%d|%d|%d|%d|%d|%d|%d|",
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

    ClassOfService_s  GetCOSInfo(){ return m_cos_info; }

    // avoid assignment operator

    Ulong_t           m_cos_id;
    char              m_cos_name[NAME_LENGTH];
    ClassOfService_s  m_cos_info;
	string 			  m_CosStr;

}; // class COS_c
typedef std::map<Ulong_t, COS_c *> COS_MAP;
typedef COS_MAP::iterator COS_MAP_IT;
//SELECT rc_id, rc_shortname,rc_name, rc_number FROM `release_codes`;

///====================================================================

//SELECT srv_id, srv_name FROM `services`;
class Srvss_c
{
public:
	Srvss_c()
	{
		m_SrvId = -1;
		m_SrvName[0] = 0;
	}
	Ulong_t  	m_SrvId;
	char 		m_SrvName[NAME_SIZEX+1];
};
typedef std::map<Ulong_t,Srvss_c> SRV_MAP;
typedef SRV_MAP::iterator SRV_MAP_IT;
//
class Diallist_c
{
public:
	Diallist_c()
	{
		m_DlId = -1;
		m_DlName = "";
	}
	Ulong_t  	m_DlId;
	string 		m_DlName;
};
typedef std::map<string,Diallist_c> DL_MAP;
typedef DL_MAP::iterator DL_MAP_IT;
//
//
//SELECT group_id, g_name  FROM `grp`;
class Groups_c
{
public:
	Groups_c()
	{
		m_GrpId = -1;
		m_GrpName[0] = 0;
		m_on = false;
	}
	Ulong_t  	m_GrpId;
	bool   m_on;
	char 		m_GrpName[NAME_SIZEX+1];
};
typedef std::map<Ulong_t,Groups_c> GRP_MAP;
typedef GRP_MAP::iterator GRP_MAP_IT;

//SELECT cp_id, cp_name FROM `ccs_call_profiles`;
class Cp_c
{
public:
	Cp_c()
	{
		m_CPId = -1;
		m_CPName = "";
	}
	Ulong_t  	m_CPId;
	string 		m_CPName;
};
typedef std::map<Ulong_t,Cp_c> CP_MAP;
typedef CP_MAP::iterator CP_MAP_IT;

//SELECT w_name, w_number FROM `wu_code`;
class WrapUpCodes_c
{
public:
	WrapUpCodes_c()
	{
		m_WUId = -1;
		m_WUName[0] = 0;
	}
	Ulong_t  	m_WUId;
	char 		m_WUName[NAME_SIZEX+1];
};
typedef std::map<Ulong_t,WrapUpCodes_c> WU_MAP;
typedef WU_MAP::iterator WU_MAP_IT;


//SELECT rc_id, rc_shortname,rc_name, rc_number FROM `release_codes`;
class ReleaseCodes_c
{
public:
	ReleaseCodes_c()
	{
		m_RCId = -1;
		m_RCName[0] = 0;
	}
	Ulong_t  	m_RCId;
	char 		m_RCName[NAME_SIZEX+1];
};
typedef std::map<Ulong_t,ReleaseCodes_c> RC_MAP;
typedef RC_MAP::iterator RC_MAP_IT;





/*==========================[ Defines ]==================================*/
#define REGISTER_RETRY	5000

_USING_BSW

//==========================[ Constants & Macros ]====================

//==========================[ Types and Data structures ]=============



//==========================[ Classes ]===============================

/*
======================================================================
	Class Name: SbcTimer_c

	Description:

	Author: Eli Shmueli

======================================================================
*/

class SbcTimer_c : public BswTimer_c
{
public:
	SbcTimer_c(Ushort_t type);
	SbcTimer_c(){}
	void InitPtr();

	void OnTimer();
	bool IsOn(){
		return isTicking;
	}

	void setTicking(bool ticking){
		isTicking = ticking;
	}

	enum {
		  CONNECT_AGAIN,
		  CONNECTED
	};
public:
	BaseCrmType *m_CrmObject;
//SendFormat_t  m_send_format;

private:
	Ushort_t m_type;
	bool isTicking;
};

#endif

