import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AccAgentService } from '../acc-agent.service';
import { AccAgentConf, Key_Desc } from '../data-model.interface';
//
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild, NgModule } from '@angular/core';
import { AccOneButton2, accbutton } from './AccBtnsDef';
//
@Component({
  selector: 'app-tel-win-btn',
  templateUrl: './tel-win-btn.component.html',
  styleUrls: ['./tel-win-btn.component.scss']
})
export class TelWinBtnComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSelect, { static: true}) matSelect: MatSelect;
  AAC: AccAgentService = null;
  ACC: AccAgentConf = null;
  selected_category: string = "";
  public action_idx: string = "";
  public category_idx: string = "";
  //====================[constructor]==================
  constructor(public AACx: AccAgentService) {
    this.AAC = AACx;
    this.ACC = this.AAC.ACC;
  }
  //====================[ngOnInit]======================
  ngOnInit() {
  }
  //====================[ngAfterViewInit]===============
  ngAfterViewInit() {
    //this.CP = this.ACC.m_CallProfileLists;
  }
  //====================[PrepareSubCategory]===========
  PrepareSubCategory(evt) {
    this.AAC.ClearBtnShowFlags();
    this.AAC.ChooseCategoryAndAction = true;
    this.AAC.ShowCategoryAndAction = true;
    this.category_idx = evt.value;
    this.AAC.log("tel-win-btn=> PrepareSubCategory: " + evt.value);
    this.AAC.CurActionList = this.AAC.GetChosenActionList(evt.value);
  }
  //====================[PrepareAction]=================
   
   PrepareAction(evt, idx) {
    this.AAC.ClearBtnShowFlags();
    this.AAC.ChooseCategoryAndAction = true;
    this.AAC.ShowCategoryAndAction = true;

    // save ini data
   
    this.AAC.captionSaved =  this.AAC.TelCurrAction.titlesrc;
    this.AAC.dataSaved    =  this.AAC.TelCurrAction.data;
    this.AAC.codeSave     =  this.AAC.TelCurrAction.code;
    //
    this.AAC.action_idx = this.action_idx;


    this.AAC.TelBtnActivgetDataByActionType(this.action_idx);
    this.AAC.TelCurrAction.code = this.action_idx;
    this.AAC.log("tel-win-btn=> PrepareSubCategory: " + this.AAC.action_idx);
  }
  //====================[selectedRC]=================
  selectedRC: string = "";
  RCchanged(evt)
  {
    this.AAC.log("tel-win-btn=>RCchanged()");
    this.AAC.TelCurrAction.data = evt.value;
    this.selectedRC = evt.value;
  } //====================[selectedRC]=================
  selectedTtA: string = "";
  TaACchanged(evt)
  {
    this.AAC.log("tel-win-btn=>TaACchanged()");
    this.AAC.TelCurrAction.data = evt.value;
    this.selectedTtA = evt.value;
  }
  //====================[selectedWC]=================
  selectedWC: string = "";
  WCchanged(evt)
  {
    this.AAC.log("tel-win-btn=>WCchanged()");
    this.AAC.TelCurrAction.data = evt.value;
    this.selectedWC = evt.value;
  }
   //====================[selectedgrp]=================
   selectedOneGroup: string = "";
   SelctedOneGroup(evt)
   {
     this.AAC.log("tel-win-btn=>SelctedOneGroup()");
     this.AAC.TelCurrAction.data = evt.value;
     this.selectedOneGroup = evt.value;
   }
  //====================[Update]=================
  Update() {
     this.AAC.log("tel-win-btn=> Update: " + this.AAC.TelCurrentActionUpdted + " " + this.AAC.TelCurrAction.code);
     var err = this.AAC.PrepareBtnTitle(this.AAC.TelCurrAction,this.AAC.TelCurrentActionUpdted,this.AAC.TelCurrAction.data,false);
    if (err != "")     
    {
      alert("tel-win-btn=> Update: "  + this.AAC.TelCurrAction.code + "\n" + err );
      
      return;
    }
    this.AAC.saveEtasTelActions();
    this.AAC.telNewBtnDialog = false;
     this.AAC.ClearBtnShowFlags();
     this.AAC.prepareTelephony(this.AAC.etasIni.Telephony);
  }
  //====================[Remove]=================
  Remove() {
    this.AAC.log("tel-win-btn=> Remove: " + this.AAC.TelCurrentActionUpdted + " " + this.AAC.TelCurrAction.code);
    this.ClearBtn();
    this.AAC.ClearBtnShowFlags();
    this.AAC.saveEtasTelActions();
    this.AAC.telNewBtnDialog = false;
  }
  //====================[Cancel]=================
  Cancel() {
      this.AAC.log("tel-win-btn=> Cancel: " + this.AAC.TelCurrentActionUpdted + " " + this.AAC.TelCurrAction.code);
      this.AAC.TelCurrAction.titlesrc = this.AAC.captionSaved ;
      this.AAC.TelCurrAction.data = this.AAC.dataSaved ;
      this.AAC.TelCurrAction.code = this.AAC.codeSave;
      this.AAC.ClearBtnShowFlags();
      this.AAC.telNewBtnDialog = false;
  }
 //====================[ClearBtn]=================
 ClearBtn()
  {
    this.AAC.TelCurrAction.code = "";
    this.AAC.TelCurrAction.titlesrc = "";
    this.AAC.TelCurrAction.title = "";
    this.AAC.TelCurrAction.isMust = false;
    this.AAC.TelCurrAction.data = "";
  }

}
