import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "side-category1",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./SideCategory1.component.html",
  styleUrls: ["./SideCategory1.component.css"],
})
export class SideCategory1 {
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
