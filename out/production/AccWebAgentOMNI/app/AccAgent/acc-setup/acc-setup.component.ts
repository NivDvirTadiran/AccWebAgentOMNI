 //our root app component
import { Component, NgModule, VERSION,OnInit,NgZone,ViewChild } from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { BrowserModule } from '@angular/platform-browser';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccAgentService } from '../acc-agent.service';
import { AccButtons, accbutton, AccOneButton2 } from 'src/app/AccAgent/tel-win-btn/AccBtnsDef'
//@NgModule({declarations: [FileSelectDirective]})

export class Setup {
    public constructor(val:string, vv:string){
        this.value = val;
        this.viewValue = vv;    
        this.selected =  false;
        this.data = "";

    }
    value: string;
    viewValue: string;
    selected:boolean;
    data:string;
  }
  export class SetupGroup {
    disabled?: boolean;
    name: string;
    setup: Setup[];
    public constructor(d:boolean, n:string){
        this.disabled = d;
        this.name = n;    
        this.setup = [];
    }
  }
  

  const URL = 'file:///C:/Windows/media';  
@Component({
    selector: 'acc-setup',
    templateUrl: './acc-setup.component.html',
    styleUrls: ['./acc-setup.component.scss']
})
export class AccSetupComponent implements OnInit {
    title = 'Checkbox';
  names: any;
  selectedAll: any;
  selectedNames: any;
  toolbarOpt: Setup[];
  setupGroups: SetupGroup[];

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'audio'});

  public ACDList: Array<accbutton> = [];
  public TELList: Array<accbutton> = [];


    constructor(private ngZone: NgZone,public AAC: AccAgentService) {
          this.title = "Select all/Deselect all checkbox - Angular 2";
    this.setupGroups = [
        {
          name: 'Toolbar',
          setup: [
            {value: 'onTop', viewValue: 'Alway On top', selected: false,data: ""},
            {value: 'LargeIcons', viewValue: 'Larg icons', selected: false,data: ""},
            {value: 'AutoResize', viewValue: 'Auto resize', selected: false,data: ""},
            {value: 'StatusBar', viewValue: 'Status bar', selected: false,data: ""}
        ]
        },
        {
            name: 'Personal Options',
            setup: [
                {value: 'StartMin', viewValue: 'Start minimize', selected: false,data: ""},
                {value: 'EnableCloseX', viewValue: 'Enable closing via system menu "x"', selected: false,data: ""},
                {value: 'OpenOnForeRelease', viewValue: 'Open Toolbar on "Forced Release" state', selected: false,data: ""},
                {value: 'MinOnRelease', viewValue: 'Allow minimize the toolbar in "Release" state', selected: false,data: ""},
                {value: 'OpenOnRing', viewValue: 'Open Toolbar on Ring', selected: false,data: ""},
                {value: 'MinOnAnswer', viewValue: 'Minimize on answer', selected: false,data: ""},
                {value: 'OpenOnQueuedCall', viewValue: 'Open Toolbar on Queued Call', selected: false,data: ""},
            ]
      
        },
        {
            name: 'Ring',
            setup: [
                {value: 'Voice', viewValue: 'Voice', selected: false,data: ""},
                {value: 'Mail', viewValue: 'Mail', selected: false,data: ""},
                {value: 'Chat', viewValue: 'Chat', selected: false,data: ""},
                {value: 'OutboundCallConfirm', viewValue: 'Outbound Call Confirmation', selected: false,data: ""},
            ]
      
        },
        {
            name: 'Ring Alert',
            setup: [
                {value: 'RingOnce', viewValue: 'Ring Once', selected: true,data: ""},
                {value: 'ContinuousRing', viewValue: 'ContinuousRing', selected: false,data: ""},
            ]
        },
        {
            name: 'Ring Tone',
            setup: [
                {value: 'DefaultRing', viewValue: 'Default (speaker Beep', selected: true,data: ""},
                {value: 'WaveFile', viewValue: 'File (Wave files only,Required sound card)', selected: false,data: ""},
            ]
        },
        {
            name: 'Queue Alert',
            setup: [
                {value: 'SpeakerBeep', viewValue: 'Speaker Beep (Ring Once)', selected: true,data: ""},
                {value: 'WaveFile', viewValue: 'File (Wave files only,Required sound card)', selected: false,data: ""},
            ]
        },
        {
            name: 'Popups',
            setup: [
                {value: 'SpeakerBeep', viewValue: 'Speaker Beep (Ring Once)', selected: true,data: ""},
                {value: 'WaveFile', viewValue: 'File (Wave files only,Required sound card)', selected: false,data: ""},
            ]
        }]
        this.setupGroups = this.AAC.etasIni.AgentSetup;
        var TT = this;
        AccButtons.forEach(function (a) {
            if (a.Array[0].img != "") {

                if (a.must == false) {
                    var b = new accbutton(a.id, a.Array[0].title, a.Array[0].class,
                        a.Array[0].color, a.click, a.Array[0].img,
                        a.candrag, a.must, a.Description, a.Array[0].Code, a.datatype);
                    if (a.type == "ACD") {

                        TT.ACDList.push(b);
                    }
                    else if (a.type == "TEL") {
                        TT.TELList.push(b);
                    }
                }
            }
        });

    }
    @ViewChild('autosize', { static: true}) autosize: CdkTextareaAutosize;

    triggerResize() {
      // Wait for changes to be applied, then trigger textarea resize.
    //   this.ngZone.onStable.pipe(take(1))
    //       .subscribe(() => this.autosize.resizeToFitContent(true));
    }

     ngOnInit() {
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
           this.AAC.log('Wav Upload:uploaded: ' +  item + "," + ","+ status + ", " + response);
           setTimeout(function() { alert('File uploaded successfully'); }, 6);  
           //alert('File uploaded successfully');
       };
       this.setupGroups = this.AAC.etasIni.AgentSetup;
   }

    selectAll() {
        this.selectedAll = !this.selectedAll;
        this.AAC.log("selectAll()");
        for (var i = 0; i < this.setupGroups[0].setup.length; i++) {
            this.setupGroups[0].setup[i].selected = this.selectedAll;
        } 
  }
  checkIfAllSelected() {
      var totalSelected =  0;
      for (var i = 0; i < this.setupGroups[0].setup.length; i++) {
            if(this.setupGroups[0].setup[i].selected) totalSelected++;
        } 
    this.selectedAll = totalSelected === this.setupGroups[0].setup.length;
  return true;
  }
    checkRingSelected(event, idx) {
        switch (idx) {
            case 0:
                this.setupGroups[3].setup[1].selected = !(this.setupGroups[3].setup[0].selected);
                break;
            //
            case 1:
                this.setupGroups[3].setup[0].selected = !(this.setupGroups[3].setup[1].selected);
                break;
        }
    }
    checkToneSelected(event, idx) {
        switch (idx) {
            case 0:
                this.setupGroups[4].setup[1].selected = !(this.setupGroups[4].setup[0].selected);
                break;
            //
            case 1:
                this.setupGroups[4].setup[0].selected = !(this.setupGroups[4].setup[1].selected);
                break;
        }
    }
    checkQueueSelected(event, idx) {
        switch (idx) {
            case 0:
                this.setupGroups[5].setup[1].selected = !(this.setupGroups[5].setup[0].selected);
                break;
            //
            case 1:
                this.setupGroups[5].setup[0].selected = !(this.setupGroups[5].setup[1].selected);
                break;
        }
    }
    //
     handleFiles(files) {
        var  fileSelect = document.getElementById("fileSelect");
        var fileElem = document.getElementById("fileElem");
        var fileList = document.getElementById("fileList");
        if (!files.length) {
          fileList.innerHTML = "<p>No files selected!</p>";
        } else {
          fileList.innerHTML = "";
          const list = document.createElement("ul");
          fileList.appendChild(list);
          for (let i = 0; i < files.length; i++) {
            const li = document.createElement("li");
            list.appendChild(li);
            
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(files[i]);
            var audio = document.getElementById('audio');
            var source = document.getElementById('source');
            //source  = new HTMLMediaElement();
            
            
          
            // source.src = img.src; 
            // audio.load();
            // audio.play();
            img.height = 60;
            //img.onload = function() {
            //  window.URL.revokeObjectURL(this.src);
            //}
            li.appendChild(img);
            const info = document.createElement("span");
            info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
            li.appendChild(info);
          }
        }
      }
      //
      SaveSetup()
      {
        this.AAC.etasIni.AgentSetup = this.setupGroups;
        this.AAC.saveEtasIni();
      }
    // ---------------------------------------- [chooseACDImgClick]-----------------------------
    chooseACDImgClick(j) {
        var img = this.ACDList[j];
        this.AAC.accagentPage.tiles.push(img);
        // this.AAC.tiles.splice(this.AAC.tiles.length - 1, 0, img);
         this.AAC.saveEtasIniButtons(this.AAC.accagentPage.tiles);
    }
     // ---------------------------------------- [chooseTELImgClick]-----------------------------
    chooseTELImgClick(j,idx) {
        var img = this.AAC.copyImg(this.TELList[j],false);

        this.AAC.accagentPage.tiles.push(img);
        // this.AAC.tiles.splice(this.AAC.tiles.length - 1, 0, img);
        this.AAC.saveEtasIniButtons(this.AAC.accagentPage.tiles);
    }
    //
    audiohtml:string = '<audio controls><source src={{wavFileURL}} type="audio/wav">Your browser does not support the audio element.</audio>'

    wavFileURL:any;
    SelctedWavChange(event)
    {
        var audio = document.createElement('audio');
        audio.src = 'assets/audio/' + event.value;
        this.wavFileURL = audio;
       //document.getElementById('playWav').innerHTML = '<audio id="audio-player" controls="controls" src="{{wavFileURL}}" type="audio/wav">';
       this.play5Seconds(audio);
              //audio.play();
    }
    // ===================[SelctedPopChangeChange]====================
    slectetPopup:any = null;
    isPopupchoosed:boolean = false;
    SelctedPopChangeChange(event)
    {
        this.slectetPopup = event.value;
        this.isPopupchoosed = true;
    }
    //===============[savePosition]===========================
    posInUrl = -1;
    savePosition(evt)
    {
        this.posInUrl = 0;
    }
   // ===================[SelctedPopChangeChange]====================
   slectetCPF:any = null;
  
   SelctedCPFChangeChange(event,selected)
   {
       var s = selected;
       this.slectetCPF = event.value;
       this.copyText("%%" + event.value + "%%");
   }
  // ===================[copyText]====================
  copyText(val: string){
    let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }
    //==================[TestPopup]
    TestPopup()
    {
       var currCall = this.AAC.getCurrentCall();
       if (currCall != null)
       {
        this.AAC.TestExecuteCallCrm( this.AAC.getCurrentCall(),this.slectetPopup.URL);
       }
       else
       {
        this.AAC.TestExecuteWithouCallCrm(this.slectetPopup.URL);
       }
    }
    //==================[SetPopup]========================
    SetPopup()
    {
         var i = this.AAC.etasIni.CRM.map(x => x.Event).indexOf(this.slectetPopup.Event);
         if (i == -1) {return;}
         this.AAC.etasIni.CRM[i].URL = this.slectetPopup.URL;
     }

   // ===================[play5Seconds]====================
    play5Seconds(audio)
    {
        if (typeof audio.loop == 'boolean')
        {
            audio.loop = true;
            
        }
        else
        {
            audio.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }
       audio.play();
        setTimeout(function()
        {
             audio.pause();
        }, 6000);

    }
       //
 
    //=======================================================
    RingWavFiles: string[] =  
    ["bell-system-ringer-model-687a-8-70.wav",
    "phone.wav",
    "cellfone-ring.wav",
    "bakelitephoneringsinglemono.wav",
    "telephonering-1.wav",
    "we500-loud-3rings.wav",
    "ring.wav",
    "beepx4.wav",
    "telephone-ring-uk-2.wav",
    "telephone-ring-uk-3b.wav",
    "Alarm01.wav",
    "Alarm02.wav",
    "Alarm03.wav",
    "Alarm04.wav",
    "Alarm05.wav",
    "Alarm06.wav",
    "Alarm07.wav",
    "Alarm08.wav",
    "Alarm09.wav",
    "Alarm10.wav",
    "cell-phone-flip-1.wav",
    "cell-phone-vibrate-1.wav",
    "phone-disconnect-1.wav",
    "phone-off-hook-1.wav",
    "Ring01.wav",
    "Ring02.wav",
    "Ring03.wav",
    "Ring04.wav",
    "Ring05.wav",
    "Ring06.wav",
    "Ring07.wav",
    "Ring08.wav",
    "Ring09.wav",
    "Ring10.wav",
    "rotary-phone-1.wav",
    "rotary-phone-2.wav",
    "telephone-ring-01a.wav",
    "telephone-ring-02.wav",
    "telephone-ring-03a.wav",
    "telephone-ring-04.wav"];      
}

