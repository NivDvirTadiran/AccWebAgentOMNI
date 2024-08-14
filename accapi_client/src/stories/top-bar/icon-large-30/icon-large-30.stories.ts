import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconLarge30Component } from './icon-large-30.component';

export default {
  title: 'Design System/IconLarge30',
  component: IconLarge30Component,
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

const Template: Story<IconLarge30Component> = (args: IconLarge30Component) => ({
  props: args,
});

export const IconLarge30_Clean = Template.bind({});


