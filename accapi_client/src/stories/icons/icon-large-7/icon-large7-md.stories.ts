import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconLarge7MdComponent } from './icon-large7-md.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconLarge7Md',
  component: IconLarge7MdComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconLarge7MdComponent> = (args: IconLarge7MdComponent) => ({
  props: args,
});

export const IconLarge7Md_Clean = Template.bind({});

