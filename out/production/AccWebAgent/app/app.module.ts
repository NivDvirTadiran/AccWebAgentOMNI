import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';
import {CommonModule} from '@angular/common';
import { AngularDraggableModule } from 'angular2-draggable';
import {APP_CONFIG, AppConfig} from './config/app.config';
import {MaterialModule} from './shared/modules/material.module';

import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/modules/shared.module';
import {CoreModule} from './core/core.module';
import {Error404Component} from './core/error404/error-404.component'

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from './app.translate.factory';
import { Observable,of,timer,Subscription } from 'rxjs';
import {ProgressBarService} from './core/shared/progress-bar.service';
import {ProgressInterceptor} from './shared/interceptors/progress.interceptor';
import {TimingInterceptor} from './shared/interceptors/timing.interceptor';


import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ContextMenuModule} from 'primeng/contextmenu';

         import {MatToolbarModule} from  '@angular/material/toolbar';        
        // import {MatSidenavModule,MatSidenavContent,MatSidenav} from  '@angular/material/sidenav';        
         import {MatRadioModule} from  '@angular/material/radio';        
         import {MatIconModule} from  '@angular/material/icon';        
         import {MatButtonModule} from  '@angular/material/button';        
         import {MatTabsModule} from  '@angular/material/tabs';        
         import {MatExpansionModule} from  '@angular/material/expansion';        
         import {MatInputModule} from  '@angular/material/input';        
         import {MatTableModule} from  '@angular/material/table';        
         import {MatSnackBarModule} from  '@angular/material/snack-bar';        
         import {MatFormFieldModule} from  '@angular/material/form-field';        
         import {MatSelectModule} from  '@angular/material/select';        
         import {MatCheckboxModule} from  '@angular/material/checkbox';        
         import {MatPaginatorModule} from  '@angular/material/paginator';        
         import {MatSortModule} from  '@angular/material/sort';        
         import { MatSlideToggleModule } from '@angular/material/slide-toggle';
         import { MatMenu,MatMenuModule } from '@angular/material/menu';
import { CdkTableModule} from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';

//const customKeyboardLayouts: IKeyboardLayouts = keyboardLayouts;
// import {MatToolbarModule, MatSidenavModule,MatSidenavContent,MatSidenav,
//   MatRadioModule,MatIconModule,MatButtonModule,MatTabsModule,
//   MatExpansionModule,MatInputModule,MatTableModule,
//   MatSnackBarModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule,
//    MatPaginatorModule, MatSortModule} from '@angular/material';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';


import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

import {AccAgentPage} from './AccAgent/AccAgent.page';
import {accLogonComponent} from './AccAgent/acclogon.component';
import { TelephonyComponent } from './AccAgent/telephony/telephony.component';



//import {Sse} from './AccAgent/Sse';
//import {AccNotificationService } from './AccAgent/sse/AccNotification.service';
//import {SseService } from './AccAgent/sse/sse.service';

import {AccAgentService} from './AccAgent/acc-agent.service';
import { AccCallProfileComponent } from './AccAgent/acc-call-profile/acc-call-profile.component';
import {OpenCalls} from './AccAgent/Grids/OpenCalls';
import {CallsLog} from './AccAgent/Grids/CallsLog';
import {AcdQCalls} from './AccAgent/Grids/AcdQCalls';
import {PhoneBook} from './AccAgent/phonebook/phonebook'
//import {AccOverlay,RotiniPanel,SpagettiPanel} from './AccAgent/overlay/overlay';
import {CoreApiService} from './AccAgent/genericRequest';
//import {SidebarComponent} from './core/DynamicSideBar/Sidebar.component';
//import {DropdownModule} from "ngx-dropdown";
import {KeybComponent} from './AccAgent/keyboard/keyb.component'
import { TelWinBtnComponent } from './AccAgent/tel-win-btn/tel-win-btn.component';
import { AccSetupComponent } from './AccAgent/acc-setup/acc-setup.component';
import {ScrollContainerComponent  } from './AccAgent/scroll-container/scroll-container.component';
import {authInterceptorProviders} from "./_helpers/auth.interceptor";
import {MdbValidationModule} from "mdb-angular-ui-kit/validation";
import {MdbTooltipModule} from "mdb-angular-ui-kit/tooltip";
import {MdbTabsModule} from "mdb-angular-ui-kit/tabs";
import {MdbScrollspyModule} from "mdb-angular-ui-kit/scrollspy";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {MdbRangeModule} from "mdb-angular-ui-kit/range";
import {MdbRadioModule} from "mdb-angular-ui-kit/radio";
import {MdbPopoverModule} from "mdb-angular-ui-kit/popover";
import {MdbModalModule} from "mdb-angular-ui-kit/modal";
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import {MdbDropdownModule} from "mdb-angular-ui-kit/dropdown";
import {MdbCollapseModule} from "mdb-angular-ui-kit/collapse";
import {MdbCheckboxModule} from "mdb-angular-ui-kit/checkbox";
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {MdbAccordionModule} from "mdb-angular-ui-kit/accordion";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";

import {MDBBootstrapModulesPro, MDBSpinningPreloader} from 'ng-uikit-pro-standard';
//import {NavbarModule} from 'angular-bootstrap-md';

//import { NgVirtualKeyboardModule } from '@protacon/ng-virtual-keyboard';
//import {SidenavModeExample} from './AccAgent/sidenav-mode-example';
//import {OverlayModule} from '@angular/cdk/overlay';

import Background1Component from "src/stories/pages/background1/background1Component";
import ChatComponent from "../stories/pages/chat/chat.component";
import ChatStories from "../stories/pages/chat/chat.stories";
import {ExtendedModule} from "@angular/flex-layout";
import {PopoverDirective} from "../stories/directive/bubble-avatar/popover.directive";
import {ActionAvatarComponent} from "../stories/actions/action-avatar/action-avatar.component";
import {HighlightDirective} from "../stories/directive/custom-directive/Highlight.directive";
import {BubbleAvatarComponent} from "../stories/directive/bubble-avatar/bubble-avatar.component";
import {DynamicCompDirective} from "../stories/directive/dynamic-comp.directive";
//import {PopoverMdbDropdownDirective} from "../stories/directive/mdb-dropdown-copy/popover-mdb-dropdown.directive";
//import {DynamicCompDirective} from "../stories/directive/dynamic-comp.directive";

//

//

@NgModule({
    imports: [
        MaterialModule,
        BrowserModule,
        CommonModule,
        //OverlayModule,
        AngularDraggableModule,
        //DropdownModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        MatExpansionModule,
        MatInputModule,
        MatCheckboxModule,
        MatTableModule,
        MatToolbarModule,
        MatSelectModule,
        MatRadioModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatSnackBarModule, MatFormFieldModule,
        //MatKeyboardModule,
        MatSortModule,
        MatMenuModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        RadioButtonModule,
        ContextMenuModule,
        FileUploadModule,
        NgbDatepickerModule,
        //MdbAccordionModule,
        MdbCarouselModule,
        MdbCheckboxModule,
        MdbCollapseModule,
        MdbDropdownModule,
        MdbFormsModule,
        MdbModalModule,
        MdbPopoverModule,
        MdbRadioModule,
        MdbRangeModule,
        MdbRippleModule,
        MdbScrollspyModule,
        MdbTabsModule,
        MdbTooltipModule,
        MdbValidationModule,
        //NavbarModule,
        MDBBootstrapModulesPro.forRoot(),


        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        //SharedModule.forRoot(),
        CdkTableModule,
        DragDropModule,

        CoreModule,
        AppRoutingModule, ExtendedModule,

    ],
    declarations: [
        Error404Component,
        AppComponent,
        AccAgentPage,
        accLogonComponent,
        //ConfirmationDialog,
        KeybComponent,
        OpenCalls,
        CallsLog,
        AcdQCalls,
        AccCallProfileComponent,
        TelephonyComponent,
        TelWinBtnComponent,
        AccSetupComponent,
        ScrollContainerComponent,
        PhoneBook,
        Background1Component, ChatComponent, PopoverDirective, ActionAvatarComponent,
        HighlightDirective, BubbleAvatarComponent, DynamicCompDirective/*PopoverMdbDropdownDirective, DynamicCompDirective, */
    ],
  providers: [
    {provide: APP_CONFIG, useValue: AppConfig},
    //{provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true, deps: [ProgressBarService]},
     //{provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true},
     HttpClient,
     //{ provide: MAT_KEYBOARD_LAYOUTS, useValue: customKeyboardLayouts },
     //ConnectionBackend,
    //Sse,
    //AccNotificationService,
    AccAgentService,
    CoreApiService,
    AccCallProfileComponent,
    MDBSpinningPreloader,
    authInterceptorProviders
  ],
  // entryComponents: [
  //   RotiniPanel,
  //   SpagettiPanel,
  //   AccOverlay
  //  ],
  //entryComponents: [ConfirmationDialog],
  //entryComponents: [ConfirmationDialog],
  bootstrap: [AppComponent]
})

export class AppModule {
}
