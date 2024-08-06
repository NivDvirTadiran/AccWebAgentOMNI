import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {CoreApiService} from "./AccAgent/genericRequest";
import {Observable} from "rxjs";
import {TokenStorageService} from "./_helpers/token-storage.service";


@Injectable({
    providedIn: 'root'
})
export class IsAeonixAppCenterOnResolver implements Resolve<boolean> {
    private localurl: string;
    private appName: string;
    private parsedUrl = new URL(window.location.href);
    private url = this.parsedUrl.hostname;
    private port = this.parsedUrl.port;
    private protocol = this.parsedUrl.protocol;

    constructor(private httprequests: CoreApiService, private tokenService: TokenStorageService) {
        this.localurl =this.protocol + "//" + this.url + ":" + this.port;
        this.appName = '/' + this.parsedUrl.toString().split('/')[3];
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {

        return this.checkAeonixAppCenterStatus()
            .then((val: boolean) => {
                    console.log("AeonixAppCenter mode is - " + (val ? 'ON' : 'OFF') );
                    let params = this.parsedUrl.searchParams;
                    var aeonixAppCenterParams = params.get("aeonixAppCenterParams");
                    if (aeonixAppCenterParams != undefined) {
                        this.saveAeonixAppCenterDetails(aeonixAppCenterParams);
                    }
                    return val;
                },
                error => {
                    console.error("AeonixAppCenter status: Backside response with Error!");
                    return false;
                });

    };


    checkAeonixAppCenterStatus(): Promise<boolean> {
        let fullurl = this.localurl + this.appName + "/aeonix-app-center-status";
        console.log("app.component - fullurl: " + fullurl);
        return new Promise((resolve, reject) => {
            let ret: boolean = undefined;
            this.httprequests.isAeonixAppCenterOn(fullurl).subscribe((value) => {
                    if (value == undefined) {
                        console.log("AeonixAppCenter status unknown ");
                        resolve(false);
                    } else {
                        resolve(value.status == "ON");
                    }
                },
                error => {
                    console.error("AeonixAppCenter status: Backside response with Error!");
                    reject();
                });
            setTimeout(() => {
                resolve(true);
            }, 800);
        });
    }

    //=================[saveAeonixAppCenterParams]==============
    saveAeonixAppCenterDetails(details?: string) {
        if (details != undefined) {
            try {
                var pp = atob(details);
                let user = JSON.parse(pp);
                this.tokenService.saveToken(user.accessToken);
                this.tokenService.saveRefreshToken(user.refreshToken);
                this.tokenService.saveUser(user);
            } catch(e) {
                console.error("Failed to restore token details ==> " + ", " + e.message);
                return;
            }
        }
    }

}
