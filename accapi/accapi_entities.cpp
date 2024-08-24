#include <er_std_override.h>
//#include <bli.h>
#include "./base64.h"
#include "proj_gen.h"
#include <er_win_ext.h>
#include <bswobjectdump.h>
#include <bswattribdescr.h>
#include <bswlog.h>
#include "adupdate.h"
#include "accapi_work_thread.h"

#include "accapi_entities.h"

void accapi_my_print(int level,const char* fmt, ...);
void SendNotification(supEntry* userentry, string action, Ulong_t code, string data);

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
AccapiEntities_c::~AccapiEntities_c()
{
  RetCode_t rc;

  // UNregister for SNMP commands
  rc = BswUnRegisterDumpObject("AWA_T2", *this);
  if (rc != BSWRC_OK) {
  }
} // ~SystemParam_c

/*-----------------------[ InitSystemParam ]------------------------------*/
void AccapiEntities_c::InitSystemParam()
{
  RetCode_t rc;
    logX << "AccapiEntities_c::InitSystemParam() invoked \n" << LOG_TERMINATOR;
  // register for SNMP commands
  rc = BswRegisterDumpObject("AWA_T2", *this, "560.1", true);
  if (rc != BSWRC_OK) {
	  accapi_my_print(0,"AccapiEntities_c::InitSystemParam failed to BswRegisterDumpObject, rc = %d\n",rc);
    logX << "AccapiEntities_c::InitSystemParam failed to BswRegisterDumpObject, rc = " << rc << LOG_TERMINATOR;
  }
   else {
	   accapi_my_print(0,"AccapiEntities_c::InitSystemParam Succeeded\n");
    logX << "AccapiEntities_c::InitSystemParam() Succeeded\n" << LOG_TERMINATOR;
   }
}


/*-----------------------[ GetAccapiEntitiesObj ]------------------------------*/
//AccapiEntities_c& AccapiEntities_c::GetEntityMgr(AccapiWorkThread_c *workThread)
AccapiEntities_c& AccapiEntities_c::GetAccapiEntitiesObj()
{
  static AccapiEntities_c accapi_entities;
  //accapi_entities.m_WorkThread = workThread;
  return accapi_entities;
}


/*-----------------------[ GetDescriptor ]-----------------------------*/
RetCode_t AccapiEntities_c::GetDescriptor(BswAttribDescr_c& self_descr) const
{
 
  RetCode_t rc;

  logX << "EntityMgr_c::GetDescriptor() called\n" << LOG_TERMINATOR;
  accapi_my_print(0,"AccapiEntities_c::GetDescriptor()  called\n");

  rc = self_descr.SetDescriptor("AccapiEntities_c",                 //  type_name
                                "accapi Entities",                  //  attr_name
                                ATTR_BSWOBJ,                        //  attr_type
                                const_cast<AccapiEntities_c*>(this),//  attr_ptr
                                sizeof(this));                      //  attr_size
  return rc;
} // GetDescriptor


/*-----------------------[ GetAttribute ]-----------------------------*/
RetCode_t AccapiEntities_c::GetAttribute(const char*        snmp_key,
                                         BswAttribDescr_c&  attr_descr,
                                         char*              sub_key) const
{

  logX << "AccapiEntities_c::GetAttribute() called with key: " << const_cast<char*>(snmp_key) << LOG_TERMINATOR;
  accapi_my_print(0,"AccapiEntities_c::GetAttribute() called with key: %s\n",snmp_key);

  return attr_descr.SetDescriptor("AccapiEntities_c", //  type_name
                                  snmp_key,           //  attr_name
                                  ATTR_UNKNOWN,       //  attr_type
                                  (void*)this,        //  attr_ptr
                                  0);                 //  attr_size
} // GetAttribute


enum { AGENTS = 1,GROUPS = 2 , SERVICES = 3, WRAPUP = 4, RELEASE_CODES = 5,AGENTS_GRP = 6,COS = 18};
void UpdateAgentsFromDB(Ulong_t id,Commands_e command);
void UpdateAgenGrpDB(Ulong_t id, Commands_e command);
void GetServicesFromDB();
void GetRcFromDB();
void getMailAccountsTableFromDB();
void GetGroupsFromDB();
void getDbConnectionsTableFromDB();
void getCOSTableFromDB();
void GetCPFromDB();
void GetWUFromDB();
void getsupagents(bool initializing = false);
void LoadIVrApp();
void getLangTableFromDB();
//void SendOneTableChangesToAllLogonSup(string action, string json);
//
extern string ivrapp_map_json;
extern string mail_db_json;
extern string dbConnections_db_json;
extern string wsConnections_db_json;
extern string grp_db_json;
extern string cp_db_json;
extern string srv_db_json;
//
/*-----------------------[ SetValues ]-----------------------------*/
RetCode_t AccapiEntities_c::SetValues(BswAttribDescr_c& attr_descr,
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
  logX << "AccapiEntities_c::SetValues() called, reading parameters from database entity_type: " << entity_type << ", entity_id: " << entity_id << ", command: "  << (Ulong_t) command <<LOG_TERMINATOR;;
  accapi_my_print(0,"AccapiEntities_c::SetValues() called, reading parameters from database, entity_type: %d, entity_id: %d command: %d\n",entity_type,entity_id,command);

  logX << "Receive from AdminUpdate:\n";
   
 // if (entity_type == 1) // agent changes
 // {
 //   logX << "UPDATE agent map db" << LOG_TERMINATOR;
	//UpdateAgentsFromDB(entity_id,command);
	//return bswrc;
 // }
  switch (entity_type)
  {
    case 17: // soft param 
    case 16: // soft param 
    case 14: // soft param 
    case 15: // soft param 
    case 7:  // soft param 
    case 8:  // soft param 
    case 9:  // soft param 
    case 12: // soft param 
    case 11: // soft param 
    case 13: // soft param
    case 10: // soft param 
      break;
      // 
    case 3:  //services
      GetServicesFromDB();
      SendOneTableChangesToAllLogonSup("services", srv_db_json);
      break;
      // 
    case 5:  //release codes
      GetRcFromDB();
       break;
      // 
    case 22:  //mail acounts
      getMailAccountsTableFromDB();
      SendOneTableChangesToAllLogonSup("contacts", mail_db_json);
      break;
      // 
    case 21:  //mail acounts
      LoadIVrApp();
      SendOneTableChangesToAllLogonSup("applications", ivrapp_map_json);
      break;
      // 
    case 25:  //IRN skills
      break;
      //
    case 2:  //groups
      GetGroupsFromDB();
      SendOneTableChangesToAllLogonSup("groups", grp_db_json);
      break;
      //
    case 24:  //edbc_conn_name_info
      getDbConnectionsTableFromDB();
      SendOneTableChangesToAllLogonSup("sql_connections", dbConnections_db_json);
      break;
      //
    case 23:  //edbc_conn_name_info
      getDbConnectionsTableFromDB();
      SendOneTableChangesToAllLogonSup("sql_connections", dbConnections_db_json);
      break;
      //
    case 18:  //Class of service COS
      getCOSTableFromDB();
      break;
      //
    case 6:  //agents grp is updates with agents
      UpdateAgenGrpDB(entity_id, command);
      break;
    case 1:  //agents grp is updates with agents
      UpdateAgentsFromDB(entity_id, command);
      break;
      //
    case 19:  //CP 
    case 26:  //user fields 
    case 27:  //user fields 
      GetCPFromDB();
      SendOneTableChangesToAllLogonSup("cpf", cp_db_json);
      break;
      //
    case 28:  //lang table 
      getLangTableFromDB();
      SendOneTableChangesToAllLogonSup("cpf", cp_db_json);
      break;
      //
    case 4:  //Wrap up codes 
      GetWUFromDB();
      break;
      //
    case 20:  //sup table
      getsupagents();
      break;
  }//end switch (entity_type)

  switch (command)
  {
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
  }//end switch (command)

  logX.SetLogLevel(LOGL_INFO);
  if( bswrc == BSWRC_OK )
    logX << "AccapiEntities_c::SetValues() Done.\n" << LOG_TERMINATOR;
  else
    logX << "AccapiEntities_c::SetValues() Fail. !!!   rc = " << bswrc << "\n" << LOG_TERMINATOR;

  return BSWRC_OK;
} // SetValues


/*-----------------------[ CreateEntity ]-----------------------------*/
void AccapiEntities_c::CreateEntity( const char* snmp_key )
{
}
//560.1.17		// LRL PCLESS AGENT WHEN DISCONNECTED FROM SERVER		TBLID_SOFT_PARAM,     268700012,
//560.1.16        // LRL ETAS AUTO ANSWER ON PICKUP                     TBLID_SOFT_PARAM,     268700011,
//560.1.14        // LRL ETAS SCREEN POPUPS		123	55                  TBLID_SOFT_PARAM,     268700010,
//560.1.15        // LRL ETAS SCREEN POPUPS		124	55                  TBLID_SOFT_PARAM,     268700008,
//560.1.7         // LRL ETAS UDP FLAG		116	54                      TBLID_SOFT_PARAM,     268636186,
//560.1.8         // LRL ETAS AGENTS LIST UDP FLAG                      TBLID_SOFT_PARAM,     268501076,
//560.1.12        // LRL ETAS EPIC DL		121	55                      TBLID_SOFT_PARAM,     268501068,
//560.1.9         // LRL ETAS EPIC MODE                                 TBLID_SOFT_PARAM,     268501057,
//560.1.11        // LRL ETAS EPIC EMAIL                                TBLID_SOFT_PARAM,     268501056,
//560.1.10        // LRL ETAS EPIC OUTBOUND                             TBLID_SOFT_PARAM,     268501053,
//560.1.13        // LRL ETAS EPIC CHAT                                 TBLID_SOFT_PARAM,     268501052,
//560.1.3         // any change in SERVICE(i)	  							TBLID_SERVICES,        	
//560.1.5         // any change in release codes entry	 				TBLID_RELEASE_CODES_DEFS
//560.1.22        // any change in 'mail_accounts' table                  TBLID_MAIL_ACCOUNTS,    
//560.1.21        // any changes in IVR applications table	            TBLID_IVR_APPLICATIONS, 
//560.1.25        // any change in IRN(i)'s skills                        TBLID_IRN_SKILLS,       
//560.1.2.        // any change in GROUP(i) definitions	                TBLID_GROUPS,           
//560.1.24        // changes in 'edbc_conn_name_info'	                    TBLID_EDBC_CONN_NAME_INF
//560.1.18        // any changes of connection info (external DB)		    TBLID_CONN_INFO,        
//560.1.23        // any change in COS(i)		169	58                      TBLID_CLASS_OF_SERVICES,
//560.1.6.        // any change in AGENT(i)'s grp	                        TBLID_AGENTS_GRP,       
//560.1.1         // any change in AGENT(i) definitions	                TBLID_AGENTS,           
//560.1.19,26,27skills// any change in user CP fields	                        TBLID_USER_FIELD,       
//560.1.4          // any change in system wrapup codes	                TBLID_SYSTEM_WU,        
//560.1.20 / severity change in sup                                TBLID_SUP, 0,


//======================================[SendChangesToAllLogonSup]===========================
extern SUP_MAP sup_map;
void AccapiEntities_c::SendOneTableChangesToAllLogonSup(string action, string json)
{
  supEntry* userentry;
  accapi_my_print(0, "start Send all tables to active GCCS web sups\n");
  for (SUP_MAP_IT it = sup_map.begin(); it != sup_map.end(); ++it)
  {
    SUP_c& sup = it->second;
    if ((strcmp(sup.m_supName, "ea")) == 0)
    {
      int yyy;
      yyy = 0;
    }
    for (int i = 0; i < sup.m__supEntriesVec.size(); ++i)
    {
      userentry = sup.m__supEntriesVec[i];
      accapi_my_print(0, "sendOneTable: %s, active GCCS web sup: %s, session: %s\n",
        action.c_str(), userentry->m_supName.c_str(), userentry->sessionId.c_str());
      if (userentry->sessionId != "")
      {
        sendOneTable(userentry, action, json);
      }
    }
  }
  accapi_my_print(0, "end sendOneTable to active GCCS web sups\n");
}

//======================================[sendOneTable]===========================
void AccapiEntities_c::sendOneTable(supEntry* userentry, string action, string json)
{
  string  B64 = "";
  Base64::Encode(json, &B64);
  SendNotification(userentry, action, 0, B64);
}

