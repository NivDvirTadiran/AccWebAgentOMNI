package tadiran.accagentapi.services;

import io.jsonwebtoken.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
//import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class AuthTokenFilter implements Filter {

	final static Logger LOGGER = LogManager.getLogger("AuthTokenFilter");

	/** directories which should not be authenticated irrespective of filter-mapping. */
	private final transient List<String> excludeDirs = new ArrayList<String>();

	/**
	 * Default constructor.
	 */
	public AuthTokenFilter() {
	    // TODO Auto-generated constructor stub
	}

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		LOGGER.info("destroy AuthTokenFilter");

		if (null != this.excludeDirs) {
			this.excludeDirs.clear();
		}
		AccApiConfig.isAuthTokenFilterOn = false;
	    // TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
	        throws IOException, ServletException {

		final HttpServletRequest request = (HttpServletRequest) servletRequest;

		// Authorize (allow) all domains to consume the content
		((HttpServletResponse) servletResponse).setHeader("Access-Control-Allow-Origin", "*");
		((HttpServletResponse) servletResponse).setHeader("Access-Control-Allow-Headers", "content-type,Authorization");
		((HttpServletResponse) servletResponse).setHeader("Access-Control-Allow-Methods","GET, OPTIONS, HEAD, PUT, POST");


		final HttpServletResponse response = (HttpServletResponse) servletResponse;

		LOGGER.info("JWT token:    -" + request.getRequestURI() + "-");


		boolean valid = false;
		String username = "";
		try {
			String jwt = parseJwt(request);
			if (jwt != null && validateJwtToken(jwt)) {
				username = getUserNameFromJwtToken(jwt);
				valid = true;
			}
		} catch (Exception e) {
			LOGGER.error("Cannot set user authentication: {}", e);
		}


		if(
				request.getRequestURI().startsWith("/accOMNI/assets") ||
				request.getRequestURI().startsWith("/accOMNI/styles.css") ||
				request.getRequestURI().matches("/accOMNI/main\\.\\d\\.\\d\\.([0-9][0-9][0-9])\\.js$") ||
				request.getRequestURI().matches("/accOMNI/(?:scripts|polyfills|vendor|main|runtime)\\.js$") ||
				request.getRequestURI().matches("/accOMNI/aeonix-app-center-status$") ||
				request.getRequestURI().matches( "/accOMNI/fontawesome-webfont\\.(?:woff|woff2|ttf)$") ||
				request.getRequestURI().matches( "/accOMNI/favicon\\.(?:ico|woff2|ttf)$") ||
				request.getRequestURI().endsWith("ngsw-worker.js") ||
				request.getRequestURI().endsWith("/accOMNI/AgentLogon") ||
				request.getRequestURI().endsWith("/accOMNI/start.html") ||
				request.getRequestURI().endsWith("/accOMNI/")){
			LOGGER.info("JWT token permited by url" + username);
			chain.doFilter(request, response);
			return;
		}

		// For HTTP OPTIONS verb/method reply with ACCEPTED status code -- per CORS handshake
		if (!valid) {
			LOGGER.info("JWT token not valid ");
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return;
		}else {
			LOGGER.info("the JWT user from the token: " + username);
		}
				// pass the request along the filter chain
	    chain.doFilter(request, servletResponse);
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		LOGGER.info("init AuthTokenFilter: " + fConfig.toString());
		AccApiConfig.isAuthTokenFilterOn = true;
	    // TODO Auto-generated method stub
	}

	private String parseJwt(HttpServletRequest request) {
		String headerAuth = request.getHeader("Authorization");

		if (headerAuth.startsWith("Bearer ")) {
			return headerAuth.substring(7, headerAuth.length());
		}

		return null;
	}

	public String getUserNameFromJwtToken(String token) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
	}

	public static String getAgentNoFromJwtToken(String token) {
		return  Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().get("agentNo",java.lang.String.class);
	}

	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			LOGGER.error("Invalid JWT signature: {}", e);
		} catch (MalformedJwtException e) {
			LOGGER.error("Invalid JWT token: {}", e);
		} catch (ExpiredJwtException e) {
			LOGGER.error("JWT token is expired: {}", e);
		} catch (UnsupportedJwtException e) {
			LOGGER.error("JWT token is unsupported: {}", e);
		} catch (IllegalArgumentException e) {
			LOGGER.error("JWT claims string is empty: {}", e);
		}

		return false;
	}

	//@Value("${bezkoder.app.jwtSecret}") //@Value("${bezkoder.app.jwtSecret}")
	private static String jwtSecret = "e1996-secret-key";


}
