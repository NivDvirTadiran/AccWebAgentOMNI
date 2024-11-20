import {Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges, ViewChild} from "@angular/core";
import {AgentStatus} from "./agent-status.model";


export type Status  =  "logon" | "login" | "release" | "busy" | "launch" | "meeting" ;

type AStatProp = AgentStatus & {
    mStatus: Status
};

function createAStatProp(mStatus: Status, name: string, color: string, label: string): AStatProp {
    return {mStatus, name, color, label};
}

export const logon = createAStatProp("logon", "Logon", "#BCBCBC", "מנותק");
export const login = createAStatProp("login", "Login", "#1FC777", "פעיל");
export const release = createAStatProp("release", "Release", "#FF5151", "הפסקה");
export const busy = createAStatProp("busy", "Busy", "#9963D5", "עסוק");
export const launch = createAStatProp("launch", "Launch", "#FD5EC3", "צהריים");
export const meeting = createAStatProp("meeting", "Meeting", "#FA9621", "פגישה");
export const ASPs = {logon, login, release, busy, launch, meeting};


@Component({
    selector: "agent-status",
    templateUrl: "./agent-status.component.html",
    styleUrls: ["./agent-status.component.scss"],
})
export class AgentStatusComponent implements OnChanges {
    @HostBinding("style.display") display = "contents";
    @Input() agentStatus?: Status;
    @ViewChild('currentStatus') currentStatus!: ElementRef;
    @Output() onChangeStatusRequest = new EventEmitter<Status>();


    onSelectedAgentStatus():void {
        let desiredStatus: AStatProp = ASPs[this.currentStatus.nativeElement.value];

        this.onChangeStatusRequest.emit(desiredStatus.mStatus);
        this.currentStatus.nativeElement.value = this.currentAgentStatusProp.mStatus.toString();
        //window.setTimeout(() => this.currentStatus.nativeElement.click(), 100);
    }

    get color()  {
        return {
            fill: this.currentAgentStatusProp ? this.currentAgentStatusProp.color : 'Color not found'
        }
    }

    get currentAgentStatusProp(): AStatProp | null {
        return this.agentStatus && ASPs.hasOwnProperty(this.agentStatus) ? ASPs[this.agentStatus] : null;
    }

    get label() {
        return this.currentAgentStatusProp ? this.currentAgentStatusProp.label : 'Status not found';
    }

    constructor() {}

    public ASPs = ASPs;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.agentStatus) {
            console.log("onChange: " + this.currentAgentStatusProp?.label);
            this.currentStatus.nativeElement.value = this.currentAgentStatusProp.mStatus.toString();
        }
    }
}
