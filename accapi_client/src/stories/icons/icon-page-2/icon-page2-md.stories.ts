import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconPage2MdComponent } from './icon-page2-md.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconPage2Md',
  component: IconPage2MdComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconPage2MdComponent> = (args: IconPage2MdComponent) => ({
  props: args,
});

export const IconPage2Md_Clean = Template.bind({});


