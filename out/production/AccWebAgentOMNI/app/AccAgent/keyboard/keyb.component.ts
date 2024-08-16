import {  ElementRef,ViewChild, AfterViewInit,Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

//import { Subscription } from 'rxjs/Subscription';
import { AccAgentService } from '../acc-agent.service';



//const customKeyboardLayouts: IKeyboardLayouts = keyboardLayouts;
// customKeyboardLayouts.numpad = {
//   'name': 'Numpad', 'keys': [
//     [['1', '1'], ['2', '2'], ['3', '3']],
//     [['4', '4'], ['5', '5'], ['6', '6']],
//     [['7', '7'], ['8', '8'], ['9', '9']],
//     [[KeyboardClassKey.Bksp, KeyboardClassKey.Bksp], ['0', '0'], [KeyboardClassKey.Enter, KeyboardClassKey.Enter]]
//   ]
// };




@Component({
  selector: 'my_keyboard',
  templateUrl: './numpad.html',
 //templateUrl: './keyb.component.html',
  styleUrls: ['./keyb.component.scss']
})

export class KeybComponent implements OnInit, OnDestroy,AfterViewInit {

 //private _enterSubscription: Subscription;

  //private _keyboardRef: MatKeyboardRef<MatKeyboardComponent>;

  public ShowNumpad = false;

  // private _submittedForms = new BehaviorSubject<{ control: string, value: string }[][]>([]);

  // get submittedForms(): Observable<{ control: string, value: string }[][]> {
  //   return this._submittedForms.asObservable();
  // }
 

  darkTheme: boolean;

  duration: number;

  isDebug: boolean;

  defaultLocale: string;

  layout: string;

  // layouts: {
  //   name: string;
  //   layout: IKeyboardLayout;
  // };

 

  testControlValue = new FormControl({ value: 'Emmentaler', disabled: false });

  get keyboardVisible(): boolean {
    return false;//this._keyboardService.isOpened;
  }
 
  // constructor(private _keyboardService: MatKeyboardService,
  constructor(
              public AAC: AccAgentService,
              @Inject(LOCALE_ID) public locale){}
                        // @Inject(MAT_KEYBOARD_LAYOUTS) private _layouts) {}
              
  @ViewChild('numpadId') inputEl:ElementRef;
  ngOnInit() {
    this.defaultLocale = `numpad`;
    // this.layouts = Object
    //   .keys(this._layouts)
    //   .map((name: string) => ({
    //     name,
    //     layout: this._layouts[name]
    //   }))
    //   .sort((a, b) => a.layout.name.localeCompare(b.layout.name));
  }

  ngOnDestroy() {
    this.closeCurrentKeyboard();
  }
  xxx:string = "";
  PhoneNo:string = "";
  CurPos:number = 0;
  submitForm() {
    this.AAC.handleDialpadCall(this.PhoneNo);
  }
  hideKeyb()
  {
    this.AAC.ShowNumpad = false;
  }

  getposiotion(kpinput)
  {
    this.CurPos = kpinput.selectionStart;
  }
  //
  keypress(evt)
  {
     var a = evt.keyCode;
     console.log("keypress:" + a);
  }
  
  //
  KeyPadClick(digit: string) {
    var b:boolean = false;
    if (this.PhoneNo.length >= 16) {return;}
    if (digit >= '0' && digit <= '9' ) {
      b = true;
     }
     else if (digit == '#' || digit == '*'){
       b = true;
     }
     if (b == true) {
      if (this.CurPos == this.PhoneNo.length) {
        this.PhoneNo += digit;

      }
      else {
        var start: string = this.PhoneNo.substr(0, this.CurPos);
        var end: string = this.PhoneNo.substr(this.CurPos);
        this.PhoneNo = start + digit + end;
      }
     this.CurPos++;
    }

  }
  //
  KeyPadBackDel()
  {
    if (this.CurPos == 0) {
      this.PhoneNo = this.PhoneNo;
    }
    else
    {
      var start:string =  this.PhoneNo.substr(0,this.CurPos - 1);
      var end:string = this.PhoneNo.substr(this.CurPos);
      this.PhoneNo = start + end;
      this.CurPos--;
    }

  }
  KeyPadDel()
  {
    if (this.CurPos == this.PhoneNo.length) {
      this.PhoneNo = this.PhoneNo;
    }
    else
    {
      var start:string =  this.PhoneNo.substr(0,this.CurPos);
      var end:string = this.PhoneNo.substr(this.CurPos - 1);
      this.PhoneNo = start + end;
    }

  }

   ngAfterViewInit()
  {
     this.inputEl.nativeElement.focus();
    //this.openKeyboard('numpad');
  }

  closeCurrentKeyboard() {
    // if (this._keyboardRef) {
    //   this._keyboardRef.dismiss();
    // }

    // if (this._enterSubscription) {
    //   this._enterSubscription.unsubscribe();
    // }
  }

  toggleDebug(toggle: MatSlideToggleChange) {
    this.isDebug = toggle.checked;
    //this._keyboardRef.instance.isDebug = this.isDebug;
  }

  toggleDarkTheme(toggle: MatSlideToggleChange) {
    this.darkTheme = toggle.checked;
    //this._keyboardRef.instance.darkTheme = this.darkTheme;
  }

   //=============================================================
   focusOutFunction()
   {
       this.AAC.ShowNumpad = false;
       this.AAC.telNumber = false;
       this.AAC.log("==============focusOutFunction() numpad lost focus ====================")
   }
  
   SetCallButton()
   {
     this.AAC.setCAllButton(this.PhoneNo);
   }

  }
