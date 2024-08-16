import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef, EventEmitter,
  HostListener,
  Input, Output,
  ViewContainerRef
} from '@angular/core';
import { PopoverOptions } from '../popover.interface';
import {BubbleWindowsMenuComponent} from "./bubble-windows-menu.component";
import {AccAgentService} from "../../../app/AccAgent/acc-agent.service";

@Directive({
  selector: '[menuPopover]',
})
export class MenuPopoverDirective {
  @Input("menuPopover") popover?: PopoverOptions;

  popoverComponentRef?: ComponentRef<BubbleWindowsMenuComponent>;
  @HostListener('mouseover', ['$event']) onMouseOver($event: any){
    this.popoverComponentRef?.instance.setHeader(this.header);
    this.popoverComponentRef?.instance.setBubbleOn(this.bubbleOn);
    this.popoverComponentRef?.instance.showPopup();
    //this.eleRef.nativeElement.style.color = 'blue';
  }

  @HostListener('mouseleave', ['$event']) onLeave($event: any){
    this.popoverComponentRef?.instance.hidePopup();
  }

  @HostListener('click', ['$event']) onClick($event: any){
    this.popoverComponentRef?.instance.setHeader(this.header);
    this.popoverComponentRef?.instance.setBubbleOn(this.bubbleOn);
    this.popoverComponentRef?.instance.showPopup();
  }




  constructor(private eleRef: ElementRef,
              private el: ElementRef,
              private viewContainer: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {}

  @Input() highlight: any;
  @Input() header: string = '';
  @Input() bubbleOn: boolean = true;
  @Input() AAC: AccAgentService;

  @Output() actionButton: EventEmitter<any> = new EventEmitter<any> ();
  @Output() avatarButton: EventEmitter<any> = new EventEmitter<any> ();


/*
  @HostListener('mouseover') onMouseOver() {
    this.popoverComponentRef?.instance.showPopup();
    this.eleRef.nativeElement.style.color = this.colorName;
  }
*/

  ngOnInit(): void {
    const factory =  this.componentFactoryResolver.resolveComponentFactory(BubbleWindowsMenuComponent);

    const comp = factory.create(this.viewContainer.injector);
    comp.instance.display = "I test some content";
    comp.instance.popover = this.popover?.content;
    comp.instance.options = this.popover;
    comp.instance.header = this.header;
    comp.instance.bubbleOn = this.bubbleOn;
    comp.instance.AAC = this.AAC;



    this.popoverComponentRef = comp;
    this.el.nativeElement.classList.add("wrapper");
    this.el.nativeElement.appendChild(comp.location.nativeElement);
    this.el.nativeElement.style.position = 'relative';

    comp.hostView.detectChanges();

    comp.instance.triggerDetectionChange.subscribe(() =>  {
      comp.hostView.detectChanges();
    });

    comp.instance.actionButton.subscribe(($event: any) => {
      this.actionButton.emit($event);
    });
  }

}
