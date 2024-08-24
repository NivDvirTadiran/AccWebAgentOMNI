//
// PROJECT & ID  : ACCAPI Solutions
// FILE NAME     : accapi_timer.h
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
//==========================[ Interface Dependencies ]================
#include <er_std_override.h>
#include <proj_gen.h>
#include <bswlog.h>
#include <bswdatetime.h>
#include "accapi_crm_types.h"
#include "accapi_timer.h"
//#include "sbc_socket.h"
extern "C" {
#include <sgen.h>
}

//class SbcSocket_c;
void accapi_my_print(int level,const char* fmt, ...);
//void crm_print(const char* fmt, ...);
int  sendResponse(int clientId, string reponse);

//==========================[ Local Variables ]=======================
static BswLog_c socket_timer_log(BswMakeLogSite(FC_CRM_IFACE,1),LM_INTER_CSCI, LOGL_INFO);
extern AGENTINFO_MAP agents_db;


//==========================[ AccapiTimer_c ]=========================
//default ctor
AccapiTimer_c::AccapiTimer_c()
{
  m_type = ER_NULL_ID;
  isTicking = false;
  m_CrmObject = NULL;
}

//ctor
AccapiTimer_c::AccapiTimer_c(Ushort_t type)
{
  m_type = type;
  isTicking = false;
  m_CrmObject = NULL;
}

void AccapiTimer_c::InitPtr()
{
}

bool onePrint = false;
int refreshTime = 200;
void AccapiTimer_c::OnTimer()
{
  BswDateTime_s date_time_start, date_time_end; // to set exact refresh time
  BswGetDateTime(date_time_start);
  RetCode_t rc = BSWRC_OK;
  //SuRetCode_t su_rc;
  int res = 0;
  if (agents_db.size() == 0)
  {
    accapi_my_print(0, "AccapiTimer_c::OnTimer() ==> Agents map is empty - Wait 5 secs to load agents from db\n");
    rc = this->Start(5000);// wait 10 before connect to crm and send agent state
    return;
  }
  //else if (m_AgentWSid == -1)
  //{
  //  this->Start(1000);
  //}
  //connected
  string s = "";
  timeval tv; tv.tv_sec = 1; tv.tv_usec = 0;
  m_type = CONNECTED;
  //
  int clienId = -1;
  s = m_CrmObject->SendJsonData(clienId); //prepare all login agents
  //
  if (s.length() > 5)
  {
    res = sendResponse(clienId, s);
  }
  BswGetDateTime(date_time_end);
  int diff = BswDateTimeDiffMiliSec(date_time_end, date_time_start);

  if (diff < 0 || diff >= refreshTime)
  {
    accapi_my_print(0, "AccapiTimer_c::OnTimer() ==> proccessing time (%d) is bigger, than refreshTime(%d), reset diff to 0\n", diff, refreshTime);
    diff = 0;
  }
  rc = this->Start(refreshTime - diff);// restart timer
}


//==========================[ supEntry ]==============================
//ctor
supEntry::supEntry(ACC_WebApps_t sup_type, string session, int sid, string name, Ushort_t level)
{
  m_supType = sup_type;
  sessionId = session;
  m_sid = sid;
  m_Ip = "";
  m_supName = name;
  m_ClientId = -1;
  m_uploadFiles = NULL;
  m_supLevel = level;
  wsfile_part = "";
  crmfile_part = "";
  selectedScript = -1;
}

//==========================[ SUP_c ]=================================
//ctor
SUP_c::SUP_c()
{
  m_userId = -1;
  memset(m_supName, 0, sizeof(char[NAME_SIZEX + 1]));
  memset(m_supPass, 0, sizeof(char[NAME_SIZEX + 1]));
  m_agentId = -1;
  m_supLevel = 10;
  m_LastKeeAliveTime = time(0);
}

//dtor
SUP_c::~SUP_c()
{
  accapi_my_print(0, "SUP_c dtor, size of m__supEntriesVec %d\n", m__supEntriesVec.size());
}

/*--------------------------[ getSupentry ]--------------------------*/
supEntry* SUP_c::getSupentry(string sessionId)
{
  supEntry* ret = NULL;
  for (size_t i = 0; i < m__supEntriesVec.size(); ++i)
  {
    if (m__supEntriesVec[i]->sessionId == sessionId)
    {
      ret = m__supEntriesVec[i];
      break;
    }
  }

  if ((ret == NULL) && (m__supEntriesVec.size() == 1))
    ret = m__supEntriesVec[0];

  return ret;
}


/*--------------------------[ setSupentry ]--------------------------*/
void SUP_c::setSupentry(string sessionId, Ulong_t clientId)
{
  int i;
  for (i = 0; i < (int)m__supEntriesVec.size(); ++i)
  {
    if (m__supEntriesVec[i]->sessionId == sessionId)
    {
      m__supEntriesVec[i]->m_ClientId = clientId;
      break;
    }
  }
  accapi_my_print(0, "setSupentry <sessionId %s, clientId %d> entry %d, size of m__supEntriesVec %d\n", sessionId.c_str(), clientId, i, m__supEntriesVec.size());
}


/*--------------------------[ addSupentry ]--------------------------*/
void SUP_c::addSupentry(supEntry* sup_entry)
{
  m__supEntriesVec.push_back(sup_entry);
  accapi_my_print(0, "addSupentry, size of m__supEntriesVec %d\n", m__supEntriesVec.size());
}

//18-Aug-2024 YR BZ#59940
/*--------------------------[ deleteSupentry ]------------------------*/
void SUP_c::deleteSupentry(string sessionId)
{
  int i;
  vector<supEntry*>::iterator it;
  for (it = m__supEntriesVec.begin(); it != m__supEntriesVec.end() ; ++it)
  {
    if ((*it)->sessionId == sessionId)
    {
      m__supEntriesVec.erase(it);
      break;
    }
  }
  accapi_my_print(0, "deleteSupentry <sessionId %s>, size of m__supEntriesVec %d \n", sessionId.c_str(), m__supEntriesVec.size());
}

