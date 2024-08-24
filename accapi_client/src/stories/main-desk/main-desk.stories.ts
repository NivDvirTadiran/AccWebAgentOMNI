import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { MainDeskComponent } from './main-desk.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChatMdComponent} from "./chat/chat-md.component";
import {CallBarComponent} from "./call-bar/call-bar.component";
import {TypingBarReplyComponent} from "./typing-bar-reply/typing-bar-reply.component";
import {Frame136_Clean} from "../frames/frame-136/frame-136.stories";
import {ButtonComponent} from "../buttons/button/button.component";
import {SideMenuIconLarge38Component} from "../icons/side-menu-icon-large-38/side-menu-icon-large-38.component";
import {IconLarge10MdComponent} from "../icons/icon-large-10/icon-large10-md.component";
import {IconLarge4MdComponent} from "../icons/icon-large-4/icon-large4-md.component";
import {IconLarge1MdComponent} from "../icons/icon-large-1/icon-large1-md.component";
import {IconLarge2MdComponent} from "../icons/icon-large-2/icon-large2-md.component";
import {IconLargeT5MdComponent} from "../icons/icon-large-t-5/icon-large-t5-md.component";
import {IconLarge7MdComponent} from "../icons/icon-large-7/icon-large7-md.component";
import {Frame136Component} from "../frames/frame-136/frame-136.component";
import {ChatBubbleComponent} from "./chat-bubble/chat-bubble.component";
import {StatusLabelComponent} from "./status-label/status-label.component";
import {IconPage2MdComponent} from "../icons/icon-page-2/icon-page2-md.component";
import {IconLarge11MdComponent} from "../icons/icon-large-11/icon-large11-md.component";
import {IconSmall8MdComponent} from "../icons/icon-small-8/icon-small8-md.component";
import {SystemMessengeComponent} from "./system-messenge/system-messenge.component";


export default {
  title: 'Design System/MainDesk/MainDesk',
  component: MainDeskComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      declarations: [

        CallBarComponent,
        ChatBubbleComponent, ButtonComponent, StatusLabelComponent, IconPage2MdComponent,
        IconLarge11MdComponent, IconSmall8MdComponent,

        ChatMdComponent,
        ChatBubbleComponent, SystemMessengeComponent,

        TypingBarReplyComponent,
        ButtonComponent, SideMenuIconLarge38Component, IconLarge10MdComponent, IconLarge4MdComponent,
        IconLarge1MdComponent, IconLarge2MdComponent, IconLargeT5MdComponent, IconLarge7MdComponent,
        Frame136Component
      ],
      imports: [CommonModule, FormsModule],
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

