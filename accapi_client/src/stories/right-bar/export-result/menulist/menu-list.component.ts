import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

@Component({
  selector: "app-menulist",
  templateUrl: "./menu-list.component.html",
  styleUrls: ["./menu-list.component.scss"],
})
export class MenuListComponent {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
