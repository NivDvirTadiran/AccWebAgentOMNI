#include <string>
using namespace std;
//
#include <bswgen.h>
#include <sollib.h>


#include "accapi_CEMax.h"
#ifdef WIN32
// pesoudo functioi in win32, just for avoid error in link
Ulong_t ExecuteFromHookEx(Ulong_t call_id, char* serialized_cp, Ulong_t& exit_code, Ulong_t timeout,string dll_note)
{
  return 1;
}
#endif
Ulong_t ExecuteFromHookEx(Ulong_t call_id, char* serialized_cp, Ulong_t& exit_code, Ulong_t timeout,string dll_note);

void accapi_my_print(int level,const char* fmt, ...);

//
CEMax::CEMax(string cemaxapiurl, string ceamxregisterurl, string accFromCemaxUrl, string user, string password){
     m_CemaxUrl = cemaxapiurl;
	 m_CemaxRegUrl = ceamxregisterurl;
	 m_accFromCemaxUrl = accFromCemaxUrl;
     m_Token = "";
     m_user = user;
     m_password = password;
	 accapi_my_print(0, "CEMax::CEMax=> %s, %s, %s, toAccUrl: %s\n", m_CemaxUrl.c_str(),user.c_str(),password.c_str(),accFromCemaxUrl.c_str());
     sprintf(&m_CPS[0],"||URL:%s|USER:%s|PASSWORD:%s||", m_CemaxRegUrl.c_str(),user.c_str(),password.c_str());
 	 accapi_my_print(0, "CEMax::CEMax=>CPF: %s\n", &m_CPS[0]);
  }
CEMax::~CEMax(void)
{
}
//
//=====================================[ GetCEMaxToken]===================
string gettoken =
	"HTTPHEADER: [Content-Type::: application/json]" \
	"HTTPHEADER: [Accept-Charset::: utf-8]" \
	"HTTPHEADER: [CEMAX_AUTH::: APP_ID=10000028,CUST_ID=TBSI,UID=3,TOKEN=73FE0C10-EF13-4874-8045-07TBSIF165152,USERNAME=apiUser,TRUNK_ID=1301,VER=10.03,SESSION_ID=0v71emfttasvf21xpd5jdqqaazqvr]" \
	"HTTPPOST: [~~URL~~]," \
    "[{\"credentials\":{\"username\":\"~~USER~~\", \"password\":\"~~PASSWORD~~\"}}] " \
	"RESPONSE: [uid]" \
	"PREFIX: [\\\"UID\\\":\\\"]" \
	"SUFFIX: [\\\"]" \
	"RESPONSE: [custid]" \
	"PREFIX: [\\\"CUST_ID\\\":\\\"]" \
	"SUFFIX: [\\\"]" \
	"RESPONSE: [username]" \
	"PREFIX: [\\\",\\\"USERNAME\\\":\\\"]" \
	"SUFFIX: [\\\"]" \
	"RESPONSE: [token]" \
	"PREFIX: [\\\"TOKEN\\\":\\\"]" \
	"SUFFIX: [\\\"]" \
	"RESPONSE: [session]" \
	"PREFIX: [\\\",\\\"SESSION_ID\\\":\\\"]" \
	"SUFFIX: [\\\"]" \
	"RETURN: [TOKENX]" \
    "SETCP: [APP_ID=10000028,CUST_ID=TBSI,UID=3,TOKEN=^^token^^,USERNAME=apiUser,TRUNK_ID=1301,VER=10.03,SESSION_ID=^^session^^]";
//
Ulong_t CEMax::GetCEMaxToken()
{
   char cps [1000];
    Ulong_t callid = 100000;
    Ulong_t exitcode = -1;
    Ulong_t timeout = 3000;
    strcpy(cps, &m_CPS[0]);
    Ulong_t res = ExecuteFromHookEx(callid,&cps[0],exitcode, timeout,gettoken);
	//accapi_my_print(0, "CEMax::GetCEMaxToken  rss: %d, RESPONSE: %s\n",res, &cps[0]);
	if (res != 0)
    {
      accapi_my_print(0,"CEMax::GetCEMaxToken =>  failed to get token from CEMax http error: %d\n",exitcode);
    }
    else
    {
      m_Token = &cps[0];
      //accapi_my_print(0,"CEMax::GetCEMaxToken =>  Token: %s\n",m_Token.c_str());
    }

    return res;
}
//
//=====================================[ SendAgents]===================
string agentsetUrl = "/agents/set/";
string sendAgentsTxt =
	"HTTPHEADER: [Content-Type::: application/json]" \
	"HTTPHEADER: [Accept-Charset::: utf-8]" \
	"HTTPHEADER: [CEMAX_AUTH::: ~~TOKEN~~]" \
	"HTTPPOST: [~~URL~~]," \
    "[~~AGENTLIST~~]"
	"PREFIX: [\"replyErrorMessage\":\"]" \
	"SUFFIX: [\"]" \
	"RESPONSE: [code]" \
	"PREFIX: [\"replyErrorId\":]" \
	"SUFFIX: [,]" \
	"RETURN: [CPF]" \
    "SETCP: [code: ^^code^^,msg: ^^msg^^]";
//
Ulong_t CEMax::SendAgents(string agentJasonStr)
{
	Ulong_t res;
    char *cps;
	cps = new char[agentJasonStr.length() + 16000];
    Ulong_t callid = 100000;
    Ulong_t exitcode = -1;
    Ulong_t timeout = 3000;
	string fullurl = m_CemaxUrl + agentsetUrl;
	sprintf(&cps[0],"||TOKEN:%s|URL:%s|AGENTLIST:%s||",m_Token.c_str(),fullurl.c_str(),agentJasonStr.c_str());
	accapi_my_print(3,"\n\nCEMax::SendAgents, cps len: %d",strlen(cps));
    res = ExecuteFromHookEx(callid,&cps[0],exitcode, timeout,sendAgentsTxt);
    if (res != 0)
    {
    }
    else
    {
    }
	delete cps;
    return res;
}
//CEMAX_AUTH: APP_ID=10000028,CUST_ID=TBSI,UID=3,TOKEN=2B2FBB15-855E-4A25-9AA2-FF5C7B405570,USERNAME=apiUser,TRUNK_ID=1301,VER=10.03,SESSION_ID=0v14emdffyf21TF4wgxbcgbr 

//=====================================[ SendGroups]===================
string groupssettUrl = "/groups/set/";
string sendGroupsTxt =
	"HTTPHEADER: [Content-Type::: application/json]" \
	"HTTPHEADER: [Accept-Charset::: utf-8]" \
	"HTTPHEADER: [CEMAX_AUTH:::~~TOKEN~~]" \
	"HTTPPOST: [~~URL~~]," \
    "[~~GROUPLIST~~]"
	"RESPONSE: [msg]" \
	"PREFIX: [\"replyErrorMessage\":\"]" \
	"SUFFIX: [\"]" \
	"RESPONSE: [code]" \
	"PREFIX: [\"replyErrorId\":]" \
	"SUFFIX: [,]" \
	"RETURN: [CPF]" \
    "SETCP: [code: ^^code^^,msg: ^^msg^^]";
					  
//
Ulong_t CEMax::SendGroups(string groupsJsonStr)
{
    char *cps;
	cps = new char[groupsJsonStr.length() + 16000];
	Ulong_t res;
    Ulong_t callid = 100000;
    Ulong_t exitcode = -1;
    Ulong_t timeout = 3000;
	string fullurl = m_CemaxUrl + groupssettUrl;
	sprintf(&cps[0],"||TOKEN:%s|URL:%s|GROUPLIST:%s||",m_Token.c_str(),fullurl.c_str(),groupsJsonStr.c_str());
	//accapi_my_print(3,"\n\nCEMax::SendGroups");
 
    res = ExecuteFromHookEx(callid,&cps[0],exitcode, timeout,sendGroupsTxt);
    if (res != 0)
    {
      
    }
    else
    {
     
    }
	delete cps;
    return res;
}
//-------------------------------------------------
string sendAgentTxt =
	"HTTPHEADER: [Content-Type::: application/json]" \
	"HTTPHEADER: [Accept-Charset::: utf-8]" \
	"HTTPHEADER: [CEMAX_AUTH::: ~~TOKEN~~]" \
	"HTTPPOST: [~~URL~~]," \
    "[~~DATA~~]"
	"RESPONSE: [msg]" \
	"PREFIX: [\"replyErrorMessage\":\"]" \
	"SUFFIX: [\"]" \
	"RESPONSE: [code]" \
	"PREFIX: [\"replyErrorId\":]" \
	"SUFFIX: [,]" \
	"RETURN: [CPF]" \
    "SETCP: [code: ^^code^^,msg: ^^msg^^]";
//
//=====================================[ SendAgentLogon ]==================
Ulong_t CEMax::PrepareAgentCP(string agentNo,string api_str,string hookData){
	memset(m_CPS,0,sizeof(m_CPS));
	string fullurl = m_CemaxUrl + api_str;
	string data = hookData;
	if (data == ""){
		data = (char *) "{\"agent_id\": \"" + agentNo + (char *) "\"}";
	}
	Ulong_t exitcode = 0;
	sprintf(&m_CPS[0],"||TOKEN:%s|URL:%s|DATA:%s||",m_Token.c_str(), fullurl.c_str(),data.c_str());
	accapi_my_print(0, "CEMax::PrepareAgentCP: %s\n", m_CPS);
	Ulong_t res = ExecuteFromHookEx(0,&m_CPS[0],exitcode, 3000,sendAgentTxt);
    return res;
}

//=====================================[ CEMaxInit ]=====================
//{"AccBaseUrl”:”https://......”}}
//
  Ulong_t CEMax::CEMaxInit(){
	  Ulong_t res =  GetCEMaxToken();
	  if (res == 0) {
		  memset(m_CPS, 0, sizeof(m_CPS));
		  string api_str = "/Init/";
		  string data = (char*)"{\"AccBaseUrl\": \"" + m_accFromCemaxUrl + (char*)"\"}";
		  return PrepareAgentCP("", api_str, data);
	  }
	  return res;
  }
//=====================================[ SendAgentLogon ]==================
//{"agent_id":1}
//
  Ulong_t CEMax::SendAgentLogon(string AgentNo){
	  string api_str = "/agent-logon-response/";
	  return PrepareAgentCP(AgentNo,api_str);
  }
//=====================================[ SendAgentLogOff ]=================
//{"agent_id":1}
  Ulong_t CEMax::SendAgentLogOff(string AgentNo){
	  string api_str = "/agent-logoff-response/";
	  return PrepareAgentCP(AgentNo,api_str);
  }
//=====================================[ SendAgentLogin ]==================
  Ulong_t CEMax::SendAgentLogin(string AgentNo){
	  string api_str = "/agent-login/";
	  return PrepareAgentCP(AgentNo,api_str);
  }
//=====================================[ SendAgentLogout ]=================
//{"agent_id":1}
  Ulong_t CEMax::SendAgentLogout(string AgentNo){
	  string api_str = "/agent-logout/";
	  return PrepareAgentCP(AgentNo,api_str);
  }
  //=====================================[ SendAgentReleaseResume ]==========
  //{“agent_id":1, “status":"release/resume"}
  Ulong_t CEMax::SendAgentReleaseResume(string agentNo, string release_resume) {
	  string api_str = "/agent-release-status/";
	  string data = (char*)"{\"agent_id\": \"" + agentNo + (char*)"\",\"status\": \"" + release_resume + (char*)"\"}";
	  return PrepareAgentCP(agentNo, api_str, data);
	  return 0;
  }
  //=====================================[ SendAgentRinging ]==========
  Ulong_t CEMax::SendAgentRinging(string agentNo, string CPSX) {
	  string api_str = "/agent-ringing-status/";
	  string data = (char*)"{\"agent_id\": \"" + agentNo + (char*)"\",\"status\": \"" + "Ringing" + (char*)"\",\"cp\": \"" + CPSX + (char*) "\"}";
	  return PrepareAgentCP(agentNo, api_str, data);
	  return 0;
  }  
  //=====================================[ SendAgentDisconnected ]==========
  Ulong_t CEMax::SendAgentDisconnected(string agentNo) {
	  string api_str = "/agent-disconnected-status/";
	  string data = (char*)"{\"agent_id\": \"" + agentNo + (char*)"\",\"status\": \"" + "disconnected" + (char*)"\"}";
	  return PrepareAgentCP(agentNo, api_str, data);
	  return 0;
  }
//=====================================[ SendAgentConfirmOnline ]==========
//{"agent_id":1, "status": "confirm/denied"}
  Ulong_t CEMax::SendAgentConfirmOnline(string agentNo,string confirmORnot){
	  string api_str = "/agent-online-response/";
 	  string data = (char *) "{\"agent_id\": \"" + agentNo + (char *) "\",\"status\": \"" + confirmORnot +  (char *) "\"}";
	  return PrepareAgentCP(agentNo,api_str,data);
	  return 0;
	  
  }
	  
 



