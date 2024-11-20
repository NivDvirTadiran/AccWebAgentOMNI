import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {StatusLabel} from "./status-lable.model";
import {classes} from "@angular/core/schematics/migrations/typed-forms/util";

export let statusLabels: {
    open: { status: "Open", background: "Turkiz", label: "פתוח"}
    close: {status: "Close", background: "Green", label: "סגור"},
    new: {status: "New", background: "Pink", label: "חדש"},
    timer: {status: "Timer", background: "Yellow", label: "מתוזמן"},
    waiting: {status: "Waiting", background: "Purple", label: "ממתין"},
    block: {status: "Block", background: "Black", label: "בקשה לחסימה"},
};

export let statusLabel_open: StatusLabel = { status: "Open", background: "Turkiz", label: "פתוח"};
export let statusLabel_new: StatusLabel = {status: "New", background: "Pink", label: "חדש"};
export let statusLabel_close: StatusLabel = {status: "Close", background: "Green", label: "סגור"};
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
  @Input() activeStatus: StatusLabel;

  isOver : boolean = false;


    public get classesOver(): string[] {
      var  mode : any;
      if( this.isOver && this.activeStatus != statusLabel_close  && this.activeStatus !=  null)
      {
          switch (this.statusLabel) {
              case statusLabel_waiting:
                  mode = "statusLabelWaiting";
                  break;
              case statusLabel_close:
                  mode = "statusLabelClose";
                  break;
              case statusLabel_open:
                  mode = "statusLabelOpen";
                  break;
              case statusLabel_timer:
                  mode = "statusLabelTimer";
                  break;
          }
      }
      else
      {
          mode = this.grayed ? 'app-status-label--Gray' : `app-status-label--${this.statusLabel.background}`;
      }

      return ['app-status-label', mode];
    }

    over(){
      this.isOver = true;
    }

    leave(){
        this.isOver = false;
    }

}
