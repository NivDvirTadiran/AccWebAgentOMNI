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

import {AccAgentPage} from './AccAgent/acc-agent-page/acc-agent-page.component';
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

import {InputsModule, MDBBootstrapModulesPro, MDBSpinningPreloader, SidenavModule} from 'ng-uikit-pro-standard';


import {ExtendedModule} from "@angular/flex-layout";
import { StatusBoardComponent } from './AccAgent/acc-agent-page/status-board/status-board.component';
import { ButtonsBoardComponent } from './AccAgent/acc-agent-page/buttons-board/buttons-board.component';
import {SseComponent} from "./AccAgent/sse/sse.component";
import {AccOmniPageComponent} from './AccOMNI/acc-omni-page/acc-omni-page.component';
import {StorybookModule} from "../stories/storybook/storybook.module";
import {MDBRootModule} from "ng-uikit-pro-standard";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {MainDeskComponent} from "./AccOMNI/acc-omni-page/main-desk/main-desk.component";
import {CallsBarComponent} from "./AccOMNI/acc-omni-page/calls-bar/calls-bar.component";


@NgModule({
    imports: [
        MaterialModule,
        BrowserModule,
        CommonModule,
        AngularDraggableModule,
        ServiceWorkerModule.register('/accOMNI/ngsw-worker.js', {enabled: environment.production}),
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule, MatIconModule, MatButtonModule, MatExpansionModule, MatInputModule, MatCheckboxModule,
        MatTableModule, MatToolbarModule, MatSelectModule, MatRadioModule, MatPaginatorModule, MatSlideToggleModule,
        MatSnackBarModule, MatFormFieldModule, MatSortModule, MatMenuModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        RadioButtonModule,
        ContextMenuModule,
        FileUploadModule,
        NgbDatepickerModule,
        InputsModule,


        MDBRootModule, MdbCarouselModule, MdbCheckboxModule, MdbCollapseModule, MdbDropdownModule,
        MdbModalModule, MdbPopoverModule, MdbRadioModule, MdbRangeModule, MdbRippleModule, MdbScrollspyModule,
        MdbTabsModule, MdbTooltipModule, MdbValidationModule, MdbAccordionModule, MdbFormsModule,
        StorybookModule,


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
        AppRoutingModule, ExtendedModule, SidenavModule,

    ],
    declarations: [
        Error404Component,
        AppComponent,
        AccAgentPage,
        AccOmniPageComponent,
        StatusBoardComponent, ButtonsBoardComponent,
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
        MainDeskComponent,
        CallsBarComponent
/*PopoverMdbDropdownDirective, DynamicCompDirective, */
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
    authInterceptorProviders,
    AppComponent,
  ],

  bootstrap: [AppComponent]
})

export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
