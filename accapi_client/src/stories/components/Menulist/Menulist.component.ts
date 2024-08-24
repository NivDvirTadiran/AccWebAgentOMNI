import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

import { MenuSection } from "../MenuSection/MenuSection.component";
@Component({
  selector: "menulist",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [MenuSection],
  templateUrl: "./Menulist.component.html",
  styleUrls: ["./Menulist.component.css"],
})
export class Menulist {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
