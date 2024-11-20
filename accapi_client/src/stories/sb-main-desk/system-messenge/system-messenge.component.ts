import { Component, Input } from "@angular/core";
import moment from "moment/moment";

@Component({
  selector: "app-system-messenge",
  templateUrl: "./system-messenge.component.html",
  styleUrls: ["./system-messenge.component.scss"],
})
export class SystemMessengeComponent {
  @Input() property1: "Block" | "Default" | "Close" = "Default";
  @Input() closeDate: Date;
  public moment = moment;
}
