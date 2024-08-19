import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmall12Component } from './icon-small-12.component';

export default {
  title: 'Design System/icons/IconSmall12',
  component: IconSmall12Component,
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

const Template: Story<IconSmall12Component> = (args: IconSmall12Component) => ({
  props: args,
});

export const IconSmall12_Clean = Template.bind({});


