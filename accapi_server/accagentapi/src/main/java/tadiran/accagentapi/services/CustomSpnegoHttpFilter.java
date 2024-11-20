/** 
 * Copyright (C) 2009 "Darwin V. Felix" <darwinfelix@users.sourceforge.net>
 * 
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * 
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 */

package tadiran.accagentapi.services;

import net.sourceforge.spnego.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Properties;

//import redsea.conf.Constants.BaseBeans;
//import redsea.conf.forms.view.bean.ApplicationBean;
//import redsea.conf.forms.view.bean.SessionBean;
//import redsea.utils.StrUtils;

public final class CustomSpnegoHttpFilter implements Filter {
	
    final static Logger LOGGER = LogManager.getLogger("CustomSpnegoHttpFilter");


    public 	CustomSpnegoHttpFilter(){
		LOGGER.info("constructor CustomSpnegoHttpFilter");
	}
	public boolean init_fail = true;
    /** Object for performing Basic and SPNEGO authentication. */
    private transient SpnegoAuthenticator authenticator;
    
    /** Object for performing User Authorization. */
    private transient UserAccessControl accessControl;
    
    /** AuthZ required for every page. */
    private transient String sitewide;
    
    /** directories which should not be authenticated irrespective of filter-mapping. */
    private final transient List<String> excludeDirs = new ArrayList<String>();

    // Aeonix additional fields
    private transient FilterConfig filterConfig;
	private transient boolean initialized;
    @Override
    public void init(final FilterConfig filterConfig) throws ServletException {
    	LOGGER.info("init CustomSpnegoHttpFilter");
    	this.filterConfig = filterConfig;
    	//if (AccApiConfig.IsSSO == false) return;
  	
        
    	try {
            // set some System properties
    		if (filterConfig == null)
    		{
    			LOGGER.error("SpnegoFilterConfig line 85 ==> filterConfig = null");
    			return;
    		}
            final SpnegoFilterConfig config = SpnegoFilterConfig.getInstance(filterConfig);
            //////this.excludeDirs.addAll(config.getExcludeDirs()); // spnego-r9.jar was patched to make getExcludeDirs visible
            
            
            // pre-authenticate
            this.authenticator = new SpnegoAuthenticator(config);
            LOGGER.info("server logged in. Realm=" + this.authenticator.getServerRealm() + "; ExcludeDirs=" + this.excludeDirs);
            // authorization
            final Properties props = CustomSpnegoHttpFilter.toProperties(filterConfig);
            Boolean b = props.getProperty("spnego.authz.class", "").isEmpty();
            LOGGER.info("spnego.authz.class isEmpty: " + b.toString() );
            if (!b) {
                props.put("spnego.server.realm", this.authenticator.getServerRealm());
                this.sitewide = props.getProperty("spnego.authz.sitewide", "").trim();
                this.sitewide = (this.sitewide.isEmpty()) ? null : this.sitewide;
                this.accessControl = (UserAccessControl) Class.forName(
                        props.getProperty("spnego.authz.class")).newInstance();
                this.accessControl.init(props);
                LOGGER.info("sitewide: " + this.sitewide);
            }
            LOGGER.info("end init CustomSpnegoHttpFilter = true");
            initialized = true;
            init_fail = false;
    	} catch (final Exception e) {
    		init_fail = true;
        	LOGGER.error(e, e);
             //throw new ServletException(e);
        }   
        /*
        } catch (final LoginException lex) {
        } catch (final GSSException gsse) {
        } catch (final PrivilegedActionException pae) {
        } catch (final FileNotFoundException fnfe) {
        } catch (final URISyntaxException uri) {
        } catch (InstantiationException iex) {
        } catch (IllegalAccessException iae) {
        } catch (ClassNotFoundException cnfe) {
        }*/
    }

    @Override
    public void destroy() {
    	LOGGER.error("destroy CustomSpnegoHttpFilter");
        this.sitewide = null;
        if (null != this.excludeDirs) {
            this.excludeDirs.clear();
        }
        if (null != this.accessControl) {
            this.accessControl.destroy();
            this.accessControl = null;
        }
        if (null != this.authenticator) {
            this.authenticator.dispose();
            this.authenticator = null;
        }
        this.filterConfig = null;
        this.initialized= false; 
    }

@Override


    public void doFilter(final ServletRequest request, final ServletResponse response
        , final FilterChain chain) throws IOException, ServletException {
        
        final HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpSession httpSession = httpRequest.getSession();
        if (filterConfig == null) { chain.doFilter(request, response);return;}
        if (!AccApiConfig.IsSSO)  
        {
        		LOGGER.info("CustomSpnegoHttpFilter do fliter - no SSO");
               	httpSession.setAttribute(Constants.SSO_CONFIRMED,false);
            	httpSession.setAttribute(Constants.SSO_LOGGED_IN_USERNAME, "");
            chain.doFilter(request, response);
            return;
        }
        if (!initialized) {
        	LOGGER.error("doFilter =>re!initialized  CustomSpnegoHttpFilter. Config: " + this.filterConfig);

        	init(this.filterConfig);
        }
        if (!initialized) {
           	httpSession.setAttribute(Constants.SSO_CONFIRMED,false);
        	httpSession.setAttribute(Constants.SSO_LOGGED_IN_USERNAME, "");
        	LOGGER.error("failed to initialize CustomSpnegoHttpFilter. Config: " + this.filterConfig);
            chain.doFilter(request, response);
            return;
        }
        // start SPNEGO client account authentication
        final SpnegoHttpServletResponse spnegoResponse = new SpnegoHttpServletResponse(
                (HttpServletResponse) response);
        
        // client/caller principal
        final SpnegoPrincipal principal;
        try {
            principal = this.authenticator.authenticate(httpRequest, spnegoResponse);
        } catch (Exception e) {
            LOGGER.error("HTTP Authorization Header=" + httpRequest.getHeader(Constants.AUTHZ_HEADER)+ "=> " + e.getMessage());
            httpSession.setAttribute(Constants.SSO_CONFIRMED,false);
        	httpSession.setAttribute(Constants.SSO_LOGGED_IN_USERNAME, "");
            chain.doFilter(request, response); // continue with api request
            return;
           	//request.getRequestDispatcher("/rs/error/pageNotAuthorized.jsf").forward(request, response);
        }

        // context/auth loop not yet complete
        if (spnegoResponse.isStatusSet()) {
            return;
        }
        String p = getPrincipalName(principal); 
        LOGGER.info("SSO principal=" + principal + ", " + p);
        if (null != principal) {
        	httpSession.setAttribute(Constants.SSO_LOGGED_IN_USERNAME, p);
        	httpSession.setAttribute(Constants.SSO_CONFIRMED,true);
        }
        else
        {
           	httpSession.setAttribute(Constants.SSO_LOGGED_IN_USERNAME, "");
        	httpSession.setAttribute(Constants.SSO_CONFIRMED,false);
        }
        	
        chain.doFilter(request, response);
    }
    
    private String getPrincipalName(SpnegoPrincipal principal)
	{
		String principalName = WStrUtils.getString(principal.getName());
//		int pos = principalName.indexOf(PrincipalName.NAME_REALM_SEPARATOR_STR);
//		if (pos != -1) {
//			principalName = principalName.substring(0, pos);
//		}
//		pos = principalName.indexOf(PrincipalName.NAME_COMPONENT_SEPARATOR_STR );
//		if (pos != -1) {
//			principalName = principalName.substring(0, pos);
//		}
/*		
	 	Properties policies = new Properties();
        policies.load(new FileInputStream("C:/spnego-examples/spnego.policy"));
        
        UserAccessControl accessControl = new LdapAccessControl();
        accessControl.init(policies);

		System.out.println("UserInfo");
		
		UserInfo userInfo = accessControl.getUserInfo(principalName);
		
		System.out.println("true=" + userInfo.hasInfo("department"));
		System.out.println("IT=" + userInfo.getInfo("department").get(0));

		for (String name : userInfo.getInfo("displayName")) {
			System.out.println(name);
		}			
		for (String group : userInfo.getInfo("memberOf")) {
			System.out.println(group);
		}
		accessControl.destroy();
*/
		
		return principalName;
	}

//	private boolean alreadyAuthenticated(HttpSession httpSession)
//	{
//		return (httpSession.getAttribute(Constants.SSO_CONFIRMED) == "true"); 
//	}

	/*private boolean isAuthorized(final HttpServletRequest request) {
        if (null != this.sitewide && null != this.accessControl
                && !this.accessControl.hasAccess(request.getRemoteUser(), this.sitewide)) {
            return false;
        }

        return true;
    }*/
    
// 	private boolean exclude(final String contextPath, final String servletPath) {
//        // each item in excludeDirs ends with a slash
//        final String path = contextPath + servletPath + (servletPath.endsWith("/") ? "" : "/");
//        
//        for (String dir : this.excludeDirs) {
//            if (path.startsWith(dir)) {
//                return true;
//            }
//        }
//        
//        return false;
//    }
 
	
	public static boolean isSsoLogout(HttpSession httpSession)
	{
		Object attr = httpSession.getAttribute(Constants.SSO_LOGGED_IN_USERNAME);
		if (attr != null)
		{
			return Boolean.valueOf(attr.toString());
		}
		return false;
	}
	

	public static void setSsoLogout(HttpSession httpSession, boolean enable)
	{
		if (AccApiConfig.IsSSO)
		{
			// disable SSO in order to allow standard Aeonix login
			httpSession.setAttribute(Constants.SSO_LOGOUT, enable);
		}
	}	
	
    private static Properties toProperties(final FilterConfig filterConfig) {
        final Properties props = new Properties();
        final Enumeration<String> it = filterConfig.getInitParameterNames();
        
        while (it.hasMoreElements()) {
            final String key = it.nextElement();
            props.put(key, filterConfig.getInitParameter(key));
        }
        
        return props;
    }
    
    /**
     * Defines constants and parameter names that are used in the  
     * web.xml file, and HTTP request headers, etc.
     * 
     * <p>
     * This class is primarily used internally or by implementers of 
     * custom http clients and by {@link SpnegoFilterConfig}.
     * </p>
     * 
     */
    public static final class Constants {

        private Constants() {
            // default private
        }
        
        /** 
         * Servlet init param name in web.xml <b>spnego.allow.basic</b>.
         * 
         * <p>Set this value to <code>true</code> in web.xml if the filter 
         * should allow Basic Authentication.</p>
         * 
         * <p>It is recommended that you only allow Basic Authentication 
         * if you have clients that cannot perform Kerberos authentication. 
         * Also, you should consider requiring SSL/TLS by setting 
         * <code>spnego.allow.unsecure.basic</code> to <code>false</code>.</p>
         */
        public static final String ALLOW_BASIC = "spnego.allow.basic";

        /**
         * Servlet init param name in web.xml <b>spnego.allow.delegation</b>.
         * 
         * <p>Set this value to <code>true</code> if server should support 
         * credential delegation requests.</p>
         * 
         * <p>Take a look at the {@link DelegateServletRequest} for more 
         * information about other pre-requisites.</p>
         */
        public static final String ALLOW_DELEGATION = "spnego.allow.delegation";
        
        /**
         * Servlet init param name in web.xml <b>spnego.allow.localhost</b>.
         * 
         * <p>Flag to indicate if requests coming from http://localhost 
         * or http://127.0.0.1 should not be authenticated using 
         * Kerberos.</p>
         * 
         * <p>This feature helps to obviate the requirement of 
         * creating an SPN for developer machines.</p>
         * 
         */
        public static final String ALLOW_LOCALHOST = "spnego.allow.localhost";
        
        /** 
         * Servlet init param name in web.xml <b>spnego.allow.unsecure.basic</b>.
         * 
         * <p>Set this value to <code>false</code> in web.xml if the filter 
         * should reject connections that do not use SSL/TLS.</p>
         */
        public static final String ALLOW_UNSEC_BASIC = "spnego.allow.unsecure.basic";
        
        /** 
         * HTTP Response Header <b>WWW-Authenticate</b>. 
         * 
         * <p>The filter will respond with this header with a value of "Basic" 
         * and/or "Negotiate" (based on web.xml file).</p>
         */
        public static final String AUTHN_HEADER = "WWW-Authenticate";
        
        /** 
         * HTTP Request Header <b>Authorization</b>. 
         * 
         * <p>Clients should send this header where the value is the 
         * authentication token(s).</p>
         */
        public static final String AUTHZ_HEADER = "Authorization";
        
        /** 
         * HTTP Response Header <b>Basic</b>. 
         * 
         * <p>The filter will set this as the value for the "WWW-Authenticate" 
         * header if "Basic" auth is allowed (based on web.xml file).</p>
         */
        public static final String BASIC_HEADER = "Basic";
        
        /** 
         * Servlet init param name in web.xm)l <b>spnego.login.client.module</b>. 
         * 
         * <p>The LoginModule name that exists in the login.conf file.</p>
         */
        public static final String CLIENT_MODULE = "spnego.login.client.module";

        /** 
         * HTTP Request Header <b>Content-Type</b>. 
         * 
         */
        public static final String CONTENT_TYPE = "Content-Type";
        
        /** 
         * Servlet init param name in web.xml <b>spnego.exclude.dirs</b>.
         * 
         * <p>
         * A List of URL paths, starting at the context root, 
         * that should NOT undergo authentication (authN). 
         * </p>
         */
        public static final String EXCLUDE_DIRS = "spnego.exclude.dirs";
        
        /** 
         * Servlet init param name in web.xml <b>spnego.krb5.conf</b>. 
         * 
         * <p>The location of the krb5.conf file. On Windows, this file will 
         * sometimes be named krb5.ini and reside <code>%WINDOWS_ROOT%/krb5.ini</code> 
         * here.</p>
         * 
         * <p>By default, Java looks for the file in these locations and order:
         * <li>System Property (java.security.krb5.conf)</li>
         * <li>%JAVA_HOME%/lib/security/krb5.conf</li>
         * <li>%WINDOWS_ROOT%/krb5.ini</li>
         * </p>
         */
        public static final String KRB5_CONF = "spnego.krb5.conf";
        
        /**
         * Specify logging level.

         * <pre>
         * 1 = FINEST
         * 2 = FINER
         * 3 = FINE
         * 4 = CONFIG
         * 5 = INFO
         * 6 = WARNING
         * 7 = SEVERE
         * </pre>
         * 
         */
        static final String LOGGER_LEVEL = "spnego.logger.level";
        
        /**
         * Name of Spnego Logger.
         * 
         * <p>Example: <code>Logger.getLogger(Constants.LOGGER_NAME)</code></p>
         */
        static final String LOGGER_NAME = "SpnegoHttpFilter"; 
        
        /** 
         * Servlet init param name in web.xml <b>spnego.login.conf</b>. 
         * 
         * <p>The location of the login.conf file.</p>
         */
        public static final String LOGIN_CONF = "spnego.login.conf";
        
        /** 
         * HTTP Response Header <b>Negotiate</b>. 
         * 
         * <p>The filter will set this as the value for the "WWW-Authenticate" 
         * header. Note that the filter may also add another header with 
         * a value of "Basic" (if allowed by the web.xml file).</p>
         */
        public static final String NEGOTIATE_HEADER = "Negotiate";
        
        /**
         * NTLM base64-encoded token start value.
         */
        static final String NTLM_PROLOG = "TlRMTVNT";
        
        /** 
         * Servlet init param name in web.xml <b>spnego.preauth.password</b>. 
         * 
         * <p>Network Domain password. For Windows, this is sometimes known 
         * as the Windows NT password.</p>
         */
        public static final String PREAUTH_PASSWORD = "spnego.preauth.password";
        
        /** 
         * Servlet init param name in web.xml <b>spnego.preauth.username</b>. 
         * 
         * <p>Network Domain username. For Windows, this is sometimes known 
         * as the Windows NT username.</p>
         */
        public static final String PREAUTH_USERNAME = "spnego.preauth.username";
        
        /**
         * If server receives an NTLM token, the filter will return with a 401 
         * and with Basic as the only option (no Negotiate) <b>spnego.prompt.ntlm</b>. 
         */
        public static final String PROMPT_NTLM = "spnego.prompt.ntlm";
        
        /** 
         * Servlet init param name in web.xml <b>spnego.login.server.module</b>. 
         * 
         * <p>The LoginModule name that exists in the login.conf file.</p>
         */
        public static final String SERVER_MODULE = "spnego.login.server.module";
        
        /** 
         * HTTP Request Header <b>SOAPAction</b>. 
         * 
         */
	    public static final String SSO_CONFIRMED           			= "SSO_CONFIRMED";
		public static final String SSO_TIMESTAMP           			= "SSO_TIMESTAMP"; 
	    public static final String SSO_LOGGED_IN_USERNAME           = "SSO_LOGGED_IN_USERNAME";
		public static final String SSO_LOGOUT           		    = "SSO_LOGOUT";
		public static final int SSO_MAX_INACTIVE_INTERVAL           = 3600; // 60 minutes        
    }
}
