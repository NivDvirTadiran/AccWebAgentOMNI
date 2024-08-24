import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmallNoteComponent } from './icon-small-note.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


export default {
  title: 'Design System/icons/IconSmallNote',
  component: IconSmallNoteComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconSmallNoteComponent> = (args: IconSmallNoteComponent) => ({
  props: args,
});

export const IconSmallNote_Clean = Template.bind({});


