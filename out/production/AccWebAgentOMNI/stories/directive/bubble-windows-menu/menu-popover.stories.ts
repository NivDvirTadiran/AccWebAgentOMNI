import {Story, Meta, componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import {CommonModule} from "@angular/common";
import {MenuPopoverDirective} from "./menu-popover.directive";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActionAvatarComponent} from "src/stories/actions/action-avatar/action-avatar.component";
import { PopoverOptions } from '../popover.interface';
import {BubbleWindowsMenuComponent} from "./bubble-windows-menu.component";
import {ActionWindowsMenuComponent} from "../../actions/action-windows-menu/action-windows-menu.component";



export default {
  title: 'Design System/Atoms/Directives/BubbleWindowsMenuDirective',
  component: BubbleWindowsMenuComponent, // (2) don't forget it
  decorators: [
    moduleMetadata({
      declarations: [ MenuPopoverDirective, ActionWindowsMenuComponent, BubbleWindowsMenuComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
    componentWrapperDecorator(story => `<div style="margin: 9em">${story}</div>`),
  ],
} as Meta;



const mPopover: PopoverOptions = {
  content: ActionWindowsMenuComponent
};

const Template: Story<MenuPopoverDirective> = (args) => ({
  props: args,
  moduleMetadata: { // (3) don't forget it
    declarations: [MenuPopoverDirective, ActionAvatarComponent, BubbleWindowsMenuComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule]
  },
  template: `<button [menuPopover] = "mPopover" > BubbleWindowsMenuComponent Example </button>`
});

export const Default = Template.bind({});
Default.args = {
  popover: mPopover,
};
