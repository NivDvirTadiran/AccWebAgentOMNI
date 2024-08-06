//
// PROJECT & ID  : SBC Solutions
// FILE NAME     : sbc_main_thread.cpp
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
#include "sbc_main_thread.h"

//==========================[ Constants & Macros ]====================

//==========================[ Types and Data structures ]=============

//==========================[ Classes ]===============================

//==========================[ Local Variables ]=======================

//==========================[ Implemented Methods ]===================
RetCode_t SbcMainThread_c::CreateResources()
{
	return BSWRC_OK;
} 

RetCode_t SbcMainThread_c::Init()
{

	return BSWRC_OK;
}

Bool_t SbcMainThread_c::IsInitDone() const
{
	return true;
}

RetCode_t SbcMainThread_c::Terminate()
{

	return BSWRC_OK;

}


void SbcMainThread_c::SetOperational()
{

}
