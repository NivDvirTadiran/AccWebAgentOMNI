import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-call-bar",
  templateUrl: "./call-bar.component.html",
  styleUrls: ["./call-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallBarComponent {
  @Input() goal: "Chat" | "Dashboard" | "Bot" = "Chat";
  @Input() option: "Default" | "1" | "2" | "Admin Block" | "Client Blocked" =
    "2";
}
