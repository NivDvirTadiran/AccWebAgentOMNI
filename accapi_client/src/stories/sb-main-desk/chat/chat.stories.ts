import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { ChatComponent } from './chat.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BubbleComponent} from "./bubble/bubble.component";
import {SystemMessengeComponent} from "../system-messenge/system-messenge.component";

export default {
  title: 'Design System/MainDesk/ChatMd',
  component: ChatComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      declarations: [BubbleComponent, SystemMessengeComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule ],
    }),
  ],
} as Meta;

const Template: Story<ChatComponent> = (args: ChatComponent) => ({
  props: {
    ...args,
  },
});

export const ChatMd_Clean = Template.bind({});
ChatMd_Clean.args = {
    type: "chat",
    wight: "normal"
}




