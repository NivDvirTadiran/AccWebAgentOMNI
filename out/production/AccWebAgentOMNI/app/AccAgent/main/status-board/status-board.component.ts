import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {AccAgentService} from "../../acc-agent.service";
import {Key_Desc} from "../../data-model.interface";

@Component({
  selector: 'status-board',
  templateUrl: './status-board.component.html',
  styleUrls: ['./status-board.component.scss']
})
export class StatusBoardComponent implements OnInit {

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  @ViewChild('timer', {static: false}) timer?: ElementRef;

  public updateTimer(time: string) {
    this.renderer.setProperty(this.timer?.nativeElement, 'innerHTML', time);
  }

  @Input() AAC: AccAgentService = null;

  // ------ [CFstep ] ------------------
  infoUpDown: string = "fa fa-angle-double-down";
  CFstep: boolean = false;

  toggleStep() {
    if (this.CFstep == false) {
      this.CFstep = true;
      this.infoUpDown = "fa fa-angle-double-up";
    } else {
      this.CFstep = false;
      this.infoUpDown = "fa fa-angle-double-down";
    }
    //this.step = index;
  }


  setStep(flag: boolean) {
    this.CFstep = flag;

  }

  public CurrentCP: Key_Desc[] = [];

  //@Output() onAnswerCall: EventEmitter<any> = new EventEmitter<any> ();
  @Output() onDisconnectCall: EventEmitter<void> = new EventEmitter<void>();
  @Output() onAnswerCall: EventEmitter<void> = new EventEmitter<void>();

}


/*<mdb-navbar   *ngIf=false>
        <!-- ======(2) Timer area strat ===================== fa-step-forward================ -->
        <div  class="card">
            <div style="height:80px; display: table" class="container card-body">
                <!-- ----- status timer  ----------- -->
                <div  class="row timer" style=" color: #07185a" >
                    <span #timer *ngIf="AAC.NoConnectionToAcc != true" style="font-size: 70%;">00:00:00</span>
                </div>
                <!-- ----- calls counter ----------- -->
                <div class="row pause-icon">
                    <span style=" color: #07185a;font-size: 70%;padding-left: 3%;padding-right: 3%">
                        <i>{{AAC.curentCall}}</i>
                    </span>
                </div>
                <div class="row font-size: 14px">
                    <div class="col" style="font-size:11px"></div>
                    <div class="col" style="font-size:11px"></div>
                    <div class="col" style="font-size:11px"></div>
                    <div class="col" style="font-size:11px">
                    {{AAC.agent_note}}
                    </div>
                </div>
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
                <div class="row " >
                    <div class="col-md-8" [ngStyle.md]=""></div>
                    <div class="col-md-4" style="display: table; text-align: -webkit-right">

                            <button style="height:100%;border-color: snow;width: 70%;" >
                                <span  [ngSwitch]="AAC.CurrentAgentStatus" >
                                    <img  *ngSwitchCase="'RINGING'" class="img-thumbnail  activatBlink"
                                          title="Answer Call" src={{AAC.Answer.Array[AAC.answerIdx].img}} (click)='answerCall()' alt="...">
                                    <img *ngSwitchCase="'Busy'" class="img-thumbnail "
                                         title="Disconnect Call" src="assets/images/acc/DISONNECT_call_01.jpg" (click)='disconnectCall()' alt="...">
                                    <img *ngSwitchCase="'ACD'" class="img-thumbnail "
                                         title="Disconnect Call" src="assets/images/acc/DISONNECT_call_01.jpg" (click)='disconnectCall()' alt="...">
                                    <img *ngSwitchCase="'OACD'" class="img-thumbnail "
                                         title="Disconnect Call" src="assets/images/acc/DISONNECT_call_01.jpg" (click)='disconnectCall()' alt="...">
                                    <img *ngSwitchDefault class="img-thumbnail"
                                         style="filter: grayscale(100%);" src={{AAC.Answer.Array[AAC.answerIdx].img}} (click)='answerCall()' alt="...">
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
                    </div>
                </div>

                <!--button type="button" class="btn btn-primary" data-mdb-ripple-init>Button</button-->
            </div>


            <!--(3) ================== Call info details =======================-->

            <mat-expansion-panel [expanded]="CFstep" hideToggle="true" class="callinfo">
                <mat-expansion-panel-header style="max-height: 03px">
                </mat-expansion-panel-header>
                <div *ngFor="let dog of CurrentCP; let i = index" >
                    <!-- div style='margin-left: -5px;line-height: 13px;' -->
                    <div style='margin-left: -5px'>
                        <label mdbLabel style="font-size: 0.90em; width:48%;text-align: left">{{dog.Key}}</label>
                        <label mdbLabel style="font-size: 0.80em; width:52%;text-align: center;font-weight:bold">{{dog.Desc}}</label>
                    </div>
                </div>
            </mat-expansion-panel>

            <!--div class="exp-txt">

            </div-->
        </div>
        <ul style="text-align: center;margin: 0;" >
            <li class="page-item"  mdbWavesEffect>
                <a class="page-link" (click)="toggleStep()"  aria-label="Previous"
                   style="border-color: transparent;background-color: transparent;font-size: xx-small;height: inherit">
                    {{'Call Details' | translate}}&nbsp;<i class={{infoUpDown}}></i>&nbsp;{{'Info' | translate}}
                    <span aria-hidden="true"></span>
                </a>
            </li>
        </ul>

        <!--i class="btn" (click)="toggleStep()" >{{'Call Details' | translate}}&nbsp;<i class={{infoUpDown}}></i>&nbsp;{{'Info' | translate}}</i-->
        <!--button type="button" (click)="toggleStep()" class="btn"></button-->
    </mdb-navbar>*/
