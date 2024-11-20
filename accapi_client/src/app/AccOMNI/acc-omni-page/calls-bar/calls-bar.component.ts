import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AccAgentService} from "src/app/AccAgent/acc-agent.service";
import {SessionList} from "../../../../stories/sb-call-bar/call-list/CallsListNew/CallsListNew.component";
import {
  statusLabel_close,
  statusLabel_open
} from "../../../../stories/sb-main-desk/call-bar/status-label/status-label.component";
import {StatusLabel} from "../../../../stories/sb-main-desk/call-bar/status-label/status-lable.model";
import {CallItemModel} from "../../../../stories/sb-call-bar/call-list/CallsListNew/CallItem/callItem.model";
import {of} from "rxjs";
import {OneCall} from "../../../AccAgent/one-call.interface";
import {ChatLog, MsgGroup} from "../../../../stories/sb-main-desk/chat/chat.component";
import {tap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";



@Component({
  selector: 'call-bar',
  templateUrl: './calls-bar.component.html',
  styleUrls: ['./calls-bar.component.css']
})
export class CallsBarComponent {

  @Input() public onViewSessionId: string;
  @Output() onViewSessionIdChange = new EventEmitter<string>();
  @Input() statusType : StatusLabel = statusLabel_open;
  @Output() sessionChange = new EventEmitter<CallItemModel>();

  sessionOnChange(currentSession: CallItemModel) {

    const foundCall = this.sessions.find(oc => oc.m_CallId === currentSession.m_CallId);
    if (foundCall) {
      this.updateSession(currentSession)
      this.onViewSessionIdChange.emit(currentSession.m_CallId);
    }
  }

  updateSession(currentSession: CallItemModel) {
    let callId = currentSession.m_CallId;
    of(this.AAC.callsArray.map(oc => oc.m_CallId).indexOf(callId)).subscribe(index => {
        if (index != -1) {this.AAC.callsArray[index].m_sessionDetails = currentSession;}
    });
    of(this.AAC.callsLog.map(oc => oc.m_CallId).indexOf(callId)).subscribe(index => {
      if (index != -1) {this.AAC.callsLog[index].m_sessionDetails = currentSession;}
    });
  }

  constructor(private AAC: AccAgentService) {}

  get sessions(): SessionList {
    return this.AAC.callsArray.map(oc => oc.m_sessionDetails)
            .concat(this.AAC.callsLog.map(oc => oc.m_sessionDetails));
  }

  public closeSession(callId: string) {
    const foundCall = this.sessions.find(oc => oc.m_CallId === callId);
    if (foundCall)
    {
      foundCall.status = statusLabel_close;
    }
  }


}
