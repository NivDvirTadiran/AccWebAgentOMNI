import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input, Output, EventEmitter,
} from "@angular/core";
import * as moment from 'moment';

import { CommonModule } from "@angular/common";
import { StatusLabel } from "src/stories/sb-main-desk/call-bar/status-label/status-lable.model";
import {CallItemModel} from "./callItem.model";
@Component({
  selector: "call-item",
  /**standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, StatusLabel],*/
  templateUrl: "./CallItem.component.html",
  styleUrls: ["./CallItem.component.scss"],
})
export class CallItem {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  @Input() callItem: CallItemModel;
  @Output() checkedChange = new EventEmitter<boolean>();

  propWidth: "'unset'";
  propFlex: "'unset'";
  propAlignSelf: "'unset'";
  propHeight: "'unset'";
  propDisplay: "'inline-block;";
  propTextDecoration: "'unset'";
  propFontWeight: "'unset'";
  propMinWidth: "'73px'";
  propWidth2: "'unset'";
  propFlex2: "'unset'";
  propColor: "'#43a5ff'";
  propWidth3: "'unset'";
  propHeight2: "'unset'";
  propMinWidth2: "'43px'";
  propWidth4: "'36.84%;";
  propHeight3: "'89.47%;";
  propMinWidth3: "'7px'";
  ellipseDiv: false;
  div: false;

  public get isChecked(): any {
    return  this.callItem.checked ? "Fill" : "Empty";
  }

  changeValue()
  {
    this.callItem.checked = !this.callItem.checked;
    this.checkedChange.emit(this.callItem.checked);
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

  get getChannelIcon() {

    if (this.callItem.channelType == "facebook") {
      return "./stories/assets/icons/icon--channel--5.svg";
    }
    if (this.callItem.channelType == "chat"){
      return "./stories/assets/icons/icon--channel--3.svg";
    }
    if (this.callItem.channelType == "messenger") {
      return "./stories/assets/icons/icon--channel--6.svg";
    }
    if (this.callItem.channelType == "instegram") {
      return "./stories/assets/icons/icon--channel--3.svg";
    }
    if (this.callItem.channelType == "sms") {
      return "./stories/assets/icons/icon--channel--1@2x.png";
    }
    if (this.callItem.channelType == "Whatsapp") {
      return "./stories/assets/icons/icon--channel--4.svg";
    }
    if (this.callItem.channelType == "email") {
      return "./stories/assets/icons/icon--channel--2.svg";
    }
    if (this.callItem.channelType == "voice") {
      return "./stories/assets/icons/icon--channel--voice.svg";
    }
    return "";
  }

  get getIconSrc(){
    return "./stories/assets/icons/icon--large--17.svg";
  }


  protected readonly moment = moment;
}
