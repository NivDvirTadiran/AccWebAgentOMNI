import {Component, HostBinding, Input} from "@angular/core";

@Component({
    selector: "app-menu-section",
    templateUrl: "./menu-section.component.html",
    styleUrls: ["./menu-section.component.scss"],
})
export class MenuSectionComponent {
    @HostBinding("style.display") display = "contents";

    constructor() {}

    /** Value props */
    @Input() iconPage3: string = "none";
    @Input() prop: string = "";
    /** Style props */
    @Input() propBorderRadius: string | number = "'unset'";
    @Input() propBackgroundColor: string | number = "#43a5ff";
    @Input() propBorderBottom: string | number = "";
    @Input() propColor: string | number = "#43a5ff";
    @Input() propHeight: string | number = "";
    @Input() propDisplay: string | number = "";

    get menuSectionStyle() {
        return {
            "border-radius": this.propBorderRadius,
            "background-color": this.propBackgroundColor,
            "border-bottom": this.propBorderBottom

    };
    }


    get path()  {
        //const mode = this.grayed ? 'app-status-label--Gray' : `app-status-label--${this.statusLabel.background}`;
        return `${this.iconPage3}`;
    }

    get divStyle() {
        return {
            color: this.propColor,
            height: this.propHeight,
            display: this.propDisplay,
        };
    }
}
