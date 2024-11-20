import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { TypeBarComponent } from './type-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconLarge9MdComponent} from "src/stories/icons/icon-large-9/icon-large9-md.component";
import {IconLarge7MdComponent} from "src/stories/icons/icon-large-7/icon-large7-md.component";
import {IconLarge6MdComponent} from "src/stories/icons/icon-large6-md/icon-large6-md.component";
import {action} from "@storybook/addon-actions";

export default {
  title: 'Design System/MainDesk/TypeBar',
  component: TypeBarComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [IconLarge9MdComponent, IconLarge7MdComponent, IconLarge6MdComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],

  excludeStories: /.*Data$/,
} as Meta;


export const actionsData = {
  onSaveChanges: action('onArchiveInput'),
};

const Template: Story<TypeBarComponent> = (args: TypeBarComponent) => ({
  props: args,
});

export const TypeBar_Clean = Template.bind({});


export const Message = Template.bind({});
Message.args = {
  //...Default.args,
  typeBar: {
    chatType: 'WebChat',
    inputType: 'main'
  },
};
