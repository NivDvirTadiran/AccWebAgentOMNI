import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
//import { MatTabsModule, MatDialog, MatInputModule, MatFormFieldControl,MatFormFieldModule, MatSelect, MatCheckboxModule } from '@angular/material';
//import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild, NgModule } from '@angular/core';
import { AccAgentService } from '../acc-agent.service';
import { AgentStatus,AccCallState,CallTypes, CallTypesText,OneCall } from '../data-model.interface';
import * as assert from "assert";


@Component({
  selector: 'app-telephony',
  templateUrl: './telephony.component.html',
  styleUrls: ['./telephony.component.scss']
})
export class TelephonyComponent implements OnInit {
  public AAC: AccAgentService;
  Telphony_imgcols = 7;

  currentCalltype:CallTypes = CallTypes.MAKECALL;

  // ==========================================[constructor]=================================
  constructor(aac: AccAgentService) {
    this.AAC = aac;
    this.currentCalltype = CallTypes.MAKECALL;
  }
  checked = false;
  indeterminate = false;
  labelPosition = 'call';
  disabled = false;
  NumberOfActions = null;
  // ==========================================[ngOnInit]=================================
  ngOnInit() {
    this.NumberOfActions = this.AAC.etasIni.Telephony.NumberOfActions;
  }
  radioChange(event: { value: string; }) {
    
    this.AAC.log("tel=> "+ event.value + " " + this.labelPosition);
    switch(event.value)
    {
      case 'call':              this.currentCalltype = CallTypes.MAKECALL; break;
      case 'StartConsultation': this.currentCalltype = CallTypes.CONSULTATION; break;
      case 'Transfer':          this.currentCalltype = CallTypes.TRANSFER; break;
    }
}
  // ==============================[rebuldActions ] =========================================
  rebuldActions() {
    if (this.NumberOfActions > 70) {this.NumberOfActions =  this.AAC.etasIni.Telephony.NumberOfActions ;return;}
    if (this.NumberOfActions < 10) {this.NumberOfActions =  this.AAC.etasIni.Telephony.NumberOfActions ;return;}
    this.AAC.etasIni.Telephony.NumberOfActions =this.NumberOfActions;
    this.AAC.prepareTelephony(this.AAC.etasIni.Telephony);
    //this.AAC.saveEtasIni();
  }
 // ==========================================[actionClicks]=================================
 actionClicks(idx: number) {
  this.AAC.log("tel=> actionClicks()=> " + idx + " " + this.AAC.TelephonyActions[idx].title);
  if (this.AAC.telNewBtnDialog == true)//don't allow activate action in middle of edit action
  {
    //setTimeout(function() { alert("in Middle of Other action editing"); }, 6);  
    //alert("in Middle of Other action editing");
    return;
  }
  if ((this.AAC.TelephonyActions[idx].datatype == "string" && this.AAC.TelephonyActions[idx].data == "") ||
      (this.AAC.TelephonyActions[idx].click == "")) 
  {
    this.actionDblClick(idx); 
    return;
  }
  let methodName = this.AAC.TelephonyActions[idx].click;
  if (this[methodName]) {
    this[methodName](this.AAC.TelephonyActions[idx].data);
  }
}
// ==========================================[actionDblClick]=================================
actionDblClick(idx: number) {
  this.AAC.log("tel=> actionDblClick()");

  if (this.AAC.telNewBtnDialog == true) {
    this.AAC.ShowAlert("in Middle of Other action editing");
    return;
  }
  this.AAC.ClearBtnShowFlags();

  this.AAC.log("tel=Double Click=> " + idx + " " + this.AAC.TelephonyActions[idx].title);
  if (this.AAC.TelephonyActions[idx].code == "") {
    this.AAC.category_idx = "";
    this.AAC.action_idx = "";
    this.AAC.TelCurrentActionUpdted = idx;
    this.AAC.TelCurrAction = this.AAC.TelephonyActions[idx];
    this.AAC.telNewBtnDialog = true;
    this.AAC.ChooseCategoryAndAction = true;
  }
  else // existing tel btn
  {
    this.AAC.SetCallType(this.AAC.TelephonyActions[idx].code);
    this.AAC.ChooseCategoryAndAction = true;
    this.AAC.ShowCategoryAndAction = true;
    this.AAC.PrepareTelBtnWin(idx);
  }
  this.AAC.captionSaved = this.AAC.TelCurrAction.titlesrc;
  this.AAC.dataSaved = this.AAC.TelCurrAction.data;
  this.AAC.codeSave = this.AAC.TelCurrAction.code;
}

// ==========================================[actionDblClick]=================================
phoneDblClick(idx: number) {
  this.AAC.log("tel=> actionDblClick()");

  if (this.AAC.telNewBtnDialog == true) {
    this.AAC.ShowAlert("in Middle of Other  # setting");
    return;
  }
  //this.AAC.ClearBtnShowFlags();

  this.AAC.log("tel => phone # Double Click=> " + idx + " " + this.AAC.etasIni.Directory.telNumbers[idx].telNumber);
  if (this.AAC.etasIni.Directory.telNumbers[idx].telNumber == "") {
    this.AAC.category_idx = "";
    this.AAC.action_idx = "";
    this.AAC.TelCurrentActionUpdted = idx;
    this.AAC.TelCurrAction = this.AAC.TelephonyActions[idx];
    this.AAC.ChooseCategoryAndAction = true;
  }
  else // existing tel btn
  {
    this.AAC.ChooseCategoryAndAction = true;
    this.AAC.ShowCategoryAndAction = true;
    this.AAC.PrepareTelBtnWin(idx);
  }
  this.AAC.captionSaved = this.AAC.TelCurrAction.titlesrc;
  this.AAC.dataSaved = this.AAC.TelCurrAction.data;
  this.AAC.codeSave = this.AAC.TelCurrAction.code;
}

  
   // ]=============================================================
    // ]=======================[ tel actions  events] ]===============
    // ]==============================================================
    //
    // ]====================   [loginChanged]=========================
    loginChanged() {
      var action = (this.AAC.agent.m_isLogon == false) ? "login" : "logout";
      this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + ", ," + this.AAC.agent.m_Extension + "," + String(this.AAC.userStatus.userReleased));
  }
       // =========================[superVisorHelp]==========================
       SupervisorHelp() {
        let on:number = 0;
        this.AAC.isSupervisorHelp = this.AAC.isSupervisorHelp == false ? true:  false;
        if (this.AAC.isSupervisorHelp == true) {on = 1;}
        this.AAC.setAccButton("acd_get_supervisor_hepId", on, false);
        this.AAC.PrepareAndPutNotification("supervisorhelp", "supervisorhelp" + ",000," + this.AAC.agent.m_AgentNo + "," + this.AAC.agent.m_Extension + "," + on + ",,,,");
    }
  // ]========================== [releaseChanged ]====================================
  releaseChanged() {
      this.AAC.agent.ReleaseCode = "1";
      var action = (this.AAC.userStatus.userReleased == true) ? "resume" : "release";
      this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + "1" + ",0,");
  }
  // ]========================== [readyChanged ]====================================
  //             Manually end the WrapUp state and become ready
  readyChanged() {
      if (this.AAC.agent.m_AgentStatus != AgentStatus.WrapUp) {
          this.AAC.message("Agent not in wrapup state");
          return;
      }
      var action = "wrapup";
      this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + " ," + ",0,");
  }
  recordingOn() {
    var action =  this.AAC.agent.m_isRecording == true ?  'stoprecording' : 'startrecording';
      console.log("recordingOn:  action = " + action);
   
    this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + this.AAC.agent.m_Extension);
}
  recordingSuspend() {
    if (this.AAC.agent.m_isRecording) {
      var action = this.AAC.agent.m_isRecordingSuspended == true ? 'suspendrecording' : 'resumerecording';
      var callid = this.AAC.getCurrentCallId();
        console.log("recordingSuspend:  action = " + action);

      this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callid + "," + this.AAC.agent.m_Extension);
    }
    else {
        console.log("PrepareAndPutNotification: " + "m_isRecording = " + this.AAC.agent.m_isRecording);
    }
}
  //------------------------
  selectedWC: string = "00";
  selectedRC: string = "01";
  selectedOneGroup: string = "00";

 // =========================== [WrapupCode ]===================================
   WrapupCode(data:string) {
 
    this.AAC.agent.WrapUpCode = this.selectedWC;
    var action = "setwrapupcode";
    this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + data + ",0,");
}
 // ============================[wrapUpControldState]=================
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
   releaseWithCode(data:string) {
    this.AAC.agent.ReleaseCode = data;
    this.AAC.ShowReleaseCodes = false;
    var action = "release";
    this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + this.AAC.agent.ReleaseCode + ",0,");
   }
  // ]=========================== [RCchanged ]===================================
 
   //===============================[logon / logout one group]=====================
   SelectOngroupOpen(data:string) {
    var action = "logingroup";
    var idx: number = this.AAC.ACC.m_GroupsList.map(c => c.Key).indexOf(data);
    if (this.AAC.ACC.m_GroupsList[idx].Flag == true) {
        action = "logoutgroup";
    }
    this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + ", ," + this.AAC.agent.m_Extension + ",true," + data + ",0,");
  }
 // ]========================== [disconnectCall ]===========================================
  disconnectCall() {
      var action = 'disconnectcall';
      var callid = this.AAC.getCurrentCallId();
      this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callid + "," + this.AAC.agent.m_Extension);
  }
  // ]============================ [answerCall ]================================
  answerCall() {
      var action = 'answercall';
      var callid = this.AAC.getCurrentCallId();
      this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callid + "," + this.AAC.agent.m_Extension);
  }
  // 
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


      var callId = this.AAC.getCurrentCallId();
      var idxh = this.AAC.getLastCallIdxByCallState(AccCallState.Hold);
      if (idxh == -1 || callId == "") {
          this.AAC.log("completeTransfer Error: request - hold call not found");
          return;
      }
      var callh: OneCall = this.AAC.callsArray[idxh];

      var action = 'completetransfer';
      this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + callh.m_CallId + "," + this.AAC.agent.m_Extension + "," + callId + "," + this.AAC.agent.m_Extension);
  }
  // ]========================== [completeConference ]===========================================
  completeConference() {
      var callId = this.AAC.getCurrentCallId();
      var idxh = this.AAC.getLastCallIdxByCallState(AccCallState.Hold);
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
  // ]========================== [breakIn ]========================================
  breakIn(data: string) {
      var action = 'bargin';
      this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + ","  + this.AAC.agent.m_Extension  + "," + data);
  }
  // ]========================== [transferToAgent ]========================================
  TransferToAgent(data: string) {
    let found1: any = this.AAC.agentsReadyList.find(elem => elem.name == data);
    if (found1 != undefined) {
      console.log ("Telphony=>transferToAgent(): " + found1.ext);
      this.AAC.transferCall(found1.ext);
    }
  }
  // ]========================== [setCallbackStatus ]========================================
  setCallbackStatus() {

  }
  // ]========================== [silentMonitor ]========================================
  silentmonitor(data: string) {
      var action = 'silentmonitor';
      this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + this.AAC.agent.m_Extension + "," + data);
  }
  // ]========================== [whisper ]========================================
  whisper(data: string) {
    var action = 'whisper';
    this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + this.AAC.agent.m_Extension + "," + data);
}
  // ]========================== [RecordGreeting ]==================================
  recordgreeting(data: string) {
    var action = 'recordgreeting';
    this.AAC.PrepareAndPutNotification(action, action + ",000," + this.AAC.agent.m_AgentNo + "," + this.AAC.agent.m_Extension + "," + data);
}
// ]========================== [reconnectCall ]================================
  reconnectCall() {
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


  
  // ======================================[ phonenumber ]====================================================
  phonenumber(data: string)
  {
    this.AAC.callType =  this.currentCalltype; 
    this.AAC.handleDialpadCall(data);
  }
  
  // ======================================[callNumber]=======================================================
  callNumber(data: string) {
    this.AAC.callType = CallTypes.MAKECALL;
    this.AAC.handleDialpadCall(data);
  }
  // ]========================== [transfer ]===========================================
  transfer(data: string) {
    this.AAC.callType = CallTypes.TRANSFER;
    this.AAC.transferCall(data);
  }

  // ]========================== [startConsultation ]===========================================
  startConsultation(data: string) {
    this.AAC.callType = CallTypes.CONSULTATION;
    this.AAC.consultationCall(data);
  }
   // ]========================== [logout and exit ]===========================================
   agentLogoff(data: string) {
    this.AAC.agentLogoff(true,false);
   }

}
