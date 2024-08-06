package tadiran.accagentapi.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;//

public class myConcurrentMap {
	static final  Logger myLog = LogManager.getLogger("myConcurrentMap");
	
	public int countNotification = 0; 
	public int countNotificationTotal = 0;

	public   Map<String, List<AccNotifications>> map = new ConcurrentHashMap<String, List<AccNotifications>>();

	public void AddNotification(AccNotifications accNotifications) {
		AddNotification(accNotifications.getSessionid(), accNotifications);
	}


	public void AddNotification(String key, AccNotifications value) {
		List<AccNotifications> l = null;
		if (key.length() > 4 && !( value.getAction().startsWith("__")))
		{
				myLog.debug(map.size() +  "  Agent No: " + value.getAgentNo() +  ", AddNotification, key: " + key + ", action: " + value.getAction() );
		}
		if (map.containsKey(key))
		{
			l =  map.get(key);
			int sizeX = l.size();
			if (sizeX > 3000) {
				myLog.info("Remove first 2000 outof: " + sizeX + " notifications from: " + key.toString() );
				try {
					for (int i = 0; i< 2000;++i) {
						l.remove(0);
					}
					} catch (Exception e) {}
					// TODO: handle exception
				}
			countNotification += l.size();
			countNotificationTotal+= l.size();
			l.add(value);
		}
		else
		{
			l = new ArrayList<AccNotifications>();
			countNotification += l.size();
			l.add(value);
			this.map.put(key, l);
		}
		return;
	}
	//
	public List<AccNotifications> getAllNotification(String key)
	{
		List<AccNotifications> l = null;
		if (key.equals("AllNotifications_Test"))
		{
			
			l = new ArrayList<AccNotifications>();
			for (Object value : map.values()) {
				l.add((AccNotifications) value);
			}
			return l;
			
			//map.values().stream().collect(Collectors.toList());
			//l = map.values().stream().collect(Collectors.toList());
		}
		if (map.containsKey(key))
		{

			List<AccNotifications> ll = map.get(key);
			if (key.length() > 4 && ll.size() > 0)
			{
				String s = ll.get(0).getParams();
				if (s.length() > 400) {s = s.substring(0, 399);}
				myLog.debug(map.size() + ", getAllNotification: key: " + key + " " + s );
			}
			l = new ArrayList<AccNotifications>(ll);
			countNotification -= ll.size();
			if (countNotification > 5000) {
				myLog.debug(map.size() + ", " + "countNotification: " + countNotification);
				countNotification = 0;
			}
			ll.clear();
		}
		else
		{
			l = new ArrayList<AccNotifications>();
		}
		return l;
	}
	public List<AccNotifications> getAllNotification()
	{
		List<AccNotifications> l = new ArrayList<AccNotifications>();
		for (Map.Entry<String, List<AccNotifications>> entry : map.entrySet())
		{
			List<AccNotifications> ll = entry.getValue();
			l.addAll(ll);
		}
		map.clear();
		return l;
	}


}
