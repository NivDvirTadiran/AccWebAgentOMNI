package tadiran.accagentapi.model;

public class AccNotifications 
{
	public String getSessionid() {
		return sessionid;
	}
	public void setSessionid(String sessionid) {
		this.sessionid = sessionid;
	}
	public String getDirection() {
		return direction;
	}
	public void setDirection(String direction) {
		this.direction = direction;
	}
	public String getAgentNo() {
		return agentNo;
	}
	public void setAgentNo(String agentNo) {
		this.agentNo = agentNo;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getParams() {
		return params;
	}
	public void setParams(String params) {
		this.params = params;
	}
	public AccNotifications() {}
	public AccNotifications(String direction, String agentNo, String action, String prms  )
	{
		this.direction = direction;
		this.agentNo = agentNo;
		this.action = action;
		this.params = prms;
	}
	public String sessionid  = "empty";
	public String direction = "";
	public String agentNo = "";
	public String action = "";
	public String params  = null;

}
