import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmall33Component } from './icon-small-33.component';

export default {
  title: 'Design System/IconSmall33',
  component: IconSmall33Component,
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

const Template: Story<IconSmall33Component> = (args: IconSmall33Component) => ({
  props: args,
});

export const IconSmall33_Clean = Template.bind({});


