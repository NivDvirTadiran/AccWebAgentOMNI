import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {
  statusLabel_close,
  statusLabel_open,
  statusLabels,
  statusLabel_timer, statusLabel_waiting, statusLabel_new
} from "src/stories/sb-main-desk/call-bar/status-label/status-label.component";
import {StatusLabel} from "../../../.././sb-main-desk/call-bar/status-label/status-lable.model";



export const Status = {open, };
@Component({
  selector: "app-drop-down-status-change",
  templateUrl: "./drop-down-status-change.component.html",
  styleUrls: ["./drop-down-status-change.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownStatusChangeComponent {
  @Input() text: string = "text";
  @Input() optionVisible = "No";
  @ViewChild('currentStatus') currentStatus!: ElementRef;
  @Output() onChangeStatus = new EventEmitter<StatusLabel>();

  onSelectedStatus():void
  {
    let val = this.currentStatus.nativeElement.value;
    let status: StatusLabel;

    switch (val) {
      case "open":
        status = statusLabel_open;
        break;
      case "close":
        status = statusLabel_close;
        break;
      case "waiting":
        status = statusLabel_waiting;
        break;
      case "timer":
        status = statusLabel_timer;
        break;

    }
    this.onChangeStatus.emit(status);
  }


}
