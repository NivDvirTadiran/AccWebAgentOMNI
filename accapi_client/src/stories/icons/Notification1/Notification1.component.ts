import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "notification1",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./Notification1.component.html",
  styleUrls: ["./Notification1.component.css"],
})
export class Notification1 {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Style props */
  @Input() propTextDecoration: string | number = "";

  get divStyle() {
    return {
      "text-decoration": this.propTextDecoration,
    };
  }
}
