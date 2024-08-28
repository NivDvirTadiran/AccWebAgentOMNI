import type { Meta, StoryObj } from "@storybook/angular";

import { MenuSectionComponent } from "./menu-section.component";
import { moduleMetadata } from '@storybook/angular';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const meta: Meta<MenuSectionComponent> = {
  title: "/MenuSection",
  component: MenuSectionComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<MenuSectionComponent>;

export const MenuSectionStory: Story = {
  render: (args) => ({
    components: { MenuSectionComponent },

    setup() {
      return { args };
    },
    props: args,
  }),
  args: {
    propBorderRadius: "30px 20px 0px 0px",
    propBackgroundColor: "#fff",
    propBorderBottom: "1px solid #dff0ff",
    iconPage3: "assets/icon--page--6.svg",
    prop: "פניות בתור",
    propColor: "#43a5ff",
    propHeight: "",
    propDisplay: "",
  },
};

export const ProfileBar_Clean = MenuSectionStory;
