import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { ChatBubbleComponent } from './chat-bubble.component';
import {IconLarge13MdComponent} from "../../icons/icon-large-13/icon-large13-md.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconPage7MdComponent} from "../../icons/icon-page-7/icon-page7-md.component";
import {IconSmall32Component} from "../../icons/icon-small-32/icon-small-32.component";

export default {
  title: 'Design System/MainDesk/ChatBubble',
  component: ChatBubbleComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [ IconLarge13MdComponent, IconPage7MdComponent, IconSmall32Component ],
      imports: [CommonModule,  FormsModule, ReactiveFormsModule ],
    }),
  ],
} as Meta;

const Template: Story<ChatBubbleComponent> = (args: ChatBubbleComponent) => ({
  props: args,
});

export const ChatBubble_Clean = Template.bind({});


