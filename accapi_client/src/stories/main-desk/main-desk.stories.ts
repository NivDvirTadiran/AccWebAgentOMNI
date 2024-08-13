import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { MainDeskComponent } from './main-desk.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChatMdComponent} from "./chat/chat-md.component";
import {CallBarComponent} from "./call-bar/call-bar.component";
import {TypingBarReplyComponent} from "./typing-bar-reply/typing-bar-reply.component";
import {Frame136_Clean} from "./frame-136/frame-136.stories";


export default {
  title: 'Design System/MainDesk/MainDesk',
  component: MainDeskComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      declarations: [CallBarComponent, ChatMdComponent, TypingBarReplyComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<MainDeskComponent> = (args: MainDeskComponent) => ({
  props: args,
});

export const MainDesk_Clean = Template.bind({});
MainDesk_Clean.args = {
  mode: "Reply"
}

