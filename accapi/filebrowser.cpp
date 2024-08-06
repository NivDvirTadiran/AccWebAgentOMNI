#include <vector>
#include <string>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#ifndef WIN32
#include <dirent.h>
#include <unistd.h>
#endif


using namespace std;
#

void accapi_my_print(int level,const char* fmt, ...);
int list_dir(const std::string& dir, std::vector<std::string>& files){
unsigned fileCount = 0;
#ifndef WIN32
    DIR *dp;
    struct dirent *dirp;
 	
    if ((dp = opendir(dir.c_str())) == NULL){
		accapi_my_print(0,"filebrowser.cpp, list_dir(),  Error opening dir: %s\n", dir.c_str());
    }

    while ((dirp = readdir(dp)) != NULL){
        files.push_back(std::string (dirp->d_name));
        fileCount++;
    }

    closedir(dp);
#endif
    return fileCount;
}

 

int list_dirs (const std::string& _dir, std::vector<std::string>& _files, std::string _current_dir,string extension,string &JsonStr)
{
#ifndef WIN32
   std::vector<std::string> __files_or_dirs;
   list_dir(_dir, __files_or_dirs);
   std::vector<std::string>::iterator it = __files_or_dirs.begin();
   struct stat sb;
   for (; it != __files_or_dirs.end(); ++it)
   {
     std::string entry = *it;
     if (entry.c_str()[0] == '.') continue;
      std::string full_path = _dir + "/" + entry;

      if (lstat(full_path.c_str(), &sb) == 0 && S_ISDIR(sb.st_mode)){
          list_dirs(full_path, _files, _current_dir + "/" + entry,extension,JsonStr);
      }
      else
      {
        char* found = (char*)"";
        if (extension.length() > 0)
        {
          found = strstr((char*)entry.c_str(), (char*)extension.c_str());
        }
        if (found != NULL)
        {
          _files.push_back(full_path);
          JsonStr += "\"" + full_path + "\",\n";
        }
      }
    }
 #endif
   return 0;
}
//==================================
int mainXX(int argc, char *argv[])
{
  vector<string> files;
  string JsonStr = "[";
  if (argc < 3) return -1;
  fprintf(stderr, "dir: %s, extension: %s\n\n", argv[1], argv[2]);
  list_dirs(argv[1], files, "", argv[2], JsonStr);
  JsonStr[JsonStr.length() - 1] = ']';
  printf("%s", JsonStr.c_str());
  return 0;
}

