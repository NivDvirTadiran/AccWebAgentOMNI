import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @Input() property1: "Default" | "Reminder" | "block" | "flag" = "Default";
}
