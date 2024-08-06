package tadiran.accagentapi.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import tadiran.accagentapi.controller.SseController;
import tadiran.accagentapi.model.AccNotifications;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;


@Service
public class SSEService {
    static final Logger myLog = LogManager.getLogger("SSEService");
    private final SseController sseController;


    public SSEService(SseController sseController) {
        this.sseController = sseController;
    }

    public void sendEvents(AccNotifications accNotifications) throws IOException {
        ObjectWriter ow = new ObjectMapper().writer();
        String notifications = null;
        SseEmitter emitter;
        emitter = sseController.mEmitters.get(accNotifications.getSessionid());

        try {

            notifications = "[" + ow.writeValueAsString(accNotifications) + "]";

        } catch (JsonProcessingException e) {
            myLog.warn("SSE Error: Json stringify failed - " + e.getMessage()  + " " + e.getCause());
        }
        //emitter.send(notification);
        CompletableFuture<Void> pegasus = sendMessage(emitter, notifications);

    }

    @Async("callSSE")
    public CompletableFuture<Void> sendMessage(SseEmitter emitter, String notifications) {
        try {

            Thread.sleep(10);

            emitter.send(notifications);

            return CompletableFuture.completedFuture(null);

        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
