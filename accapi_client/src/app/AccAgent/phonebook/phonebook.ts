import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { AccAgentService } from '../acc-agent.service';
import { OnePhoneInterface } from '../data-model.interface';

    // ............... [ OnePhone ] ...............
    export class OnePhone implements OnePhoneInterface {
         constructor(public category?, public name?, public phone1?,  public phone2?) {category="!";name=" ";phone1=" ";phone2=" ";}
    }
    // ...............[ showDialogToAdd ] ...............

@Component({
    selector: 'phone_book',
    templateUrl: './phonebook.html',
    styleUrls: ['./phonebook.scss'],
})
// ...............[ showDialogToAdd ] ...............
export class PhoneBook implements OnInit {

    editMode:boolean = false;
    displayDialog: boolean;
    onephone: OnePhone = new OnePhone();

    rowGroupMetadata: any;
    selectedOnephone: OnePhone;
    newPhone: boolean;
    phones: OnePhone[];
    cols: any[];
    phones1: OnePhone[];
    phones2: OnePhone[];
    selectedOnephone1: OnePhone;
    selectedOnephone2: OnePhone;
    yearTimeout: any;

    items: MenuItem[];
    constructor(public AAC: AccAgentService,public translate: TranslateService,) {this.editMode = false; }
    new_t:string = 'New';
    edit_t:string = 'Edit';
    del_t:string = 'Delete';
    curaction:string; 
    doAction = 1;

    // ========================[ ngOnInit ] ========================
    ngOnInit() {
        if (this.AAC.phonebook.data.length == 0)
        {
          var a:any  = new OnePhone(); 
          this.AAC.phonebook.data.push(a);
        }
        this.phones = this.AAC.phonebook.data;
        this.phones1 = this.phones;
         this.cols = [
            { field: 'category', header: 'Category', width: '10%'},
            { field: 'name', header: 'Last name', width:  '30%' },
            { field: 'private', header: 'Name', width:  '15%' },
            { field: 'phone1', header: 'Phone 1', width:  '15%' },
            { field: 'phone2', header: 'Phone 2', width:  '10%' }

         ];
         this.editMode = this.AAC.agent.m_Sup;
         this.translate.get(this.new_t).subscribe((text:string) => {this.new_t = text});
         this.translate.get(this.edit_t).subscribe((text:string) => {this.edit_t = text});
         this.translate.get(this.del_t).subscribe((text:string) => {this.del_t = text});
         //
         var makeCall:string = "Call";
         var startcons:string = "Start Consultation";
         var transfer:string = "Transfer Call";
         //
         this.translate.get(makeCall).subscribe((text:string) => {makeCall = text});
         this.translate.get(startcons).subscribe((text:string) => {startcons = text});
         this.translate.get(transfer).subscribe((text:string) => {transfer = text});
         //
         if (this.AAC.agent.m_Sup == true)
         {
         this.items = [
            { label: this.new_t, command: (event) => this.showDialogToAdd() },
            { label: this.edit_t, command: (event) => this.showDialogToEdit(this.selectedOnephone,this.edit_t,2) },
            { label: this.del_t, command: (event) =>this.showDialogToEdit(this.selectedOnephone,this.del_t,3) },
            { label: makeCall, command: (event) =>this.MakeCall() },
            { label: transfer, command: (event) =>this.Transfer() },
            { label: startcons, command: (event) =>this.StartConsultation() }
         ];
        }
        else{
            this.items = [
                { label: makeCall, command: (event) =>this.MakeCall() },
                { label: transfer, command: (event) =>this.Transfer() },
                { label: startcons, command: (event) =>this.StartConsultation() }
            ];
         }
     }

    // ========================[ showDialogToEdit ] ========================
    showDialogToEdit(selected:OnePhone,curaction,doAction) {
        this.curaction = curaction;
        this.doAction = doAction;
        if (this.editMode == false) {return;}
         this.newPhone = false;
        this.onephone = selected;
        if (this.chosenphone != 'phone 2'){
            this.phoney = this.onephone.phone1;
        }
        else {this.phoney = this.onephone.phone2;}
 
        this.displayDialog = true;
    }
   // ========================[ onRowSelect ] ========================
//   <!-- (mouseenter)="onRowMouseOver(rowData,$event)"  [class.row-hover]="rowData.hover" 
//   (mouseleave)="onMouseLeave(rowData,$event)" -->

   phoney:string = "";
   MouseDown(rowData,evt) {
    this.phoney = "";
       if (evt.button == 2)
       {
        this.selectedOnephone = rowData;   
       // rowData.hover = true;
        this.onephone = rowData;
        if (this.chosenphone != 'phone 2'){
            this.phoney = this.onephone.phone1;
        }
        else {this.phoney = this.onephone.phone2;}
    }
   }
    // ========================[ showDialogToAdd ] ========================
    showDialogToAdd() {
        this.curaction = this.new_t;
        this.doAction = 1;
        if (this.editMode == false) {return;}
        this.newPhone = true;
        this.onephone = new OnePhone();
        this.displayDialog = true;
    }
    action()
    {
        switch (this.doAction)
        {
            case 1:
            case 2:
                this.save();
                break;
            case 3: 
            this.delete();
        }
    }
    // ========================[ showDialogToAdd ] ========================
    save() {
        const phones = [...this.phones];
        //public category?, public name?, public phone1?,  public phone2?) 
        if ( (this.onephone.category == undefined  || this.onephone.category.trim().length == 0) &&
            (this.onephone.name == undefined  || this.onephone.name.trim().length == 0) &&
            (this.onephone.phone1 == undefined  || this.onephone.phone1.trim().length == 0) &&
            (this.onephone.phone2 == undefined  || this.onephone.phone2.trim().length == 0) )
            {
                //if (phones.length)
                this.onephone = null;
                this.displayDialog = false;
                console.log ("!!!empty phone entry not saved !!")
                return;
            }
        if (this.newPhone) {
            phones.push(this.onephone);
        } else {
            phones[this.findselectedOnephoneIndex()] = this.onephone;
        }
        this.phones = phones;
        this.onephone = null;
        this.displayDialog = false;
        this.AAC.phonebook.data = this.phones;
        this.AAC.SavePhonebook();
    }

    // ========================[ showDialogToAdd ] ========================
    delete() {
        const index = this.findselectedOnephoneIndex();
        this.phones = this.phones.filter((val, i) => i !== index);
        this.onephone = null;
        this.displayDialog = false;
        this.AAC.phonebook.data = this.phones;
        this.AAC.SavePhonebook();
    }

   
   
    // ========================[ showDialogToAdd ] ========================
    findselectedOnephoneIndex(): number {
        return this.phones.indexOf(this.selectedOnephone);
    }
    // ========================[ showDialogToAdd ] ========================
    onSort() {
        this.updateRowGroupMetaData();
    }
    // ========================[ showDialogToAdd ] ========================
    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};
        if (this.phones) {
            for (let i = 0; i < this.phones.length; i++) {
                let rowData = this.phones[i];
                let brand = rowData.category;
                if (i == 0) {
                    this.rowGroupMetadata[brand] = { index: 0, size: 1 };
                }
                else {
                    let previousRowData = this.phones[i - 1];
                    let previousRowGroup = previousRowData.category;
                    if (brand === previousRowGroup)
                        this.rowGroupMetadata[brand].size++;
                    else
                        this.rowGroupMetadata[brand] = { index: i, size: 1 };
                }
            }
        }
    }
    // ========================[ StartConsultation ] ========================
     // ========================[ StartConsultation ] ========================
     MakeCall(){
        //if (this.selectedOnephone != undefined){
        this.AAC.makeCall(this.getPhone());
        //}
    }
    // ========================[ StartConsultation ] ========================
    Transfer(){
        //if (this.selectedOnephone != undefined){
            this.AAC.transferCall(this.getPhone());
        //}
    }
    // ========================[ StartConsultation ] ========================
    StartConsultation(){
        //if (this.selectedOnephone != undefined){
            this.AAC.consultationCall(this.getPhone());  
        //}
    }    
    chosenphone:string = 'phone 1;'
    // ========================[ getPhone ] ========================
    getPhone()
    {
        var phonex:string = "";
        if (this.phoney == "") {this.AAC.log("getPhone=> Empty phone numner"); return null;}
        try{
            phonex = this.phoney.replace('-','').replace(' ','').replace('.','').replace('(','').replace(')','');
        } catch(e){
            phonex = this.phoney;
        }

        this.phoney = phonex;
        return phonex;
    }
     // ========================[ setphonenumber ] ========================
    setphonenumber(event) {
        this.phoney = "";
        if (this.selectedOnephone != undefined) {
            {
                if (this.chosenphone != 'phone 2') {
                    this.phoney = this.onephone.phone1;
                }
                else {
                this.phoney = this.onephone.phone2;
                }
            }
        }
    }

}
