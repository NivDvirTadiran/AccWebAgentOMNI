import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconPage7MdComponent } from './icon-page7-md.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconPage7Md',
  component: IconPage7MdComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconPage7MdComponent> = (args: IconPage7MdComponent) => ({
  props: args,
});

export const IconPage7Md_Clean = Template.bind({});


