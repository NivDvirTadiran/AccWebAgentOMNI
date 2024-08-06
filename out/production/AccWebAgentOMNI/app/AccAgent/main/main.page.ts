import {NavigationEnd, Router, Event} from '@angular/router';
import {HostListener, Component, OnInit, OnDestroy, ViewContainerRef, AfterViewInit, Renderer2} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroup} from '@angular/forms';
import { ViewChild, NgModule } from '@angular/core';
import { AccAgentService } from '../acc-agent.service';
import { AccButtons, accbutton} from '../tel-win-btn/AccBtnsDef'
import { UserStatusModel,COS, oneTab, AccCallState, OneCall, Key_Desc, AgentStatus, CallTypes, CallTypesText,
    QUEUED_ACD_GROUP,barchart } from 'src/app/AccAgent/data-model.interface';
import { TranslateService } from '@ngx-translate/core';
import * as CanvasJS from 'src/assets/js/canvasjs-commercial-3.2.6/canvasjs.min.js';
import { SidenavComponent } from 'ng-uikit-pro-standard';
import decorateStory from "@storybook/angular/dist/ts3.9/client/preview/decorateStory";

import {BsDropdownDirective} from "ng-uikit-pro-standard/lib/free/dropdown/dropdown.directive";
import ChatComponent from "src/stories/pages/chat/chat.component";
import {PopoverOptions} from "src/stories/directive/popover.interface";
import {ActionWindowsMenuComponent} from "../../../stories/actions/action-windows-menu/action-windows-menu.component";
import {MenuPopoverDirective} from "../../../stories/directive/bubble-windows-menu/menu-popover.directive";
import {CalendarApi, DateRange, Dictionary, EventInput, EventInputTransformer,
    EventSource
} from "@fullcalendar/core";
import {Meta} from "@angular/platform-browser";
import {StatusBoardComponent} from "./status-board/status-board.component";
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import {AppConfig} from "../../config/app.config";
//import {SseComponent} from "../sse/sse.component";
import {TokenStorageService} from "../../_helpers/token-storage.service";
import {ButtonsBoardComponent} from "./buttons-board/buttons-board.component";
import {filter} from "rxjs/operators";



// -------------------------------------------------
const EmptyRsponse: OneCall = new OneCall("-1");

//=======================
export class Setup {
    public constructor(val: string, vv: string) {
        this.value = val;
        this.viewValue = vv;
    }

    value: string;
    viewValue: string;
}

export class SetupGroup {
    disabled?: boolean;
    name: string;
    setup: Setup[];

    public constructor(d: boolean, n: string) {
        this.disabled = d;
        this.name = n;
        this.setup = [];
    }
}

export class EventData {
    name: string;
    value: any;

    constructor(name: string, value: any) {
        this.name = name;
        this.value = value;
    }
}

@Component({
    selector: 'main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss']
})

export class MainPage implements OnInit, OnDestroy, AfterViewInit {
    popover: PopoverOptions = {
        content: ActionWindowsMenuComponent
    };

    public userStatus: UserStatusModel;// = new UserStatusModel();
    //panelOpenState: boolean = false;
    showEmailError = false;
    progressBarMode: string;
    enterPressObserver: any;
    footercol: number = 4;
    isTrash: boolean = false;
    showErrors: boolean = false;
    languageOptions: { id: any, val: any, disable?: boolean }[] = [{
        id: 1,
        val: 'English'
    }];
    accAgentForm = new FormGroup({
        username: new FormControl('Nancy'),
        exension: new FormControl('Drew'),
    });
    //@ViewChild('sidenav', { static: true}) sidenav: MatSidenav;
    @ViewChild('sidenav') public sidenav: SidenavComponent;

    @ViewChild('chat', {static: false}) chat?: ChatComponent;

    @ViewChild('dropdown') public dropdown: MenuPopoverDirective;

    @ViewChild('statusboard') statusBoard?: StatusBoardComponent;

    @ViewChild('buttonsboard') buttonsboard?: ButtonsBoardComponent;

    //@ViewChild('sse') sse: SseComponent;

    //@ViewChild('timer', { static: false }) ul?: ElementRef;
    //@ViewChild("multipleGroupSelect") multipleGroupSelect:MatSelect;

    public tiles: Array<accbutton> = [];
    public ACDList: Array<accbutton> = [];
    public TELList: Array<accbutton> = [];
    public about_color: boolean = true;

    // ==========================================[onResize]=====================================
    onResize(event) {
        this.AAC.onResize(event);
    }


    public receiveChatMes(message: string) {
        this.chat.addMessage(this.AAC.curentCall, message);
    }

    public sendChatMes(message: string) {
        //"1711554770,1002,updateagentmode,echat,,,3002,,,,-1,-1,0,,N"
        //let message = event.message;
        this.AAC.sendChatMes(message);
    }

/*
    replacePassFormDialogRef() {
        console.log('The replace password form dialog after opened');
        const focusTraps = document.getElementById('slide-out');
        if (focusTraps)
        focusTraps.setAttribute('style', '"color: black;"');
    });
*/
    // ==========================================[ngAfterViewInit]==============================
    ngAfterViewInit() {
        this.AAC.setaccForm(this);
        this.AAC.isMainPageReady = true;
        this.AAC.log("AccAgentPage=>ngAfterViewInit");
        this.sidenav.show();
        this.renderer.setStyle(this.sidenav.sideNav.nativeElement,'width','30rem');
        this.renderer.setStyle(this.sidenav.sideNav.nativeElement,'background-color','#F4F4F4');
        //this.renderer.setStyle(this.sidenav.sideNav.nativeElement,'background-image','accapi_client/src/assets/images/Aeonix_Logo.png');
        this.renderer.setStyle(this.sidenav.sideNav.nativeElement,'color','#07185A');

        Promise.resolve().then(() => {
            this.dropdown.popoverComponentRef?.instance.showPopup();
        });



    }
 // ]====================================================================
    // ]====================================================================
    // ]==============================[HostListener]========================

    @HostListener('window:unload', ['$event'])
    unloadHandler(event: Event) {
         this.AAC.ForceLogToServer('unloadHandler');
         this.PostCall('UnloadHander');
         setTimeout(function() {return false; }, 6);  
    }
    //------------------------------------------
    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHandler(event: Event) {
        this.AAC.ForceLogToServer('beforeUnloadHander');
        localStorage.setItem("beforeUnloadHander", new Date().toTimeString());
        //this.AAC.beforeUnloadHanderTimer();
        return true;
    }

    PostCall(note:string) {
        this.AAC.ForceLogToServer(note + '; PostCall: Agent Exit ' + location.href);
        this.AAC.saveCredintial();
        localStorage.setItem("AccWebAgentTop",window.screenTop.toString()); 
        localStorage.setItem("AccWebAgentLeft",window.screenLeft.toString()); 
        this.AAC.agentLogoff(false,true);
    }
    // ==========================================[ngOnInit] ====================================
    ngOnInit() {
        if (this.AAC.agent == null || this.AAC.agent.m_AgentNo == "") {
            //this.router.navigate(['AgentLogon'  + this.AAC.savedURLSearch]);
            this.router.navigateByUrl('/AgentLogon' + this.AAC.savedURLSearch);

             return;
        }
        this.AAC.windowwidth = window.screen.availWidth;
        if (this.AAC.windowwidth < 600) {
            this.AAC.screenWidth = this.AAC.windowwidth
        }
        this.AAC.windowheight = window.screen.availHeight;

        this.AAC.setAccAgentPage(this);
        this.prepTitle();

        //this.sidenav.toggle();
        this.pst_cols = [
            { field: 'group_name' , header: 'Group' },
            { field: 'totACD'     , header: 'Inbound' },
            { field: 'totACDTime' , header: 'Av. Time' },
            { field: 'totOACD'    , header: 'Outbound' },
            { field: 'totOACDTime', header: 'Av. Time' }
        ];
         this.pst_Qcols = [
            { field: 'group_name'  , header: 'Group' },
            { field: 'totQACD'     , header: 'Total' },
            { field: 'QAvgTime'    , header: 'Av. Time' },
            { field: 'QLongestTime', header: 'Longet time' }
         ];
        //this.imgcols = (window.innerWidth <= 240) ? 2 : 3;

        this.router.events
            .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
            .subscribe((event: Event) => {
                console.log('normal');
                this.AAC.ForceLogToServer('unloadHandler');
                this.PostCall('UnloadHander');
                setTimeout(function() {return false; }, 6);
            });
       
    }
    // ==========================================[ngOnDestroy] ====================================
    ngOnDestroy() {
        if (this.AAC.subscription1 != null) {
            this.AAC.subscription1 = this.AAC.subscription1.unsubscribe();
            this.AAC.subscription1 = null;
        }
        // alert(`I'm leaving the app!`);
        // this.enterPressObserver && this.enterPressObserver.unsubscribe();
        //this.enterPressObserver.unsubscribe();
    }
    public AgentLogoff()
    {
        this.AAC.PSWQtot = new QUEUED_ACD_GROUP();
        this.showDetailedQChartsACDbyGroupsOnOff();
        this.AAC.agentLogoff(true,false);
    }

    public evtSource: EventSource<Meta>;
    public sessionId = null;

    constructor(public AAC: AccAgentService,
        public translate: TranslateService,
        private dialog: MatDialog,
        public router: Router,
        private formBuilder: FormBuilder,
        private renderer: Renderer2,
        public tokenService: TokenStorageService,
        private viewContainerRef: ViewContainerRef
        /*@ViewChild('sidenav') sidenav: SidenavComponent*/)
    {
        //sidenav.show();
        //sidenav.windwosWidth=30;
        // document.addEventListener('notificationclick', (event) => {
        //    alert("close notification");
        //     this.AAC.log('[Service Worker] Notification click Received. event', event);
        //    });
        this.sessionId = AAC.GetSessionId(); //this.router.getCurrentNavigation().extras.state.transd;
        console.log("MainPageComponent - AppConfig.sessionId: " +  this.AAC.sessionId);

         if (AAC.agent == null)
        {
            this.router.navigateByUrl('/AccAgentPage' + this.AAC.savedURLSearch);
            
            return;
        }
        this.PrepareAgentPage();

        this.AAC.log("AccAgentPage=>constructor after setTiles: " + this.tiles.length);
        //this.AAC.setEmtyButton();
        this.AAC.offAllSpecialForms();


        //const component = this.viewContainerRef.createComponent(SseComponent);

        //var evtSource = new EventSource(`/accOMNI/subscribe/1111111111`, { withCredentials: true });

/*
        evtSource.onmessage = (e) => {
            console.log('connection message');
            console.log(e.data.toString());
            this.receiveChatMes(e.data.toString());
            //const div = document.createElement("div");
            //div.textContent = `Event received: ${e.data.toString()}`;
            //document.getElementById("events").appendChild(div);
        }
        evtSource.onerror = (e) => {
            console.log('connection error');
            console.log(e);
            evtSource.close();
        }
        evtSource.onopen = (e) => {
            console.log('connection open');
            console.log(e);
        }
*/
    }
    // ==========================================[ PrepareAgentPage ]=================================
    PrepareAgentPage()
    {
        this.userStatus = this.AAC.userStatus;
        this.tiles = new Array();
        var TT = this;
        this.translate.setDefaultLang('en');
        AccButtons.forEach(function (a) {
            if (a.must == false) {
                var b = new accbutton(a.id, a.Array[0].title, a.Array[0].class,
                    a.Array[0].color, a.click, a.Array[0].img,
                    a.candrag, a.must, a.Description, a.Array[0].Code,a.datatype);
                if (a.type == "ACD") {

                    TT.ACDList.push(b);
                }
                else if (a.type == "TEL") {
                    TT.TELList.push(b);
                }
            }
        });
        this.AAC.WinTabs.push(new oneTab(this.AAC.FullWinTabs[0],this.AAC.FullWinTabContent[0]));
        this.AAC.agentButtons.forEach(function (value)
        {
            //function getDimensionsByFind(id){
            var a = AccButtons.find(x => x.Array[0].Code === value.Button);
            if ( (a == null) || (a == undefined) ) {
                TT.AAC.log("button not found:" + value.Button);
            }
            else
            {
                var button_done = true;
                var b = new accbutton(a.id, a.Array[0].title, a.Array[0].class,
                                      a.Array[0].color, a.click, a.Array[0].img, a.candrag, a.must,
                                      a.Description, a.Array[0].Code,a.datatype);
                if ( a.Array[0].isdisable != undefined) 
                {
                    b.isdisable = a.Array[0].isdisable;
                }
                try {
                    var bt; TT.translate.get(b.titlesrc).subscribe((text:string) => {bt = text});
                    b.title = bt;

                    if (value.data != "") // has value
                    {
                        b.isSet = true;
                        b.data = value.data;
                        b.title = bt + "\n" + b.data;
                        // Set specail css class for progrsmmed buttons
                        switch (b.code)
                        {
                            case "TransferToAgent":
                                b.class += " transferToAgent";
                                b.isdisable = true;
                                //var i = TT.AAC.agentsReadyList.map(e => e.name).indexOf(b.data);
                                b.title = bt + "\n" + b.data;
                            break;
                            //
                            case "ReleasewithCode":
                                b.class += " relasecode";
                                var i = TT.AAC.ACC.m_ReleaseCodesList.map(e => e.Key).indexOf(b.data);
                                if(i == -1)
                                    button_done = false;
                                else
                                    b.title = bt + "\n" + TT.AAC.ACC.m_ReleaseCodesList[i].Desc;
                            break;
                            //
                            case "WrapupCode":
                                b.class += " wrapupcode";
                                var j = TT.AAC.ACC.m_WrapUpCodesList.map(e => e.Key).indexOf(b.data);
                                if(j == -1)
                                    button_done = false;
                                else
                                    b.title = bt + "\n" + TT.AAC.ACC.m_WrapUpCodesList[j].Desc;
                            break;
                            //
                            case "MakeNACall":
                                b.class += " makecall";
                            break;
                            //
                            case "TransferCall":
                                b.class += " transfer";
                            break;
                            //
                            case "StartConsultation":
                                b.class += " cunsultation";
                            break;
                            //
                            case "SilentMonitor":
                                b.class += " monitor";
                            break;
                            //
                            case "BrakeIn":
                                b.class += " breakin";
                            break;
                            //
                            case "Whisper":
                                b.class += " whisper";
                            break;
                            //
                            case "RecordGreeting":
                                b.class += " recordgreeting";
                            break;
                            //
                           case "LoginGroup":
                                //b.class += " group";
                                var j = TT.AAC.ACC.m_GroupsList.map(e => e.Key).indexOf(b.data);
                                if(j == -1)
                                    button_done = false;
                                else
                                {
                                    if (b.data != '') {b.class += " group";}
                                    b.title = bt + "\n" + TT.AAC.ACC.m_GroupsList[j].Desc;
                                    b.id = b.id + '.' + b.data;
                                }
                            break;
                            //
                            default: break;
                        }
                    }
                } catch (e) {
                    this.AAC.log(" !!!! constructor, exception: " + e.message );
                }
                if(button_done)
                    TT.tiles.push(b);
                //this.AAC.log("found: " +  value.Button + " description: " + a.Description);
            }
        });
    }
    modeX = new FormControl('side');
    WinSelected = new FormControl(-1);


    //
    public Grids: string = 'Show Grids';
    public thelphonyw: string = 'Show Telephony';
    //
    // ==========[ClosePSTGROUPS ]=====================
    ClosePSTGROUPS()
    {
        this.AAC.ShowPSTGROUPS = false;
    }
    // ==========[ClosePSTGROUPS ]=====================
    ClosePSTQGROUPS()
    {
        this.AAC.ShowPSTQGROUPS = false;
        this.chart = null;
    }
    // ------ [showDetailedACDbyGroups ] ------------------
    showDetailedACDbyGroups(){
        console.log("ACDGroups count: " + this.AAC.PSWtot.ACDGroups.length.toString());
        this.AAC.ShowPSTQGROUPS = false;
        this.chart = null;
        this.AAC.ShowPSTGROUPS = true;
    }
   // ------ [showDetailedQACDbyGroups ] ------------------
    showDetailedQACDbyGroups(){
        console.log("ACDQGroups count: " + this.AAC.PSWQtot.ACDQGroups.length.toString());
        this.AAC.ShowPSTQGROUPS = true;
        this.AAC.ShowPSTGROUPS = false;
        this.chart = null;
    }
    //
   // =========[ showDetailedQChartsACDbyGroupsOnOff ]=============
   ShowChart:boolean = false;
   chart : CanvasJS.Chart = null;
   showDetailedQChartsACDbyGroupsOnOff() 
    {
        if (this.AAC.ShowPSTQGROUPS == false) {
            return;
        }
        if (this.ShowChart) {
            this.ShowChart = false;
            if (this.chart != null)
            {
                this.chart.destroy();
            }
            this.chart = null;
        }
        else {
            //chart: CanvasJS.Chart = null;
            this.ShowChart = true;
            this.showDetailedQChartsACDbyGroups();
        }
    }
    colorSet:any = null;  
  // =========[ showDetailedQChartsACDbyGroups ]=============
  showDetailedQChartsACDbyGroups() 
  {
      if (this.AAC.ShowPSTQGROUPS == false || this.ShowChart == false) {
          return;
      }
      var s: string = "";
      var points1: barchart[] = [];
      var points2: barchart[] = [];
      for (let i = 0; i < this.AAC.PSWQtot.ACDQGroups.length; ++i) {
          var x = Number(this.AAC.PSWQtot.ACDQGroups[i].totQACD) - Number(this.AAC.PSWQtot.ACDQGroups[i].Wtotal);
          //var b:barchart = new barchart(Number(this.AAC.PSWQtot.ACDQGroups[i].totQACD),this.AAC.PSWQtot.ACDQGroups[i].group_name);
          var b: barchart = new barchart(x, this.AAC.PSWQtot.ACDQGroups[i].group_name);
          var c: barchart = new barchart(Number(this.AAC.PSWQtot.ACDQGroups[i].Wtotal), this.AAC.PSWQtot.ACDQGroups[i].group_name);
          points1.push(c);
          points2.push(b);
      }
      if (this.chart != null) {
          this.chart.options.data[0].dataPoints = points1;
      }
      else {
        var bt; this.translate.get("Queued ACD calls").subscribe((text:string) => {bt = text});
  
           this.chart = new CanvasJS.Chart("chartContainer", {
              animationEnabled: true,
              exportEnabled: true,
              height: 250,
              title: {
                  text: bt
              },
              axisX: {
                 interval: 1,
            },
            axisY: {
                interval: 1,
            },

              toolTip: {
                  shared: true,
                  content: this.toolTipContent
              },
              data: [{
                  type: "column",
                  dataPoints: points1
              }
              ]
          });
      }
      this.colorSet = this.chart._selectedColorSet;
      this.chart.me = this;
      this.chart.render();
      // this.a();
  }
    //
toolTipContent(e) {
    var str = "";
    var str2, str3;
    var AvgAndlast = "";
    var a:any = this;
    var me:any = a.chart.me;
    for (var i = 0; i < e.entries.length; i++) {
        var colorX = me.colorSet[e.entries[i].index];
        var str1 = "<span>Count: </span>: <strong>" + e.entries[i].dataPoint.y + "</strong><br/>";
            AvgAndlast = me.getAvgAndLast(e.entries[0].dataPoint.label, colorX,i);
            str = str.concat(str1).concat(AvgAndlast);
    }
    str2 = "<span style= \"color:" + colorX + "\"><strong>" + (e.entries[0].dataPoint.label) + "</strong></span><br/>";
     return (str2.concat(str));
}
getAvgAndLast(grpName,colorX,j)
{
    var i = this.AAC.PSWQtot.ACDQGroups.map(e => e.group_name).indexOf(grpName);
    if (i != -1)
    {
        var a = this.AAC.PSWQtot.ACDQGroups[i].Wavg_time;
        var l = this.AAC.PSWQtot.ACDQGroups[i].WlongetTime;
        if (j == 1){
            a = this.AAC.PSWQtot.ACDQGroups[i].QAvgTime;
            l = this.AAC.PSWQtot.ACDQGroups[i].QLongestTime;
        }
       var bt; this.translate.get("Average time:").subscribe((text:string) => {bt = text});
       var str1 = "<span>&nbsp;" + bt + "&nbsp;" + a +  "</span><br>";
        this.translate.get("Longet time:").subscribe((text:string) => {bt = text});
        var str2 = "<span>&nbsp;" + bt + "&nbsp;&nbsp;" + a +  "</span><br>";
        return str1 + str2;
    }
    return -1;
}

  // =========[ toggleToGrids ]=============
    toggleToGrids(idx) {
        if (this.AAC.isGrids == false && idx != 6)
        {
            window.resizeTo(window.screen.width,  window.screen.height);
            this.AAC.isGrids = true;
            //2019-05-14 AlisherM BZ#49794: resize toolbar iFrame in Salesforce according to size of toolbar size
            if (this.AAC.isSalesforce)
            {
                this.AAC.salesforce.setMaxIFrameSize();
            }
        }
        //
        switch (idx)
        {
            case 0:
            this.AAC.isSetup = false;
            this.AAC.isTelephony = false;
            this.AAC.isPhonbook = false;
            this.AAC.isOpenCalls = true;
            break;
            //
            case 1:
            this.AAC.isSetup = false;
            this.AAC.isTelephony = false;
            this.AAC.isPhonbook = false;
            this.AAC.isCallsLog = true;
            break;
            //
            case 2:
                this.AAC.isSetup = false;
                this.AAC.isTelephony = false;
                this.AAC.isPhonbook = false;
                this.AAC.AcdCurRefreshDate = null;
                this.AAC.AcdCurRefreshDate = new Date();
                this.AAC.isACDCalls = true;
            break;
            //
            case 3:
                this.setAllToFalse();
                this.AAC.isTelephony = true;
            break;
            //
            case 4:
                this.setAllToFalse();
                this.AAC.isPhonbook = true;
            break;
            //
            case 5:
                this.setAllToFalse();
                this.AAC.isSetup = true;
            break;
            //
            case 6: // personal statistics
                this.chart = null;
                this.ShowChart = false;
                if (this.AAC.ShowPST == false) {
                    this.AAC.sendStatisticsRequest();
                    this.AAC.ShowPST = true;
                     this.AAC.offAllPartialSpecialForms();
                }
                else {
                    this.AAC.ShowPST = false;
                    this.AAC.ShowPSTGROUPS = false;
                    this.AAC.ShowPSTQGROUPS = false;
                    this.ShowChart = false;
                    this.chart = null;
                }
                break;
            //

    }

     }
    // ==========================================[setisToFalse]=================================
    setAllToFalse()
     {
        this.AAC.isACDCalls =   false;
        this.AAC.isCallsLog =   false;
        this.AAC.isOpenCalls =  false;
        this.AAC.isSetup =      false;
        this.AAC.isTelephony =  false;
        this.AAC.isPhonbook =   false;
     }


    //----------------------------[setup]-------------------------
    setup()
    {
        return;
    }

     // =========================================[prepTitle] ========================================
    agentHints:string = "";
    prepTitle() {
        document.title = " #" +  this.AAC.agaenLogin.username + " EXT.: " + this.AAC.agent.m_Extension +  " - Aeonix Contact Center Agent" ;
        this.agentHints = "Aeonix Contact Center Agent\n" + this.AAC.agaenLogin.name + "\n" + this.AAC.agent.m_AgentNo + "\n" + this.AAC.agent.m_Extension;
    }
    //
    agentChanged(value) {
        this.showEmailError = this.accAgentForm.get('username').invalid && value != '';
    }
    exensionValueChanged(value) {
        this.showEmailError = this.accAgentForm.get('extension').invalid && value != '';
    }

    submitAccAgent() {
        if (this.accAgentForm.invalid) {
            this.showErrors = true;
            return;
        }
    }
    agentFieldFocusOut(agentNo) {
        //   this.AAC.agaenLogin.username = agentNo;
        //   this.AAC.log("Agent Id: "+ this.AAC.agaenLogin.username );

    }
    //============================================================
    extensionFieldFocusOut(extension) {
        // this.AAC.agaenLogin.extension = extension;
        // this.AAC.log("extension" + this.AAC.agaenLogin.extension);
        // this.AAC.log("Extension: "+ this.AAC.agaenLogin.extension );
    }
    trackByIndex(index: number, value: number) {
        console.log("ngFor");
        console.log("" + index);
        console.log("" + value);
        return index;
    }
    public SetCurrentCP(currcp: Key_Desc[]) {
        this.CurrentCP = currcp;
    }
    public CurrentCP: Key_Desc[] = [];

    // ]==============================================================
    // ]=======================[ agent events] ]======================
    // ]==============================================================
    //
    // ]====================   [loginChanged]=========================
   
    loginChanged() {
        var action = (this.AAC.agent.m_isLogon == false) ? "login" : "logout";
        var b:boolean  = false; 
        if (this.AAC.userStatus.userReleased == false){ b = true;}
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + ", ," + this.AAC.agent.m_Extension + "," + String(b));
    }
    // // ]====================logingroupChanged===============================
    // logingroupChanged() {
    //     var action = (this.AAC.agent.m_isLogon == false) ? "login" : "logout";
    // }
    // ]========================== [releaseChanged ]====================================
    releaseChanged() {
        this.AAC.agent.ReleaseCode = "1";
        if (this.AAC.userStatus.userLogin == false)
        {
            this.userStatus.userReleased = (this.AAC.userStatus.userReleased == true) ?  false :true;
            this.AAC.displayOnOffreleaseImage();
            return;
        }
        var action = (this.AAC.userStatus.userReleased == true) ? "resume" : "release";
        if (action == "resume" && this.AAC.agent.m_DND)
        {
            this.AAC.ShowAlert("Device status: DND");
            return;
        }
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + "1" + ",0,");
    }
    // ]========================== [readyChanged ]====================================
    //             Manually end the WrapUp state and become ready
    readyChanged() {
        if (this.AAC.agent.m_AgentStatus != AgentStatus.WrapUp) {
            //this.AAC.message("Agent not in wrapup state");
            return;
        }
        var action = "wrapup";
        this.AAC.SetNewStateTime();
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + " ," + ",0,");
    }
    //------------------------
    selectedTtA: any = {};
    selectedWC: string = "00";
    selectedRC: string = "01";
    selectedOneGroup: string = "00";
     // =========================[superVisorHelp]==========================
     SupervisorHelp() {
        let on:number = 0;
        this.AAC.isSupervisorHelp = this.AAC.isSupervisorHelp == false ? true:  false;
        if (this.AAC.isSupervisorHelp == true) {on = 1;}
        this.AAC.setAccButton("acd_get_supervisor_hepId", on, false);
        this.AAC.PrepareAndPutNotification("supervisorhelp", "supervisorhelp" + ",000," + this.AAC.agent.m_AgentNo + "," + this.AAC.agent.m_Extension + "," + on + ",,,,");
    }
    //=====================[AllListOff]========================
    AllListOff(){
        this.AAC.ShowPST = false;
        this.AAC.ShowPSTGROUPS = false;
        this.AAC.ShowPSTQGROUPS = false;
        this.AAC.ShowReleaseCodes = false;
        this.AAC.SetWrapupCodesButton = false;
        this.AAC.SetTransferToAgent = false;
    }

    //=====================[ChooseWrapCode]=====================
    ChooseWrapCode(isForceWrapupCode:boolean)
    {
        this.ForceWrapupCode = isForceWrapupCode;
        this.AllListOff();
        this.AAC.ShowWrapupCodes = true;
        this.selectedWC = "00";
        this.selectedWC = "00";
        this.AAC.SetWrapupCodesButton = false;
    }
    ForceWrapupCode:boolean = false;
    // =========================== [WCchanged ]===================================
    WCchanged() {

        this.AAC.ShowWrapupCodes = false;
        if (this.AAC.SetWrapupCodesButton == true && this.ForceWrapupCode == false) {
            this.AAC.imgWU.data = this.selectedWC;
            var i = this.AAC.ACC.m_WrapUpCodesList.map(e => e.Key).indexOf(this.selectedWC);
            this.AAC.imgWU.title = this.AAC.imgWU.titlesrc + "\n" + this.AAC.ACC.m_WrapUpCodesList[i].Desc;
            this.AAC.imgWU.isSet = true;
            this.AAC.imgWU.class += " wrapupcode";
            //this.tiles.splice(this.tiles.length - 1, 0, this.AAC.imgWU);
            this.AAC.saveEtasIniButtons(this.tiles);
        }
        else {
            this.AAC.agent.WrapUpCode = this.selectedWC;
            var action = "setwrapupcode";
            this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + this.selectedWC + ",0,");
        }
    }
   // =========================== [WrapupCode ]===================================
   WrapupCode(idx: number) {
    if (this.AAC.userStatus.userWrauped == true ||
        (this.AAC.agent.m_CallIndex != -1 &&
            this.AAC.callsArray[this.AAC.agent.m_CallIndex].m_Acd == "ACD")) {
        this.AAC.SetWrapupCodesButton = false;
        if (this.tiles[idx].isSet) {
            // auto send programmed W.U code button
            this.selectedWC = this.tiles[idx].data; //save W.C id
            this.WCchanged(); // 
            return;
        }
        //this.AAC.imgWU = this.copyImg(this.tiles[idx], false);
        this.AAC.imgWU = this.tiles[idx];
        this.ChooseWrapCode(false);
     }
    else {
        this.AAC.message("No ACD call or Not in Wrapup state");
    }
}    // ============================[wrapUpControldState]=================
    wrapUpControldState() {
        if (this.AAC.userStatus.userWrauped == false) {
            this.AAC.message("Manual wrapup, Not inWrapup state");
            return;
        }
        var action = "setManuelwrapup";
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + this.AAC.agent.WrapUpCode + ",0,");
        //this.AAC.SetAgentStatus();
    }


    // ]=========================== [releaseWithCode ]===================================
    releaseWithCode(idx: number) {
        this.selectedRC = "01";
        this.AAC.SetReleaseCodesButton = false;
        if (this.tiles[idx].isSet) {
            // auto send programmed release code button
            this.selectedRC = this.tiles[idx].data; //save release code id
            this.RCchanged(); // 
            return;
        }
        this.AAC.offAllSpecialForms();
        this.AllListOff();
        //this.AAC.imgrelease = this.copyImg(this.tiles[idx], false);
        this.AAC.imgrelease = this.tiles[idx];
        this.AAC.ShowReleaseCodes = true;
    }
    // ]=========================== [RCchanged ]===================================
    RCchanged() {
        this.AAC.ShowReleaseCodes = false;
        if (this.AAC.SetReleaseCodesButton == true) {
            this.AAC.imgrelease.data = this.selectedRC;
            var i = this.AAC.ACC.m_ReleaseCodesList.map(e => e.Key).indexOf(this.selectedRC);
            this.AAC.imgrelease.title = this.AAC.imgrelease.titlesrc + "\n" + this.AAC.ACC.m_ReleaseCodesList[i].Desc;
            this.AAC.imgrelease.isSet = true;
            this.AAC.imgrelease.class += " relasecode";
            //this.tiles.splice(this.tiles.length - 1, 0, this.AAC.imgrelease);
            this.AAC.saveEtasIniButtons(this.tiles);
        }
        else {
            this.AAC.agent.ReleaseCode = this.selectedRC;
            this.AAC.ShowReleaseCodes = false;
            var action = "release";
            this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + this.AAC.agent.ReleaseCode + ",0,");
        }

    }
    // ]=========================== [TransferToAgent ]===================================
    TransferToAgent(idx: number) {
        this.selectedTtA = "";
        if (this.tiles[idx].isSet) {
            // auto send programmed transfer to agent button
            this.selectedTtA = this.tiles[idx].data; //save release code id
            let found1: any = this.AAC.agentsReadyList.find(elem => elem.name == this.selectedTtA);
            if (found1 == undefined) { return; }
            this.AAC.transferCall(found1.ext);
            return;
        }        
        this.AAC.SetTransferToAgent = false;
        this.AAC.offAllSpecialForms();
        this.AllListOff();
         //this.AAC.imgTtA = this.copyImg(this.tiles[idx], false);
         this.AAC.imgTtA = this.tiles[idx]; 
         this.AAC.ShowTransferToAgentList = true;
    }
    // ]=========================== [RCchanged ]===================================
    TaACchanged(evt: any) {
        this.AAC.ShowTransferToAgentList = false;
        let found1: any = this.AAC.agentsReadyList.find(elem => elem.name == this.selectedTtA);
        if (found1 == undefined) {return;}
        if (this.AAC.SetTransferToAgentButton == true) {
            this.AAC.imgTtA.data = this.selectedTtA;
            this.AAC.imgTtA.title = this.AAC.imgTtA.titlesrc + "\n" + found1.name;
            this.AAC.imgTtA.class += " transferToAgent";
            this.AAC.imgTtA.isSet = true;
            //this.tiles.splice(this.tiles.length - 1, 0, this.AAC.imgTtA);
            this.AAC.saveEtasIniButtons(this.tiles);
        }
        else {
                    this.AAC.transferCall(found1.ext);
         }
    }
    //===============================[logon / logout one group]=====================
    SelectOngroupOpen(idx: number) {
        if (this.AAC.agent.m_COS[COS.SPECIFIC_LOGIN] == false) {return;}
        this.selectedOneGroup = "00";
        this.AAC.SetOneGroupsListButton = false;
        if (this.tiles[idx].isSet) {
            // auto send programmed group login code button
            this.selectedOneGroup = this.tiles[idx].data; //save release code id
            this.SelctedOneGroup(); // 
            return;
        }
        //this.AAC.imgonegroup = this.copyImg(this.tiles[idx], false);
        this.AAC.imgonegroup = this.tiles[idx]; 

        this.AAC.ShowOneGroupsList = true;
    }
    // ]=========================== [SelctedOneGroup ]=============================
    SelctedOneGroup() {
        this.AAC.ShowOneGroupsList = false;
        if (this.AAC.SetOneGroupsListButton == true) {
            this.AAC.imgonegroup.data = this.selectedOneGroup;
            var s = this.AAC.imgonegroup.id.split('.');
            this.AAC.imgonegroup.id = s[0] + '.' + this.selectedOneGroup;
            var i = this.AAC.ACC.m_GroupsList.map(e => e.Key).indexOf(this.selectedOneGroup);
            this.AAC.imgonegroup.title = this.AAC.imgonegroup.titlesrc + "\n" + this.AAC.ACC.m_GroupsList[i].Desc;
            this.AAC.imgonegroup.class += " group";
            this.AAC.imgonegroup.isSet = true;
            //this.tiles.splice(this.tiles.length - 1, 0, this.AAC.imgonegroup);
            this.AAC.saveEtasIniButtons(this.tiles);
        }
        else {
            var action = "logingroup";
            var idx: number = this.AAC.ACC.m_GroupsList.map(c => c.Key).indexOf(this.selectedOneGroup);
            if (this.AAC.ACC.m_GroupsList[idx].Flag == true) {
                action = "logoutgroup";
            }
            this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + ", ," + this.AAC.agent.m_Extension + ",true," + this.selectedOneGroup + ",0,");
        }
    }
    // ==============================[Setup definitions]===============================
    setupGroups: SetupGroup[] = [
        {
          name: 'Toolbar',
          setup: [
            {value: 'onTop', viewValue: 'Alway On top'},
            {value: 'LargeIcons', viewValue: 'Larg icons'},
            {value: 'AutoResize', viewValue: 'Auto resize'},
            {value: 'StatusBar', viewValue: 'Status bar'}
        ]
        },
        {
            name: 'Personal Options',
            setup: [
                {value: 'StartMin', viewValue: 'Start minimize'},
                {value: 'EnableCloseX', viewValue: 'Enable closing via system menu "x"'},
                {value: 'OpenOnForeRelease', viewValue: 'Open Toolbar on "Forced Release" state'},
                {value: 'MinOnRelease', viewValue: 'Allow minimize the toolbar in "Release" state'},
                {value: 'OpenOnRing', viewValue: 'Open Toolbar on Ring'},
                {value: 'MinOnAnswer', viewValue: 'Minimize on answer'},
                {value: 'OpenOnQueuedCall', viewValue: 'Open Toolbar on Queued Call'},
            ]
      
        },
        {
            name: 'Ring Apply To',
            setup: [
                {value: 'Voice', viewValue: 'Voice'},
                {value: 'Mail', viewValue: 'Mail'},
                {value: 'Chat', viewValue: 'Chat'},
                {value: 'OutboundCallConfirm', viewValue: 'Outbound Call Confirmation'},
            ]
      
        },
        {
            name: 'Ring Alert',
            setup: [
                {value: 'RingOnce', viewValue: 'Ring Once'},
                {value: 'ContinuousRing', viewValue: 'ContinuousRing'},
            ]
        },
        {
            name: 'Ring Tone',
            setup: [
                {value: 'DefaultRing', viewValue: 'Default (speaker Beep'},
                {value: 'WaveFile', viewValue: 'File (Wave files only,Required sound card)'},
            ]
        },
        {
            name: 'Queue Alert',
            setup: [
                {value: 'SpeakerBeep', viewValue: 'Speaker Beep (Ring Once)'},
                {value: 'WaveFile', viewValue: 'File (Wave files only,Required sound card)'},
            ]
        }]
    //
    public setupControl: FormControl = new FormControl([this.setupGroups[0].setup]);
    public  SetupList: Setup[] = [];
    // ]=========================== [prepareSetup ]===================================
    prepareSetup() {
        this.setupControl.reset();
        var SetupTrueList: Setup[] = [];

        for (let g = 0; g < this.setupGroups.length; ++g) {
            //SetupTrueList.push(new SetupGroup(false, this.setupGroups[g].name));
            var stp: Setup;
            var stpini: any;

            for (let s = 0; s < this.setupGroups[g].setup.length; ++s) {
                try {
                    stp = new Setup(this.setupGroups[g].setup[s].value, this.setupGroups[g].setup[s].viewValue);
                    this.SetupList.push(stp);
                    stpini = this.AAC.getEtasIni().AgentSetup[g].setup[s];
                    if (stpini.Value == true) {
                        //SetupTrueList[g].setup.push( stp);
                        SetupTrueList.push( stp);
                        //                      // this.m_SetupTrueList[g].setup.push(stp);
                    }
                } catch (e) {
                    console.error("SetupGroup, exception: " + e.message + " " + stp.viewValue);
                }
            }
        }
        this.setupControl.setValue(SetupTrueList);
    }

   // ]=========================== [SelctedSetupChange ]===========================
    SelctedSetupChange(evt) {
        for (let g = 0; g < this.setupGroups.length; ++g) {
            var stpini: any;
            for (let s = 0; s < this.setupGroups[g].setup.length; ++s) {
                try {
                    stpini = this.AAC.getEtasIni().AgentSetup.Options[g].Setup[s];
                    var idx: number = evt.value.map(c => c.value).indexOf(stpini.Option);
                    if (idx == -1) { stpini.Value = false; }
                    else { stpini.Value = true; }

                } catch (e) {
                    console.error("SelctedSetupChange, exception: " + e.message);
                }
            }
        }
        this.AAC.saveEtasIni();
        return;
    }
    // ]=========================== [offtSetupList ] ============================
    offSetupList() {
        this.AAC.ShowButtonList = false;
    }
    // ]=========================== [callNumber ]===================================
    callNumber(index: number) {
        this.AAC.offAllSpecialForms();
        this.AAC.callType = CallTypes.MAKECALL;
        if (this.tiles[index].isSet == true) {
            this.AAC.handleDialpadCall(this.tiles[index].data);
            return;
        }
        this.AAC.callTypetxt = CallTypesText[CallTypes.MAKECALL];
        //this.AAC.imgcall = this.copyImg(this.tiles[index], true);
        this.AAC.imgcall = this.tiles[index];
        this.AAC.imgcall.setClass += " makecall";
        this.AAC.ShowNumpad = true;
        this.AAC.ShowPST = false;
        this.AAC.ShowPSTGROUPS = false;
        this.AAC.ShowPSTQGROUPS = false;
    }
    // ]========================== [transfer ]===========================================
    transfer(index: number) {
        this.AAC.offAllSpecialForms();
        this.AAC.callType = CallTypes.TRANSFER;
        if (this.tiles[index].isSet == true) {
            this.AAC.transferCall(this.tiles[index].data);
            return;
        }
        this.AAC.callTypetxt = CallTypesText[CallTypes.TRANSFER];
        //this.AAC.imgcall = this.copyImg(this.tiles[index], true);
        this.AAC.imgcall = this.tiles[index];
 
        this.AAC.imgcall.setClass += " transfer";
        this.AAC.ShowNumpad = true;
        this.AAC.ShowPST = false;
        this.AAC.ShowPSTGROUPS = false;
        this.AAC.ShowPSTQGROUPS = false;
   }
    // ]========================== [startConsultation ]===========================================
    startConsultation(index: number) {
        this.AAC.offAllSpecialForms();
        this.AAC.callType = CallTypes.CONSULTATION;
        if (this.tiles[index].isSet == true) {
            this.AAC.consultationCall(this.tiles[index].data);
            return;
        }

        this.AAC.callTypetxt = CallTypesText[CallTypes.CONSULTATION];
        //this.AAC.imgcall = this.copyImg(this.tiles[index], true);
        this.AAC.imgcall = this.tiles[index];
 
        this.AAC.imgcall.setClass += " cunsultation";
        this.AAC.ShowNumpad = true;
        this.AAC.ShowPST = false;
        this.AAC.ShowPSTGROUPS = false;
        this.AAC.ShowPSTQGROUPS = false;
    }
    // ]========================== [disconnectCall ]===========================================
    disconnectCall() {
        var action = 'disconnectcall';
        var callid = this.AAC.getCurrentCallId();
        if (callid == "") {return;}
        if (this.AAC.callsArray[this.AAC.agent.m_CallIndex].m_CallState == AccCallState.Ringing) 
        {
            //return;
        }
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callid + "," + this.AAC.agent.m_Extension);
    }
    // ]============================ [answerCall ]================================
    answerCall() {
        var action = 'answercall';
        var callid = this.AAC.getCurrentCallId();
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callid + "," + this.AAC.agent.m_Extension);
    }
    // Callbacks code
   // REINSERT_NO_ANSWER = 0
    //REINSERT_BUSY   = 1
   // REINSERTFAILURE = 2  
        // ]============================ [CallbackReinsertBusy ]================================
        CallbackReinsertBusy() {
            var action = 'outboundreinsert';
            var callid = this.AAC.getCurrentCallId();
            this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callid + "," + "1");
        }
    // ]============================ [CallbackReinsertNoAnswer ]================================
    CallbackReinsertNoAnswer() {
        var action = 'outboundreinsert';
        var callid = this.AAC.getCurrentCallId();
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callid + "," + "0");
    }
    // ]============================ [CallbackReinsertTerminate ]================================
    CallbackReinsertTerminate() {
        var action = 'outboundreinsert';
        var callid = this.AAC.getCurrentCallId();
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callid + "," + "2");
    }
    
    // ]============================ [holdCall ]==================================
    holdCall() {
        var action = 'holdcall';
        var callid = this.AAC.getCurrentCallId();
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callid + "," + this.AAC.agent.m_Extension);
    }
    // ]============================ [retrieveCall ]===============================
    retrieveCall() {
        var action = 'retrievecall';
        var callid = this.AAC.getCurrentCallId();
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callid + "," + this.AAC.agent.m_Extension);
    }
    // ]========================== [completeTransfer ]===========================================
    completeTransfer() {

        var idxh =this.AAC.agent.m_StartConsultationHeld;
        if (idxh == -1) {
            this.AAC.log("completeTransfer Error: request - No start consultaion");
            return;
        }
        var callId =this.AAC.callsArray[this.AAC.agent.m_StartConsultation].m_CallId
        if (callId == "") {
            this.AAC.log("completeTransfer Error: request - empty call id");
            return;
        }
        var callh: OneCall = this.AAC.callsArray[idxh];

        var action = 'completetransfer';
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callh.m_CallId + "," + this.AAC.agent.m_Extension + "," + callId + "," + this.AAC.agent.m_Extension);
    }
    // ]========================== [completeConference ]===========================================
    completeConference() {
        if (this.AAC.agent.m_StartConsultationAnswered == false) {return;}
        var callId = this.AAC.callsArray[this.AAC.agent.m_StartConsultation].m_CallId;
        var idxh = this.AAC.agent.m_StartConsultationHeld;
         if (idxh == -1 || callId == "") {
            this.AAC.log("completeConference Error: request - hold call not found");
            return;
        }
        var callh: OneCall = this.AAC.callsArray[idxh];
        var action = 'completeconference';
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callh.m_CallId + "," + this.AAC.agent.m_Extension + "," + callId + "," + this.AAC.agent.m_Extension);
    }
    // ]========================== [swapcall ]===========================================
    swapcall() {
        // if (this.AAC.agent.m_StartConsultation != -1)
        // {
        //     this.AAC.log("reconnectCall : request ERROR (start consultation"); 
        //     return;
        // }
        var callid = this.AAC.getCurrentCallId();
        var idxh = this.AAC.getLastCallIdxByCallState(AccCallState.Hold);
        if (idxh == -1 || callid == "") {
            this.AAC.log("swapcall : request ERROR");
            return;
        }
        var callh: OneCall = this.AAC.callsArray[idxh];
        var action = 'swapcall';
        //this.AAC.agent.m_CallIndex = idxh;
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callh.m_CallId + "," + this.AAC.agent.m_Extension + "," + callid + "," + this.AAC.agent.m_Extension);
    }
    //========================== [setCallbackStatus ]========================================
    setCallbackStatus() {

    }
    // ]========================== [silentMonitor ]========================================
    silentmonitor(index: number) {
        this.AAC.offAllSpecialForms();
        this.AAC.callType = CallTypes.SILENT_MONITOR;
        if (this.tiles[index].isSet == true) {
            this.AAC.SilentMonitorCall(this.tiles[index].data);
            return;
        }
        this.AAC.callTypetxt = CallTypesText[CallTypes.SILENT_MONITOR];
        //this.AAC.imgcall = this.copyImg(this.tiles[index], true);
        this.AAC.imgcall = this.tiles[index];
         this.AAC.imgcall.setClass += " monitor";
        this.AAC.ShowNumpad = true;
        this.AAC.ShowPST = false;
        this.AAC.ShowPSTGROUPS = false;
        this.AAC.ShowPSTQGROUPS = false;
    }
   // ]========================== [breakIn ]========================================
   breakIn(index: number) {
    this.AAC.offAllSpecialForms();
    this.AAC.callType = CallTypes.BREAKIN;
    if (this.tiles[index].isSet == true) {
        this.AAC.BreakinCall(this.tiles[index].data);
        return;
    }
    this.AAC.callTypetxt = CallTypesText[CallTypes.BREAKIN];
    //this.AAC.imgcall = this.copyImg(this.tiles[index], true);
    this.AAC.imgcall = this.tiles[index];
     this.AAC.imgcall.setClass += " breakin";
    this.AAC.ShowPST = false;
    this.AAC.ShowPSTGROUPS = false;
    this.AAC.ShowPSTQGROUPS = false;
    this.AAC.ShowNumpad = true;
//var action = 'bargin';
    //this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + this.AAC.agent.m_Extension);
}
    // ]========================== [whisper ]=============================================
    whisper(index: number) {
        this.AAC.offAllSpecialForms();
        this.AAC.callType = CallTypes.WHISPER;
        if (this.tiles[index].isSet == true) {
            this.AAC.WhisperCall(this.tiles[index].data);
            return;
        }
        this.AAC.callTypetxt = CallTypesText[CallTypes.WHISPER];
        //this.AAC.imgcall = this.copyImg(this.tiles[index], true);
        this.AAC.imgcall = this.tiles[index];
         this.AAC.imgcall.setClass += " whisper";
        this.AAC.ShowNumpad = true;
        this.AAC.ShowPST = false;
        this.AAC.ShowPSTGROUPS = false;
        this.AAC.ShowPSTQGROUPS = false;
    }
    // ]========================== [recordgreeting ]=============================================
    recordgreeting(index: number) {
        var action = 'recordgreeting';
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + this.AAC.agent.m_Extension);
    }
// ]========================== [reconnectCall ]================================
    reconnectCall() {
        // if (this.AAC.agent.m_StartConsultation != -1)
        // {
        //     this.AAC.log("reconnectCall : request ERROR (start consultation"); 
        //     return;
        // }
        
        var callid = this.AAC.getCurrentCallId();
        var idxh = this.AAC.getLastCallIdxByCallState(AccCallState.Hold);
        if (idxh == -1 || callid == "") {
            this.AAC.log("reconnectCall : request ERROR");
            return;
        }
        var callh: OneCall = this.AAC.callsArray[idxh];
        var action = 'reconnnectheldcall';
        //this.AAC.agent.m_CallIndex = idxh;
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callh.m_CallId + "," + this.AAC.agent.m_Extension + "," + callid + "," + this.AAC.agent.m_Extension);
    }
    //===============================[manageLoginGroupChanged]=====================
    public m_LoginGroupsList: Key_Desc[] = [];
    public groupsListCtrl: FormControl = new FormControl([this.m_LoginGroupsList]);
    managelogingroups() {
        if (this.AAC.agent.m_COS[COS.SPECIFIC_LOGIN] == false) {return;}
        this.m_LoginGroupsList = [];
        for (var i = 0; i < this.AAC.ACC.m_GroupsList.length; ++i) {
            if (this.AAC.ACC.m_GroupsList[i].Flag == true)//logged in
            {
                this.m_LoginGroupsList.push(this.AAC.ACC.m_GroupsList[i]);
            }
        }
        this.groupsListCtrl.setValue(this.m_LoginGroupsList);

        this.AAC.offAllSpecialForms();
        this.AAC.ShowGroupsList = true;
    }

    //===============================[manageLoginGroupSetLoginGroup]========
    manageLoginGroupSetLoginGroup(group: Key_Desc) {
        var action = "logingroup";
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + ", ," + this.AAC.agent.m_Extension + ",true," + group.Key + ",0");
        this.m_LoginGroupsList.splice(this.m_LoginGroupsList.length - 1, 0, group);

    }
    //===============================[manageLoginGroupSetLogoutGroup]========
    manageLoginGroupSetLogoutGroup(group: Key_Desc, idx: number) {
        var action = "logoutgroup";
        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + ", ," + this.AAC.agent.m_Extension + ",true," + group.Key + ",0,");
        this.m_LoginGroupsList.splice(idx, 1);
    }

    //===============================[manageLoginGroupChanged]=====================
    SelctedGroupChange(event: any) {
        this.AAC.log("selected groups: " + event);
        var idx = -1;
        // login one group
        if (event.value.length > this.m_LoginGroupsList.length) {
            for (var i = 0; i < event.value.length; ++i) {
                idx = this.m_LoginGroupsList.map(c => c.Key).indexOf(event.value[i].Key);
                if (idx == -1) {
                    this.manageLoginGroupSetLoginGroup(event.value[i]);
                    return;
                }
            }
        }
        // logout one group
        else if (event.value.length < this.m_LoginGroupsList.length) {
            for (var i = 0; i < this.m_LoginGroupsList.length; ++i) {
                idx = event.value.map(c => c.Key).indexOf(this.m_LoginGroupsList[i].Key);
                if (idx == -1) {
                    this.manageLoginGroupSetLogoutGroup(this.m_LoginGroupsList[i], i);
                    return;

                }
            }
        }
    }
    //===============================[groupLostFocus]=====================
    offGroupList() {
        this.AAC.ShowGroupsList = false;
        this.AAC.ShowOneGroupsList = false;
        this.AAC.ShowReleaseCodes = false;
        this.AAC.ShowWrapupCodes = false;
        this.AAC.ShowTransferToAgentList  =false;
        
    }
    //===============================[AddButton]===========================
    setupDocRef:any = null;
    AddButton() {
        if (this.AAC.agent.m_COS[COS.DISP_WIN_SETUP] == true) {
            this.prepareSetup();
           this.AAC.ShowButtonList = true;
        }
    }
   //===============================[CloseAddButton]=======================
   CloseAddButton()
    {
        this.AAC.ShowButtonList = false;
    }
    //===================================================================
    //   perfomnce values
    color = 'primary';
    mode = 'determinate';
    value = 99;
    bufferValue = 400;
    infoUpDown:string = "fa fa-angle-double-down";


    // ------ [PSWCfstep ] ------------------
    PSWCFstep: boolean = false;
    PSWinfoUpDown:string = "fa fa-angle-double-down";

    togglePSWStep() {
        if (this.PSWCFstep == false) {

            this.PSWCFstep = true;
             this.PSWinfoUpDown = "fa fa-angle-double-up";
             this.AAC.sendStatisticsRequest();
        }
        else {
            this.PSWCFstep = false;
            this.PSWinfoUpDown = "fa fa-angle-double-down";
        }
        //this.step = index;
    }
    setPSWStep(flag: boolean) {
        this.PSWCFstep = flag;

    }
    // -- dril down to detailes ACD groups (personal statistics) --
    pst_cols: any[]; // initiated in NgiInit()
    pst_Qcols: any[]; // initiated in NgiInit()
    sortTable(n,id) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById(id);
        switching = true;
        //Set the sorting direction to ascending:
        dir = "asc"; 
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
          //start by saying: no switching is done:
          switching = false;
          rows = table.rows;
          /*Loop through all table rows (except the
          first, which contains table headers):*/
          for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch= true;
                break;
              }
            } else if (dir == "desc") {
              if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }
            }
          }
          if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;      
          } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
              dir = "desc";
              switching = true;
            }
          }
        }
      }
 

    panelOpenState: boolean = false;
    //================================[togglePanel]========================
    togglePanel() {
        this.panelOpenState = !this.panelOpenState
    }
    //==============================[CB_IndTerminate]==========================================
    CB_IndTerminate() {
    }
    // ]========================== [recordingOn ]================================
    recordingOn() {
        var action =  this.AAC.agent.m_isRecording == true ?  'stoprecording' : 'startrecording';
        console.log("recordingOn:  action = " + action);

        this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + this.AAC.agent.m_Extension);
    }
    // ]========================== [recordingSuspend ]================================
    recordingSuspend() {
        if (this.AAC.agent.m_isRecording) {
            var action = this.AAC.agent.m_isRecordingSuspended == true ? 'resumerecording' : 'suspendrecording';
            var callid = this.AAC.getCurrentCallId();
            console.log("recordingSuspend:  action = " + action);
            this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callid + "," + this.AAC.agent.m_Extension);
        }
        else {
            console.log("PrepareAndPutNotification:  " + "m_isRecording = " + this.AAC.agent.m_isRecording);
        }
    }
       // ]========================== [recordingOn ]================================
  
    //=============================== [Grids contens ]=====================
    allicons:string[] = ['assets/Icons/acd_wrapup_code-01.jpg',
    'assets/Icons/acd_wtrapup_conrtro disable-01.jpg',
    'assets/Icons/acd_wtrapup_conrtro-01.jpg',
    'assets/Icons/agent chat tree-01.jpg',
    'assets/Icons/agent Chat-01.jpg',
    'assets/Icons/agent real time status-01.jpg',
    'assets/Icons/agent setup-01.jpg',
    'assets/Icons/agent setup.jpg',
    'assets/Icons/call connection-01.jpg',
    'assets/Icons/call connection-02.jpg',
    'assets/Icons/call cost-01.jpg',
    'assets/Icons/call location-01.jpg',
    'assets/Icons/call pause-01.jpg',
    'assets/Icons/call pause.jpg',
    'assets/Icons/call transfer icon-01.jpg',
    'assets/Icons/call transfer icon-02.jpg',
    'assets/Icons/call transfer icon2-01.jpg',
    'assets/Icons/call window-01.jpg',
    'assets/Icons/CB_Ind-Terminate-01-01.jpg',
    'assets/Icons/CB_SetNoAnswer-01-01.jpg',
    'assets/Icons/COMPLETE call transfer icon-01.jpg',
    'assets/Icons/DISONNECT -call-01.jpg',
    'assets/Icons/favourite contact-01.jpg',
    'assets/Icons/favourite contact2-01.jpg',
    'assets/Icons/incoming-call-01.jpg',
    'assets/Icons/log out log in-01.jpg',
    'assets/Icons/log out log in1-01.jpg',
    'assets/Icons/login logout-02.jpg',
    'assets/Icons/logoff-01.jpg',
    'assets/Icons/MAKE A -call-01.jpg',
    'assets/Icons/ready disable-01.jpg',
    'assets/Icons/ready-01.jpg',
    'assets/Icons/recording off-01.jp-01.jpg',
    'assets/Icons/recording off-01.jpg',
    'assets/Icons/recording on-01-01.jpg',
    'assets/Icons/recording on-01.jpg',
    'assets/Icons/Release with Code + Show release codes list-01.jpg',
    'assets/Icons/ring bell-01.jpg',
    'assets/Icons/telephone window 1-01.jpg',
    'assets/Icons/tel_break_In-01-01.jpg',
    'assets/Icons/tel_break_In-02-01.jpg',
    'assets/Icons/tel_conference_complete-01.jpg',
    'assets/Icons/tel_reconnect-1-01.jpg',
    'assets/Icons/transfer to agent-01.jpg',
    'assets/Icons/wrap up code-01.jpg',
    'assets/Icons/wrap up code-02.jpg'];
 
    // ==========================================[AcdQfoussed] ====================================
    tabIdx: number = -1;
    // GridTabsClicked(event) {
    //     this.AAC.log('GridTabsClicked=> index => ' + event.index);
    //     this.AAC.log('GridTabsClicked=> tab => ' + event.tab);
    //     this.AAC.SetkWhichGrid(event.index);
    // }

    // SetkWhichGrid(gridIdx: number) {
    //     this.gridSelectdTab = gridIdx;
    //     this.AcdCurRefreshCount = -1;
    //     this.ShowNumpad = false;
    //     this.idShowGrid = false;
    //     this.AcdCurRefreshCount = -1;
    //     switch (gridIdx) {
    //         case 0:
    //             this.QueuedCalls = [];
    //             this.prepareCallQGridData();
    //             this.curOCP = this.OCP;
    //             break;
    //         //
    //         case 1:
    //             break;
    //         //
    //         case 2:
    //             this.curOCP = this.ACC.m_CallProfileLists;
    //             this.idShowGrid = true;
    //             this.AcdCurRefreshCount = 8;
    //             break;
    //         //
    //         case 3: 
    //         default:
    //             break;


    //     }
    // }

    protected readonly decorateStory = decorateStory;
    protected readonly AppConfig = AppConfig;
}
//

    //=====================================================================


/*

<mdb-side-nav *ngIf="false" #sidenav1  class="sidenav" (dragover)="imgDragOver(-11,$event)" >
        <!--mat-sidenav #sidenav [disableClose]="true" [mode]="modeX.value" class="sidenav"-->

            <!--storybook-background1></storybook-background1-->

            <div *ngIf="AAC.NoConnectionToAcc" fxLayout="col" fxLayoutAlign="center center" style="background-color: red">No
                Connection
                <!-- <mat-icon title="Not Connected" matSuffix style="color:red">highlight_off</mat-icon> -->
            </div>
            <!-- ======(1) Agent status and notes/ errors ==================-->
            <mat-grid-list [cols]="7" class="card_container_ready">
                <mat-menu #dropDown="matMenu" overlapTrigger="false">
                    <button mat-menu-item>
                        <mat-icon>dialpad</mat-icon>
                        <span>Dropdown Link 1</span>
                    </button>
                    <button mat-menu-item >
                        <mat-icon>voicemail</mat-icon>
                        <span>Dropdown Link 2</span>
                    </button>
                </mat-menu>

                <div class="container">
                    <div class="row">
                        <div class="col ready-btn" title={{agentHints}}>
                            <i class="fa fa-user" style="font-size: 12px"></i>
                        </div>
                        <div class="col">2 of 2</div>
                    </div>
                    <div class="row">
                        <div class="col">1 of 3</div>
                        <div class="col">2 of 3</div>
                        <div class="col">3 of 3</div>
                    </div>
                </div>
                <mat-grid-tile [colspan]="1" [rowspan]="1">
                    <div class=" ready-btn" title={{agentHints}}>
                        <i class="fa" style="font-size: 12px"></i>
                    </div>
                </mat-grid-tile>
              <!-- ----- current agent status  ----------- -->
              <mat-grid-tile [colspan]="5" [rowspan]="1" style="align-content: center">
                <span *ngIf="AAC.NoConnectionToAcc != true && AAC.CurrentAgentStatus.length < 17"
                style="font-size: 150%;align-self: center;">{{AAC.CurrentAgentStatus | translate}}</span>
                <span *ngIf="AAC.NoConnectionToAcc != true && AAC.CurrentAgentStatus.length >= 17"
                style="font-size: 120%;align-self: center;">{{AAC.CurrentAgentStatus | translate}}</span>
              </mat-grid-tile>
            </mat-grid-list>
            <!-- ======(2) Timer area strat ===================== fa-step-forward================ -->
            <div class="card">
                    <mat-grid-list [cols]="4" rowHeight="20px" class="card-body">
                        <!-- ----- status timer  ----------- -->
                        <mat-grid-tile [colspan]="3" [rowspan]="2" class="timer">
                            <span *ngIf="AAC.NoConnectionToAcc != true" style="font-size: 170%">00:00:00</span>
                        </mat-grid-tile>
                        <!-- ----- calls counter ----------- -->
                        <mat-grid-tile [colspan]="2" [rowspan]="2" class="pause-icon">
                    <span>
                        <i>{{AAC.curentCall}}</i>
                    </span>
                        </mat-grid-tile>
                        <mat-grid-tile [colspan]="4" [rowspan]="1" style="font-size: 14px">
                            {{AAC.agent_note}}
                        </mat-grid-tile>
                        <!-- -----confirm call back ----------- -->
                        <mat-grid-tile [colspan]="4" [rowspan]="2" class="callbacktimer" *ngIf="AAC.ConfirmCallBack">
                    <span style="background-color: rgb(236, 234, 220);">
                        <button mat-button color="primary" (click)="AAC.CallBackConfiemed(1)">Confirm CallBack&nbsp;&nbsp;</button>
                    </span>
                            <span style="font-size: 150%">{{AAC.CallBackTimerStr}}</span>
                        </mat-grid-tile>
                        <mat-grid-tile [colspan]="1" [rowspan]="2">
                            <button mat-button (click)="AAC.toggleCall()">
                                <i class={{AAC.fa_step_forward}}></i>
                                <i style="font-size: 12px">&nbsp;&nbsp;{{AAC.callsCount}}</i>
                            </button>
                        </mat-grid-tile>
                        <mat-grid-tile [colspan]="2" [rowspan]="2">
                        </mat-grid-tile>
                        <!-- -----answer button ----------- -->
                        <mat-grid-tile [colspan]="1" [rowspan]="2">
                            <button mat-button >
                        <span [ngSwitch]="AAC.CurrentAgentStatus" >
                            <img *ngSwitchCase="'RINGING'" class="accimg activatBlink"
                                 title="Answer Call" src={{AAC.Answer.Array[AAC.answerIdx].img}} (click)='answerCall()'>
                            <img *ngSwitchCase="'Busy'" class="accimg"
                                 title="Disconnect Call" src="assets/images/acc/DISONNECT_call_01.jpg" (click)='disconnectCall()'>
                            <img *ngSwitchCase="'ACD'" class="accimg"
                                 title="Disconnect Call" src="assets/images/acc/DISONNECT_call_01.jpg" (click)='disconnectCall()'>
                            <img *ngSwitchCase="'OACD'" class="accimg"
                                 title="Disconnect Call" src="assets/images/acc/DISONNECT_call_01.jpg" (click)='disconnectCall()'>
                            <img *ngSwitchDefault class="accimg"
                                 style="filter: grayscale(100%);" src={{AAC.Answer.Array[AAC.answerIdx].img}} (click)='answerCall()' >
                        </span>
                                <!--span >
                                    <img *ngIf="(!AAC.CurrentAgentStatus.includes('RINGING') && !AAC.CurrentAgentStatus.includes('Busy'))" class="accimg"
                                         style="filter: grayscale(100%);" src={{AAC.Answer.Array[AAC.answerIdx].img}} (click)='answerCall()' >
                                    <img *ngIf="AAC.CurrentAgentStatus == 'RINGING'" class="accimg activatBlink"
                                         title="Answer Call" src={{AAC.Answer.Array[AAC.answerIdx].img}} (click)='answerCall()'>
                                    <img *ngIf="AAC.CurrentAgentStatus == 'Busy'" class="accimg"
                                         title="Disconnect Call" src="assets/images/acc/DISONNECT_call_01.jpg" (click)='disconnectCall()'>
                                </span-->
                            </button>
                        </mat-grid-tile>
                        <mat-grid-tile [colspan]="4" [rowspan]="1">
                        </mat-grid-tile>
                        <!--button type="button" class="btn btn-primary" data-mdb-ripple-init>Button</button-->
                    </mat-grid-list>


                <!--(3) ================== Call info details =======================-->
                <mat-expansion-panel [expanded]="CFstep" hideToggle="true" class="callinfo">
                    <mat-expansion-panel-header style="max-height: 03px">
                    </mat-expansion-panel-header>
                    <div *ngFor="let dog of CurrentCP; let i = index" >
                        <!-- div style='margin-left: -5px;line-height: 13px;' -->
                        <div style='margin-left: -5px'>
                            <label style="font-size: 0.90em; width:48%;text-align: left">{{dog.Key}}</label>
                            <label style="font-size: 0.80em; width:52%;text-align: left;font-weight:bold">{{dog.Desc}}</label>
                        </div>
                    </div>
                </mat-expansion-panel>
                <div class="exp-txt">
                    <button type="button" (click)="toggleStep()" class="btn btn-info">{{'Call Details' | translate}}&nbsp;<i
                            class={{infoUpDown}}></i>&nbsp;{{'Info' | translate}}</button>
                </div>
            </div>


        </mdb-side-nav>
 */
