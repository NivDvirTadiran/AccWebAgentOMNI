# SMSERVER (sm)  Makefile
ERSRC = $(ACC_MAIN)
OBJDIR = ./.objdir

CCSRC = \
acc_api_tcp_server.cpp \
accapi_main.cpp \
sbc_main_thread.cpp \
sbc_sea_reply.cpp \
sbc_work_thread.cpp \
crmalltypes.cpp \
sbc_timer.cpp \
accapi_smmanager_c.cpp \
accapi_entities.cpp \
acc_personal_stataistics_work_thread.cpp
#
#CCOBJS = $(CCOBJ1) ${cppSOURCE:.cpp=.o}
#
CCOBJS = \
acc_api_tcp_server.o \
accapi_main.o \
sbc_main_thread.o \
sbc_sea_reply.o \
sbc_work_thread.o \
crmalltypes.o \
sbc_timer.o \
accapi_smmanager_c.o \
accapi_entities.o \
acc_personal_stataistics_work_thread.o
#
include $(ERSRC)/MakeUnix/MakeBase
#
MOREINCLUDES = -I $(ACC)/source/emis/include -I $(ERSRC)/source/bsw/include -I $(ERSRC)/source/dbi/dbi -I $(ERSRC)/source/c2g/include -I $(ACC)/source/SolLib
MORELIBS =  -l xmlsecmgr -l vcx-showmachineid_base  -lsrv -l eos -l sexc  -l sapi -l net_param  -l nt2unix  -l supserviceapi -l bswldsif -l rinifile   -l bswonlinethread \
-l er_win_ext -l bswldsstate  -l helpabout -l erld -l helpabout -l supserviceapi -l fmt -lsollib \
-lsrv -l adu_iface -l bsw -l dbi -l bswlog -l bswldsstate -l dbutil -l dbiclasses -l bswonlinethread \
-l erzipper -l supserviceapi -l nliblvl1 -l dir_sync -l delphi_filer -l svr -lzlib -lz -lsrv -lfmt -lutils -lcurses \
-l nliblvl2 -l r_con_mon_client -l con_alarms -l genxmlparserdll -l xerces-c -l c2g_utils -l gen_utils -l lrl_cp -l sea_provider \
-l lrl_utils -l eosevexlator -l dlt -l csa_utl -l mis_utils -l gen_utils -l ldsapi -l bswldsif -l bswldsapi -l bcc_iface -l bcc_core -l bcc_utils -l bswsocket -l lrl_ccsa
#
TARGET =  $(BIN_DIR)/accapi_p_d

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
	$(CXX) -o $@  $(MOREINCLUDES)   ${@:.o=.cpp}

# DO NOT DELETE
sinclude ./make.depend
