import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
import { StatusLabel } from "../StatusLabel/StatusLabel.component";
@Component({
  selector: "call-item",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, StatusLabel],
  templateUrl: "./CallItem.component.html",
  styleUrls: ["./CallItem.component.css"],
})
export class CallItem {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() iconLarge17: string = "";
  @Input() iconChannel1: string = "";
  @Input() prop1: string = "";
  @Input() notification: boolean = false;
  @Input() ellipseDiv: boolean = false;
  @Input() div: boolean = false;
  @Input() prop: string = "";
  @Input() propHeight1: string = "";
  @Input() propWidth1: string = "";
  @Input() propBackgroundColor: string = "";
  @Input() propAlignSelf1: string = "";
  @Input() propFlex1: string = "";
  @Input() propTextDecoration1: string = "";
  @Input() propFontWeight1: string = "";
  @Input() propDisplay1: string = "";
  @Input() propMinWidth1: string = "";
  /** Style props */
  @Input() propBorderTop: string | number = "";
  @Input() propWidth: string | number = "";
  @Input() propFlex: string | number = "";
  @Input() propAlignSelf: string | number = "";
  @Input() propHeight: string | number = "";
  @Input() propDisplay: string | number = "";
  @Input() propTextDecoration: string | number = "";
  @Input() propFontWeight: string | number = "";
  @Input() propMinWidth: string | number = "";
  @Input() propWidth2: string | number = "";
  @Input() propFlex2: string | number = "";
  @Input() propColor: string | number = "";
  @Input() propWidth3: string | number = "";
  @Input() propHeight2: string | number = "";
  @Input() propMinWidth2: string | number = "";
  @Input() propWidth4: string | number = "";
  @Input() propHeight3: string | number = "";
  @Input() propMinWidth3: string | number = "";

  get callItemStyle() {
    return {
      "border-top": this.propBorderTop,
    };
  }

  get frameDivStyle() {
    return {
      width: this.propWidth,
    };
  }

  get frameDiv1Style() {
    return {
      flex: this.propFlex,
    };
  }

  get b1Style() {
    return {
      "align-self": this.propAlignSelf,
      height: this.propHeight,
      display: this.propDisplay,
      "text-decoration": this.propTextDecoration,
      "font-weight": this.propFontWeight,
      "min-width": this.propMinWidth,
    };
  }

  get frameDiv2Style() {
    return {
      width: this.propWidth2,
      flex: this.propFlex2,
    };
  }

  get div1Style() {
    return {
      color: this.propColor,
    };
  }

  get div2Style() {
    return {
      width: this.propWidth3,
      height: this.propHeight2,
      "min-width": this.propMinWidth2,
    };
  }

  get div3Style() {
    return {
      width: this.propWidth4,
      height: this.propHeight3,
      "min-width": this.propMinWidth3,
    };
  }
}
