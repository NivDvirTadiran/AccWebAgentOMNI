import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { FoldMenuComponent } from './fold-menu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/icons/FoldMenu',
  component: FoldMenuComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<FoldMenuComponent> = (args: FoldMenuComponent) => ({
  props: args,
});

export const IconPage6_Clean = Template.bind({});
