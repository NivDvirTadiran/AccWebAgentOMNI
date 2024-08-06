#include <er_std_override.h>
//#include <bli.h>
#include "proj_gen.h"
#include <er_win_ext.h>
#include <bswobjectdump.h>
#include <bswattribdescr.h>
#include <bswlog.h>
#include "adupdate.h"
#include "sbc_work_thread.h"

#include "accapi_entities.h"

void my_print(int level,const char* fmt, ...);

static BswLog_c logX(BswMakeLogSite(FC_AWA,1),LM_INTER_CSCI, LOGL_INFO);
//
/*-----------------------[ GetNumberFromSNMP ]------------------------*/
Ulong_t GetNumberFromSNMP( char* buf, char  iter )
{
  char*   tmp_buf;
  Ulong_t number = atol(buf);

  for( int i = 0 ; i < iter ; i++ ){
    tmp_buf = strchr(buf,'.');
    if (tmp_buf) {
      tmp_buf++;
      number = atol(tmp_buf);
      buf = tmp_buf;
    }
    else
      number = 0;
  }
  return number;
} // GetNumberFromSNMP

//
accapi_entities_c::~accapi_entities_c()
{
  RetCode_t rc;

  // UNregister for SNMP commands
  rc = BswUnRegisterDumpObject("AWA_T2", *this);
  if (rc != BSWRC_OK) {
  }
} // ~SystemParam_c

/*-----------------------[ InitSystemParam ]------------------------------*/
void accapi_entities_c::InitSystemParam()
{
  RetCode_t rc;
    logX << "accapi_entities_c::InitSystemParam() invoked \n" << LOG_TERMINATOR;
  // register for SNMP commands
  rc = BswRegisterDumpObject("AWA_T2", *this, "560.1", true);
  if (rc != BSWRC_OK) {
	  my_print(0,"accapi_entities_c::InitSystemParam failed to BswRegisterDumpObject, rc = %d\n",rc);
    logX << "accapi_entities_c::InitSystemParam failed to BswRegisterDumpObject, rc = " << rc << LOG_TERMINATOR;
  }
   else {
	   my_print(0,"accapi_entities_c::InitSystemParam Succeeded\n");
    logX << "accapi_entities_c::InitSystemParam() Succeeded\n" << LOG_TERMINATOR;
   }


}

/*-----------------------[ GetEntityMgr ]------------------------------*/
accapi_entities_c& accapi_entities_c::GetEntityMgr(SbcWorkThread_c *workThread)
{
  static accapi_entities_c EntityMgr;
  EntityMgr.m_WorkThread = workThread;
  return EntityMgr;
}
/*-----------------------[ GetDescriptor ]-----------------------------*/
RetCode_t accapi_entities_c::GetDescriptor(BswAttribDescr_c& self_descr) const
{
 
  RetCode_t rc;

  logX << "EntityMgr_c::GetDescriptor() called\n" << LOG_TERMINATOR;
  my_print(0,"accapi_entities_c::GetDescriptor()  called\n");

  rc = self_descr.SetDescriptor(
                                "accapi_entities_c",            //  type_name
                                "accapi Entities",                 //  attr_name
                                ATTR_BSWOBJ,                    //  attr_type
                                const_cast<accapi_entities_c*>(this), //  attr_ptr
                                sizeof(this)                    //  attr_size
                               );
  return rc;
} // GetDescriptor

/*-----------------------[ GetAttribute ]-----------------------------*/
RetCode_t accapi_entities_c::GetAttribute( const char*        snmp_key,
                                     BswAttribDescr_c&  attr_descr,
                                     char*              sub_key) const
{

  logX << "accapi_entities_c::GetAttribute() called with key: " << const_cast<char*>(snmp_key) << LOG_TERMINATOR;
  my_print(0,"accapi_entities_c::GetAttribute() called with key: %s\n",snmp_key);

  return attr_descr.SetDescriptor( "accapi_entities_c",  //  type_name
                                   snmp_key,       //  attr_name
                                   ATTR_UNKNOWN,   //  attr_type
                                   (void*)this,    //  attr_ptr
                                   0               //  attr_size
                                 );
} // GetAttribute

enum { AGENTS = 1,GROUPS = 2 , SERVICES = 3, WRAPUP = 4, RELEASE_CODES = 5,AGENTS_GRP = 6,COS = 18
};
void UpdateAgentsFromDB(Ulong_t id,Commands_e command);
/*-----------------------[ SetValues ]-----------------------------*/
RetCode_t accapi_entities_c::SetValues( BswAttribDescr_c& attr_descr,
                                  BswStream_c&      in_stream,
                                  BswStream_c&      out_stream )
{
  char             snmp_key[100];
  RetCode_t        bswrc = BSWRC_OK;
  Commands_e       command;
  AuNotification_c au_notif;

 
  er_strncpy_s(snmp_key, 100, attr_descr.GetAttrName(), strlen(attr_descr.GetAttrName()));
  Ulong_t entity_type = GetNumberFromSNMP(snmp_key,0);
  Ulong_t  entity_id = GetNumberFromSNMP(snmp_key,1);
 
  in_stream >> au_notif;
  command = au_notif.GetCommand();
  logX << "accapi_entities_c::SetValues() called, reading parameters from database entity_type: " << entity_type << ", entity_id: " << entity_id << ", command: "  << (Ulong_t) command <<LOG_TERMINATOR;;
  my_print(0,"accapi_entities_c::SetValues() called, reading parameters from database, entity_type: %d, entity_id: %d command: %d\n",entity_type,entity_id,command);

  logX << "Receive from AdminUpdate:\n";
  if (entity_type == 1) // agent changes
  {
    logX << "UPDATE agent map db" << LOG_TERMINATOR;
	UpdateAgentsFromDB(entity_id,command);
	return bswrc;
  }
	m_WorkThread->m_TableChanged = true;
		
    switch ( command ) {

      case CMD_CREATE:
        logX << "CMD_CREATE\n";
        logX << "SNMP Key = " << snmp_key << " \n";
        logX << LOG_TERMINATOR;

        CreateEntity(snmp_key);
      break;

      case CMD_UPDATE:
        logX << "CMD_UPDATE\n";
        logX << "SNMP Key = " << snmp_key << " \n";
        logX << LOG_TERMINATOR;
        //UpdateEntity(snmp_key);
      break;

      case CMD_DELETE:
        logX << "CMD_DELETE\n";
        logX << "SNMP Key = " << snmp_key << " \n";
        logX << LOG_TERMINATOR;
       //DeleteEntity(snmp_key);
      break;
	  

      default:
        logX << "Illegal command type: " << static_cast<Ushort_t>(command) << LOG_TERMINATOR;
      break;
    }
  logX.SetLogLevel(LOGL_INFO);
  if( bswrc == BSWRC_OK )
    logX << "accapi_entities_c::SetValues() Done.\n" << LOG_TERMINATOR;
  else
    logX << "accapi_entities_c::SetValues() Fail. !!!   rc = " << bswrc << "\n" << LOG_TERMINATOR;

  return BSWRC_OK;
} // SetValues

/*-----------------------[ CreateEntity ]-----------------------------*/
void accapi_entities_c::CreateEntity( const char* snmp_key )
{
}
