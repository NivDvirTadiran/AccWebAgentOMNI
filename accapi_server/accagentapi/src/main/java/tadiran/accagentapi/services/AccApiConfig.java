package tadiran.accagentapi.services;


import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;//

@WebListener
public class AccApiConfig  implements ServletContextListener 
{
	public static AccApiConfig accApiGlobal = new AccApiConfig(); 
	public static int AccPort = -1;
	public static String AccActiveIp = "";
	public static String ACCWEBServers = "";
	public static String AccSecondryIp = "";
	public static int CheckClientAliveIntervaSec = 30;
	public static boolean isStop = false;
	public static Boolean  IsSSO = false;
	public static Boolean  IsSSOSeating = false;
	public static Boolean  IsSSOprev = false;
	public static Boolean  isAuthTokenFilterOn = false;
	public static String AccVersion = "";

	private static ServletContext ctx = null;
	final static Logger myLog = LogManager.getLogger("AccApiConfig");

	//=================================================


	@Override
	public void contextDestroyed(ServletContextEvent arg0) 
	{
	    AccSocketClient.m_TCPListenerThread.interrupt();
	    AccSocketClient.m_PingThread.interrupt();
	       	myLog.info("contextDestroyed: " + arg0.toString());
    	AccApiConfig.isStop = true;    	//System.exit(0);
 
	}
	@Override
	public void contextInitialized(ServletContextEvent servletContextEvent)
	{
	   	try
    	{
    		if (ctx == null)
    		{
     			myLog.info("ServletContextListener for Application.");
    			ctx = servletContextEvent.getServletContext();
	        //
    			if (ctx != null)
        		{	
//    				String current = new java.io.File( "." ).getCanonicalPath();
//    		        myLog.info("Current dir:"+current);
//    		        String currentDir = System.getProperty("user.dir");
//    		        myLog.info("Current dir using System:" +currentDir);
    				//Path currentRelativePath = Paths.get("");
    				//myLog.info("+++++++++++++++++++++++++ Working Directory = " + currentRelativePath.toAbsolutePath());
    			              //System.getProperty("user.dir"));
    	   	    	//PropertyConfigurator.configure("log4j.properties");
    	   	    	
	       			AccActiveIp   = ctx.getInitParameter("ACCServerAddress1");
	       			myLog.info("AccApiConfig, AccActiveIp: " + AccActiveIp);
	    			AccSecondryIp = ctx.getInitParameter("ACCServerAddress2");
	       			myLog.info("AccApiConfig, AccSecondryIp: " + AccSecondryIp);
	       			AccPort = Integer.valueOf(ctx.getInitParameter("ACCServerPort1"));
	       			myLog.info("AccApiConfig, AccPort: " + AccPort);
	       			ACCWEBServers = ctx.getInitParameter("ACCWEBServers");
	       			myLog.info("AccApiConfig, ACCWEBServers: " + ACCWEBServers);
        		}
 	        }
   	}
    	catch (Exception e)
    	{
    		myLog.error("AccApiConfig constructor " +  e.getMessage());
    	}
		
		
	}


}
