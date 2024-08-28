import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-icon-status",
  templateUrl: "./icon-status.component.html",
  styleUrls: ["./icon-status.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconStatusComponent {
  @Input() status:
    | "Active"
    | "Busy"
    | "Break"
    | "Deactive"
    | "circle status"
    | "big"
    | "group" = "Active";
}
