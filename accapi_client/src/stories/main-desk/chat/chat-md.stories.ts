import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { ChatMdComponent } from './chat-md.component';

export default {
  title: 'Design System/ChatMd',
  component: ChatMdComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ],
    }),
  ],
} as Meta;

const Template: Story<ChatMdComponent> = (args: ChatMdComponent) => ({
  props: args,
});

export const ChatMd_Clean = Template.bind({});


