import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

@Component({
  selector: "side-category",
  templateUrl: "./side-category.component.html",
  styleUrls: ["./side-category.component.scss"],
})
export class SideCategoryComponent {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() callHistory: string = "";
  @Input() participants: string = "";
  @Input() propMinWidth: string = "";
}
