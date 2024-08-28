import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconCheckboxComponent } from './icon-checkbox.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconCheckbox',
  component: IconCheckboxComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconCheckboxComponent> = (args: IconCheckboxComponent) => ({
  props: args,
});

export const IconCheckbox_Clean = Template.bind({});

