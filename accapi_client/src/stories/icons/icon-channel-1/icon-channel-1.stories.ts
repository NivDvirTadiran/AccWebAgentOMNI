import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconChannel1Component } from './icon-channel-1.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconChannel1',
  component: IconChannel1Component,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconChannel1Component> = (args: IconChannel1Component) => ({
  props: args,
});

export const IconChannel1_Clean = Template.bind({});

