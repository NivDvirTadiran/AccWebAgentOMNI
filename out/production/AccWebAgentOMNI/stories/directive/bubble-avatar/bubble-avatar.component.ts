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
import {ActionAvatarComponent} from "src/stories/actions/action-avatar/action-avatar.component";


@Component({
  selector: 'bubble-avatar',
    templateUrl: './bubble-avatar.component.html',
  styleUrls: ['./bubble-avatar.component.scss']
})
export class BubbleAvatarComponent implements OnInit, AfterViewInit{
  @Input() display: any;
  @Input() popover: any;
  @Input() bubbleOn?: boolean;
  @Input() header?: string;
  @Input()  options?: PopoverOptions;
  show: boolean = false;
  isDynamic: boolean = false;
  @ViewChild(DynamicCompDirective, {static: true}) content!: DynamicCompDirective;
  @Output() triggerDetectionChange: EventEmitter<void> = new EventEmitter<void> ();
  @Output() actionButton: EventEmitter<any> = new EventEmitter<any> ();
  actionAvatarComponentRef?: ComponentRef<any>;
  constructor() {

  }
  ngOnInit(): void {
    if (this.options && typeof this.options.content !== "string") {
      this.isDynamic = true;
      const viewContainerRef = this.content.viewContainerRef;
      viewContainerRef.clear();
      this.actionAvatarComponentRef = viewContainerRef.createComponent(ActionAvatarComponent);
      this.actionAvatarComponentRef.instance.setHeader(this.header);
      this.actionAvatarComponentRef.instance.setBubbleOn(this.bubbleOn);
      this.actionAvatarComponentRef.instance.actionButton.subscribe(($event: any) => {
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
    this.actionAvatarComponentRef?.instance.setHeader(this.header);
  }

  setBubbleOn(bubbleOn: boolean) {
    this.bubbleOn = bubbleOn;
  }

}
