import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconLarge2MdComponent } from './icon-large2-md.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconLarge2Md',
  component: IconLarge2MdComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconLarge2MdComponent> = (args: IconLarge2MdComponent) => ({
  props: args,
});

export const IconLarge2Md_Clean = Template.bind({});

