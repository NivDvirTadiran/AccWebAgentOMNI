# ifndef ACCAPI_WEB_GCCS_H
#define ACCAPI_WEB_GCCS_H
#include "gccsservice.h"


//static const int BUF_SIZE = 20000;
//static const int DEF_BYTE_ARR_LEN = 31000;

//GCCSService_c& GetGCCSService();

class AccapiWebGccs_c
{
public:
  //void read_scripts();
  //bool InitCCScriptTable();
  void HandleGccsRequest(int code, vector<string> params);

  RetCode_t GetMoreParamsFromSoftParam();
  void      SendAllGccsLists(supEntry* userentry);
  void      SendScripts(supEntry* userentry, string name_Chronical);
  void      UpdateSoftParam(string param_id_str, string param_value, string param_type = "s", string param_class = "5");

  int   PrepareToSend_AgentEvents(string& gccsstr);
  int   PrepareToSend_AgentCRMjson(string& gccsstr);

  void  gccsSupLogoff(SUP_c* sup, supEntry* entry, string note = "");

};

#endif //ACCAPI_WEB_GCCS_H