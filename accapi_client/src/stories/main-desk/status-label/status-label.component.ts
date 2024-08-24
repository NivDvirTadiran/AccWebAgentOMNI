import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {StatusLabel} from "./status-lable.model";

export let statusLabels: {
    open: { status: "Open", background: "Turkiz", label: "פתוח"}
    close: {status: "Close", background: "Green", label: "סגור"},
    new: {status: "New", background: "Pink", label: "חדש"},
    timer: {status: "Timer", background: "Yellow", label: "מתוזמן"},
    waiting: {status: "Waiting", background: "Purple", label: "ממתין"},
    block: {status: "Block", background: "Black", label: "בקשה לחסימה"},
};

export let statusLabel_open: StatusLabel = { status: "Open", background: "Turkiz", label: "open"};
export let statusLabel_new: StatusLabel = {status: "New", background: "Pink", label: "חדש"};
export const statusLabel_close: StatusLabel = {status: "Close", background: "Green", label: "סגור"};
export let statusLabel_timer: StatusLabel = {status: "Timer", background: "Yellow", label: "מתוזמן"};
export let statusLabel_waiting: StatusLabel = {status: "Waiting", background: "Purple", label: "ממתין"};
export let statusLabel_block: StatusLabel = {status: "Block", background: "Black", label: "בקשה לחסימה"};


@Component({
  selector: "app-status-label",
  templateUrl: "./status-label.component.html",
  styleUrls: ["./status-label.component.scss"]
})
export class StatusLabelComponent {
  @Input() statusLabel: StatusLabel;

  @Input() grayed: boolean = false;

  public get classes(): string[] {
    const mode = this.grayed ? 'app-status-label--Gray' : `app-status-label--${this.statusLabel.background}`;
    return ['app-status-label', mode];
  }
}
