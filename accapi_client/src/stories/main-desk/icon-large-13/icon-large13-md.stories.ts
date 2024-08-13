import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconLarge13MdComponent } from './icon-large13-md.component';

export default {
  title: 'Design System/IconLarge13',
  component: IconLarge13MdComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<IconLarge13MdComponent> = (args: IconLarge13MdComponent) => ({
  props: args,
});

export const ChatBubble_Clean = Template.bind({});


