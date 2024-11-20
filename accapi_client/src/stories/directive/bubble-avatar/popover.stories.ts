import {Story, Meta, componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import {CommonModule} from "@angular/common";
import {PopoverDirective} from "./popover.directive";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActionAvatarComponent} from "src/stories/actions/action-avatar/action-avatar.component";
import { PopoverOptions } from '../popover.interface';
import {BubbleAvatarComponent} from "./bubble-avatar.component";
import {DynamicCompDirective} from "../dynamic-comp.directive";
import {HighlightDirective} from "../custom-directive/Highlight.directive";



export default {
  title: 'Design System/Atoms/Directives/BubbleAvatar',
  component: BubbleAvatarComponent, // (2) don't forget it
  parameters: {layout: 'centered',},
  decorators: [
    moduleMetadata({
      declarations: [ DynamicCompDirective, PopoverDirective, ActionAvatarComponent, BubbleAvatarComponent, HighlightDirective],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
    componentWrapperDecorator(story => `<div >${story}</div>`),
  ],
} as Meta;



const mPopover: PopoverOptions = {
  content: ActionAvatarComponent
};

const Template: Story<PopoverDirective> = (args) => ({
  props: args,
  moduleMetadata: { // (3) don't forget it
    declarations: [DynamicCompDirective, PopoverDirective, ActionAvatarComponent, BubbleAvatarComponent, HighlightDirective],
    imports: [CommonModule, FormsModule, ReactiveFormsModule]
  },
  template: `<button [twPopover] = "mPopover" > BubbleAvatar Example </button>`
});

export const Avatar = Template.bind({});
Avatar.args = {
  popover: mPopover,
  bubbleOn: true,
};
