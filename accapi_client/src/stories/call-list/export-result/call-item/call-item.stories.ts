import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CallItemComponent} from "./call-item.component";
import {StatusLabelComponent} from "../../../main-desk/status-label/status-label.component";


export default {
  title: 'Design System/CallBar/CallItem',
  component: CallItemComponent,
  parameters: { layout: 'centered',},
  decorators: [
    moduleMetadata({
      declarations: [StatusLabelComponent, CallItemComponent],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<CallItemComponent> = (args: CallItemComponent) => ({
  props: args,
});

export const CallItem_Clean = Template.bind({});
CallItem_Clean.args = {
  checkbox: "No",
  flag: "No",
  notification: "flag hover",
  state: "Hover",

}

