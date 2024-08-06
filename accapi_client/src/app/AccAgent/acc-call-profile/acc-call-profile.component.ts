

import {Component,AfterContentInit,OnInit} from '@angular/core';
import { FormsModule, FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { AccAgentService } from '../acc-agent.service';
import {AccAgentConf,Key_Desc,CP_EXT_FIELDS,CP_EXT}  from '../data-model.interface';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-acc-call-profile',
  templateUrl: './acc-call-profile.component.html',
  styleUrls: ['./acc-call-profile.component.scss']
})
export class AccCallProfileComponent implements OnInit{

  public cp_width: string = "100";
  public cp_idx:string = "";
  public cp_header:string = "";
  public cp_alignment:string = "Left";
  public cp_desc:any = "";
 
  AAC:AccAgentService = null;
  ACC:AccAgentConf = null;
  constructor(public AACx: AccAgentService) 
  {
     this.AAC = AACx;
     this.ACC = this.AAC.ACC;
     if (this.AAC.m_CpIni != null)
     {
      this.cp_width = this.AAC.m_CpIni.Width;
      this.cp_idx = this.AAC.m_CpIni.Index;
      this.cp_header = this.AAC.m_CpIni.Header;
      this.cp_alignment = this.AAC.m_CpIni.Format;
      this.cp_desc = this.AAC.m_CpIni;
     }
  }
 //
 ngOnInit() {
   
 }    
//
setCPList()
{
  //this.CP = this.ACC.m_CallProfileLists;
}
//
  cancel()
  {
    this.AAC.cpDialog = false;
    this.AAC.cpDialogQ = false;
    this.AAC.cpDialogL = false;
  }
  //
  update()
  {
    this.AAC.cpDialog = false;
    this.AAC.cpDialogQ = false;
    this.AAC.cpDialogL = false;
    var key:string = "";
    var b:number = this.AAC.curOCP.map(x => x.Key).indexOf(this.cp_idx);
    key = this.AAC.curOCP[b].Key;
    if (this.cp_header == "")
    {
      //if (this.AAC.CPorQCP == 1)
      {
        this.cp_header = this.AAC.curOCP[b].Desc;
      }
    }
    if (this.AAC.cpInsert == true)
    {
      this.AAC.InsertNewCp(key,this.cp_header,this.cp_alignment,this.cp_width);
    }
    else
    {
      this.AAC.UpdateCp(key,this.cp_header,this.cp_alignment,this.cp_width);
    }
  }
}


