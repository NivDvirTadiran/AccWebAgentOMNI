# ACCAPI (accapi)  Makefile
ERSRC = $(ACC_MAIN)
OBJDIR = ./.objdir

CCSRC = \
accapi_main.cpp \
accapi_main_thread.cpp \
accapi_work_thread.cpp \
accapi_ps_work_thread.cpp \
accapi_tcp_server.cpp \
accapi_sea_reply.cpp \
accapi_crm_types.cpp \
accapi_timer.cpp \
accapi_sm_manager.cpp \
accapi_entities.cpp \
accapi_CEMax.cpp \
accapi_web_gccs.cpp \
accapi_web_admin.cpp \
filebrowser.cpp
#
#CCOBJS = $(CCOBJ1) ${cppSOURCE:.cpp=.o}
#
CCOBJS = \
accapi_main.o \
accapi_main_thread.o \
accapi_work_thread.o \
accapi_ps_work_thread.o \
accapi_tcp_server.o \
accapi_sea_reply.o \
accapi_crm_types.o \
accapi_timer.o \
accapi_sm_manager.o \
accapi_entities.o \
accapi_CEMax.o \
accapi_web_gccs.o \
accapi_web_admin.o \
filebrowser.o
#
include $(ERSRC)/MakeUnix/MakeBase
#
MOREINCLUDES = -I $(ACC)/source/emis/include -I $(ERSRC)/source/bsw/include -I $(ERSRC)/source/dbi/dbi -I $(ERSRC)/source/c2g/include -I $(ACC)/source/SolLib  -I $(ACC)/source/gccsserver -I $(ACC)/source/async_hooks/fullhttps_hook
#
MORELIBS =  -l xmlsecmgr -l vcx-showmachineid_base  -lsrv -l eos -l sexc  -l sapi -l net_param  -l nt2unix  -l supserviceapi -l bswldsif -l rinifile   -l bswonlinethread \
-l er_win_ext -l bswldsstate  -l helpabout -l erld -l helpabout -l supserviceapi -l fmt -lsollib -lfullhttps_hook \
-lsrv -l adu_iface -l bsw -l dbi -l bswlog -l bswldsstate -l dbutil -l dbiclasses -l bswonlinethread \
-l supserviceapi -l nliblvl1 -l dir_sync -l delphi_filer -l svr -lzlib -lz -lsrv -lfmt -lutils -lcurses \
-l nliblvl2 -l r_con_mon_client -l con_alarms -l genxmlparserdll -l xerces-c -l c2g_utils -l gen_utils -l lrl_cp -l sea_provider \
-l lrl_utils -l eosevexlator -l dlt -l csa_utl -l mis_utils -l gen_utils -l ldsapi -l bswldsif -l bswldsapi -l bcc_iface -l bcc_core -l bcc_utils -l bswsocket \
 -l lrl_ccsa -l fullhttps -lssl -lcrypto -l dbbroker
#
TARGET =  $(BIN_DIR)/accapi

all :  $(TARGET)
$(TARGET) : $(CCOBJS)
	rm -f $(TARGET)
	$(LD)  -o $(TARGET)  $(CCOBJS)  $(EasyRunLib) $(MORELIBS)  $(LINUX_LIBS) -lcurses
#	$(AR)  -o $(TARGET)  $(CCOBJS)

clean:
	/bin/rm -rf $(OBJ_DIR)  $(TARGET) $(CCOBJS)
make.depend:
	rm -f make.depend
	$(CCC) -MM $(CCSRC)  $(MOREINCLUDES) > make.depend

depend:
	$(CCC) -MM $(CCSRC)  $(MOREINCLUDES)  > make.depend

#-fpermissive
$(CCOBJS):
	@echo "---------------------------------------------------------------------------------"
	@echo $@
	@echo "---------------------------------------------------------------------------------"
	$(CXX) -fpermissive  -o $@  $(MOREINCLUDES)   ${@:.o=.cpp}

# DO NOT DELETE
sinclude ./make.depend
