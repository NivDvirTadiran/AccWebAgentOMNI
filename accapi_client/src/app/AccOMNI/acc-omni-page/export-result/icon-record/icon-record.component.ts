import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-icon-record",
  templateUrl: "./icon-record.component.html",
  styleUrls: ["./icon-record.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconRecordComponent {
  @Input() property1: "Large" = "Large";
  @Input() recording: "Yes" | "No" = "No";
}
