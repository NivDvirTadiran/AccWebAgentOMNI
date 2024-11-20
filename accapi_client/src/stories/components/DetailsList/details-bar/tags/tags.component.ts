import { Component, HostBinding } from "@angular/core";

@Component({
  selector: "tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["./tags.component.scss"],
})
export class TagsComponent {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
