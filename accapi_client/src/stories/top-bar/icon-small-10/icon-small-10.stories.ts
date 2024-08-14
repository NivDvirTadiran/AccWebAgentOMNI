import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmall10Component } from './icon-small-10.component';

export default {
  title: 'Design System/IconSmall10',
  component: IconSmall10Component,
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

const Template: Story<IconSmall10Component> = (args: IconSmall10Component) => ({
  props: args,
});

export const IconSmall10_Clean = Template.bind({});


