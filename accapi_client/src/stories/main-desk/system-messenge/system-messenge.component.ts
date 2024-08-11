import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-system-messenge",
  templateUrl: "./system-messenge.component.html",
  styleUrls: ["./system-messenge.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemMessengeComponent {
  @Input() property1: "Block" | "Default" = "Block";
}
