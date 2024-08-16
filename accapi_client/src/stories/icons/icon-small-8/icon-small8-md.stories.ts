import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmall8MdComponent } from './icon-small8-md.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconSmall8Md',
  component: IconSmall8MdComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconSmall8MdComponent> = (args: IconSmall8MdComponent) => ({
  props: args,
});

export const IconSmall8Md_Clean = Template.bind({});


