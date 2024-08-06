//
// PROJECT & ID  : SBC Solutions
// FILE NAME     : sbc_main_thread.h
// AUTHOR        : Shahar Sperling
// CREATION DATE : 23-Apr-2007
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


#ifndef SBC_MAIN_THREAD_H
#define SBC_MAIN_THREAD_H

// Infrastructure
#include <bswthread.h>

_USING_BSW

//==========================[ Constants & Macros ]====================

//==========================[ Types and Data structures ]=============

//==========================[ Classes ]===============================


/*
======================================================================
	Class Name: SbcMainThread_c

	Description:

	Author: Shahar Sperling

======================================================================
*/


class SbcMainThread_c : public BswMainThread_c{

//============================ Public Section ========================
public:

  // ctor
  SbcMainThread_c(){
  }

  // dtor
  ~SbcMainThread_c(){
  }

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
    return "AWA_T1";
  }

  void  OnIdle(){
  }

  void PostEventHandling(){
  }

  // inherited from BswMainThread_c
  RetCode_t CreateResources();

  Bool_t IsInitDone() const;

  void SetPreoper(){
  }

  Bool_t IsPreoperDone() const{
    return true;
  }

  void SetOperational();

//============================ Protected Section ========================
protected:

//============================ Private Section ========================
private:

}; // class SbcMainThread_c


#endif
