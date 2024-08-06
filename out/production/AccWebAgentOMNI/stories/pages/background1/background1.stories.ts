import { moduleMetadata, Story, Meta } from '@storybook/angular';
import  Background1Component from './background1Component';
import {CommonModule} from "@angular/common";



export default {
  title: 'Design System/Atoms/Background1',
  component: Background1Component,
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
  },
} as Meta;

/*
export const Vee = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Vee.args = {
  primary: true,
  label: 'Button',
};*/



const Template: Story<Background1Component> = (args: Background1Component) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button7',
  backgroundColor: '#ff0',
  background: 'linear-gradient(228.37deg, #EFF8FF 22.25%, #B0DCFF 88.18%)',
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
  label: 'Button',
  backgroundColor: '#ff0',
};


export const LoggedOut = Template.bind({});


// More on interaction testing: https://storybook.js.org/docs/angular/writing-tests/interaction-testing
export const LoggedIn = Template.bind({});


