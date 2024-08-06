import {
  Component,
  Input,
  ViewChild,
  OnInit,
  AfterViewInit,
  ComponentFactoryResolver,
  ChangeDetectionStrategy,
  ApplicationRef,
  Output,
  EventEmitter,
  Type, ComponentRef
} from '@angular/core';
import { DynamicCompDirective } from '../dynamic-comp.directive';
import { PopoverOptions } from '../popover.interface'
import {ActionWindowsMenuComponent} from "src/stories/actions/action-windows-menu/action-windows-menu.component";
import {AccAgentService} from "../../../app/AccAgent/acc-agent.service";


@Component({
  selector: 'bubble-windows-menu',
    templateUrl: './bubble-windows-menu.component.html',
  styleUrls: ['./bubble-windows-menu.component.scss']
})
export class BubbleWindowsMenuComponent implements OnInit, AfterViewInit{
  @Input() display: any;
  @Input() popover: any;
  @Input() bubbleOn?: boolean;
  @Input() AAC?: AccAgentService;
  @Input() header?: string;
  @Input()  options?: PopoverOptions;
  show: boolean = false;
  isDynamic: boolean = false;
  @ViewChild(DynamicCompDirective, {static: true}) content!: DynamicCompDirective;
  @Output() triggerDetectionChange: EventEmitter<void> = new EventEmitter<void> ();
  @Output() actionButton: EventEmitter<any> = new EventEmitter<any> ();
  actionBubbleMenuComponentRef?: ComponentRef<any>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }
  ngOnInit(): void {
    if (this.options && typeof this.options.content !== "string") {
      this.isDynamic = true;
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(<Type<any>>this.options.content);
      const viewContainerRef = this.content.viewContainerRef;
      viewContainerRef.clear();
      this.actionBubbleMenuComponentRef = viewContainerRef.createComponent(componentFactory);
      this.actionBubbleMenuComponentRef.instance.setHeader(this.header);
      this.actionBubbleMenuComponentRef.instance.setBubbleOn(this.bubbleOn);
      this.actionBubbleMenuComponentRef.instance.setAAC(this.AAC);
      this.actionBubbleMenuComponentRef.instance.actionButton.subscribe(($event: any) => {
        this.actionButton.emit($event);
        console.log("Click: Change it now");
      });
    }
  }
  ngAfterViewInit(): void {}

  showPopup() {
    if (this.bubbleOn) {
      this.show = true;
      this.triggerDetectionChange.emit();
    }
  }

  hidePopup() {
    this.show = false;
    this.triggerDetectionChange.emit();
  }

  setHeader(header: string) {
    this.header = header;
    this.actionBubbleMenuComponentRef?.instance.setHeader(this.header);
  }

  setBubbleOn(bubbleOn: boolean) {
    this.bubbleOn = bubbleOn;
  }

  loadCarComponent(){
    const _viewContainerRef = this.content.viewContainerRef;

    //removes all views in that container
    _viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(<Type<any>>this.options?.content);

    //Create an instance of the component
    const carComponentRef = _viewContainerRef.createComponent<ActionWindowsMenuComponent>(componentFactory);
/*
    //Pass data to the component
    carComponentRef.instance.image = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
*/
  }
}
