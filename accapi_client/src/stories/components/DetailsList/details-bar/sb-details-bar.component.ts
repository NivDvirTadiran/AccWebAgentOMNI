import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

import { TagsComponent } from "./tags/tags.component";
import { DetailsMenuComponent } from "./details-menu/details-menu.component";
@Component({
  selector: "sb-details-bar",
  templateUrl: "./sb-details-bar.component.html",
  styleUrls: ["./sb-details-bar.component.scss"],
})
export class SbDetailsBarComponent {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
