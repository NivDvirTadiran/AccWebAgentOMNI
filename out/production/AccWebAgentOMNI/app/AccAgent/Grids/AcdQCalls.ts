import { Component, ViewChild, ViewEncapsulation, OnInit, OnDestroy, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';
//import 'rxjs/add/observable/of';
import { AccAgentService } from '../acc-agent.service';
import { noop as _noop } from 'lodash-es';
import { AccCallProfileComponent } from '../acc-call-profile/acc-call-profile.component';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { CPini } from '../data-model.interface';
@Component({
  selector: 'acd-q-calls',
  styleUrls: ['Grids.scss'],
  templateUrl: 'AcdQCalls.html',
  //encapsulation: ViewEncapsulation.None 
})

export class AcdQCalls implements OnInit {
  // ==========================================[constructor] ================================
  constructor(public AAC: AccAgentService, public ACPC: AccCallProfileComponent, public translate: TranslateService) {
  }
  //
  public items: MenuItem[];
  public itemsRow: MenuItem[];
  public itemsHeader: MenuItem[];
  public selected: any;
  public idx = -1;
  // ==========================================[ngOnInit] ====================================
  ngOnInit() {
    var i, ii, iii, iiii;
    this.translate.get("Insert").subscribe((text: string) => { i = text });
    this.translate.get("Delete").subscribe((text: string) => { ii = text });
    this.translate.get("Edit").subscribe((text: string) => { iii = text });
    this.itemsHeader = [
      { label: i, command: (event) => this.insertColumn(this.idx) },
      { label: iii, command: (event) => this.EditColumn(this.idx) },
      { label: ii, command: (event) => this.deleteColumn(this.idx) },
    ]
    this.translate.get("Pickup").subscribe((text: string) => { i = text });
    this.itemsRow = [
      { label: i, command: (event) => this.AAC.PickupCall(this.selected, "PickupCall") }];
  }
  // ==========================================[ngOnDestroy] ====================================
  //
  MouseDown(rowData, evt, event) {
    if (evt == "header") {
      this.idx = rowData;
      this.items = this.itemsHeader;
      this.selected = undefined;
    }
    else {
      this.idx = -1;
      this.selected = rowData;
      this.items = this.itemsRow;
    }
  }
  //
  insertColumn(idx: number) {
    this.AAC.curOCP = this.AAC.OCPQ;
    this.AAC.beforeIdx = idx;
    this.AAC.CPorQCP = 2;
    this.ACPC.setCPList();
    this.AAC.cpInsert = true;
    this.AAC.cpDialogQ = true;
  }
  //
  deleteColumn(idx: number) {
    this.AAC.beforeIdx = idx;
    this.AAC.CPorQCP = 2;
    this.AAC.cpDialogQ = false;
    this.AAC.DeleteCpField();
  }
  //
  EditColumn(idx: number) {
    if (this.AAC.cpDialogL == true) { return; }
    this.AAC.curOCP = this.AAC.OCPQ;
    var a = this.AAC.QCP[idx].Index;
    var b = this.AAC.curOCP.find(x => x.Key === a);

    this.AAC.m_CpIni = new CPini(this.AAC.QCP[idx].Index,
                                 this.AAC.QCP[idx].Format,
                                 this.AAC.QCP[idx].Header,
                                 this.AAC.QCP[idx].Sort,
                                 this.AAC.QCP[idx].Width,
                                 b.Desc);
    this.AAC.beforeIdx = idx;
    this.AAC.CPorQCP = 2;
    this.AAC.cpInsert = false;
    this.AAC.cpDialogQ = true;
  }
  //
  onColReorder(val:any){
    console.log("AcdQCalls ==> onColReorder: " + val);
    this.AAC.updateCallQHeaderReorder(val.columns);
  }
//==============================================================
}

