import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-calls-filter",
  templateUrl: "./calls-filter.component.html",
  styleUrls: ["./calls-filter.component.scss"]
})
export class CallsFilterComponent {
  @Input() type = "Default";
  @Input() actionBar = "No";
}
