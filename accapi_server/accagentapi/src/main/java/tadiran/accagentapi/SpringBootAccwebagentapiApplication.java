package tadiran.accagentapi;

import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.XmlWebApplicationContext;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration;
import java.util.Collections;

@EnableAsync
public class SpringBootAccwebagentapiApplication implements WebApplicationInitializer {
    @Override
    public void onStartup(ServletContext container) {
        XmlWebApplicationContext context = new XmlWebApplicationContext();
        context.setConfigLocation("/WEB-INF/accagentapi-servlet.xml");


        ServletRegistration.Dynamic accagentapi = container
                .addServlet("accagentapi", new DispatcherServlet(context));

        accagentapi.setAsyncSupported(true);
        accagentapi.setLoadOnStartup(1);
        accagentapi.addMapping("/");
    }

    // Used by spring security if CORS is enabled.
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("https://localhost:4200");
        config.setAllowCredentials(false);
        config.addAllowedOrigin("*");
        config.setAllowedHeaders(Collections.singletonList("*"));
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
