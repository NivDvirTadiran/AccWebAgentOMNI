import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-icon-checkbox",
  templateUrl: "./icon-checkbox.component.html",
  styleUrls: ["./icon-checkbox.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCheckboxComponent {
  @Input() property1: "Small" = "Small";
  @Input() check: "Fill" | "Empty" = "Empty";
  @Input() color: "black" | "Green" | "hover" = "black";
}
