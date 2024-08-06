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
#include "accapi_main_thread.h"

//==========================[ Constants & Macros ]====================

//==========================[ Types and Data structures ]=============

//==========================[ Classes ]===============================

//==========================[ Local Variables ]=======================

//==========================[ Implemented Methods ]===================
RetCode_t AccapiMainThread_c::CreateResources()
{
	return BSWRC_OK;
} 

RetCode_t AccapiMainThread_c::Init()
{

	return BSWRC_OK;
}

Bool_t AccapiMainThread_c::IsInitDone() const
{
	return true;
}

RetCode_t AccapiMainThread_c::Terminate()
{

	return BSWRC_OK;

}


void AccapiMainThread_c::SetOperational()
{

}
