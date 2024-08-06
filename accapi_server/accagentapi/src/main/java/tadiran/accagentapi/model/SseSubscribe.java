package tadiran.accagentapi.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SseSubscribe
{

	public SseSubscribe() {}

	public SseSubscribe(String agentNo, String sessionId) { this.agentNo = agentNo; this.sessionId = sessionId; }

	public String agentNo = null;
	public String sessionId = null;

}
