import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconLarge20MdComponent } from './icon-large20-md.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconLarge20Md',
  component: IconLarge20MdComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconLarge20MdComponent> = (args: IconLarge20MdComponent) => ({
  props: args,
});

export const IconLarge20Md_Clean = Template.bind({});


