import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {TypeBarData} from "./type-bar/type-bar.component";
@Component({
  selector: "app-frame-136",
  templateUrl: "./frame-136.component.html",
  styleUrls: ["./frame-136.component.scss"]
})
export class Frame136Component {
  @Input() state: "Default" | "Typing" | "Sending" = "Default";
  @Input() mode: "Reply" = "Reply";
  @Input() typeBarData: TypeBarData;
  @Output() onSaveChanges = new EventEmitter<String>();
  @Output() onKeyEnter = new EventEmitter();

  onEnter(){
    this.onKeyEnter.emit();
  }
}
