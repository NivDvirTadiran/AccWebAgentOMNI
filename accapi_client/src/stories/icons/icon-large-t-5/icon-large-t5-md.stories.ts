import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconLargeT5MdComponent } from './icon-large-t5-md.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconLargeT5Md',
  component: IconLargeT5MdComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconLargeT5MdComponent> = (args: IconLargeT5MdComponent) => ({
  props: args,
});

export const IconLargeT5Md_Clean = Template.bind({});


