import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonMdComponent} from "./button-md.component";

export default {
  title: 'Design System/buttons/ButtonMd',
  component: ButtonMdComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule ],
    }),
  ],
} as Meta;

const Template: Story<ButtonMdComponent> = (args: ButtonMdComponent) => ({
  props: {
    ...args,
  },
});

export const ButtonMdComponent_Clean = Template.bind({});
ButtonMdComponent_Clean.args = {
  active: "No",
  bold: "Yes",
  icon: "Yes",
  size: "small",
  purpose: "Default"
}




