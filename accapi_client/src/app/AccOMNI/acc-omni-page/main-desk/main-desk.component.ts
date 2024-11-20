import {Component, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import {TypeBar} from "src/stories/sb-main-desk/typing-bar-reply/frame-136/type-bar/type-bar.model";
import * as mTypeBar from "src/stories/sb-main-desk/typing-bar-reply/frame-136/type-bar/type-bar.stories";
import {AccAgentService} from "src/app/AccAgent/acc-agent.service";
import {ChatLog, MsgGroup} from "src/stories/sb-main-desk/chat/chat.component";
import {MainDaskData} from "src/stories/sb-main-desk/sb-main-desk.component";
import {CallItemModel} from "../../../../stories/sb-call-bar/call-list/CallsListNew/CallItem/callItem.model";
import {expand, of, OperatorFunction} from "rxjs";
import {OneCall} from "src/app/AccAgent/one-call.interface";
import {AIService} from "src/app/AccOMNI/ai/ai.service";
import {filter, map, take, tap} from "rxjs/operators";
import {environment} from "src/environments/environment";



@Component({
  selector: 'main-desk',
  templateUrl: './main-desk.component.html',
  styleUrls: ['./main-desk.component.css']
})
export class MainDeskComponent implements OnInit, OnChanges {

    @Input() public chatLog: ChatLog = [];
    @Input() public onViewSessionId: string;

    public activeSession: CallItemModel;
    public messages: MsgGroup = [
        {
            msgId: 1,
            participant: "Agent",
            checkMark: "Timer",
            message: "Hello, how can I help you?",
            date: new Date()
        },
        {
            msgId: 2,
            participant: "Customer",
            checkMark: "Timer",
            message: "I am facing an issue with my order.",
            date: new Date()
        },
        {
            msgId: 3,
            participant: 'Agent',
            checkMark: 'Timer',
            message: 'Could you please provide your order number?',
            date: new Date()
        }
    ];
    public messages2: MsgGroup = [
        {
            msgId: 1,
            participant: "Agent",
            checkMark: "Timer",
            message: "Hello, how can I help you?",
            date: new Date()
        },
        {
            msgId: 2,
            participant: "Customer",
            checkMark: "Timer",
            message: "I am facing an issue with my order.",
            date: new Date()
        },
        {
            msgId: 3,
            participant: 'Agent',
            checkMark: 'Timer',
            message: 'Could you please provide your order number?',
            date: new Date()
        }
    ];


    constructor(private AAC: AccAgentService,
                private ai: AIService,
                private renderer: Renderer2) {}


    public mainDaskData: MainDaskData = {
        typingBarReply:  new FormGroup({ message: new FormControl('')}),
        isLoading: true,
        saveDetailErrorMessage: {},
        chatLog: this.chatLog
    }

  typeBarsInOrder: TypeBar[]  = [
    {...mTypeBar.Message.args?.['typeBar'], id: '1', title: ""  }
  ];



  ngOnChanges(changes: SimpleChanges): void {
      if (changes.onViewSessionId) {
          const foundCall = this.allCalls.find(oc => oc.m_CallId === changes.onViewSessionId.currentValue);
          if (foundCall) {
              this.mainDaskData.chatLog = foundCall.m_chatLog;
              this.activeSession = foundCall.m_sessionDetails;

              if (environment.openAi) {
                  if (this.mainDaskData.chatLog.length == 1)
                      this.ai.initBot().then((msg) => { this.sendChatMes(msg); });
              }
          }
      }
  }


  get allCalls(): OneCall[] {
      return this.AAC.callsArray.concat(this.AAC.callsLog);
  }

  public receiveChatMes(message: string, callId: string) {
      let oc: OneCall = this.allCalls.find(oc => oc.m_CallId == callId);
      let chatLog = oc.m_chatLog;
      const newMessage: MsgGroup = [{
          msgId: this.markNewMessageWithId(chatLog),
          participant: 'Customer',
          checkMark: 'Timer',
          message: message,
          date: new Date()
      }];

      oc.m_sessionDetails.lastMessage = message;
      oc.m_sessionDetails.lastMessageTime = new Date(Date.now());

      of(chatLog).pipe(
          tap((cL: ChatLog) => {cL.push(newMessage); return of(cL);}),
          tap((cL) => this.updateChatLog(cL, callId)))
          .subscribe((cL) => {
                  if (environment.openAi)
                      this.ai.toBot(message).then(msg => this.sendChatMes(msg, callId));
          });
  }

  public sendChatMes(message: string, callId?: string) {
      let oc: OneCall;
      if (callId)
          oc= this.allCalls.find(oc => oc.m_CallId == callId);
      else
          oc = this.allCalls.find(oc => oc.m_CallId == this.onViewSessionId);

      let chatLog = oc.m_chatLog;
      const newMessage: MsgGroup = [{
          msgId: this.markNewMessageWithId(chatLog),
          participant: 'Agent',
          checkMark: 'Timer',
          message: message,
          date: new Date()
      }];
      chatLog.push(newMessage);
      this.mainDaskData.chatLog = chatLog;

      this.updateChatLog(chatLog, oc.m_CallId).then(() => this.AAC.sendChatMes(message/*, oc.m_CallId*/));
  }

    closeSession(callId : string)
    {
        //this.AAC.sendCloseSession(callId);

        let oc: OneCall;
        if (callId)
            oc= this.allCalls.find(oc => oc.m_CallId == callId);
        else
            oc = this.allCalls.find(oc => oc.m_CallId == this.onViewSessionId);
        let mes = oc.m_sessionDetails.summaryMessage;
        let chatLog = oc.m_chatLog;
        const newMessage: MsgGroup = [{
            msgId: this.markNewMessageWithId(chatLog),
            participant: 'Summary',
            checkMark: 'Timer',
            message: mes,
            date: new Date()
        }];
        chatLog.push(newMessage);
        this.mainDaskData.chatLog = chatLog;

        this.updateChatLog(chatLog, oc.m_CallId).then(() => this.AAC.sendChatMes(mes, oc.m_CallId));
    }


    callId_ToIdxCA: OperatorFunction<string, number> =
      map((callId: string) => this.AAC.callsArray.map(oc => oc.m_CallId).indexOf(callId));
  callId_ToIdxCL: OperatorFunction<string, number> =
      map((callId: string) => this.AAC.callsLog.map(oc => oc.m_CallId).indexOf(callId));
  idxValidate: OperatorFunction<number, number> =
      filter((index: number) => (index != -1));


  updateChatLog(chatLog: ChatLog, callId: string): Promise<any> {

      function saveToCallsArray(cl: ChatLog): OperatorFunction<number, MsgGroup>
      { return expand((index: number) =>  this.callsArray[index].m_chatLog = cl) }

      function saveToCallsLog(cl: ChatLog): OperatorFunction<number, MsgGroup>
      { return expand((index: number) => this.callsLog[index].m_chatLog = cl) }


      return Promise.all([
          of(callId).pipe(this.callId_ToIdxCA, this.idxValidate, saveToCallsArray(chatLog)),
          of(callId).pipe(this.callId_ToIdxCL, this.idxValidate, saveToCallsLog(chatLog))
      ])
  }

  markNewMessageWithId(chatLog: ChatLog): number {
      if (chatLog.length > 0) {
          const lastGroup = chatLog[chatLog.length - 1];
          if (lastGroup.length > 0) {
              const lastMessage = lastGroup[lastGroup.length - 1];
              return lastMessage.msgId;
          }
      }

      return 0;

  }

  get message(): AbstractControl {
    return null; //this.mainDaskData.typingBarReply.get('message')!;
  }


    setMessage(message: string): void {
    this.mainDaskData.typingBarReply.get('message')?.setValue(message)!;
  }


  ngOnInit(): void {
  }

  onSendMessage(message: string) {
      this.sendChatMes(message);
  }
}
