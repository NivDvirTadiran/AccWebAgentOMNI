
export interface etasIniButtons {
    Button: string,
    row: number
}
export class accButtonInIni{
    Button:string;
    data: string;
    constructor(button:string, data:string)
    {
        this.Button = button;
        this.data = data;
    }
}
export class TelActionIni{

    Idx:string;
    Caption: string;
    Function: string;
    Data: string;
    //
    constructor(idx:string, caption:string,functionX:string,data:string )
    {
        this.Idx        = idx;
        this.Caption    = caption;
        this.Function   = functionX;
        this.Data       = data;
        }
}
export class accbutton {
    public id: string;
    public title: string;
    public description: string;
    public class: string;
    public color: string;
    public click: any;
    public canDrag:boolean;
    public isMust:boolean;
    public img: string;
    public isSet:boolean;
    public code:string;
    public data:string;
    public titlesrc:string;
    public datatype: string;
    public isdisable?:boolean;
    public setClass?: string;

    constructor(idx, titlex, classx, colorx, clickxx, imgx,candrag, ismust,description,code,datatype) {
        this.id = idx;
        this.title = titlex;
        this.titlesrc = titlex;
        this.class = classx;
        this.color = colorx;
        this.click = clickxx;
        this.img = imgx;
        this.canDrag = candrag;
        this.isMust = ismust;
        this.isSet = false;
        this.description = description;
        this.code = code;
        this.data = "";
        this.datatype = datatype;
    }
}

export interface AccOneButton {
    Code: string;
    title: string;
    class: string;
    style: string;
    color: string;
    img: string;
    isdisable?: boolean;
}
export interface AccOneButton2 {
    type: string;
    id: string;
    Count: number;
    Description: string;
    click: string;
    must:  boolean;
    datatype: string;
    candrag : boolean;
    Array: AccOneButton[];
}




export const AccButtons: AccOneButton2[] = [
    {
        type: "TEL", must: false, datatype: "string", candrag: true, id:"phonenumberId", Count: 1, click: "phonenumber",
        Description: "Phone number for telephony window",
        Array: [{
            Code: "PhoneNumber",
            title: "Phone #",
            class: "",
            style: "",
            color: "white",
            img: ""
        }]
    },
    {
        type: "TEL", must: false, datatype: "none", candrag: true, id:"alternateCallId", Count: 1, click: "swapcall",
        Description: "Swaps the call on HOLD with the Connected call",
        Array: [{
            Code: "Alternate",
            title: "Swap Calls",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/call transfer icon2-01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "none", candrag: true, id:"answerCallId", Count: 2, click: "answerCall", Description: "Answer incoming call",
        Array: [{
            Code: "Answer",
            title: "Answer",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/tel_answer_a_call.jpg"
        }, {
            Code: "Answer",
            title: "Answer",
            class: "accimg activatBlink",
            style: "",
            color: "white",
            img: "assets/images/acc/tel_answer_a_call.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "none", candrag: true, id:"disconnectCallId", Count: 1, click: "disconnectCall",
        Description: "Disconnect the current call",
        Array: [{
            Code: "ClearConnection",
            title: "Disconnect",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/DISONNECT_call_01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "string", candrag: true, id:"ConsultationStartId", Count: 1, click: "startConsultation",
        Description: "Start Consultation",
        Array: [{
            Code: "StartConsultation",
            title: "Start Consultation",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/tel_consultation_start.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "string", candrag: true, id:"transferId", Count: 1, click: "transfer",
        Description: "Transfer Call",
        Array: [{
            Code: "TransferCall",
            title: "Transfer Call",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/call transfer icon-01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "none", candrag: true, id:"ConferenceCompleteId", Count: 1, click: "completeConference",
        Description: "Complete Conference",
        Array: [{
            Code: "CompleteConference",
            title: "Complete Conference",
            class: "accimg grayscale",
            style: "",
            color: "white",
            isdisable: true,
            img: "assets/images/acc/tel_conference_complete-01.jpg"
        },{
            Code: "CompleteConference",
            title: "Complete Conference",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/tel_conference_complete-01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "none", candrag: true, id:"TransferCompleteId", Count: 1, click: "completeTransfer",
        Description: "Complete Transfer",
        Array: [{
            Code: "CompleteTransfer",
            title: "Complete Transfer",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/COMPLETE call transfer icon-01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "none", candrag: true, id:"holdCallId", Count: 1, click: "holdCall",
        Description: "Place the call on HOLD",
        Array: [{
            Code: "Hold",
            title: "Hold",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/call pause-01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "none", candrag: true, id:"retrieveCallId", Count: 1, click: "retrieveCall",
        Description: "Retrieve the call from HOLD",
        Array: [{
            Code: "Retrieve",
            title: "Retrieve",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/call retrieve-01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "string", candrag: true, id:"callNumberId", Count: 1, click: "callNumber",
        Description: "Call the selected telephone number",
        Array: [{
            Code: "MakeNACall",
            title: "Call",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/MAKE A -call-01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "none", candrag: true, id:"reconnectCallId", Count: 1, click: "reconnectCall",
        Description: "Reconnect",
        Array: [{
            Code: "Reconnect",
            title: "Reconnect",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/tel_reconnect1.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "none", candrag: true, id:"CallbackReinsertBusyId", Count: 1, click: "CallbackReinsertBusy",
        Description: "Set Call back reinsert busy",
        Array: [{
            Code: "CallbackReinsertBusy",
            title: "Set Call back reinsert busy",
            class: "accimg grayscale",
            style: "",
            color: "white",
            img: "assets/images/acc/CB_Ind-Busy-01-01.jpg",
            isdisable: true
        },{
            Code: "CallbackReinsertBusy",
            title: "Set Call back reinsert busy",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/CB_Ind-Busy-01-01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "none", candrag: true, id:"CallbackReinsertNoAnswerId", Count: 1, click: "CallbackReinsertNoAnswer",
        Description: "Set Call back reinsert No Answer",
        Array: [{
            Code: "CallbackReinsertNoAnswer",
            title: "Set Call back reinsert No Answer",
            class: "accimg grayscale",
            style: "",
            color: "white",
            img: "assets/images/acc/CB_SetNoAnswer-01-01.jpg",
            isdisable: true
        },{
            Code: "CallbackReinsertNoAnswer",
            title: "Set Call back reinsert No Answer",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/CB_SetNoAnswer-01-01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "none", candrag: true, id:"CallbackReinsertTerminateId", Count: 1, click: "CallbackReinsertTerminate",
        Description: "Set Call back reinsert Terminate",
        Array: [{
            Code: "CallbackReinsertTerminate",
            title: "Set Call back reinsert Terminate",
            class: "accimg grayscale",
            style: "",
            color: "white",
            img: "assets/images/acc/CB_Ind-Terminate-01-01.jpg",
            isdisable: true
        },{
            Code: "CallbackReinsertTerminate",
            title: "Set Call back reinsert Terminate",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/CB_Ind-Terminate-01-01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "string", candrag: true, id:"breakInId", Count: 1, click: "breakIn",
        Description: "Break-In",
        Array: [{
            Code: "BrakeIn",
            title: "Break-In",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/tel_break_In-02-01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "none", candrag: true, id:"recordingOnId", Count: 2, click: "recordingOn",
        Description: "Recordin On / Off",
        Array: [{
            Code: "ActivateRecording",
            title: "Recording On",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/recording off-01.jp-01.jpg"
        }, {
            Code: "ActivateRecording",
            title: "Recording Off",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/recording on-01-01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "string", candrag: true, id:"SilentMonitorId", Count: 2, click: "silentmonitor",
        Description: "Silent Monitor",
        Array: [{
            Code: "SilentMonitor",
            title: "Silent Monitor On",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/tel_silent_In-01-01.jpg"
        }, {
            Code: "SilentMonitor",
            title: "Silent Monitor Off",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/tel_silent_In-01-01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "string", candrag: true, id:"WhisperId", Count: 2, click: "whisper",
        Description: "Whisper",
        Array: [{
            Code: "Whisper",
            title: "Whisper On",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/tel_whisper_In-01-01.jpg"
        }, {
            Code: "Whisper",
            title: "Whisper Off",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/tel_whisper_In-01-01.jpg"
        }]
    },
    {
        type: "TEL", must: false, datatype: "none", candrag: true, id:"RecordGreetingId", Count: 1, click: "RecordGreeting",
        Description: "Record Greeting",
        Array: [{
            Code: "RecordGreeting",
            title: "Start Record Greeting",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/tel_record_greeting-01.jpg"
        }]
    },
    {
        type: "ACD", must: true, datatype: "none", candrag: true, id:"ReadyId", Count: 1, click: "readyChanged",
        Description: "Manually end the WrapUp state and become ready for ACD",
        Array: [{
            Code: "AgentReady",
            title: "Ready",
            class: "accimg grayscale",
            style: "",
            color: "white",
            isdisable: true,
            img: "assets/images/acc/ready-01.jpg"
        }, {
            Code: "AgentReady",
            title: "End Wrapup",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/ready disable-01.jpg"
        }]
    },
    {
        type: "ACD", must: false, datatype: "string", candrag: true, id:"wraUpId", Count: 1, click: "WrapupCode",
        Description: "Enter WrapUp Code",
        Array: [{
            Code: "WrapupCode",
            title: "WrapUp Code",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/wrap up code-02.jpg"
        }]
    },
    {
        type: "ACD", must: false, datatype: "none", candrag: true, id:"wrapUpControldState", Count: 1, click: "wrapUpControldState",
        Description: "Control WrapUp state",
        Array: [{
            Code: "WrapupManualControl",
            title: "Wrapup manual control",
            class: "accimg grayscale",
            style: "",
            color: "white",
            img: "assets/images/acc/wrap up code-01.jpg"
        },{
            Code: "WrapupManualControl",
            title: "Wrapup manual control",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/wrap up code-01.jpg"
        }]
    },
    {
        type: "ACD", must: true, datatype: "none", candrag: false, id:"loginPrimaryId", Count: 2, click: "loginChanged",
        Description: "Login/Logout Primary ACD Groups",
        Array: [{
            Code: "LoginPrimaryGroups",
            title: "Login Primary Groups",
            class: "accimg",
            // class: "accimg huerotate",
            style: "",
            color: "white",
            img: "assets/images/acc/log out log in-01.jpg" 
       // img: "assets/images/acc/logout_01.jpg" log out log in-01.jpg
    }, {
            Code: "LoginPrimaryGroups",
            title: "Logout Primary Groups",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/log out log in1-01.jpg"
        }]
    },
    {
        type: "ACD", must: false, datatype: "string", candrag: true, id:"loginGroupId", Count: 3, click: "SelectOngroupOpen",
        Description: "Login to ACD group",
        Array: [{
            Code: "LoginGroup",
            title: "Login Group",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/manage_login_logout_group_03.jpg"
        },{
            Code: "LoginGroup",
            title: "Logout Group",
            class: "accimg bordergreen",
            style: "",
            color: "white",
            img: "assets/images/acc/manage_login_logout_group_02.jpg"
        },{
            Code: "LoginGroup",
            title: "Disable logout Group",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/manage_login_logout_group_02.jpg"
        }]
    },
    {
        type: "ACD", must: false, datatype: "none", candrag: true, id:"manageloginGroupsId", Count: 1, click: "managelogingroups",
        Description: "Manage the list of Login/Logout groups",
        Array: [{
            Code: "GroupsManager",
            title: "Groups Manager",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/agent setup-01.jpg"
        },{
            Code: "GroupsManager",
            title: "Groups Manager",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/agent setup-01.jpg"
        },{
            Code: "GroupsManager",
            title: "Groups Manager Not allowed",
            class: "accimg grayscale",
            style: "",
            color: "white",
            img: "assets/images/acc/agent setup-01.jpg"
        }]
    },
    {
        type: "ACD", must: true, datatype: "none", candrag: false, id:"releaseId", Count: 2, click: "releaseChanged",
        Description: "Release / Resume",
        Array: [{
            Code: "Release",
            title: "Resume",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/favourite contact2-01.jpg"
        }, {
            Code: "Resume",
            title: "Release",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/favourite contact-01.jpg"
        }]
    },
    {
        type: "ACD", must: false, datatype: "string", candrag: true, id:"transferToAgentNoId", Count: 1, click: "TransferToAgent",
        Description: "Perform transfer to Agent",
        Array: [{
            Code: "TransferToAgent",
            title: "Transfer to Agent",
            class: "accimg grayscale",
            style: "",
            color: "white",
            img: "assets/images/acc/transfer to agent-01.jpg",
            isdisable: true
        },{
            Code: "TransferToAgent",
            title: "Transfer to Agent",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/transfer to agent-01.jpg"
        }]
    },
    {
        type: "ACD", must: false, datatype: "none", candrag: true, id:"acd_get_supervisor_hepId", Count: 1, click: "SupervisorHelp",
        Description: "Ask for Supervisor Help",
        Array: [{
            Code: "SupervisorHelp",
            title: "Supervisor Help",
            class: "accimg grayscale",
            style: "",
            color: "white",
            img: "assets/images/acc/ring bell-01.jpg"
        },{
            Code: "SupervisorHelp",
            title: "Supervisor Help",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/ring bell-01.jpg"
        }]
    },
    {
        type: "ACD", must: false, datatype: "string", candrag: true, id:"releaseWithCodeId", Count: 1, click: "releaseWithCode",
        Description: "Release with Code",
        Array: [{
            Code: "ReleasewithCode",
            title: "Release with Code",
            class: "accimg",
            style: "",
            color: "white",
            img: "assets/images/acc/Release with Code + Show release codes list-01.jpg"
        }]
    },
    {
        type: "ACD", must: true, datatype: "none", candrag: true, id:"logoffId", Count: 1, click: "agentLogoff",
        Description: "Logout and Exit",
        Array: [{
            Code: "CloseAll",
            title: "Logout and Exit",
            class: "accpng",
            style: "",
            color: "white",
            img: "assets/images/acc/logoff.png"
        }]
    }
    // {
    //     type: "WIN", must: true, datatype: "none", candrag: false, id:"EmptyId", Count: 2, click: "AddButton",
    //     Description: "Add button",
    //     Array: [{
    //         Code: "Empty",
    //         title: "Add button",
    //         class: "accimg1",
    //         style: "",
    //         color: "white",
    //         img: "assets/images/acc/add_botton.jpg"
    //     },{
    //         Code: "Empty",
    //         title: "Add button Not Allowed",
    //         class: "accimg grayscale",
    //         style: "",
    //         color: "white",
    //         img: "assets/images/acc/add_botton.jpg"
    //     }]
    // }

];

// ,
//     {
//         type: "WIN", must: false, datatype: "none", candrag: true, id:"OpenCallsLogId", Count: 1, click: "OpenCallsLog",
//         Description: "Open Calls Log window",
//         Array: [{
//             Code: "OpenCallsLog",
//             title: "Calls Log",
//             class: "accimg",
//             style: "",
//             color: "white",
//             img: "assets/images/acc/call_window-01.jpg"
//         }]
//     },
//     {
//         type: "WIN", must: false, datatype: "none", candrag: true, id:"OpenCallsStatusId", Count: 1, click: "OpenCallsStatus",
//         Description: "Open Calls Status window",
//         Array: [{
//             Code: "OpenCallsStatus",
//             title: "Calls Status",
//             class: "accpng",
//             style: "",
//             color: "white",
//             img: "assets/images/acc/bw_callstatus.png"
//         }]
//     },
//     {
//         type: "WIN", must: false, datatype: "none", candrag: true, id:"OpenAcdCallsId", Count: 1, click: "OpenAcdCalls",
//         Description: "Open ACD Calls window",
//         Array: [{
//             Code: "OpenAcdCalls",
//             title: "ACD Calls",
//             class: "accpng",
//             style: "",
//             color: "white",
//             img: "assets/images/acc/bw_acdcalls.png"
//         }]
//     },
//     {
//         type: "WIN", must: false, datatype: "none", candrag: true, id:"OpenPhoneBookId", Count: 1, click: "OpenPhoneBook",
//         Description: "Open Phone Book",
//         Array: [{
//             Code: "OpenPhoneBook",
//             title: "Phone Book",
//             class: "accpng",
//             style: "",
//             color: "white",
//             img: "assets/images/acc/bw_telephony.png"
//         }]
//     },
//     {
//         type: "WIN", must: false, datatype: "none", candrag: true, id:"OpenSetupId", Count: 1, click: "OpenSetup",
//         Description: "Open Setup window",
//         Array: [{
//             Code: "OpenSetup",
//             title: "Agent Setup",
//             class: "accpng",
//             style: "",
//             color: "white",
//             img: "assets/images/acc/bw_setup.png"
//         }]
//     },
//     {
//         type: "WIN", must: true, datatype: "none", candrag: false, id:"EmptyId", Count: 1, click: "Empty",
//         Description: "Do Nothing",
//         Array: [{
//             Code: "Empty",
//             title: "Add button",
//             class: "accimg",
//             style: "",
//             color: "white",
//             img: "assets/images/acc/empty.jpg"
//         }]
//     }

//
 
