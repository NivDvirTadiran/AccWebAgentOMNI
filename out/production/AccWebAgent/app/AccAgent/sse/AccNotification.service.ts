import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { AccNotifications} from '../data-model.interface';
import { SseService } from './sse.service';
const EventSource: any = window['EventSource'];
@Injectable()
export class AccNotificationService {
  private url = '';

  //constructor(private sseService: SseService, private zone: NgZone) {
  //}
  Init(url:string)
  {
    this.url = url;
  }
  // getHiglightedOffer(): Observable<AccNotifications> 
  // {
  //   return Observable.create(observer => {
  //     const eventSource: sse.IEventSourceStatic = this.sseService.createEventSource(this.url);
  //     eventSource.onmessage = (event) => {
  //       this.zone.run(() => observer.next(JSON.parse(event.data)));
  //     };
  //     eventSource.onerror = (error) => {
  //       observer.error(error);
  //     };
  //   });
  // }
  constructor(private zone: NgZone) { }

  public observe(sseUrl: string): Observable<any> 
  {
    return new Observable<any>(obs => {
      const es = new EventSource(sseUrl);
      es.onmessage = evt => {
        const data = JSON.parse(evt.data); // TODO handle parse error
        this.zone.run(() => obs.next(data));
      };
      return () => es.close();
    });
  }
}
