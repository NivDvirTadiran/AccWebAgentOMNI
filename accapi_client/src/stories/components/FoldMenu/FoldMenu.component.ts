import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

@Component({
  selector: "fold-menu",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: "./FoldMenu.component.html",
  styleUrls: ["./FoldMenu.component.css"],
})
export class FoldMenu {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
