import {InjectionToken} from '@angular/core';

import {IAppConfig} from './iapp.config';
import {AccAgentService} from '../AccAgent/acc-agent.service';

export let APP_CONFIG = new InjectionToken('app.config');
//export const accAgentService = new AccAgentService();
export const AppConfig: IAppConfig = {
  routes: {
    heroes: 'heroes',
    error404: '404',
    agentlogon: 'AgentLogon'
  },
  endpoints: {
    heroes: 'https://nodejs-example-app.herokuapp.com/heroes',
    accWS: 'http://localhost://blabla/',
    accBaseP:  '/accagentapi',
    accLoginP: '/agentlogin',
    accLoginPJWT: '/agentlogingate',
    accRequestP: '/agentrequest',
    accNotificationP: '/accnotification',
    SSORequestP: '/accssoenable',
    accSse:  '/accagentapi/sse',
    accSseSubscribeP:  '/accagentapi/ssesubscribe',
    accWSPort: '8445'  
    //accWSPort: '8443'
  },
  keys: {
    TOKEN_KEY: 'token',
    REFRESHTOKEN_KEY: 'auth-refreshtoken',
    USER_KEY: 'user',
    SIGNOUT_MARK: 'user-logout',
    SESSION_ID: 'session-id'
  },
  sessionId: '',
  votesLimit: 3,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/Ismaestro/angular5-example-app'
};
