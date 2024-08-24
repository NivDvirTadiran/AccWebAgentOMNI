import {moduleMetadata, Story, Meta, Args} from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { CallBarComponent } from './call-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChatBubbleComponent} from "../chat-bubble/chat-bubble.component";
import {ButtonComponent} from "../../buttons/button/button.component";
import {StatusLabelComponent} from "../status-label/status-label.component";
import {IconPage2MdComponent} from "../../icons/icon-page-2/icon-page2-md.component";
import {IconLarge11MdComponent} from "../../icons/icon-large-11/icon-large11-md.component";
import {IconSmall8MdComponent} from "../../icons/icon-small-8/icon-small8-md.component";

import {
  statusLabel_block,
  statusLabel_close,
  statusLabel_open,
  statusLabel_timer
} from "../status-label/status-label.component";

export default {
  title: 'Design System/MainDesk/CallBar',
  component: CallBarComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      declarations: [
          ChatBubbleComponent, ButtonComponent, StatusLabelComponent, IconPage2MdComponent,
        IconLarge11MdComponent, IconSmall8MdComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule ],
    }),
  ],
} as Meta;





const Template: Story<CallBarComponent> = (args: CallBarComponent) => ({
  props: {
    ...args,
  },
});

export const CallBar_Clean = Template.bind({});
CallBar_Clean.args = {
    goal: "Chat",
    option: "2"
}




