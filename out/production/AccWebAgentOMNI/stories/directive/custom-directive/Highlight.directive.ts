import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective {
  constructor(private eleRef: ElementRef) {}

  @Input() highlight: any;
  @Input() colorName: any;


  @HostListener('mouseover') onMouseOver() {
    this.eleRef.nativeElement.style.color = this.colorName;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.eleRef.nativeElement.style.color = 'black';
  }
}
