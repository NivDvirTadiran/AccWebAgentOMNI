import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {SessionList} from "./call-list/CallsListNew/CallsListNew.component";
import {CallItemModel} from "./call-list/CallsListNew/CallItem/callItem.model";
@Component({
    selector: "sb-call-bar",
    templateUrl: "./sb-call-bar.component.html",
    styleUrls: ["./sb-call-bar.component.scss"],
})
export class SbCallBarComponent {
    @Input() sessions : SessionList;
    @Output() sessionChange = new EventEmitter<CallItemModel>();


    sessionOnChange(currentSession :CallItemModel){
        this.sessionChange.emit(currentSession);
    }
}
