import {Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AccAgentService} from "../../AccAgent/acc-agent.service";
import {ASPs, Status} from "../../../stories/right-bar/export-result/agent-status/agent-status.component";
import {Event} from "@angular/router";
import {Subscription} from "rxjs";
import {ChatLog} from "../../../stories/sb-main-desk/chat/chat.component";
import {MainDeskComponent} from "./main-desk/main-desk.component";
import {AgentStatus} from "../../AccAgent/data-model.interface";
import {CallBarComponent} from "../../../stories/sb-main-desk/call-bar/call-bar.component";
import {CallsBarComponent} from "./calls-bar/calls-bar.component";

@Component({
  selector: 'acc-omni-page',
  templateUrl: './acc-omni-page.component.html',
  styleUrls: ['./acc-omni-page.components.scss']
})
export class AccOmniPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private currentAgentStatus: AgentStatus;   //Indicate the current status of the agent on Server
  agentStatus: Status = ASPs.logon.mStatus;  //Indicate the current status display on UI
  @Output() togglePhone = new EventEmitter<any>();
  @ViewChild('maindesk') public mainDesk: MainDeskComponent;
  @ViewChild('callsbar') public callsBar: CallsBarComponent;
  onViewSessionId: string;

  public mChatLog1: ChatLog = [
    [
      { msgId: 1, participant: "Customer", checkMark: "Timer", date: new Date(), message: "שלום," },
      { msgId: 2, participant: "Customer", checkMark: "Timer", date: new Date(), message: " קניתי אצלכם טלפון חכם לפני שבוע והוא לא נדלק"}
    ],
    [
      { msgId: 3, participant: "Agent", checkMark: "Timer", date: new Date(), message: "שלום" },
      { msgId: 4, participant: "Agent", checkMark: "Timer", date: new Date(), message: "?אני מצטער לשמוע זאת. האם ניסית להטעין אותו" }
    ],
    [{ msgId: 5, participant: 'Customer', checkMark: 'Timer', date: new Date(), message: 'כן, ניסיתי להטעין אותו במשך לילה שלם'}],
    [
      { msgId: 6, participant: "Customer", checkMark: "Timer", date: new Date(), message: "שלום," },
      { msgId: 7, participant: "Customer", checkMark: "Timer", date: new Date(), message: " קניתי אצלכם טלפון חכם לפני שבוע והוא לא נדלק"}
    ],
    [
      { msgId: 8, participant: "Agent", checkMark: "Timer", date: new Date(), message: "שלום" },
      { msgId: 9, participant: "Agent", checkMark: "Timer", date: new Date(), message: "?אני מצטער לשמוע זאת. האם ניסית להטעין אותו" }
    ],
    [{ msgId: 10, participant: 'Customer', checkMark: 'Timer', date: new Date(), message: 'כן, ניסיתי להטעין אותו במשך לילה שלם'}],
    [
      { msgId: 11, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: 'הבנתי.'},
      { msgId: 12, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: 'נשמח להחליף את המכשיר. האם יש לך את חשבונית הקנייה'}
    ],
    [{ msgId: 13, participant: 'Customer', checkMark: 'Timer', date: new Date(), message: '.כן, יש לי'}],
    [
      { msgId: 14, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: '.מצוין'},
      { msgId: 15, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: '.תוכל להגיע לסניף הקרוב אליך עם החשבונית והמכשיר להחלפה'}
    ],
    [{ msgId: 16, participant: 'Customer', checkMark: 'Timer', date: new Date(), message: '?איפה הסניף הקרוב אלי'}],
    [{ msgId: 17, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: '?איפה אתה גר'}],
    [{ msgId: 18, participant: 'Customer', checkMark: 'Timer', date: new Date(), message: '.בתל אביב'}],
    [
      { msgId: 19, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: '.הסניף הקרוב נמצא ברחוב דיזנגוף 50 '},
      { msgId: 20, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: '.פתוח בין 9:00 ל-21:00'}
    ],
    [{ msgId: 17, participant: 'Customer', checkMark: 'Timer', date: new Date(), message: '.תודה רבה'}],
    [
      { msgId: 19, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: '.בשמחה'},
      { msgId: 20, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: '?האם יש עוד משהו שאוכל לעזור בו'}
    ],
    [{ msgId: 21, participant: 'Customer', checkMark: 'Timer', date: new Date(), message: '.לא, זה הכל. תודה'}],
    [{ msgId: 22, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: '!בבקשה. שיהיה לך יום טוב'}]

  ];
  public mChatLog2: ChatLog = [
    [{ msgId: 1, participant: 'Customer', checkMark: 'Timer', date: new Date(), message: '.היי, אני רוצה לבטל הזמנה שביצעתי אתמול'}],
    [{ msgId: 2, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: '?שלום, אשמח לעזור. האם יש לך את מספר ההזמנה'}],
    [{ msgId: 3, participant: 'Customer', checkMark: 'Timer', date: new Date(), message: 'כן, הנה: #12345.'}],
    [{ msgId: 4, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: '?תודה. אני רואה את ההזמנה כאן. מה הסיבה לביטול'}],
    [{ msgId: 5, participant: 'Customer', checkMark: 'Timer', date: new Date(), message: 'מצאתי מוצר דומה במחיר יותר זול.'}],
    [{ msgId: 6, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: '?הבנתי. האם תרצה שאבדוק אם נוכל להתאים את המחיר'}],
    [{ msgId: 7, participant: 'Customer', checkMark: 'Timer', date: new Date(), message: 'לא, תודה. אני מעדיף פשוט לבטל.'}],
    [{ msgId: 8, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: '.בסדר. אני מבטל את ההזמנה כעת. הכסף יוחזר לחשבונך תוך 3-5 ימי עסקים'}],
    [{ msgId: 9, participant: 'Customer', checkMark: 'Timer', date: new Date(), message: '.תודה רבה'}],
    [{ msgId: 10, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: '?בבקשה. האם יש עוד משהו שאוכל לעזור בו'}],
    [{ msgId: 11, participant: 'Customer', checkMark: 'Timer', date: new Date(), message: 'לא, זה הכל.'}],
    [{ msgId: 12, participant: 'Agent', checkMark: 'Timer', date: new Date(), message: '!אוקיי. תודה שפנית אלינו ושיהיה לך יום נעים'}],
  ];


  constructor(private AAC: AccAgentService) {}

  onChangeStatusRequest(requestedStatus: Status) {
    let loginRequestedStatus = requestedStatus == ASPs.login.mStatus;
    let loginCurrentStatus =  this.currentAgentStatus != AgentStatus.Logout;

    console.log("loginRequestedStatus = " + loginRequestedStatus);
    console.log("loginCurrentStatus = " + loginCurrentStatus);
    console.log("verify function:  m_AgentStatus = " + this.CurrentStatus());
    if (loginRequestedStatus != loginCurrentStatus) {
      this.loginChanged(loginRequestedStatus ? "login" : "logout");
    }
  }

  loginChanged(action: string) {
    var b: boolean = false;
    if (this.AAC.userStatus.userReleased == false) {
      b = true;
    }
    this.AAC.PrepareAndPutNotification(action,
        action +
        ",000," +
        (this.AAC.agent?.m_AgentNo!) +", ," +
        (this.AAC.agent?.m_Extension!) + "," +
        String(b)
    );
  }

  onChangeSession(callId :string){
    this.onViewSessionId = callId;
  }

  CurrentStatus() { return this.currentAgentStatus; }

  get loginCurrentStatus(): Status {
    return (this.CurrentStatus() != AgentStatus.Logout ? ASPs.login.mStatus : ASPs.logon.mStatus);
  }




  ngOnInit(): void {
    this.AAC.setAccOMNIPage(this);
    this.subscription = this.AAC.variable$?.subscribe(variable => {
      var a;
      this.currentAgentStatus = variable;
      // AgentStatus has changed. Let's update the UI
      console.log(" change status:  m_AgentStatus = " + this.CurrentStatus());
      this.agentStatus = this.loginCurrentStatus;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
