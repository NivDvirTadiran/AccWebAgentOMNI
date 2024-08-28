import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CallListComponent} from "./call-list.component";
import {CallsFilterComponent} from "./export-result/calls-filter/calls-filter.component";
import {Frame460Component} from "./export-result/frame-460/frame-460.component";
import {CallItemComponent} from "./export-result/call-item/call-item.component";
import {StatusLabelComponent} from "../main-desk/status-label/status-label.component";


export default {
  title: 'Design System/CallBar/CallList',
  component: CallListComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      declarations: [CallsFilterComponent, Frame460Component, StatusLabelComponent, CallItemComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<CallListComponent> = (args: CallListComponent) => ({
  props: args,
});

export const CallList_Clean = Template.bind({});
CallList_Clean.args = {}

