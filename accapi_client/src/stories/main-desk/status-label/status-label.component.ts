import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-status-label",
  templateUrl: "./status-label.component.html",
  styleUrls: ["./status-label.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusLabelComponent {
  @Input() status:
    | "Open"
    | "Closed"
    | "New"
    | "timed"
    | "Waiting"
    | "Gray Closed"
    | "Gray New"
    | "Gray Timed"
    | "Gray Waiting"
    | "block"
    | "TimeHover" = "Open";
}
