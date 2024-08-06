import { Component, ViewChild,OnInit, AfterViewInit } from '@angular/core';
import { AccAgentService} from '../acc-agent.service';
import { AccCallProfileComponent } from '../acc-call-profile/acc-call-profile.component';
import { noop as _noop } from 'lodash-es';
import { CPini,CP_LOG_FIELDS,CP_CODES,CP_EXT } from '../data-model.interface';
import {MenuItem} from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
//
@Component({
  selector: 'calls_log',
  styleUrls: ['Grids.scss'],
  templateUrl: 'CallsLog.html',
})
export class CallsLog implements OnInit {
  limit: number = 10000;
  
   constructor(public AAC: AccAgentService, public ACPC: AccCallProfileComponent,public translate: TranslateService) {
   
  }

  public items: MenuItem[];
  public itemsRow: MenuItem[];
  public itemsHeader: MenuItem[];
  public selected: any;
  public idx = -1;


  ngOnInit() {
    var i,ii,iii,iiii;
    this.translate.get("Insert").subscribe((text:string) => {i = text});
    this.translate.get("Delete").subscribe((text:string) => {ii = text});
    this.translate.get("Edit").subscribe((text:string) => {iii = text});
    this.itemsHeader = [
      { label: i, command: (event) => this.insertColumn(this.idx) },
      { label: iii, command: (event) => this.EditColumn(this.idx) },
      { label: ii, command: (event) => this.deleteColumn(this.idx) },
    ]
  }
    //
    // ========= header menu , insert remove column ==========
    MouseDown(rowData,evt,event) {
      if (evt  == "header"){
        this.idx = rowData;
        this.items = this.itemsHeader;
        this.selected = undefined;
      }
      else{
       this.idx = -1;
       this.selected = rowData;
      }
  }
    //
    insertColumn(idx: number) {
      if (this.AAC.cpDialogL == true) {return;}
      this.AAC.curOCP = this.AAC.OCP;
      
      this.AAC.beforeIdx = idx;
      this.AAC.CPorQCP = 1;
      this.ACPC.setCPList();
      this.AAC.cpDialogL = true;
      this.AAC.cpInsert = true;
      this.AAC.m_CpIni = null;
    }
    EditColumn( idx: number) {
      if (this.AAC.cpDialogL == true) {return;}
      this.AAC.curOCP = this.AAC.OCP;
      var a = this.AAC.LogCP[idx].Index;
      var b = this.AAC.curOCP.find(x => x.Key === a);
  
      this.AAC.m_CpIni = new CPini(this.AAC.LogCP[idx].Index,
                                   this.AAC.LogCP[idx].Format,
                                   this.AAC.LogCP[idx].Header,
                                   this.AAC.LogCP[idx].Sort,
                                   this.AAC.LogCP[idx].Width,
                                   b.Desc);
      this.AAC.beforeIdx = idx;
      this.AAC.CPorQCP = 1;
      this.AAC.cpInsert = false;
      this.AAC.cpDialogL = true;
    }
  
    //
    deleteColumn(idx: number) {
      this.AAC.beforeIdx = idx;
      this.AAC.cpDialogL = false;
      this.AAC.CPorQCP = 1;
      this.AAC.DeleteCpField();
  }
   row:any = null;
  calling:any = "";
  called:any = "";
  starttime:any = "";
  endtime:any = "";
  laststate: any = "";
  note:any = "";
  curIdx:number = -1;
  //
  PrepareRowRealFields(row:any)
  {
        for (let key of Object.keys(row)) {
          let value = row[key];
          switch (key.substring(2))  
          {
            case CP_CODES.ANI:
              this.calling = value; 
            break;
            //
            case CP_EXT.IDX_CALLS_STAT_CALL_CALLED.toString():
              this.called = value; 
            break;
            //
            case CP_EXT.IDX_CALLS_STAT_CALL_ANI.toString():
              this.calling = value; 
            break;
            //
            case CP_EXT.IDX_CALLS_STAT_CALL_START.toString():
              this.starttime = value; 
            break;
            //
            case CP_EXT.IDX_CALLS_STAT_CALL_END.toString():
              this.endtime = value; 
            break;
            //
            case CP_EXT.IDX_CALLS_STAT_CALL_STATE.toString():
              this.laststate = value; 
          }
        }
        this.note = row.zzz_note;
       return row;
  }

  //
  // delFromhighlightedRows(row)
  // {
  //   var x = this.AAC.highlightedRows.indexOf(row);
  //   if (x != -1) // alreagy
  //   {
  //     this.AAC.highlightedRows.splice(x,1);
  //     this.row = null;
  //     this.curIdx = -1;
  //   }
  //   return x;
  // }
  //
  highlightedRows(event,idx,row)
  {
    if (row == null || row.zzz_CID == -1 )
    {
      this.row = null;
      this.curIdx = -1;
      return;
    }
    var x = this.AAC.callsLog.map(e => e.m_CallId).indexOf(row.zzz_CID);
    if (this.row == null || row.zzz_CID != this.row.zzz_CID) {
      if (x != -1) {
        this.row = row;
        this.curIdx = x;
        return;
      }
    }
    this.row = null;
    this.curIdx = -1;
  }
  //
  //
  Update()
  {
      this.row.zzz_note = this.note;
      this.AAC.CallsLogStatData[this.curIdx] = this.row;
      this.Cancel();
  }

  Cancel()
  {
    //this.delFromhighlightedRows(this.row);
    // this.row = null;
    // this.curIdx = -1;
    this.AAC.propDialog = false;
  }
  Properties()
  {
    if (this.selected == null)
    {
     return;
    }
    this.PrepareRowRealFields(this.row);
    this.AAC.propDialog = true;
    this.AAC.cpDialogL = false;
  }
  //
  ClearLog()
  {
    this.AAC.callsLog = [];
    this.AAC.prepareCallLogGridData();
    this.row = null;
  }
  //
  DeleteRecord()
  {
    if (this.curIdx != -1)
    {
      this.AAC.callsLog.splice(this.curIdx,1);
      this.row = null;
      this.AAC.prepareCallLogGridData();
    }

  }
  onColReorder(val:any){
    console.log("CallsLog ==> onColReorder: " + val);
    this.AAC.updateCallLogsHeaderReorder(val.columns);
  }

}