import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()


export class CoreApiService {
  public http: HttpClient;


  constructor(private http1: HttpClient) {
    //protected _chgDetectorRef: ChangeDetectorRef)  
    this.http = http1;
  }

  //==========================================================================
  //==========================================================================
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
//==========================================================================
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //================================[ ping]=========================================
  ping<T>(url: string): Observable<any> {
    this.myOservable = this.http.request("GET",url,{responseType:"json"});
      return this.myOservable;
  }
  //=========================================================================
  // ping(url: string) {
  //   var s:any  = "";
  //   s = this.http.get(url, {responseType: 'text'});
  //   //this.http.get(url).subscribe((res)=>{
  //    // s = res;
  //    // console.log(res);
  //   //});
  //   return s;
  //}
  //==========================================================================
  // ================================[ AeonixAppCenterOn]===========================
  isAeonixAppCenterOn<T>(url: string): Observable<any> {
    this.myOservable = this.http.request("GET", url, { responseType: "json" });
    return this.myOservable;
  }
  myOservable:any;
  get<T>(url: string): Observable<any> {
    this.myOservable = this.http.request("GET",url,{responseType:"json"});

    //return this.http.get(url).pipe(
      //map(this.extractData),
      //catchError(this.handleError<any>('get')));
      return this.myOservable;
  }
  //==========================================================================
  post<T>(url: string, body: string): Observable<any> {
    console.log(body);
    return this.http.post<any>(url, body, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('post'))
    );
  }
//==========================================================================
  put(url: string, body: string) {
    this.http.put(url, body,httpOptions).subscribe(
      data => {
        console.log("PUT Request is successful ", data);
      },
      error => {
        if (error.status != 200)
        {
          console.log("Error", error);
          this.handleError<any>('put')
        }
      }
    )
  }

  // Base64Decode(str, encoding = 'utf-8') {
  //     var bytes = base64js.toByteArray(str);
  //     return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes);
  // }
}
