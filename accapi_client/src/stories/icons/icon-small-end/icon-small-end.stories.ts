import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconSmallEndComponent } from './icon-small-end.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


export default {
  title: 'Design System/icons/IconSmallEnd',
  component: IconSmallEndComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconSmallEndComponent> = (args: IconSmallEndComponent) => ({
  props: args,
});

export const IconSmallEnd_Clean = Template.bind({});


