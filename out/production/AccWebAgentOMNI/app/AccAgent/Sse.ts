import { Injectable, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AccAgentService} from './acc-agent.service';
// import { Observable } from 'rxjs/Observable';
// import { map } from "rxjs/operators";



import { LoggerService } from '../core/shared/logger.service';

import { AccNotifications} from './data-model.interface';

interface CallbackFcn
{
  (data: any): void;
}
//=====================================
declare class EventSource
{
  constructor(name: string);

  onopen: CallbackFcn;

  onmessage: CallbackFcn;

  onerror: CallbackFcn;

  addEventListener(evt: string, cb: CallbackFcn): void;
}
//=======================================
@Injectable()
export class Sse1  {
    protected _eventSource: EventSource;

    // have we subscribed to an event stream yet?
    protected _subscribed: boolean = false;
    protected _service: HttpClient;
    protected AAS: AccAgentService;
    public accSseP:string;


    constructor(private __service: HttpClient )
    {
        //protected _chgDetectorRef: ChangeDetectorRef)  
        this._service = __service;
     }

//=========================================  SSE =========================

public Init(accAgentService1: AccAgentService,accSseP:string,
            agentno:string,sessionid:string, accSseSubscribeP:string): void
{
  this.accSseP = accSseP;
  this.AAS = accAgentService1;
  // request the price data
  this.AAS.log("Sse:Init: " + accSseP);
 
  var withparam = this.accSseP + '?agentNo=' + agentno + '&sessionId=' + sessionid;
  var swithparam = accSseSubscribeP + '?agentNo=' + agentno + '&sessionId=' + sessionid;
  this._service.get<any>(withparam).subscribe( res => this.__onDataLoaded(res) ); 
  //this._eventSource           = new EventSource(swithparam);  
  //this._eventSource.onmessage = (data) => this.__onMessage(data);
  //this._eventSource.onerror   = (evt) => this.__onSseError(evt);
}

//-------------------------------------------------------------------
// public onSubscribe(): void
//   {
//     // handle clicking the subscribe to updates button
//     if (!this._subscribed)
//     {
//       this._eventSource           = new EventSource(this.accSseP);
//       this._eventSource.onmessage = (data) => this.__onMessage(data);
//       this._eventSource.onerror   = (evt) => this.__onSseError(evt);

//       this._subscribed = true;
//     }
//   }

//---------------------------------------------------------------------
  /** @internal */
  protected __onDataLoaded(data: any): void
  {
    LoggerService.log("__onDataLoaded: " + data);
    this.AAS.timerSubscribe();
    // initial data has been loaded; copy to the current price list collection
    //this.priceData = data.pricelist.slice();
  }
 /** @internal */
 protected __onMessage(message: Object): void
 {
   // process SSE messages
   const stock: AccNotifications = <AccNotifications> JSON.parse( message['data'] );
   LoggerService.log("__onMessage: " + message['data']);
//    if (index != -1)
//    {
//      // mutate the price data; note that EventSource does not work through XHR, so there is nothing to triggers a
//      // CD cycle in Angular upon processing the message
//      let newData: Array<IStockData> = this.priceData.slice();

//      newData[index] = stock;


//      // the reference has to change to fire the display component's onChanges handler; the array copy is acceptable
//      // since a list of observed stock prices is almost always very small.  There is another way to handle this which
//      // will be illustrated in a future demo.
//      this.priceData = newData;

//      this._chgDetectorRef.detectChanges();
//    }
//    else
//    {
//      // enhance error-handling as you see fit
//      console.log('Update provided for non-existing stock: ', stock );
//    }
 }

 /** @internal */
 protected __onSseError(e: any): void
 {
   // modify event handling as you see fit
   console.log( 'SSE Event failure: ', e );
 }
//==========================================================================
//==========================================================================
}
