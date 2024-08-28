import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
    selector: "sb-calls-bar",
    templateUrl: "./calls-bar.component.html",
    styleUrls: ["./calls-bar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallsBarComponent {}
