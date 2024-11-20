import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {ChatLog} from "./chat/chat.component";
import {CallItemModel} from "../sb-call-bar/call-list/CallsListNew/CallItem/callItem.model";


export type MainDaskData = {
  typingBarReply: FormGroup<any>,
  isLoading: true,
  saveDetailErrorMessage: {}
  chatLog: ChatLog
}

@Component({
  selector: "sb-main-desk",
  templateUrl: "./sb-main-desk.component.html",
  styleUrls: ["./sb-main-desk.component.scss"]
})
export class SbMainDeskComponent  implements OnInit {

  @Input() mainDaskData!: MainDaskData;

  @Output() onSendMessage = new EventEmitter<string>();

  @Input() property1 = "Default";

  @Input() activeSession: CallItemModel;

  @Output() closeSessionByAgent = new EventEmitter<string>();

  ngOnInit(): void {
    this.property1 = "Default";
  }

  closeSession(callId: string){
    this.closeSessionByAgent.emit(callId);
    this.property1 = "Close"
  }

}
