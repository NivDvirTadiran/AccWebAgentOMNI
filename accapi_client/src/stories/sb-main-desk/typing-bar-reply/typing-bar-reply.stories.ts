import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';



import * as TypeBar from "./frame-136/type-bar/type-bar.stories";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "../../buttons/button/button.component";
import {SideMenuIconLarge38Component} from "../../icons/side-menu-icon-large-38/side-menu-icon-large-38.component";
import {IconLarge10MdComponent} from "../../icons/icon-large-10/icon-large10-md.component";
import {IconLarge4MdComponent} from "../../icons/icon-large-4/icon-large4-md.component";
import {IconLarge1MdComponent} from "../../icons/icon-large-1/icon-large1-md.component";
import {IconLarge2MdComponent} from "../../icons/icon-large-2/icon-large2-md.component";
import {IconLargeT5MdComponent} from "../../icons/icon-large-t-5/icon-large-t5-md.component";
import {IconLarge7MdComponent} from "../../icons/icon-large-7/icon-large7-md.component";
import {Frame136Component} from "./frame-136/frame-136.component";
import {TypingBarReplyComponent} from "./typing-bar-reply.component";


export default {
  title: 'Design System/MainDesk/TypingBarReply',
  component: TypingBarReplyComponent,
  parameters: {layout: 'centered'},
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent,
        SideMenuIconLarge38Component,
        IconLarge10MdComponent,
        IconLarge4MdComponent,
        IconLarge1MdComponent,
        IconLarge2MdComponent,
        IconLargeT5MdComponent,
        IconLarge7MdComponent,
        Frame136Component],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;



const typingBarReply = new FormGroup({
  message: new FormControl(''),
});


const Template: Story<TypingBarReplyComponent> = (args: TypingBarReplyComponent) => ({
  props: {
    ...args,
    onSaveChanges: TypeBar.actionsData.onSaveChanges,
    mForm: typingBarReply,
  },
});

export const TypingBarReply_Clean = Template.bind({});


