import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { TopBarComponent } from './top-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "./button/button.component";

export default {
  title: 'Design System/TopBar/TopBar',
  component: TopBarComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<TopBarComponent> = (args: TopBarComponent) => ({
  props: args,
});

export const TobBar_Clean = Template.bind({});
TobBar_Clean.args = {}

