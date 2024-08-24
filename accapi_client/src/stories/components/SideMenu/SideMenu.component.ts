import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

import { ProfileBar } from "../ProfileBar/ProfileBar.component";
import { Menulist } from "../Menulist/Menulist.component";
import { FoldMenu } from "../FoldMenu/FoldMenu.component";
@Component({
  selector: "side-menu",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [ProfileBar, Menulist, FoldMenu],
  templateUrl: "./SideMenu.component.html",
  styleUrls: ["./SideMenu.component.css"],
})
export class SideMenu {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
