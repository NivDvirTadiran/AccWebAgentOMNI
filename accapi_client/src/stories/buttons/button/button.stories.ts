import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "./button.component";
import {IconSmall6Component} from "../../icons/icon-small-6/icon-small-6.component";
import {IconSmall16Component} from "../../icons/icon-small-16/icon-small-16.component";

export default {
  title: 'Design System/buttons/Button',
  component: ButtonComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      declarations: [IconSmall6Component, IconSmall16Component],
      imports: [CommonModule, FormsModule, ReactiveFormsModule ],
    }),
  ],
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
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




