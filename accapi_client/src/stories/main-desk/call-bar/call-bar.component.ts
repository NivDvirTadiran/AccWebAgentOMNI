import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {
  statusLabel_close,
  statusLabel_open,
  statusLabels,
  statusLabel_timer, statusLabel_waiting
} from "../status-label/status-label.component";
import {StatusLabel} from "../status-label/status-lable.model";
@Component({
  selector: "app-call-bar",
  templateUrl: "./call-bar.component.html",
  styleUrls: ["./call-bar.component.scss"]
})
export class CallBarComponent {
  @Input() goal: "Chat" | "Dashboard" | "Bot" = "Chat";
  @Input() option: "Default" | "1" | "2" | "Admin Block" | "Client Blocked" = "2";

  public get classes(): string[] {

    return ['app-call-bar',`app-call-bar--${this.option}`];
  }

  statusLabel_open: StatusLabel = statusLabel_open;
  statusLabel_close: StatusLabel = statusLabel_close;
  statusLabel_timer: StatusLabel = statusLabel_timer;
  statusLabel_waiting: StatusLabel = statusLabel_waiting;
  statusLabels = statusLabels;
}
