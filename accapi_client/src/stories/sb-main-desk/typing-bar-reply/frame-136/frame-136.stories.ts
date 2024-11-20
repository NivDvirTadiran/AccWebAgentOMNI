import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { Frame136Component } from './frame-136.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TypeBarComponent} from "./type-bar/type-bar.component";


export default {
  title: 'Design System/frames/Frame136',
  component: Frame136Component,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [TypeBarComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<Frame136Component> = (args: Frame136Component) => ({
  props: args,
});

export const Frame136_Clean = Template.bind({});
Frame136_Clean.args = {
  state: "Typing",
  mode: "Reply"
}

