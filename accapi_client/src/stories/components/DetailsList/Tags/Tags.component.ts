import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

import { AddTag } from "../AddTag/ButtonAddTag.component";
@Component({
  selector: "tags",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [AddTag],
  templateUrl: "./Tags.component.html",
  styleUrls: ["./Tags.component.css"],
})
export class Tags {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
