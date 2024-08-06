import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Meta, Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {AppConfig} from './config/app.config';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./_helpers/auth.service";
import {TokenStorageService} from "./_helpers/token-storage.service";
import {AccAgentService} from "./AccAgent/acc-agent.service";
import {SseComponent} from "./AccAgent/sse/sse.component";
//import {LocalStorage} from 'ngx-store';

declare const Modernizr;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  //@LocalStorage() language = 'en';
  isOnline: boolean;
  //public sessionId: string = null;
  @ViewChild('sse') sse: SseComponent;


  constructor(private translateService: TranslateService,
              public AAC: AccAgentService,
              private title: Title,
              private meta: Meta,
              private snackBar: MatSnackBar,
              private router: Router,
              private http: HttpClient,
              public tokenService: TokenStorageService,
              public  authService: AuthService) {
    this.isOnline = navigator.onLine;
    //this.sessionId = AAC.GetSessionId();
  }

  //=============================================
  ngOnDestroy() {
   // alert(`I'm leaving the app!`);
}
  //=============================================

  ngOnInit() {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    this.title.setTitle('AccOMNI App');

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        console.log("NavigationEnd: " + event.urlAfterRedirects);
        switch (event.urlAfterRedirects) {
          case '/':
            this.meta.updateTag({
              name: 'description',
              content: 'ACC OMNI-CHANALE app with Angular CLI, Angular Material and more'
            });
            break;
          case '/' + AppConfig.routes.heroes:
            this.title.setTitle('Heroes list');
            this.meta.updateTag({
              name: 'description',
              content: 'List of super-heroes'
            });
            break;
        }
      }
    });

    this.checkBrowserFeatures();
  }

  checkBrowserFeatures() {
    let supported = true;
    for (const feature in Modernizr) {
      if (Modernizr.hasOwnProperty(feature) &&
        typeof Modernizr[feature] === 'boolean' && Modernizr[feature] === false) {
        supported = false;
        break;
      }
    }

    if (!supported) {
      this.translateService.get(['updateBrowser']).subscribe((texts) => {
        this.snackBar.open(texts['updateBrowser'], 'OK');
      });
    }

    return supported;
  }
}
