import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicComp]'
})
export class DynamicCompDirective {

  constructor(public viewContainerRef: ViewContainerRef) {}

}
