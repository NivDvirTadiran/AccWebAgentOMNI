import {HostListener,Component, ViewChild, OnInit, AfterViewInit, Inject, SimpleChanges, OnChanges} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatMenuModule,MatMenu} from '@angular/material/menu';
import {MdbInputDirective} from "mdb-angular-ui-kit/forms";
import {MatSidenavModule,MatSidenav,MatSidenavContainer} from '@angular/material/sidenav';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AccAgentService} from './acc-agent.service';
import { LoginUser, Agent } from './data-model.interface';
import {TranslateService} from '@ngx-translate/core';
import {Md5} from 'ts-md5/dist/md5';
import {ActivatedRoute} from "@angular/router";
import {PopoverOptions} from "../../stories/directive/popover.interface";
import {ActionAvatarComponent} from "../../stories/actions/action-avatar/action-avatar.component";
//import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'acc-logon',
  templateUrl: './acclogon.component.html',
  styleUrls: ['./acclogon.component.scss']
})
export class accLogonComponent implements OnInit, AfterViewInit {
    popover: PopoverOptions = {
        content: ActionAvatarComponent
    };

  //public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  agentNo: String = '';
  password: String = '';
  extension: String = '';
  version = " 4.1.32";
  public hide: boolean = true;
  public isGrey:boolean = true;
  public bgWhite = "style = 'background-color:white'";
  public bgGray = "style = 'background-color:grey'";
  public AAC: AccAgentService;
  public isGateLogin:boolean;
  public isGateSignOut:boolean = false;
  //
  public constructor(public AAC1: AccAgentService,
              public translateService:TranslateService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute){

      this.AAC = AAC1;
      this.AAC.isAeonixAppCenterOn = this.route.snapshot.data.bool;

  }
  modeX = new FormControl('side');
  @ViewChild('sidenav', { static: true}) sidenav: MatSidenav;
  //
  // audio = new Audio();
  // playAudio(f:string){
     
  //   this.audio.src = f;
  //   this.audio.load();
  //   this.audio.play();
  // }      
   // ]==============================[HostListener]========================
   @HostListener('window:unload', ['$event'])
   unloadHandler(event) {
       this.PostCall('unloadHandler');
       this.AAC.log('unloadHandler');
       return "false";
   }
   //------------------------------------------
   @HostListener('window:beforeunload', ['$event'])
   beforeUnloadHander(event) {
       //this.AAC.ClearCredintial();
       this.PostCall('beforeUnloadHander');
        //setTimeout(function() {return false; }, 6);  
       return "false";
   }

   PostCall(note:string) {
       //this.AAC.agentLogoff(true);
       this.AAC.log(note + ', Agent Exit');
       localStorage.setItem("AccWebAgentTop",window.screenTop.toString()); 
       localStorage.setItem("AccWebAgentLeft",window.screenLeft.toString()); 
   }

  ngOnInit()
  {

    this.isGateLogin = this.AAC.isGateLogin();
    this.isGateSignOut = this.AAC.isGateSignOut();


      this.AAC.screenWidth = 250;
    var lang = localStorage.getItem("AccWebAgentLagnguage"); 
    if (lang != null)
    {
       this.AAC.changeLanguage(lang);
    }
     //this.playAudio(this.audio.src); 
     if (window.screen.availWidth < 600)
    {
        this.AAC.screenWidth = window.screen.availWidth;
    }
    this.AAC.getAACStatus();
    //window.resizeTo(this.screenWidth);
    this.sidenav.open(); 

    //2019-05-05 AlisherM BZ#49794: disable click2dial on logon
    if (this.AAC.isSalesforce)
    {
        this.AAC.salesforce.disableClickToDial();
    }
  }
  ngAfterViewChecked()
  {
  }
  ngAfterViewInit() {
    var parsedUrl = new URL(window.location.href);
    this.AAC.log("AgentLogont=>ngAfterViewInit, href: " + window.location.href);
    this.AAC.NotificationInterval = 5000;
    this.AAC.timerSubscribe();

    if (this.AAC.agaenLogin.username != "")
    {
      var response: any;

      if (this.AAC.isGateLogin() && !this.AAC.isGateSignOut())
        response = this.AAC.accLogonJWT(this.AAC.agaenLogin);

      if (!this.AAC.isGateLogin())
        response = this.AAC.accLogon(this.AAC.agaenLogin);
    }
    document.title = 'Aeonix Contact Center';


  }

//=============================================================
// openDialog() {
//     const dialogRef = this.dialog.open(ConfirmationDialog);
//     const snack = this.snackBar.open('Snack bar open before dialog');
//
//     dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
//       if (showSnackBar) {
//         snack.dismiss();
//         const a = document.createElement('a');
//         a.click();
//         a.remove();
//         snack.dismiss();
//         this.snackBar.open('Closing snack bar in a few seconds', 'Fechar', {
//           duration: 2000,
//         });
//       }
//     });
//  }
//================================================================


logonGate(): void {

    this.AAC.log("my token: " + this.AAC.authService.tokenService.getUser().username);
    if (this.AAC.NoConnectionToAcc == true || this.AAC.waitForLogin == true) {
        return;
    }
    if (this.AAC.sessionId == undefined || this.AAC.sessionId == "") {
        this.AAC.SetSessionId();
    }

    var loginUser: LoginUser = new LoginUser(
        this.AAC.authService.tokenService.getUser().username,
        "0000",
        this.extension);
    var pwd = Md5.hashStr(this.AAC.sessionId + ':' + loginUser.password);
    loginUser.password = pwd as string;
    this.AAC.log('agentNo: ' + loginUser.username + ' , extension: ' + loginUser.extension);
    var response: any = this.AAC.accLogonJWT(loginUser);
    if (response != "") {
        this.AAC.log(response);
    }

}

  logon() {
    if (this.AAC.NoConnectionToAcc == true || this.AAC.waitForLogin == true) {
      return;
    }
   if (this.AAC.isSSO == false )
   {
    if (this.agentNo.trim() == "" || this.password == "" || this.extension.trim() == "") {
      return;
    }
    var loginUser = new LoginUser(this.agentNo.trim(), this.password, this.extension.trim());
    }
    else
    {
      if (this.extension == "" && this.AAC.isSSOSeating == true) {
        return;
      }
      var loginUser = new LoginUser(this.AAC.SSOuser, "", this.extension);
    }
    if (this.AAC.sessionId == undefined ||this.AAC.sessionId == "")
    {
      this.AAC.SetSessionId();
    }
    var pwd =  Md5.hashStr(this.AAC.sessionId + ':' + loginUser.password);
    loginUser.password = pwd as string;
    this.AAC.log('agentNo: ' + loginUser.username + ' , extension: ' + loginUser.extension);
    var response: any = this.AAC.accLogon(loginUser);
    if (response != "") {
      this.AAC.log(response);
    }
    // play_single_sound() {
    // var x:any = document.getElementById('audiotag1');
    // x.play();
  }       
}
/*
@Component({
    selector: 'confirmation-dialog',
    templateUrl: 'confirmation-dialog.html',
  })
  export class ConfirmationDialog {

    constructor(
      public dialogRef: MatDialogRef<ConfirmationDialog>) { }

    onYesClick(): void {
      this.dialogRef.close(true);
    }

  }*/

