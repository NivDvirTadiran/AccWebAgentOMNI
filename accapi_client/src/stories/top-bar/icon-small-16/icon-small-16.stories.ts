import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmall16Component } from './icon-small-16.component';

export default {
  title: 'Design System/IconSmall16',
  component: IconSmall16Component,
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

const Template: Story<IconSmall16Component> = (args: IconSmall16Component) => ({
  props: args,
});

export const IconSmall16_Clean = Template.bind({});


