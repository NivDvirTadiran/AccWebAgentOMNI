import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {accbutton, accButtonInIni} from "../../tel-win-btn/AccBtnsDef";
import {AccAgentService} from "../../acc-agent.service";
import {AgentStatus, UserStatusModel} from "../../data-model.interface";
import {AccAgentPage} from "../acc-agent-page.component";

@Component({
  selector: 'buttons-board',
  templateUrl: './buttons-board.component.html',
  styleUrls: ['./buttons-board.component.scss']
})
export class ButtonsBoardComponent implements OnInit {

  //tiles?: Array<accbutton>;

  constructor(private AAC: AccAgentService) {
    //this.tiles = AAC.tiles;
  }

  @Input() mainPage: AccAgentPage;

  @Input() userStatus: UserStatusModel;
  @Output() userStatusChange = new EventEmitter<UserStatusModel>();


  @Input() tiles?: Array<accbutton>
  @Output() tilesChange = new EventEmitter<Array<accbutton>>();



  mouseDragOverIdx = -1;
  mouseDragIdx = -1;
  mouseClick = -1;
  imgcols: number = 4;
  isTrash: boolean = false;

  ngOnInit(): void {
  }
  // ---------------------------------------- [imgClicks]----------------------------------------------
  imgClicks(i, event) {
    this.AAC.LastBottomClick = i;
    this.AAC.offAllSpecialForms();
    if (this.AAC.NoConnectionToAcc == true)
    {
      return;
    }

    this.AAC.log("imgClick: " + this.tiles[i].title);
    let methodName = this.tiles[i].click;
    if (this.mainPage[methodName]) {
      this.mainPage[methodName](i);
    }
    this.mouseDragIdx = -1;
    this.mouseDragOverIdx = -1;
    event.stopPropagation();
  }
  // ---------------------------------------- [imgDrag]----------------------------------------------
  imgDrag(i, evt) {
    if (this.tiles[i].canDrag == false) {
      return;
    }
    this.mouseDragIdx = i;
    this.isTrash = true;
  }
  // ---------------------------------------- [imgDragOver]----------------------------------------------
  imgDragOver(i, evt) {
    evt.preventDefault();
    if (i < 0) {return;}
    if (this.tiles[i].canDrag == false) {
      return;
    }
    this.mouseDragOverIdx = i;
    // this.AAC.log(i + " dragover " + this.tiles[i].title);
  }
  imgMouseUp(i, evt) {
    //this.AAC.log(i + " imgMouseUp " + i);
  }
  // ---------------------------------------- []----------------------------------------------
  imgDrop(i, evt) {
    evt.preventDefault();
    if (i == -999)  {
      if (this.mouseDragIdx != -1) {
        var drag = this.tiles[this.mouseDragIdx];
        if (drag.isMust == false) {
          this.tiles.splice(this.mouseDragIdx, 1);
        }
        this.AAC.saveEtasIniButtons(this.tiles);
      }
    }
    else
    if (this.mouseDragIdx != -1 && this.mouseDragOverIdx != -1 && this.mouseDragIdx != this.mouseDragOverIdx) {
      var drag = this.tiles[this.mouseDragIdx];
      if (this.mouseDragOverIdx < this.mouseDragIdx) {
        this.mouseDragIdx++;
      }
      else {
        this.mouseDragOverIdx++;
      }
      this.tiles.splice(this.mouseDragOverIdx, 0, drag);
      this.tiles.splice(this.mouseDragIdx, 1);
      this.AAC.saveEtasIniButtons(this.tiles);
      this.mouseDragIdx = -1;
      this.mouseDragOverIdx = -1;
    }
    this.isTrash = false;
    //this.footercol = 4;
  }




}
