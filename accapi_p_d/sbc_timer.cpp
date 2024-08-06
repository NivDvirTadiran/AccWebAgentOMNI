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
//==========================[ Interface Dependencies ]================
#include <er_std_override.h>
#include <proj_gen.h>
#include <bswlog.h>
#include "crmalltypes.h"
#include "sbc_timer.h"
//#include "sbc_socket.h"
extern "C" {
#include <sgen.h>
}
//class SbcSocket_c;
extern AGENTINFO_MAP agents_db;
void my_print(int level,const char* fmt, ...);

//==========================[ Local Variables ]=======================
static BswLog_c socket_timer_log(BswMakeLogSite(FC_CRM_IFACE,1),LM_INTER_CSCI, LOGL_INFO);
void crm_print(const char* fmt, ...);

SbcTimer_c::SbcTimer_c(Ushort_t type)
{
  m_type = type;
  isTicking = false;
}

void SbcTimer_c::InitPtr()
{
}

#include "bswdatetime.h"
bool onePrint = false;
int sendResponse(int clientId, string reponse);
int refreshTime = 200;
void SbcTimer_c::OnTimer()
{

	BswDateTime_s date_time_start,date_time_end; // to set exact refresh time
	BswGetDateTime(date_time_start);
	RetCode_t rc = BSWRC_OK;
	SuRetCode_t su_rc;
	int res  = 0;
    if (agents_db.size() == 0)		
	{
		my_print(0,"SbcTimer_c::OnTimer(), Wait 30 secs loading agents from db\n");
		rc = this->Start(5000);// wait 10 before connect to crm and send agent state
		return;
	}
	// else if (m_AgentWSid == -1)
	// {
		// this->Start(1000);
	// }
	// connected
	string s ="";
	timeval tv;tv.tv_sec = 1;tv.tv_usec = 0;
	m_type = CONNECTED;
	//
	int clienId  = -1;
	s = m_CrmObject->SendJsonData(clienId); //prepare all login agents
	//
	if (s.length() > 5)
	{
		res = sendResponse(clienId, s);
	}
	BswGetDateTime(date_time_end);
	int diff = BswDateTimeDiffMiliSec(date_time_end,date_time_start);

	if (diff < 0 || diff >= refreshTime)
	{
		my_print(0,"SbcTimer_c::OnTimer(), proccessing time (%d) is bigger, than refreshTime(%d), reset diff to 0\n", diff, refreshTime);
		diff = 0;
	}
	rc = this->Start(refreshTime - diff);// restart timer

}

