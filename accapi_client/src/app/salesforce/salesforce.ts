import { AccAgentService } from "src/app/AccAgent/acc-agent.service";
import { OneCall } from 'src/app/AccAgent/one-call.interface';
import { AsapScheduler } from "rxjs/internal/scheduler/AsapScheduler";

declare var sforce: any; //main object of salesforce opencti javascript

var SF: Salesforce = null ; //global object 

export class Salesforce {
    // 2019-05-01 AlisherM BZ#49794: each organization has it's own instance url in salesforce, for example our development account has url https://na85.salesforce.com, 
    // when salesforce run agent as iFrame we get instance url as a parameter, for example:
    // &mode=Lightning&isdtp=vw&sfdcIframeOrigin=https:%2F%2Fna85.lightning.force.com&nonce=5d05ffb9e94dc168aeeac35a199a8d300971545f8aa61224dd9cfc813b551a6c&ltn_app_id=06m1U000001Vtu7QAC&clc=0
    private instance_url: string = "";
    private api: string = "/support/api/45.0/lightning/opencti_min.js"; //TODO: this parameter can be configurable, so in future need to read it from CRM.json
    private AAS: AccAgentService;
    private isVisible: boolean = false;
    private ActiveNumber: string = "";
    private ActiveRecordID: string = "";
    private ActiveRecordName: string = "";
    private ActiveRecordType: string = "";
    private ActiveDirection: string = "";
    private ActiveCallType: string = "";
    private ActiveCallDirection: string = "";
    private ActiveOutboundPrefix: string = "";
    private CallStartTimestamp: number;
    private CallEndTimestamp: number;
    //2019-05-15 AlisherM BZ#49794: TODO: in the future following parameters should be configured from CRM.json
    private iFrameWidth_normal: number = 250;
    private iFrameWidth_max: number = 1200;
    private iFrameHeight_normal: number = 850;
    private iFrameHeight_max: number = 850;
    private CPFDelimeter: string = "%%";
    private CurrentCall: OneCall = null;
    private Click2DialCall: OneCall = null;

    //private static _instance:Salesforce = new Salesforce();

    public static getInstance(AAS: AccAgentService, instance_url: string):Salesforce
    {
        if (SF != null)
        {
            SF.AAS.log('Salesforce.getInstance SF already exist: ' + SF);
            return SF;
        }

        SF = new Salesforce();
        SF.AAS = AAS;
        SF.CPFDelimeter = AAS.CPFDelimeter;
        SF.AAS.log('Salesforce.getInstance AAS: ' + AAS + ', instance_url: ' + instance_url + ", CPFDelimeter " + SF.CPFDelimeter);
        SF.instance_url = instance_url;

        SF.enableClickToDial();

        return SF;
    } //end of getInstance

    public constructor()
    {
        console.log('Salesforce.constuctor this: '+ this);
    } // end of constructor

    getCurrentCall() {
        return this.CurrentCall;
    }

    enableClickToDial()
    {
        sforce.opencti.enableClickToDial({callback: SF.enableClickToDialCallback});
        
         // Register the listener.
         window.addEventListener('load', function() {
             sforce.opencti.onClickToDial({listener: SF.onClickToDial});
         });
    } // end of enableClickToDial

    enableClickToDialCallback(response: any) 
    {
        if (response.success) 
        {
            SF.AAS.log('Salesforce.enableClickToDialCallBack succeeded, returnValue: ' +  response.returnValue);
        } 
        else 
        {
            SF.AAS.log('Salesforce.enableClickToDialCallBack failed, Errors: [' + response.errors[0].code + '] ' + response.errors[0].description);
        }
    } // end of enableClickToDialCallback

    disableClickToDial()
    {
        sforce.opencti.disableClickToDial({callback: SF.disableClickToDialCallback});
    } //end of disableClickToDial
 
    disableClickToDialCallback(response: any) 
    {
        if (response.success) 
        {
            SF.AAS.log('Salesforce.disableClickToDialCallBack succeeded, returnValue: ' + response.returnValue);
        } 
        else 
        {
            SF.AAS.log('Salesforce.disableClickToDialCallBack failed, Errors: [' + response.errors[0].code + '] ' + response.errors[0].description);
        }
    } //end of disableClickToDialCallback

    //2020-02-04 AlisherM: this function not used anymore, but keep it as example
    // setSoftphonePanelVisibilityCallback(response: any) 
    // {
    //     if (response.success) 
    //     {
    //         SF.AAS.log('Salesforce.setSoftphonePanelVisibilityCallBack succeeded, returnValue: ' + response.returnValue);
    //         SF.isVisible = true;
    //     } 
    //     else 
    //     {
    //         SF.AAS.log('Salesforce.setSoftphonePanelVisibilityCallBack failed, Errors: [' + response.errors[0].code + '] ' + response.errors[0].description);
    //     }
    // } //end of setSoftphonePanelVisibilityCallback
    
    //2020-02-04 AlisherM: this function not used anymore, but keep it as example
    // runApexCallback(response: any)
    // {
    //     if (response.success)
    //     {
    //         SF.AAS.log('Salesforce.runApexCallback API method call executed successfully! returnValue: ' + response.returnValue);
    //         SF.ActiveOutboundPrefix = response.returnValue.runApex;
    //         //NOTE: method getLineOfBusiness returns LineOfBusiness as string if found, otherwise return 'NotFound', so this should be handled also
    //         SF.AAS.log('Salesforce.runApexCallback LineOfBusiness: ' + SF.ActiveOutboundPrefix + ', dialedNumber: ' + SF.ActiveNumber + ', recordId: ' + SF.ActiveRecordID + ', recordType: ' + SF.ActiveRecordType);
    //         SF.AAS.makeCall(SF.ActiveNumber, SF.ActiveOutboundPrefix); 
    //     } 
    //     else 
    //     {
    //         SF.AAS.log('Salesforce.runApexCallBack failed, Errors: [' + response.errors[0].code + '] ' + response.errors[0].description);
    //     }
    // } //end of runApexCallback
    
    onClickToDial(payload: any) 
    {
        //NOTE: this method called from Salesforce code, so need to catch any exception internally (not in Salesforce code)
        try
        {
            SF.AAS.log('Salesforce.onClickToDial payload: number: ' + payload.number + ', recordName: ' + payload.recordName + ', objectType: ' + payload.objectType + ', recordId: ' + payload.recordId);
            if (payload.number == "")
            {
                SF.AAS.log('Salesforce.onClickToDial WARNING: number is empty, skip dialing');
                return;
            }

            //2019-10-06 AlisherM BZ#50840: save dialed number and recordID in call and pass it to HandleCRMEvent
            var oc: OneCall = new OneCall("0");
            SF.AAS.AddCPFtoCall("Agent Number", SF.AAS.agent.m_AgentNo, oc);
            SF.AAS.AddCPFtoCall("CLICK2DIAL_NUMBER", payload.number, oc);
            SF.AAS.AddCPFtoCall("SF_RECORD_ID", payload.recordId, oc);
            SF.AAS.AddCPFtoCall("SF_RECORD_TYPE", payload.objectType, oc);
            SF.AAS.AddCPFtoCall("SF_RECORD_NAME", payload.recordName, oc);
            SF.AAS.HandleCRMEvent("Salesforce_OnClickToDial", oc);

            // SF.ActiveNumber = payload.number;
            // SF.ActiveRecordID = payload.recordId;
            // SF.ActiveRecordName = payload.recordName;
            // SF.ActiveRecordType = payload.objectType;
            // SF.ActiveCallType = 'Outbound';
            // SF.ActiveCallDirection = 'to';
            // SF.CallStartTimestamp = Math.round(+new Date()/1000);
            // SF.screenPopByRecordID(SF.ActiveRecordID);
            // //open toolbar on click-to-dial
            // if (!SF.isVisible) 
            // {
            //     sforce.opencti.setSoftphonePanelVisibility({visible: true, callback: SF.setSoftphonePanelVisibilityCallback});
            // }
            // //2019-08-18 AlisherM: call runApex to get LineOfBusiness
            // SF.ActiveOutboundPrefix = '';
            // //currently just for test do it for agent 9999, otherwise call to standard makeCall function
            // if (SF.AAS.agent.m_AgentNo == '9999')
            // {                                    
            //     var param = {apexClass: 'CtiHelper', 
            //                 methodName: 'getLineOfBusiness', 
            //                 methodParams: 'recordId=' + SF.ActiveRecordID + 
            //                             '&recordType=' + SF.ActiveRecordType + 
            //                             '&agentNumber=' + SF.AAS.agent.m_AgentNo + 
            //                             '&dialedNumber=' + SF.ActiveNumber,
            //                 callback: SF.runApexCallback};
            //     //param.callback = SF.runApexCallback;
            //     sforce.opencti.runApex(param);
            //     //NOTE: method getLineOfBusiness returns LineOfBusiness as string if found, otherwise return 'NotFound', so this should be handled also
            // }
            // else
            // {
            //     SF.AAS.makeCall(SF.ActiveNumber, SF.ActiveOutboundPrefix);
            // }
        } catch (e) {
            SF.AAS.log('Salesforce.onClickToDial ERROR: got exception: ' + e.toString());

        }
    } //end of onClickToDial

    //2020-02-04 AlisherM: this function not used anymore, but keep it as example
    // //popup specific Contact or Account by recordID
    // screenPopByRecordID(recordID: string) 
    // {
    //     sforce.opencti.screenPop({type: sforce.opencti.SCREENPOP_TYPE.SOBJECT, params: {recordId:recordID}, callback: SF.screenPopCallback});
    // } //end of screenPopByRecordID

    // screenPopCallback(response: any)
    // {
    //     if (response.success) 
    //     {
    //         SF.AAS.log('Salesforce.screenPopCallBack succeeded, returnValue:' +  response.returnValue);
    //     } 
    //     else 
    //     {
    //         SF.AAS.log('Salesforce.screenPopCallBack failed, Errors: [' + response.errors[0].code + '] ' + response.errors[0].description);
    //     }
    // } //end of screenPopCallback

    //2020-02-04 AlisherM: this function not used anymore, but keep it as example
    // handleInboundCall(CallProfileFields: any) 
    // {
    //     //first set tooblar visible (if it was minimized)
    //     sforce.opencti.setSoftphonePanelVisibility({visible: true});

    //     //TODO: need take mapping of fields from CRM.json, but currently we'll use hard coded 3 fields used by Carasso: ANI, VirtualNumber, LineOfBiz
    //     var ANI: string = SF.AAS.ReplaceALLCPFNamesByValues("%%ANI%%", CallProfileFields);
    //     var VirtualNumber: string = SF.AAS.ReplaceALLCPFNamesByValues("%%VirtualNumber%%", CallProfileFields);
    //     //var LineOfBiz: string = SF.AAS.ReplaceALLCPFNamesByValues("%%LineOfBiz%%", CallProfileFields);

    //     SF.ActiveNumber = ANI;
    //     SF.ActiveCallType = "Inbound";
    //     SF.ActiveCallDirection = "from";
    //     //2019-06-26 AlisherM: log the execution of salesforce API to have time difference
    //     SF.AAS.log('Salesforce.handleInboundCall executing searchAndScreenPop: ANI ' + ANI + ', VirtualNumber ' + VirtualNumber);
    //     //set deffered:false for cases when you want to popup search result immediately (according to softphoneLayout settings)
    //     //sforce.opencti.searchAndScreenPop({searchParams: ANI, queryParams: '', callType : sforce.opencti.CALL_TYPE.INBOUND, deferred: false, callback: SF.handleInboundCallCallback});
        
    //     //2019-05-28 AlisherM BZ#49794: in 1st stage of Carasso project we don't have REST API queries options, that is why all logic will be implemented in Flow of Salesforce
    //     //we just need to call Flow with 2 parameters VirtualNumber and AND, Flow will be set in Softphone Layout of Salesforce
    //     sforce.opencti.searchAndScreenPop({searchParams: "cannotfindthisstringnever", queryParams: '', params: { FLOW: { flowArgs: [{'name': 'Virtual_Number', 'type': 'String', 'value': VirtualNumber}, {'name': 'ANI', 'type': 'String', 'value': ANI}] } }, callType : sforce.opencti.CALL_TYPE.INBOUND, deferred: false, callback: SF.handleInboundCallCallback});
        
    //     //Here is example of how to call directly specific flow (no rounting via Softphone Layout)
    //     //sforce.opencti.screenPop({ type: sforce.opencti.SCREENPOP_TYPE.FLOW, params: {flowDevName: 'CTI_Test', flowArgs: [{'name': 'Call_Type', 'type': 'String', 'value': 'Sales'}, {'name': 'Virtual_Number', 'type': 'String', 'value': '0779978406'}, {'name': 'ANI', 'type': 'String', 'value': ANI}]}, callback : SF.screenPopCallback });

    //     //set deffered:true for cases when you don't want to popup immediately, but first get result (none/single/multiple), analyze it and only than use screenPop if needed
    //     //sforce.opencti.searchAndScreenPop({searchParams: searchString, queryParams: '', callType : sforce.opencti.CALL_TYPE.INBOUND, deferred: true, callback: screenPopCallback});
    // } //end of handleInboundCall


    // handleInboundCallCallback = function(response: any) 
    // {
    //     if (response.success) 
    //     {
    //         SF.AAS.log('Salesforce.handleInboundCallCallBack succeeded, returnValue: ' +  response.returnValue);
    //         var recordsObject = response.returnValue;
    //         var size = Object.keys(recordsObject).length;
    //         SF.AAS.log('Salesforce.handleInboundCallCallback size: ' +  size);
    //         SF.CallStartTimestamp = Math.round(+new Date()/1000);
    //         if (size == 0) 
    //         {
    //             //document.getElementById("callStatus").innerHTML = ActiveCallType + ' call ' + ActiveCallDirection + ' ' + inboundNumber + ': didn\'t found matching record';
    //             SF.AAS.log('Salesforce.handleInboundCallCallback ' + SF.ActiveCallType + ' call ' + SF.ActiveCallDirection + ' ' + SF.ActiveNumber + ': didn\'t found matching record');
    //             //2019-05-14 AlisherM BZ#49794: in first stage only Sales group of agents will work with Salesforce (Service group will join later), so we open new lead hardcoded
    //             //in following stages toobar will receive action from server via call profile, for example: CRM_ACTION=Salesforce.openNewLead
    //             //SF.openNewLead();
    //         }
    //         else 
    //         {
    //             var recordsArray = Object.getOwnPropertyNames(recordsObject)
    //             SF.AAS.log('Salesforce.handleInboundCallCallback: recordsArray: ' +  recordsArray);
    //             var record: any;
    //             if (size == 1) 
    //             {
    //                 record = recordsObject[recordsArray[0]];
    //                 SF.AAS.log('Salesforce.handleInboundCallCallback: record ' +  record);
    //                 sforce.opencti.screenPop({type: sforce.opencti.SCREENPOP_TYPE.FLOW, params: record, callback: SF.screenPopCallback});
    //                 /*
    //                 SF.ActiveRecordID = record.Id;
    //                 SF.ActiveRecordName = record.Name;
    //                 SF.ActiveRecordType = record.RecordType;
    //                 //document.getElementById("callStatus").innerHTML = ActiveCallType + ' call ' + ActiveCallDirection + ' ' + ActiveNumber + ': found ' + ActiveRecordType + ' ' + ActiveRecordName + ', Phone ' + record.Phone + ', SalesforceID ' + ActiveRecordID;
    //                 SF.AAS.log('Salesforce.handleInboundCallCallback ' + SF.ActiveCallType + ' call ' + SF.ActiveCallDirection + ' ' + SF.ActiveNumber + ': found ' + SF.ActiveRecordType + ' ' + SF.ActiveRecordName + ', Phone ' + record.Phone + ', SalesforceID ' + SF.ActiveRecordID);
    //                 */
    //             } 
    //             else 
    //             {
    //                 //document.getElementById("callStatus").innerHTML = ActiveCallType + ' call ' + ActiveCallDirection + ' ' + inboundNumber + ': found ' + size + ' matching records';
    //                 SF.AAS.log('Salesforce.handleInboundCallCallback ' + SF.ActiveCallType + ' call ' + SF.ActiveCallDirection + ' ' + SF.ActiveNumber + ': found ' + size + ' ' + SF.ActiveRecordName + ' matching records');
    //             }
    //         }
    //     } 
    //     else 
    //     {
    //         SF.AAS.log('Salesforce.handleInboundCallCallback: Errors: ' + response.errors);
    //     }
    // } //end of handleInboundCallCallback

    //2020-02-04 AlisherM: this function not used anymore, but keep it as example
    // openNewLead() 
    // {
    //     //sforce.opencti.screenPop({type: sforce.opencti.SCREENPOP_TYPE.NEW_RECORD_MODAL, params: {entityName: 'Lead', defaultFieldValues: {Phone:SF.ActiveNumber, Line_of_Business__c: 'Infinity', RecordType: 'Business'} }, callback: openLeadCallback });
    //     sforce.opencti.screenPop({type: sforce.opencti.SCREENPOP_TYPE.NEW_RECORD_MODAL, params: {entityName: 'Lead', defaultFieldValues: {Phone:SF.ActiveNumber} }, callback: SF.openNewLeadCallback });
    // } //end of openNewLead

    // openNewLeadCallback = function(response: any) 
    // {
    //     if (response.success) 
    //     {
    //         SF.AAS.log('Salesforce.openNewLeadCallBack succeeded, returnValue: ' +  response.returnValue);
    //     } 
    //     else 
    //     {
    //         SF.AAS.log('Salesforce.openNewLeadCallBack failed, Errors: [' + response.errors[0].code + '] ' + response.errors[0].description);
    //     }
    // } //end of openNewLeadCallback

    resizeIFrame(x: number, y: number)
    {
        SF.AAS.log('Salesforce.resizeIFrame x: ' + x + ', y: ' + y);
        sforce.opencti.setSoftphonePanelWidth({widthPX: x});
        sforce.opencti.setSoftphonePanelHeight({heightPX: y});
    } //end of resizeIFrame

    setMaxIFrameSize()
    {
        SF.resizeIFrame(SF.iFrameWidth_max, SF.iFrameHeight_max);
    } //end of setMaxIFrameSize

    setNormalIFrameSize()
    {
        SF.resizeIFrame(SF.iFrameWidth_normal, SF.iFrameHeight_normal);
    } //end of setNormalIFrameSize

    //2019-10-02 AlisherM BZ#50840: implement Salesforce actions which can be configured via CRM.json
    SetVisibility(crmaction: any, oc: OneCall)
    {
        var SF_VISIBLE: string = SF.AAS.RetrieveCRMActionParameterByName("SF_VISIBLE", crmaction, oc);
        if (SF_VISIBLE == "" || SF_VISIBLE == SF.AAS.CPF_DOES_NOT_EXIST || SF_VISIBLE == SF.AAS.CPF_NOT_FOUND_IN_CALL)
        {
            SF.AAS.log('Salesforce_SetVisibility WARNING: mandatory parameter SF_VISIBLE is empty or not found, skip action');
            return;
        }

        var SF_VISIBLE_BOOL: boolean;
        if (SF_VISIBLE == "true" || SF_VISIBLE == "True"|| SF_VISIBLE == "TRUE")
        {
            SF_VISIBLE_BOOL = true;
        }
        else if (SF_VISIBLE == "false" || SF_VISIBLE == "False"|| SF_VISIBLE == "FALSE")
        {
            SF_VISIBLE_BOOL = false;
        }
        else
        {
            SF.AAS.log('Salesforce_SetVisibility WARNING: unknown value of manadatory parameter SF_VISIBLE: ' +  SF_VISIBLE + ', skip action');
            return;
        }

        sforce.opencti.setSoftphonePanelVisibility({
            visible: SF_VISIBLE_BOOL,
            callback: SF.SetVisibilityCallBack
        });
    } //end of SetVisibility

    SetVisibilityCallBack = function(response: any)
    {
        if (response.success)
        {
            SF.AAS.log('Salesforce_SetVisibilityCallBack succeeded, returnValue: ' +  response.returnValue);
        }
        else
        {
            SF.AAS.log('Salesforce_SetVisibilityCallBack failed, Errors: [' + response.errors[0].code + '] ' + response.errors[0].description);
        }
    } //end of SetVisibilityCallBack

    //open object (Lead/Opportunity/Case/Account/Contact) by recordId
    OpenObject(crmaction: any, oc: OneCall) 
    {
        var SF_RECORD_ID: string = SF.AAS.RetrieveCRMActionParameterByName("SF_RECORD_ID", crmaction, oc);
        if (SF_RECORD_ID == "" || SF_RECORD_ID == SF.AAS.CPF_DOES_NOT_EXIST || SF_RECORD_ID == SF.AAS.CPF_NOT_FOUND_IN_CALL)
        {
            SF.AAS.log('Salesforce_OpenObject WARNING: mandatory parameter SF_RECORD_ID is empty or not found, skip action');
            return;
        }

        sforce.opencti.screenPop({
            type: sforce.opencti.SCREENPOP_TYPE.SOBJECT,
            params: {recordId: SF_RECORD_ID}, 
            callback: SF.OpenObjectCallback
        });
    } //end of OpenObject

    OpenObjectCallback = function(response: any)
    {
        if (response.success)
        {
            SF.AAS.log('Salesforce_OpenObjectCallBack succeeded, returnValue: ' +  response.returnValue);
        }
        else
        {
            SF.AAS.log('Salesforce_OpenObjectCallBack failed, Errors: [' + response.errors[0].code + '] ' + response.errors[0].description);
        }
    } //end of OpenObjectCallback

    SearchAndScreenPop(crmaction: any, oc: OneCall) 
    {
        SF.CurrentCall = oc;
        var SF_SEARCH_STRING: string = SF.AAS.RetrieveCRMActionParameterByName("SF_SEARCH_STRING", crmaction, oc);
        if (SF_SEARCH_STRING == "" || SF_SEARCH_STRING == SF.AAS.CPF_DOES_NOT_EXIST || SF_SEARCH_STRING == SF.AAS.CPF_NOT_FOUND_IN_CALL)
        {
            SF.AAS.log('Salesforce_SearchAndScreenPop WARNING: mandatory parameter SF_SEARCH_STRING is empty or not found, skip action');
            return;
        }


        var SF_FLOW_PARAMS: string = SF.AAS.RetrieveCRMActionParameterByName("SF_FLOW_PARAMS", crmaction, oc);
        if (SF_FLOW_PARAMS == "" || SF_FLOW_PARAMS == SF.AAS.CPF_DOES_NOT_EXIST || SF_FLOW_PARAMS == SF.AAS.CPF_NOT_FOUND_IN_CALL)
        {
            SF.AAS.log('Salesforce_SearchAndScreenPop optional parameter SF_FLOW_PARAMS is empty or not found, set default value []');
            SF_FLOW_PARAMS = "[]"
        }
        else
        {
            //accapi replace quotes sign " to \", so we need to replace it back
            SF_FLOW_PARAMS = SF_FLOW_PARAMS.replace(/\\\"/g,"\"");
        }

        var SF_DEFAULT_VALUES: string = SF.AAS.RetrieveCRMActionParameterByName("SF_DEFAULT_VALUES", crmaction, oc);
        if (SF_DEFAULT_VALUES == "" || SF_DEFAULT_VALUES == SF.AAS.CPF_DOES_NOT_EXIST || SF_DEFAULT_VALUES == SF.AAS.CPF_NOT_FOUND_IN_CALL)
        {
            SF.AAS.log('Salesforce_SearchAndScreenPop optional parameter SF_DEFAULT_VALUES is empty or not found, set default value {}');
            SF_DEFAULT_VALUES = "{}";
        }
        else
        {
            //accapi replace quotes sign " to \", so we need to replace it back
            SF_DEFAULT_VALUES = SF_DEFAULT_VALUES.replace(/\\\"/g,"\"");
        }

        //convert JSON string to object
        var SF_DEFAULT_VALUES_obj: any;
        try 
        {
            SF_DEFAULT_VALUES_obj = JSON.parse(SF_DEFAULT_VALUES);
        } catch (e) {
            SF.AAS.log('Salesforce_SearchAndScreenPop ERROR: got exception while parsing SF_DEFAULT_VALUES: ' + e.toString());
        }
        var SF_FLOW_PARAMS_obj: any;
        try 
        {
            SF_FLOW_PARAMS_obj = JSON.parse(SF_FLOW_PARAMS);
        } catch (e) {
            SF.AAS.log('Salesforce_SearchAndScreenPop ERROR: got exception while parsing SF_FLOW_PARAMS: ' + e.toString());
        }

        sforce.opencti.searchAndScreenPop({
            searchParams: SF_SEARCH_STRING,
            queryParams: '', 
            params: {
                FLOW: {
                    flowArgs: SF_FLOW_PARAMS_obj
                }
            },
            defaultFieldValues: SF_DEFAULT_VALUES_obj,
            callType : sforce.opencti.CALL_TYPE.INBOUND,
            deferred: false, 
            callback: SF.SearchAndScreenPopCallback
        });
    } //end of SearchAndScreenPop

    SearchAndScreenPopCallback = function(response: any)
    {
        if (response.success)
        {
            var recordsObject = response.returnValue;
            var size = Object.keys(recordsObject).length;
            SF.AAS.log('Salesforce_SearchAndScreenPopCallBack succeeded, found ' +  size + ' record(s)');
            var recordsArray = Object.getOwnPropertyNames(recordsObject)
            var record: any;
            if (size == 1) 
            {
                record = recordsObject[recordsArray[0]];
                SF.ActiveRecordID = record.Id;
                SF.ActiveRecordName = record.Name;
                SF.ActiveRecordType = record.RecordType;
                SF.AAS.log('<' + SF.ActiveRecordType + ':' + SF.ActiveRecordName + ',Phone ' + record.Phone + ',SalesforceID ' + SF.ActiveRecordID + '>');
                SF.AAS.AddCPFtoCall("SF_RECORD_ID", record.Id, SF.CurrentCall);
                SF.AAS.AddCPFtoCall("SF_RECORD_TYPE", record.RecordType, SF.CurrentCall);
                SF.AAS.AddCPFtoCall("SF_RECORD_NAME", record.Name, SF.CurrentCall);
                //SF.AAS.log('Salesforce.handleInboundCallCallback: record ' +  record);
                //sforce.opencti.screenPop({type: sforce.opencti.SCREENPOP_TYPE.FLOW, params: record, callback: SF.screenPopCallback});
                /*
                document.getElementById("callStatus").innerHTML = ActiveCallType + ' call ' + ActiveCallDirection + ' ' + ActiveNumber + ': found ' + ActiveRecordType + ' ' + ActiveRecordName + ', Phone ' + record.Phone + ', SalesforceID ' + ActiveRecordID;
                SF.AAS.log('Salesforce.handleInboundCallCallback ' + SF.ActiveCallType + ' call ' + SF.ActiveCallDirection + ' ' + SF.ActiveNumber + ': found ' + SF.ActiveRecordType + ' ' + SF.ActiveRecordName + ', Phone ' + record.Phone + ', SalesforceID ' + SF.ActiveRecordID);
                */
            }
        }
        else
        {
            SF.AAS.log('Salesforce_SearchAndScreenPopCallBack failed, Errors: [' + response.errors[0].code + '] ' + response.errors[0].description);
        }
    } //end of SearchAndScreenPopCallback

    //open form of new Object (custom or standard object, such as Account, Contact, Opportunity, Lead, Case) . NOTE: agent may cancel creation of object
    CreateObject(entityName: string, crmaction: any, oc: OneCall) 
    {
        var SF_ENTITY_NAME: string = "";
        var SF_ENTITY_NAME_type: string = "";

        //1st get mandatory parameter entityName as argument of from call profile/from action in CRM.json
        if (entityName == "CP") //get entityName from call profile - for cases when crmaction is CreateObject (used mostly for custom objects)
        {
            SF_ENTITY_NAME = SF.AAS.RetrieveCRMActionParameterByName("SF_ENTITY_NAME", crmaction, oc);
        }
        else //get entityName from function argument - for cases when crmaction is CreateAccount/CreateContact/CreateLead/CreateCase/CreateOpportunity (used for standard objects)
        {
            SF_ENTITY_NAME_type = "argument";
            SF_ENTITY_NAME = entityName;
            SF.AAS.log('Salesforce_CreateObject ' + SF_ENTITY_NAME_type + ' SF_ENTITY_NAME: ' +  SF_ENTITY_NAME);
        }

        if (SF_ENTITY_NAME == "" || SF_ENTITY_NAME == SF.AAS.CPF_DOES_NOT_EXIST || SF_ENTITY_NAME == SF.AAS.CPF_NOT_FOUND_IN_CALL)
        {
            SF.AAS.log('Salesforce_CreateObject WARNING: mandatory parameter SF_ENTITY_NAME is empty or not found, skip action');
            return;
        }

        var SF_DEFAULT_VALUES: string = SF.AAS.RetrieveCRMActionParameterByName("SF_DEFAULT_VALUES", crmaction, oc);
        if (SF_DEFAULT_VALUES == "" || SF_DEFAULT_VALUES == SF.AAS.CPF_DOES_NOT_EXIST || SF_DEFAULT_VALUES == SF.AAS.CPF_NOT_FOUND_IN_CALL)
        {
            SF.AAS.log('Salesforce_CreateObject optional parameter SF_DEFAULT_VALUES is empty or not found, set default value {}');
            SF_DEFAULT_VALUES = "{}"
        }
        else
        {
            //accapi replace quotes sign " to \", so we need to replace it back
            SF_DEFAULT_VALUES = SF_DEFAULT_VALUES.replace(/\\\"/g,"\"");
        }

        //convert JSON string to object
        var SF_DEFAULT_VALUES_obj: any;
        try 
        {
            SF_DEFAULT_VALUES_obj = JSON.parse(SF_DEFAULT_VALUES);
        } catch (e) {
            SF.AAS.log('Salesforce_CreateObject ERROR: got exception while parsing SF_DEFAULT_VALUES: ' + e.toString());
        }

        sforce.opencti.screenPop({
            type: sforce.opencti.SCREENPOP_TYPE.NEW_RECORD_MODAL,
            params: {
                entityName: SF_ENTITY_NAME,
                defaultFieldValues: SF_DEFAULT_VALUES_obj
            }, 
            callback: SF.CreateObjectCallback
        });
    } //end of CreateObject

    CreateObjectCallback = function(response: any)
    {
        if (response.success)
        {
            SF.AAS.log('Salesforce_CreateObjectCallback succeeded, returnValue: ' +  response.returnValue);
        }
        else
        {
            SF.AAS.log('Salesforce_CreateObjectCallback failed, Errors: [' + response.errors[0].code + '] ' + response.errors[0].description);
        }
    } //end of CreateObjectCallback

    MakeCallRunApex(param: any, oc: OneCall)
    {
        if (oc == null)
        {
            SF.AAS.log('Salesforce_MakeCallRunApex ERROR: oc is empty, skip ACC_MakeCall action');
            return;
        }
        
        //save call object in order to get all parameters in callback function
        SF.Click2DialCall = oc;

        if (param == null || param == "")
        {
            SF.AAS.log('Salesforce_MakeCallRunApex WARNING: param is empty, skip RunApex action, just make a call...');

            var CLICK2DIAL_NUMBER = SF.AAS.GetCPFValueByName("CLICK2DIAL_NUMBER", SF.Click2DialCall);
            if (CLICK2DIAL_NUMBER == SF.AAS.CPF_DOES_NOT_EXIST || CLICK2DIAL_NUMBER == SF.AAS.CPF_NOT_FOUND_IN_CALL)
            {
                SF.AAS.log('Salesforce_MakeCallRunApex ERROR: CLICK2DIAL_NUMBER is empty or not found, skip ACC_MakeCall action');
                return;
            }

            var CLICK2DIAL_PREFIX = SF.AAS.GetCPFValueByName("CLICK2DIAL_PREFIX", SF.Click2DialCall);
            if (CLICK2DIAL_PREFIX == SF.AAS.CPF_DOES_NOT_EXIST || CLICK2DIAL_PREFIX == SF.AAS.CPF_NOT_FOUND_IN_CALL)
            {
                CLICK2DIAL_PREFIX = ""
            }

            SF.AAS.makeCall(CLICK2DIAL_NUMBER, CLICK2DIAL_PREFIX);
        }

        //execute APEX code
        sforce.opencti.runApex(param);
    } //end of MakeCallRunApex

    MakeCallRunApexCallback = function(response: any)
    {
        var CLICK2DIAL_PREFIX : string = "";
        if (response.success)
        {
            SF.AAS.log('Salesforce_MakeCallRunApexCallback API method call executed successfully! returnValue.runApex: ' + response.returnValue.runApex);
            CLICK2DIAL_PREFIX = response.returnValue.runApex;
            if (CLICK2DIAL_PREFIX == null || CLICK2DIAL_PREFIX == "")
            {
                SF.AAS.log('Salesforce_MakeCallRunApexCallback WARNING: got empty CLICK2DIAL_PREFIX');
                CLICK2DIAL_PREFIX = "";
            }
            else
            {
                //if CLICK2DIAL_PREFIX_TRANSLATE_TABLE exists, then translate CLICK2DIAL_PREFIX according to it, otherwise keep it as-is
                var CLICK2DIAL_PREFIX_TRANSLATE_TABLE = SF.AAS.GetCPFValueByName("CLICK2DIAL_PREFIX_TRANSLATE_TABLE", SF.Click2DialCall);
                if (CLICK2DIAL_PREFIX_TRANSLATE_TABLE == "" || CLICK2DIAL_PREFIX_TRANSLATE_TABLE == SF.AAS.CPF_DOES_NOT_EXIST || CLICK2DIAL_PREFIX_TRANSLATE_TABLE == SF.AAS.CPF_NOT_FOUND_IN_CALL)
                {
                    SF.AAS.log('Salesforce_MakeCallRunApexCallback CLICK2DIAL_PREFIX_TRANSLATE_TABLE is empty or not found, keep CLICK2DIAL_PREFIX untranslated');
                }
                else
                {
                    var notfound: boolean = true;
                    try 
                    {
                        var key: string;
                        var value: any;
                        
                        JSON.parse(CLICK2DIAL_PREFIX_TRANSLATE_TABLE, (key, value) => {
                            if (notfound && key == CLICK2DIAL_PREFIX && typeof value === 'string')
                            {
                                SF.AAS.log('Salesforce_MakeCallRunApexCallback replace CLICK2DIAL_PREFIX "' + CLICK2DIAL_PREFIX + '" by "' + value + '" according to CLICK2DIAL_PREFIX_TRANSLATE_TABLE');
                                CLICK2DIAL_PREFIX = value;
                                notfound = false;
                            }
                        });
                    } 
                    catch (e) 
                    {
                        SF.AAS.log('Salesforce_MakeCallRunApexCallback ERROR: got exception while parsing CLICK2DIAL_PREFIX_TRANSLATE_TABLE: ' + e.toString() + ', set empty CLICK2DIAL_PREFIX');
                        CLICK2DIAL_PREFIX = "";
                        //to skip additional warning message set notfound to false
                        notfound = false;
                    }
                    
                    if (notfound)
                    {
                        SF.AAS.log('Salesforce_MakeCallRunApexCallback WARNING: CLICK2DIAL_PREFIX "' + CLICK2DIAL_PREFIX + '" is not found in CLICK2DIAL_PREFIX_TRANSLATE_TABLE, set empty CLICK2DIAL_PREFIX');
                        CLICK2DIAL_PREFIX = "";
                    }
                }
            }
        }
        else 
        {
            SF.AAS.log('Salesforce_MakeCallRunApexCallback failed, Errors: [' + response.errors[0].code + '] ' + response.errors[0].description);
        }

        //even if RunApex failed we want to make call anyway (without dynamic prefix)
        var CLICK2DIAL_NUMBER = SF.AAS.GetCPFValueByName("CLICK2DIAL_NUMBER", SF.Click2DialCall);
        if (CLICK2DIAL_NUMBER == "" || CLICK2DIAL_NUMBER == SF.AAS.CPF_DOES_NOT_EXIST || CLICK2DIAL_NUMBER == SF.AAS.CPF_NOT_FOUND_IN_CALL)
        {
            SF.AAS.log('Salesforce_MakeCallRunApexCallback ERROR: CLICK2DIAL_NUMBER is empty or not found, skip ACC_MakeCall action');
            return;
        }
        
        SF.AAS.log('Salesforce_MakeCallRunApexCallback CLICK2DIAL_NUMBER: ' + CLICK2DIAL_NUMBER + ', CLICK2DIAL_PREFIX: ' +  CLICK2DIAL_PREFIX);
        SF.AAS.makeCall(CLICK2DIAL_NUMBER, CLICK2DIAL_PREFIX);
    } //end of MakeCallRunApexCallback

    //open object (Lead/Opportunity/Case/Account/Contact) by recordId
    SaveLog(crmaction: any, oc: OneCall) 
    {
        var SF_RECORD_ID: string = SF.AAS.RetrieveCRMActionParameterByName("SF_RECORD_ID", crmaction, oc);
        var SF_RECORD_TYPE: string = SF.AAS.RetrieveCRMActionParameterByName("SF_RECORD_TYPE", crmaction, oc);
        var SF_RECORD_NAME: string = SF.AAS.RetrieveCRMActionParameterByName("SF_RECORD_NAME", crmaction, oc);
        var SF_RECORDING_LINK_URL: string = SF.AAS.RetrieveCRMActionParameterByName("SF_RECORDING_LINK_URL", crmaction, oc);
        //var SF_RECORDING_LINK_URL_FIELD: string = SF.AAS.RetrieveCRMActionParameterByName("SF_RECORDING_LINK_URL_FIELD", crmaction, oc);
        var SF_RECORDING_LINK_SUBJECT: string = SF.AAS.RetrieveCRMActionParameterByName("SF_RECORDING_LINK_SUBJECT", crmaction, oc);
        //var SF_RECORDING_LINK_EXT_FIELD: string = SF.AAS.RetrieveCRMActionParameterByName("SF_RECORDING_LINK_EXT_FIELD", crmaction, oc);
        var SF_RECORDING_LINK_USER_ID: string = SF.AAS.agaenLogin.extension;
        //var SF_RECORDING_LINK_USER_ID_FIELD: string = SF.AAS.RetrieveCRMActionParameterByName("SF_RECORDING_LINK_USER_ID_FIELD", crmaction, oc);
        var SF_RECORDING_LINK_USER_NAME: string = SF.AAS.agaenLogin.name;
        //var SF_RECORDING_LINK_USER_NAME_FIELD: string = SF.AAS.RetrieveCRMActionParameterByName("SF_RECORDING_LINK_USER_NAME_FIELD", crmaction, oc);
        var SF_RECORDING_LINK_COMMENTS: string = SF.AAS.RetrieveCRMActionParameterByName("SF_RECORDING_LINK_COMMENTS", crmaction, oc);
        var SF_RECORDING_LINK_STATUS: string = SF.AAS.RetrieveCRMActionParameterByName("SF_RECORDING_LINK_STATUS", crmaction, oc);
        var SF_RECORDING_LINK_PRIORITY: string = SF.AAS.RetrieveCRMActionParameterByName("SF_RECORDING_LINK_PRIORITY", crmaction, oc);

        //calculating call duration;
        var callEnd: any = new Date().getTime();
        var callStart: any = oc.m_StartStatusDate.getTime();
        var SF_RECORDING_LINK_CALL_DURATION: any = new Date(callEnd - callStart);
    
        if (SF_RECORD_ID == "" || SF_RECORD_ID == SF.AAS.CPF_DOES_NOT_EXIST || SF_RECORD_ID == SF.AAS.CPF_NOT_FOUND_IN_CALL)
        {
            SF.AAS.log('Salesforce_SaveLog WARNING: mandatory parameter SF_RECORD_ID is empty or not found, skip action');
            return;
        }

        /*
        var params = {
            entityApiName : 'Task', 
            WhoId : SF_RECORD_ID,
            CallDisposition : 'Internal',
            CallObject : 'DemoCall',
            Description : 'Recording Link',
            Subject : SF_RECORDING_LINK_SUBJECT,
            Priority : 'Normal',
            Status : 'Completed',
            CallDurationInSeconds : '60',
            CallType : 'Inbound',
            Url__c : SF_RECORDING_LINK_URL,
            //SF_RECORDING_LINK_URL_FIELD : SF_RECORDING_LINK_URL,
            ExtNum__c : SF_RECORDING_LINK_URL,
            //SF_RECORDING_LINK_EXT_FIELD : SF_RECORDING_LINK_USER_ID,
            UserName__c : SF_RECORDING_LINK_USER_NAME,
            //SF_RECORDING_LINK_USER_NAME_FIELD : SF_RECORDING_LINK_USER_NAME,
            Type : 'Call'
            //WhatId : '0018d00000AH2dBAAT'
        };
              
        sforce.opencti.saveLog({
            value : {
                params
            },
            callback : SF.SaveLogCallback
        });
        */

        if(SF_RECORD_TYPE == "Lead" || SF_RECORD_TYPE == "Contact")
        {
            sforce.opencti.saveLog({
                value : {
                entityApiName : 'Task',
                WhoId : SF_RECORD_ID,
                CallDisposition : 'Internal',
                CallObject : 'DemoCall',
                Description : SF_RECORDING_LINK_COMMENTS,
                Subject : SF_RECORDING_LINK_SUBJECT,
                Priority : SF_RECORDING_LINK_PRIORITY,
                Status : SF_RECORDING_LINK_STATUS,
                CallDuration__c : SF_RECORDING_LINK_CALL_DURATION,
                CallType : 'Inbound',
                Url__c : SF_RECORDING_LINK_URL,
                //SF_RECORDING_LINK_URL_FIELD : SF_RECORDING_LINK_URL,
                ExtNum__c : SF_RECORDING_LINK_USER_ID,
                //SF_RECORDING_LINK_EXT_FIELD : SF_RECORDING_LINK_USER_ID,
                UserName__c : SF_RECORDING_LINK_USER_NAME,
                //SF_RECORDING_LINK_USER_NAME_FIELD : SF_RECORDING_LINK_USER_NAME,
                Type : 'Call'
                //WhatId : '0018d00000AH2dBAAT'
                },
                callback : SF.SaveLogCallback
            });
        }
        else
        {
            sforce.opencti.saveLog({
                value : {
                entityApiName : 'Task',
                WhatId : SF_RECORD_ID,
                CallDisposition : 'Internal',
                CallObject : 'DemoCall',
                Description : SF_RECORDING_LINK_COMMENTS,
                Subject : SF_RECORDING_LINK_SUBJECT,
                Priority : SF_RECORDING_LINK_PRIORITY,
                Status : SF_RECORDING_LINK_STATUS,
                CallDuration__c : SF_RECORDING_LINK_CALL_DURATION,
                CallType : 'Inbound',
                Url__c : SF_RECORDING_LINK_URL,
                //SF_RECORDING_LINK_URL_FIELD : SF_RECORDING_LINK_URL,
                ExtNum__c : SF_RECORDING_LINK_USER_ID,
                //SF_RECORDING_LINK_EXT_FIELD : SF_RECORDING_LINK_USER_ID,
                UserName__c : SF_RECORDING_LINK_USER_NAME,
                //SF_RECORDING_LINK_USER_NAME_FIELD : SF_RECORDING_LINK_USER_NAME,
                Type : 'Call'
                //WhatId : '0018d00000AH2dBAAT'
                },
                callback : SF.SaveLogCallback
            });

        }
  
        /*
        sforce.opencti.screenPop({
            type: sforce.opencti.SCREENPOP_TYPE.NEW_RECORD_MODAL,
            params: {
                entityName: SF_ENTITY_NAME,
                defaultFieldValues: SF_DEFAULT_VALUES_obj
            }, 
            callback: SF.CreateObjectCallback
        });
        sforce.opencti.saveLog({
            type: sforce.opencti.SCREENPOP_TYPE.SOBJECT,
            params: {recordId: SF_RECORD_ID}, 
            callback: SF.SaveLogCallback
        });
        */
    } //end of SaveLog

    SaveLogCallback = function(response: any)
    {
        if (response.success)
        {
            SF.AAS.log('Salesforce_SaveLogCallBack succeeded, returnValue: ' +  response.returnValue);
        }
        else
        {
            SF.AAS.log('Salesforce_SaveLogCallBack failed, Errors: [' + response.errors[0].code + '] ' + response.errors[0].description);
        }
    } //end of SaveLogCallback

} // end of class Salesforce
