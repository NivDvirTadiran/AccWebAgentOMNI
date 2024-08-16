import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmall32Component } from './icon-small-32.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


export default {
  title: 'Design System/icons/IconSmall32',
  component: IconSmall32Component,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconSmall32Component> = (args: IconSmall32Component) => ({
  props: args,
});

export const IconSmall32_Clean = Template.bind({});


