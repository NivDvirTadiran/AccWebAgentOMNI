import {Component, EventEmitter, HostBinding, Input, Output} from "@angular/core";
import {PopoverOptions} from "../../../directive/popover.interface";
import {ActionAvatarComponent} from "../../../actions/action-avatar/action-avatar.component";
import {ASPs, Status} from "../agent-status/agent-status.component";



@Component({
  selector: "profile-bar",
  templateUrl: "./profile-bar.component.html",
  styleUrls: ["./profile-bar.component.scss"],
})
export class ProfileBarComponent {
  popover: PopoverOptions = {
    content: ActionAvatarComponent
  };

  @HostBinding("style.display") display = "contents";
  @Input() agentStatus?: Status;
  @Output() onChangeStatusRequest = new EventEmitter<Status>();



  myAgentStatus(): Status {
    return this.myStatus;
  }

  constructor() {}

  public myStatus: Status =   ASPs.logon.mStatus;

  protected readonly Event = Event;
}
