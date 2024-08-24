import {Story, Meta, componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import {CommonModule} from "@angular/common";
import {PopoverMdbDropdownDirective} from "./popover-mdb-dropdown.directive";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MdbDropdownDirective} from "mdb-angular-ui-kit/dropdown";
import { PopoverOptions } from '../popover.interface';




export default {
  title: 'Design System/Atoms/Directives/MdbDropdownCopyDirective',
  component: PopoverMdbDropdownDirective, // (2) don't forget it
  decorators: [
    moduleMetadata({
      declarations: [ MdbDropdownDirective],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
    componentWrapperDecorator(story => `<div style="margin: 9em">${story}</div>`),
  ],
} as Meta;



const mPopover: PopoverOptions = {
  content: MdbDropdownDirective
};

const Template: Story<PopoverMdbDropdownDirective> = (args) => ({
  props: args,
  moduleMetadata: { // (3) don't forget it
    declarations: [],
    imports: [CommonModule, FormsModule, ReactiveFormsModule]
  },
  template: `<button [twPopover] = "mPopover" > BubbleAvatarDirective Example </button>`
});

export const Default = Template.bind({});
Default.args = {
  popover: mPopover,
};
