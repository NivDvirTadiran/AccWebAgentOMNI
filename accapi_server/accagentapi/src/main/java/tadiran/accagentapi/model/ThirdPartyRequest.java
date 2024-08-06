package tadiran.accagentapi.model;

public class ThirdPartyRequest 
{
	public ThirdPartyRequest() {}
	public ThirdPartyRequest(String session, String name,String actionX,String agent,String ext,Boolean onoff,String more)
	{
		sessionid 		= session;
		thirdPartyName	= name;
		action			= actionX;
		agentNo			= agent;
		extension		= ext;
		trueFalse		= onoff; 
		more_params		= more;	}

	public String getSessionid() {
		return sessionid;
	}
	public void setSessionid(String sessionid) {
		this.sessionid = sessionid;
	}
	public String getThirdPartyName() {
		return thirdPartyName;
	}
	public void setThirdPartyName(String thirdPartyName) {
		this.thirdPartyName = thirdPartyName;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getAgentNo() {
		return agentNo;
	}
	public void setAgentNo(String agentNo) {
		this.agentNo = agentNo;
	}
	public String getExtension() {
		return extension;
	}
	public void setExtension(String extension) {
		this.extension = extension;
	}
	public Boolean getTrueFalse() {
		return trueFalse;
	}
	public void setTrueFalse(Boolean trueFalse) {
		this.trueFalse = trueFalse;
	}
	public String getMore_params() {
		return more_params;
	}
	public void setMore_params(String more_params) {
		this.more_params = more_params;
	}

	private String sessionid="";
	private String thirdPartyName="";
	private String action="";
	private String agentNo="";
	private String extension="";
	private Boolean trueFalse=false; 
	private String more_params="";
}
