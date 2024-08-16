import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'action-avatar',
  templateUrl: './action-avatar.component.html',
  styleUrls: ['./action-avatar.component.css']
})
export class ActionAvatarComponent implements OnInit {

  bubbleOn?: boolean;
  actionHeader: string = "Your password will expire in 3 Days.";

  @Output() actionButton = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  public setHeader(actionHeader: string) {
    this.actionHeader = actionHeader;
  }

  public setBubbleOn(bubbleOn: boolean) {
    this.bubbleOn = bubbleOn;
  }


}
