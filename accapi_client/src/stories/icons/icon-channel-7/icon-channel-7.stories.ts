import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconChannel7Component } from './icon-channel-7.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconChannel7',
  component: IconChannel7Component,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconChannel7Component> = (args: IconChannel7Component) => ({
  props: args,
});

export const IconChannel7_Clean = Template.bind({});

