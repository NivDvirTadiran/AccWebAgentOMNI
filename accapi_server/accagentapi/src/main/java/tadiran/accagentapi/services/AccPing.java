package tadiran.accagentapi.services;

import java.io.*;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;//

import java.net.*; 
  
class AccPing 
{ 
	static final  Logger myLog = LogManager.getLogger("AccPing");
  // Sends ping request to a provided IP address 
  public boolean  sendPingRequest(String ipAddress) 
              
  { 
	    try {
    InetAddress geek = InetAddress.getByName(ipAddress); 
    //System.out.println("Sending Ping Request to " + ipAddress); 
    if (geek.isReachable(5000)) { 
    	//myLog.debug("Host is reachable: " +  ipAddress);
      return true;
    }
    else{
    
    	myLog.error("Sorry ! We can't reach to this host: " +  ipAddress);
      return false;
    }					} catch (UnknownHostException e) {
		// TODO Auto-generated catch block
		myLog.error("ping UnknownHostException: " + e.getMessage());
		return false;
	}
	catch (IOException e) {
		// TODO Auto-generated catch block
		myLog.error("ping IOException: " + e.getMessage());
		return false;
	}					

  } 
  
  // Driver code 
  public static void main(String[] args) 
          throws UnknownHostException, IOException 
  { 
	AccPing p = new AccPing() ; 
    String ipAddress = "127.0.0.1"; 
    p.sendPingRequest(ipAddress); 
  
    ipAddress = "133.192.31.42"; 
    p.sendPingRequest(ipAddress); 
  
    ipAddress = "145.154.42.58"; 
    p.sendPingRequest(ipAddress); 
  } 
} 



//public class AccPing1
//{
//
//  static final  Logger myLog = LogManager.getLogger("AccSocketClient");
//  public static void main(String args[]) 
//  throws IOException
//  {
//    // create the ping command as a list of strings
//	  AccPing1 ping = new AccPing1();
//    List<String> commands = new ArrayList<String>();
//    commands.add("ping");
//    commands.add("-n");
//    commands.add("3");
//    commands.add("172.28.1.174");
//    ping.doCommand(commands);
//  }
//  public boolean doCommand(List<String> command) throws IOException
//  {
//  
//    String s = null;
//
//    ProcessBuilder pb = new ProcessBuilder(command);
//	myLog.debug("ping do command: " + command.get(0) + " " + 
//			command.get(1) + " " + command.get(2) + " " + command.get(3));
//
//    Process process = pb.start();
//
//    BufferedReader stdInput = new BufferedReader(new InputStreamReader(process.getInputStream()));
//    BufferedReader stdError = new BufferedReader(new InputStreamReader(process.getErrorStream()));
//
//    // read the output from the command
//    boolean b = false;
//    while ((s = stdInput.readLine()) != null)
//    {
//    	myLog.error(s);
//      b = s.contains("Lost = 3");
//      if (b == true) {
//    	  System.out.println("no connection to: " + command.get(3));
//    	  break;
//      }
//    }
//    if (b == true)
//    {
//    	myLog.error("no connection to " + command.get(3));
//    }
//    // read any errors from the attempted command
//    //System.out.println("Here is the standard error of the command (if any):\n");
//    while ((s = stdError.readLine()) != null)
//    {
//      System.out.println(s);
//    }
//    return b;
//  }
//
//}

