package tadiran.accagentapi.model;
//
enum Change {
	ADU_UNKNOWN,
	ADU_INSERT,
	ADU_DELETE,
	ADU_UPDATE 	};

public class AccAdminUpdate {
	public static int getMAX_ADDITIONAL_IDS() {
		return MAX_ADDITIONAL_IDS;
	}
	public static void setMAX_ADDITIONAL_IDS(int mAX_ADDITIONAL_IDS) {
		MAX_ADDITIONAL_IDS = mAX_ADDITIONAL_IDS;
	}
	public Change getChange() {
		return change;
	}
	public void setChange(Change change) {
		this.change = change;
	}
	public long getTable_id() {
		return table_id;
	}
	public void setTable_id(long table_id) {
		this.table_id = table_id;
	}
	public long getEntity_id1() {
		return entity_id1;
	}
	public void setEntity_id1(long entity_id1) {
		this.entity_id1 = entity_id1;
	}
	public long getEntity_id2() {
		return entity_id2;
	}
	public void setEntity_id2(long entity_id2) {
		this.entity_id2 = entity_id2;
	}
	static int MAX_ADDITIONAL_IDS = 10;
	private Change change;
	private long   table_id;
	private long   entity_id1;
	private long   entity_id2;
    //long  []  m_more_ids = new long [AccAdminUpdate.MAX_ADDITIONAL_IDS];
}
