import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

import { CallItem1 } from "../CallItem1/CallItem1.component";
@Component({
  selector: "calls-list-new",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CallItem1],
  templateUrl: "./CallsListNew.component.html",
  styleUrls: ["./CallsListNew.component.css"],
})
export class CallsListNew {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
