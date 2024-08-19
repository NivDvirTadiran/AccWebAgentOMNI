import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmallNoteComponent } from './icon-small-note.component';
import {FormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconSmallNote',
  component: IconSmallNoteComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconSmallNoteComponent> = (args: IconSmallNoteComponent) => ({
  props: args,
});

export const IconSmallNote_Clean = Template.bind({});


