import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmallChatComponent } from './icon-small-chat.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


export default {
  title: 'Design System/icons/IconSmallchat',
  component: IconSmallChatComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconSmallChatComponent> = (args: IconSmallChatComponent) => ({
  props: args,
});

export const IconSmallChat_Clean = Template.bind({});


