import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'acc-omni-page',
  templateUrl: './acc-omni-page.component.html',
  styleUrls: ['./acc-omni-page.components.scss']
})
export class AccOmniPageComponent implements OnInit {

  @Input() property1:
      | "Send"
      | "Answer"
      | "Hang"
      | "Pause"
      | "Release"
      | "ActiveCall"
      | "PhoneBook"
      | "Dial"
      | "Reject" = "Send";

  ngOnInit(): void {
  }

}
