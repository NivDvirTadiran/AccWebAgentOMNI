import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { IconArrowsComponent } from './icon-arrows.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/IconArrows',
  component: IconArrowsComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<IconArrowsComponent> = (args: IconArrowsComponent) => ({
  props: args,
});

export const IconArrows_Clean = Template.bind({});
