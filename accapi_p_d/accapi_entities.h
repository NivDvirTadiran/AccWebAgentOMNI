#ifndef ACCAPI_ENTITIES_C
#define ACCAPI_ENTITIES_C
//
class accapi_entities_c : public BswObject_c 
{
public:
	virtual ~accapi_entities_c();


    static  accapi_entities_c& GetEntityMgr(SbcWorkThread_c *workThread);
	void InitSystemParam();

    RetCode_t GetDescriptor(BswAttribDescr_c& self_descr) const;

    RetCode_t GetAttribute( const char*       snmp_key,
                           BswAttribDescr_c&  attr_descr,
                           char*              sub_key) const;

    RetCode_t SetValues( BswAttribDescr_c&   attr_descr,
                         BswStream_c&        in_stream,
                         BswStream_c&        out_stream );

	void CreateEntity( const char* snmp_key );

SbcWorkThread_c *m_WorkThread;

};
#endif //ACCAPI_ENTITIES_C
