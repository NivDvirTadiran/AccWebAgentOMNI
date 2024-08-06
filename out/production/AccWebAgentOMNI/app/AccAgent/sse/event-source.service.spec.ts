import { NgZone } from '@angular/core';
import { EventSourceService } from './event-source.service';
import {EventSourceMock} from "./event-source-mock";


/**
 * Test suite for EventSourceService
 */
describe('EventSourceService', () => {
    let service, zone, eventSourceMock;

    beforeEach(() => {
        eventSourceMock = new EventSourceMock();
        zone = {
            run: jasmine.createSpy('run').and.callFake((fn: Function) => fn())
        };

        service = new EventSourceService(zone as NgZone);
    });

    describe('connectToServerSentEvents', () => {
        it('should open connection and listen to events', (done: DoneFn) => {
            spyOn(service, 'getEventSource').and.returnValue(eventSourceMock);

            service.connectToServerSentEvents('https://your-server.com/sse', { withCredentials: true }, ['myEvent'])
                .subscribe({
                    next: data => {
                        expect(data.message).toBe('hello');
                    },
                    error: error => {
                        expect(error.message).toBe('error');
                        done();
                    }
                });

            eventSourceMock.emit({ message: 'hello' });
            eventSourceMock.emitError(new Error('error'));
        });
    });
});
