import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-chat-bubble",
  templateUrl: "./chat-bubble.component.html",
  styleUrls: ["./chat-bubble.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatBubbleComponent {
  @Input() property1:
    | "Default"
    | "Variant2"
    | "note"
    | "bot"
    | "bot + button"
    | "block request options"
    | "block" = "Default";
}
