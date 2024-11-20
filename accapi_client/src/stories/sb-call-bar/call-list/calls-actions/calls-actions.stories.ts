import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {StatusLabelComponent} from "../../../sb-main-desk/call-bar/status-label/status-label.component";
import {ButtonComponent} from "../../../buttons/button/button.component";
import {IconArrowsComponent} from "../../../right-bar/export-result/icon-arrows/icon-arrows.component";
import {IconSmall6Component} from "../../../icons/icon-small-6/icon-small-6.component";
import {CallsActionsComponent} from "./calls-actions.component";
import {DropDownSwitcherComponent} from "../calls-filter/drop-down-switcher/drop-down-switcher.component";



export default {
  title: 'Design System/CallBar/CallsAction',
  component: CallsActionsComponent,
  parameters: { layout: 'centered',},
  decorators: [
    moduleMetadata({
      declarations: [StatusLabelComponent, ButtonComponent, DropDownSwitcherComponent, IconArrowsComponent, IconSmall6Component],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<CallsActionsComponent> = (args: CallsActionsComponent) => ({
  props: args,
});

export const CallsAction_Clean = Template.bind({});
CallsAction_Clean.args = {
}

