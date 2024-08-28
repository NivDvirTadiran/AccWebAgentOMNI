import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

import { SideCategory } from "../SideCategory/SideCategory.component";
@Component({
  selector: "details-menu",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [SideCategory],
  templateUrl: "./DropdownMenuDetailsMenu.component.html",
  styleUrls: ["./DetailsMenu.component.css"],
})
export class DetailsMenu {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
