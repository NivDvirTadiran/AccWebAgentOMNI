#include <string>
#include <vector>
using namespace std;
#include <string.h>
#include "SolTcpServer.h"
#include "SolRecordException.h"
#include <iostream>
#include "../SolLib/sollib.h"
#include <vector>
#include <time.h>
#include <stdio.h>
#include <map>
extern "C"
{
  #include <ha_defs.h>
  #include <sgen.h>
}
//
#ifdef _WIN32
#include <windows.h>
#include <process.h>
#include <winbase.h>
#endif
int countPacket = 0;
long long len = 0;
extern TcpRequestsDef TcpRequests;
extern bool iAmActive;
void my_print(int level,const char* fmt, ...);
//
int AgentExists(string agent_no,int clientId, string sessionId,string action);
void LogoffAllAgents(int clientid);
int sendResponse(int clientId, string response);
//
vector<string> RecieveQueu;
Mutex RecieveQueuMutes;
#include <memory.h>
extern _MultiStreamsManager MultiStreamsManager;
//

//=============================== [ private_send ] ===================================
int private_send(MultiStreams *MS,string buf)
{
  int length = 0;
  char send_buffer[1024];
  memset(send_buffer, 0, 1024);
  short s_len = (short) buf.length();
  memcpy(&send_buffer[0], (char *) &s_len, sizeof(short));
  memcpy(&send_buffer[0] + sizeof(short), (char *)  buf.c_str(),s_len);
  MS->m_stream->Send(&send_buffer[0], s_len + sizeof(short), NULL);
  return length;
}

//=============================== [ ReplaceString ] ===================================
std::string ReplaceString(std::string subject, const std::string& search,
                          const std::string& replace) {
    size_t pos = 0;
    while((pos = subject.find(search, pos)) != std::string::npos) {
         subject.replace(pos, search.length(), replace);
         pos += replace.length();
    }
    return subject;
}
//=============================== [ getValueByNamefromJsonstring ] ===================================
// "\"direction\":\"t_s\",\"agentId\":\"1002\",\"action\":\"Login\",\"params\":\"login,000,1002,1,2002\"}],"
bool getValueByNamefromJsonstring(string &jsonstring,char *name, string &result)
{
	string res ="";
	string search = name;
	int found = jsonstring.find(search);
	if (found == string::npos) return false;
	found += search.length();
	int len = jsonstring.length() - found;
	char *s = (char *) &jsonstring.c_str()[found];
	for (int i = 0; i < len;++i)
	{
		if (s[i] == ':')
		{
			for (int j = i + 1; j < len;++j)
			{
				if (s[j] == '"')
				{
					j++;
					for (int k = j; k < len;++k)
					{
					if ((memcmp(&s[k],"\",",2) == 0) || (memcmp(&s[k],"\"}",2) == 0)) // found the value
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
	my_print(0,"getValueByNamefromJsonstring; cannot find: %s\n" ,name);
	return false;
}

//=============================== [ InsertRequesToQueue ] ===================================
void InsertRequesToQueue(char *request)
{
	RecieveQueuMutes.Lock();
	RecieveQueu.push_back(request);
	RecieveQueuMutes.Unlock();
	//my_print(5,"InsertRequesToQueue -> %d,%s\n",RecieveQueu.size(), request);

}
//=============================== [ GetRequesfromQueue ] ===================================
string GetRequesfromQueue()
{
	string req = "";
		RecieveQueuMutes.Lock();
	if (RecieveQueu.size() > 0)
	{
		
		req = RecieveQueu[0];
		//my_print(5,"GetRequesfromQueue -> %d,%s\n",RecieveQueu.size(), req.c_str());

		RecieveQueu.erase(RecieveQueu.begin());
		//my_print(5,"GetRequesfromQueue  aft erase-> %d,%s\n",RecieveQueu.size(), req.c_str());
	}
		RecieveQueuMutes.Unlock();
	return req;

}
//====================== Split ===================
int Split(char *source, std::vector<string> &dest ,char *search)
{
	int currPos = 0;
	int k = 0;
	int prevPos = 0;
	char *q;
	char c;
	int searchlen = strlen(search);
	dest.clear();
	do
	{
		q = strstr(&source[currPos],search);
		if (q != 0)
		{
			c = *q;
			*q = 0;
			string s = &source[currPos];
			*q = c;
	        currPos+= (s.length() + searchlen);
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
	}while(q);
	//dest.push_back(source.substr(prevPos,source.length()));
	return k;
}

//====================== class RecievedPacket ===================
//RecievedPacket::ReceivedFunction
string getSSOState();
class RecievedPacket: public RecievedBase
{
public:
	virtual int AppConnectedFunction(int m_clientId,MultiStreams *multiStreams)
	{
		EosHAServerStatus_t  serverstaus =  EosHAGetLocalStatus(__FILE__, __LINE__);
		string s = "SOLSOL - ";
		s +=  EosHAGetStatusName(serverstaus);

		s += getSSOState(); 

		multiStreams->m_ClientId = m_clientId;
		my_print(0,"AppConnectedFunction - '%s' client id = %d\n" , s.c_str(),m_clientId);
		sendResponse(m_clientId, s);
		return 0;
	}
	//===================================[ AppDisconnectFunction ]=======================================
	virtual int AppDisconnectFunction(int m_clientId,MultiStreams *multiStreams,  int reason)
	{
		my_print(0,"AppDisconnectFunction: client id = %d diconnected, logoff all cgents\n" , m_clientId);
		LogoffAllAgents(m_clientId);
		return 0;
	}
	//====================================[ ReceivedFunction ] =========================================
	virtual int ReceivedFunction(int clientId,MultiStreams *MS, char *recivedBuff,int recivedLength)
	{
		if (recivedLength == 0)
		{
			return recivedLength;
		}
		countPacket++;
		len += (long long) recivedLength;
		std::string body  = recivedBuff;
		string result = "";
		string  agentNo = "";
		string sessionid = "";
		string action = "";
		if (body == "[]")
		{
			return recivedLength;
		}
		if (getValueByNamefromJsonstring(body,(char *) "\"agentNo\"",agentNo) == false)
		{
			my_print(0,"clientId %d, RECIEVE missing agentNo %s\n",clientId,recivedBuff);
			return recivedLength;
		}
		if (getValueByNamefromJsonstring(body,(char *) "\"sessionid\"",sessionid) == false)
		{
			my_print(0,(char *) "clientId %d, RECIEVE missing sessionid %s\r\n",clientId,recivedBuff);
			return recivedLength;
		}
		if (getValueByNamefromJsonstring(body,(char *) "\"action\"",action) == false)
		{
			my_print(0,"clientId %d, RECIEVE missing action %s\n",clientId,recivedBuff);
			return recivedLength;
		}
		int agent_exists = AgentExists(agentNo.c_str(),clientId,sessionid,action);
		if (action != "keepalive")
		{
			if (action != "__agentLog")
			{
				if ( recivedLength < 500)
				{
					my_print(3,"sock CID %d, queue: %d len: %d %s\n",clientId,RecieveQueu.size(),recivedLength,recivedBuff);
				}

			}
		}
		else
		{
			my_print(4,"sock CID %d, len: %d %s\n",clientId,recivedLength,recivedBuff);
        	EosHAServerStatus_t  serverstaus =  EosHAGetLocalStatus(__FILE__, __LINE__);
            if ( !(EOS_HAS_ACTIVE_SA ==  serverstaus || EOS_HAS_ACTIVE ==  serverstaus) )
            {
              	string s = "SOLSOL - ";
		        s +=  EosHAGetStatusName(serverstaus);
        		MS->m_ClientId = clientId;
		        my_print(0,"ReceivedFunction Keealive identify not active - %s: client id = %d\n" , s.c_str(),clientId);
		        sendResponse(clientId, s);
            }
                return recivedLength;
            }
		recivedBuff[recivedLength] = ',';
		recivedBuff[recivedLength +1] = 0;
		vector<string> splited1;
		string req = recivedBuff;
		// prepare send to web server
			
		if (getValueByNamefromJsonstring(body,(char *) "\"params\"",result) == false)
		{
			my_print(0,"clientId %d, RECIEVE missing params %s\n",clientId,recivedBuff);
			return recivedLength;
		}

			result += "," + sessionid + ",";
			char cidStr[10];
			sprintf(&cidStr[0],"%.4d",clientId);
			result +=  &cidStr[0];
		if (agent_exists == 0)
		{
			InsertRequesToQueue((char *) result.c_str());
			return recivedLength;
		}
		my_print(0,"clientId %d, Agent No not found %s\n",clientId,recivedBuff);
		string s = recivedBuff;
		// if Can't find agent ain agent_db && action == "logon" send  agentDenied to logon of this agent
		size_t pos = s.find("Logon");
		if (pos !=std::string::npos)
		{
			char c[56];
			time_t t = time(0);
			sprintf(c,"%d",time(0));
			string x = &c[0] ;x += "," + agentNo;
			x += ",agentDenied";
			s = ReplaceString(s,"logon",x);

			s = ReplaceString(s,"Logon","agentDenied");
			s = ReplaceString(s,"\"}]",",3,3,3,3,-1,0,,N\"}]");
			int res = sendResponse(clientId, s);
			my_print(0,"ReceivedFunction  size to send write to client queue %d, %s \n",s.size(),s.c_str());
		}
		return recivedLength;
	}
};
//---------------------------------------------
void my_sleep(int sec)
{
      ThreadMgr::Sleep(sec/1000, sec%1000);

}



//====================================[ sendResponse ] =========================================
int sendResponse(int clientId, string response)
{
	if (clientId != -1)
	{
		//printf("+++sendResponse push \r\n");fflush(stdout);
		short len = response.length();
		//if (len > 20000)
		//{
		//	my_print(0,"sendResponse, len: %d, startbuf: %s\n",len,response.c_str());
		//}
		char buf[65000];
		//len = ntohs(len);
		memcpy(&buf[0],(void *) &len,sizeof(short));
		memcpy(&buf[2],response.c_str(), response.length());
		TcpRequests.Push(clientId,TCP_SEND_REQUEST,(char *) buf,response.length() + 2);
	}
	return 0;
}
//====================================[ InitAccApiServer ] =========================================
int   InitAccApiServer(string ip,int portNo)
{

 int countWaitTimes = 0;
  EosHAServerStatus_t  serverstaus = EOS_HAS_INITIALIZING;
  my_print(0,"InitAccApiServer, Wait for ACC to be  ACTIVE %s:%d\n",ip.c_str(),portNo);
  while ((serverstaus !=  EOS_HAS_ACTIVE_SA) && (serverstaus != EOS_HAS_ACTIVE))
  {
		if ((countWaitTimes % 30) == 0)
		{
			my_print(0,"InitAccApiServer, Wait for ACC to be  ACTIVE before listen on port  %d\n",portNo);
		}
		Sleep(1000);  
		countWaitTimes++;
		serverstaus =  EosHAGetLocalStatus(__FILE__, __LINE__);
  }
  my_print(0,"InitAccApiServer, ACC  IS  ACTIVE:%d\n");
  iAmActive = true;
  RecievedPacket *recievedPacket = new RecievedPacket;
  recievedPacket->m_IP = ip;
  while (1)
  {
	MultiStreams *_MultiStreams = MultiStreamsManager.WaitClientConnect(portNo,recievedPacket,-1);
  }

return 0;
}

//2018-09-12 AlisherM BZ#47446: print details of outgoing packet/BSWMessage
void netAnalyzePctBeforeSending(int clientId, MultiStreams *MS, char* buff, short length){ return; }