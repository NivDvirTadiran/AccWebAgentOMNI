/*
 * PROJECT & ID .: SBC Solutions CRM Interface
 * FILE NAME ....: sbc_crm_main.cpp
 * AUTHOR .......: Shahar Sperling
 * CREATION DATE : 23-Apr-2007
 * LAST UPDATE...:
 * -----------------------------------------------------------------------
 * - FILE VERSION::
 * -===============
 *
 * .:
 * - SHORT DESC::
 * -=============
 *
 * .:
 * - DETAIL DESC::
 * -==============
 * .:
 * - REMARKS .......::
 * -==================
 *
 * .:
 * - UPDATES AND HISTORY::
 * -======================
 * .:
 *========================================================================
 */

/*==========================[ Implementation Dependencies ]==============*/
// Infrastructure
#include <er_std_override.h>
#include <bswipc.h>
#include <proj_gen.h>
#include "accapi_main_thread.h"
#include "accapi_work_thread.h"
#include "accapi_ps_work_thread.h"

/*==========================[ Public Implementation ]====================*/

static AccapiMainThread_c main_thr;
static AccapiWorkThread_c work_thr;
static AccapiPSThread_c personalstatisticsthread;
static bool DEBUG_ON = false;
/*--------------------------------[ main ]-------------------------------*/

BOOL CtrlHandler( DWORD fdwCtrlType )
{
  switch( fdwCtrlType )
  {
	  case CTRL_SHUTDOWN_EVENT:
		  work_thr.Terminate();
		  personalstatisticsthread.Terminate();
		  
		  //socket_thr.Terminate();
		  return FALSE;
	  default:
		  return FALSE;
  }
}
int main( int argc, const char *argv[] )
{
	static BswThread_c* thrdPtrs[] = { &main_thr, &work_thr, &personalstatisticsthread, NULL } ;
	if (argc > 1)
	{
        if (strcmp(argv[1], "-d") == 0)
            DEBUG_ON = true;
	}

	BswStartProcess( thrdPtrs, argc, argv );

	SetConsoleCtrlHandler( (PHANDLER_ROUTINE) CtrlHandler, TRUE ); // for closing correctly the program

	return 0;
}
