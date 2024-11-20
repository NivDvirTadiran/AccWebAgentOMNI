import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SessionList} from "./CallsListNew/CallsListNew.component";
import {StatusLabel} from "../.././sb-main-desk/call-bar/status-label/status-lable.model";
import {statusLabel_open, statusLabel_new, statusLabel_waiting, statusLabel_close, statusLabel_timer} from "../.././sb-main-desk/call-bar/status-label/status-label.component";
import {CallItemModel} from "./CallsListNew/CallItem/callItem.model";

@Component({
  selector: "app-calls-list",
  templateUrl: "./call-list.component.html",
  styleUrls: ["./call-list.component.scss"],
})
export class CallListComponent {
  @Input() isAll: true | false = false;
  @Input() isSelected: true | false = true;
  @Input() statusType : StatusLabel = statusLabel_open;
  @Input() sortStatusVar : string;
  @Input() sessions : SessionList;
  @Output() sessionChange = new EventEmitter<CallItemModel>();

  updateChecked(isChecked: boolean)
  {
    this.sessions.forEach((session) => {
      session.checked = isChecked;
    })
    this.isAll = isChecked;
    if(this.isSelected || this.isAll)
    {
      this.isSelected = false;
    }
    else {
      this.isSelected = true;
    }
  }

  activeSessionChange(currentSession :CallItemModel){
    this.sessionChange.emit(currentSession);
  }

  isOneSelected()
  {
    this.isSelected = true;
    this.sessions.forEach((session) => {
      if(session.checked)
        this.isSelected = false;
    })
  }

  onStatusChange(status : StatusLabel){
    this.statusType = status;
    this.sessions.forEach((session) => {
      if(session.checked && session.status != statusLabel_close)
          session.status= status;
    })
  }

  sortStatus(sortVar: string)
  {
    this.sessions.forEach((session) => {
      switch (sortVar) {
        case "all":
          session.isShowItem = true;
          break;
        case "new":
          if(session.status == statusLabel_new)
            session.isShowItem = true;
          else session.isShowItem = false;
          break;
        case "open":
          if(session.status == statusLabel_open)
            session.isShowItem = true;
          else session.isShowItem = false;
          break;
        case "waiting":
          if(session.status == statusLabel_waiting)
            session.isShowItem = true;
          else session.isShowItem = false;
          break;
        case "timer":
          if(session.status == statusLabel_timer)
            session.isShowItem = true;
          else session.isShowItem = false;
          break;
        case "close":
          if(session.status == statusLabel_close)
            session.isShowItem = true;
          else session.isShowItem = false;
          break;
      }
    })
  }

  filterByChannel(channelChecked : any[])
  {
    if(channelChecked.length == 0)
    {
      this.sessions.forEach((session) => {
        session.isShowItem = true;
      })
      return;
    }
    for (let session of this.sessions)
    {
        session.isShowItem = false;
        for (let channel of channelChecked)
        {
          if (session.channelType == "facebook" && channel == 'פייסבוק')
          {
            session.isShowItem = true;
          }
          if (session.channelType == "chat" && channel == "צ'אט")
          {
            session.isShowItem = true;
          }
          if (session.channelType == "messenger" && channel == "מסנג'ר")
          {
            session.isShowItem = true;
          }
          if (session.channelType == "instegram" && channel == "אינסטגרם")
          {
            session.isShowItem = true;
          }
          if (session.channelType == "sms" && channel == "sms")
          {
            session.isShowItem = true;
          }
          if (session.channelType == "Whatsapp" && channel == "Whatsapp")
          {
            session.isShowItem = true;
          }
          if (session.channelType == "email" && channel == 'דוא\"ל')
          {
            session.isShowItem = true;
          }
          if (session.channelType == "voice" && channel == 'שיחה קולית')
          {
            session.isShowItem = true;
          }

        }
    }
  }

}
