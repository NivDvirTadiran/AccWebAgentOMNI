import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import Button from '../buttons/button-ex/button-ex.component';
import Header from '../header.component';
import { MainDeskComponent } from './main-desk.component';
import {ChatColumComponent} from "./chat-colum/chat-colum.component";

export default {
  title: 'Design System/MainDesk',
  component: MainDeskComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout

  },
  decorators: [
    moduleMetadata({
      declarations: [ChatColumComponent, Header],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<MainDeskComponent> = (args: MainDeskComponent) => ({
  props: args,
});

export const MainDesk_Clean = Template.bind({});


