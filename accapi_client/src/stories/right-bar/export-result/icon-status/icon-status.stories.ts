import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconStatusComponent } from './icon-status.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/RightBar/IconStatus',
  component: IconStatusComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconStatusComponent> = (args: IconStatusComponent) => ({
  props: args,
});

export const IconStatus_Clean = Template.bind({});
