import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-chat-colum",
  templateUrl: "./chat-colum.component.html",
  styleUrls: ["./chat-colum.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatColumComponent {
  @Input() property1 = "Default";
}
