import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

@Component({
  selector: "add-tag",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: "./ButtonAddTag.component.html",
  styleUrls: ["./AddTag.component.css"],
})
export class AddTag {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
