import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "menu-section",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./MenuSection.component.html",
  styleUrls: ["./MenuSection.component.css"],
})
export class MenuSection {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() iconPage3: string = "";
  @Input() prop: string = "";
  /** Style props */
  @Input() propBorderRadius: string | number = "";
  @Input() propBackgroundColor: string | number = "";
  @Input() propBorderBottom: string | number = "";
  @Input() propColor: string | number = "";
  @Input() propHeight: string | number = "";
  @Input() propDisplay: string | number = "";

  get menuSectionStyle() {
    return {
      "border-radius": this.propBorderRadius,
      "background-color": this.propBackgroundColor,
      "border-bottom": this.propBorderBottom,
    };
  }

  get divStyle() {
    return {
      color: this.propColor,
      height: this.propHeight,
      display: this.propDisplay,
    };
  }
}
