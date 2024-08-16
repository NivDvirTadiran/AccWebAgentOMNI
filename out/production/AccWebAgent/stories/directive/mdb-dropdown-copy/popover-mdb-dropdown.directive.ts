import {
  ChangeDetectorRef,

  Directive,
  ElementRef, EventEmitter, Input, ViewContainerRef,
} from '@angular/core';
import {MdbDropdownDirective} from "mdb-angular-ui-kit/dropdown";
import {OverlayPositionBuilder, Overlay} from "@angular/cdk/overlay";
import {BreakpointObserver} from "@angular/cdk/layout";


@Directive({
  selector: '[popover-mdb-dropdown]',
})
export class PopoverMdbDropdownDirective extends MdbDropdownDirective {
  //@Input("popover-mdb-dropdown") popoverMdbDropdownDirective?: PopoverMdbDropdownDirective;

  constructor(_overlay: Overlay,
              _overlayPositionBuilder: OverlayPositionBuilder,
              _elementRef: ElementRef,
              _vcr: ViewContainerRef,
              _breakpointObserver: BreakpointObserver,
              _cdRef: ChangeDetectorRef,
              el: ElementRef) {
    super(_overlay, _overlayPositionBuilder, _elementRef, _vcr, _breakpointObserver, _cdRef);
  }

}
