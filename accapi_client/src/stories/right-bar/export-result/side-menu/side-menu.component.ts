import {ChangeDetectionStrategy, Component, HostBinding, Input} from "@angular/core";
@Component({
  selector: "sb-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"]
})
export class SideMenuComponent {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
