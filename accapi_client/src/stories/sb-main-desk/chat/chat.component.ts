import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { BubbleModel } from './bubble/bubble.model';
import {accbutton} from "../../../app/AccAgent/tel-win-btn/AccBtnsDef";

export type MsgGroup = BubbleModel[];
export type ChatLog = Array<MsgGroup>;


enum ChatType {
  WebChat,
  SMS,
  WhatsApp,
  FacebookMessenger
  // Add more chat types as needed
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  newMessage: BubbleModel;
  message: BubbleModel = {
    msgId: 1,
    participant: "Agent",
    checkMark: "Timer",
    message: "Hello, how can I help you?",
    date: new Date()
  };

  @Input() chatLog!: ChatLog;
  @Input() property1: any;

  constructor() { }

}
