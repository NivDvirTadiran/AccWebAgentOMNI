import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconLarge6MdComponent } from './icon-large6-md.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconLarge6Md',
  component: IconLarge6MdComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconLarge6MdComponent> = (args: IconLarge6MdComponent) => ({
  props: args,
});

export const IconLarge6Md_Clean = Template.bind({});

