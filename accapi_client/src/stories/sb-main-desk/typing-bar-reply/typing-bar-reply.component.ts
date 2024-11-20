import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {TypeBarData} from "./frame-136/type-bar/type-bar.component";
import {TypeBar} from "./frame-136/type-bar/type-bar.model";


export type ActionTypeBar = {
  conditionName: string;
  presentingMessage: string;
  isFulfilled: boolean;
}

function allTrue(v: ActionTypeBar, index: number, array: any[]) {
  return (v.isFulfilled.valueOf());
}



@Component({
  selector: "app-typing-bar-reply",
  templateUrl: "./typing-bar-reply.component.html",
  styleUrls: ["./typing-bar-reply.component.scss"]
})
export class TypingBarReplyComponent {

  mForm: FormGroup;
  typeBarData: TypeBarData;
  constructor() {
    this.mForm = new FormGroup({message: new FormControl('')});
    this.typeBarData = {
      currentForm: new FormGroup({message: new FormControl('')}),
      changeDetailConfirmation: false,
      typeBar: this.typeBarInOrder[0],
      hideInput: false,
      toFocus: false,
      direction: this.extractDirection(),
      sendDetailErrorMessage: "opk"
    }
  }


  typeBarInOrder: TypeBar[] = [
    {chatType: 'WebChat', inputType: 'main'}
  ];

  extractDirection(): any {
    /*if (this._translate)
      if (this._translate.currentDir)
        if (this._translate.currentDir == 'rtl')
          return 'rtl';*/
    return 'ltr';
  }

  @Output() onSendMessage: EventEmitter<string> = new EventEmitter<string>();





  getErrorList(conditionList) {
    var actionInputs = [];
    conditionList.forEach(condition => {
      switch (condition) {
        case "minLength":
          actionInputs.push({
            "conditionName": "minLengthValid",
            "presentingMessage": ' A minimum of 8 characters',
            "isFulfilled": !(this.minLengthValid || !(this.formControler.value.length > 0))
          });
          break;
      }
    });
    return actionInputs;
  }

  get formControler() {
    var _a;
    return this.typeBarData.currentForm.get((_a = this.typeBarData.typeBar) === null || _a === void 0 ? void 0 : _a.title.toString());
  }


  get minLengthValid() {
    return this.formControler.hasError("minlength");
  }


  isAllConditionsSatisfied(actionInputs) {
    console.log(`All Conditions Satisfied:? ${actionInputs.every(allTrue)}`);
    return actionInputs.every(allTrue);
  }


  @Input() conditionList: string[] = [];

  get message(): AbstractControl {
    return this.typeBarData.currentForm?.get('message')!;
  }

  setMessage(message: string): void {
    return this.typeBarData.currentForm.get('message')?.setValue(message);
  }



  onSubmit() {
    console.log('this.message: ' + this.message.value.toString());
    if (this.isAllConditionsSatisfied(this.getErrorList(this.conditionList))) {
      this.onSendMessage.emit(this.message.value.toString());
    this.setMessage("");
    }
  }

}
