import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {
  StatusLabelComponent,
  statusLabel_open,
  statusLabel_block, statusLabel_timer
} from "src/stories/main-desk/status-label/status-label.component";
//import {statusLabel_open} from "../../../main-desk/status-label/status-label.component";
@Component({
  selector: "app-call-item",
  templateUrl: "./call-item.component.html",
  styleUrls: ["./call-item.component.scss"],
})
export class CallItemComponent {
  @Input() state:
    | "Default"
    | "Hover"
    | "Selected"
    | "Dashboard"
    | "Phone"
    | "Dashboard hover" = "Default";
  @Input() checkbox: "No" | "Yes" = "No";
  @Input() notification: "No" | "Yes" | "flag hover" = "Yes";
  @Input() status: "Timer" | "Open" | "Block" = "Open";
  @Input() flag: "No" | "Yes" = "No";

  protected readonly statusLabel_open = statusLabel_open;
  protected readonly statusLabel_block = statusLabel_block;
  protected readonly statusLabel_timer = statusLabel_timer;
}
