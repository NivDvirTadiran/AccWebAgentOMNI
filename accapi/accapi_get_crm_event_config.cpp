#ifdef _WIN32
#pragma warning(disable: 4786)
#endif

/*==========================[ Implementation Dependencies ]==============*/
#include "er_std_override.h"
#include <er_file_tree.h>
#include <bswlog.h>

extern "C" {
#include <ofil.h>
#include <oerrlvl2.h>
}
//
#define FLSF_GET_FILES		0x00000001
#define FLSF_GET_GET_DIRS	0x00000002
#define FLSF_GET_FILES_AND_DIRS  (FLSF_GET_FILES | FLSF_GET_GET_DIRS)
#define FLSF_USE_DELPHI_STREAM	0x01000000
//
class DLL_API FilterFile_c : public QueryInsertIface_c
{
public:
	FilterFile_c() : m_add_directories(true), m_add_files(true) { m_filter[0] = '*'; m_filter[1] = '\0'; }
	bool AddDirectory(Directory_c* dir) {
		return m_add_directories;
	}

    //1001633 - the previous version QueryInsertIface_c::GetFilter was used. It returned *.* (win) or * (linux).
    //the result was that the filter was always *.*. 
    char* GetFilter() {return &(m_filter[0]); }
	bool AddFile(File_c* file) {
		if (!m_add_files)
			return false;

		bool brc;

		if (m_filter[0] == '*')
			brc = true;
		else {
            int start_index = 0;
			string file_name = file->GetName();
            while ((m_filter[start_index] == '*') || (m_filter[start_index] == '?'))
              start_index++;
			int ext_loc = file_name.find_last_of('.');
			ext_loc++;
			if (ext_loc > 0) {
				if (er_stricmp(file->GetName()+ext_loc,m_filter+start_index) == 0)
					brc = true;
			}
		}
		return brc;
	}

	char m_filter[100];
	bool m_add_directories;
	bool m_add_files;
};
#define INVALID_FILE_ATTRIBUTES		((DWORD)-1) 

static BswLog_c s_log(BswMakeLogSite(90,1),0, LOGL_INFO);

/*==========================[ GetFileTree ]==================================*/
void GetFileTree(const char* crm_root_path,	 Bool_t expand_all)
				
{
	RetCode_t rc = BSWRC_OK;
	FileTree_c ft;
	FilterFile_c	ff;
	memset(ff.m_filter,0,100);

#ifdef WIN32
			er_strncpy(ff.m_filter,"*.*",3);
#else
			er_strncpy(ff.m_filter,"*",3);
#endif
		char local_path[MAX_PATH];
		er_strncpy(local_path,crm_root_path,MAX_PATH);

		ft.SetPath(EosFixFilePath(local_path));
		ff.m_add_directories = true;
		ff.m_add_files = FLSF_GET_FILES;
		ft.SetIgnoreEmptyDirs(false);
		ft.Expand(&ff,expand_all);
		int i = 0;
		++i;
		
}
