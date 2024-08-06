#ifndef ACCAPI_ENTITIES_C
#define ACCAPI_ENTITIES_C
//
class AccapiEntities_c : public BswObject_c 
{
public:
  virtual ~AccapiEntities_c();

  //static  AccapiEntities_c& GetEntityMgr(AccapiWorkThread_c* workThread);
  static  AccapiEntities_c& GetAccapiEntitiesObj(void);

  void InitSystemParam();

  RetCode_t GetDescriptor(BswAttribDescr_c& self_descr) const;
  RetCode_t GetAttribute(const char*        snmp_key,
                         BswAttribDescr_c&  attr_descr,
                         char*              sub_key) const;
  RetCode_t SetValues(BswAttribDescr_c&   attr_descr,
                      BswStream_c&        in_stream,
                      BswStream_c&        out_stream );

  void CreateEntity(const char* snmp_key);

  void SendOneTableChangesToAllLogonSup(string action, string json);
  void sendOneTable(supEntry* userentry, string action, string json);

  //AccapiWorkThread_c* m_WorkThread;

};
#endif //ACCAPI_ENTITIES_C
