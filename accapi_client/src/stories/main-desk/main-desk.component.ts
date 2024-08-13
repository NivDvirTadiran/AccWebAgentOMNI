import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "sb-main-desk",
  templateUrl: "./main-desk.component.html",
  styleUrls: ["./main-desk.component.scss"]
})
export class MainDeskComponent {
  @Input() property1 = "Default";
}
