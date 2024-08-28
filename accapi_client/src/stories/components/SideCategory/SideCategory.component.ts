import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { SideCategory1 } from "../SideCategory1/SideCategory1.component";
@Component({
  selector: "participants",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [SideCategory1],
  templateUrl: "./SideCategory.component.html",
  styleUrls: ["./SideCategory.component.css"],
})
export class Participants {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() callHistory: string = "";
  @Input() participants: string = "";
  @Input() propMinWidth: string = "";
}
