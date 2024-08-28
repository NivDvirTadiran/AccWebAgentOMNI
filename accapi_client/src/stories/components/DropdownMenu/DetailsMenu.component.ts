import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

import { Participants } from "../SideCategory/SideCategory.component";
@Component({
  selector: "details-menu",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [Participants],
  templateUrl: "../DetailsMenu/DetailsMenu.component.html",
  styleUrls: ["../DetailsMenu/DetailsMenu.component.css"],
})
export class DetailsMenu {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
