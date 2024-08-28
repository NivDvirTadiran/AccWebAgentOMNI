import type { Meta, StoryObj } from "@storybook/angular";
import { SideMenuComponent } from "./side-menu.component";
import { moduleMetadata } from '@storybook/angular';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfileBarComponent} from "../profile-bar/profile-bar.component";
import {MenuListComponent} from "../menulist/menu-list.component";
import {MenuSectionComponent} from "../menu-section/menu-section.component";
import {FoldMenuComponent} from "../fold-menu/fold-menu.component";



const meta: Meta<MenuListComponent> = {
  title: "Design System/RightBar/SideMenu",
  component: SideMenuComponent,
  decorators: [
    moduleMetadata({
      declarations: [ProfileBarComponent, MenuListComponent, MenuSectionComponent, FoldMenuComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<SideMenuComponent>;

export const SideMenuStory: Story = {
  render: (args) => ({
    components: { SideMenuComponent },
    setup() {
      return { args };
    },
    props: args,
    //template: '<SideMenu v-bind="args" ></SideMenu>',
  }),
};


export const ProfileBar_Clean = SideMenuStory;
