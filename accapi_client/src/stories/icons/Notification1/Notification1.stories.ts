import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';



import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Notification1} from "./Notification1.component";

export default {
  title: 'Design System/icons/Notification1',
  component: Notification1,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<Notification1> = (args: Notification1) => ({
  props: args,
});

export const Notification1_Clean = Template.bind({});

