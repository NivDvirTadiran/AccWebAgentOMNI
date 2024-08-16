import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPage} from './AccAgent/main/main.page';
import { AccCallProfileComponent } from './AccAgent/acc-call-profile/acc-call-profile.component';
import {OpenCalls} from './AccAgent/Grids/OpenCalls';
import {CallsLog} from './AccAgent/Grids/CallsLog';
import {AcdQCalls} from './AccAgent/Grids/AcdQCalls';
import {TelephonyComponent} from './AccAgent/telephony/telephony.component';
import {AppConfig} from './config/app.config';
import {AccSetupComponent} from './AccAgent/acc-setup/acc-setup.component';

import {Error404Component} from './core/error404/error-404.component';
import {AccLogonComponent} from './AccAgent/acc-logon/acc-logon.component';
import {IsAeonixAppCenterOnResolver} from "./is-aeonix-app-center-on.resolver";
//import {AccOverlay} from './AccAgent/overlay/overlay';
const routes: Routes = [
  //{path: '', redirectTo: '/', pathMatch: 'prefix'},
  {path: '', component: AccLogonComponent/*, resolve: { bool: IsAeonixAppCenterOnResolver }*/},
  {path: 'AgentLogon',component: AccLogonComponent/*, resolve: { bool: IsAeonixAppCenterOnResolver }*/},
  {path: 'AccAgentPage',component: MainPage},
  {path: 'AccCallProfile',component: AccCallProfileComponent},
  //
  {path: 'OpenCalls',component: OpenCalls},
  {path: 'CallsLog',component: OpenCalls},
  {path: 'AcdQCalls',component: AcdQCalls},
  {path: 'Telephony',component: TelephonyComponent},
  {path: 'AccSetup',component: AccSetupComponent},
  //{path:  'AccOverlay', component: AccOverlay},
 
  //
  {path: AppConfig.routes.agentlogon,component: AccLogonComponent},
  {path: 'NotSSOUser', component: Error404Component},

  // otherwise redirect to 404
  {path: '**', redirectTo: '/' + AppConfig.routes.error404}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
