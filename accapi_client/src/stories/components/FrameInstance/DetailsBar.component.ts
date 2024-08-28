import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

import { Tags } from "../Tags/Tags.component";
import { DetailsMenu } from "../DropdownMenu/DetailsMenu.component";
@Component({
  selector: "details-bar",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [Tags, DetailsMenu],
  templateUrl: "../DetailsBar/DetailsBar.component.html",
  styleUrls: ["../DetailsBar/DetailsBar.component.css"],
})
export class DetailsBar {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
