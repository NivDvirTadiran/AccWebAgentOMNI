import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconLarge17Component } from './icon-large-17.component';

export default {
  title: 'Design System/icons/IconLarge17',
  component: IconLarge17Component,
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

const Template: Story<IconLarge17Component> = (args: IconLarge17Component) => ({
  props: args,
});

export const IconLarge17_Clean = Template.bind({});


