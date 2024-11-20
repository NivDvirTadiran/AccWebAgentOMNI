import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnInit, OnChanges
} from "@angular/core";
import {CallItemModel} from "./CallItem/callItem.model";
import {statusLabel_new, statusLabel_open} from "../../../sb-main-desk/call-bar/status-label/status-label.component";



export type SessionList = CallItemModel[];

@Component({
  selector: "calls-list-new",
  // standalone: true,
  // encapsulation: ViewEncapsulation.None,
  // imports: [StatusLabel, Notification1, CallItem],
  templateUrl: "./CallsListNew.component.html",
  styleUrls: ["./CallsListNew.component.scss"],
})
export class CallsListNew  implements OnChanges {
  @HostBinding("style.display") display = "contents";
  @Input() sessions : SessionList;
  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() activeSessionChange = new EventEmitter<CallItemModel>();
  activeSession: CallItemModel;
  selected : any;

  isChecked(checkedUpdate: boolean){
    this.checkedChange.emit(checkedUpdate);
  }

  public sortSession = (val1, val2) => {
    return val2.lastMessageTime.getTime() - val1.lastMessageTime.getTime();
  };


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sessions) {
      this.sessions.sort(this.sortSession);
      }
    }

  onClickItem(currentItem : CallItemModel){
    if(currentItem.status == statusLabel_new)
      currentItem.status = statusLabel_open;
    this.activeSession = currentItem;
    this.sessions.forEach((session) => {
      session.clicked = false;
    })
    this.activeSession.clicked = true;
    this.activeSessionChange.emit(currentItem);

  }

  constructor() {}





}
