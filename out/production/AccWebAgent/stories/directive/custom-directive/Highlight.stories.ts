import {Story, Meta, componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import {CommonModule} from "@angular/common";
import {HighlightDirective} from "./Highlight.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



export default {
  title: 'Design System/Atoms/Directives/Highlight',
  component: HighlightDirective, // (2) don't forget it
  decorators: [
    moduleMetadata({
      declarations: [ HighlightDirective],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
    componentWrapperDecorator(story => `<div style="margin: 3em">${story}</div>`),
  ],
} as Meta;

const Template: Story<HighlightDirective> = (args) => ({
  props: args,
  moduleMetadata: { // (3) don't forget it
    declarations: [HighlightDirective],
    imports: [CommonModule]
  },
  template: `<button highlight="blue" colorName="blue" > Highlight Button Example </button>`
});

export const Default = Template.bind({});
Default.args = {};
