import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output} from "@angular/core";
import {Status} from "../agent-status/agent-status.component";
@Component({
  selector: "sb-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"]
})
export class SideMenuComponent {
  @HostBinding("style.display") display = "contents";
  @Input() agentStatus: Status;
  @Output() onChangeStatusRequest = new EventEmitter<Status>();

  constructor() {}
}
