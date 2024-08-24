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
import {IntroComponent} from "../intro/intro.component";
import {TelephoneTestComponent} from "../top-bar/telephone-test/telephone-test.component";
import {SearchBarComponent} from "../top-bar/search-bar/search-bar.component";
import {IconLarge17Component} from "../icons/icon-large-17/icon-large-17.component";
import {SedButtonComponent} from "../top-bar/sed-button/sed-button.component";
import {IconSmall30Component} from "../icons/icon-small-30/icon-small-30.component";
import {IconSmall10Component} from "../icons/icon-small-10/icon-small-10.component";
import {ButtonComponent} from "../buttons/button/button.component";
import {IconSmall33Component} from "../icons/icon-small-33/icon-small-33.component";
import {IconSmall11Component} from "../icons/icon-small-11/icon-small-11.component";
import {IconSmall12Component} from "../icons/icon-small-12/icon-small-12.component";
import {IconRecordComponent} from "../top-bar/icon-record/icon-record.component";
import {TopBarComponent} from "../top-bar/top-bar.component";
import {IconLarge30Component} from "../icons/icon-large-30/icon-large-30.component";
import {SearchOptionComponent} from "../top-bar/search-option/search-option.component";
import {IconSmall7Component} from "../icons/icon-small-7/icon-small-7.component";
import {IconSmall16Component} from "../icons/icon-small-16/icon-small-16.component";
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
import {MainDeskComponent} from "../main-desk/main-desk.component";
import {CallBarComponent} from "../main-desk/call-bar/call-bar.component";
import {ChatMdComponent} from "../main-desk/chat/chat-md.component";
import {TypingBarReplyComponent} from "../main-desk/typing-bar-reply/typing-bar-reply.component";
import {StatusLabelComponent} from "../main-desk/status-label/status-label.component";
import {IconLarge11MdComponent} from "../icons/icon-large-11/icon-large11-md.component";
import {IconSmall8MdComponent} from "../icons/icon-small-8/icon-small8-md.component";
import {IconPage2MdComponent} from "../icons/icon-page-2/icon-page2-md.component";
import {IconLarge10MdComponent} from "../icons/icon-large-10/icon-large10-md.component";
import {IconLarge1MdComponent} from "../icons/icon-large-1/icon-large1-md.component";
import {ChatBubbleComponent} from "../main-desk/chat-bubble/chat-bubble.component";
import {TypeBarComponent} from "../main-desk/type-bar/type-bar.component";
import {IconLarge9MdComponent} from "../icons/icon-large-9/icon-large9-md.component";
import {IconLarge7MdComponent} from "../icons/icon-large-7/icon-large7-md.component";
import {IconSmall32Component} from "../icons/icon-small-32/icon-small-32.component";
import {IconLarge6MdComponent} from "../icons/icon-large6-md/icon-large6-md.component";
import {IconSmall6Component} from "../icons/icon-small-6/icon-small-6.component";
import {IconLarge20MdComponent} from "../icons/icon-large-20/icon-large20-md.component";
import {Frame136Component} from "../frames/frame-136/frame-136.component";
import {IconLargeT5MdComponent} from "../icons/icon-large-t-5/icon-large-t5-md.component";
import {SideMenuIconLarge38Component} from "../icons/side-menu-icon-large-38/side-menu-icon-large-38.component";
import {IconLarge4MdComponent} from "../icons/icon-large-4/icon-large4-md.component";
import {IconPage7MdComponent} from "../icons/icon-page-7/icon-page7-md.component";
import {IconLarge2MdComponent} from "../icons/icon-large-2/icon-large2-md.component";
import {SystemMessengeComponent} from "../main-desk/system-messenge/system-messenge.component";
import {IconLarge13MdComponent} from "../icons/icon-large-13/icon-large13-md.component";
import {Frame465Component} from "../frames/frame-465/frame-465.component";
import {SideMenuComponent} from "../right-bar/export-result/side-menu/side-menu.component";
import {ProfileBarComponent} from "../right-bar/export-result/profile-bar/profile-bar.component";
import {MenulistComponent} from "../right-bar/export-result/menulist/menulist.component";
import {MenuSectionComponent} from "../right-bar/export-result/menu-section/menu-section.component";
import {FoldMenuComponent} from "../right-bar/export-result/fold-menu/fold-menu.component";
import {IconArrowsComponent} from "../right-bar/export-result/icon-arrows/icon-arrows.component";
import {IconStatusComponent} from "../right-bar/export-result/icon-status/icon-status.component";
import {IconSmall5Component} from "../right-bar/export-result/icon-small-5/icon-small-5.component";
import {IconPage6Component} from "../right-bar/export-result/icon-page-6/icon-page-6.component";
import {CallListComponent} from "../call-list/call-list.component";
import {Frame460Component} from "../call-list/export-result/frame-460/frame-460.component";
import {CallsBarComponent} from "../call-bar/calls-bar.component";
import {CallItemComponent} from "../call-list/export-result/call-item/call-item.component";
import {CallsFilterComponent} from "../call-list/export-result/calls-filter/calls-filter.component";
import {
    DropDownSwitcherComponent
} from "../call-list/export-result/calls-filter/export-result/drop-down-switcher/drop-down-switcher.component";
import {IconSmallNoteComponent} from "../icons/icon-small-note/icon-small-note.component";
//import {IconSmallEndComponent} from "../icons/icon-small-end/icon-small-end.component";











@NgModule({
    declarations: [
        Background1Component, ButtonExComponent, ButtonComponent,
        MenuPopoverDirective, PopoverDirective,
        ActionAvatarComponent, ActionWindowsMenuComponent,
        HighlightDirective,
        BubbleAvatarComponent, BubbleWindowsMenuComponent, DynamicCompDirective,
        IntroComponent,
        IconLarge17Component, SedButtonComponent, IconSmall30Component, IconSmall10Component, IconSmall33Component,
        IconSmall11Component, IconSmall12Component, IconRecordComponent, IconLarge30Component, SearchOptionComponent,
        IconSmall7Component, IconSmall16Component, IconSmall6Component,
        TopBarComponent, TelephoneTestComponent, SearchBarComponent,
        ChatComponent,
        SideMenuComponent,


        MainDeskComponent, CallBarComponent, ChatMdComponent, TypingBarReplyComponent,
        ButtonComponent, StatusLabelComponent, IconLarge11MdComponent, IconSmall8MdComponent, IconPage2MdComponent,
        ChatBubbleComponent, SystemMessengeComponent, SideMenuIconLarge38Component, IconLarge10MdComponent, IconLarge4MdComponent,
        IconLarge1MdComponent, IconLarge2MdComponent, IconLargeT5MdComponent,
        IconLarge13MdComponent, IconPage7MdComponent, IconSmall32Component, IconLarge20MdComponent,
        TypeBarComponent, IconLarge9MdComponent, IconLarge7MdComponent, IconLarge6MdComponent, IconSmall6Component,
        /*MenulistComponent, MenuSectionComponent, FoldMenuComponent,*/ IconArrowsComponent,
        //IconStatusComponent, IconSmall5Component, IconPage6Component, ProfileBarComponent,

        Frame136Component, Frame465Component, ProfileBarComponent, MenulistComponent, FoldMenuComponent, CallListComponent,
        Frame460Component, CallsBarComponent, CallItemComponent, CallsFilterComponent, DropDownSwitcherComponent, IconSmallNoteComponent,
    ],
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,

        MatTabsModule, MatIconModule, MatButtonModule, MatExpansionModule, MatInputModule, MatCheckboxModule,
        MatTableModule, MatToolbarModule, MatSelectModule, MatRadioModule, MatPaginatorModule, MatSlideToggleModule,
        MatSnackBarModule, MatFormFieldModule, MatSortModule, MatMenuModule,

        InputsModule, MDBRootModule,
        MdbCarouselModule, MdbCheckboxModule, MdbCollapseModule, MdbDropdownModule, MdbFormsModule,
        MdbModalModule, MdbPopoverModule, MdbRadioModule, MdbRangeModule, MdbRippleModule, MdbScrollspyModule,
        MdbTabsModule, MdbTooltipModule, MdbValidationModule, MenuSectionComponent,
    ],
  providers: [
  ],
    exports: [
        Background1Component, ButtonExComponent, ButtonComponent,
        MenuPopoverDirective, PopoverDirective,
        ActionAvatarComponent, ActionWindowsMenuComponent,
        HighlightDirective,
        BubbleAvatarComponent, BubbleWindowsMenuComponent, DynamicCompDirective,
        IntroComponent,
        IconLarge17Component, SedButtonComponent, IconSmall30Component, IconSmall10Component, IconSmall33Component,
        IconSmall11Component, IconSmall12Component, IconRecordComponent, IconLarge30Component, SearchOptionComponent,
        IconSmall7Component, IconSmall16Component, IconSmall6Component,
        TopBarComponent, TelephoneTestComponent, SearchBarComponent,// ProfileBarComponent,
        ChatComponent, MainDeskComponent, Frame465Component, SideMenuComponent, CallListComponent,// SideMenuComponent, Frame465Component, MenulistComponent

        IconArrowsComponent,
        Frame460Component, CallBarComponent, CallsBarComponent, CallItemComponent, CallsFilterComponent
    ],
  bootstrap: [ ]
})
export class StorybookModule { }
