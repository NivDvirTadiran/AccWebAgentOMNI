import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-chat",
  templateUrl: "./chat-md.component.html",
  styleUrls: ["./chat-md.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMdComponent {
  @Input() wight: "normal" | "wide" = "normal";
  @Input() type: "chat" | "bot" | "chat admin block" | "Phone call" = "chat";
}
