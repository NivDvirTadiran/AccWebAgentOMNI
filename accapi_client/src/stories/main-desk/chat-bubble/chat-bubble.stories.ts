import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { ChatBubbleComponent } from './chat-bubble.component';
import {IconLarge13MdComponent} from "../icon-large-13/icon-large13-md.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/MainDesk/ChatBubble',
  component: ChatBubbleComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [ IconLarge13MdComponent ],
      imports: [CommonModule,  FormsModule, ReactiveFormsModule ],
    }),
  ],
} as Meta;

const Template: Story<ChatBubbleComponent> = (args: ChatBubbleComponent) => ({
  props: args,
});

export const ChatBubble_Clean = Template.bind({});


