import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() active: "Yes" | "No" = "Yes";
  @Input() bold: "Yes" | "No" = "No";
  @Input() icon: "Yes" | "No" | "with x" | "cancel" = "Yes";
  @Input() size: "small" | "Large" = "small";
  @Input() purpose: "Default" | "chat state" = "Default";
}
