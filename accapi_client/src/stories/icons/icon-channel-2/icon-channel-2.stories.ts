import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconChannel2Component } from './icon-channel-2.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconChannel2',
  component: IconChannel2Component,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconChannel2Component> = (args: IconChannel2Component) => ({
  props: args,
});

export const IconChannel2_Clean = Template.bind({});

