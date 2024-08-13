import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { MainDeskComponent } from './main-desk.component';


export default {
  title: 'Design System/MainDesk',
  component: MainDeskComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout

  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<MainDeskComponent> = (args: MainDeskComponent) => ({
  props: args,
});

export const MainDesk_Clean = Template.bind({});


export const MainDesk_MAil = Template.bind({});
MainDesk_MAil.args = {}

