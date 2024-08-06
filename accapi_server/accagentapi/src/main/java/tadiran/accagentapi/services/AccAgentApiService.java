package tadiran.accagentapi.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import tadiran.accagentapi.controller.SseController;
import tadiran.accagentapi.model.*;
import tadiran.accagentapi.services.CustomSpnegoHttpFilter.Constants;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AccAgentApiService   
{
   // ACC
    private  myConcurrentMap fromAccServer;
    private  myConcurrentMap toAccServer;
    public  AccSocketClient accSocketservice;
    private  Map<String, ConnectedAgent> connectedAgentsMap;  
    public  int noConnectionToAccCount = -1;
    public LocalDateTime KeepAliveOneMinute = LocalDateTime.now();
	final static Logger myLog = LogManager.getLogger("AccAgentApiService");
	private final String[] excludeSSEActions = { "logon", "__groups", "__etasini", "__phonebook", "deviceStatus", "__callprofiles", "__releasecodes" };

	@Autowired
	SseController sseController;
	@Autowired
	final SSEService sseService = new SSEService(sseController);


    public AccAgentApiService() 
    {
   	
        fromAccServer = new myConcurrentMap();
        toAccServer = new myConcurrentMap();
        connectedAgentsMap =  new ConcurrentHashMap<String, ConnectedAgent>(); 
        accSocketservice = new AccSocketClient(AccApiConfig.AccActiveIp, AccApiConfig.AccPort, AccApiConfig.AccSecondryIp, this);
	}
    // =============================================================================
    public AccNotifications getSSOdetails(HttpSession session,String sessionId,String version)
    {
     	String agentSSOName = ((String) session.getAttribute(Constants.SSO_LOGGED_IN_USERNAME)).trim();
    	Boolean ssoEnable = AccApiConfig.IsSSO;
    	Boolean ssoSseating = AccApiConfig.IsSSOSeating;
    	AccNotifications AN = null;
    	String noVersion = ", , , , , ,";
    	AN = new AccNotifications("f_t",agentSSOName,"__SSOStatus", sessionId + ", " + agentSSOName + ",__SSOStatus," 
    							+ ssoEnable.toString() + "," + ssoSseating.toString()  + "," + AccApiConfig.ACCWEBServers +  "," + AccApiConfig.AccVersion 
    							+ noVersion);
    	//
    	myLog.info("getSSOdetails ("+ accSocketservice.m_CurrentIp +"): sso: " + ssoEnable.toString() + ", Seating: " + ssoSseating.toString() + ", agent name: " + agentSSOName + " acc server version: " + AccApiConfig.AccVersion + ", acc clinet version: " + version);
    	
    	return AN;
    }
     // =============================================================================
    public void  AddNotificationToServer(List<AccNotifications> notificationlist)
    {
    	for(AccNotifications notification  : notificationlist)
    	{
    		toAccServer.AddNotification(notification.agentNo,notification);
    	}
    }
    // ============================================================================
	@Async("callSSE")
	public void AddNotificationFromServer(List<AccNotifications> notificationlist) throws IOException {
		String sessionId = notificationlist.stream().findAny()
				.map(AccNotifications::getSessionid).orElse(null);
		myLog.info("notification.getSessionId():  " + sessionId
				+ "\tisSessionIdSubscribed: " + sseController.isSessionIdSubscribed(sessionId));


			if (sseController.isSessionIdSubscribed(sessionId)) {
				for(AccNotifications notification  : notificationlist) {

					//myLog.info("notification.getAction():  " + notification.getAction()
					//		+ "\texcludeSSEActions: " + Arrays.toString(excludeSSEActions));
					//
					//if (Arrays.asList(this.excludeSSEActions).contains(notification.getAction()))
					//	fromAccServer.AddNotification(notification);
					//else

					sseService.sendEvents(notification);


					//sseController.sendAccNotificationEventToClients(notification);

				}
			} else {
				for (AccNotifications notification : notificationlist)
					{ fromAccServer.AddNotification(notification); }
			}

	}
    
    //==============================================================================
    public boolean sendLoginDetailstToNotifactions(String action,AccLoginDto accLogin,String agentIp,String webserverIp)
    {
    	//StartSse(accLogin.getUsername(),accLogin.getSessionid());
    	String s  = action.toLowerCase() + ",000," + accLogin.getUsername() + "," + accLogin.getPassword() + "," + accLogin.getExtension() + "," + agentIp+ "," + webserverIp + "," + accLogin.getVersion();
    	myLog.debug("sendLoginDetailstToNotifactions=> params; " + s);
    	
     	AccNotifications notificatin = new AccNotifications("t_s", accLogin.getUsername(), action, s);
    	notificatin.setSessionid(accLogin.getSessionid());
    	String json = "[]";
    	ObjectWriter ow = new ObjectMapper().writer();
    	try {
			json = "[" + ow.writeValueAsString(notificatin) + "]";
		} catch (JsonProcessingException e) {
			myLog.warn("sendAgentRequeststToNotifactions: " + e.getMessage()  + " " + e.getCause());
		}
    	myLog.debug("agent logon request(" + accSocketservice.m_CurrentIp + "): " + accLogin.getUsername()+ "," +  accLogin.getSessionid() + ", params: " + notificatin.getParams() );

    	accSocketservice.SendMessage(json);
    	return true;
    }
    // ======================================================================
    public boolean sendAgentRequeststToNotifactions(AccNotifications notification)
    {
    	String json = "[]";

 //   	ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
    	ObjectWriter ow = new ObjectMapper().writer();
    	try {
			json = "[" + ow.writeValueAsString(notification) + "]";
		} catch (JsonProcessingException e) {
			myLog.warn("sendAgentRequeststToNotifactions: " + e.getMessage()  + " " + e.getCause());
			return false;
		}
    	if (!(notification.getAction().equals("keepalive") ))
    	{
     		myLog.debug("agent request     : " + notification.getAgentNo()+ "," +  notification.getSessionid() + ", Action: " + notification.getAction() );
    	}
    	else {
    		LocalDateTime now = LocalDateTime.now();
    		long diff = ChronoUnit.SECONDS.between(KeepAliveOneMinute,now);
    		//myLog.debug("KeepAliveOneMinute diff: " + diff);
    		if (diff >= 53 && diff <= 60) 
    		{
         		myLog.debug("KeepAliveOneMinute : " + notification.getAgentNo() + "," + notification.getSessionid() );
     		}
    		else if (diff > 60)
    		{
        		KeepAliveOneMinute = now;
    		}
    	}
    	accSocketservice.SendMessage(json);
    	return true;
    }
    //=========================================================================
    // getFromServerNotification ============================================
    //
    public  List<AccNotifications> getFromServerNotification(String agentNo,String sessionId)
    {
    	List<AccNotifications> l = null;
    	AccNotifications AN = null;
    	if (accSocketservice.AccIsActive == false)
    	{
    		// send no connection to acc 
    		if ( (noConnectionToAccCount % 1) == 0)
    		{
    			AN = new AccNotifications("f_t",agentNo,"__NoConnectionToAcc", sessionId + ", " + agentNo + ",__NoConnectionToAcc,"  + ", , , , , , , ,");
    			AN.sessionid = sessionId;
     			l = new ArrayList<AccNotifications>();
     			l.add(AN);
     		}
    		noConnectionToAccCount++;
    	}
    	else
    	{
    		if (noConnectionToAccCount != -1)
    		{
    			AN = new AccNotifications("f_t",agentNo,"__ConnectionToAcc", sessionId + ", " + agentNo + ",__ConnectionToAcc,"  + ", , , , , , , ,");    			AN.sessionid = sessionId;
    			AN.sessionid = sessionId;
     			l = new ArrayList<AccNotifications>();
     			l.add(AN);
    			noConnectionToAccCount = -1;
     		}
    		else
    		{
    			l = fromAccServer.getAllNotification(sessionId);
    		}
    	}
    	//toLog("==== return to agentNo ====" + agentNo,  l);
    	return l;
    }
    public void toLog(String note, List<AccNotifications> l)
    {
       	if (!l.isEmpty())
    	{
       		myLog.info(note);
       		for(AccNotifications n  : l)
    		myLog.info(n.agentNo + ", " + n.action + ", " + n.direction + ", params: " + n.params);
    	}   	
    }
    //==============================================================================
    public void thirdPartyRequest(ThirdPartyRequest party)
    {
       	AccNotifications AN = new AccNotifications();
       	AN.setSessionid(party.getSessionid());
       	AN.setAction(party.getAction());
       	AN.setDirection("f_3p");
       	AN.setAgentNo(party.getAgentNo());
       	AN.setParams(party.getAction()+ ",0," +
       	             party.getAgentNo() + "," + 
       			     party.getExtension() + "," + 
       	             party.getTrueFalse().toString() + "," +
       			     party.getThirdPartyName() + "," +
       			     party.getMore_params());
    	ObjectWriter ow = new ObjectMapper().writer();
    	String json;
    	try {
			json = "[" + ow.writeValueAsString(AN) + "]";
		} catch (JsonProcessingException e) {
			myLog.warn("thirdPartyRequest: " + e.getMessage()  + " " + e.getCause());
			return;
		}
    	myLog.debug("agent request     : " + json );
    	accSocketservice.SendMessage(json);
    }
    //==============================================================================
    public void  sendPingReq()
    {
    	//accSocketservice.Disconnect();
    	
    	
//     	myLog.info("Send PING to acc server: " + accSocketservice.m_CurrentIp);
//     	sendAgentRequeststToNotifactions(new AccNotifications("f_t","999999","PING", "999999999" + ", " + "999999" + ",PING,"  + ", , , , , , , ,"));
//     	try {
//			OutputStream outToServer = accSocketservice.m_clientSocket.getOutputStream();
//			outToServer.flush();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//	    	myLog.info("sendPingReq->IOException, send PING: " + e.getMessage());
//	    }
//     	myLog.info("After Send PING to acc server: " + accSocketservice.m_CurrentIp);
    }
    //==============================================================================
    public void accAdminUpdate(AccAdminUpdate accAdminUpdate)
    {
       	AccNotifications AN = new AccNotifications();
       	AN.setSessionid("accadminupdate9999999999");
       	AN.setAction("accadminupdate");
       	AN.setDirection("f_accAdmin");
       	AN.setAgentNo("AccAdmin");
       	//accAdminUpdate.getM_more_ids()[0] = 0xFFFFFFFF;
       	AN.setParams(accAdminUpdate.getChange() + "," +
       				 accAdminUpdate.getTable_id() + "," + 
       				 accAdminUpdate.getEntity_id1() + "," + 
       				 accAdminUpdate.getEntity_id2() + ",");
       				 //accAdminUpdate.getM_more_ids()[0]);
    	ObjectWriter ow = new ObjectMapper().writer();
    	String json;
    	try {
			json = "[" + ow.writeValueAsString(AN) + "]";
		} catch (JsonProcessingException e) {
			myLog.warn("thirdPartyRequest: " + e.getMessage()  + " " + e.getCause());
			return;
		}
    	myLog.debug("agent request     : " + json );
    	accSocketservice.SendMessage(json);
    }
    
    
}

