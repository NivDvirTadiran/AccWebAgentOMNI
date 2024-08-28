import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { RightBarComponent } from './right-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SideMenuComponent} from "./export-result/side-menu/side-menu.component";
import {ProfileBarComponent} from "./export-result/profile-bar/profile-bar.component";
import {MenuListComponent} from "./export-result/menulist/menu-list.component";
import {MenuSectionComponent} from "./export-result/menu-section/menu-section.component";
import {FoldMenuComponent} from "./export-result/fold-menu/fold-menu.component";


export default {
  title: 'Design System/RightBar/RightBar',
  component: RightBarComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      declarations: [SideMenuComponent, ProfileBarComponent, MenuListComponent, MenuSectionComponent, FoldMenuComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<RightBarComponent> = (args: RightBarComponent) => ({
  props: args,
});

export const TobBar_Clean = Template.bind({});
TobBar_Clean.args = {}

