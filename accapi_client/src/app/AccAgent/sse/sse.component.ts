import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { EventSourceService } from './';
import { SubscriptionLike } from 'rxjs';
import {AccNotifications} from "../data-model.interface";
import {AccAgentService} from "../acc-agent.service";
import {AppConfig} from "../../config/app.config";
import {TokenStorageService} from "../../_helpers/token-storage.service";
//import * as console from "console";


@Component({
  selector: 'sse',
  templateUrl: './sse.component.html',
  styleUrls: ['./sse.component.scss']
})
export class SseComponent implements OnInit, OnDestroy, AfterViewInit {
  public eventSourceSubscription: SubscriptionLike;
  public isSubscribed: boolean = false;

  @Output() accNotificationsEventArrived = new EventEmitter<AccNotifications[]>();
  //@Input() AAC: AccAgentService;
  @Input() sessionId: string = this.AAC.GetSessionId();

  url = '/accOMNI/subscribe';
  options =
      {
          headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
              'X-Accel-Buffering': 'no',
              //Authorization: `Bearer ${access_token}`,
          },
          heartbeatTimeout: 120000,
          withCredentials: true,
      }

  eventNames = ['message'];

  constructor(public tokenService: TokenStorageService,
              private AAC: AccAgentService,
              private eventSourceService: EventSourceService) {
      const sessionId = this.sessionId;

      console.log("SseComponent - this.sessionId: " +  sessionId);

      this.eventSourceSubscription = this.eventSourceService
          .connectToServerSentEvents(  `${this.url}/${sessionId}`, this.options, this.eventNames)
          .subscribe({
                  next: data => {
                      this.isSubscribed = true;
                      let notificationsJson: string = (<MessageEvent<AccNotifications>>data).data.toString();
                      //handle event
                      //console.log("from SSE service: receive notification for sessionId:  " + notificationsJson);

                      const notifications: AccNotifications[] = <AccNotifications[]> JSON.parse( notificationsJson );

                      //this.accNotificationsEventArrived.emit(notifications);
                      this.AAC.GetAccNotificationsBySSE(notifications);

                  },
                  error: error => {
                      this.isSubscribed = false;
                      console.log("SseComponent - ERROR: " +  sessionId);
                  }
              }
          );

      this.isSubscribed = true;


  }

    ngAfterViewInit(): void {

    }


  ngOnDestroy() {
    //this.tokenService.clearSessionId()
    console.log("SseComponent - ngOnDestroy: " +  this.sessionId);
    this.isSubscribed = false;
    this.eventSourceSubscription.unsubscribe();
    this.eventSourceService.close();
  }

    ngOnInit(): void {
        this.AAC.setSSEConector(this);
    }
}
