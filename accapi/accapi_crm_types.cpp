#include <er_std_override.h>
#include <stdio.h>
#include <time.h>
#include <vector>
#include <string>
#include "accapi_crm_types.h"
#include "accapi_timer.h"

#ifdef WIN32
#pragma warning(disable:4996)
#endif

extern "C" {
#include <sgen.h>
}

extern AGENTINFO_MAP agents_db;
void accapi_my_print(int level,const char* fmt, ...);
void ClearAgentReport(vector<REPORT> &report);
int sendResponse(int clientId, string reponse);
struct WFMagentState
{
  char exetension[6];
  char sp1;
  char state[3];
  char sp2;
  char time_in_state[5];
  char sp3;
  char split[6];
  char sp4;
  char agent_id[10];
  char sp5;
  char reason_code[6];
  char sp6[10];
  char lf;
  char zero;
} agent_state_line;
AccapiCrmType_c::AccapiCrmType_c(){m_CrmType = "Acc Web Agent";}

//
void handle_json_special_chars(char *source, char *t)
{
  int y = 0;
  for (size_t i = 0; i < strlen(source); ++i)
  {
    if (source[i] == 8   ) {
      t[y++] = '\\';
      t[y++] = '\\';
      t[y++] = '\\';
      t[y++] = 'b';
    }
    else if (source[i] == 9) {
      t[y++] = '\\';
      t[y++] = '\\';
      t[y++] = '\\';
      t[y++] = 't';
    }
    else if (source[i] == 10) {
      t[y++] = '\\';
      t[y++] = '\\';
      t[y++] = '\\';
      t[y++] = 'n';
    }
    else if (source[i] == 12  )
    { 
      t[y++] = '\\';
      t[y++] = '\\';
      t[y++] = '\\';
      t[y++] = 'f';
    }
    else if (source[i] == 13  ) {
      t[y++] = '\\';
      t[y++] = '\\';
      t[y++] = '\\';
      t[y++] = 'r';
    }
    else if (source[i] == '"') {
      t[y++] = '\\';
      t[y++] = '\\';
      t[y++] = '\\';
      t[y++] = '"';
    }
    else if (source[i] == '\\') {
      t[y++] = '\\';
      t[y++] = '\\';
      t[y++] = '\\';
      t[y++] = '\\';
    }
    else if (source[i] >= 0x00 && source[i] < 0x20) {
      accapi_my_print(3, "handle_json_special_chars => IGNORE CHARACTER %x\n", source[i]);
    }
    else {
      t[y++] = source[i];
    }
  }
  t[y]=0;
 }
//
std::string  AccapiCrmType_c::PrepareConnectHeader()
{
  char area[512];
  std::string s;
  // First line in report  after reconnection
  s = "_ _ BEGIN _ _\n";
  sprintf(&area[0], "_ _\"%ld\"_ _\n", time(0));
  s += &area[0];
  return s;
}
std::string  AccapiCrmType_c::PrepareConnectTrailer()
{
  std::string s;
  // First line in report  after reconnection
  s = "_ _ END _ _\n";
  return s;
}
//
char fixdata[1024];
char line[200000];
extern  AGENTINFO_MAP_IT agent_db_iterator;
static bool isJsonExceeded = false;
//
string  AccapiCrmType_c::SendJsonData(int &clienId)
{
  //[{"direction":"t_s","agentNo":"1001","action":"Login","params":s,000,1001,1,2001"}]
  std::string s;
  std::string jsonString = "[ ";
  // First line in report  after reconnection
  int currClientid = -1;
  //( v.begin() + index );
  //14-May-2023 YR BZ#57826
  for (agent_db_iterator = agents_db.begin(); agent_db_iterator != agents_db.end(); ++agent_db_iterator)
  {
    isJsonExceeded = false;
    AgentDbInfo_c& ADI = agent_db_iterator->second;
    if (ADI.m_AgentWSid == -1) continue;
    if (ADI.m_report.size() > 0)
    {
      Ulong_t callId = 0;
      sprintf(&fixdata[0], "%ld,%d\0", ADI.m_StartStateTime, atoi(&ADI.m_Number[0]));
      int count = 0;
      //-----------------------------------
      char sss[64000], ttt[64000];
      int report_size = (int)ADI.m_report.size();
      accapi_my_print(3, "SendJsonData (clientId %d) => report_size: %d\n", clienId, report_size);
      for (int i = 0; i < (int)ADI.m_report.size(); ++i)
      {
        if (ADI.m_report[i].m_Done == true)
        {
          count++;
          continue;
        }
        ADI.m_report[i].m_CallId == 0xFFFFFFFF ? callId = 0 : callId = ADI.m_report[i].m_CallId;
        char grpsText[2048];
        grpsText[0] = 0;
        //
        if (currClientid == -1)
        {
          currClientid = ADI.m_report[i].m_ClientId; // send notifications to one web server in one sending time
        }
        else if (currClientid != ADI.m_report[i].m_ClientId)
        {
          if (ADI.m_report[i].m_ClientId == -1) count++; // may more than one tomcat server connected
          continue;
        }
        //
        for (int j = 0; j < (int)ADI.m_report[i].m_Groups.size(); ++j)
        {
          Groups& G = ADI.m_report[i].m_Groups[j];
          sprintf(&grpsText[strlen(&grpsText[0])], "%d;%d|", G.m_grp_id, G.m_primary);
        }

        sprintf(&line[0], "{\"sessionid\":\"%s\",\"direction\":\"f_s\",\"agentNo\":\"%s\",\"action\":\"%s\",\"params\":",
                ADI.m_report[i].m_SessionId.c_str(),
                &ADI.m_Number[0],
                ADI.m_report[i].m_Action.c_str());
        sprintf(&sss[0], "%s,%s,%s,%s,%s,%s,%s,%s,%s,%d,%d,%u,%s,%s",
                &fixdata[0],
                ADI.m_report[i].m_Action.c_str(),
                ADI.m_report[i].m_DetailedAction.c_str(),
                ADI.m_report[i].m_MoreDetail.c_str(),
                ADI.m_report[i].m_DevId.c_str(),
                ADI.m_report[i].m_CallingCalledDevId.c_str(),
                ADI.m_report[i].m_JoiningCalledDevId.c_str(),
                ADI.m_report[i].m_OriginalCalledDevId.c_str(),
                ADI.m_report[i].m_LastRedirectDevId.c_str(),
                ADI.m_report[i].m_Code1,
                ADI.m_report[i].m_Code2,
                callId,
                grpsText,
                ADI.m_report[i].m_IsAcd.c_str());
        handle_json_special_chars(&sss[0], &ttt[0]);
        sprintf(&line[strlen(&line[0])], "\"%s\"},", &ttt[0]);
        //
        if (jsonString.length() + strlen(line) > 30000)
        {
          accapi_my_print(3, "SendJsonData:jsonString.length(): %d, line length: %d\n", jsonString.length(), strlen(line));
          jsonString[jsonString.length() - 1] = ']';
          sendResponse(ADI.m_AgentWSid, jsonString); // sen long message immediate
          jsonString = "[ ";
        }

        if (ADI.m_report[i].m_Action.length() > 2)
        {
          if (memcmp(ADI.m_report[i].m_Action.c_str(), "__", 2) != 0)
          {
            accapi_my_print(3, "json=> %.200s\n", &line[0]);
          }
          else
          {   //  write to accapi.log => acc agent tables like telephony.json
            if (memcmp(ADI.m_report[i].m_Action.c_str(), "__per", 5) != 0)
            {
              accapi_my_print(4, " json=> %.170s\n", &line[0]);
            }
            //else
            //{   // write to accapi.log personal statistics
            //  accapi_my_print(4, " personal json=> %.170s\n", &line[0]);
            //}
          }
        }
        jsonString += (char*)&line[0];
        ADI.m_report[i].m_Done = true;
        count++;
      }
      if (count >= (int)ADI.m_report.size())
      {
        accapi_my_print(3, "SendJsonData (clientId %d) => ClearAgentReport \n", clienId);
        ClearAgentReport(ADI.m_report);
        ADI.m_Changed = false;
      }
      else
      {
        accapi_my_print(3, "********agent %s, report size: %d,saved size :%d, count: %d\n",
          &ADI.m_Number[0], ADI.m_report.size(), report_size, count);
      }
    }
  }
  jsonString[jsonString.length() - 1] = ']';
  if (jsonString.length() > 10)
  {
    clienId = currClientid;
  }
  if (agent_db_iterator == agents_db.end()) {
    agent_db_iterator = agents_db.begin();
  }
  return jsonString;
}
//
int AccapiCrmType_c::SendFirstConnectionData(std::vector<std::string> &lines,bool forceSendLoginAgents)
{
  std::string s;
  lines.clear();
  // First line in report  after reconnection
  AGENTINFO_MAP_IT it;
  for (it = agents_db.begin(); it != agents_db.end(); ++it)
  {
    AgentDbInfo_c& ADI = it->second;
    if (ADI.m_report.size() > 0)
    {
      char fixdata[102];
      char line[1024];
      char prevLine[1024]; prevLine[0] = 0;
      Ulong_t callId = 0;
      sprintf(&fixdata[0], "%ld,%d\0", ADI.m_StartStateTime, atoi(&ADI.m_Number[0]));
      for (int i = 0; i < (int)ADI.m_report.size(); ++i)
      {
        ADI.m_report[i].m_CallId == 0xFFFFFFFF ? callId = 0 : callId = ADI.m_report[i].m_CallId;

        if (ADI.m_report[i].m_CallId == 0xFFFFFFFF)
        {

        }
        char grpsText[2048]; grpsText[0] = 0;
        for (int j = 0; j < (int)ADI.m_report[i].m_Groups.size(); ++j)
        {
          Groups& G = ADI.m_report[i].m_Groups[j];
          sprintf(&grpsText[0], "%d;%d", G.m_grp_id, G.m_primary);
        }

        sprintf(&line[0], "%s,%s,%s,%s,%s,%s,%s,%s,%s,%d,%d,%u,%s,%s\n",
                &fixdata[0],
                ADI.m_report[i].m_Action.c_str(),
                ADI.m_report[i].m_DetailedAction.c_str(),
                ADI.m_report[i].m_MoreDetail.c_str(),
                ADI.m_report[i].m_DevId.c_str(),
                ADI.m_report[i].m_CallingCalledDevId.c_str(),
                ADI.m_report[i].m_JoiningCalledDevId.c_str(),
                ADI.m_report[i].m_OriginalCalledDevId.c_str(),
                ADI.m_report[i].m_LastRedirectDevId.c_str(),
                ADI.m_report[i].m_Code1,
                ADI.m_report[i].m_Code2,
                callId,
                grpsText,
                ADI.m_report[i].m_IsAcd.c_str());
        int notsame = strcmp(prevLine, line);
        if (notsame)
        {
          lines.push_back((char*)&line[0]);
          accapi_my_print(0, "event: %s", &line[0]);
          strcpy(prevLine, line);
        }
      }

      ADI.m_report.clear();
      ADI.m_Changed = false;
    }
  }
  return 0;
}
std::string  AccapiCrmType_c::PrepareAgentChangesHeader()
{
  char area[512];
  std::string s;
  // First line in report  after reconnection
  sprintf(&area[0], "_ _\"%ld\"_ _\n", time(0));
  return &area[0];
}
int AccapiCrmType_c::SendChanges(std::vector<std::string> &lines)
{
  std::string s;
  lines.clear();
  return 0;
}

void AccapiCrmType_c::SetAgentState()
{
}
