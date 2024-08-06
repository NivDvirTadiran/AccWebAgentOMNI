//=================================================================
export class Key_Desc
{
    constructor(key:string, desc:string,id:string)
    {
        this.Key = key;
        this.Desc = desc;
        this.Id   = id;
        this.More = "";
        this.Flag = false;
    }

    public Key:string;
    public Desc:string;
    public Id:string;
    public More:string;
    public Flag:boolean;

}

//
export enum CALL_TYPE{
    ECT_NULL = 0,
    ECT_VOICE,
    ECT_CHAT,
    ECT_EMAIL,
    ECT_CALLBACK,
    ECT_ABANDONED,
    ECT_WEB_CALLBACK,
    ECT_CALL_FROM_LIST,
    ECT_CALL_FROM_CAMPAIGN_LIST,
    ECT_CALL_FROM_PREDICTIVE_LIST,
    ECT_CALL_FROM_CLICK_TO_DIAL_LIST,
    ECT_OUT_ACD,
    ECT_NUM_CALL_TYPES,
    ECT_CALL_CHAT
  };
//
export enum CALL_MEDIA{
    EMT_NULL = 0,
    EMT_VOICE,
    EMT_WEB,
    EMT_EMAIL,
    EMT_NUM_MEDIA_TYPES
  };  
//
export enum CALL_CAUSE{
    EC_UNKNOWN = 0,
    EC_ACTIVE_MONITOR,
    EC_ALTERNATE,
    EC_BLOCKED,
    EC_BUSY,
    EC_CALL_BACK,
    EC_CALL_CANCELLED,
    EC_CALL_FORWARD,
    EC_CALL_FD_IMMEDIATE,
    EC_CALL_FD_BUSY,
    EC_CALL_FD_NO_ANSWER,
    EC_CALL_NOT_ANSWERED,
    EC_CALL_PICKUP,
    EC_CAMP_ON,
    EC_CONSULTATION,
    EC_DEST_NOT_OBTAINABLE,
    EC_DISTRIBUTED,
    EC_DO_NOT_DISTURB,
    EC_ENTERING_DISTRIBUTION,
    EC_INCPT_DESTINATION,
    EC_INVALID_ACCOUNT_CODE,
    EC_KEY_OPERATION,
    EC_LOCKOUT,
    EC_MAINTENANCE,
    EC_MAKE_CALL,
    EC_NET_CONGESTION,
    EC_NET_NOT_OBTAINABLE,
    EC_NETWORK_SIGNAL,
    EC_NEW_CALL,
    EC_NO_AVAILABLE_AGENTS,
    EC_NORMAL_CLEARING,
    EC_NUMBER_CHANGED,
    EC_OVERFLOW,
    EC_OVERRIDE,
    EC_PARK,
    EC_RECALL,
    EC_REDIRECTED,
    EC_REORDER_TONE,
    EC_RESRCS_NOT_AVAILABLE,
    EC_SILENT_MONITOR,
    EC_SINGLE_STEP_CONFERENCE,
    EC_SINGLE_STEP_TRANSFER,
    EC_TIMEOUT,
    EC_TRANSFER,
    EC_TRUNKS_BUSY,
    EC_VOICE_UNIT_INITIATOR,
    EC_BARGE_IN,
    EC_WHISPER,
  
    EC_PRIVATE_CODES,
    EC_PASSIVE_CONN_BUSY,
    EC_CALL_REJECTED,
    //21-Feb-2010 YR MN1003260
    EC_NETWORK_REACHED, // add to identify the NetworkReached & Established
  
    //24-May-2017 YR BZ#42286
    EC_PCLESS_AGENT, // add to identify PCLess Agents logged in
    
    EC_NUM_CAUSES       // used for unknown ErCause_t
  }; 
//
export enum CP_CODES{
    NUL                   = '0',   // unused id
    DNIS                  = '1',   // DNIS of call
    ANI                   = '2',   // ANI (caller id) of caller
    PRIORITY              = '3',   // priority of call
    SERVICE_ID            = '4',   // service ID which will handle call
    CUSTOMER_NUMBER       = '5',   // identifier number of the customer
    CUSTOMER_NAME         = '6',   // if the call has an identifier customer
    ACD_ENTER_DATE        = '7',   // the date the call enter the acd
    ACD_ENTER_TIME        = '8',   // the time the call enter the acd
    Q_POSITION            = '9',   // the call position in the queue
    AVERAGE_Q_TIME        = '10',  // estimate of call waiting time in queue
    CALLBACK_TIME         = '11',  // callback time set's by caller (if empty - abandon)
    CALLBACK_DEST         = '12',  // callback destination
    SESSION_ID            = '13',  // session_id of CHAT call obtained from servlet
    LANGUAGE              = '14',  // language needed for chat-customer
    MEDIA                 = '15',  // call media (voice 1', chat 2', email 3)
    CALL_TYPE             = '16',
    DIAL_LIST_ID          = '17',  // the dial list that the call belongs to
    START_QUEUE_TIME      = '18',  // to store start_queue_time for callback call', asked for NOW
    AGENT_NUMBER          = '19',  // for Epic Light
    AGENT_PSW             = '20',  // for Epic Light
    AGENT_EXT             = '21',  // for Epic Light
    EXECUTE_REQ           = '22',  // for any request to be executed
    TRUNK_NUMBER          = '23',
    EMAIL_TO              = '24',  //
    EMAIL_CC              = '25',  //
    EMAIL_SUBJECT         = '26',  //
    EMAIL_FROM            = '27',  //
    EMAIL_REPLY_TO        = '28',
    EMAIL_SENT_DATE       = '29',  //
    EMAIL_SENT_TIME       = '30',  //
    EMAIL_ENTER_OMS_DATE  = '31',  //
    EMAIL_ENTER_OMS_TIME  = '32',  //
    PRIMARY_CB            = '33',
    ALTERNATIVE1_CB       = '34',
    ALTERNATIVE2_CB       = '35',
    LAST_TIME_TO_INITIATE_CB = '36',
    CSTA_CALL_ID          = '37',
    GROUP_ID              = '38',  
    OUTBOUND_CALLER_ID    = '39',
    GLOBAL_CID            = '40',
    CALL_ATTACHMENT1      = '41',
    CALL_ATTACHMENT2      = '42',
    CALL_ATTACHMENT3      = '43',
    CALL_ATTACHMENT4      = '44',
    RECORDING_FILE_NAME   = '45',
    USER_REQUEST          = '46',
    ANN_TO_AGENT          = '47',
    NO_CHARGE_CALL        = '48',
    SERVICE_NAME          = '49',  // service name which will handle call
    AGENT_CSTA_CALL_ID    = '50',  // CSTA CID of Agent
    OUTBOUND_CALL_DURATION = '51',
    CBS_CALL_ID           = '52',
    OUTBOUND_IRN          = '53',
    //16-Aug-2017 YR BZ#43948
    NETWORK_DEV           = '54',
    MANIPULATED_ANI       = '55',  //2018-07-18 AlisherM BZ#47338: add new call profile field for manipulated ani
    USER_START            = '100', // user fields start at this id
    USER_END              = '999', // user fields end at this id
    SKILL_START           = '1000',// skill fields start at this id
    SKILL_END             = '9999' // skill fields end at this id
  };

export enum COS{
    PICKUP_FROM_ACD_QUEUE       = 0,
    SPECIFIC_LOGIN              = 1,
    CHANGE_TOOLBAR_LAYOUT       = 2,
    CHANGE_WINDOWS_LAYOUT       = 3,
    WIN_CALL_STATUS             = 4,
    DISP_WIN_ACD_CALL           = 5,
    DISP_WIN_CALLS_LOG          = 6,
    DISP_WIN_SETUP              = 7, 
    DISP_WIN_TELEPHONY          = 8,
    DISP_WIN_AGENTBOARD         = 9,
    DISP_WIN_CHAT_TREE          = 10,
    ENABLE_DDE_FOR_OUTGOING     = 11
}

export enum E { makecall = 0, singlestep = 1, starttransfer, startconfernce, divert }

enum MU
{
    False = 0,
    True  = 1,
    DontCare = 2
}
export enum CallTypes
{MAKECALL=1,TRANSFER=2,CONSULTATION=3,BREAKIN=4,SILENT_MONITOR=5,WHISPER=6,GREETING=7};
export const  CallTypesText: Array<string> = ["DontCare","Make Call","Transfer","Consultation","BREAKIN","SILENT_MONITOR","WHISPER","Record Greeting"];

// export var myWindow:any = null;
export enum CP_EXT{
    IDX_CALLS_STAT_CALL_ACD_GROUP=10000,
    IDX_CALLS_STAT_CALL_WAITING_TIME,
    IDX_CALLS_STAT_CALL_CALLED,          
    IDX_CALLS_STAT_CALL_ANI,          // Ani   
    IDX_CALLS_STAT_CALL_ELAPSED_TIME,  //  10004
    IDX_CALLS_STAT_CALL_LAST_REDIRECTION,
    IDX_CALLS_STAT_CALL_ORIG_CALLED,     
    IDX_CALLS_STAT_CALL_STATE,           
    IDX_CALLS_STAT_CALL_TIME,            
    IDX_CALLS_STAT_CALL_CALLING_DEV,  // calling Dev ID   
    IDX_CALLS_STAT_CALL_EXPAND_MEDIA,
    IDX_CALLS_STAT_CALL_MEDIA,    
    IDX_CALLS_STAT_CALL_TYPE_ICON,
    IDX_CALLS_STAT_CALL_MEDIA_ICON,
    IDX_CALLS_STAT_CALL_END,
    IDX_CALLS_STAT_CALL_START,
    IDX_CALLS_STAT_JOINING_CALL,
    IDX_CALLS_STAT_CUR_EVENT,    //current event, can be used in CRM.json as additional CP field
    IDX_CALLS_STAT_AGENT_NUMBER,
    IDX_CALLS_STAT_AGENT_EXTENSION,
    IDX_CALLS_STAT_NUMBER_OF_CALLS,
    IDX_CALLS_STAT_HTTP_RESPONSE1, //2020-08-10 AlisherM BZ#52754: set 10 private CP fields for HTTP response
    IDX_CALLS_STAT_HTTP_RESPONSE2,
    IDX_CALLS_STAT_HTTP_RESPONSE3,
    IDX_CALLS_STAT_HTTP_RESPONSE4,
    IDX_CALLS_STAT_HTTP_RESPONSE5,
    IDX_CALLS_STAT_HTTP_RESPONSE6,
    IDX_CALLS_STAT_HTTP_RESPONSE7,
    IDX_CALLS_STAT_HTTP_RESPONSE8,
    IDX_CALLS_STAT_HTTP_RESPONSE9,
    IDX_CALLS_STAT_HTTP_RESPONSE10
};
//
export const CP_EXT_FIELDS: {col_idx:number,col_desc:string}[] =
  [
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_ACD_GROUP,        col_desc: "ACD Group"},
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_WAITING_TIME,     col_desc: "Waiting Time" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_CALLED,           col_desc: "Called"       },
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_ANI,              col_desc: "Calling"       },
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_ELAPSED_TIME,     col_desc: "Elapsed" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_LAST_REDIRECTION, col_desc: "Last Redirection" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_ORIG_CALLED,      col_desc: "Originally Called" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_STATE,            col_desc: "Status" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_TIME,             col_desc: "Time" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_CALLING_DEV,      col_desc: "Trunk" }, // from etas c++
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_EXPAND_MEDIA,     col_desc: "exapnd media" }, // from etas c++
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_TYPE_ICON,        col_desc: "Type" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_MEDIA,            col_desc: "Stat Call Media" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_MEDIA_ICON,       col_desc: "Media" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_END,              col_desc: "End time" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_CALL_START,            col_desc: "Start time" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_JOINING_CALL,          col_desc: "Joning call" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_CUR_EVENT,             col_desc: "Event" }, //current event, can be used in CRM.json as additional CP field
    //2020-06-22 AlisherM BZ#52606: in case of event OnLogon agent don't receive yet list of call profile fields from server, so set following 2 parameters manually
    { col_idx: CP_EXT.IDX_CALLS_STAT_AGENT_NUMBER,          col_desc: "Agent Number" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_AGENT_EXTENSION,       col_desc: "Agent Extension" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_NUMBER_OF_CALLS,       col_desc: "NUMBER_OF_CALLS" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_HTTP_RESPONSE1,        col_desc: "HTTP_RESPONSE1" }, //2020-08-10 AlisherM BZ#52754: set 10 private CP fields for HTTP response
    { col_idx: CP_EXT.IDX_CALLS_STAT_HTTP_RESPONSE2,        col_desc: "HTTP_RESPONSE2" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_HTTP_RESPONSE3,        col_desc: "HTTP_RESPONSE3" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_HTTP_RESPONSE4,        col_desc: "HTTP_RESPONSE4" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_HTTP_RESPONSE5,        col_desc: "HTTP_RESPONSE5" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_HTTP_RESPONSE6,        col_desc: "HTTP_RESPONSE6" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_HTTP_RESPONSE7,        col_desc: "HTTP_RESPONSE7" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_HTTP_RESPONSE8,        col_desc: "HTTP_RESPONSE8" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_HTTP_RESPONSE9,        col_desc: "HTTP_RESPONSE9" },
    { col_idx: CP_EXT.IDX_CALLS_STAT_HTTP_RESPONSE10,       col_desc: "HTTP_RESPONSE10" }
]; 
//
export const CP_LOG_FIELDS: Key_Desc[] =
[
    new Key_Desc(CP_CODES.GROUP_ID,                                      "ACD Group","0"),
    new Key_Desc(CP_EXT.IDX_CALLS_STAT_CALL_ANI.toString(),              "Calling","0"),
    new Key_Desc(CP_EXT.IDX_CALLS_STAT_CALL_CALLED.toString(),           "Called","0"),
    new Key_Desc(CP_EXT.IDX_CALLS_STAT_CALL_START.toString(),            "Creation Time","0"),
    new Key_Desc(CP_EXT.IDX_CALLS_STAT_CALL_END.toString(),              "Deletion Time","0"),
    new Key_Desc(CP_EXT.IDX_CALLS_STAT_CALL_LAST_REDIRECTION.toString(),"Last Redirection","0"),
    new Key_Desc(CP_EXT.IDX_CALLS_STAT_CALL_STATE.toString(),            "Last State","0"),
    new Key_Desc(CP_EXT.IDX_CALLS_STAT_CALL_ORIG_CALLED.toString(),      "Originally Called","0"),
    new Key_Desc(CP_CODES.DNIS,                                          "Trunk","0"),
]
export enum AccCallState
{
    DontCare        = 0,
    Inititiated     = 1,
    Ringing         = 2,    
    Connected       = 3,
    Cleared         = 4,
    Hold            = 5,
    Conferenced     = 6,
    Transferred     = 7,
    TransferredToMe = 8,
    RESERVED        = 9,
  }
  export const  AgentCallStateTxt: Array<string> = ["DontCare","Initiated","Ringing",
  "Connected", "Cleared", "Hold","Conferenced","Transferred","TransferredToMe","Reserved"];

 export enum AgentStatus
{
    DontCare        = 0,
    Loggedin        = 1,  
    Release         = 2,  
    ForceRelease    = 3,  
    WrapUp          = 4,
    InLoginProcess  = 5,
    Busy            = 6,
    Idle            = 7,
    Logout          = 8,
    ACD             = 9,
    RESERVED        = 10,
    OACD            = 11,
    LogoutBusy      = 12,
    LogoutAcd       = 13,
    LogoutOAcd      = 14,
    Ringing         = 15,
    Omni            = 16,
    OmniBusy        = 17,
    SemiBusy        = 18,
}

export const  AgentStatusTxt: Array<string> = ["DontCare","Loggedin","Release",
                                            "Force Release", "Wrap up", "In login process",
                                            "Busy","Ready","Logout", "ACD",
                                            "Reserved","OACD",
                                            "Logout Busy","Logout ACD",
                                            "Logout OACD","RINGING","OMNI","OMNI BUSY","BUSY"];

//
//======================================================================
export class AccNotifications 
{
    public direction: string = "";
    public agentNo: string = "";
    public action: string = "";
    public params: string  = null;
    public sessionid = "";

    constructor(dirct: string, agentno: string, actIon: string ,parms: string)
    {
        this.direction = dirct;
        this.agentNo = agentno;
        this.action = actIon; 
        this.params = parms;
    }
}
  //--------------------------------------------------------------------
  //AccAgentsList  
 export class AccAgentsList 
 {
    constructor(public agents: string []) {
    }
  }
//======================================================================


export class LoginUser {
    public sessionid: string = "";    
    public username:  string = "";
    public password:  string;
    public extension: string = "";
    public version:string    = "";
    public auto:number = 0;
    public name:string = "";
    public ringsecs:number = 0;
    public primary_groups:string[] = [];
    constructor (user,pass,ext){this.username = user,this.password = pass,this.extension = ext,this.primary_groups = [],this.version = '';}
}
//             0        1    2            3    4 5     6    7    8 9 10 11 12 14
export class OneQueuedCall
{
    public m_Group_No : string = "";
    public m_CallId: string = "";
    public m_CP:Key_Desc[] = [];
    constructor(callId:string,groupNo:string,CPs:string[])
    {
      this.m_CallId = callId;
      this.m_Group_No = groupNo;
      for (let i = 0; i < CPs.length; i++) {
          var s:any = CPs[i].split('|');
          var keyDesc:Key_Desc = new Key_Desc(s[0],s[1],"");
          this.m_CP.push(keyDesc);
      }

    }
    
}
//

//params":"1539238223,1001,established,inbound,,2001,2003,2001,2001,,-1,-1,1,,N"}]
//params":"1539575905,1001,established,inbound,,2001,2003,2001,2001,5001,-1,-1,4,,ACD"
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
    public m_CallType:number = -25;
    public m_CallCause: number = -31;
    public m_CurEvent: string = "";
    public m_whisper: string = "";
    //
    constructor(callId:string)
    {
      this.m_CallId = callId;
    }
}

export class Agent {
    public m_Sup:boolean = false;
    public m_SessionId:string = "";
    public m_AgentNo: string = "";
    public m_AgentName: string = "";
    public m_Password: string = "";
    public m_Extension: string =  "";
    public m_Logon: boolean = false;
    public m_isLogon: boolean = false;
    public m_isRecording: boolean = false;
    public m_isRecordingSuspended: boolean = false;
    public m_AgentStatus: any = AgentStatus.Busy;
    public m_CallStatus: AccCallState  = AccCallState.Cleared;
    public ForceRelease: boolean    = false;
    public isOmni:boolean           = false;
    public ReleaseCode: string    = "01";
    public WrapUpCode: string    = ""; 
    public WrapUp: boolean = false;
    public m_CallIndex:number = -1;
    public loginGroupinprocess: boolean = false;
    public releaseCodesCodeinprocess: boolean = false;
    public wrapupeCodesCodeinprocess: boolean = false;
    public In_m_AeonixTester: boolean = false;
    public m_COS:boolean [] = [];
    public m_StartConsultation : number = -1;
    public m_StartConsultationHeld: number = -1;
    public m_StartConsultationTo : string = "";
    public m_StartConsultationAnswered = false;

    public m_AgentStateTime:number = Date.now();
    public m_LastIdleStateTime:any = Date.now();
    public m_LastReleaseStateTime:any = Date.now();

    public m_DND: boolean;
    constructor(loginagent:LoginUser)
    {
        this.m_DND = false;
        this.m_LastReleaseStateTime = null;
        this.m_AgentNo = loginagent.username;
        this.m_Extension = loginagent.extension;
        this.m_Password = loginagent.password;
        this.m_AgentStatus = AgentStatus.Logout;
        this.m_SessionId = loginagent.sessionid;
        this.m_isRecording = false;
        this.m_Sup = false;
        this.m_COS = [true,true,true,true,true,true,true,true,true,true,true,true];
    }  
 }

//======================================================================
export class AccAgentConf
{
    constructor(ipaccAgentWebServiceUrl:string )
    {
        this.IpAccAgentWebServiceUrl = ipaccAgentWebServiceUrl;// "http://" + ipaccAgentWebServiceUrl + "/AccApi/AccAgentApi.asmx";
        this.m_CallProfileLists = [];
        this.m_ReleaseCodesList = [];
        this.m_GroupsList       =  [];
        this.m_WrapUpCodesList  = [];
        this.m_ServiceList      = [];
        this.m_DialLists        = [];
        this.m_AgentsList       = [];
              


         //Log = LogX;
    }
    // Attrribtes
    public m_CallProfileLists:Key_Desc [];
    public m_ReleaseCodesList:Key_Desc[];
    public m_SelectRC:Key_Desc[];
    public m_GroupsList:Key_Desc[];
    public m_WrapUpCodesList:Key_Desc[];
    public m_ServiceList:Key_Desc[]; 
    public m_DialLists:Key_Desc[];
    public m_AgentsList:Key_Desc[];
    public IpAccAgentWebServiceUrl: string   = null;
    //public m_AgentsMap: Map<string, Agent> = new Map<string, Agent>();

    
    //public Thread workerThread = null;
    
}
//

export class RoleModel{
    id: number;
    name:  String;
    companyType: String
}


export class UserStatusModel {
    constructor () {this.userReleased  = false; this.userWrauped = false;this.userConnected = false;this.userLogin = false; }
    userName: string;
    userLogin: boolean;
    userConnected: boolean;
    userReleased: boolean;
    userReleaseCode: string;
    userWrauped:  boolean;
    userWrapupCode: string;
}

export enum  eDenyCause
{
  ETAS_OK,                      //0                                     
  LOGGED_ON_TO_ANOTHER_EXT,     //1
  NEW_AGENT_ON_EXT,             //2
  WRONG_AGENT,                  //3
  WRONG_PASSWORD,               //4
  MAX_NUM,                      //5
  FAILED_TO_READ_FROM_DBS,      //6
  STILL_INITIALIZING,           //7
  SAME_AGENT_LOGGED_IN_TO_ANOTHER_STATION,      //8
  EXTENSION_IS_ALREADY_IN_USE_BY_AGENT,         //9
  EXTENSION_IS_ALREADY_IN_USED_AS_GROUP_NUMBER, //10
  AGENT_ALREADY_LOGGED_AT_LRL,                  //11
  EMAIL_ACCOUNT_ALREADY_IN_USE,                 //12
  WRONG_ETAS_VERSION,                           //13
  AGENT_NUMBER_NOT_FOUND_IN_DB,                 //14
  NEW_WEB_AGENT_LOGGED_IN,                      //15
  AGENT_TIMEOUT_EXPIRED, // self define         //16
  AGENT_NOT_EXISTS_ANY_MORE = 19,
  AGENT_IS_DEACTIVATING = 100,
  CANNOT_START_THE_SUP_PROCESS,
  NET_CONNECTION_TO_SERVER_FAILED,
  INSTANCE_ALREADY_RUNNING,
  MAX_NUMBER_OF_AGENTS_LOGGED_IN,

  INVALID_SUPERVISOR_NAME_OR_PWD = 200,
  MAX_NUMBER_OF_VISORS_LOGGED_IN,
  MAX_NUMBER_OF_WEB_VISORS_LOGGED_IN,//PVL SM_WEB 15-12-2009
  FAILED_TO_READ_FROM_DB_FOR_WEB_NLA,//PVL SM_WEB 15-12-2009
  MAX_NUMBER_OF_MONITORS_LOGGED_IN,
  SUPERVISOR_ALREADY_LOGGED_IN,
  VISOR_ID_NOT_FOUND_IN_DB,
  STATION_USED_BY_ANOTHER_VISOR,
  WEB_VISOR_ACCESS_DENIED_BY_ADMIN, //PVL 15-June-2010
  LICENCE_ALARM,                    // 21-Oct-2010 IA MN1004718
  SSO_NOT_AUTHORIZED,
  SSO_AUTHENTICATION_FAIL,
  SAME_VISOR_LOGGED_IN_TO_ANOTHER_STATION,
}
//
//
export const eDenyCauseStr:string[] =
[ "OK",                                                      // 0
"Logon Failed: Logged on to another extension",       	     //LOGGED_ON_TO_ANOTHER_EXT,     //1
"Logon Failed: New agent on extension",			             //NEW_AGENT_ON_EXT,             //2
"Logon fail: Wrong agent number",				             //WRONG_AGENT,                  //3
"Logon fail: Wrong password",					             //WRONG_PASSWORD,               //4
"Logon Failed: Too many agents",				             //MAX_NUM,                      //5
"Logon Failed: Server cannot read from database",		     //FAILED_TO_READ_FROM_DBS,      //6
"Logon Failed: Server still initializing",			         //STILL_INITIALIZING,           //7
"Logon failed: Logged on to another extension",			     //SAME_AGENT_LOGGED_IN_TO_ANOTHER_STATION,      //8
"Logon failed: Extension is already in use", 			     //EXTENSION_IS_ALREADY_IN_USE_BY_AGENT,         //9
"Logon Failed: Extension is already in use as group number", //EXTENSION_IS_ALREADY_IN_USED_AS_GROUP_NUMBER, //10
"Logon Failed: Same agent logged in on same extension",		 //AGENT_ALREADY_LOGGED_AT_LRL,                  //11
"Logon Failed: Email account is already in use by agent",	 //EMAIL_ACCOUNT_ALREADY_IN_USE,                 //12
"Logon Failed: Incompatible Server Version",			     //WRONG_ETAS_VERSION,                           //13
"Logon Failed: Invalid Agent id",				             //AGENT_NUMBER_NOT_FOUND_IN_DB,                 //14
"Logon Failed: Same agent logged in on same extension", 	 //NEW_WEB_AGENT_LOGGED_IN,                      //15
"Agent Timeout Expired",					                 //AGENT_TIMEOUT_EXPIRED, // self define         //16
"Logon Failed: Agent Timeout EXTENSION_IS_ALREADY_IN_USED_AS_IRN_NUMBER",//17
"Logon Failed: Extension is already in used as IRN number", // 18
"Agent Not exist any more",
 "Agent Timeout Expired",
 "Agent Timeout Expired",
 "Agent Timeout Expired"
 ];

export class CPini{
    constructor(Index,Format,Header,Sort,Width,Desc){ 
        this.Index = Index;
        this.Format = Format;
        this.Header = Header
        this.Sort = Sort;
        this.Width = Width;
        this.Desc = Desc;
    }
    Index: string;
    Format: string;
    Header: string;
    Sort : string;
    Width :string;
    Desc: string;
}
export class oneTab 
{
    constructor(lbl,cntns)
    {
        this.label = lbl;
        this.content = cntns;
    }
    public label:  string;
    public content: string;
}

export class oneTelNumber 
{
    constructor(number,description)
    {
        this.telNumber = number;
        this.Description = description;
    }
    public telNumber:  string;
    public Description: string;
}
export interface OnePhoneInterface {
    name?;
    category?;
    phone1?;
    phone2?;    
    private?;
    saleDate?;
}
export class barchart{
    constructor (y,label){
        this.y = y;
        this.label = label;
    }
    y:number;
    label:string;
}
export class stackedcolchart{
    constructor (y,x){
        this.y = y;
        this.x = x;
    }
    x:any;
    y:any;
}
// ==== presonal statistics enums ==========
export enum NON_ACD{
    agent_id                         = 1,
    group_id                         = 2,
    total_talk_time                  = 3,
    external_outgoing_calls          = 4,
    external_incoming_calls          = 5,
    internal_incoming_calls          = 6,
    internal_outgoing_calls          = 7,
    total_talk_time_of_ext_inc_calls = 8,
    total_talk_time_of_ext_out_calls = 9,
    total_talk_time_of_int_inc_calls = 10,
	total_talk_time_of_out_inc_calls = 11
};
export enum STATE{
    agent_id                = 1,
    group_id                = 2,
    total_busy_time         = 3,
    total_idle_time         = 4,
    total_login_time        = 5,
    total_release_time      = 6,
    total_wrap_up_time      = 7
};
export enum ACD{
    agent_id                = 1,
    group_id                = 2,
    answered_calls          = 3,
    oacd_answered_calls     = 4,
    total_outbound_acd_time = 5,
    total_reserved_time     = 6,
    total_talk_time         = 7
}
export enum GRP_TOTATALS{
    agent_id               = 1,
    group_id               = 2,
    totACD                 = 3,
    totOACD                = 4,
    totACDTime             = 5,
    totOACDTime            = 6
}
//

// ----------------[class ACD_GROUPS ] ----------------
export class ACD_GROUPS 
{
    public constructor(group_id:string){this.group_id = group_id}
    public group_id:string = '';
    public group_name:string= "";
    public totACD:string = '0';      
    public totOACD:string = '0' ;      
    public totACDTime:string = '0';      
    public totOACDTime:string = '0'; 

}
// ----------------[class PSWTotals ] ----------------
export class PSWTotals 
{
    public constructor(){}
    pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }
    public makeTime(s:string)
    {
        var seconds = Number(s);
        if (seconds == 0)
        {
            return '00:00';
        }
        var h = Math.floor(seconds / 3600);
        var m = Math.floor((seconds - (h * 3600)) / 60);
        var ss = Math.floor(seconds % 60);
        if (h > 0)
        {
            return this.pad(h, 2) + ":" + this.pad(m, 2) + ":" + this.pad(ss, 2);
        }
        else{
            return this.pad(m, 2) + ":" + this.pad(ss, 2);
        }
    }
    public Update(pswStr:string,GroupsList:Key_Desc[])
    {
        var ss:any = pswStr.split(';');
        var t:string = "";
        var tt:any = []
        var found = -1;
        for (let i = 0; i < ss.length; i++) {
            tt = ss[i].split('|');
            if (i == 0) //NON ACD
            {
                this.total_talk_time = t[3];
                this.external_outgoing_calls = tt[4];
                this.external_incoming_calls = tt[5];
                this.internal_incoming_calls = tt[6];
                this.internal_outgoing_calls = tt[7];

                this.total_talk_time_of_ext_inc_calls = this.makeTime(this.CalcAvarage(tt[5],tt[8]));
                this.total_talk_time_of_ext_out_calls = this.makeTime(this.CalcAvarage(tt[4],tt[9]));
                this.total_talk_time_of_int_inc_calls = this.makeTime(this.CalcAvarage(tt[6],tt[10]));
                this.total_talk_time_of_out_inc_calls = this.makeTime(this.CalcAvarage(tt[7],tt[11]));
            }
            else if (tt[0] == 'GRPTOTALS'){
                this.totACD         = tt[3];      
                this.totOACD        = tt[4];      
                this.totACDTime = this.makeTime(this.CalcAvarage(tt[3],tt[5]));
                this.totOACDTime = this.makeTime(this.CalcAvarage(tt[4],tt[6]));
                break;
            }
            else if (tt[0] == 'ACD'){
                var a:ACD_GROUPS = new ACD_GROUPS(tt[2]);
                var idx = GroupsList.map(e => e.Key).indexOf(a.group_id);
                if (idx != -1) {
                    a.group_name = GroupsList[idx].Desc;
                }
                a.totACD         = tt[3];      
                a.totOACD        = tt[4];      
                a.totACDTime = this.makeTime(this.CalcAvarage(tt[3],tt[7]));
                a.totOACDTime = this.makeTime(this.CalcAvarage(tt[4],tt[5]));
                this.ACDGroups.push(a);
            }
            // login->Agent_id,
            // login->Group_id,
            // acd.availability.total_busy_time,
            // acd.availability.total_idle_time,
            // acd.availability.total_login_time,
            // acd.availability.total_release_time,
            // acd.acd.total_wrap_up_time);
   
            else if (tt[0] == "STATE")
            {
                this.loginTimeNo = Number(tt[5]);
                this.releaseTimeNo = Number(tt[6]);
               this.loginTime = this.makeTime(tt[5]);
                this.releaseTime = this.makeTime(tt[6]);
            }
        }
    }
    //--------------------- [CalcAvarage] ---------------
    CalcAvarage(count:string, amount:string)
    {
        var avg:string = '0';
        try{
            if ( Number(count) > 0)
            {
                avg = Math.floor(Number(amount) / Number(count)).toString();
            }
        }catch {avg = '0'};
        return avg;
    }
    public total_talk_time:string = '0';
    public external_outgoing_calls:string = '0';       
    public external_incoming_calls:string = '0';      
    public internal_incoming_calls:string = '0';          
    public internal_outgoing_calls:string = '0';    
    public total_talk_time_of_ext_inc_calls:string = '0';
    public total_talk_time_of_ext_out_calls:string = '0';
    public total_talk_time_of_int_inc_calls:string = '0';
	public total_talk_time_of_out_inc_calls:string = '0';
    public totACD:string = '0';      
    public totOACD:string = '0' ;      
    public totACDTime:string = '0';      
    public totOACDTime:string = '0'; 
    public loginTime:string = '0';
    public releaseTime:string = '0'; 
    public releaseTimeNo:number = 0;
    public loginTimeNo:number = 0;
    public wrapUpTime:string = '0';    
    public ACDGroups:ACD_GROUPS[] = [];    
}
//
export enum QUEUD_GRP{
    group_id        = 1,
    Atotal          = 2,
    AtotalTime      = 3,
    AlongestTime    = 4,
    Totalabanswered = 5,
    TotalabAndoned  = 6,
    Wtotal          = 7,
    Wavg_time       = 8,
    WlongestTime    = 9,
}
// ----------------[class ACD_QGROUPS ] ----------------
export class ACD_QGROUPS 
{
    public constructor(group_id:string){this.group_id = group_id}
    public group_id:string = '';
    public group_name:string= "";
    public totQACD:string = '0';      
    public QAvgTime:string = '0' ;      
    public QLongestTime:string = '0';
    public Wtotal:string = '0';
    public Wavg_time:string = '0';     
    public WlongetTime:string = '0';
}
// ----------------[class ACD_GROUPS ] ----------------
export class QUEUED_ACD_GROUP
{
    public constructor(){}
    pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }
    public makeTime(s:number)
    {
        var seconds = s;
        var h = Math.floor(seconds / 3600);
        var m = Math.floor((seconds - (h * 3600)) / 60);
        var ss = Math.floor(seconds % 60);
        if (h > 0){
            return this.pad(h, 2) + ":" + this.pad(m, 2) + ":" + this.pad(ss, 2);
        }
        else{
            return this.pad(m, 2) + ":" + this.pad(ss, 2);
        }
        //

    }
    public Update(pswStr:string,GroupsList:Key_Desc[])
    {
        var ss:any = pswStr.split(';');
        var t:string = "";
        var tt:any = []
        var found = -1;
        for (let i = 0; i < ss.length; i++) {
            tt = ss[i].split('|');
            var a: ACD_QGROUPS = new ACD_QGROUPS(tt[1]);
            var idx = GroupsList.map(e => e.Key).indexOf(a.group_id);
            if (idx == -1 || GroupsList[idx].Flag !=  true) {
                continue;// not login
            }
            a.group_name = GroupsList[idx].Desc;
            //a.totQACD = (Number(tt[2]) + 0).toString();// Number(tt[7])
            a.totQACD = (Number(tt[7]) + 0).toString();
            //var avg:number = Number(tt[8]);
            // if (Number(tt[3]) > 0)
            // {
            //     avg = Math.floor(avg +  (Number(tt[3]) / Number(tt[2])) / 2);
            // }
            //a.QAvgTime =this.makeTime(avg);
            a.QAvgTime = this.makeTime(Number(tt[8]));
            var l1:number = Number(tt[4]); 
            var l2:number = Number(tt[9]);
            a.QLongestTime = this.makeTime(l2);// (l1 > l2) ? this.makeTime(l1): this.makeTime(l1); // not bug
            //
            a.Wtotal = tt[7];
            a.Wavg_time = this.makeTime(Number(tt[8]));     
            a.WlongetTime = this.makeTime(Number(tt[9]));
            this.ACDQGroups.push(a);
        }
    }
    //--------------------- [CalcAvarage] ---------------
    public ACDQGroups:ACD_QGROUPS[] = [];    
}
