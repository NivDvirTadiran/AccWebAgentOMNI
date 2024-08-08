import { NgModule } from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import Background1Component from "../../stories/pages/background1/background1Component";

import ButtonExComponent from "../../stories/buttons/button-ex/button-ex.component";

import { DynamicCompDirective } from '../directive/dynamic-comp.directive';
import {PopoverDirective} from "../directive/bubble-avatar/popover.directive";
import { BubbleAvatarComponent } from '../directive/bubble-avatar/bubble-avatar.component';
import { ActionAvatarComponent } from '../actions/action-avatar/action-avatar.component';

import {MdbPopoverModule} from "mdb-angular-ui-kit/popover";

import {MatButtonModule} from "@angular/material/button";
import ChatComponent from "../pages/chat/chat.component";
import {MenuPopoverDirective} from "../directive/bubble-windows-menu/menu-popover.directive";
import {ActionWindowsMenuComponent} from "../actions/action-windows-menu/action-windows-menu.component";
import {HighlightDirective} from "../directive/custom-directive/Highlight.directive";
import {BubbleWindowsMenuComponent} from "../directive/bubble-windows-menu/bubble-windows-menu.component";
import {ButtonsBoardComponent} from "../../app/AccAgent/acc-agent-page/buttons-board/buttons-board.component";
import {IntroComponent} from "../intro/intro.component";
import {TelephoneTestComponent} from "../top-bar/telephone-test/telephone-test.component";
import {SearchBarComponent} from "../top-bar/search-bar/search-bar.component";
import {IconLarge17Component} from "../top-bar/icon-large-17/icon-large-17.component";
import {SedButtonComponent} from "../top-bar/sed-button/sed-button.component";
import {IconSmall30Component} from "../top-bar/icon-small-30/icon-small-30.component";
import {IconSmall10Component} from "../top-bar/icon-small-10/icon-small-10.component";
import {ButtonComponent} from "../top-bar/button/button.component";
import {IconSmall33Component} from "../top-bar/icon-small-33/icon-small-33.component";
import {IconSmall11Component} from "../top-bar/icon-small-11/icon-small-11.component";
import {IconSmall12Component} from "../top-bar/icon-small-12/icon-small-12.component";
import {IconRecordComponent} from "../top-bar/icon-record/icon-record.component";
import {TopBarComponent} from "../top-bar/top-bar.component";
import {IconLarge30Component} from "../top-bar/icon-large-30/icon-large-30.component";
import {SearchOptionComponent} from "../top-bar/search-option/search-option.component";
import {IconSmall7Component} from "../top-bar/icon-small-7/icon-small-7.component";
import {IconSmall16Component} from "../top-bar/icon-small-16/icon-small-16.component";
import {IconSmall6Component} from "../top-bar/icon-small-6/icon-small-6.component";
import {InputsModule, MDBBootstrapModulesPro} from "ng-uikit-pro-standard";
import {MdbScrollspyModule} from "mdb-angular-ui-kit/scrollspy";
import {MDBRootModule} from "angular-bootstrap-md";
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {MdbCheckboxModule} from "mdb-angular-ui-kit/checkbox";
import {MdbCollapseModule} from "mdb-angular-ui-kit/collapse";
import {MdbDropdownModule} from "mdb-angular-ui-kit/dropdown";
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import {MdbModalModule} from "mdb-angular-ui-kit/modal";
import {MdbRadioModule} from "mdb-angular-ui-kit/radio";
import {MdbRangeModule} from "mdb-angular-ui-kit/range";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {MdbTabsModule} from "mdb-angular-ui-kit/tabs";
import {MdbTooltipModule} from "mdb-angular-ui-kit/tooltip";
import {MdbValidationModule} from "mdb-angular-ui-kit/validation";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSortModule} from "@angular/material/sort";
import {MatMenuModule} from "@angular/material/menu";










@NgModule({
    declarations: [
        Background1Component, ButtonExComponent, ButtonComponent,
        MenuPopoverDirective, PopoverDirective,
        ActionAvatarComponent, ActionWindowsMenuComponent,
        HighlightDirective,
        BubbleAvatarComponent, BubbleWindowsMenuComponent, DynamicCompDirective,
        ButtonsBoardComponent, IntroComponent,
        IconLarge17Component, SedButtonComponent, IconSmall30Component, IconSmall10Component, IconSmall33Component,
        IconSmall11Component, IconSmall12Component, IconRecordComponent, IconLarge30Component, SearchOptionComponent,
        IconSmall7Component, IconSmall16Component, IconSmall6Component,
        TopBarComponent, TelephoneTestComponent, SearchBarComponent,
        ChatComponent,
    ],
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,

        MatTabsModule, MatIconModule, MatButtonModule, MatExpansionModule, MatInputModule, MatCheckboxModule,
        MatTableModule, MatToolbarModule, MatSelectModule, MatRadioModule, MatPaginatorModule, MatSlideToggleModule,
        MatSnackBarModule, MatFormFieldModule, MatSortModule, MatMenuModule,

        InputsModule, MDBRootModule,
        MdbCarouselModule, MdbCheckboxModule, MdbCollapseModule, MdbDropdownModule, MdbFormsModule,
        MdbModalModule, MdbPopoverModule, MdbRadioModule, MdbRangeModule, MdbRippleModule, MdbScrollspyModule,
        MdbTabsModule, MdbTooltipModule, MdbValidationModule,
    ],
  providers: [
  ],
  exports: [
      Background1Component, ButtonExComponent, ButtonComponent,
      MenuPopoverDirective, PopoverDirective,
      ActionAvatarComponent, ActionWindowsMenuComponent,
      HighlightDirective,
      BubbleAvatarComponent, BubbleWindowsMenuComponent, DynamicCompDirective,
      ButtonsBoardComponent, IntroComponent,
      IconLarge17Component, SedButtonComponent, IconSmall30Component, IconSmall10Component, IconSmall33Component,
      IconSmall11Component, IconSmall12Component, IconRecordComponent, IconLarge30Component, SearchOptionComponent,
      IconSmall7Component, IconSmall16Component, IconSmall6Component,
      TopBarComponent, TelephoneTestComponent, SearchBarComponent,
      ChatComponent,





  ],
  bootstrap: [ ]
})
export class StorybookModule { }
