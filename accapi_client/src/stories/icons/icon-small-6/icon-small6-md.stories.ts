import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmall6MdComponent } from './icon-small6-md.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconSmall6Md',
  component: IconSmall6MdComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconSmall6MdComponent> = (args: IconSmall6MdComponent) => ({
  props: args,
});

export const IconSmall6Md_Clean = Template.bind({});


