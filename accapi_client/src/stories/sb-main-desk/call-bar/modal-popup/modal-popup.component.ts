import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import {TypeBarData} from "../../typing-bar-reply/frame-136/type-bar/type-bar.component";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {CallItemModel} from "../../../sb-call-bar/call-list/CallsListNew/CallItem/callItem.model";


@Component({
    selector: 'modal-popup',
    templateUrl: './modal-popup.component.html',
    styleUrls: ['./modal-popup.component.scss'],
})

export class ModalComponent {

    label = 'אישור';
    currentForm: FormGroup = new FormGroup({message: new FormControl('')});
    @Output() closeAction = new EventEmitter();
    @ViewChild('modalInput', { static: true }) modalInput: ElementRef;
    constructor(public modalRef: MdbModalRef<ModalComponent>) {
        this.setMessage("");
    }

    get message(): AbstractControl {
        return this.currentForm?.get('message')!;
    }

    setMessage(message: string): void {
        return this.currentForm.get('message')?.setValue(message);
    }

    closePopup()
    {
        //console.log("modalInput2 " + this.modalInput.nativeElement.value)
        this.modalRef.close(this.message.value.toString());

        this.closeAction.emit();
        this.setMessage("");

    }

    closeIcon(){
        this.modalRef.close(null);
    }
}
