import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmall6Component } from './icon-small-6.component';

export default {
  title: 'Design System/IconSmall6',
  component: IconSmall6Component,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<IconSmall6Component> = (args: IconSmall6Component) => ({
  props: args,
});

export const IconSmall6_Clean = Template.bind({});


