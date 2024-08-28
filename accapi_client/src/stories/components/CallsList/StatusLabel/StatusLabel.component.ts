import {Component, ViewEncapsulation, HostBinding, Input } from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "status-label",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: "./StatusLabel.component.html",
  styleUrls: ["./StatusLabel.component.css"],
})
export class StatusLabel {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() prop: string = "";
  /** Style props */
  @Input() propHeight: string | number = "";
  @Input() propWidth: string | number = "";
  @Input() propBackgroundColor: string | number = "";
  @Input() propAlignSelf: string | number = "";
  @Input() propFlex: string | number = "";
  @Input() propTextDecoration: string | number = "";
  @Input() propFontWeight: string | number = "";
  @Input() propDisplay: string | number = "";
  @Input() propMinWidth: string | number = "";

  get statusLabelStyle() {
    return {
      height: this.propHeight,
      width: this.propWidth,
      "background-color": this.propBackgroundColor,
    };
  }

  get bStyle() {
    return {
      "align-self": this.propAlignSelf,
      flex: this.propFlex,
      "text-decoration": this.propTextDecoration,
      "font-weight": this.propFontWeight,
      display: this.propDisplay,
      "min-width": this.propMinWidth,
    };
  }
}
