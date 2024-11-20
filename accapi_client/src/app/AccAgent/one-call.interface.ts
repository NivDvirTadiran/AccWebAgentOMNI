


//params":"1539238223,1001,established,inbound,,2001,2003,2001,2001,,-1,-1,1,,N"}]
//params":"1539575905,1001,established,inbound,,2001,2003,2001,2001,5001,-1,-1,4,,ACD"
import {AccCallState, Key_Desc} from "./data-model.interface";
import {ChatLog} from "../../stories/sb-main-desk/chat/chat.component";
import {CallItemModel} from "../../stories/sb-call-bar/call-list/CallsListNew/CallItem/callItem.model";

export class OneCall
{
    public m_Direction = "";       //  3 - more detailed
    public m_CallId: string  = ""; // 12 -
    public m_Acd: string  = "";    // 14 -
    public m_From: string  = "";   //  6
    public m_To: string  = "";     //  7
    public m_To1: string = "";
    public m_JoiningCalled = "";    // 8
    public m_OriginalCalled = "";   // 9
    public m_LastRedirect = "";     // 10
    public m_CallState: AccCallState =    AccCallState.DontCare;
    public m_CallPrevState: AccCallState = AccCallState.DontCare;
    public m_StartStatusDate:Date = new Date();
    public m_EndStatusDate:Date = new Date();
    public m_CP:Key_Desc[] = [];
    public m_DeliveredResponse:any[] = [];
    public m_AcdGroup:string = "";
    public m_CallType:number = -25; //
    public m_CallCause: number = -31;
    public m_CurEvent: string = "";
    public m_whisper: string = "";

    //OMNI-DATA
    public m_chatLog: ChatLog = [];
    public m_sessionDetails: CallItemModel;

    //
    constructor(callId:string)
    {
        this.m_CallId = callId;
    }

    initChatLog() {
        this.m_chatLog = [
            [
                {msgId: 1, participant: "Customer", checkMark: "Timer", date: new Date(), message: this.customerChatDisplayName},
                {msgId: 2, participant: "Customer", checkMark: "Timer", date: new Date(), message: this.customerChatPhone},
                {msgId: 2, participant: "Customer", checkMark: "Timer", date: new Date(), message: this.customerChatId}
            ]
        ]
    }

    get customerChatDisplayName() { return customerChatDisplayName(this); }
    get customerChatPhone() { return customerChatPhone(this); }
    get customerChatId() { return customerChatId(this); }


}


function customerChatDisplayName(oc: OneCall) {
    return this.AAC.GetCPFValueByName('OMNI-CHAT-Content Display Name', oc);
}
function customerChatPhone(oc: OneCall) {
    return this.AAC.GetCPFValueByName('OMNI-CHAT-Content Phone', oc);
}
function customerChatId(oc: OneCall) {
    return this.AAC.GetCPFValueByName('OMNI-CHAT-Content Id', oc);
}
