package tadiran.accagentapi.model;

import lombok.Data;

@Data
public class AccReturnToClientDto {
	public AccReturnToClientDto(String agengid,String desc)
	{
		agantId = agengid;
		description = desc;
	}
	private String agantId;	
	private String description;
}
