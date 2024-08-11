import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-frame-136",
  templateUrl: "./frame-136.component.html",
  styleUrls: ["./frame-136.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Frame136Component {
  @Input() state: "Default" | "Typing" | "Sending" = "Default";
  @Input() mode: "Reply" = "Reply";
}
