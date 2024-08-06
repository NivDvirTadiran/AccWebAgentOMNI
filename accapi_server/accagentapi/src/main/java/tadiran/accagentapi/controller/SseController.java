package tadiran.accagentapi.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.Getter;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import tadiran.accagentapi.model.AccNotifications;
import tadiran.accagentapi.model.SseSubscribe;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;



@RestController
//@RequestMapping("server-events")
public class SseController {
    static final Logger myLog = LogManager.getLogger("SseController");


    /*
    public interface SseSession {
        public String sessionId = null;
        String agentNo = null;
        SseEmitter sseEmitter = null;
        //String sessionId();
        //String agentNo();
        //SseEmitter sseEmitter();
    }*/

    @Getter
    @Setter
    public class SseSession {
        String sessionId;
        String agentNo;
        SseEmitter sseEmitter;

        public SseSession(String sessionId, String agentNo, SseEmitter sseEmitter) {
            this.sessionId = sessionId;
            this.agentNo = agentNo;
            this.sseEmitter = sseEmitter;
        }

        //Override public String sessionId() { return this.sessionId; }

        //@Override public String agentNo() { return this.agentNo; }

        //@Override public SseEmitter sseEmitter() { return this.sseEmitter; }
    }

    public   Map<String, SseEmitter> mEmitters = new HashMap<String, SseEmitter>();
    public   List<SseSession> listSseSessions = new CopyOnWriteArrayList<SseSession>();
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<SseEmitter>();

    // method for client subscription
    @CrossOrigin
    @GetMapping(value = "/subscribe/{sessionId}", consumes = MediaType.ALL_VALUE)
    public SseEmitter subscribe(@PathVariable(value = "sessionId") String sessionId /*@RequestBody SseSubscribe sseSubscribe*/) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

        myLog.info("new session subscribed to SSE service: " + sessionId);

        try {
            emitter.send(SseEmitter.event().id(sessionId).name("INIT"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        SseSession sseSession = new SseSession(
                sessionId,
                "agentNo",
                emitter
        );

        listSseSessions.add(sseSession);
        //sseSession.sseEmitter.onCompletion(() -> listSseSessions.remove(sseSession));
        listSseSessions.removeIf(sS -> sS.sessionId.equals(sessionId));
        emitter.onCompletion(() ->
                listSseSessions.removeIf(sS -> sS.sessionId.equals(sessionId))
        );

        mEmitters.put(sessionId, sseSession.sseEmitter);
        emitter.onCompletion(() -> mEmitters.remove(sessionId));


        // Add the emitter to a list of subscribers or handle it in another way
        return sseSession.sseEmitter;
    }


    @CrossOrigin
    @RequestMapping(value = "/dispatchEvent", method = RequestMethod.POST)
    public void dispatchEventToClients(@RequestBody SseSubscribe sseSubscribe) {
        myLog.info("dispatchEvent - agentNo: " + sseSubscribe.agentNo + "sessionId: " + sseSubscribe.sessionId);

        AccNotifications accNotifications = new AccNotifications();
        accNotifications.setSessionid(sseSubscribe.sessionId);
        this.sendAccNotificationEventToClients(accNotifications);

        for (SseEmitter emitter : emitters) {
            try {
                //emitter.send(SseEmitter.event().name("message").data(sseSubscribe.agentNo));
                //emitter.send(SseEmitter.event().name("accNotificationEvent").data(sseSubscribe.agentNo));
                emitter.send("event for " + sseSubscribe.sessionId);
            } catch (IOException e) {
                emitters.remove(emitter);
            }
        }
    }

    public void sendAccNotificationEventToClients(AccNotifications accNotification) {
        sendAccNotificationEventToClients(accNotification.getSessionid(), accNotification);
    }


    public void sendAccNotificationEventToClients(String sessionId, AccNotifications accNotification) {
        myLog.info("send AccNotification to session: " + sessionId);
        String notification;
        ObjectWriter ow = new ObjectMapper().writer();
        //for (SseEmitter emitter : emitters) {
        SseEmitter emitter = mEmitters.get(sessionId);


            try {

                notification = "[" + ow.writeValueAsString(accNotification) + "]";
                SseEmitter.SseEventBuilder sseEventBuilder = SseEmitter.event()
                        .id(sessionId)
                        .name("accNotificationEvent")
                        .data(notification);
                        //.reconnectTime(1000);  //reconnect time in millis
                //emitter.send(sseEventBuilder);
                emitter.send(notification);

            } catch (JsonProcessingException e) {
                myLog.warn("SSE Error: Json stringify failed - " + e.getMessage()  + " " + e.getCause());
            } catch (IOException e) {
                emitters.remove(emitter);
            } catch (NullPointerException e) {
            }

    }

    public boolean isSessionIdSubscribed(String sessionId) {
        return mEmitters.containsKey(sessionId);
    }
}
