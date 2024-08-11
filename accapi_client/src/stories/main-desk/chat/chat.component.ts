import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  @Input() wight: "normal" | "wide" = "normal";
  @Input() type: "chat" | "bot" | "chat admin block" | "Phone call" = "chat";
}
