#!/bin/bash

pwd;
ls 'accapi_client/dist/';
sed -e "s/%ACC_VERSION%/8.0.107/g" -i  accapi_client/dist/main*


sleep 1;

#ls -la '/c/Program Files/Apache Software Foundation/Tomcat 9.0/webapps/dist';
#rm -rf '/c/Program Files/Apache Software Foundation/Tomcat 9.0/webapps/dist';
#echo ls -la '/c/Program Files/Apache Software Foundation/Tomcat 9.0/webapps/dist';
#ls dist;
# rm -rf dist;
# echo ls dist;
# cd /c/niv/web/accWebRT-collected/AccWebAgent/accapi_client;
# npm run build;
#bestzip dist3.war dist/   WEB-INF/
#cd dist; jar cvf ../dist1.war .; cd ../;
#sleep 0.3
#cp -r dist/  'C:\Program Files\Apache Software Foundation\Tomcat 9.0\webapps\'
#sleep 0.3
#cp -r  WEB-INF/ '/c/Program Files/Apache Software Foundation/Tomcat 9.0/webapps/dist/'
