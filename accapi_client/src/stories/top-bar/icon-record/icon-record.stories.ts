import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconRecordComponent } from './icon-record.component';

export default {
  title: 'Design System/IconRecord',
  component: IconRecordComponent,
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
} as Meta;

const Template: Story<IconRecordComponent> = (args: IconRecordComponent) => ({
  props: args,
});

export const IconRecord_Clean = Template.bind({});


