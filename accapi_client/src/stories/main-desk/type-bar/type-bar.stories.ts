import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { TypeBarComponent } from './type-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export default {
  title: 'Design System/MainDesk/TypeBar',
  component: TypeBarComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<TypeBarComponent> = (args: TypeBarComponent) => ({
  props: args,
});

export const TypeBar_Clean = Template.bind({});


