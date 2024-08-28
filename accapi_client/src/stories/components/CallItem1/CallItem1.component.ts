import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

@Component({
  selector: "call-item1",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: "./CallItem1.component.html",
  styleUrls: ["./CallItem1.component.css"],
})
export class CallItem1 {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
