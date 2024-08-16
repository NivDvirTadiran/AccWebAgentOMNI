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



import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

import {MainPage} from './AccAgent/main/main.page';
import {AccLogonComponent} from './AccAgent/acc-logon/acc-logon.component';
import { TelephonyComponent } from './AccAgent/telephony/telephony.component';


import {AccAgentService} from './AccAgent/acc-agent.service';
import { AccCallProfileComponent } from './AccAgent/acc-call-profile/acc-call-profile.component';
import {OpenCalls} from './AccAgent/Grids/OpenCalls';
import {CallsLog} from './AccAgent/Grids/CallsLog';
import {AcdQCalls} from './AccAgent/Grids/AcdQCalls';
import {PhoneBook} from './AccAgent/phonebook/phonebook'
import {CoreApiService} from './AccAgent/genericRequest';
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


import Background1Component from "src/stories/pages/background1/background1Component";
import ChatComponent from "../stories/pages/chat/chat.component";
import {ExtendedModule} from "@angular/flex-layout";
import {PopoverDirective} from "../stories/directive/bubble-avatar/popover.directive";
import {ActionAvatarComponent} from "../stories/actions/action-avatar/action-avatar.component";
import {HighlightDirective} from "../stories/directive/custom-directive/Highlight.directive";
import {BubbleAvatarComponent} from "../stories/directive/bubble-avatar/bubble-avatar.component";
import {DynamicCompDirective} from "../stories/directive/dynamic-comp.directive";
import { StatusBoardComponent } from './AccAgent/main/status-board/status-board.component';
import { ButtonsBoardComponent } from './AccAgent/main/buttons-board/buttons-board.component';
import { IntroComponent } from './intro/intro.component';
import {ActionWindowsMenuComponent} from "../stories/actions/action-windows-menu/action-windows-menu.component";
import {MenuPopoverDirective} from "../stories/directive/bubble-windows-menu/menu-popover.directive";
import {BubbleWindowsMenuComponent} from "../stories/directive/bubble-windows-menu/bubble-windows-menu.component";
import {SseComponent} from "./AccAgent/sse/sse.component";


@NgModule({
    imports: [
        MaterialModule,
        BrowserModule,
        CommonModule,
        AngularDraggableModule,
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
        MDBBootstrapModulesPro.forRoot(),


        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        CdkTableModule,
        DragDropModule,

        CoreModule,
        AppRoutingModule, ExtendedModule,

    ],
    declarations: [
        Error404Component,
        AppComponent,
        MainPage,
        IntroComponent,
        StatusBoardComponent,
        AccLogonComponent,
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
        SseComponent,
        Background1Component, ChatComponent, MenuPopoverDirective, PopoverDirective, ActionAvatarComponent, ActionWindowsMenuComponent,
        HighlightDirective, BubbleAvatarComponent, BubbleWindowsMenuComponent, DynamicCompDirective, StatusBoardComponent, ButtonsBoardComponent, IntroComponent/*PopoverMdbDropdownDirective, DynamicCompDirective, */
    ],
  providers: [
    {provide: APP_CONFIG, useValue: AppConfig},
     HttpClient,
    //Sse,
    //AccNotificationService,
    AccAgentService,
    CoreApiService,
    AccCallProfileComponent,
    MDBSpinningPreloader,
    authInterceptorProviders
  ],

  bootstrap: [AppComponent]
})

export class AppModule {
}
