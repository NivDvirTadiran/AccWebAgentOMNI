import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

@Component({
  selector: "profile-bar",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: "./ProfileBar.component.html",
  styleUrls: ["./ProfileBar.component.css"],
})
export class ProfileBar {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
