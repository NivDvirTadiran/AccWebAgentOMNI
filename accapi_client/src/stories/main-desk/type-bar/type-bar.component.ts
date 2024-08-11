import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-type-bar",
  templateUrl: "./type-bar.component.html",
  styleUrls: ["./type-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeBarComponent {}
