import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";

@Component({
  selector: "app-drop-down-status",
  templateUrl: "./drop-down-status.component.html",
  styleUrls: ["./drop-down-status.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownStatusComponent {
  @Input() text: string = "text";
  @Input() optionVisible = "No";
  @ViewChild('sortStatus') sortStatus!: ElementRef;
  @Output() onSortStatus = new EventEmitter<string>();


  onSelected():void
    {
      let val = this.sortStatus.nativeElement.value;
      this.onSortStatus.emit(val);
    }


}
