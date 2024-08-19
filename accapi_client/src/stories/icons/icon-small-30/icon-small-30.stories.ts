import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmall30Component } from './icon-small-30.component';

export default {
  title: 'Design System/icons/IconSmall30',
  component: IconSmall30Component,
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

const Template: Story<IconSmall30Component> = (args: IconSmall30Component) => ({
  props: args,
});

export const IconSmall30_Clean = Template.bind({});


