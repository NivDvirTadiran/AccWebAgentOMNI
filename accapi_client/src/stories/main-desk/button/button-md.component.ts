import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-button-md",
  templateUrl: "./button-md.component.html",
  styleUrls: ["./button-md.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonMdComponent {
  @Input() active: "Yes" | "No" = "Yes";
  @Input() bold: "Yes" | "No" = "No";
  @Input() icon: "Yes" | "No" | "with x" | "cancel" = "Yes";
  @Input() size: "small" | "Large" = "small";
  @Input() purpose: "Default" | "chat state" = "Default";
}
