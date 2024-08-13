import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { TypingBarReplyComponent } from './typing-bar-reply.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonMdComponent} from "../button/button-md.component";

export default {
  title: 'Design System/MainDesk/TypingBarReply',
  component: TypingBarReplyComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [ButtonMdComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<TypingBarReplyComponent> = (args: TypingBarReplyComponent) => ({
  props: args,
});

export const TypingBarReply_Clean = Template.bind({});


