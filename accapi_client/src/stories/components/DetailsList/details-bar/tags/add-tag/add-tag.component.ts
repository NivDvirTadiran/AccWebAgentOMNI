import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

@Component({
  selector: "add-tag",
  templateUrl: "./add-tag.component.html",
  styleUrls: ["./add-tag.component.scss"],
})
export class AddTagComponent {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
