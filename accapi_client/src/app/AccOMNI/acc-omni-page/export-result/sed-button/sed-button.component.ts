import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-sed-button",
  templateUrl: "./sed-button.component.html",
  styleUrls: ["./sed-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SedButtonComponent {
  @Input() property1:
    | "Send"
    | "Answer"
    | "Hang"
    | "Pause"
    | "Release"
    | "ActiveCall"
    | "PhoneBook"
    | "Dial"
    | "Reject" = "Send";
}
