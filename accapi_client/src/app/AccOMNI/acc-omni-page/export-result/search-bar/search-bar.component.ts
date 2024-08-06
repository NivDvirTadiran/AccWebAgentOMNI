import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  @Input() property1:
    | "normal"
    | "type"
    | "with text"
    | "Variant4"
    | "Variant5"
    | "Variant6" = "normal";
}
