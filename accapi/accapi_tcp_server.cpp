#include <string>
#include <stdio.h>
#include <vector>
#include <vector>
#include <time.h>
#include <map>
#include <string.h>
#include <iostream>

#include "rinifile.h"
#include "SolTcpServer.h"
#include "SolRecordException.h"
#include "../SolLib/sollib.h"
#include <adupdate.h>

#include "accapi_timer.h"
#include "accapi_work_thread.h"

extern "C"
{
#include <ha_defs.h>
#include <anx_alarms_def.h>
#include <sgen.h>
#include "oeve.h"
#include "ogen.h"
#include "othr.h"
#include <oendian.h>
}
//
#ifdef _WIN32
#include <windows.h>
#include <process.h>
#include <winbase.h>
#endif

using namespace std;

int countPacket = 0;
long long len = 0;
extern time_t  popfromqueue;
extern time_t  pushtoqueue;
extern TcpRequestsDef TcpRequests;
//void DistributeAdminUpdate(string params);
EosRetCode_t  sendEventToADU(vector<string> event_data);
int  SendWebAdminDBActionStatus(int clientId, string& session, string& user, string action);
//int  sendOdbcFile(int clientId, string& session, string& user, string action, string data);
string Odbcini2Json();
int SimpleExecFullHttp(void*, const string request, const string cpf);

//
int AgentExists(string agent_no, int clientId, string sessionId, string action, string& params);
void LogoffAllAgents(int clientid);
int sendResponse(int clientId, string response);
//
vector<string> RecieveQueu;
Mutex RecieveQueuMutes;
#include <memory.h>
extern _MultiStreamsManager MultiStreamsManager;
static time_t lastKeepalive = 0;
//

//=============================== [ private_send ] ===================================
int private_send(MultiStreams* MS, string buf)
{
  int length = 0;
  char send_buffer[1024];
  memset(send_buffer, 0, 1024);
  short s_len = (short)buf.length();
  memcpy(&send_buffer[0], (char*)&s_len, sizeof(short));
  memcpy(&send_buffer[0] + sizeof(short), (char*)buf.c_str(), s_len);
  MS->m_stream->Send(&send_buffer[0], s_len + sizeof(short), NULL);
  return length;
}

//=============================== [ ReplaceString ] ===================================
std::string ReplaceString(std::string subject, const std::string& search, const std::string& replace)
{
  size_t pos = 0;
  while ((pos = subject.find(search, pos)) != std::string::npos) {
    subject.replace(pos, search.length(), replace);
    pos += replace.length();
  }
  return subject;
}

//=============================== [ getValueByNamefromJsonstring ] ===================================
// "\"direction\":\"t_s\",\"agentId\":\"1002\",\"action\":\"Login\",\"params\":\"login,000,1002,1,2002\"}],"
bool getValueByNamefromJsonstring(string& jsonstring, char* name, string& result)
{
  string res = "";
  string search = name;
  int found = jsonstring.find(search);
  if (found == string::npos) return false;
  found += search.length();
  int len = jsonstring.length() - found;
  char* s = (char*)&jsonstring.c_str()[found];
  for (int i = 0; i < len; ++i)
  {
    if (s[i] == ':')
    {
      for (int j = i + 1; j < len; ++j)
      {
        if (s[j] == '"')
        {
          j++;
          for (int k = j; k < len; ++k)
          {
            if ((memcmp(&s[k], "\",", 2) == 0) || (memcmp(&s[k], "\"}", 2) == 0)) // found the value
            {
              s[k] = 0;
              result = &s[j];
              s[k] = '"';
              return true;
            }
          }
        }
      }
    }
  }
  accapi_my_print(0, "getValueByNamefromJsonstring; cannot find: %s\n", name);
  return false;
}

//=============================== [ InsertRequesToQueue ] ===================================
void InsertRequesToQueue(char* request)
{
  RecieveQueuMutes.Lock();
  RecieveQueu.push_back(request);
  RecieveQueuMutes.Unlock();
  //accapi_my_print(5,"InsertRequesToQueue -> %d,%s\n",RecieveQueu.size(), request);
}

//=============================== [ GetRequesfromQueue ] ===================================
EosHAServerStatus_t  isActice = EOS_HAS_INITIALIZING;
string GetRequesfromQueue()
{
  string req = "";
  RecieveQueuMutes.Lock();
  if (RecieveQueu.size() > 0)
  {

    req = RecieveQueu[0];
    //accapi_my_print(5,"GetRequesfromQueue -> %d,%s\n",RecieveQueu.size(), req.c_str());

    RecieveQueu.erase(RecieveQueu.begin());
    popfromqueue = time(0);

    //accapi_my_print(5,"GetRequesfromQueue  aft erase-> %d,%s\n",RecieveQueu.size(), req.c_str());
  }
  else
  {
    EosHAServerStatus_t serverstaus = EosHAGetLocalStatus(__FILE__, __LINE__);
    //22-Nov-2023 YR BZ#58665
    //if (serverstaus != isActice)
    //{
    //  if ((serverstaus != EOS_HAS_ACTIVE_SA) && (serverstaus != EOS_HAS_ACTIVE))
    //  {
    //    setNewAlarmStatus(ACC_WEB_AGENT_SERVER_CONNECTION_LOST, TRUE, (char*)"ACC Web Agent NOT Connected", (char*)"");
    //  }
    //  else
    //  {
    //    setNewAlarmStatus(ACC_WEB_AGENT_SERVER_CONNECTION_LOST, FALSE, (char*)"ACC Web Agent Connected", (char*)"");
    //  }
    //}
    isActice = serverstaus;
  }
  RecieveQueuMutes.Unlock();
  return req;
}

//====================== Split ===================
int Split(char* source, std::vector<string>& dest, char* search)
{
  int currPos = 0;
  int k = 0;
  int prevPos = 0;
  char* q;
  char c;
  int searchlen = strlen(search);
  dest.clear();
  do
  {
    q = strstr(&source[currPos], search);
    if (q != 0)
    {
      c = *q;
      *q = 0;
      string s = &source[currPos];
      *q = c;
      currPos += (s.length() + searchlen);
      dest.push_back(s);
      //printf("+++ %d->%s\n",k, s.c_str());
      k++;
    }
    else
    {
      if (currPos < strlen(source))
      {
        string s = &source[currPos];
        dest.push_back(s);
        k++;
      }
    }
  } while (q);
  //dest.push_back(source.substr(prevPos,source.length()));
  return k;
}

void DistributeAdminUpdate(string params)
{
  // [{"params":"admindistribute,000,accadmin,grp_agent,DELETE,18,183,"}]
  // typedef enum { ADU_UNKNOWN, ADU_INSERT, ADU_DELETE, ADU_UPDATE } AuChange_t;
  // v[0] - admindistribute
  // v[1] - User Name
  // v[2] - Table Name
  // v[3] - ACTION (adu_code)
  // v[4] - TBLID
  // v[5] - KEY (Entity Id)
  vector <string> v;
  int count = Split((char*)params.c_str(), v, (char*)",");
  int aducode = atoi(v[3].c_str());
  int tbid = atoi(v[4].c_str());
  int key = 0, key2 = 0;
  if(count > 5)
    key = atoi(v[5].c_str());
  if (count > 6)
    key2 = atoi(v[6].c_str());
  AdminUpdate(EosNtoHL(aducode), EosNtoHL(tbid), EosNtoHL(key), EosNtoHL(key2));
  //string isNew = params[6] == "false" ? "Update" : "Add";

  //SendToAuditLog("ea", "ACCADMIN", "", "", v[4], v[5], v[6], 0, my_IP);// userentry->m_Ip);

  accapi_my_print(3, "DistributeAdminUpdate ==> table: %s,TBLID: %d, action: %d, id1: %d, id2: %d\n", v[2].c_str(), tbid, aducode, key, key2);
}

//====================== class RecievedPacket ===================
//RecievedPacket::ReceivedFunction
string getSSOState();
class RecievedPacket : public RecievedBase
{
public:
  virtual int AppConnectedFunction(int m_clientId, MultiStreams* multiStreams)
  {
    EosHAServerStatus_t  serverstaus = EosHAGetLocalStatus(__FILE__, __LINE__);
    string s = "SOLSOL - ";
    s += EosHAGetStatusName(serverstaus);

    s += getSSOState();
    //22-Nov-2023 YR BZ#58665
    setNewAlarmStatus(ACC_WEB_AGENT_SERVER_CONNECTION_LOST, FALSE, (char*)"ACC Web Agent Connected", (char*)"");

    multiStreams->m_ClientId = m_clientId;
    accapi_my_print(0, "AppConnectedFunction - '%s' client id = %d\n", s.c_str(), m_clientId);
    sendResponse(m_clientId, s);
    return 0;
  }

  //===================================[ AppDisconnectFunction ]=======================================
  virtual int AppDisconnectFunction(int m_clientId, MultiStreams* multiStreams, int reason)
  {
    accapi_my_print(0, "AppDisconnectFunction: client id = %d diconnected, logoff all cgents\n", m_clientId);
    //22-Nov-2023 YR BZ#58665
    setNewAlarmStatus(ACC_WEB_AGENT_SERVER_CONNECTION_LOST, TRUE, (char*)"ACC Web Agent NOT Connected", (char*)"");
    LogoffAllAgents(m_clientId);
    return 0;
  }

  //====================================[ ReceivedFunction ] =========================================
  virtual int ReceivedFunction(int clientId, MultiStreams* MS, char* recivedBuff, int recivedLength)
  {
    if (recivedLength == 0)
    {
      return recivedLength;
    }
    countPacket++;
    len += (long long)recivedLength;
    std::string body = recivedBuff;
    string result = "";
    string  agentNo = "";
    string sessionid = "";
    string action = "";
    if (body == "[]")
    {
      return recivedLength;
    }
    if (getValueByNamefromJsonstring(body, (char*)"\"agentNo\"", agentNo) == false)
    {
      accapi_my_print(0, "clientId %d, RECIEVE missing agentNo %s\n", clientId, recivedBuff);
      return recivedLength;
    }
    if (getValueByNamefromJsonstring(body, (char*)"\"sessionid\"", sessionid) == false)
    {
      accapi_my_print(0, (char*)"clientId %d, RECIEVE missing sessionid %s\r\n", clientId, recivedBuff);
      return recivedLength;
    }
    if (getValueByNamefromJsonstring(body, (char*)"\"action\"", action) == false)
    {
      accapi_my_print(0, "clientId %d, RECIEVE missing action %s\n", clientId, recivedBuff);
      return recivedLength;
    }

    if (action != "keepalive")
    {
      if (action != "__agentLog" && action != "getPersonalStatistics")
      {
        if (recivedLength < 500)
        {
          accapi_my_print(3, "sock CID %d, queue: %d len: %d %s\n", clientId, RecieveQueu.size(), recivedLength, recivedBuff);
        }
      }
    }
    if (agentNo.size() >= 4) {
      pushtoqueue = time(0);
    }
    if (getValueByNamefromJsonstring(body, (char*)"\"params\"", result) == false)
    {
      accapi_my_print(0, "clientId %d, RECIEVE missing params %s\n", clientId, recivedBuff);
      return recivedLength;
    }

    //// ----------------------------------------------------------------
    int agent_exists = AgentExists(agentNo.c_str(), clientId, sessionid, action, result);
    if (action == "keepalive")
    {
      time_t t = time(0);
      int t5min = t % 300;
      if (t5min > 293 && t5min < 299)
      {
        accapi_my_print(3, "sock CID %d, queue: %d len: %d %s\n", clientId, RecieveQueu.size(), recivedLength, recivedBuff);
      }
      EosHAServerStatus_t  serverstaus = EosHAGetLocalStatus(__FILE__, __LINE__);
      string s = "SOLSOL - ";
      s += EosHAGetStatusName(serverstaus);
      MS->m_ClientId = clientId;
      if (!(EOS_HAS_ACTIVE_SA == serverstaus || EOS_HAS_ACTIVE == serverstaus))
      {
        lastKeepalive = time(0) - 10;
        sendResponse(clientId, s);
        accapi_my_print(0, "ReceivedFunction Keealive identify not active - %s: client id = %d\n", s.c_str(), clientId);
      }
      if ((time(0) - lastKeepalive) > 6) {

        lastKeepalive = time(0);
      }
      return recivedLength;
    }
    recivedBuff[recivedLength] = ',';
    recivedBuff[recivedLength + 1] = 0;
    vector<string> splited1;
    string req = recivedBuff;
    // prepare send to web server

    //// ------------------- admin_update ------------------
    if (action == "admin_update")
    {
      //recieve updates from  web admin
      //vector<string> v;
      //int count = Split((char*)result.c_str(), v, (char*)",");
      //if (count >= 3)
      //{
      //  sendEventToADU(v);
      //}
      DistributeAdminUpdate(result.c_str());
      return recivedLength;
    }

    result += "," + sessionid + ",";
    char cidStr[10];
    sprintf(&cidStr[0], "%.4d", clientId);
    result += &cidStr[0];
    if (agent_exists == 0)
    {
      InsertRequesToQueue((char*)result.c_str());
      return recivedLength;
    }
    accapi_my_print(0, "clientId %d, Agent No not found %s\n", clientId, recivedBuff);
    string s = recivedBuff;
    // if Can't find agent ain agent_db && action == "logon" send  agentDenied to logon of this agent
    size_t pos1 = s.find("suplogon");
    size_t pos = s.find("Logon");
    if (pos != std::string::npos || (pos1 != std::string::npos))
    {
      char c[56];
      time_t t = time(0);
      sprintf(c, "%d", time(0));
      string x = &c[0]; x += "," + agentNo;
      x += ",agentDenied";
      s = ReplaceString(s, "logon", x);
      s = ReplaceString(s, "Logon", "agentDenied");
      if (agent_exists > -17)
      {
        s = ReplaceString(s, "\"}]", ",3,3,3,3,-1,0,,N\"}]");
        sendResponse(clientId, s);
        accapi_my_print(0, "ReceivedFunction size to send write to client queue %d, %s \n", s.size(), s.c_str());
      }
      else {
        char ttt[32];
        sprintf(&ttt[0], ",%d,%d,%d,%d,-1,0,,N\"}]", (agent_exists * -1), (agent_exists * -1), (agent_exists * -1), (agent_exists * -1));
        s = ReplaceString(s, "\"}]", &ttt[0]); // more than one same usr not allowd
        //sendResponse(clientId, s);
        //accapi_my_print(0, "ReceivedFunction size to send write to client queue %d, %s \n", s.size(), s.c_str());
      }
    }
    return recivedLength;
  }
};
//---------------------------------------------
void my_sleep(int sec)
{
  ThreadMgr::Sleep(sec / 1000, sec % 1000);
}


//====================================[ sendResponse ] =========================================
int sendResponse(int clientId, string response)
{
  if (clientId != -1)
  {
    if (response.length() > 200)
      accapi_my_print(3, "sendResponse (client %d) ==> response (size %d to long to print): \n", clientId, response.size());
    else
      accapi_my_print(3, "sendResponse (client %d) ==> response (size %d): \n%s \n", clientId, response.size(), response.c_str());
    short len = response.length();
    char* buf = new char[65000];
    memset(&buf[0], 0, 65000);
    memcpy(&buf[0], (void*)&len, sizeof(short));
    memcpy(&buf[2], response.c_str(), response.length());
    TcpRequests.Push(clientId, TCP_SEND_REQUEST, (char*)buf, response.length() + 2);
    delete[] buf;
  }
  return 0;
}

//=============================== Send Notification ==============================
//{"sessionid":"1672091655610","direction":"f_s","agentNo":"1001","action":"logon","params":"1608387772,1001,logon,,8|64|,,2001,16nXnNeV157XmSDXkNeR16jXkteZ15w=,,MQ==,0,0,0,,N"},
void SendNotification(supEntry* userentry, string action, Ulong_t code, string data)
{
  char* buf = new char[64000 + 1];
  char fixdata[256];
  string data_part = "";
  int len = data.length();
  int idx = 0;
  int partNo = 0;
  if (data.length() > 100)
    accapi_my_print(3, "SendNotification ==> data_len: %d, action: %s\n", data.length(), action.c_str());
  else
    accapi_my_print(3, "SendNotification ==> data_len: %d, action: %s\n%s\n", data.length(), action.c_str(), data.c_str());
  do
  {
    memset(&buf[0], 0, 64000);
    data_part = data.substr(idx, 30000);
    string actionX = (len > 30000) ? "==" + action : action;
    //
    sprintf(&fixdata[0], "%ld,%s,%s,%d\0", time(0), &userentry->m_supName[0], actionX.c_str(), code);
    //
    if (action.find("admin") != string::npos)
    {
      sprintf(&buf[0], "[{\"sessionid\":\"%s\",\"direction\":\"af_s\",\"agentNo\":\"%s\",\"action\":\"%s\",\"params\": \"%s,%s,%d,%d,,,,,,,,,,\"}]",
              userentry->sessionId.c_str(),
              userentry->m_supName.c_str(),
              actionX.c_str(),
              fixdata,
              data_part.c_str(),
              partNo,
              userentry->m_supLevel);
    }
    else
    {
      sprintf(&buf[0], "[{\"sessionid\":\"%s\",\"direction\":\"gf_s\",\"agentNo\":\"%s\",\"action\":\"%s\",\"params\": \"%s,%s,%d,%d,,,,,,,,,,\"}]",
              userentry->sessionId.c_str(),
              userentry->m_supName.c_str(),
              actionX.c_str(),
              fixdata,
              data_part.c_str(),
              partNo,
              userentry->m_supLevel);
    }
    //
    //accapi_my_print(3, "SendNotification,part: %d, idx: %d, %d,  %.150s\n", partNo, idx, userentry->m_sid, &buf[0]);
    sendResponse(userentry->m_sid, (char*)&buf[0]);

    idx += 30000;
    len -= 30000;
    partNo++;
  } while (len > 0);
  delete[] buf;
}


//=============================== SendToAuditLog ==============================
int SendToAuditLog(string     loginName,
                   string     displayName,
                   string     userId,
                   string     serverName,
                   string     actionType,
                   string     objectType,
                   string     objectId,
                   int        objectTenant,
                   string     userIp)
{
  char* hostname;
  char* ipv4;
  string analarmurl = "";
  hostname = (char*)EosHAGetLocalHostName(__FILE__, __LINE__);
  ipv4 = (char*)EosHAGetLocalIPv4Addr(__FILE__, __LINE__);
  analarmurl = "http://";
  //22-Jul-2020 YR BZ#52531
  size_t ipv4_len = strlen(ipv4);
  if (ipv4_len == 0)
    analarmurl += "localhost";
  else
    analarmurl += ipv4;
  analarmurl += ":8080/ExternalServices/System";
  char* cps = new char[64000 + 1];
  Ulong_t callid = 100000;
  Ulong_t exitcode = -1;
  Ulong_t timeout = 3000;

  sprintf(&cps[0], "||URL:%s/addAuditReportRecord||", analarmurl.c_str());

  int ret = 0;
  char* tmpReq = new char[32000 + 1];

  memset(tmpReq, 0, sizeof(32000));
  sprintf(&tmpReq[0],
          "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ser=\"http://services.webservice.infrst.anx/\"> \
           <soapenv:Header/>\n \
           <soapenv:Body>\n \
           <ser:addAuditReportRecord>\n \
           <!--Optional:-->\n \
           <AuditReportInfo>\n \
           <dateTime>%ld</dateTime>\n \
           <loginName>%s</loginName>\n \
           <displayName>%s</displayName>\n \
           <userId>%s</userId>\n \
           <serverName>%s</serverName>\n \
           <actionType>%s</actionType>\n \
           <objectType>%s</objectType>\n \
           <objectId>%s</objectId>\n \
           <objectTenant>%d</objectTenant>\n \
           <userIp>%s</userIp>\n \
           </AuditReportInfo>\n \
           </ser:addAuditReportRecord>\n \
           </soapenv:Body>\n \
           </soapenv:Envelope>\n",
           (long)time(0) * 1000,
           loginName.c_str(),
           displayName.c_str(),
           userId.c_str(),
           hostname,
           actionType.c_str(),
           objectType.c_str(),
           objectId.c_str(),
           objectTenant,
           userIp.c_str());
  //
  string sendInstruction =
          "REQUEST: [SET AUDIT LOG ~~data~~]" \
          "HTTPHEADER: [Content-Type::: application/soap+xml; charset=utf-8]" \
          "HTTPPOST: [~~URL~~],[";
                      sendInstruction += &tmpReq[0];
                      sendInstruction += "] \
		                  RESPONSE: [error] \
		                  PREFIX: [<faultstring>] \
		                  SUFFIX: [</faultstring>] \
		                  RESPONSE: [return] \
		                  PREFIX: [<return>] \
		                  SUFFIX: [</return>] \
		                  RETURN: [CPF] \
		                  SETCP: [error: ^^error^^,return: ^^return^^]";
  //
  string cpfx = &cps[0];
  delete[] tmpReq;
  delete[] cps;
  ThreadMgr::Spawn(SimpleExecFullHttp, (void*)NULL, sendInstruction, cpfx);

  //int   res = ExecuteFromHookEx(callid, &cps[0], exitcode, timeout, sendInstruction);
  //
  return ret;
}



Ulong_t GetCEMaxToken();
//====================================[ InitAccApiServer ] =========================================
int   InitAccApiServer(string ip, int portNo, int webPort)
{
  // -----        Wait sup ready
  SuRetCode_t suprc = SuWaitForSupStart(120000);
  if (suprc != SURC_SUCCESS)
  {
    accapi_my_print(0, (char*)"InitAccApiServer - sprocess not up after 120 seconds)\n");;
    exit(0);
  }

  int countWaitTimes = 0;
  EosHAServerStatus_t  serverstaus = EOS_HAS_INITIALIZING;
  accapi_my_print(0, "InitAccApiServer, Wait for ACC to be  ACTIVE %s:%d\n", ip.c_str(), portNo);
  while ((serverstaus != EOS_HAS_ACTIVE_SA) && (serverstaus != EOS_HAS_ACTIVE))
  {
    if ((countWaitTimes % 30) == 0)
    {
      accapi_my_print(0, "InitAccApiServer, Wait for ACC to be  ACTIVE before listen on port  %d\n", portNo);
    }
    my_sleep(1000);
    countWaitTimes++;
    serverstaus = EosHAGetLocalStatus(__FILE__, __LINE__);
  }
  GetCEMaxToken();
  accapi_my_print(0, "InitAccApiServer, ACC  IS  ACTIVE:%d\n");
  //setNewAlarmStatus(ACC_WEB_AGENT_SERVER_CONNECTION_LOST, TRUE, (char*)"ACC Web Agent NOT Connected", (char*)"");

  RecievedPacket* recievedPacket = new RecievedPacket;
  recievedPacket->m_IP = ip;
  while (1)
  {
    MultiStreams* _MultiStreams = MultiStreamsManager.WaitClientConnect(portNo, recievedPacket, -1);
  }

  return 0;
}

//===============================================[]=================================


//=======================================================[Odbcini2Json]==============================================
string Odbcini2Json()
{
  //#ifndef _WIN32
  char sections[4096];
  int num_of_sections = 0;
  string jsonStr = "[";
#ifndef WIN32
  IniFile odbc_ini("/etc/odbc.ini", true);
#else
  IniFile odbc_ini("./odbc.ini", true);
#endif
  odbc_ini.ReadAllSections(sections, 4096, &num_of_sections);
  string resultStr = "";
  char* sec_name = &(sections[0]);

  if (num_of_sections > 0)
  {
    for (int i = 0; i < num_of_sections; i++)
    {
      jsonStr += "{\"name\":\""; jsonStr += sec_name; jsonStr += "\"";

      //read DSN Name
      if (odbc_ini.ReadParameter(sec_name, "DSN", true))
      {
        jsonStr += ",\"dsn\":\""; jsonStr += odbc_ini.StrValue(); jsonStr += "\"";
      }
      //read the DSN driver, in order to translate it to database type
      if (odbc_ini.ReadParameter(sec_name, "Driver", true))
      {
        jsonStr += ",\"driver\":\""; jsonStr += odbc_ini.StrValue(); jsonStr += "\"";
      }
      //SERVER
      if (odbc_ini.ReadParameter(sec_name, "SERVER", true))
      {
        jsonStr += ",\"server\":\""; jsonStr += odbc_ini.StrValue(); jsonStr += "\"";
      }
      //database
      if (odbc_ini.ReadParameter(sec_name, "DATABASE", true))
      {
        jsonStr += ",\"database\":\""; jsonStr += odbc_ini.StrValue(); jsonStr += "\"";
      }
      //CLASSNAME
      if (odbc_ini.ReadParameter(sec_name, "CLASSNAME", true))
      {
        jsonStr += ",\"javaclass\":\""; jsonStr += odbc_ini.StrValue(); jsonStr += "\"";

      }
      //read the UID
      if (odbc_ini.ReadParameter(sec_name, "USER", true))
      {
        jsonStr += ",\"user\":\""; jsonStr += odbc_ini.StrValue(); jsonStr += "\"";
      }
      //read the PWD
      if (odbc_ini.ReadParameter(sec_name, "PASSWORD", true))
      {
        jsonStr += "\"password\":\""; jsonStr += odbc_ini.StrValue(); jsonStr += "\"";
      }
      //go to the next section
      jsonStr += "},";
      if (i < num_of_sections - 1) {
        while (*sec_name) sec_name++;
        sec_name++;
      }
    }
    jsonStr = jsonStr.substr(0, jsonStr.length() - 1);
    jsonStr += "]";
    accapi_my_print(0, "ODBC.INI: %s\n", jsonStr.c_str());
  }

  //#endif
  return jsonStr;
}
//2018-09-12 AlisherM BZ#47446: print details of outgoing packet/BSWMessage
void netAnalyzePctBeforeSending(int clientId, MultiStreams* MS, char* buff, short length) { return; }


