import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, HostListener, HostBinding} from "@angular/core";

@Component({
  selector: "app-drop-down-switcher",
  templateUrl: "./drop-down-switcher.component.html",
  styleUrls: ["./drop-down-switcher.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownSwitcherComponent {
  @Input() text: string = "text";
  @Input() optionVisible = "No";

    @Output() shareCheckedList = new EventEmitter<any[]>();
    @Output() shareIndividualCheckedList = new EventEmitter();


    list:any[];
    checkedList : any[];
    currentSelected : {};
    showDropDown: boolean;

    constructor(){
        this.list =
            [
                {name:'דוא\"ל', checked: false , icon: "./stories/assets/icons/icon--channel--2.svg"},
                {name:'צ\'אט', checked: false, icon: "./stories/assets/icons/icon--channel--3.svg"},
                {name:'שיחה קולית', checked: false, icon: "./stories/assets/icons/icon--channel--voice.svg"},
                //{name:'Whatsapp', checked: false, icon: "./stories/assets/icons/icon--channel--4.svg"},
                // {name:'sms', checked: false, icon: "./stories/assets/icons/icon--channel--1@2x.png"},
                // {name:'פייסבוק', checked: false, icon: "./stories/assets/icons/icon--channel--5.svg"},
                // {name:'אינסטגרם', checked: false, icon: "./stories/assets/icons/icon--channel--3.svg"},
            ];
        this.checkedList = [];
    }
    getSelectedValue(status:Boolean,value:String){
        if(status){
            this.checkedList.push(value);

        }else{
            var index = this.checkedList.indexOf(value);
            this.checkedList.splice(index,1);
        }

        this.currentSelected = {checked : status,name:value};

        //share checked list
        this.shareCheckedlist();

        //share individual selected item
        this.shareIndividualStatus();
    }

    cleanAll(){
        this.list.forEach((item) => {
            item.checked = false;
        })
        this.checkedList = [];
        this.shareCheckedlist();
    }

    onLeave(){
        this.showDropDown = false;

    }

    shareCheckedlist(){
        this.shareCheckedList.emit(this.checkedList);
    }
    shareIndividualStatus(){
        this.shareIndividualCheckedList.emit(this.currentSelected);
    }
}


