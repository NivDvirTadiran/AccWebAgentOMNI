import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {
  statusLabel_close,
  statusLabel_open,
  statusLabels,
  statusLabel_timer, statusLabel_waiting
} from "./status-label/status-label.component";
import {StatusLabel} from "./status-label/status-lable.model";
import {CallItemModel} from "../../sb-call-bar/call-list/CallsListNew/CallItem/callItem.model";
import { ModalComponent } from './modal-popup/modal-popup.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";
import {BubbleModel} from "../chat/bubble/bubble.model";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
@Component({
  selector: "app-call-bar",
  templateUrl: "./call-bar.component.html",
  styleUrls: ["./call-bar.component.scss"]
})
export class CallBarComponent implements OnInit{
  @Input() goal: "Chat" | "Dashboard" | "Bot" = "Chat";
  @Input() option: "Default" | "1" | "2" | "Admin Block" | "Client Blocked" = "2";
  @Input() activeSession: CallItemModel;
  @Output() closeSession = new EventEmitter<string>();

  activeStatus: StatusLabel;

  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private modalService: MdbModalService) {}


  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-dialog-centered'
    })


    this.modalRef.onClose.subscribe((result: any) => {
      console.log(" result2" + result);
      if(result != null)
          this.closePopup(result);
    });
  }


  public get classes(): string[] {

    return ['app-call-bar',`app-call-bar--${this.option}`];
  }


  isGrayed(status : StatusLabel): any {
    this.activeStatus = this.activeSession.status;
    return this.activeSession.status != status;
  }

  statusChange(status : StatusLabel){
    if(status != this.activeStatus && this.activeStatus != statusLabel_close && this.activeStatus !=  null && status != statusLabel_close)
    {
      this.activeStatus = status;
      this.activeSession.status = status;
    }
    if(status == statusLabel_close)
    {
      this.openModal();
    }
  }

  closePopup(result: string){
      this.activeSession.summaryMessage = result;
      this.activeStatus = statusLabel_close;
      this.activeSession.status = statusLabel_close;
      this.closeSession.emit(this.activeSession.m_CallId);
  }

  ngOnInit(): void {
    this.activeSession = new class implements CallItemModel {
      m_CallId: string;
      checked: boolean;
      customerName: string;
      channelType: string;
      isGrayed: boolean;
      isShowItem: boolean;
      notification: boolean;
      status: StatusLabel;
      lastMessage: string;
      lastMessageTime: Date;
      clicked: boolean;
      summaryMessage: string;
      //lastBubble: BubbleModel;
    };
  }

  statusLabel_open: StatusLabel = statusLabel_open;
  statusLabel_close: StatusLabel = statusLabel_close;
  statusLabel_timer: StatusLabel = statusLabel_timer;
  statusLabel_waiting: StatusLabel = statusLabel_waiting;
  statusLabels = statusLabels;
}
