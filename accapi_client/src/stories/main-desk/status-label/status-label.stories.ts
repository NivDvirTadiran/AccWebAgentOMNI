import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { StatusLabelComponent } from './status-label.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


export default {
  title: 'Design System/MainDesk/StatusLabel',
  component: StatusLabelComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<StatusLabelComponent> = (args: StatusLabelComponent) => ({
  props: args,
});

export const StatusLabel_Clean = Template.bind({});


