# ifndef ACCAPI_WEB_ADMIN_H
#define ACCAPI_WEB_ADMIN_H


//static const int BUF_SIZE = 20000;
//static const int DEF_BYTE_ARR_LEN = 31000;


class AccapiWebAdmin_c
{

public:

  enum DbBackUpType_e {
    BACKUP_NOW = 0x11111111,
    BACKUP_CONFIG = 0x22222222,
    BACKUP_CONFIG_DONE = 0x33333333,
    RESTORE_DB = 0x44444444
  };

  int  isDBActionAllowed();
  int  getDBActionStatus(string action, string& status);
  int  getDBActionStatusCode(string action);

  void HandleAdminRequest(int code, vector<string> params);

  void AdminSendNotification(int      clientId,
                             string&  session,
                             string&  supname,
                             string   action,
                             string   data);

  EosRetCode_t  sendEventToDbi(const EosOpCode_t  opcode,
                               Byte_t* const      event_data,
                               Ushort_t           event_data_len);

  int sendOdbcFile(int clientId, string& session, string& user, string action, string data);
  int SendWebAdminIvrs(int clientId, string& session, string& user, string action);
  int SendWebAdminBackups(int clientId, string& session, string& user, string action);
  int SendWebAdminDBActionStatus(int clientId, string& session, string& user, string action, string data);

  void  adminSupLogoff(SUP_c* sup, supEntry* entry, string note = "");

};

static opertaion DBACTION[] =
{
  {"backup_now",          AccapiWebAdmin_c::BACKUP_NOW},
  {"backup_config",       AccapiWebAdmin_c::BACKUP_CONFIG},
  {"backup_config_done",  AccapiWebAdmin_c::BACKUP_CONFIG_DONE},
  {"restore_db",          AccapiWebAdmin_c::RESTORE_DB},
  {"",999}
};


#endif //ACCAPI_WEB_ADMIN_H#pragma once
