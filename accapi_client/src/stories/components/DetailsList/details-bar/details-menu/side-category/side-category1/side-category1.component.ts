import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "side-category1",
  templateUrl: "./side-category1.component.html",
  styleUrls: ["./side-category1.component.scss"],
})
export class SideCategory1Component {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() prop: string = "";
  @Input() iconLarge33: string = "";
  /** Style props */
  @Input() propMinWidth: string | number = "";

  get bStyle() {
    return {
      "min-width": this.propMinWidth,
    };
  }
}
