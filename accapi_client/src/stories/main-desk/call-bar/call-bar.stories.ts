import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { CallBarComponent } from './call-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChatBubbleComponent} from "../chat-bubble/chat-bubble.component";
import {ButtonMdComponent} from "../button/button-md.component";

export default {
  title: 'Design System/MainDesk/ChatMd',
  component: CallBarComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      declarations: [ChatBubbleComponent, ButtonMdComponent],
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




