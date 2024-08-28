import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-icon-arrows",
  templateUrl: "./icon-arrows.component.html",
  styleUrls: ["./icon-arrows.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconArrowsComponent {
  @Input() property1: "Small" = "Small";
  @Input() property2: "Up" | "Down" = "Down";
}
