import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';


import { SearchOptionComponent } from './search-option.component';
import {SearchBar_Clean} from "../search-bar/search-bar.stories";

export default {
  title: 'Design System/SearchOption',
  component: SearchOptionComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<SearchOptionComponent> = (args: SearchOptionComponent) => ({
  props: args,
});

export const SearchOption_Clean = Template.bind({});
SearchOption_Clean.args = {
  property1: "Variant2"
}

