// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { ActionWindowsMenuComponent } from './action-windows-menu.component';
import {componentWrapperDecorator, moduleMetadata} from "@storybook/angular";
import {Story, Meta} from "@storybook/angular/types-6-0";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BubbleWindowsMenuComponent} from "../../directive/bubble-windows-menu/bubble-windows-menu.component";
import {MenuPopoverDirective} from "../../directive/bubble-windows-menu/menu-popover.directive";
//import {TranslatePipe} from "../../../app/storybook/pipes/translate/translate.pipe";
//import {TranslateService} from "../../../app/storybook/pipes/translate/translate.service";

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Design System/Atoms/Action/WindowsMenuAction',
  component: ActionWindowsMenuComponent,
  decorators: [
    moduleMetadata({
      declarations: [BubbleWindowsMenuComponent, MenuPopoverDirective],
      imports: [CommonModule, ReactiveFormsModule],
    }),
    /*componentWrapperDecorator<ButtonContinueComponent>((story) => `<div class="container" style="height: 200px">${story}</div>`),*/
  ],
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<ActionWindowsMenuComponent> = (args: ActionWindowsMenuComponent) => ({
  props: args,
});

const Template2: Story<ActionWindowsMenuComponent> = (args: ActionWindowsMenuComponent) => ({
  props: args,
  /*template: '<storybook-button-tadiran ></storybook-button-tadiran>',*/

});



export const Default = Template2.bind({});
Default.args = {
  //gallery: true,
};

