import {
  ChangeDetectionStrategy,
  Component,
  ElementRef, EventEmitter,
  Input, Output,
  Renderer2,
  ViewChild
} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {TypeBar} from "./type-bar.model";



export type TypeBarData = {
  currentForm: FormGroup;
  changeDetailConfirmation: boolean | undefined;
  typeBar: TypeBar;
  hideInput: false;
  toFocus: false;
  direction: 'rtl' | 'ltr';
  sendDetailErrorMessage: any;
}


@Component({
  selector: "app-type-bar",
  templateUrl: "./type-bar.component.html",
  styleUrls: ["./type-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeBarComponent {


  @Input() typeBarData!: TypeBarData;
  @Output() onEnter = new EventEmitter();

  constructor(/*public _translate: TranslateService,*/
              public renderer: Renderer2) {}


  currentForm: FormGroup = this.typeBarData?.currentForm;



  @ViewChild('mInput', { static: false }) mInput?: ElementRef;

  onKeyDownEvent()
  {
    this.onEnter.emit();
  }



}
