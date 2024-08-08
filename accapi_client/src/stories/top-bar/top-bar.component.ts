import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "sb-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {}
