// FILE NAME     : sbc_work_thread.cpp
// -----------------------------------------------------------------------
//==========================[ Interface Dependencies ]================
#ifdef WIN32
#pragma warning(disable:4786)
#endif
// Infrastructure
#include <er_std_override.h>
#include <sollib.h>
#include <errno.h>
#include <bswlog.h>
#include <proj_gen.h>
#include <dbi_statement.h>
#include <dbi_resultset.h>
#include <dbi_dbmanager.h>
#include "crmalltypes.h"
#include <bswcritsection.h>
#include "acc_personal_stataistics_work_thread.h"
#include "sbc_work_thread.h"
#include <map>
#include "base64.h"
#include "ivr_ivrserveriface.h"
#include "accapi_entities.h"
#include "lrl_le_defs.h"
#include <bswinifile.h>
extern "C"
{
  #include <smntrapi.h>
}

map<string,int> *webServerClient = new map<string,int>();

int Split(char *source, std::vector<string> &dest ,char *search);
string GetRequesfromQueue(void);
extern vector<string> RecieveQueu;

extern PersonalStatisticsThread_c *PST;

#include <sea_provider.h>
void my_print_init(char *fnm);
void my_print(int level,const char* fmt, ...);
SbcWorkThread_c *SWT = NULL;
//====================================================================
string customerName = "";
string customerJsonfnm = "";
string customerJsonTxt = "";


//====================================================================
static SeaProvider_c& sea_provider = SeaProvider_c::GetSeaProvider();
static Ulong_t requestid = 1;
enum
{
	API_AGENTDETAILS 		= 0,
	API_LOGIN		 		= 1, //-->ConfirmWebAgent
	API_LOGON		 		= 2, //-->LogonPrimaryGroups
	API_LOGOUT		 		= 3, //-->LogoutPrimaryGroups
	API_LOGINGROUP = 4,
	API_LOGOUTGROUP	 		= 5,
	API_RELEASE		 		= 6,
	API_RESUME		 		= 7,
	API_MAKECALL			= 8,
	API_ANSWERCALL			= 9,
	API_DISCONNECT			= 10,
	API_HOLD				= 11,
	API_RETRIEVE			= 12,
	API_SINGLESTEPTRANSFER	= 13,
	API_STARTTRANSFER		= 14,
	API_COMPLETETRANSFER	= 15,
	API_STARTCONFERNCE		= 16,
	API_COMPLETECONFERENCE	= 17,
	API_DIVERTCALL			= 18,
	API_ALTERNANTECALL		= 19,
	API_RECONNECTHELDCALL	= 20,
	API_SWAPCALL			= 21,
	API_BARGIN				= 22,
	API_SILENTMONITOR		= 23,
	API_STARTRECORDING		= 24,
	API_SETAGENTSTATE		= 25,
	API_WRAPUP				= 26,
	API_SERVICES			= 60,
	API_GROUPS				= 61,
	API_CALLPROFILES		= 62,
	API_WRAPUPCODES			= 63,
	API_REASECODES			= 64,
	API_LOGOFFALL			= 65,
	API_QUERYAGENTCALLS		= 66,
	API_GETETAS				= 67,
	API_SAVEETAS			= 68,
	API_LOGOFF 				= 69,
	API_SAVEETASINI 		= 70,
	API_SETWRAPUPCODE		= 71,
	API_SETMANUELWRAPUP		= 72,
	API_GETGROUPQUEUEINFO	= 73,
	API_GETGROUPQUEUECPINFO	= 74,
	API_ACDPICKUPCALL		= 75,
	API_KEEPALIVE			= 76,
	API_STOPRECORDING		= 77,
    API_SAVEPHONEBOOK       = 78,
	API_AGENTLOG			= 79,
	API_SAVEETASPART		= 80,
	API_SAVEPHONEBOOKPART  	= 81,
	API_GETPERSONALSTATISTICS = 82,	
	
};
struct opertaion
{
	string m_ActionStr;
	int    m_ActionCode;
};
opertaion OPR[200] =
{
	{"getallagentsdetails",	API_AGENTDETAILS},
	{"login",				API_LOGIN},
	{"logon",				API_LOGON},
	{"logout",				API_LOGOUT},
	{ "logingroup",			API_LOGINGROUP },
	{"logoutgroup",			API_LOGOUTGROUP},
	{"release",				API_RELEASE},
	{"resume",				API_RESUME},
	{"makecall",			API_MAKECALL},
	{"answercall",			API_ANSWERCALL},
	{"disconnectcall",		API_DISCONNECT},
	{"holdcall",			API_HOLD},
	{"retrievecall",		API_RETRIEVE},
	{"singlesteptransfer",	API_SINGLESTEPTRANSFER},
	{"starttransfer",		API_STARTTRANSFER},
	{"completetransfer",	API_COMPLETETRANSFER},
	{"startconference",		API_STARTCONFERNCE},
	{"completeconference",	API_COMPLETECONFERENCE},
	{"divertcall",			API_DIVERTCALL},
	{"alternatecall",		API_ALTERNANTECALL},
	{"reconnnectheldcall",	API_RECONNECTHELDCALL},
	{"swapcall",			API_SWAPCALL},
	{"bargin",				API_BARGIN},
	{"silentmonitor",		API_SILENTMONITOR},
	{"startrecording",		API_STARTRECORDING},
	{"setagentstate",		API_SETAGENTSTATE},
	{"wrapup",				API_WRAPUP},
	{"getservices",			API_SERVICES},
	{"getgroups",			API_GROUPS},
	{"getcallprofiles",		API_CALLPROFILES},
	{"getwrapupcodes",		API_WRAPUPCODES},
	{"getreleasecodes",		API_REASECODES},
	{"LogOffAllAgents",		API_LOGOFFALL},
	{"QueryAgentCalls",		API_QUERYAGENTCALLS},
	{"getetas",             API_GETETAS},
	{"getetas",             API_SAVEETAS},
	{"logoff",              API_LOGOFF},
	{"saveetasini", 		API_SAVEETASINI},
	{"setwrapupcode",		API_SETWRAPUPCODE},
	{"setManuelwrapup", 	API_SETMANUELWRAPUP},
	{"getGroupQueueInfo",	API_GETGROUPQUEUEINFO},
	{"getGroupQueueCPInfo",	API_GETGROUPQUEUECPINFO},
	{"PickupCall", 			API_ACDPICKUPCALL},
	{"keepalive", 			API_KEEPALIVE},
	{"stoprecording",		API_STOPRECORDING},
    {"savephonebook",       API_SAVEPHONEBOOK},
	{"__agentLog",			API_AGENTLOG},
	{"saveetasini*", 		API_SAVEETASPART},
	{"savephonebook*", 		API_SAVEPHONEBOOKPART},
  {"getPersonalStatistics", API_GETPERSONALSTATISTICS},
	
	{"",999}
};
static int getActionCode(string action)
{
	for (int i = 0; i < 200;++i)
	{
		if (OPR[i].m_ActionCode == 999)
		{
			return -1;
		}
		if (action == OPR[i].m_ActionStr)
		{
			return OPR[i].m_ActionCode;
		}
	}
	return -1;
}
//===================================================

AGENTINFO_MAP agents_db;
SRV_MAP srv_db;
GRP_MAP grp_db;
CP_MAP  cp_db;
WU_MAP  wu_db;
RC_MAP  rc_db;
COS_MAP cos_db;

BswCritSection_c AGENTINFO_MUTEX;

//===============================[AGENTINFOfind]======================================
AgentDbInfo_c *AGENTINFOfind(Ulong_t agent_id)
{
	AgentDbInfo_c *ADI = NULL;
	AGENTINFO_MAP_IT it;
	AGENTINFO_MUTEX.Lock();
	//
	it = agents_db.find(agent_id);
	if (it != agents_db.end())
	{
		 ADI = &it->second;
	}
	AGENTINFO_MUTEX.Unlock();

	return ADI;
}
//==============================[AGENTINFOfindByExtension]==================================
string AGENTINFOfindByExtension(string extension,string agent_no)
{
   	AGENTINFO_MUTEX.Lock();

    AgentDbInfo_c *ADI = NULL;
	string name = "";
	AGENTINFO_MAP_IT it = agents_db.begin();
	for (it ; it != agents_db.end(); ++it)
	{
		ADI = &(*it).second;
		if (ADI->m_allready_confirmed == true && extension == ADI->m_Extenstion)
		{
			name = &ADI->m_Name[0];
			break;
		}
	}
   	AGENTINFO_MUTEX.Unlock();
	
	return name;
}

//==============================[ PrepareDeniedDetails ]===========================
void PrepareDeniedDetails(Ushort_t cause,AgentDbInfo_c *ADI,string ext,REPORT &report)
{
  string s;	
  switch (cause)
  {
	case SAME_AGENT_LOGGED_IN_TO_ANOTHER_STATION:  
	case LOGGED_ON_TO_ANOTHER_EXT: // Logged on to another extension, get the extension it logged to
		my_print(0,"PrepareDeniedDetails-> agent: %s, Logged on to another extension %s, try to Log to ext: %s\n",ADI->m_Name, ADI->m_TempExtension.c_str(),ext.c_str());
		ADI->m_Extenstion = ADI->m_TempExtension;
		report.m_MoreDetail =  (char *) "prevext:" + ADI->m_TempExtension + (char *) ";ext:" + ext;
	break;
	//
    case AGENT_ALREADY_LOGGED_AT_LRL: //Same agent logged in on same extension - logoff
		my_print(0,"PrepareDeniedDetails-> agent: %s, Logged on to same extension %s\n",s.c_str(), ext.c_str());

    break;
    //
	case EXTENSION_IS_ALREADY_IN_USE_BY_AGENT:
		s = AGENTINFOfindByExtension(ext,&ADI->m_Number[0]);
		my_print(0,"PrepareDeniedDetails-> agent: %s, Extension already in use %s\n",s.c_str(), ext.c_str());
		report.m_MoreDetail =  (char *) "agt:" + s  +  (char *) ";ext:" + ext;
	break;
    default :break;
  }
}
//==============================[ SendPersonalStatistics ]=================================
void SendPersonalStatistics(char * ev_data)
{
	vector<string> v;
	int count = Split(ev_data, v ,(char *) "|");
	if (count < 10)
	{
		my_print(0,"SendPersonalStatistics wrong data: %s\n",ev_data);
		return;
	}
	Ulong_t id = atoi(v[1].c_str());
	AgentDbInfo_c *ADI = AGENTINFOfind(id);
	if (ADI == NULL)
	{
		my_print(0,"SendPersonalStatistics can't find agent id : %s\n",v[1].c_str());
		return;
	}
    REPORT report;
	report.m_DevId = ev_data;
	ADI->m_StartStateTime = time(0);
	ADI->m_Changed = true;
	report.m_ClientId = ADI->m_AgentWSid;
	report.m_SessionId =  ADI->m_SessionId;
	report.m_Action = "__personalStatistics";
	ADI->m_report.push_back(report);
}
//
//==============================[ SendPersonalStatisticsGrp ]=================================
void SendPersonalStatisticsGrp(char * ev_data)
{
	AGENTINFO_MAP_IT it;
  	AGENTINFO_MUTEX.Lock();
    for (it = agents_db.begin(); it != agents_db.end(); ++it)
    {
      AgentDbInfo_c *ADI = &(it->second);
      if (ADI->m_allready_confirmed == true)
      {
		REPORT report;
		report.m_DevId = ev_data;
		ADI->m_StartStateTime = time(0);
		ADI->m_Changed = true;
		report.m_ClientId = ADI->m_AgentWSid;
		report.m_SessionId =  ADI->m_SessionId;
		report.m_Action = "__personalGrpStatistics";
		ADI->m_report.push_back(report);
	  }
   }
   AGENTINFO_MUTEX.Unlock();
}
//==============================[ CheckKeepAlive ]=================================
int CheckKeepAlive(SbcWorkThread_c *SWT,int keepalive_check_intreval, int keepalive_timeout)
{
  AGENTINFO_MAP_IT it;
  while (1)
  {
    time_t ttt = time(0);
    //my_print(0,"CheckKeepAlive ttt %d\n", ttt);
   	AGENTINFO_MUTEX.Lock();
    for (it = agents_db.begin(); it != agents_db.end(); ++it)
    {
      AgentDbInfo_c &ADI = it->second;
      if (ADI.m_allready_confirmed == true)
      {
        {
          int diff = ttt - ADI.m_LastKeeAliveTime;
          //2019-06-19 AlisherM & Shaul BZ#50087: check if time values are valid
          if ((ADI.m_LastKeeAliveTime < 1560950842) || (ttt < 1560950842))
          {
            my_print(0,"CheckKeepAlive WARNING: agent %s, sessionid %s, diff %d, keepalive_check_intreval %d, keepalive_timeout %d, ttt %d, m_LastKeeAliveTime %d\n", &ADI.m_Number[0], ADI.m_SessionId.c_str(), diff, keepalive_check_intreval, keepalive_timeout, ttt, ADI.m_LastKeeAliveTime);
          }

          //2019-06-19 AlisherM & Shaul BZ#50088: print warning message every 30-60-90 sec, and force logoff after 120 sec
          if (diff > keepalive_timeout)
          {
            my_print(0,"CheckKeepAlive WARNING: agent %s, sessionid %s, diff %d > keepalive_timeout %d, force logoff agent due to keepalive timeout, sending agentDenied, ttt %d, m_LastKeeAliveTime %d\n", &ADI.m_Number[0], ADI.m_SessionId.c_str(), diff, keepalive_timeout, ttt, ADI.m_LastKeeAliveTime);
            //sea_provider.LogoutAgent(requestid++,ADI.m_Agent_id);
            SWT->agentDisconnect(&ADI,true);
            REPORT report;
            // try to logon to other extension and denied for some reason
            report.m_Action = "agentDenied";	
            report.m_CallingCalledDevId = ADI.m_Extenstion;				
            report.m_Code1 = 16;
            SWT->m_sea_reply.UpdateAgentDbInfo(ADI.m_Number,WFM::Login,report,ADI.m_AgentWSid, ADI.m_SessionId);
            //sendResponse(ADI.m_AgentWSid,"KEEPALIVE CHECK");
          }
          else if (diff > keepalive_check_intreval)
          {
            my_print(0,"CheckKeepAlive WARNING: agent %s, sessionid %s, diff %d > keepalive_check_intreval %d, ttt %d, m_LastKeeAliveTime %d\n", &ADI.m_Number[0], &ADI.m_SessionId[0], diff, keepalive_check_intreval, ttt, ADI.m_LastKeeAliveTime);
          }
        }
      }
    }
 	AGENTINFO_MUTEX.Unlock();
    Sleep(keepalive_check_intreval * 1000);
  }
  return 0;
}
//==============================[getClassOfServiceById]=================================
string getClassOfServiceById(Ulong_t cosid)
{
	string cosStr = "";
	COS_c *cos = NULL;
	COS_MAP_IT it;
	
	AGENTINFO_MUTEX.Lock();
	it = cos_db.find(cosid);
	if (it != cos_db.end())
	{
		 cos = it->second;
		 cosStr =  cos->m_CosStr;
	}
	AGENTINFO_MUTEX.Unlock();
	my_print(0,"getClassOfServiceById, cos-id: %d, %s\n",cosid, cosStr.c_str());
	return cosStr;
}
//==============================[ strncmpiX ]
int strncmpiX(const char *str1, const char *str2, int n)
{
	if (!str1 || !str2)
    {
        SetLastError(ERROR_INVALID_PARAMETER);
        return -1;
    }
    if (n  != (int) strlen(str2))
    {
      return -1;
    }
	//n = min(min(n, (int) strlen(str1)), (int) strlen(str2));

	for (int i = 0; i < n; ++i)
    {
        int ret = tolower(*str1) - tolower(*str2);
        if (ret) return ret;
        str1++;
        str2++;
    }
	return 0;
}
//==============================[AGENTINFOfindByAgenNumber]==========================================
AgentDbInfo_c *AGENTINFOfindByAgentName(string agent_name)
{
	vector<string> splited;
	int count = Split((char *) agent_name.c_str(), splited ,(char *) "@");
	if (splited.size() < 1) return NULL;
	AGENTINFO_MAP_IT it = agents_db.begin();
	int x;
	for (it ; it != agents_db.end(); ++it)
	{
		AgentDbInfo_c &ADI = (*it).second;
		x = strncmpiX(splited[0].c_str(), &(ADI.m_Name[0]), (int) splited[0].length());
		if (x == 0)
		{
			return &ADI;
		}
		if (agent_name == &ADI.m_Number[0])
		{
			return &ADI;
		}
	}
	return NULL;
}
//==============================[AGENTINFOfindByAgenNumber]==========================================
AgentDbInfo_c *AGENTINFOfindByAgenNumber(string agent_no)
{
   	AGENTINFO_MUTEX.Lock();

    SWT->m_IsSSOfreeSseating = FALSE;
    SWT->m_IsSSO = FALSE;
    if(EosHAGetSSOStatus() == EOS_HA_SSO_ENABLE) SWT->m_IsSSO = TRUE;
    //
    if(EosHAGetSSOFreeSeating() == EOS_HA_SSO_ENABLE) SWT->m_IsSSOfreeSseating = TRUE;
    //
    if (SWT->m_IsSSO == TRUE)
    {
      	AGENTINFO_MUTEX.Unlock();
      return AGENTINFOfindByAgentName(agent_no);
    }
    AgentDbInfo_c *ADI = NULL,*A;
	AGENTINFO_MAP_IT it = agents_db.begin();
	for (it ; it != agents_db.end(); ++it)
	{
		A = &(*it).second;
		if (agent_no == &A->m_Number[0])
		{
			ADI = A;
			break;
		}
	}
   	AGENTINFO_MUTEX.Unlock();
	return ADI;
}
//
//===============================[AgentExists ]======================================
int AgentExists(string agent_no,int clientId, string sessionId,string action)
{
	AgentDbInfo_c *ADI  = AGENTINFOfindByAgenNumber(agent_no);

	if (ADI != NULL) 
	{
		ADI->m_LastKeeAliveTime = time(0);
		if (action == "Logon")
	{
		(*ADI).m_AgentWSid = clientId;
		(*ADI).m_SessionId = sessionId;
	}
		return 0;
	}
	else
	{
		return -1;//agent not exists
	}

}

//===============================[AGENTINFOerase]======================================
void AGENTINFOerase(Ulong_t agent_id)
{
	AGENTINFO_MAP_IT it;
	AGENTINFO_MUTEX.Lock();
	it = agents_db.find(agent_id);
	
	if (it != agents_db.end())
	{
		if (it->second.m_allready_confirmed == true) // not logged in
		{
				it->second.m_allready_confirmed = false;
				REPORT report;
				report.m_Code1 = 19; // agent not exists any more
				report.m_Action = "forcedLogoff";
				string ext = it->second.m_Extenstion;
				SWT->m_sea_reply.UpdateAgentDbInfo(it->second.m_Number,WFM::Login,report,it->second.m_AgentWSid, it->second.m_SessionId);
		}
		else
		{
			agents_db.erase(it);
		}
	}
	AGENTINFO_MUTEX.Unlock();
}
void AGENTINFOinsert(Ulong_t agent_id,AgentDbInfo_c *ADI)
{
	AGENTINFO_MUTEX.Lock();
	agents_db[agent_id] = *ADI;
	AGENTINFO_MUTEX.Unlock();
}
#define SEC_WEB_AGENT                         "WEB-AGENT"
#define VAL_PORT                              "Port"
#define VAL_PORT_DEFAULT                      9275
#define VAL_KEEPALIVE_CHECK_INTERVAL          "KeepAliveCheckInterval"
#define VAL_KEEPALIVE_CHECK_INTERVAL_DEFAULT  30
#define VAL_KEEPALIVE_TIMEOUT                 "KeepAliveTimeout"
#define VAL_KEEPALIVE_TIMEOUT_DEFAULT         600
 //===============================[GetMoreParamsFromSoftParam]========================
// get statiscis flag and number of online threads from soft_param
void     GetMoreParamsFromSoftParam(string &ip_Address,int *portNo,int *keepalive_check_intreval,int *keepalive_timeout,string &crmCode)
{
  crmCode =  "Acc Web Agent";
  ip_Address = "127.0.0.1";
  BswIniFile_c iniFile("../Registry.ini");
  *portNo = iniFile.GetInt(SEC_WEB_AGENT, VAL_PORT, VAL_PORT_DEFAULT);
  *keepalive_check_intreval = iniFile.GetInt(SEC_WEB_AGENT, VAL_KEEPALIVE_CHECK_INTERVAL, VAL_KEEPALIVE_CHECK_INTERVAL_DEFAULT);
  *keepalive_timeout = iniFile.GetInt(SEC_WEB_AGENT, VAL_KEEPALIVE_TIMEOUT, VAL_KEEPALIVE_TIMEOUT_DEFAULT);
  my_print(0,"++++ accapi params:  ip address: %s, %s %d, %s %d, %s %d, CRM type: %s +++\n", ip_Address.c_str(), VAL_PORT, *portNo, VAL_KEEPALIVE_CHECK_INTERVAL, *keepalive_check_intreval, VAL_KEEPALIVE_TIMEOUT, *keepalive_timeout ,crmCode.c_str());
  //
  // get customer parameters
  char a[256];
  BswIniFile_c iniFile1("../Agents/customer.ini");
  Ulong_t u =  iniFile1.GetString("CUSTOMER-DETAILS", "Customername", "\0", &a[0], sizeof(a));
  if (u != 0) customerName = a;

  u =  iniFile1.GetString("CUSTOMER-DETAILS", "Path", "\0", &a[0], sizeof(a));
  if (u != 0) 
  {
	  customerJsonfnm = a;
   }
  my_print(0,"Customer details: name: %s, path: %s\n", customerName.c_str(), customerJsonfnm.c_str());

  return;// string(&ipAddress[0]);
}
//============================[getDialList]====================================
DL_MAP dl_map;
void getDialList()
{
  DBManager_c db_manager1;	
  Statement_c  diallist_st;
  diallist_st.SetQuery("select dl_id, dl_name from dial_lists");
  ResultSet_c  dl_rs;
  RetCode_t    executionResult;
  Ulong_t      dl_counter = 0;
  bool         complete_init_dl = true;
  //
  RetCode_t rc = db_manager1.ExecuteSelectSyn(diallist_st,dl_rs,executionResult);
    while ( dl_rs.Next() )
  {
	char name[NAME_SIZEX+1];  
	Diallist_c  *dl = new Diallist_c();
	dl_rs.GetUlongByName("dl_id",dl->m_DlId); // Get the dl_id from the DBI
	dl_rs.GetStringByName("dl_name",&name[0]);
	dl->m_DlName = &name[0];
	dl_map[dl->m_DlName] = *dl;
	my_print(0,"getDialList()==> id: %d, name: %s\n",dl->m_DlId,dl->m_DlName.c_str());
	dl_counter++;
  }
}
//============================[getCOSTableFromDB]====================================
//184, '', 'select * from classes_of_service', '', ''
//185, '', 'select * from classes_of_service where cos_id = %1', '', ''

void getCOSTableFromDB()
{
  DBManager_c db_manager1;	
  Statement_c  cos_st;
  cos_st.SetQuery("select * from classes_of_service");
  ResultSet_c  cos_rs;
  RetCode_t    executionResult;
  Ulong_t      cos_counter = 0;
  bool         complete_init_cos = true;

  cos_db.clear();
  
  RetCode_t rc = db_manager1.ExecuteSelectSyn(cos_st,cos_rs,executionResult);

  while ( cos_rs.Next() )
  {
	COS_c  *cos = new COS_c();
	Ulong_t cos_id;
	cos_rs.GetUlongByName("cos_id",cos_id); // Get the cos_id from the DBI
	cos->SetCOSMembers(cos_rs);
	my_print(0,"getCOSTableFromDB, %s, %s\n", cos->m_cos_name,cos->m_CosStr.c_str());
	cos_db[cos_id] = cos;
	cos_counter++;
  }
}
  //========================[GetAgentGroups]===================================
void GetAgentGroups(AgentDbInfo_c *ADI)
{
	//SELECT * FROM grp_agent g where agent_id = 1;
	Statement_c st;
	ResultSet_c rs;
	rs.clear();
	char q[120];
	sprintf(&q[0],"SELECT agent_id,group_id FROM grp_agent where agent_id = %d",ADI->m_Agent_id);
	st.SetQuery(q);
	bool brc;
	DBManager_c dbi_mngr;
	RetCode_t	executionResult;
	RetCode_t	bswrc = BSWRC_FAIL;
	if (!(dbi_mngr.IsProxyOK()))
	{
		return;
	}
	my_print(0,"GetAgentGroups: query: %s\n", &q[0]);
	Ulong_t group_id ;
	char g[2048]; g[0] = 0;
	
	rs.clear();
	bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);
	//
	while (rs.Next())
	{
		brc = rs.GetUlongByName("group_id",group_id);
		if (brc)
		{
			sprintf(&g[strlen(g)],"%d|",group_id);
		}
	}
	ADI->m_primary_groups = &g[0];
	my_print(0,"GetAgentGroups, agent_no: %s,groups: %s\n",ADI->m_Number, ADI->m_primary_groups.c_str());  
}
//=================================[getsupagents]===========================================

void getsupagents()
{
  DBManager_c db_manager1;	
  Statement_c  cos_st;
 cos_st.SetQuery("select agent_id  FROM sup");
  ResultSet_c  cos_rs;
  RetCode_t    executionResult;
  Ulong_t      cos_counter = 0;
  bool         complete_init_cos = true;
  RetCode_t rc = db_manager1.ExecuteSelectSyn(cos_st,cos_rs,executionResult);

  while ( cos_rs.Next() )
  {
	Ulong_t agent_id;
	cos_rs.GetUlongByName("agent_id",agent_id); // Get the agent_id from the DBI
    my_print(3,"getsupagents, get sup agent  FromDB %d\n", agent_id);

    AgentDbInfo_c *ADI = AGENTINFOfind(agent_id);
    if (ADI != NULL)
    {
      ADI->m_Sup = 1;
	  my_print(0,"getsupagents, found sup agent  FromDB, %s, ADI->m_Sup: %d\n", ADI->m_Number,ADI->m_Sup);
    }
  }
}
//=================================[GetAgentsFromDB]===========================================
void GetAgentsFromDB(bool isChanged)
{
	AGENTINFO_MAP agents_db_temp;
	Statement_c st;
	ResultSet_c rs;
	AgentDbInfo_c	agent_info;
	rs.clear();
	st.SetQuery("SELECT agent_id,a_name,a_number,a_is_logged, cos_id, a_password FROM agent where agent_status = 'a'");
	bool brc;
	char	  temp_flag[2];
	DBManager_c dbi_mngr;
	RetCode_t	executionResult;
	RetCode_t	bswrc = BSWRC_FAIL;

	if (!(dbi_mngr.IsProxyOK()))
	{
		return;
	}
	rs.clear();
	//agents_db.clear();

	bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);

	while (rs.Next())
	{
		brc = rs.GetUlongByName("agent_id",agent_info.m_Agent_id);
		if (brc)
			rs.GetStringByName("a_name",agent_info.m_Name);
		if (brc)
			rs.GetStringByName("a_number",(char*)agent_info.m_Number);
		if (brc)
		{
			brc = rs.GetStringByName("a_is_logged",temp_flag);
		}
		if (brc)
		{
			brc = rs.GetStringByName("a_password",agent_info.m_Pass);
		}
		brc = rs.GetUlongByName("cos_id",agent_info.m_Cos_Id);
		if (brc && agent_info.m_Cos_Id == 1)
		{
			my_print(0,"agent namel %s,cosId: %d\n",  agent_info.m_Name, agent_info.m_Cos_Id);
		}

		agent_info.m_StateCode = WFM::SignOut; // start with signeout
		agent_info.m_Changed = false;
		agents_db[agent_info.m_Agent_id] = agent_info;
	}
	getsupagents();
}
//=================================[GetAgentsFromDB]===========================================
void UpdateAgentsFromDB(Ulong_t id,Commands_e command)
{
	AGENTINFO_MAP agents_db_temp;
	Statement_c st;
	ResultSet_c rs;
	AgentDbInfo_c	agent_info;
	rs.clear();
	char query[200]; query[0] = 0;
	sprintf(&query[0],"SELECT agent_id,a_name,a_number,a_is_logged, cos_id FROM agent where agent_status = 'a' AND agent_id = %d",id);
	st.SetQuery(query);
	bool brc;
	char	  temp_flag[2];
	DBManager_c dbi_mngr;
	RetCode_t	executionResult;
	RetCode_t	bswrc = BSWRC_FAIL;

	if (!(dbi_mngr.IsProxyOK()))
	{
		return;
	}
	rs.clear();
	if (command == CMD_DELETE)
	{
		AGENTINFOerase(id);
		return;
	}
	bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);
	while (rs.Next())
	{
		brc = rs.GetUlongByName("agent_id",agent_info.m_Agent_id);
		brc = rs.GetStringByName("a_name",agent_info.m_Name);
		brc = 	rs.GetStringByName("a_number",(char*)agent_info.m_Number);
		brc = rs.GetStringByName("a_is_logged",temp_flag);
		brc = rs.GetUlongByName("cos_id",agent_info.m_Cos_Id);
		agent_info.m_StateCode = WFM::SignOut; // start with signeout
		agent_info.m_Changed = false;
		AgentDbInfo_c *ADI = AGENTINFOfind(agent_info.m_Agent_id); // old one
		if (ADI != NULL)
		{
			memcpy(&ADI->m_Number[0],&agent_info.m_Number[0],sizeof(agent_info.m_Number));
			memcpy(&ADI->m_Name[0],&agent_info.m_Name[0],sizeof(agent_info.m_Name));
			ADI->m_Cos_Id = agent_info.m_Cos_Id;
			agents_db[ADI->m_Agent_id] = *ADI;
			my_print(0,"UpdateAgentsFromDB, Update agent details no: %s\n", agent_info.m_Number);
		}
		else
		{
			my_print(0,"UpdateAgentsFromDB, add new agent no: %s\n", agent_info.m_Number);
			AGENTINFO_MUTEX.Lock();
			agents_db[agent_info.m_Agent_id] = agent_info; // new one
			AGENTINFO_MUTEX.Unlock();
		}
	}
	getsupagents();
}
//=============================[GetServicesFromDB]==========================================
//SELECT srv_id, srv_name FROM `services`;
void GetServicesFromDB()
{
	Statement_c st;
	ResultSet_c rs;
	Srvss_c	ServiceX;
	rs.clear();
	st.SetQuery("SELECT srv_id, srv_name FROM services");
	bool brc;
	DBManager_c dbi_mngr;
	RetCode_t	executionResult;
	RetCode_t	bswrc = BSWRC_FAIL;

	if (!(dbi_mngr.IsProxyOK()))
	{
		return;
	}
	rs.clear();
	srv_db.clear();

	bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);

	while (rs.Next())
	{
		brc = rs.GetUlongByName("srv_id",ServiceX.m_SrvId);
		if (brc)
			rs.GetStringByName("srv_name",ServiceX.m_SrvName);
		if (brc)
		{
			srv_db[ServiceX.m_SrvId] = ServiceX;
		}
	}
}
//==============================[GetCPFromDB]=========================================
//SELECT cp_id, cp_name FROM `ccs_call_profiles`;
//SELECT * FROM `ccs_call_profiles`
void GetCPFromDB()
{
	Cp_c	CpX;
	DBManager_c dbi_mngr;
	RetCode_t	bswrc = BSWRC_FAIL;
    //20-May-2019 YR BZ#49760
	cp_mngr.ReInitCpFieldMgr();
   CpField_t*  fields_arr_ptr;
    Ulong_t num_of_fields = 0;
    Ulong_t index = 0;
	cp_db.clear();
    num_of_fields = cp_mngr.GetNumberOfFields();

	   if ( num_of_fields > 0 )
	{
	  
      fields_arr_ptr = new CpField_t[ num_of_fields ];
	  CpX.m_CPId = cp_mngr.GetFirstFieldId();
	  CpX.m_CPName = cp_mngr.GetFieldNameViaId(CpX.m_CPId);
	  cp_db[CpX.m_CPId] = CpX;
 
      for ( index = 1 ; index < num_of_fields ; index++ ) 
	  {
        CpX.m_CPId = cp_mngr.GetNextFieldId();
		CpX.m_CPName = cp_mngr.GetFieldNameViaId(CpX.m_CPId);
		cp_db[CpX.m_CPId] = CpX;
 		//printf("id: %d, name: %s\n", CpX.m_CPId,CpX.m_CPName.c_str());
      }
	}
	//
	if (!(dbi_mngr.IsProxyOK()))
	{
		return;
	}
}
//============================[GetGroupsFromDB]===========================================
//SELECT group_id, g_name  FROM `grp`;
void GetGroupsFromDB()
{
	Statement_c st;
	ResultSet_c rs;
	Groups_c	GroupsX;
	rs.clear();
	st.SetQuery("SELECT group_id, g_name  FROM grp");
	bool brc;
	DBManager_c dbi_mngr;
	RetCode_t	executionResult;
	RetCode_t	bswrc = BSWRC_FAIL;

	if (!(dbi_mngr.IsProxyOK()))
	{
		return;
	}
	rs.clear();
	grp_db.clear();

	bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);

	while (rs.Next())
	{
		brc = rs.GetUlongByName("group_id",GroupsX.m_GrpId);
		if (brc)
			rs.GetStringByName("g_name",GroupsX.m_GrpName);
		if (brc)
		{
			grp_db[GroupsX.m_GrpId] = GroupsX;
		}
	}
}
//================================[GetWUFromDB]=======================================
//SELECT w_name, w_number FROM `wu_code`;
void GetWUFromDB()
{
	Statement_c st;
	ResultSet_c rs;
	WrapUpCodes_c	WrapUpCodesX;
	rs.clear();
	st.SetQuery("SELECT w_name, w_number FROM wu_code;");
	bool brc;
	DBManager_c dbi_mngr;
	RetCode_t	executionResult;
	RetCode_t	bswrc = BSWRC_FAIL;

	if (!(dbi_mngr.IsProxyOK()))
	{
		return;
	}
	rs.clear();
	wu_db.clear();

	bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);

	while (rs.Next())
	{
		brc = rs.GetUlongByName("w_number",WrapUpCodesX.m_WUId);
		if (brc)
			rs.GetStringByName("w_name",WrapUpCodesX.m_WUName);
		if (brc)
		{
			wu_db[WrapUpCodesX.m_WUId] = WrapUpCodesX;
		}
	}
}
//==================================[GetRcFromDB]=====================================
//SELECT rc_id, rc_shortname,rc_name, rc_number FROM `release_codes`;
void GetRcFromDB()
{
	Statement_c st;
	ResultSet_c rs;
	ReleaseCodes_c	ReleaseCodesX;
	rs.clear();
	st.SetQuery("SELECT rc_id, rc_shortname,rc_name, rc_number FROM release_codes");
	bool brc;
	DBManager_c dbi_mngr;
	RetCode_t	executionResult;
	RetCode_t	bswrc = BSWRC_FAIL;

	if (!(dbi_mngr.IsProxyOK()))
	{
		return;
	}
	rs.clear();
	rc_db.clear();

	bswrc = dbi_mngr.ExecuteSelectSyn(st, rs, executionResult);

	while (rs.Next())
	{
		brc = rs.GetUlongByName("rc_id",ReleaseCodesX.m_RCId);
		if (brc)
			rs.GetStringByName("rc_name",ReleaseCodesX.m_RCName);
		if (brc)
		{
			rc_db[ReleaseCodesX.m_RCId] = ReleaseCodesX;
		}
	}
}

//================================[getCustomerJsonfile]===================
void getCustomerJsonfile()
{
	if (customerJsonfnm == "") return;
	customerJsonTxt = "";
	FILE *fp = fopen(customerJsonfnm.c_str(),"r");
	if (fp == NULL)
	{
		my_print(0,"getCustomerJsonfile() ==> customer file not exists: %s\n",customerJsonfnm.c_str());
		return;
	}
	fseek(fp, 0 , SEEK_END);
	long fileSize = ftell(fp);
	fseek(fp, 0 , SEEK_SET);//
	char *area = new char[fileSize + 2];
	memset(area,0,fileSize + 1);
	int len = fread(area,1,fileSize,fp);
	fclose(fp);	
	customerJsonTxt = area;
	delete area;
	my_print(0,"getCustomerJsonfile() ==> read customer file: %s length = %d\n",customerJsonfnm.c_str(),len);
	my_print(0,"getCustomerJsonfile() ==> read customer file: %s length = %d\n",customerJsonfnm.c_str(),len);
}

//================================[SbcWorkThread_c::bcWorkThread_c]===================
SbcWorkThread_c::SbcWorkThread_c()
{
	m_TableChanged = false;
    m_IsSSO = FALSE; //SOLSOL
}
//================================[~SbcWorkThread_c]==================================
SbcWorkThread_c::~SbcWorkThread_c()
{

}
//================================[SbcWorkThread_c::Init]=============================
RetCode_t SbcWorkThread_c::Init()
{
  return BSWRC_OK;
}
//================================[SbcWorkThread_c::Terminate]========================
RetCode_t SbcWorkThread_c::Terminate()
{
  m_sea_reply.Terminate();
  my_print(0,"SbcWorkThread_c::Terminate\n");
  return BSWRC_OK;
}
//================================[SbcWorkThread_c::SetPreoper]=======================
void SbcWorkThread_c::SetPreoper()
{

}
//================================[SbcWorkThread_c::IsPreoperDone]====================
bool iAmActive = false;
Bool_t SbcWorkThread_c::IsPreoperDone() const
{
  return true;
}
string  crmCode;
static accapi_entities_c EntityMgr;
int InitAccApiServer(string ip,int portNo);
//================================[SbcWorkThread_c::GetAllTables]===================
void SbcWorkThread_c::GetAllTables(bool isChanged)
{
  time_t start_time = time(0);	
  my_print(0,"SbcWorkThread_c::GetAllTables=> start: %d\n",start_time);	
  getCOSTableFromDB();
  GetServicesFromDB();
  GetGroupsFromDB();
  GetWUFromDB();
  GetRcFromDB();
  //20-May-2019 YR BZ#49760
  GetCPFromDB();
  m_TableChanged = false;
  my_print(0,"SbcWorkThread_c::GetAllTables=> end:    %d, took: %d seconds\n",time(0), time(0) - start_time);	
  
}
//================================[Send SSO on/off to accapi service TOMCAT on connect]=========
string  getSSOState()
{
    SWT->m_IsSSOfreeSseating = FALSE;
    SWT->m_IsSSO = FALSE;
    if(EosHAGetSSOStatus() == EOS_HA_SSO_ENABLE)  SWT->m_IsSSO = TRUE;
    //
    if(EosHAGetSSOFreeSeating() == EOS_HA_SSO_ENABLE)  SWT->m_IsSSOfreeSseating = TRUE;
    //
    string s = (SWT->m_IsSSO == TRUE) ? " ,SSO=1," : " ,SSO=0,";
	s +=  (SWT->m_IsSSOfreeSseating == TRUE) ? "SEATING=1" : "SEATING=0";
	
	s += (char *) ",AccVersion="; 
	s += (char *) SuGetEpicVersion();
	return s;
}

//================================[SbcWorkThread_c::SetOperational]===================
Thread *CheckKeepAliveThread = 0;
void ChangeLogLevel(int new_log_level);
void SbcWorkThread_c::SetOperational()
{
  SWT = this;
  int portNo;
  
  my_print_init((char *) "../Log/accapi.log");
  ChangeLogLevel(3);
  my_print(0,"+++++++++++++++++++++++++++++++++++ ACCAPI STARTED ++++++++++++++++++++++++\n");

  // load all required tables from ecc db
  GetAllTables(false);
  GetAgentsFromDB(false); //get and fill all agent from ecc DB
  //
  string ipAddr;
  //
  int keepalive_check_intreval;
  int keepalive_timeout;
  GetMoreParamsFromSoftParam(ipAddr,&portNo,&keepalive_check_intreval,&keepalive_timeout,crmCode);
  //
  getCustomerJsonfile();
  //
  WFM *crmObject = NULL;
  //
  EntityMgr = accapi_entities_c::GetEntityMgr(this);
  EntityMgr.InitSystemParam();
  //
  if (crmCode == "Acc Web Agent") // Aspect® Workforce Management
  {
	  crmObject = (WFM *) new WFM();
  }
  m_conn_timer.m_CrmObject = crmObject;

  m_AccapiSmManager =  new AccapiSmManager_c(this);
  m_AccapiSmManager->CreateProxy(false);
  //
  m_sea_reply.Init();
  
  GetCPFromDB();
 
  m_sea_reply.SetOperational(crmCode);
  ThreadMgr::Spawn(InitAccApiServer,ipAddr,portNo);
  CheckKeepAliveThread = ThreadMgr::Spawn(CheckKeepAlive,this,keepalive_check_intreval,keepalive_timeout);

  m_conn_timer.Start(1000);

}
//================================[SbcWorkThread_c::OnIdle]===================
void  SbcWorkThread_c::OnIdle()
{
	PostEventHandling();
}
//===========================================================================
string BaseEtas = "ewoJImFjdGl2YXRlX2h0dHAiOiBmYWxzZSwKCSJDUk0iOiBbCgkJewoJCQkiRXZlbnQiOiAiT25Mb2dvbiIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25SZUxvZ29uIiwKCQkJIlVSTCI6ICIiCgkJfSwKCQl7CgkJCSJFdmVudCI6ICJPbkRlbmllZCIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25FeGl0IiwKCQkJIlVSTCI6ICIiCgkJfSwKCQl7CgkJCSJFdmVudCI6ICJPbkxvZ2dlZEluIiwKCQkJIlVSTCI6ICIiCgkJfSwKCQl7CgkJCSJFdmVudCI6ICJPbkxvZ2dlZE91dCIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25IZWxkIiwKCQkJIlVSTCI6ICIiCgkJfSwKCQl7CgkJCSJFdmVudCI6ICJPblJldHJpZXZlZCIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25JbmNvbWluZyIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25Db25uZWN0ZWQiLAoJCQkiVVJMIjogIiIKCQl9LAoJCXsKCQkJIkV2ZW50IjogIk9uQ29uZmVyZW5jZWQiLAoJCQkiVVJMIjogIiIKCQl9LAoJCXsKCQkJIkV2ZW50IjogIk9uUmVsZWFzZWQiLAoJCQkiVVJMIjogIiIKCQl9LAoJCXsKCQkJIkV2ZW50IjogIk9uUmVzdW1lZCIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25XcmFwVXAiLAoJCQkiVVJMIjogIiIKCQl9LAoJCXsKCQkJIkV2ZW50IjogIk9uUmVhZHkiLAoJCQkiVVJMIjogIiIKCQl9LAoJCXsKCQkJIkV2ZW50IjogIk9uQ2xlYXJlZCIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25SZXNlcnZlZCIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25TeXN0ZW1BdmFpbGFibGUiLAoJCQkiVVJMIjogIiIKCQl9LAoJCXsKCQkJIkV2ZW50IjogIk9uRmFpbGVkIiwKCQkJIlVSTCI6ICIiCgkJfSwKCQl7CgkJCSJFdmVudCI6ICJPblNpbGVudFN0YXJ0ZWQiLAoJCQkiVVJMIjogIiIKCQl9LAoJCXsKCQkJIkV2ZW50IjogIk9uSW5jb21pbmdFeCIsCgkJCSJVUkwiOiAiIgoJCX0sCgkJewoJCQkiRXZlbnQiOiAiT25Db25uZWN0ZWRFeCIsCgkJCSJVUkwiOiAiIgoJCX0KCV0sCgkiQWdlbnRTZXR1cCI6IFsKCQl7CgkJCSJuYW1lIjogIlRvb2xiYXIiLAoJCQkic2V0dXAiOiBbCgkJCQl7CgkJCQkJInZhbHVlIjogIm9uVG9wIiwKCQkJCQkidmlld1ZhbHVlIjogIkFsd2F5IE9uIHRvcCIsCgkJCQkJInNlbGVjdGVkIjogZmFsc2UsCgkJCQkJImRhdGEiOiAiIgoJCQkJfSwKCQkJCXsKCQkJCQkidmFsdWUiOiAiTGFyZ2VJY29ucyIsCgkJCQkJInZpZXdWYWx1ZSI6ICJMYXJnIGljb25zIiwKCQkJCQkic2VsZWN0ZWQiOiBmYWxzZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJBdXRvUmVzaXplIiwKCQkJCQkidmlld1ZhbHVlIjogIkF1dG8gcmVzaXplIiwKCQkJCQkic2VsZWN0ZWQiOiBmYWxzZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJTdGF0dXNCYXIiLAoJCQkJCSJ2aWV3VmFsdWUiOiAiU3RhdHVzIGJhciIsCgkJCQkJInNlbGVjdGVkIjogZmFsc2UsCgkJCQkJImRhdGEiOiAiIgoJCQkJfQoJCQldCgkJfSwKCQl7CgkJCSJuYW1lIjogIlBlcnNvbmFsIE9wdGlvbnMiLAoJCQkic2V0dXAiOiBbCgkJCQl7CgkJCQkJInZhbHVlIjogIlN0YXJ0TWluIiwKCQkJCQkidmlld1ZhbHVlIjogIlN0YXJ0IG1pbmltaXplIiwKCQkJCQkic2VsZWN0ZWQiOiBmYWxzZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJFbmFibGVDbG9zZVgiLAoJCQkJCSJ2aWV3VmFsdWUiOiAiRW5hYmxlIGNsb3NpbmcgdmlhIHN5c3RlbSBtZW51IFwieFwiIiwKCQkJCQkic2VsZWN0ZWQiOiBmYWxzZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJPcGVuT25Gb3JlUmVsZWFzZSIsCgkJCQkJInZpZXdWYWx1ZSI6ICJPcGVuIFRvb2xiYXIgb24gXCJGb3JjZWQgUmVsZWFzZVwiIHN0YXRlIiwKCQkJCQkic2VsZWN0ZWQiOiBmYWxzZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJNaW5PblJlbGVhc2UiLAoJCQkJCSJ2aWV3VmFsdWUiOiAiQWxsb3cgbWluaW1pemUgdGhlIHRvb2xiYXIgaW4gXCJSZWxlYXNlXCIgc3RhdGUiLAoJCQkJCSJzZWxlY3RlZCI6IGZhbHNlLAoJCQkJCSJkYXRhIjogIiIKCQkJCX0sCgkJCQl7CgkJCQkJInZhbHVlIjogIk9wZW5PblJpbmciLAoJCQkJCSJ2aWV3VmFsdWUiOiAiT3BlbiBUb29sYmFyIG9uIFJpbmciLAoJCQkJCSJzZWxlY3RlZCI6IGZhbHNlLAoJCQkJCSJkYXRhIjogIiIKCQkJCX0sCgkJCQl7CgkJCQkJInZhbHVlIjogIk1pbk9uQW5zd2VyIiwKCQkJCQkidmlld1ZhbHVlIjogIk1pbmltaXplIG9uIGFuc3dlciIsCgkJCQkJInNlbGVjdGVkIjogZmFsc2UsCgkJCQkJImRhdGEiOiAiIgoJCQkJfSwKCQkJCXsKCQkJCQkidmFsdWUiOiAiT3Blbk9uUXVldWVkQ2FsbCIsCgkJCQkJInZpZXdWYWx1ZSI6ICJPcGVuIFRvb2xiYXIgb24gUXVldWVkIENhbGwiLAoJCQkJCSJzZWxlY3RlZCI6IGZhbHNlLAoJCQkJCSJkYXRhIjogIiIKCQkJCX0KCQkJXQoJCX0sCgkJewoJCQkibmFtZSI6ICJSaW5nIiwKCQkJInNldHVwIjogWwoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJWb2ljZSIsCgkJCQkJInZpZXdWYWx1ZSI6ICJWb2ljZSIsCgkJCQkJInNlbGVjdGVkIjogdHJ1ZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJNYWlsIiwKCQkJCQkidmlld1ZhbHVlIjogIk1haWwiLAoJCQkJCSJzZWxlY3RlZCI6IGZhbHNlLAoJCQkJCSJkYXRhIjogIiIKCQkJCX0sCgkJCQl7CgkJCQkJInZhbHVlIjogIkNoYXQiLAoJCQkJCSJ2aWV3VmFsdWUiOiAiQ2hhdCIsCgkJCQkJInNlbGVjdGVkIjogZmFsc2UsCgkJCQkJImRhdGEiOiAiIgoJCQkJfSwKCQkJCXsKCQkJCQkidmFsdWUiOiAiT3V0Ym91bmRDYWxsQ29uZmlybSIsCgkJCQkJInZpZXdWYWx1ZSI6ICJPdXRib3VuZCBDYWxsIENvbmZpcm1hdGlvbiIsCgkJCQkJInNlbGVjdGVkIjogZmFsc2UsCgkJCQkJImRhdGEiOiAiIgoJCQkJfQoJCQldCgkJfSwKCQl7CgkJCSJuYW1lIjogIlJpbmcgQWxlcnQiLAoJCQkic2V0dXAiOiBbCgkJCQl7CgkJCQkJInZhbHVlIjogIlJpbmdPbmNlIiwKCQkJCQkidmlld1ZhbHVlIjogIlJpbmcgT25jZSIsCgkJCQkJInNlbGVjdGVkIjogdHJ1ZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJDb250aW51b3VzUmluZyIsCgkJCQkJInZpZXdWYWx1ZSI6ICJDb250aW51b3VzUmluZyIsCgkJCQkJInNlbGVjdGVkIjogZmFsc2UsCgkJCQkJImRhdGEiOiAiIgoJCQkJfQoJCQldCgkJfSwKCQl7CgkJCSJuYW1lIjogIlJpbmcgVG9uZSIsCgkJCSJzZXR1cCI6IFsKCQkJCXsKCQkJCQkidmFsdWUiOiAiRGVmYXVsdFJpbmciLAoJCQkJCSJ2aWV3VmFsdWUiOiAiRGVmYXVsdCAoc3BlYWtlciBCZWVwIiwKCQkJCQkic2VsZWN0ZWQiOiBmYWxzZSwKCQkJCQkiZGF0YSI6ICIiCgkJCQl9LAoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJXYXZlRmlsZSIsCgkJCQkJInZpZXdWYWx1ZSI6ICJGaWxlIChXYXZlIGZpbGVzIG9ubHksUmVxdWlyZWQgc291bmQgY2FyZCkiLAoJCQkJCSJzZWxlY3RlZCI6IHRydWUsCgkJCQkJImRhdGEiOiAiUmluZzA2LndhdiIKCQkJCX0KCQkJXQoJCX0sCgkJewoJCQkibmFtZSI6ICJRdWV1ZSBBbGVydCIsCgkJCSJzZXR1cCI6IFsKCQkJCXsKCQkJCQkidmFsdWUiOiAiU3BlYWtlckJlZXAiLAoJCQkJCSJ2aWV3VmFsdWUiOiAiU3BlYWtlciBCZWVwIChSaW5nIE9uY2UpIiwKCQkJCQkic2VsZWN0ZWQiOiB0cnVlLAoJCQkJCSJkYXRhIjogIiIKCQkJCX0sCgkJCQl7CgkJCQkJInZhbHVlIjogIldhdmVGaWxlIiwKCQkJCQkidmlld1ZhbHVlIjogIkZpbGUgKFdhdmUgZmlsZXMgb25seSxSZXF1aXJlZCBzb3VuZCBjYXJkKSIsCgkJCQkJInNlbGVjdGVkIjogZmFsc2UsCgkJCQkJImRhdGEiOiAidGVsZXBob25lcmluZy0xLndhdiIKCQkJCX0KCQkJXQoJCX0sCgkJewoJCQkibmFtZSI6ICJQb3B1cCB3aW5kb3dzIiwKCQkJInNldHVwIjogWwoJCQkJewoJCQkJCSJ2YWx1ZSI6ICJTcGVha2VyQmVlcCIsCgkJCQkJInZpZXdWYWx1ZSI6ICJTcGVha2VyIEJlZXAgKFJpbmcgT25jZSkiLAoJCQkJCSJzZWxlY3RlZCI6IHRydWUsCgkJCQkJImRhdGEiOiAiIgoJCQkJfSwKCQkJCXsKCQkJCQkidmFsdWUiOiAiV2F2ZUZpbGUiLAoJCQkJCSJ2aWV3VmFsdWUiOiAiRmlsZSAoV2F2ZSBmaWxlcyBvbmx5LFJlcXVpcmVkIHNvdW5kIGNhcmQpIiwKCQkJCQkic2VsZWN0ZWQiOiBmYWxzZSwKCQkJCQkiZGF0YSI6ICJ0ZWxlcGhvbmVyaW5nLTEud2F2IgoJCQkJfQoJCQldCgkJfQoJXSwKCSJUb29sQmFyIjogewoJCSJCdXR0b25zIjogWwoJCQl7CgkJCQkiQnV0dG9uIjogIkxvZ2luUHJpbWFyeUdyb3VwcyIsCgkJCQkiZGF0YSI6ICIiCgkJCX0sCgkJCXsKCQkJCSJCdXR0b24iOiAiUmVsZWFzZSIsCgkJCQkiZGF0YSI6ICIiCgkJCX0sCgkJCXsKCQkJCSJCdXR0b24iOiAiTG9naW5Hcm91cCIsCgkJCQkiZGF0YSI6ICIiCgkJCX0sCgkJCXsKCQkJCSJCdXR0b24iOiAiR3JvdXBzTWFuYWdlciIsCgkJCQkiZGF0YSI6ICIiCgkJCX0sCgkJCXsKCQkJCSJCdXR0b24iOiAiUmVsZWFzZXdpdGhDb2RlIiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJBZ2VudFJlYWR5IiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJXcmFwdXBDb2RlIiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJXcmFwdXBNYW51YWxDb250cm9sIiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJNYWtlTkFDYWxsIiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJDbGVhckNvbm5lY3Rpb24iLAoJCQkJImRhdGEiOiAiIgoJCQl9LAoJCQl7CgkJCQkiQnV0dG9uIjogIkhvbGQiLAoJCQkJImRhdGEiOiAiIgoJCQl9LAoJCQl7CgkJCQkiQnV0dG9uIjogIlJldHJpZXZlIiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJUcmFuc2ZlckNhbGwiLAoJCQkJImRhdGEiOiAiIgoJCQl9LAoJCQl7CgkJCQkiQnV0dG9uIjogIlN0YXJ0Q29uc3VsdGF0aW9uIiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJDb21wbGV0ZVRyYW5zZmVyIiwKCQkJCSJkYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIkJ1dHRvbiI6ICJDb21wbGV0ZUNvbmZlcmVuY2UiLAoJCQkJImRhdGEiOiAiIgoJCQl9CgkJXQoJfSwKCSJDYWxsc1N0YXR1cyI6IHsKCQkiQ29sdW1ucyI6IFsKCQkJewoJCQkJIkluZGV4IjogIjEwMDA3IiwKCQkJCSJGb3JtYXQiOiAiMCIsCgkJCQkiSGVhZGVyIjogIlN0YXR1cyIsCgkJCQkiU29ydCI6ICIxIiwKCQkJCSJXaWR0aCI6ICIxMDAiCgkJCX0sCgkJCXsKCQkJCSJJbmRleCI6ICIxMDAwOSIsCgkJCQkiRm9ybWF0IjogIjAiLAoJCQkJIkhlYWRlciI6ICJjYWxsaW5nIiwKCQkJCSJTb3J0IjogIjEiLAoJCQkJIldpZHRoIjogIjEwMCIKCQkJfSwKCQkJewoJCQkJIkluZGV4IjogIjEwMDAyIiwKCQkJCSJGb3JtYXQiOiAiMCIsCgkJCQkiSGVhZGVyIjogImNhbGxlZCIsCgkJCQkiU29ydCI6ICIxIiwKCQkJCSJXaWR0aCI6ICIxMDAiCgkJCX0sCgkJCXsKCQkJCSJJbmRleCI6ICIxIiwKCQkJCSJGb3JtYXQiOiAiMCIsCgkJCQkiSGVhZGVyIjogIkROSVMiLAoJCQkJIlNvcnQiOiAiMSIsCgkJCQkiV2lkdGgiOiAiNzUiCgkJCX0KCQldCgl9LAoJIkFDRENhbGxzIjogewoJCSJDb2x1bW5zIjogWwoJCQl7CgkJCQkiSW5kZXgiOiAiMiIsCgkJCQkiRm9ybWF0IjogIjAiLAoJCQkJIkhlYWRlciI6ICJDYWxsaW5nIiwKCQkJCSJTb3J0IjogIjEiLAoJCQkJIldpZHRoIjogIjEwMCIKCQkJfSwKCQkJewoJCQkJIkluZGV4IjogIjEiLAoJCQkJIkZvcm1hdCI6ICIwIiwKCQkJCSJIZWFkZXIiOiAiRE5JUyIsCgkJCQkiU29ydCI6ICIxIiwKCQkJCSJXaWR0aCI6ICI3NSIKCQkJfSwKCQkJewoJCQkJIkluZGV4IjogIjEwMDAwIiwKCQkJCSJGb3JtYXQiOiAiMCIsCgkJCQkiSGVhZGVyIjogIkFDRCBHcm91cCIsCgkJCQkiU29ydCI6ICIxIiwKCQkJCSJXaWR0aCI6ICIxMDAiCgkJCX0sCgkJCXsKCQkJCSJJbmRleCI6ICIzIiwKCQkJCSJGb3JtYXQiOiAiMCIsCgkJCQkiSGVhZGVyIjogIlByaW9yaXR5IiwKCQkJCSJTb3J0IjogIjEiLAoJCQkJIldpZHRoIjogIjUzIgoJCQl9LAoJCQl7CgkJCQkiSW5kZXgiOiAiOSIsCgkJCQkiRm9ybWF0IjogIjAiLAoJCQkJIkhlYWRlciI6ICJRdWV1ZSBQb3NpdGlvbiIsCgkJCQkiU29ydCI6ICIxIiwKCQkJCSJXaWR0aCI6ICIxMDAiCgkJCX0sCgkJCXsKCQkJCSJJbmRleCI6ICIxNSIsCgkJCQkiRm9ybWF0IjogIjAiLAoJCQkJIkhlYWRlciI6ICJNZWRpYSIsCgkJCQkiU29ydCI6ICIxIiwKCQkJCSJXaWR0aCI6ICIxMDAiCgkJCX0KCQldCgl9LAoJIkNhbGxzTG9nIjogewoJCSJDb2x1bW5zIjogWwoJCQl7CgkJCQkiSW5kZXgiOiAiMTAwMTUiLAoJCQkJIlNvcnQiOiAiMSIsCgkJCQkiSGVhZGVyIjogIkNyZWF0aW9uIFRpbWUiLAoJCQkJIldpZHRoIjogIjEwMCIsCgkJCQkiRm9ybWF0IjogIjAiCgkJCX0sCgkJCXsKCQkJCSJJbmRleCI6ICIyIiwKCQkJCSJTb3J0IjogIjEiLAoJCQkJIkhlYWRlciI6ICJDYWxsZXIiLAoJCQkJIldpZHRoIjogIjEwMCIsCgkJCQkiRm9ybWF0IjogIjAiCgkJCX0sCgkJCXsKCQkJCSJJbmRleCI6ICIxMDAwMiIsCgkJCQkiRm9ybWF0IjogIjAiLAoJCQkJIkhlYWRlciI6ICJDYWxsZWQiLAoJCQkJIlNvcnQiOiAiMSIsCgkJCQkiV2lkdGgiOiAiMTAwIgoJCQl9LAoJCQl7CgkJCQkiSW5kZXgiOiAiMzgiLAoJCQkJIkZvcm1hdCI6ICIwIiwKCQkJCSJIZWFkZXIiOiAiQUNEIEdyb3VwIiwKCQkJCSJTb3J0IjogIjEiLAoJCQkJIldpZHRoIjogIjEwMCIKCQkJfSwKCQkJewoJCQkJIkluZGV4IjogIjEwMDA3IiwKCQkJCSJGb3JtYXQiOiAiMCIsCgkJCQkiSGVhZGVyIjogIkxhc3QgU3RhdGUiLAoJCQkJIlNvcnQiOiAiMSIsCgkJCQkiV2lkdGgiOiAiMTAwIgoJCQl9LAoJCQl7CgkJCQkiSW5kZXgiOiAiMSIsCgkJCQkiRm9ybWF0IjogIkxlZnQiLAoJCQkJIkhlYWRlciI6ICJUcnVuayIsCgkJCQkiU29ydCI6ICIxIiwKCQkJCSJXaWR0aCI6ICIxMDAiCgkJCX0sCgkJCXsKCQkJCSJJbmRleCI6ICIxMDAxNCIsCgkJCQkiRm9ybWF0IjogIjAiLAoJCQkJIkhlYWRlciI6ICJEZWxldGlvbiBUaW1lIiwKCQkJCSJTb3J0IjogIjEiLAoJCQkJIldpZHRoIjogIjEwMCIKCQkJfQoJCV0KCX0sCgkiVGVsZXBob255IjogewoJCSJOdW1iZXJPZkFjdGlvbnMiOiAiNDAiLAoJCSJhY3Rpb25zIjogWwoJCQl7CgkJCQkiSWR4IjogIjAiLAoJCQkJIkNhcHRpb24iOiAiQW5zd2VyIiwKCQkJCSJGdW5jdGlvbiI6ICJBbnN3ZXIiLAoJCQkJIkRhdGEiOiAiIgoJCQl9LAoJCQl7CgkJCQkiSWR4IjogIjEiLAoJCQkJIkNhcHRpb24iOiAiRGlzY29ubmVjdCIsCgkJCQkiRnVuY3Rpb24iOiAiQ2xlYXJDb25uZWN0aW9uIiwKCQkJCSJEYXRhIjogIiIKCQkJfSwKCQkJewoJCQkJIklkeCI6ICIyIiwKCQkJCSJDYXB0aW9uIjogIkNhbGwiLAoJCQkJIkZ1bmN0aW9uIjogIk1ha2VOQUNhbGwiLAoJCQkJIkRhdGEiOiAiIgoJCQl9CgkJXQoJfSwKCSJTQVZFRF9OVU1CRVJTIjogewoJCSJNYWtlQ2FsbE51bWJlcnMiOiBbCgkJCSIiLAoJCQkiIiwKCQkJIiIKCQldCgl9Cn0=";
//
//================================[SbcWorkThread_c::LogoffAllAgents]==================
void LogoffAllAgents(int clientid)
{
	SWT->LogoffAllAgents(clientid);
}
void SbcWorkThread_c::LogoffAllAgents(int clientid)
{
	AGENTINFO_MAP_IT it = agents_db.begin();
	for (it ; it != agents_db.end(); ++it)
	{
		AgentDbInfo_c &ADI = (*it).second;
		if (ADI.m_AgentWSid == clientid && ADI.m_allready_confirmed == true)
		{
			//sea_provider.LogoutAgent(requestid++,ADI.m_Agent_id);
			//
			agentDisconnect(&ADI,true);
			//
			my_print(0, "SbcWorkThread_c::LogoffAllAgents, agentDisconnect: %s\n",ADI.m_Number);
		}
		//sea_provider.Logout(requestid++
	}

}
//================================[SbcWorkThread_c::agentDisconnect]==================
 void SbcWorkThread_c::agentDisconnect(AgentDbInfo_c *ADI,bool isFromLogon)
 {
	my_print(0,"--- SbcWorkThread_c::agentDisconnect , agent no: %s, sessionid: %s\n",ADI->m_Number,ADI->m_SessionId.c_str());
	 
    m_AccapiSmManager->m_proxy_obj->WebAgentDisconnected(ADI->m_SmClientId,ADI->m_Number,ADI->m_SessionId);
    //
    m_sea_reply.RemoveDeviceMonitor(m_sea_reply.GetRequestId(),ADI->m_Extenstion,0);
	m_sea_reply.RemoveFromAgents_device_Map(ADI->m_Extenstion);
    //
    ADI->m_allready_confirmed = false;
	ADI->m_Ip = "";
 }
////================================[SbcWorkThread_c::LogoffX]==================
 void SbcWorkThread_c::LogoffX(AgentDbInfo_c *ADI,bool isFromLogon)
 {
	m_AccapiSmManager->WebAgentLoggedOff(ADI->m_SmClientId,ADI->m_Number,ADI->m_SessionId,ADI->m_Extenstion);
    ADI->m_SmClientId = -1;
    ADI->m_allready_confirmed = false;
	ADI->m_Ip = "";
 }
//
void SbcWorkThread_c::SendAllLists (AgentDbInfo_c *ADI,bool all)
{
	string agentNo = &(ADI->m_Number[0]);
	REPORT report;
	//
	my_print(0,"+++++ Send Groups to %s +++++\n", agentNo.c_str());
	report.m_Action = "__groups";
	GRP_MAP_IT it = grp_db.begin();
	for (it ; it != grp_db.end(); ++it)
	{
		Groups_c &grp = (*it).second;
		report.m_CallId			  =  grp.m_GrpId;
		report.m_DevId   		  =  &grp.m_GrpName[0];
		m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
	}
	// send call profile fields
	report.m_Action = "__callprofiles";
	CP_MAP_IT itx = cp_db.begin();
	my_print(0,"+++++ Send callprofiles, (%s) total CPF: %d +++++\n", agentNo.c_str(),cp_db.size());
	for (itx ; itx != cp_db.end(); ++itx)
	{
		Cp_c &cps = (*itx).second;
		report.m_CallId			  =  cps.m_CPId;
		report.m_DevId   		  =  &cps.m_CPName[0];
		m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
	}
	// send release cause

	report.m_Action = "__releasecodes";
	RC_MAP_IT ity = rc_db.begin();
	for (ity ; ity != rc_db.end(); ++ity)
	{
		ReleaseCodes_c &RC = (*ity).second;
		report.m_CallId			  =  RC.m_RCId;
		report.m_DevId   		  =  &RC.m_RCName[0];
		m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
	}
	// send wrap up codes
	report.m_Action = "__wrapupcodes";
	WU_MAP_IT itw = wu_db.begin();
	for (itw ; itw != wu_db.end(); ++itw)
	{
		WrapUpCodes_c &WU = (*itw).second;
		report.m_CallId			  =  WU.m_WUId;
		report.m_DevId   		  =  &WU.m_WUName[0];
		m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
	}
    // send services
	report.m_Action = "__services";
	SRV_MAP_IT its = srv_db.begin();
	for (its ; its != srv_db.end(); ++its)
	{
		Srvss_c &SRV = (*its).second;
		report.m_CallId			  = SRV.m_SrvId;
		report.m_DevId   		  = &SRV.m_SrvName[0];
		m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
	}
	report.m_CallId			  = 0;
	report.m_DevId   		  = "";
	// agent detalis
	report.m_Action = "__agentsdetails";
	AGENTINFO_MAP_IT ita = agents_db.begin();
	string s = "";
	string id = "";
	string desc = "";
	my_print(0,"+++++ Send agent details , (%s) total agents: %d +++++\n", agentNo.c_str(),agents_db.size());
	for (ita ; ita != agents_db.end(); ++ita)
	{
		AgentDbInfo_c &ADI1 = (*ita).second;
		id 	   = &ADI1.m_Number[0];
		desc   =  &ADI1.m_Name[0];
		s += id + ";" + desc + "|";
		if (s.length() > 20000) 
		{
			report.m_MoreDetail = s;
			m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
			s = "";
		}
	}
	if (s.length() > 0)
	{
			report.m_MoreDetail = s;
			m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
	}

    //24-Jul-2019 BZ#50339
	report.m_MoreDetail = "";
	//---------------------
	// Send __etasini
	report.m_Action = "__etasini";
	string etasName = "../Agents/" + agentNo +  + "/ETAS.json";
	my_print(0," ETAS INI  fnm: %s\n",etasName.c_str());
	FILE *fp = fopen(etasName.c_str(),"r");
	if (fp == NULL)
	{
		etasName = "../Agents/ETAS.json";
		fp = fopen(etasName.c_str(),"r");
		if (fp != NULL)
		{
			fseek(fp, 0 , SEEK_END);
			long fileSize = ftell(fp);
			fseek(fp, 0 , SEEK_SET);// 
			if (fileSize < 500)
			{
				fclose(fp);
				fp = NULL;
				my_print(0,"ETASINI is corrupted use base ETASINI\n");
			}
		}
		if (fp == NULL)
		{
			etasName = "../Agents/ETAS.json";
			fp = fopen(etasName.c_str(),"r");
			if (fp == NULL)
			{
				my_print(0," ++ SendAllLists=> cannot open ETAS.json for agent Send default etas.json in memory %s\n", agentNo.c_str());
				report.m_DevId =  BaseEtas;
				m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
				return;
			}
		}
	}
    fseek(fp, 0 , SEEK_END);
    long fileSize = ftell(fp);
    fseek(fp, 0 , SEEK_SET);// 
	char *area = new char[fileSize + 2];
	memset(area,0,fileSize + 1);
	if (area == NULL)
	{
			my_print(0," cannot allocate area for read ETAS.json for agent %s\n", agentNo.c_str());
			return;
	}
	int len = fread(area,1,fileSize,fp);
	fclose(fp);
	string input = area;
	string b64 = "";
	Base64::Encode(input, &b64);
	
	my_print(0,"ETAS.json for agent: %s, len: %d %.70s\n",agentNo.c_str(),b64.length(),b64.c_str());

	report.m_CallId			  =  0;
	report.m_DevId   		  =  b64;
	//printf("etas.json\n%s\n",b64.c_str());
 	m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
	delete area;
    //
	// ====================== Send __phonebook ====================
	report.m_Action = "__phonebook";
	string phonebookName = "../Agents/" + agentNo +  + "/phonebook.json";
	//my_print(0," phonebook  fnm: %s\n",phonebookName.c_str());
	//fp = fopen(phonebookName.c_str(),"r");
	//if (fp == NULL)
	{
		phonebookName = "../Agents/phonebook.json";
		fp = fopen(phonebookName.c_str(),"r");
		if (fp == NULL)
		{
			phonebookName = "../Agents/phonebook.json";
			fp = fopen(phonebookName.c_str(),"r");
			if (fp == NULL)
			{
				my_print(0," ++ Send phonebook=> cannot open phonebook.json for agent %s\n", agentNo.c_str());
				//report.m_DevId =  BaseEtas;
				//m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
				return;
			}
		}
	}
    fseek(fp, 0 , SEEK_END);
    fileSize = ftell(fp);
    fseek(fp, 0 , SEEK_SET);// 
	area = new char[fileSize + 2];
	memset(area,0,fileSize + 1);
	if (area == NULL)
	{
			my_print(0," cannot allocate area for read phonebook.json for agent %s\n", agentNo.c_str());
			return;
	}
	
	len = fread(area,1,fileSize,fp);
	fclose(fp);
	input = area;
	b64 = "";
	Base64::Encode(input, &b64);
	
	my_print(0,"phonebook.json for agent: %s, len: %d %.70s\n",agentNo.c_str(),b64.length(),b64.c_str());

	report.m_CallId			  =  0;
	report.m_DevId   		  =  b64;

	//printf("etas.json\n%s\n",b64.c_str());
	m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
	delete area;
	// send end auto send table
	Sleep(100);
	my_print(0,"End Auto send needed tables\n");
	report.m_Action = "_endautosend";
	report.m_DevId = "_endautosend";
	m_sea_reply.UpdateAgentDbInfo(agentNo.c_str(), 0, report);
}
bool getValueByNamefromJsonstring(string &jsonstring,char *name, string &result);
void personal_statistics_req(Ulong_t agent_id);

//================================[SbcWorkThread_c::PostEventHandling]=========
void SbcWorkThread_c::PostEventHandling()
{
	string req = "";
	while ((req = GetRequesfromQueue()) != "")
	{
		
	RetCode_t		    rc = BSWRC_OK;

	if (req == "")
	{
	
		return;
	}
	vector<string> splited;
	int count = Split((char *) req.c_str(), splited ,(char *) ",");
	ErConnId_t ConnId;
	ErConnId_t HeldConnId;
    AgentDbInfo_c *ADI = AGENTINFOfindByAgenNumber(splited[2]);
	if (ADI == NULL)
	{
		my_print(0,"SbcWorkThread_c::PostEventHandling => NULL ADI %s\n",splited[2].c_str());
		return; // no such agent number
	}
	//
	ADI->m_LastKeeAliveTime = time(0); // update last time get something from this agent
	//
	if (count > 0)
	{
		
		int code = getActionCode(splited[0]);
		my_print(0,"SbcWorkThread_c:: POP  queue size: %d => %.400s, \n",RecieveQueu.size(),req.c_str());
		//
		switch (code)
		{
			case API_GETPERSONALSTATISTICS:
				personal_statistics_req(ADI->m_Agent_id);
			break;
			case API_AGENTLOG:
			{
					string b64; 
					bool b = Base64::Decode(splited[5], &b64);
					if (b == false)
					{
						b64 = "fail to decode b64: "  + splited[5];
					}
					my_print(0, "%s, %s, %s, %s, %s\n",splited[0].c_str(), splited[2].c_str(), splited[3].c_str(),splited[4].c_str(),b64.c_str());
			}
			break;
			//
			case API_AGENTDETAILS:
			{
				break;
				REPORT report;
				report.m_Action = "__agentsdetails";
				AGENTINFO_MAP_IT it = agents_db.begin();
				string s = "";
				string id = "";
				string desc = "";
				for (it ; it != agents_db.end(); ++it)
				{
					AgentDbInfo_c &ADI = (*it).second;
					id 	   = &ADI.m_Number[0];
					desc   =  ADI.m_Name;
					s += id + ";" + desc + "|";
					if (s.length() > 20000) 
					{
						report.m_MoreDetail = s;
						m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
						s = "";
					}
				}
				if (s.length() > 0)
				{
						report.m_MoreDetail = s;
						m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
				}
			}
			break;
			case API_SERVICES:
			{
				break;
				REPORT report;
				report.m_Action = "__services";
				SRV_MAP_IT it = srv_db.begin();
				for (it ; it != srv_db.end(); ++it)
				{
					Srvss_c &ADI = (*it).second;
					report.m_CallId			  = ADI.m_SrvId;
					report.m_DevId   		  = &ADI.m_SrvName[0];
					m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
				}
			}
			break;
			//
			case API_GROUPS:
			{
				break;
				REPORT report;
				report.m_Action = "__groups";
				GRP_MAP_IT it = grp_db.begin();
				for (it ; it != grp_db.end(); ++it)
				{
					Groups_c &ADI = (*it).second;
					report.m_CallId			  =  ADI.m_GrpId;
					report.m_DevId   		  =  &ADI.m_GrpName[0];
					m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
				}
				break;
			}

			break;
			//
			case API_CALLPROFILES:
			{
				break;
				REPORT report;
				report.m_Action = "__callprofiles";
				CP_MAP_IT it = cp_db.begin();
				for (it ; it != cp_db.end(); ++it)
				{
					Cp_c &ADI = (*it).second;
					report.m_CallId			  =  ADI.m_CPId;
					report.m_DevId   		  =  &ADI.m_CPName[0];
					m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
				}
				break;
			}
			
			//
			case API_WRAPUPCODES:
			{
				break;
				REPORT report;
				report.m_Action = "__wrapupcodes";
				WU_MAP_IT it = wu_db.begin();
				for (it ; it != wu_db.end(); ++it)
				{
					WrapUpCodes_c &ADI = (*it).second;
					report.m_CallId			  =  ADI.m_WUId;
					report.m_DevId   		  =  &ADI.m_WUName[0];
					m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
				}
				break;
			}
			//
			case API_REASECODES:
			{
				break;
				REPORT report;
				report.m_Action = "__releasecodes";
				RC_MAP_IT it = rc_db.begin();
				for (it ; it != rc_db.end(); ++it)
				{
					ReleaseCodes_c &ADI = (*it).second;
					report.m_CallId			  =  ADI.m_RCId;
					report.m_DevId   		  =  &ADI.m_RCName[0];
					m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
				}
				break;
			}

			break;
			//
			case API_GETETAS:
			{
				break;
				REPORT report;
				report.m_Action = "__etasini";
				report.m_CallId			  =  0;
				my_print(0," ++ cannot open ETAS.json for agent Send default etas.json in memory %s\n", splited[2].c_str());
				report.m_DevId =  BaseEtas;
				m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(), 0, report);
			}
			break;;
			//
			case API_SAVEETASINI:
			{
				string s = splited[3];
				if (ADI->m_EtasiniPart != "")
				{
					s = ADI->m_EtasiniPart + splited[3];
					ADI->m_EtasiniPart = "";
				}
				string b64 = s;
				if (b64.length() < 1000)
				{
					my_print(0,"API_SAVEETASINI=> etas.json too short ,not saved: %s\n",b64.c_str());
				}
				string output = "";
				bool b = Base64::Decode(b64, &output);
				if (b == false)
				{
					my_print(0,"API_SAVEETASINI=> FAILED to decode ETAS.json for agent: %s, len: %d %.70s\n",splited[2].c_str(),output.length(),output.c_str());
					break;
				}
				string etasName = "../Agents/" + splited[2];//   + "/ETAS.json";
				CreateDirectory(etasName.c_str(),0);
				etasName +=  "/ETAS.json";
				my_print(0,"API_SAVEETASINI=>   fnm: %s\n",etasName.c_str());
				FILE *fp = fopen(etasName.c_str(),"w");
				if (fp == NULL)
				{
  					my_print(0,"API_SAVEETASINI=> CANNOT Update  ETAS.json for agent: %s, errno: %d\n", splited[2].c_str(),errno);
					break;;
				}
				int len = fwrite(output.c_str(),1,output.length(),fp);
				fclose(fp);
				if (len == -1)
				{
  					my_print(0,"API_SAVEETASINI=> CANNOT Update ETAS.json for agent %s\n", splited[2].c_str());
					break;;
				}
				
			}
			break;
            //
			case API_SAVEPHONEBOOK:
			{
				string s = splited[3];
				if (ADI->m_PhonbookPart != "")
				{
					s = ADI->m_PhonbookPart + splited[3];
				}
				my_print(0,"API_SAVEPHONEBOOK=> ADI->m_PhonbookPart len: %d + splited[3] len: %d = %d\n", 
							ADI->m_PhonbookPart.length(), splited[3].length(),s.length()); 
				ADI->m_PhonbookPart = "";
				string b64 = s;
				string output = "";
				bool b = Base64::Decode(b64, &output);
				if (b == false)
				{
					my_print(0,"API_SAVEPHONEBOOK=> FAILED to decode phonebook.json for agent: %s, len: %d %.70s\n",splited[2].c_str(),output.length(),output.c_str());
					break;
				}
				//
				string phoneName = "../Agents";//" + splited[2];//   + "/ETAS.json";
				//CreateDirectory(phoneName.c_str(),0);
				phoneName +=  "/phonebook.json";
				char bkphone[120];
				sprintf(&bkphone[0],"%s.%ld\0",phoneName.c_str(),time(0));
				my_print(0,"API_SAVEPHONEBOOK=>   fnm: %s, backup: %s\n",phoneName.c_str(), bkphone);
				rename(phoneName.c_str(), (const char *) &bkphone[0]);
				FILE *fp = fopen(phoneName.c_str(),"w");
				if (fp == NULL)
				{
  					my_print(0,"API_SAVEPHONEBOOK=> CANNOT Update  phonebook.json for agent: %s, errno: %d\n", splited[2].c_str(),errno);
					break;
				}
				int len = fwrite(output.c_str(),1,output.length(),fp);
				fclose(fp);
				if (len == -1)
				{
  					my_print(0,"API_SAVEPHONEBOOK=> CANNOT Update ETAS.json for agent %s\n", splited[2].c_str());
					break;
				}
			}
			break;
			
			//
			case API_LOGOFFALL:
			{
				AGENTINFO_MAP_IT it = agents_db.begin();
				for (it ; it != agents_db.end(); ++it)
				{
					//AgentDbInfo_c &ADI = (*it).second;
					//sea_provider.Logout(requestid++
				}
			}
			break;
				
			case API_LOGON:// agent logon with password, going to sm1
			{
				REPORT report;
				report.m_Action = "forcedLogoff";
				string ext = splited[4];
				ADI->m_TempExtension = ADI->m_Extenstion;
				ADI->m_Extenstion = ext;
				
				ADI->m_Ip = splited[5];
				char session[120];
				sprintf(&session[0],"%d:%s",ADI->m_AgentWSid,ADI->m_SessionId.c_str());
				string version = splited[7];
				string server_version = SuGetEpicVersion();
				if (version != server_version)
				{
					report.m_Action = "agentDenied";
					report.m_Code1 = WRONG_ETAS_VERSION;
					report.m_CallingCalledDevId = ADI->m_Extenstion;
					report.m_JoiningCalledDevId = server_version + "/" + version;
					m_sea_reply.UpdateAgentDbInfo(splited[2].c_str(),WFM::Login,report,ADI->m_AgentWSid, ADI->m_SessionId);
					my_print(0,"API_LOGON ==> logon denied, wrong web agent %s version, server: %s, agent: %s\n", splited[2].c_str(), server_version.c_str(), version.c_str());
					break;
 				}
				//Base64::Decode(splited[7], &version);
				my_print(0,"API_LOGON, agent no: %s, session:%s,web agent version %s\n", splited[2].c_str(), session,version.c_str());
                if (m_IsSSO == FALSE)
                {
					
					rc = m_AccapiSmManager->m_proxy_obj->ConfirmWebAgent(splited[2].c_str(),  //agent number
																		 splited[3].c_str(),  //agent password
																		 splited[4].c_str(),  //agent extension
																		 session,  //
																		 ADI->m_AgentWSid,
																		 splited[6].c_str(),  // Tomact IP
																		 "",				  // Mail address
																		 version.c_str(),  // Mail password -  client version
																		 ADI->m_Ip.c_str()	  // agennt ip
																		 );  
                }
                else //SSO on
                {
                     my_print(0,"LOGON SSO AGENT: %s\n", &ADI->m_Name[0]);
                     rc = m_AccapiSmManager->m_proxy_obj->ConfirmSSOWebAgent(splited[2].c_str(),  //agent principal name
                                                                     splited[4].c_str(),  //agent extension
                                                                     session,  //
                                                                     ADI->m_AgentWSid,
																	 splited[6].c_str(), // Tomact IP
																	 ADI->m_Ip.c_str());  // agennt ip 
                }
			}
			
			break;
			//
			case API_LOGOFF:
			{
				my_print(0,"Agent logged off: %s\n",splited[2].c_str(),splited[5].c_str()); 
				if (splited[5] == "false"){
							LogoffX(ADI,false);
				}
				else {
					agentDisconnect(ADI,false);
				}
			}
			break;
			//
			case API_LOGIN:
			{
				bool release = false;
				if (splited[5] == "false") release = true;
				sea_provider.LoginAgent(requestid++,splited[2],"",splited[4],"","",ER_NULL_ID,ER_NULL_DEV_ID,true, release, true,ADI->m_SmClientId);
			}
			break;
			//
			case API_LOGOUT:
				sea_provider.LogoutAgent(requestid++,ADI->m_Agent_id);
			break;
			//
			case API_LOGINGROUP:
			{
				Ulong_t id = atoi(splited[6].c_str());
				bool isPrimaray = (splited[7] == "1");
			    my_print(0,"API_LOGINGROUP=> %s, groupid: %d, primary = %d\n",splited[2].c_str(),id,isPrimaray);
				sea_provider.LoginAgent(requestid++,splited[2],"",splited[4],"","",id,"",isPrimaray,false,   true,ADI->m_SmClientId);
			}
			break;
			//	
			case API_LOGOUTGROUP:
			{
				Ulong_t id = atoi(splited[6].c_str());
			    my_print(0,"API_LOGOUTGROUP=> %s, groupid: %d\n",splited[2].c_str(),id);
				sea_provider.LogoutAgent(requestid++,ADI->m_Agent_id,(char *) "",id);
			}
			break;
			//
			case API_RELEASE:
				sea_provider.ReleaseAgent(requestid++,splited[2],(Ulong_t) atoi(splited[3].c_str()));
			break;
			//
			case API_RESUME:
				sea_provider.ResumeAgent(requestid++,splited[2]);
			break;
			//
			case API_MAKECALL:
			{
				if (splited[5] != "")
				{
					// DL_MAP_IT it;
					// it = dl_map.find(splited[5]);
					// if (it != dl_map.end())
					// {
						// char ss[512];
						// Ulong_t dl_id = it->second.m_DlId;
						// sprintf(&ss[0],"||DIAL_LIST_ID:%d||",dl_id);
						// string s = &ss[0];
						// sea_provider.MakeOACDCall(requestid++,splited[2],splited[4],s);
						// break;
					// // string lob = "";
					// }
					//------------------------------
					 string lob = "";
					 string s = splited[5];
					 bool b = false;
					 if (s.substr(0,2) == "__")
					 {
						 lob = s.substr(2);
						 b = true;
					 }
					 else
					 {
						s = "\"" + splited[5] + "\"";
						b = getValueByNamefromJsonstring(customerJsonTxt,(char *) s.c_str(),lob);
					 }
					 if (b == true)
					 {
						string fullnumber = lob + splited[4];
						my_print(0,"API_MAKECALL, find lob: %s = %s, fullnumber: %s\n",splited[5].c_str(),lob.c_str(),fullnumber.c_str());
						sea_provider.MakeCall(requestid++,splited[3],fullnumber);
						break;
					 }
				}
				sea_provider.MakeCall(requestid++,splited[3],splited[4]);
			}
			break;
			//
			case API_ANSWERCALL:
				ConnId.m_call_id = atoi(splited[3].c_str());
				ConnId.m_dev_id = splited[4];
				my_print(0,"API_ANSWERCALL, call id: %d,dev_id:%s\n", ConnId.m_call_id,ConnId.m_dev_id.c_str());
				sea_provider.AnswerCall(requestid++,ConnId);
			break;
			//
			case API_DISCONNECT:
				ConnId.m_call_id = atoi(splited[3].c_str());
				ConnId.m_dev_id = splited[4];
				sea_provider.ClearConn(requestid++,ConnId);
			break;
			//
			case API_HOLD:
				ConnId.m_call_id = atoi(splited[3].c_str());
				ConnId.m_dev_id = splited[4];
				sea_provider.HoldCall(requestid++,ConnId);
			break;
			//
			case API_RETRIEVE:
				ConnId.m_call_id = atoi(splited[3].c_str());
				ConnId.m_dev_id = splited[4];
				sea_provider.RetrieveCall(requestid++,ConnId);
			break;
			//
			case API_SINGLESTEPTRANSFER:
				ConnId.m_call_id = atoi(splited[3].c_str());
				ConnId.m_dev_id = splited[4];
				sea_provider.SingleStepTransfer(requestid++,ConnId, splited[5]);
			break;
			//
			// DivertCall( ErRequestId_t reqId, ErDevId_t destDevId)
			case API_DIVERTCALL:
				ConnId.m_call_id = atoi(splited[3].c_str());
				ConnId.m_dev_id = splited[4];
				sea_provider.DivertCall(requestid++,EDT_DEFLECTION,ConnId, splited[5]);
			break;
			//
			case API_STARTTRANSFER:
				ConnId.m_call_id = atoi(splited[3].c_str());
				ConnId.m_dev_id = splited[4];
				sea_provider.ConsultationCall(requestid++,ECT_TRANSFER,ConnId, splited[5]);
			break;
			//
			case API_COMPLETETRANSFER:
				HeldConnId.m_call_id = atoi(splited[3].c_str());
				HeldConnId.m_dev_id = splited[4];
				ConnId.m_call_id = atoi(splited[5].c_str());
				ConnId.m_dev_id = splited[6];
				sea_provider.TransferCall(requestid++,HeldConnId, ConnId);
			break;
			//
			case API_STARTCONFERNCE:
				ConnId.m_call_id = atoi(splited[3].c_str());
				ConnId.m_dev_id = splited[4];
				sea_provider.ConsultationCall(requestid++,ECT_CONFERENCE,ConnId, splited[5]);
			break;
			//
			case API_COMPLETECONFERENCE:
				HeldConnId.m_call_id = atoi(splited[3].c_str());
				HeldConnId.m_dev_id = splited[4];
				ConnId.m_call_id = atoi(splited[5].c_str());
				ConnId.m_dev_id = splited[6];
				sea_provider.ConferenceCall(requestid++,HeldConnId, ConnId);
			break;
			//
			case API_ALTERNANTECALL:
				HeldConnId.m_call_id = atoi(splited[3].c_str());
				HeldConnId.m_dev_id = splited[4];
				ConnId.m_call_id = atoi(splited[5].c_str());
				ConnId.m_dev_id = splited[6];
				sea_provider.AlternateCall(requestid++, ConnId,HeldConnId);
			break;
			//
			case API_RECONNECTHELDCALL:
				HeldConnId.m_call_id = atoi(splited[3].c_str());
				HeldConnId.m_dev_id = splited[4];
				ConnId.m_call_id = atoi(splited[5].c_str());
				ConnId.m_dev_id = splited[6];
				sea_provider.ReconnectHeldCall(requestid++, ConnId,HeldConnId);
			break;
			case API_SWAPCALL:
				HeldConnId.m_call_id = atoi(splited[3].c_str());
				HeldConnId.m_dev_id = splited[4];
				ConnId.m_call_id = atoi(splited[5].c_str());
				ConnId.m_dev_id = splited[6];
				sea_provider.AlternateCall(requestid++, ConnId,HeldConnId);
			break;
			//
			case API_WRAPUP:
				sea_provider.SetAgentMode(requestid++,ADI->m_Agent_id,ADI->m_Number,WRAP_EXIT,splited[3]);//
			break;
			case API_SETWRAPUPCODE:
				my_print(0,"API_SETMANUELWRAPUP, agent: %s, code: %s\n", splited[2].c_str(),splited[3].c_str());
				sea_provider.SetAgentMode(requestid++,ADI->m_Agent_id,ADI->m_Number,WRAP_CODE,splited[3]);//
			break;

			case API_SETMANUELWRAPUP:
				{
					my_print(0,"API_SETMANUELWRAPUP, agent: %s\n", splited[2].c_str());
					sea_provider.SetAgentMode(requestid++,ADI->m_Agent_id,ADI->m_Number,WRAP_EXTEND);
				}
			//
			case API_QUERYAGENTCALLS:
				sea_provider.QueryAgent(requestid++, ADI->m_Agent_id,splited[3],QUERY_WEB_AGENT_INFO,ADI->m_SmClientId);//QUERY_AGENT_INFO);
			break;
			//
			/////////////////////////
			case API_BARGIN:
				my_print(0,"me: %s, API_BARGIN, agent: %s device:%s\n", ADI->m_Number, splited[3].c_str(), splited[4].c_str());
				sea_provider.ActivateCCFeature(requestid++,splited[3],splited[4],CC_BARGE_IN);
				break;
			//
			case API_SILENTMONITOR:
				my_print(0,"me: %s, API_SILENTMONITOR, agent: %s device:%s\n", ADI->m_Number, splited[3].c_str(), splited[4].c_str());
				sea_provider.ActivateCCFeature(requestid++,splited[3],splited[4],CC_SILENT_MONITOR);
				break;
			//
			case API_STARTRECORDING:
				my_print(0,"API_STARTRECORDING, agent: %s\n", splited[2].c_str());

				sea_provider.StartRecording(requestid++,ADI->m_Number);
				break;
			//
			//
			case API_STOPRECORDING:
				my_print(0,"API_STOPRECORDING, agent: %s\n", splited[2].c_str());

				sea_provider.StartRecording(requestid++,ADI->m_Number,true);
				break;
			//
			case API_GETGROUPQUEUEINFO:
				sea_provider.GetGroupQueueInfo(requestid++,ADI->m_Number,ADI->m_Extenstion,splited[4]);
				break;
			//
			case API_GETGROUPQUEUECPINFO:
				sea_provider.GetGroupQueueCPInfo(requestid++,ADI->m_Number,ADI->m_Extenstion,splited[4]);
				break;

			case API_ACDPICKUPCALL:
			   my_print(0,"API_ACDPICKUPCALL=> Agent No: %s, Call id: %s\n" ,ADI->m_Number,splited[4].c_str());
				sea_provider.PickupCall(requestid++,ADI->m_Number,ADI->m_Extenstion,splited[4]);
				break;
			//
			case 	API_KEEPALIVE:
				ADI->m_LastKeeAliveTime = time(0);
				break;
			//
			default:
				switch (code)
				{
					case API_SAVEETASPART:
					ADI->m_EtasiniPart += splited[3];
					my_print(0,"API_SAVEETASPART=> len: %d / %d\n", splited[3].length(), ADI->m_EtasiniPart.length());
					break;
					//
					case API_SAVEPHONEBOOKPART:
					ADI->m_PhonbookPart += splited[3];
					my_print(0,"API_SAVEPHONEBOOKPART=> len: %d / %d\n", splited[3].length(), ADI->m_PhonbookPart.length());
					break;
					//
					default: my_print(0,"SbcWorkThread_c::PostEventHandling, Unknown action code: %s\n", splited[0].c_str());  
				}
				break;
		}//end switch
	}
}
}
