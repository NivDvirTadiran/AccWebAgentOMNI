import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CallListComponent} from "./call-list.component";
import {CallsFilterComponent} from "./calls-filter/calls-filter.component";
import {StatusLabelComponent} from "../.././sb-main-desk/call-bar/status-label/status-label.component";


export default {
  title: 'Design System/CallBar/CallList',
  component: CallListComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      declarations: [CallsFilterComponent, StatusLabelComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<CallListComponent> = (args: CallListComponent) => ({
  props: args,
});

export const CallList_Clean = Template.bind({});
CallList_Clean.args = {}

