import {Component, Injectable, OnDestroy, OnInit} from "@angular/core";
import {AccAgentService} from "../acc-agent.service";
import {of, Observable, from, pipe, Subscription, find, filter, OperatorFunction} from "rxjs";
import {OneCall} from "../one-call.interface";
import {map} from "rxjs/operators";
import {MsgGroup} from "../../../stories/sb-main-desk/chat/chat.component";
import {BubbleModel} from "../../../stories/sb-main-desk/chat/bubble/bubble.model";
import {error} from "protractor";
import {statusLabel_new} from "../../../stories/sb-main-desk/call-bar/status-label/status-label.component";
import {AccCallProfileComponent} from "./acc-call-profile.component";
import {CALL_TYPE} from "../data-model.interface";




@Injectable({
    providedIn: 'root'
})
export class AccCallProfileService {

    constructor() {}
    //ngOnInit(): void {}
    private AAC: AccAgentService;
    setAAC(aac: AccAgentService) {
        this.AAC = aac;
    }

    getAAC() {
        return this.AAC;
    }

    get ca() {return from(this.AAC.callsArray);}
    getOC: OperatorFunction<number, OneCall> = map((index: number) => {return this.AAC.callsArray[index]}); //{return from(this.AAC.callsArray);}

    /*let customerChatName = this.GetCPFValueByName('OMNI-CHAT-Content Name', this.callsArray[index]);
    let customerChatDisplayName = this.GetCPFValueByName('OMNI-CHAT-Content Display Name', this.callsArray[index]);
    let customerChatPhone = this.GetCPFValueByName('OMNI-CHAT-Content Phone', this.callsArray[index]);
    let customerChatId = this.GetCPFValueByName('OMNI-CHAT-Content Id', this.callsArray[index]);
    let customerEMailUser = this.GetCPFValueByName('OMNI-EMAIL-Content User', this.callsArray[index]);
    let customerEMailMessageId = this.GetCPFValueByName('OMNI-EMAIL-Content Message Id', this.callsArray[index]);
    let customerEMailSubject = this.GetCPFValueByName('OMNI-EMAIL-Content Subject', this.callsArray[index]);
    let customerEMailSender = this.GetCPFValueByName('OMNI-EMAIL-Content Sender', this.callsArray[index]);
    let customerEMailDatetime = this.GetCPFValueByName('OMNI-EMAIL-Content Datetime', this.callsArray[index]);
    let customerEMailFrom = this.GetCPFValueByName('OMNI-EMAIL-Content From', this.callsArray[index]);
    let customerEMailTo = this.GetCPFValueByName('OMNI-EMAIL-Content To', this.callsArray[index]);
    let customerEMailBody = this.GetCPFValueByName('OMNI-EMAIL-Content Body', this.callsArray[index]);
    let customerEMailFolder = this.GetCPFValueByName('OMNI-EMAIL-Content Attachment Folder', this.callsArray[index]);
    let customerEMailAttachment = this.GetCPFValueByName('OMNI-EMAIL-Content Attachment', this.callsArray[index]);*/

    //static customerChatName = map((oc: OneCall) => this.AAC.GetCPFValueByName('OMNI-CHAT-Content Name', oc));
    customerChatDisplayName(oc: OneCall): BubbleModel {
        let bubbleModel: BubbleModel = null;
        of(oc).pipe(
            map((oc: OneCall) => this.AAC?.GetCPFValueByName('OMNI-CHAT-Content Display Name', oc)),
            map((msg: string) => {
                let messages: BubbleModel =
                    {
                        msgId: 1,
                        participant: "Agent",
                        checkMark: "Timer",
                        message: msg,
                        date: new Date(Date.now())
                    };

                return messages
            }))
            .subscribe(value => {bubbleModel = value});

        return bubbleModel;
    }

    customerChatName1(oc: OneCall): Observable<any> {
        return of(this.AAC.GetCPFValueByName('OMNI-CHAT-Content Name', oc));
    }

    public test: string =  "test-string";

    static toBubbleModel = map((msg: string) => {
        let messages: BubbleModel =
                {
                    msgId: 1,
                    participant: "Customer",
                    checkMark: "Timer",
                    message: msg,
                    date: new Date(Date.now())
                };

        return messages
    });


    public initChatLog(index: number) {

        //let aac = this.AAC;
        let customerChatName =
            map((oc: OneCall) => this.AAC.GetCPFValueByName('OMNI-CHAT-Content Name', oc));

        if (this.AAC.callsArray && this.AAC.callsArray[index]) {
            let oc = of(this.AAC.callsArray[index]);
            let oc1: BubbleModel;
            oc.pipe(
                customerChatName,
                AccCallProfileService.toBubbleModel
            ).subscribe((value) => {oc1 = value});

            let customerChatPhone = this.AAC.GetCPFValueByName('OMNI-CHAT-Content Phone', this.AAC.callsArray[index]);
            let customerChatId = this.AAC.GetCPFValueByName('OMNI-CHAT-Content Id', this.AAC.callsArray[index]);

            this.AAC.callsArray[index].m_chatLog = [
                [
                    // oc1,
                    // {msgId: 2, participant: "Customer", checkMark: "Timer", date: new Date(Date.now()), message: customerChatPhone},
                    // {msgId: 2, participant: "Customer", checkMark: "Timer", date: new Date(Date.now()), message: customerChatId}
                ]
        ]
        }
    }

    public initChannelType(index: number ,media: string)
    {
        if(media == "2")
            return "chat";
        if(media == "3")
            return "email";
        return "voice";
    }

    public initSessionDetails(index: number) {

        //let aac = this.AAC;
        let customerName = "";
        let getOneCallByIndex: OperatorFunction<number, OneCall> =
            map((index: number) => {return this.AAC.callsArray[index]});

        let media = this.AAC.GetCPFValueByName('Media', this.AAC.callsArray[index])

        if(media == "2") //chat
        {
            let getCustomerChatName: OperatorFunction<OneCall, string> =
                map((oc) => {return this.AAC.GetCPFValueByName('OMNI-CHAT-Content Name', oc)});

            of(index).pipe(getOneCallByIndex, getCustomerChatName).subscribe(chatName => customerName = chatName);
        }
        else
        {  //email
            let getCustomerEmailName: OperatorFunction<OneCall, string> =
                map((oc) => {return this.AAC.GetCPFValueByName('OMNI-EMAIL-Content From', oc)});
            of(index).pipe(getOneCallByIndex, getCustomerEmailName).subscribe(emailName => customerName = emailName);
        }

        /*of(index).pipe(getOneCallByIndex).subscribe(oc => customerChatName = aac.GetCPFValueByName('OMNI-CHAT-Content Name', oc));
        this.ca.pipe(find<OneCall>(oc => oc.m_CallId === "1"))
            .subscribe(x => {customerChatName = aac.GetCPFValueByName('OMNI-CHAT-Content Name', x)});*/

        if(customerName.length > 22)
        {
            customerName = customerName.substring(0,22);
            customerName = customerName.concat("...");
        }

        this.AAC.callsArray[index].m_sessionDetails = {
            m_CallId: this.AAC.callsArray[index].m_CallId,
            channelType: this.initChannelType(index ,media),
            lastMessage: "...הודעה חדשה שהתקבלה",
            lastMessageTime: new Date(Date.now()),
            //lastBubble: this.AAC.callsArray[index].m_chatLog[0][0],
            notification: false,
            status: statusLabel_new,
            checked: false,
            isGrayed: false,
            isShowItem: true,
            customerName: customerName,
            clicked: false,
            summaryMessage: ""
        }
    }

    //ngOnDestroy(): void {}


}
