import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmall16MdComponent } from './icon-small16-md.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconSmall16Md',
  component: IconSmall16MdComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconSmall16MdComponent> = (args: IconSmall16MdComponent) => ({
  props: args,
});

export const IconSmall16Md_Clean = Template.bind({});


