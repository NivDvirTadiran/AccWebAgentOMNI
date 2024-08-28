import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-drop-down-switcher",
  templateUrl: "./drop-down-switcher.component.html",
  styleUrls: ["./drop-down-switcher.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownSwitcherComponent {
  @Input() text: string = "text";
  @Input() optionVisible = "No";


}
