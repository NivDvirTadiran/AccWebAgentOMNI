package tadiran.accagentapi.services;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;//

import tadiran.accagentapi.model.AccNotifications;
import tadiran.accagentapi.services.AccApiConfig;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;



public class AccSocketClient
{
	static final  Logger myLog = LogManager.getLogger("AccSocketClient");
	private static AccSocketClient m_this = null;
    protected static final int off = 0;
    //public static MyList m_AccMessageList = null;
	byte[] m_dataBuffer = new byte[10];
    //IAsyncResult m_result;
    public Socket m_clientSocket = null;
    public String m_Ip = "";
    public String m_IpSecondry = "";
    public int m_PortNo = -1;
    public boolean m_IsConnected = false;
    public DataInputStream m_DataInputStream = null;
    public AccAgentApiService US;
    public String m_CurrentIp = "";
    public int m_Retries = 0;
    public int m_MaxRetries = 3;
    public int m_WaitBetweenfailedConnect = 2000; //mili;
    private final Charset UTF8_CHARSET = Charset.forName("UTF-8");
    public  Boolean AccIsActive = false;
    static public TCPListenerThread m_TCPListenerThread = null;
    static public PingThread m_PingThread = null;
    public AccSocketClient(String ipStr, int port,String ipStrSecondry, AccAgentApiService us)
    {
    	US = us;
    	if (m_this != null)
    	{ 
    		myLog.error("SocketClient already initiated");
    			return;
    	}
    	//m_timer = new MyTimer(500);
    	m_this = this;
        if (ipStr == "" || port <= 0)
        {
        	myLog.error("IP Address and Port Number are required to connect to the Server\n");
            return;
        }
        m_CurrentIp = m_Ip = ipStr;
        m_PortNo = port;
        m_IpSecondry = ipStrSecondry;
        m_Retries = 0;
        m_MaxRetries = 3;
 m_PingThread = null;
        try
        {
        	m_TCPListenerThread = new TCPListenerThread();
        	m_TCPListenerThread.start();
        	m_PingThread = new PingThread();
        	m_PingThread.start();
        }
        catch (Exception e)
        {
        	myLog.error("Calling startListenForTCP FAILED: " + e.getMessage()  + " " + e.getCause());
        }

        //Connect();
    }


    public synchronized void Connect()
    {
    		if (isConnected() == true)
    		{
    			return;
    		}
            UpdateControls(false);
            try 
            {
            	if (m_CurrentIp.equals("")) { return;}
             	SocketAddress sockaddr  = new InetSocketAddress(m_CurrentIp,m_PortNo);
            	m_clientSocket = new Socket();
            	// Connect with 2 s timeout
            	m_clientSocket.connect(sockaddr, 2000);            	
    			//m_clientSocket = new Socket(m_CurrentIp,m_PortNo);
    			myLog.info("SocketClient initiated: "  + m_CurrentIp + " port:" + Integer.toString(m_PortNo));
    		}
            catch (UnknownHostException e) 
            {
            	myLog.error("SocketClient UnknownHostExceptionip: " + m_CurrentIp + " port:" + Integer.toString(m_PortNo) + " \n" + e.getMessage()  + " " + e.getCause() + "\n");
    			//e.printStackTrace();
    			return;
    		}
            catch (IOException e) 
            {
            	myLog.error("SocketClient IOException: " + m_CurrentIp + " port:" + Integer.toString(m_PortNo) + " \n" + e.getMessage()  + " " + e.getCause() + "\n");
    			//e.printStackTrace();
    			return;
    		}
            if (m_clientSocket.isConnected())
            {
            	myLog.info("Connected to ip: " + m_CurrentIp + " port:" + Integer.toString(m_PortNo));
                UpdateControls(true);
                try {
						m_DataInputStream =  new DataInputStream(m_clientSocket.getInputStream());
				} catch (IOException e) {
					e.printStackTrace();
					
				}
           }
           //m_timer.Start();
}
//-----------------------------------------------------------------------
////////////////////////////////////////////////////////////////
public static short swapBytes(short c)
{
	short r =  (short)((c<<8) | ((c>>8)&0xff));
	return r;
}
public static byte[] swapBytesFromShort(short c)
{
	byte[] b = new byte[2];
	short r =  (short)((c<<8) | ((c>>8)&0xff));
	b[0] = (byte) (r >> 8);
	b[1] =  (byte) r;
	
	return b;
}
//-----------------------------------------------------------------------
    
    public synchronized boolean SendMessage(String message)
    {
    	if (m_IsConnected == false)
    	{
    		Connect();
    	}
    	
    	short len;
        try
        {
        	OutputStream outToServer = m_clientSocket.getOutputStream();
        	DataOutputStream out = new DataOutputStream(outToServer);
         	byte[] bs = message.getBytes(UTF8_CHARSET);
         	len = (short) bs.length;
        	//if (!(message.contains("keepalive"))){
        //		myLog.debug("Send: " + " ->"  + message);
        	//}
        	byte []b = swapBytesFromShort(len);
          	byte []all= new byte[bs.length + 2];
        	for (int i = 2; i < all.length;++i)
        	{
        		all[i] = bs[i-2];
        	}
        	all[0] = b[0];
        	all[1] = b[1];
            //out.writeShort(swapBytes(len) );
            //out.writeBytes(message);
        	out.write(all);
            //out.flush();
//
             return true;
        }
        catch (SocketException se)
        {
        	myLog.error("SendMessage SocketException " + se.getMessage()  + " " + se.getCause());
        	Disconnect();
        	return false;
        }
        catch (Exception se)
        {
        	myLog.error("SendMessage Exception  " + se.getMessage()  + " " + se.getCause());
            if (m_IsConnected == false)
            {
            	Disconnect();
            }
            return false;
        }
    }
    
    public boolean isConnected()
    {
        return m_IsConnected;
    }
    private void UpdateControls(boolean connected)
    {
        m_IsConnected = connected;
    }
    public synchronized  void Disconnect()
    {
    	AccIsActive = false;
        if (m_clientSocket != null)
        {
            try
            {
            	if ( m_IsConnected == false) 
            	{
            		return;
            	}
                //m_clientSocket.Shutdown(SocketShutdown.Both);
                m_clientSocket.close();
                m_IsConnected = false;
                //m_timer.Stop();
                UpdateControls(false);
                myLog.info("Disconnect " + m_CurrentIp);
            }
            catch (IOException e)
            {
            	myLog.error("Disconnect IOException\n" + e.getMessage()  + " " + e.getCause() + "\n");
            }
            catch (Exception e)
            {
            	myLog.error("Disconnect Exception\n" + e.getMessage() + "\n" + e.getStackTrace());
            }
            //m_clientSocket = null;
         }
    }
//==================================================================================================
public boolean mySleep(int mili)
{
	try {
		Thread.sleep(mili);
	} catch (InterruptedException e) {
		Disconnect();
		myLog.error("mySleep: " + e.getMessage());
		throw new RuntimeException("Thread " +  
                "interrupted");
	}
	return true;
}

//=====================================
public void ReplaceIps()
{
	if ( m_IpSecondry == "") {
		return;
	}
		
	if (m_CurrentIp == m_Ip)
	{
		m_CurrentIp = m_IpSecondry;
	}
	else if (m_CurrentIp == m_IpSecondry)
	{
		m_CurrentIp = m_Ip;
	}
	myLog.info("ReplaceIps()=> Current Ip changed to " + m_CurrentIp);
}
// try connect to acc server
	public synchronized void  tryConnectToAccServer()
	{
		while (isConnected() == false) 
		{
			Disconnect();
			Connect();
			if (isConnected() == false)
			{
				mySleep(m_WaitBetweenfailedConnect);
				m_Retries++;
				if (m_Retries >= m_MaxRetries)
				{
					ReplaceIps();
					m_Retries = 0;
					
				}
				continue;
			}
		}
	}
// ======= check accapi is stopped ======
	Boolean CheckStopAccAgent(String note){
		if (AccApiConfig.isStop == true) {
			Disconnect();
			myLog.error(note);
			return true;
			//System.exit(123);
			//throw new RuntimeException(note); 
		}
			//System.exit(1234);
		return false;
	}
//=====================================
	class TCPListenerThread extends Thread {
		public void run() {
			Boolean run = true;
			String serverMessage = null;
			tryConnectToAccServer();
			short len = 0;
			while (run) {

				try {
					if (CheckStopAccAgent("startListenForTCP: accwebagent stopped")) return;
					if (m_DataInputStream.available() > 0) {
						len = m_DataInputStream.readShort();
					} else

					{
						if (mySleep(20) == false) {
							break;
						}
						continue;
					}
					len = swapBytes(len);
					if (len == -1) {
						continue;
					}
					byte[] b;
					if (len > 10000) {
						b = new byte[len];
					} else {
						b = new byte[len];
					}
					m_DataInputStream.readFully(b);
					serverMessage = new String(b, UTF8_CHARSET);
					if (!(serverMessage.contains("keepalive"))) {
						myLog.info("AccAdminSocketClient Recv Message:  " + serverMessage);
					}

					if ((serverMessage.startsWith("SOLSOL - ")) == true) {
						myLog.warn(m_CurrentIp + ", Recv: SOLSOL - : " + serverMessage);
						if ((serverMessage.startsWith("SOLSOL - ACTIVE")) == false) {
							AccIsActive = false;
							// US.noConnectionToAccCount = 0;
							myLog.warn("Recv Exception  accserver not active: " + serverMessage);
							Disconnect();
							mySleep(5000); // when the server packet not from active
							ReplaceIps();
							continue;
						}
						m_Retries = 0;
						String[] sso = serverMessage.split(",");
						if (sso.length >= 3) {
							AccApiConfig.IsSSO = false;
							AccApiConfig.IsSSOSeating = false;
							if (sso[1].equals("SSO=1")) {
								AccApiConfig.IsSSO = true;
							}
							if (sso[2].equals("SEATING=1")) {
								AccApiConfig.IsSSOSeating = true;
							}
							if (sso.length == 4 && sso[3].startsWith("AccVersion=")) {
								AccApiConfig.AccVersion = sso[3].split("=")[1];
								myLog.info("AccVersion: " + AccApiConfig.AccVersion);
							}
							myLog.info("SSO:  " + AccApiConfig.IsSSO.toString() + "Seating: "
									+ AccApiConfig.IsSSOSeating.toString());
						}
						AccIsActive = true;
						continue; // got SOLSOL - ACTIVE
					}
					List<AccNotifications> LAN = null;
					try {
						LAN = new ObjectMapper().readValue(serverMessage, new TypeReference<List<AccNotifications>>() {
						});
					} catch (Exception ex) {
						if (CheckStopAccAgent("startListenForTCP: accwebagent stopped")) return;
						myLog.error("Recv,JsonParseException, ignore acc message: " + serverMessage);
						myLog.error(ex);
						continue;
					}

					US.AddNotificationFromServer(LAN);
				} 
				catch (Exception e) {
					
					myLog.warn("Recv Exception  " + e.getMessage() + " " + e.getCause() + "\n" + e.getStackTrace());
					Disconnect();
					if (CheckStopAccAgent("startListenForTCP: accwebagent stopped")){
						Disconnect();
						return;
					}
					tryConnectToAccServer();
				} finally {
				}
			}
		}
	}
	

	//============================[ping thread]=================
	class PingThread extends Thread { 
		AccPing accPing = new AccPing(); 
		List<String> commands = new ArrayList<String>();
		PingThread(){
			commands.add("ping");
			commands.add("-n");
			commands.add("3");
			commands.add("172.28.1.123");
		}

	    public void run() 
	    {
			int consecutiveFailedRetries = 0;
	        try { 
	    			while (AccApiConfig.isStop == false) {
	    				mySleep(5000);
	    				commands.set(3, m_CurrentIp);
	    				boolean b = accPing.sendPingRequest(m_CurrentIp);
	    				if (b == false) {
    						if (isConnected()) {
    	    					SendMessage("[]");
    							myLog.error("Ping Failed going to disconnect " + m_CurrentIp);
								if (consecutiveFailedRetries >= 3) Disconnect(); else consecutiveFailedRetries+=1;
    						}
 	    				}
	    				else {
							//myLog.info("Ping Send Dummy Message");
							consecutiveFailedRetries = 0;
	    					SendMessage("[]");
	    				}
	    			}
	    			
	    		}
	        	catch (Exception e) { 
					if (CheckStopAccAgent("startListenForTCP: accwebagent stopped")) {
						Disconnect();
						return;
					}
	        }

	    } 
	}

	  //==================================================================================================
}

//----------------------------------------------------	
// This is a helper function used (for convenience) to 
// get the IP address of the local machine
/*----------------------------------------------------
String GetIP()
{
    String strHostName = Dns.GetHostName();

    // Find host by name
    IPHostEntry iphostentry = Dns.GetHostByName(strHostName);

    // Grab the first IP addresses
    String IPStr = "";
    foreach (IPAddress ipaddress in iphostentry.AddressList)
    {
        IPStr = ipaddress.ToString();
        return IPStr;
    }
    return IPStr;
}
*/


