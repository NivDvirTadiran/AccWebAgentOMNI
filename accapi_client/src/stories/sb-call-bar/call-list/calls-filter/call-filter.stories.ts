import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {StatusLabelComponent} from "../../.././sb-main-desk/call-bar/status-label/status-label.component";
import {CallsFilterComponent} from "./calls-filter.component";
import {ButtonComponent} from "../../../buttons/button/button.component";
import {DropDownSwitcherComponent} from "./drop-down-switcher/drop-down-switcher.component";
import {IconArrowsComponent} from "../../../right-bar/export-result/icon-arrows/icon-arrows.component";
import {IconSmall6Component} from "../../../icons/icon-small-6/icon-small-6.component";



export default {
  title: 'Design System/CallBar/CallsFilter',
  component: CallsFilterComponent,
  parameters: { layout: 'centered',},
  decorators: [
    moduleMetadata({
      declarations: [StatusLabelComponent, ButtonComponent, DropDownSwitcherComponent, IconArrowsComponent, IconSmall6Component],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<CallsFilterComponent> = (args: CallsFilterComponent) => ({
  props: args,
});

export const CallsFilter_Clean = Template.bind({});
CallsFilter_Clean.args = {
}

