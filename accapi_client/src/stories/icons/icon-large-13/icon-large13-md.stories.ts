import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconLarge13MdComponent } from './icon-large13-md.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconLarge13Md',
  component: IconLarge13MdComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconLarge13MdComponent> = (args: IconLarge13MdComponent) => ({
  props: args,
});

export const IconLarge13Md_Clean = Template.bind({});


