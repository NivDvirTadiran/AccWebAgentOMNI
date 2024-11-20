import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {StatusLabel} from "../../.././sb-main-desk/call-bar/status-label/status-lable.model";


@Component({
  selector: "app-calls-actions",
  templateUrl: "./calls-actions.component.html",
  styleUrls: ["./calls-actions.component.scss"]
})
export class CallsActionsComponent {
  @Input() type = "Default";
  @Input() actionBar = "No";
  @Output() onChange = new EventEmitter<StatusLabel>();

  changeStatus(status : StatusLabel)
  {
      this.onChange.emit(status);
  }

}
