#ifndef ACCAPI_CEMax_C
#define ACCAPI_CEMax_C
class CEMax
{
public:
  CEMax(string cemaxapiurl,string ceamxregisterurl,string accFromCemaxUrl, string user, string password);
  ~CEMax(void);
  Ulong_t PrepareAgentCP(string agentNo,string api_str,string hook="");
  Ulong_t GetCEMaxToken();
  Ulong_t CEMaxInit();
  Ulong_t ACCFirstRegistration();
  Ulong_t SendAgents(string agentJasonStr);
  Ulong_t SendGroups(string groupsJsonStr);
  Ulong_t SendAgentLogon(string AgentNo);
  Ulong_t SendAgentLogOff(string AgentNo);
  Ulong_t SendAgentLogin(string AgentNo);
  Ulong_t SendAgentLogout(string AgentNo);
  Ulong_t SendAgentReleaseResume(string AgentNo,string release_resume);
  Ulong_t SendAgentConfirmOnline(string AgentNo,string confirmORnot);
  Ulong_t SendAgentRinging(string agentNo, string CPSX);
  Ulong_t SendAgentDisconnected(string agentNo);

   //
  string m_CemaxUrl;
  string m_CemaxRegUrl;
  string m_accFromCemaxUrl;
  string m_Token;
  string m_user;
  string m_password;
  char m_CPS[32000];
};
#endif // ACCAPI_CEMax_C