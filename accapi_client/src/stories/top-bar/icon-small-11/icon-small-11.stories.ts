import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmall11Component } from './icon-small-11.component';

export default {
  title: 'Design System/IconSmall11',
  component: IconSmall11Component,
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

const Template: Story<IconSmall11Component> = (args: IconSmall11Component) => ({
  props: args,
});

export const IconSmall11_Clean = Template.bind({});


