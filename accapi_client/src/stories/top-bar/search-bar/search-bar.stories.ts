import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "../../buttons/button/button.component";
import {SearchBarComponent} from "./search-bar.component";

export default {
  title: 'Design System/TopBar/SearchBar',
  component: SearchBarComponent,
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

const Template: Story<SearchBarComponent> = (args: SearchBarComponent) => ({
  props: args,
});

export const SearchBar_Clean = Template.bind({});
SearchBar_Clean.args = {
  property1: "Variant5"
}

