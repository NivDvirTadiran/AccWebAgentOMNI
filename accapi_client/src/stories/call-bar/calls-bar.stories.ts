import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CallsBarComponent} from "./calls-bar.component";
import {CallListComponent} from "../call-list/call-list.component";


export default {
  title: 'Design System/CallBar/CallBar',
  component: CallsBarComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      declarations: [CallListComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<CallsBarComponent> = (args: CallsBarComponent) => ({
  props: args,
});

export const TobBar_Clean = Template.bind({});
TobBar_Clean.args = {}

