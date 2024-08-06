import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccAgentService} from "../../../app/AccAgent/acc-agent.service";


@Component({
  selector: 'action-windows-menu',
  templateUrl: './action-windows-menu.component.html',
  styleUrls: ['./action-windows-menu.component.css']
})
export class ActionWindowsMenuComponent implements OnInit {

  bubbleOn?: boolean;
  actionHeader: string = "Your password will expire in 3 Days.";

  @Output() actionButton = new EventEmitter<any>();

  @Input() AAC?: AccAgentService;

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

  public setAAC(AAC: AccAgentService) {
    this.AAC = AAC;
  }


}
