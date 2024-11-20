import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SystemMessengeComponent} from "./system-messenge.component";


export default {
  title: 'Design System/MainDesk/SystemMessenge',
  component: SystemMessengeComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<SystemMessengeComponent> = (args: SystemMessengeComponent) => ({
  props: args,
});

export const SystemMessenge_Clean = Template.bind({});
SystemMessenge_Clean.args = {
  property1: "Default"
}

