import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-search-option",
  templateUrl: "./search-option.component.html",
  styleUrls: ["./search-option.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchOptionComponent {
  @Input() property1: "1" | "Variant2" = "1";
}
