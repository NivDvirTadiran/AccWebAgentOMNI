import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { Frame465Component } from './frame-465.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SideMenuComponent} from "../../right-bar/export-result/side-menu/side-menu.component";


export default {
  title: 'Design System/frames/Frame465',
  component: Frame465Component,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [SideMenuComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<Frame465Component> = (args: Frame465Component) => ({
  props: args,
});

export const Frame465_Clean = Template.bind({});
Frame465_Clean.args = {
  state: "Typing",
  mode: "Reply"
}

