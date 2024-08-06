import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-telephone-test",
  templateUrl: "./telephone-test.component.html",
  styleUrls: ["./telephone-test.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TelephoneTestComponent {
  @Input() property1:
    | "IDLE"
    | "active call"
    | "Incoming Call"
    | "Variant5"
    | "Active Group Call" = "IDLE";
}
