//
// PROJECT & ID  : SBC Solutions
// FILE NAME     : sbc_work_thread.h
// AUTHOR        : Shahar Sperling
// CREATION DATE : 23-Apr-2007
// -----------------------------------------------------------------------
//====================================================================

//==========================[ Interface Dependencies ]================


#ifndef SBC_WORK_THREAD_H
#define SBC_WORK_THREAD_H

#include <bswthread.h>
#include "sbc_sea_reply.h"
#include "accapi_smmanager_c.h"
//#include "sbc_socket.h"

_USING_BSW

//==========================[ Constants & Macros ]====================

//==========================[ Types and Data structures ]=============

//==========================[ Classes ]===============================

/*
======================================================================
	Class Name: SbcWorkThread_c

	Description:

	Author: Shahar Sperling

======================================================================
*/

class SbcWorkThread_c : public BswThread_c{

//============================ Public Section ========================
public:

	// ctor
	SbcWorkThread_c();

	// dtor
	~SbcWorkThread_c();

	// inherited from BswObject_c
	RetCode_t SerializeTo(BswStream_c& dest){
	  return BSWRC_OK;
	}

	RetCode_t SerializeFrom(BswStream_c& dest){
	  return BSWRC_OK;
	}

	void Dump(BswStream_c&   dump,
				BswDumpLevel_e self_lvl=BSW_DUMP_LVL_MED,
				BswDumpLevel_e memb_lvl=BSW_DUMP_LVL_MED) const{
	}


	// inherited from BswThread_c

	RetCode_t Init();

	RetCode_t Terminate();

	const char* GetThreadName() const{
		return "AWA_T2";
	}

	void  OnIdle();


	Bool_t IsInitDone() const{
	  return true;
	}

	void SetPreoper();

	Bool_t IsPreoperDone() const;

	void SetOperational();

	void PostEventHandling();
	void SendAllLists(AgentDbInfo_c *ADI,bool all);
	
	void LogoffX(AgentDbInfo_c *ADI,bool isFromLogon);
    void agentDisconnect(AgentDbInfo_c *ADI,bool isFromLogon);
	void LogoffAllAgents(int clientid);

	SbcTimer_c m_conn_timer;

	SbcSeaReply_c	m_sea_reply;
	AccapiSmManager_c *m_AccapiSmManager;
	
	void GetAllTables(bool isChanged = false);
	
	bool m_TableChanged;
	BOOL m_IsSSO;
    BOOL m_IsSSOfreeSseating;

//============================ Protected Section ========================
protected:

//============================ Private Section ========================
private:

}; // class SbcWorkThread_c


#endif
