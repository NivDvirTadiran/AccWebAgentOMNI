import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { SedButtonComponent } from './sed-button.component';

export default {
  title: 'Design System/SedButton',
  component: SedButtonComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<SedButtonComponent> = (args: SedButtonComponent) => ({
  props: args,
});

export const SedButton_Clean = Template.bind({});


