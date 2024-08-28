import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

import { Tags } from "../Tags/Tags.component";
import { DetailsMenu } from "../DetailsMenu/DropdownMenuDetailsMenu.component";
@Component({
  selector: "details-bar",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [Tags, DetailsMenu],
  templateUrl: "./FrameInstanceDetailsBar.component.html",
  styleUrls: ["./DetailsBar.component.css"],
})
export class DetailsBar {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
