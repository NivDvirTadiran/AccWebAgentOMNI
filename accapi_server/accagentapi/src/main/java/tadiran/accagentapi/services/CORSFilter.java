package tadiran.accagentapi.services;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;//

@WebFilter(filterName = "CorsFilter", urlPatterns = "/*", asyncSupported = true)
public class CORSFilter implements Filter {
		 
	final static Logger LOGGER = LogManager.getLogger("CORSFilter");
	/**
	     * Default constructor.
	     */
	    public CORSFilter() {
	        // TODO Auto-generated constructor stub
	    }
	 
	    /**
	     * @see Filter#destroy()
	     */
	    public void destroy() {
	    	LOGGER.info("destroy CORSFilter");	

	        // TODO Auto-generated method stub
	    }
	 
	    /**
	     * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	     */
	    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
	            throws IOException, ServletException {
	 
	        HttpServletRequest request = (HttpServletRequest) servletRequest;
	        //LOGGER.info("CORSFilter HTTP Request: " + request.getMethod());
	 
	        // Authorize (allow) all domains to consume the content
	        ((HttpServletResponse) servletResponse).setHeader("Access-Control-Allow-Origin", "*");
			((HttpServletResponse) servletResponse).setHeader("Access-Control-Allow-Headers", "content-type,Authorization");
	        ((HttpServletResponse) servletResponse).setHeader("Access-Control-Allow-Methods","GET, OPTIONS, HEAD, PUT, POST");

	        HttpServletResponse resp = (HttpServletResponse) servletResponse;
	 
	        // For HTTP OPTIONS verb/method reply with ACCEPTED status code -- per CORS handshake
	        if (request.getMethod().equals("OPTIONS")) {
	            resp.setStatus(HttpServletResponse.SC_ACCEPTED);
	            return;
	        }
	 
	        // pass the request along the filter chain
	        chain.doFilter(request, servletResponse);
	    }
	 
	    /**
	     * @see Filter#init(FilterConfig)
	     */
	    public void init(FilterConfig fConfig) throws ServletException {
	    	LOGGER.info("init CORSFilter: " + fConfig.toString());	

	        // TODO Auto-generated method stub
	    }
	 
	}
