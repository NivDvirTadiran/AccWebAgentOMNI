import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { ChatBubbleComponent } from './chat-bubble.component';
import {IconLarge13MdComponent} from "../icon-large-13/icon-large13-md.component";

export default {
  title: 'Design System/ChatBubble',
  component: ChatBubbleComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [  ],
      imports: [CommonModule, IconLarge13MdComponent],
    }),
  ],
} as Meta;

const Template: Story<ChatBubbleComponent> = (args: ChatBubbleComponent) => ({
  props: args,
});

export const ChatBubble_Clean = Template.bind({});


