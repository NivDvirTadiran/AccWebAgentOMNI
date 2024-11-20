import {Component, EventEmitter, Input, Output} from "@angular/core";
import {BubbleModel} from "./bubble.model";
import moment from "moment/moment";
@Component({
  selector: "app-chat-bubble",
  templateUrl: "./bubble.component.html",
  styleUrls: ["./bubble.component.scss"]
})
export class BubbleComponent {

  @Input() chatBubble: BubbleModel;
  @Output() onShowSystemMessage = new EventEmitter<boolean>();
  public moment = moment;

  constructor() {

  }

  isShow(){
    if(this.chatBubble.participant == "Summary")
    {
      this.onShowSystemMessage.emit(true);
      return false;
    }
    return true;
  }

  public get classes(): string[] {
    return [ 'chat-bubble', `chat-bubble--${this.chatBubble.participant}`];
  }
  public get envelope(): string[] {
    return [ 'envelope', `envelope--${this.chatBubble.participant}`];
  }


}
