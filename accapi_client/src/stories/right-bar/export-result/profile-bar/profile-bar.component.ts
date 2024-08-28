import { Component, HostBinding } from "@angular/core";

@Component({
  selector: "profile-bar",
  templateUrl: "./profile-bar.component.html",
  styleUrls: ["./profile-bar.component.scss"],
})
export class ProfileBarComponent {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
