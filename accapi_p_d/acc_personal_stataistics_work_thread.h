//
// PROJECT & ID  : AccWebAgent Solutions
// FILE NAME     : acc_personal_stataistics_work_thread.h
// AUTHOR        : Shaul Waller
// CREATION DATE : 1-Jul 2019
// -----------------------------------------------------------------------
//====================================================================

//==========================[ Interface Dependencies ]================


#ifndef ACC_PERSONAL_STATAISTICS_WORK_THREAD_H
#define ACC_PERSONAL_STATAISTICS_WORK_THREAD_H

#include <bswthread.h>

_USING_BSW

/*
======================================================================
	Class Name: PersonalStatisticsThread_c
	Description: acc web agent personal staticstics  work thread
	Author: Shaul Waller
======================================================================
*/

class PersonalStatisticsThread_c : public BswThread_c{

//============================ Public Section ========================
public:

	// ctor
	PersonalStatisticsThread_c();

	// dtor
	~PersonalStatisticsThread_c();

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

  void HandleEosMessage(EosOpCode_t op_code,
						EosEventHeader_t&  ev_hdr,
						Ushort_t           ev_len,
						void              *ev_data);


	// inherited from BswThread_c

	RetCode_t Init();

	RetCode_t Terminate();

	const char* GetThreadName() const{
		return "AWA_T3";
	}

	void  OnIdle();


	Bool_t IsInitDone() const{
	  return true;
	}

	void SetPreoper();

	Bool_t IsPreoperDone() const;

	void SetOperational();

//============================ Protected Section ========================
protected:

//============================ Private Section ========================
private:

}; // class PersonalStatisticsThread_c


#endif //ACC_PERSONAL_STATAISTICS_WORK_THREAD_H
