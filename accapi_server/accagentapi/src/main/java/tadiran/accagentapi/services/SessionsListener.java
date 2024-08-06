package tadiran.accagentapi.services;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;//


/**
 * SessionsListener
 *
 * @author evgeniv
 */
public class SessionsListener implements HttpSessionListener
{
    private static final Logger log = LogManager.getLogger("SessionsListener");

    @Override
    public void sessionCreated (HttpSessionEvent se)
    {
        log.info("sessionCreated "  + se.getSession().getId());
        HttpSession session=se.getSession();
        session.setMaxInactiveInterval(45);
    }
    /* Session Invalidation Event */
    @Override
    public void sessionDestroyed (HttpSessionEvent se)
    {
        log.info("sessionDestroyed " + se.getSession().getId());
         HttpSession session=se.getSession();
        session.invalidate();
    }
}
