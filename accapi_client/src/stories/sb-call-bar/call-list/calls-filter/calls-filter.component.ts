import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
@Component({
  selector: "app-calls-filter",
  templateUrl: "./calls-filter.component.html",
  styleUrls: ["./calls-filter.component.scss"]
})
export class CallsFilterComponent {
  @Input() type = "Default";
  @Input() actionBar = "No";
  @Input() isAll: true | false = false;
  @Input() title: string = "הפניות שלי";
  @Output() checkChangeValue = new EventEmitter<boolean>();
  @Output() ChangeStatus = new EventEmitter<string>();
  @Output() channelFilter = new EventEmitter<any[]>();

  public get isChecked(): any {
    return  this.isAll ? "Fill" : "Empty";

  }

  sortStatus(sortOption: string){
    this.ChangeStatus.emit(sortOption);
  }

  changeValue()
  {
    this.isAll = !this.isAll;
    this.checkChangeValue.emit(this.isAll);
  }

  filterByChannel(channelChecked : any[])
  {
    this.channelFilter.emit(channelChecked);
  }

}
