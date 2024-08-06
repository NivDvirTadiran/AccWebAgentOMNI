/**
 * Simple mock of the EventSource for testing
 */
export class EventSourceMock {
    private listeners = [];

    addEventListener(eventName: string, cb: Function) {
        this.listeners.push(cb);
    };

    onerror(error: any) {}

    // Helper method for emitting errors
    emitError(data: any) {
        this.onerror(data);
    };

    // Helper method for emitting events
    emit(data: any) {
        this.listeners.forEach(cb => cb(data))
    };
}
