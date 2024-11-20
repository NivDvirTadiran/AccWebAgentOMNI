import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

@Component({
  selector: "details-menu",
  templateUrl: "./details-menu.component.html",
  styleUrls: ["./details-menu.component.scss"],
})
export class DetailsMenuComponent {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
