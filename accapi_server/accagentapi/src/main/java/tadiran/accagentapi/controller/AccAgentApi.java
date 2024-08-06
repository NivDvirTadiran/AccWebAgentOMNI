package tadiran.accagentapi.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tadiran.accagentapi.model.*;
import tadiran.accagentapi.services.AccAgentApiService;
import tadiran.accagentapi.services.AccApiConfig;
import tadiran.accagentapi.services.AuthTokenFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import javax.ws.rs.QueryParam;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;


@RestController
//@RequestMapping("/")
public class AccAgentApi 
{
        static final Logger myLog = LogManager.getLogger("AccAgentApi");
        public static PrintWriter _writer = null;

	    private final AccAgentApiService accAgentApiService;

	    //private SessionUtils sessionUtils;
	   @Autowired
	    public AccAgentApi(AccAgentApiService accAgentApiService)//, SessionUtils sessionUtils) {
	    {
	        super();
	        this.accAgentApiService = accAgentApiService;
	        //this.sessionUtils = sessionUtils;
	    }

	//========================================================================================
	@RequestMapping(value = "/aeonix-app-center-status", method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	public String aeonixAppCenterStatus(HttpServletResponse response)
	{
		return "{\"status\":\"" + (AccApiConfig.isAuthTokenFilterOn ? "ON" : "OFF" ) + "\"}";
	}
	 //========================================================================================
	   @RequestMapping(value = "/ping", method = RequestMethod.GET)
	   @ResponseStatus(value = HttpStatus.OK)
	    public String doPing(HttpServletResponse response)
	    {
	     	accAgentApiService.sendPingReq();
		    return "{\"OK\":\"OK\"}";
	    }
	 //========================================================================================
//	   @RequestMapping(value = "/sse", method = RequestMethod.GET)
//	    public void doGet( @QueryParam("agentNo") final String agentNo,@QueryParam("sessionId") final String sessionId,
//	    		HttpServletResponse response)
//	    {
//		   //  throws ServletException, IOException {
//		//content type must be set to text/event-stream
//		response.setContentType("text/event-stream"); 
//		//cache must be set to no-cache
//		response.setHeader("Cache-Control", "no-cache");     
//		//encoding is set to UTF-8
//		response.setCharacterEncoding("UTF-8");
//		ConnectedAgent CA = accAgentApiService.StartSse(agentNo,sessionId);//,response);
//		if (CA.get_writer() == null)
//		{
//			myLog.error("Fail To create Server send event, agentId: " + agentNo + ", sessionId: " + sessionId);
//			return;
//		}
//		ObjectMapper mapper = new ObjectMapper();
//		AccNotifications AN = new AccNotifications("f_js", "0000", "initSse", agentNo);
//		String jsonInString = "[]";
//		try {
//			jsonInString = mapper.writeValueAsString(AN);
//		} catch (JsonProcessingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			
//		}
//		CA.get_writer().write(jsonInString);
//		CA.get_writer().flush();
//		CA.get_writer().close();
//		CA.set_writer(null);
//		
// 	   }
	   //========================================================================================
//	   @RequestMapping(value = "/ssesubscribe")
//	    public void SseSendEvent(@QueryParam("agentNo") final String agentNo,@QueryParam("sessionId") final String sessionId,
//	    		HttpServletResponse response)
//	    {
//		   //  throws ServletException, IOException {
//		//content type must be set to text/event-stream
//		response.setContentType("text/event-stream"); 
//		//cache must be set to no-cache
//		response.setHeader("Cache-Control", "no-cache");     
//		//encoding is set to UTF-8
//		response.setCharacterEncoding("UTF-8");
//		ConnectedAgent CA = accAgentApiService.StartSse(agentNo,sessionId);//,response);
//		if (CA.get_writer() == null)
//		{
//			myLog.error("Fail To create Server send event, agentId: " + agentNo + ", sessionId: " + sessionId);
//			return;
//		}
//		ObjectMapper mapper = new ObjectMapper();
//		AccNotifications AN = new AccNotifications("f_js", "0000", "initSse", agentNo);
//		String jsonInString = "[]";
//		try {
//			jsonInString = mapper.writeValueAsString(AN);
//		} catch (JsonProcessingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		CA.get_writer().write(jsonInString);
//		CA.get_writer().flush();
//		CA.get_writer().close();
// 	   }
	 //======================================================================
	   @RequestMapping(value = "/AccAgentPage", method = RequestMethod.GET)
	   public void  AccAgentPage(HttpServletRequest request,
               HttpServletResponse response)throws IOException
	   {
		   String p = request.getQueryString();
		   if (p  != null && p.length() > 4) p = "?" + request.getQueryString(); else p = "";
		   String test = request.getRequestURL().toString().replace("AccAgentPage","");
		   String testx = test.replace("AccAgentPage","");
		   myLog.debug("RequestURI: " + test+ ", RedirectTo: " + testx + p );
		   response.sendRedirect(testx + p);
	   }
	//===============================================================================
	   //http://172.28.1.53:8080/accagentapi/AgentLogon?&agentno=1001&pwd=1&ext=2001&auto=1&ringsecs=3
	   @RequestMapping(value = "/AgentLogon", method = RequestMethod.GET)
	    public void  AgentLogon(HttpServletRequest request,
	    		                HttpServletResponse response,
	    		                @QueryParam("agentno") final String agentno,
	    		                @QueryParam("pwd") final String pwd,
	    		                @QueryParam("ext") final String ext,
	    		                @QueryParam("auto") final String auto,
	    		                @QueryParam("ringsecs") final String ringsecs) throws IOException {
		   String test = request.getRequestURL().toString();
		   String testx = request.getRequestURL().toString();
		   String [] testy = testx.split("/");
		   testx = testy[0]+ "/";
		   for (int i = 2; i < testy.length - 1;++i  ) {
			   testx += "/" + testy[i];
		   }
		   if (agentno != null) {
			   testx +=   "?agentno=" + agentno;
			   if (pwd != null) {  testx +=   "&pwd=" + pwd;}
			   if (ext != null) {  testx +=   "&ext=" + ext;}
			   if (auto != null) {  testx +=   "&auto=" + auto;}
			   if (ringsecs != null) {  testx +=   "&ringsecs=" + ringsecs;}
			   
		   }
 		   myLog.debug("RequestURI: " + test+ ", RedirectTo: " + testx  );

		   response.sendRedirect(testx);
    
	        //usersService.login(session, accLoginDto);
	    }
    // ====================[ agentlogin ]============================================
    @RequestMapping(value = "/agentlogin", method = RequestMethod.POST)
    public synchronized AccReturnToClientDto agentlogin(HttpServletRequest request, final  @RequestBody AccLoginDto accLoginDto) 
    {
    	myLog.debug("/agentlogin version: " + accLoginDto.getVersion());
    	boolean b =  accAgentApiService.sendLoginDetailstToNotifactions("Logon",accLoginDto,request.getRemoteHost(),request.getServerName());
    	if (b == false)
    	{
    		
    	}
    	myLog.debug("agentlogin => RemoteUser: " + request.getRemoteAddr() + ", " +  request.getServerName()  );
        return new AccReturnToClientDto(accLoginDto.getUsername(),": got login request");
    }
	// ====================[ agentlogingate ]============================================
	@RequestMapping(value = "/agentlogingate", method = RequestMethod.POST)
	public synchronized AccReturnToClientDto agentlogingate(HttpServletRequest request, final  @RequestBody AccLoginDto accLoginDto)
	{
		String headerAuth = request.getHeader("Authorization");

		if (headerAuth.startsWith("Bearer ")) {
			headerAuth = headerAuth.substring(7);
		}
		accLoginDto.setUsername(AuthTokenFilter.getAgentNoFromJwtToken(headerAuth));

		myLog.debug("/agentlogingate version: " + accLoginDto.getVersion());
		boolean b =  accAgentApiService.sendLoginDetailstToNotifactions("Logongate",accLoginDto,request.getRemoteHost(),request.getServerName());
		if (b == false)
		{

		}
		myLog.debug("agentlogingate => RemoteUser: " + request.getRemoteAddr() + ", " +  request.getServerName()  );
		return new AccReturnToClientDto(accLoginDto.getUsername(),": got login request");
	}
	//========================================================================================

    //  ======================[ agent_Notifications ]==========================================
    @RequestMapping(value = "/accnotification", method = RequestMethod.GET)
    public synchronized List<AccNotifications> agent_Notifications(@QueryParam("agentNo") final String agentNo, @QueryParam("sessionId") final String sessionId) {



		List<AccNotifications> notificationList = accAgentApiService.getFromServerNotification(agentNo,sessionId);
        return notificationList;//, {""});
        //usersService.login(session, accLoginDto);
    }
    //  ======================[ accssoenable ]==========================================
    @RequestMapping(value = "/accssoenable", method = RequestMethod.GET)
    public synchronized AccNotifications accssoenable(HttpSession session,@QueryParam("agentNo") final String agentNo,
    					@QueryParam("sessionId") final String sessionId,
    					@QueryParam("agentversion") final String agentversion) {
    			myLog.debug(" accssoenable==> agentId: " + agentNo + ", sessionId: " + sessionId + " ,Client version: " + agentversion);

    	AccNotifications AN = accAgentApiService.getSSOdetails(session,sessionId,agentversion);
        return AN;//, {""});
        //usersService.login(session, accLoginDto);
    }
    //  =====================[ agent_request ]===========================================
	@CrossOrigin(origins = "https://localhost:4200", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
    @RequestMapping(value = "/agentrequest", method = RequestMethod.PUT)
    public synchronized String  agent_request( @Valid @RequestBody AccNotifications agentNotifications)
    {
     	accAgentApiService.sendAgentRequeststToNotifactions(agentNotifications);
        return "OK";
    }
 //========================================================================================
   @RequestMapping(value = "/partyrequest", method = RequestMethod.PUT)
    public void thirdPartyRequest(@Valid @RequestBody ThirdPartyRequest thirdPartyRequest)
    {
	    myLog.debug("3 party Request: " + thirdPartyRequest.getAgentNo() + ", party name: " + thirdPartyRequest.getThirdPartyName() + ", action: " + thirdPartyRequest.getAction());
	    accAgentApiService.thirdPartyRequest(thirdPartyRequest);
 	    return;
    }
   //  ======================[ agent_Notifications ]==========================================
   @RequestMapping(value = "/hooktest", method = RequestMethod.GET)
   public synchronized String HookTest(@QueryParam("testNo") final String testNo) {
      		 return("start=(1,2,3,4,5,6)end");
         //usersService.login(session, accLoginDto);
   }
 //========================================================================================
   @RequestMapping(value = "/accadminupdate", method = RequestMethod.PUT)
    public void accAdminUpdate(@Valid @RequestBody AccAdminUpdate accadminUpdate)
    {
	    myLog.debug("AccAdminUpdate Request: " + accadminUpdate.getTable_id());
	    accAgentApiService.accAdminUpdate(accadminUpdate);
 	    return;
    }
   
   
}
