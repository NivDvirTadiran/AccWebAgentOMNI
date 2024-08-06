import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from "./token-storage.service";

// parse ful url to ip,port, params
var parsedUrl = new URL(window.location.href);
var url = parsedUrl.hostname;
var port = parsedUrl.port;
var protocol = parsedUrl.protocol;
const AUTH_API = protocol + "//" + url + ":" + port+'/Aeonix-App-Center/auth/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, public tokenService: TokenStorageService) { }

  public logout() {
    let oldRefreshToken = this.tokenService.getRefreshToken();
    let promiseLogout = new Promise<void>((resolve, reject) => {
      this.tokenService.signOut();
      this.sendLogOutMsg(oldRefreshToken).subscribe(
          () => {resolve();},
          error => {reject();}
      );
      setTimeout(() => {
        console.log("Failed open new tab");
        resolve();//() => {resolve();}
      }, 5000);
    })
    if (oldRefreshToken)
      promiseLogout.then(() => {console.log("USER LOGGED OUT");})
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }


  private sendLogOutMsg(token: string): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {
      refreshToken: token,
    }, httpOptions);
  }

  // login, register
  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }
}
