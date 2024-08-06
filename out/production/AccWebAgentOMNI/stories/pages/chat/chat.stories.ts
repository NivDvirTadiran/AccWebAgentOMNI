import { moduleMetadata, Story, Meta } from '@storybook/angular';
import  ChatComponent from './chat.component';
import {CommonModule} from "@angular/common";



export default {
  title: 'Design System/Atoms/Chat',
  component: ChatComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
    }),
  ],
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    backgroundA: [{ control: '#ff4785', title: 'Coral' }, { control: 'color' }, '#fe4a49'],
    backgroundB: { control: 'color' },
  },
} as Meta;

/*
export const Vee = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Vee.args = {
  primary: true,
  label: 'Button',
};*/



const Template: Story<ChatComponent> = (args: ChatComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  theme: "primary",
  label: 'Button7',
  //background: '-webkit-linear-gradient(330deg, #000, #f0a6ca)',
};
Primary.parameters = {
  backgrounds: {
    values: [
      { name: 'red', value: '#f00' },
      { name: 'green', value: '#0f0' },
      { name: 'blue', value: '#00f' },
    ],
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  theme: "secondary",
  label: 'Aeonic Chat',
  //backgroundColor: "linear-gradient(228.37deg, #EFF8FF 22.25%, #B0DCFF 88.18%)"
};

export const Managed = Template.bind({});
Managed.args = {
  theme: "managed",
  label: 'Button',
  background: "-webkit-linear-gradient(228.37deg, #EFF8FF 22.25%, ${backgroundA} 88.18%)",
  //backgroundA: '#B0DCFF',
  //backgroundB: '#3c617e',
};

export const LoggedOut = Template.bind({});


// More on interaction testing: https://storybook.js.org/docs/angular/writing-tests/interaction-testing
export const LoggedIn = Template.bind({});


