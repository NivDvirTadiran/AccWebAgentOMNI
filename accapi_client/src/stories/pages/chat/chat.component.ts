import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";


export class EventData {
    name: string;
    value: any;
    constructor(name: string, value: any) {
        this.name = name;
        this.value = value;
    }
}


@Component({
    selector: 'sb-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export default class ChatComponent {
    messages = [
   /*     {
            Name: "Michael Kitenberg",
            Message: "Hi  : )"
        },
        {
            Name: 'You',
            Message: "What's up?"
        },
        {
            Name: 'Michael Kitenberg',
            Message: "We got no time!!"
        }*/
    ];

    public addMessage(name: string, message: string) {
        this.messages.push({
            Name: name,
            Message: message
        });
    }

    public onSubmit() {
        const { message } = this.chatForm.value;
        this.addMessage('You', message);
        this.onMessageReady.emit(message);
    }

    @Output()
    onMessageReady: EventEmitter<string> = new EventEmitter();

    @Input()
    messagesChat?: string = "ACC Messenger App";

    @Input()
    label?: string = "ACC Messenger App";

    @Input()
    backgroundColor?: string;
    @Input()
    backgroundA?: string;
    @Input()
    backgroundB?: string;

    @Input()
    lineColor?: string;

    @Input()
    theme:  'primary' | 'secondary' | 'managed' | 'none' = 'primary';

    /**
     * Is this the principal call to action on the login-main?
     */
    @Input()
    primary = true;

    public get classes(): string[] {
        return [`sb-chat--${this.theme}`];
    }

    chatForm: FormGroup;

    constructor() {
        this.chatForm = new FormGroup({
            message: new FormControl('', Validators.minLength(2)),
        });
    }
}
