import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import {
  statusLabel_block,
  statusLabel_close, statusLabel_new,
  statusLabel_open,
  statusLabel_timer,
  statusLabel_waiting,
  StatusLabelComponent
} from './status-label.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


export default {
  title: 'Design System/MainDesk/StatusLabel',
  component: StatusLabelComponent,
  parameters: {layout: 'centered',},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<StatusLabelComponent> = (args: StatusLabelComponent) => ({
  props: args,
});

export const New = Template.bind({});
New.args = {
  statusLabel: statusLabel_new,
  grayed: false
};

export const Open = Template.bind({});
Open.args = {
  statusLabel: statusLabel_open,
  grayed: false
};

export const Close = Template.bind({});
Close.args = {
  statusLabel: statusLabel_close,
  grayed: false
};

export const Timer = Template.bind({});
Timer.args = {
  statusLabel: statusLabel_timer,
  grayed: false
};

export const Waiting = Template.bind({});
Waiting.args = {
  statusLabel: statusLabel_waiting,
  grayed: false
};

export const Block = Template.bind({});
Block.args = {
  statusLabel: statusLabel_block,
  grayed: false
};


