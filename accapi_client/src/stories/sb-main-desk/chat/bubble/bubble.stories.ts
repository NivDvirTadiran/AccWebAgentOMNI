import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { BubbleComponent } from './bubble.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {BubbleModel} from "./bubble.model";
import {IconLarge13MdComponent} from "../../../icons/icon-large-13/icon-large13-md.component";
import {IconPage7MdComponent} from "../../../icons/icon-page-7/icon-page7-md.component";
import {IconSmall32Component} from "../../../icons/icon-small-32/icon-small-32.component";

export default {
  title: 'Design System/MainDesk/ChatBubble',
  component: BubbleComponent,
  parameters: { layout: 'centered', },
  decorators: [
    moduleMetadata({
      declarations: [ IconLarge13MdComponent, IconPage7MdComponent, IconSmall32Component ],
      imports: [CommonModule,  FormsModule, ReactiveFormsModule ],
    }),
  ],
} as Meta;

const chatBubbleAgent: BubbleModel = {msgId: 1, participant: "Agent", checkMark: "Timer", message: "זו הודעה מסוכן", date: new Date(Date.now())};
const chatBubbleCustomer: BubbleModel = {msgId: 2, participant: "Customer", checkMark: "Timer", message: "זו הודעה מלקוח", date: new Date(Date.now())};
const chatBubbleBot: BubbleModel = {msgId: 3, participant: "Bot", checkMark: "Timer", message: "זו הודעה מרובוט", date: new Date(Date.now())};

const Template: Story<BubbleComponent> = args => ({
  props: {
    ...args,
    property1: null,
    chatBubbleModel: null,
  },
});

export const Default = Template.bind({});
Default.args = {
  chatBubbleModel: chatBubbleAgent
};

export const Agent = Template.bind({});
Agent.args = {
  chatBubble: chatBubbleAgent
}


export const Customer = Template.bind({});
Customer.args = {
  chatBubble: chatBubbleCustomer
}

export const Bot = Template.bind({});
Bot.args = {
  chatBubble: chatBubbleBot
}


export const BotButton = Template.bind({});
BotButton.args = {
  property1: 'bot + button'
}


