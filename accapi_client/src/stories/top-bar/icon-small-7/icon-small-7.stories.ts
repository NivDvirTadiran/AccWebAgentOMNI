import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmall7Component } from './icon-small-7.component';

export default {
  title: 'Design System/IconSmall7',
  component: IconSmall7Component,
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

const Template: Story<IconSmall7Component> = (args: IconSmall7Component) => ({
  props: args,
});

export const IconSmall7_Clean = Template.bind({});


