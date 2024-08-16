import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
//import { MatPaginator, MatMenuTrigger } from '@angular/material';
import { AccAgentService } from '../acc-agent.service';
import { AccCallProfileComponent } from '../acc-call-profile/acc-call-profile.component';
import { MatSort } from '@angular/material/sort';
import { noop as _noop } from 'lodash-es';
import { CPini } from '../data-model.interface';
import {MenuItem} from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

declare var THIS: any;

@Component({
  selector: 'open-calls',
  styleUrls: ['Grids.scss'],
  templateUrl: 'OpenCalls.html',
  //encapsulation: ViewEncapsulation.None 
})

export class OpenCalls implements OnInit, AfterViewInit {
   limit: number = 10000;
    //
  public style: object = {};
  public items: MenuItem[];
  public itemsRow: MenuItem[];
  public itemsHeader: MenuItem[];
  //
  constructor(public AAC: AccAgentService, public ACPC: AccCallProfileComponent,public translate: TranslateService) {
  }
  //
  selected: any;
  idx = -1;
  ngOnInit() {
    var i,ii,iii,iiii;
    this.translate.get("Insert").subscribe((text:string) => {i = text});
    this.translate.get("Delete").subscribe((text:string) => {ii = text});
    this.translate.get("Edit").subscribe((text:string) => {iii = text});
    this.itemsHeader = [
      { label: i, command: (event) => this.insertColumn(this.idx) },
      { label: iii, command: (event) => this.EditColumn(this.idx) },
      { label: ii, command: (event) => this.deleteColumn(this.idx) },
    ]
    this.translate.get("Answer").subscribe((text:string) => {i = text});
    this.translate.get("Drop").subscribe((text:string) => {ii = text});
    this.translate.get("Hold").subscribe((text:string) => {iii = text});
    this.translate.get("Retrieve").subscribe((text:string) => {iiii = text});
    
    this.itemsRow = [
      { label: i, command: (event) => this.AAC.DoCallAction(this.selected,'answercall') },
      { label: ii, command: (event) => this.AAC.DoCallAction(this.selected,'disconnectcall') },
      { label: iii, command: (event) => this.AAC.DoCallAction(this.selected,'holdcall') },
      { label: iiii, command: (event) => this.AAC.DoCallAction(this.selected,'retrievecall') },
    ]
 
    //THIS = this;
  }
  //
  ngAfterViewInit() {
    //this.pane = document.getElementById('pane');
    //this.ghostpane = document.getElementById('ghostpane');
    //this.animate();
  }

   setContextRow(event,idx) {
    this.idx = idx;
    this.AAC.log("Row," + idx + " " + event);
  }// 

  setContextHeader(event,idx) {
    this.idx = idx;
    this.AAC.log("Header," + idx + " " + event);
  }

  //
  insertColumn(idx: number) {
    this.AAC.curOCP = this.AAC.OCP;
    this.AAC.beforeIdx = idx;
    this.AAC.CPorQCP = 0;
    this.ACPC.setCPList();
    this.AAC.cpDialog = true;
    this.AAC.cpInsert = true;
    this.AAC.m_CpIni = null;
  }

  EditColumn(idx: number) {
    this.AAC.curOCP = this.AAC.OCP;
    var a = this.AAC.CP[idx].Index;
    var b = this.AAC.OCP.find(x => x.Key === a);

    this.AAC.m_CpIni = new CPini(this.AAC.CP[idx].Index,
                                 this.AAC.CP[idx].Format,
                                 this.AAC.CP[idx].Header,
                                 this.AAC.CP[idx].Sort,
                                 this.AAC.CP[idx].Width,
                                 b.Desc);
    this.AAC.beforeIdx = idx;
    this.AAC.CPorQCP = 0;
    this.AAC.cpInsert = false;
    this.AAC.cpDialog = true;
  }

  //
  deleteColumn(idx: number) {
    this.AAC.beforeIdx = idx;
    this.AAC.cpDialog = false;
    this.AAC.CPorQCP = 0;
    this.AAC.DeleteCpField();
  }
  //
  MouseDown(rowData,evt,event) {
       if (evt  == "header"){
         this.idx = rowData;
         this.items = this.itemsHeader;
         this.selected = undefined;
       }
       else{
        this.idx = -1;
        this.selected = rowData;
        this.items = this.itemsRow;
       }
   }

   onColReorder(val:any){
    console.log("OpenCalls ==> onColReorder: " + val);
    this.AAC.updateCallStatHeaderReorder(val.columns);
  }

   // 
  /*
* @author https://twitter.com/blurspline / https://github.com/zz85
* See post @ http://www.lab4games.net/zz85/blog/2014/11/15/resizing-moving-snapping-windows-with-js-css/
*/

//   "use strict";

//   // Minimum resizable area
//   minWidth = 60;
//   minHeight = 40;

//   // Thresholds
//   FULLSCREEN_MARGINS = -10;
//   MARGINS = 4;

//   // End of what's configurable.
//   clicked: any = null;
//   onRightEdge: any;
//   onBottomEdge: any;
//   onLeftEdge: any;
//   onTopEdge: any;

//   rightScreenEdge: any;
//   bottomScreenEdge: any;

//   preSnapped;

//   b: any;
//   x: any;
//   y: any;

//   redraw = false;

//   pane: any;
//   ghostpane: any;

//   setBounds(element, x, y, w, h) {
//     element.style.left = x + 'px';
//     element.style.top = y + 'px';
//     element.style.width = w + 'px';
//     element.style.height = h + 'px';
//     console.log("l: " + element.style.left + " , t: " + element.style.top + ", w: " + element.style.width + ", h: " + element.style.height);
//   }

//   hintHide() {
//     //console.log("++hintHide");

//     this.setBounds(this.ghostpane, this.b.left, this.b.top, this.b.width, this.b.height);
//     this.ghostpane.style.opacity = 0;

//     // var b = ghostpane.getBoundingClientRect();
//     // ghostpane.style.top = b.top + b.height / 2;
//     // ghostpane.style.left = b.left + b.width / 2;
//     // ghostpane.style.width = 0;
//     // ghostpane.style.height = 0;
//   }


//   // Mouse events

//   //document.addEventListener('mousemove', onMove);
//   //document.addEventListener('mouseup', onUp);

//   // Touch events	
//   //pane.addEventListener('touchstart', onTouchDown);
//   //document.addEventListener('touchmove', onTouchMove);
//   //document.addEventListener('touchend', onTouchEnd);


//   onTouchDown(e) {
//     this.onDown(e.touches[0]);
//     e.preventDefault();
//   }

//   onTouchMove(e) {
//     this.onMove(e.touches[0]);
//   }

//   onTouchEnd(e) {
//     if (e.touches.length == 0) this.onUp(e.changedTouches[0]);
//   }
//   @HostListener('document:mousedown', ['$event'])
//   onMouseDown(e) {
//     //console.log("pane mousedown");
//     this.onDown(e);
//     e.preventDefault();
//   }

//   onDown(e) {
//     this.calc(e);
    
//     var isResizing = this.onRightEdge || this.onBottomEdge || this.onTopEdge || this.onLeftEdge;

//     this.clicked = {
//       x: this.x,
//       y: this.y,
//       cx: e.clientX,
//       cy: e.clientY,
//       w: this.b.width,
//       h: this.b.height,
//       isResizing: isResizing,
//       isMoving: !isResizing && this.canMove(),
//       onTopEdge: this.onTopEdge,
//       onLeftEdge: this.onLeftEdge,
//       onRightEdge: this.onRightEdge,
//       onBottomEdge: this.onBottomEdge
//     };
//     //console.log("ismoving: " + this.clicked.isMoving);
//   }

//   canMove() {
//     //console.log ("x > 0: " + this.x +  ", x < b.width: " + this.b.width + ", y > 0: " +  
//        //this.y + ",  this.y < this.b.height: " + this.b.height);
//     return this.x > 0 && this.x < this.b.width && this.y > 0 && this.y < this.b.height && this.y < 30;
//   }

//   calc(e) {
//     this.b = this.pane.getBoundingClientRect();
//     this.ghostpane = document.getElementById('ghostpane');
//     this.x = e.clientX - this.b.left;
//     //console.log(" x: " + this.x + "e.clientX - this.b.left: " +  e.clientX + " - " + this.b.left);
//     this.y = e.clientY - this.b.top;
//     //console.log(" y: " + this.y + "e.clientY - this.b.top: " +  e.clientY + " - " + this.b.top);

//     this.onTopEdge = this.y < this.MARGINS;
//     this.onLeftEdge = this.x < this.MARGINS;
//     this.onRightEdge = this.x >= this.b.width - this.MARGINS;
//     this.onBottomEdge = this.y >= this.b.height - this.MARGINS;
   
//     this.rightScreenEdge = window.innerWidth - this.MARGINS;
//     this.bottomScreenEdge = window.innerHeight - this.MARGINS;
//   }

//   e: any;
//   @HostListener('document:mousemove', ['$event'])
//   onMove(ee) {
//     //console.log("mouse onMove");
//     this.calc(ee);

//     this.e = ee;

//     this.redraw = true;
//   }

//   animate() {
//     requestAnimationFrame(this.animate.bind(this));
//     //requestAnimationFrame(this.animate);

//     if (!this.redraw) return;

//     this.redraw = false;

//     if (this.clicked && this.clicked.isResizing) {

//       if (this.clicked.onRightEdge) this.pane.style.width = Math.max(this.x, this.minWidth) + 'px';
//       if (this.clicked.onBottomEdge) this.pane.style.height = Math.max(this.y, this.minHeight) + 'px';

//       if (this.clicked.onLeftEdge) {
//         this.pane.style.width = currentWidth + 'px';
//         var currentWidth = Math.max(this.clicked.cx - this.e.clientX + this.clicked.w, this.minWidth);
//         if (currentWidth > this.minWidth) {
//           this.pane.style.left = this.e.clientX + 'px';
//         }
//       }

//       if (this.clicked.onTopEdge) {
//         var currentHeight = Math.max(this.clicked.cy - this.e.clientY + this.clicked.h, this.minHeight);
//         if (currentHeight > this.minHeight) {
//           this.pane.style.height = currentHeight + 'px';
//           this.pane.style.top = this.e.clientY + 'px';
//         }
//       }

//       this.hintHide();

//       return;
//     }

//     if (this.clicked && this.clicked.isMoving) {
//       //console.log("++move");

//       if (this.b.top < this.FULLSCREEN_MARGINS || this.b.left < this.FULLSCREEN_MARGINS || this.b.right > window.innerWidth - this.FULLSCREEN_MARGINS || this.b.bottom > window.innerHeight - this.FULLSCREEN_MARGINS) {
//         // hintFull();
//         this.setBounds(this.ghostpane, 0, 0, window.innerWidth, window.innerHeight);
//         this.ghostpane.style.opacity = 0.2;
//       } else if (this.b.top < this.MARGINS) {
//         // hintTop();
//         this.setBounds(this.ghostpane, 0, 0, window.innerWidth, window.innerHeight / 2);
//         this.ghostpane.style.opacity = 0.2;
//       } else if (this.b.left < this.MARGINS) {
//         // hintLeft();
//         this.setBounds(this.ghostpane, 0, 0, window.innerWidth / 2, window.innerHeight);
//         this.ghostpane.style.opacity = 0.2;
//       } else if (this.b.right > this.rightScreenEdge) {
//         // hintRight();
//         this.setBounds(this.ghostpane, window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
//         this.ghostpane.style.opacity = 0.2;
//       } else if (this.b.bottom > this.bottomScreenEdge) {
//         // hintBottom();
//         this.setBounds(this.ghostpane, 0, window.innerHeight / 2, window.innerWidth, window.innerWidth / 2);
//         this.ghostpane.style.opacity = 0.2;
//       } else {
//         this.hintHide();
//       }

//       if (this.preSnapped) {
//         console.log("++setcursor");

//         this.setBounds(this.pane,
//           this.e.clientX - this.preSnapped.width / 2,
//           this.e.clientY - Math.min(this.clicked.y, this.preSnapped.height),
//           this.preSnapped.width,
//           this.preSnapped.height
//         );
//         return;
//       }

//       // moving

//       this.pane.style.top = (this.e.clientY - this.clicked.y) + 'px';
//       this.pane.style.left = (this.e.clientX - this.clicked.x) + 'px';
//       console.log("++moving=>" + this.pane.style.top + ", " + this.pane.style.left);

//       return;
//     }

//     // This code executes when mouse moves without clicking

//     // style cursor
//     if (this.onRightEdge && this.onBottomEdge || this.onLeftEdge && this.onTopEdge) {
//       this.pane.style.cursor = 'nwse-resize';
//     } else if (this.onRightEdge && this.onTopEdge || this.onBottomEdge && this.onLeftEdge) {
//       this.pane.style.cursor = 'nesw-resize';
//     } else if (this.onRightEdge || this.onLeftEdge) {
//       this.pane.style.cursor = 'ew-resize';
//     } else if (this.onBottomEdge || this.onTopEdge) {
//       this.pane.style.cursor = 'ns-resize';
//     } else if (this.canMove()) {
//       this.pane.style.cursor = 'move';
//     } else {
//       this.pane.style.cursor = 'default';
//     }
//   }

//   @HostListener('document:mouseup', ['$event'])
//    onUp(e) {
//      //console.log("onUp");
//     this.calc(e);

//     if (this.clicked && this.clicked.isMoving) {
//       // Snap
//       var snapped = {
//         width: this.b.width,
//         height: this.b.height
//       };

//       if (this.b.top < this.FULLSCREEN_MARGINS || this.b.left < this.FULLSCREEN_MARGINS || this.b.right > window.innerWidth - this.FULLSCREEN_MARGINS || this.b.bottom > window.innerHeight - this.FULLSCREEN_MARGINS) {
//         // hintFull();
//         this.setBounds(this.pane, 0, 0, window.innerWidth, window.innerHeight);
//         this.preSnapped = snapped;
//       } else if (this.b.top < this.MARGINS) {
//         // hintTop();
//         this.setBounds(this.pane, 0, 0, window.innerWidth, window.innerHeight / 2);
//         this.preSnapped = snapped;
//       } else if (this.b.left < this.MARGINS) {
//         // hintLeft();
//         this.setBounds(this.pane, 0, 0, window.innerWidth / 2, window.innerHeight);
//         this.preSnapped = snapped;
//       } else if (this.b.right > this.rightScreenEdge) {
//         // hintRight();
//         this.setBounds(this.pane, window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
//         this.preSnapped = snapped;
//       } else if (this.b.bottom > this.bottomScreenEdge) {
//         // hintBottom();
//         this.setBounds(this.pane, 0, window.innerHeight / 2, window.innerWidth, window.innerWidth / 2);
//         this.preSnapped = snapped;
//       } else {
//         this.preSnapped = null;
//       }
//       this.hintHide();
//     }
//     this.clicked = null;
//   }
//  //==============================================================
}

