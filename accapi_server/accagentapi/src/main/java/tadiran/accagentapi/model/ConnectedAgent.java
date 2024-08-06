package tadiran.accagentapi.model;
import java.io.PrintWriter;
import java.sql.Timestamp;

public class ConnectedAgent 
{
	public ConnectedAgent(String agentno, String sessionid)
	{
		sessionId = sessionid;
		agentNo = agentno;
		loginDate = new Timestamp(System.currentTimeMillis());
		OldsessionId = "";
		_writer = null;
		count = 0;
	}
	//
	private String sessionId;
	public String getSessionId() {
		return sessionId;
	}
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
	public String getOldsessionId() {
		return OldsessionId;
	}
	public void setOldsessionId(String oldsessionId) {
		OldsessionId = oldsessionId;
	}
	public String getAgentNo() {
		return agentNo;
	}
	public void setAgentNo(String agentNo) {
		this.agentNo = agentNo;
	}
	public Timestamp getLoginDate() {
		return loginDate;
	}
	public void setLoginDate(Timestamp loginDate) {
		this.loginDate = loginDate;
	}
	public PrintWriter get_writer() {
		return _writer;
	}
	public void set_writer(PrintWriter _writer) {
		this._writer = _writer;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	private String OldsessionId;
	private String agentNo;
	private Timestamp loginDate;
	private PrintWriter _writer;
	private int count;
}
