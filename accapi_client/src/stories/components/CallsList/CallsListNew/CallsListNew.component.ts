import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

import { CallItem } from "../CallItem/CallItem.component";
import {StatusLabel} from "../StatusLabel/StatusLabel.component";
import {Notification1} from "../Notification1/Notification1.component";
@Component({
  selector: "calls-list-new",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [StatusLabel, Notification1, CallItem],
  templateUrl: "./CallsListNew.component.html",
  styleUrls: ["./CallsListNew.component.css"],
})
export class CallsListNew {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
