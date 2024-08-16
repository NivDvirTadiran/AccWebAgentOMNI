import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { SideMenuIconLarge38Component } from './side-menu-icon-large-38.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconLarge20MdComponent} from "../../icons/icon-large-20/icon-large20-md.component";


export default {
  title: 'Design System/icons/SideMenuIconLarge38',
  component: SideMenuIconLarge38Component,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [IconLarge20MdComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<SideMenuIconLarge38Component> = (args: SideMenuIconLarge38Component) => ({
  props: args,
});

export const SideMenuIconLarge38_Clean = Template.bind({});


