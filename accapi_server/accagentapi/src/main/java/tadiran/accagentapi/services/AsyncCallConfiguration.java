package tadiran.accagentapi.services;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync(proxyTargetClass = true)
public class AsyncCallConfiguration implements AsyncConfigurer {

    @Bean(name = "callSSE")
    public Executor asyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(100);
        executor.setMaxPoolSize(500000);
        executor.setQueueCapacity(100000);
        executor.setThreadNamePrefix("SSE Thread - ");
        executor.initialize();
        return executor;
    }

}
