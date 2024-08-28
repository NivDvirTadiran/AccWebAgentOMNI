import {Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { MenuListComponent } from "./menu-list.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MenuSectionComponent} from "../menu-section/menu-section.component";


const meta: Meta<MenuListComponent> = {
  title: "Design System/RightBar/Menulist",
  component: MenuListComponent,
  parameters: {layout: 'centered',},
  decorators: [
    moduleMetadata({
      declarations: [MenuSectionComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<MenuListComponent>;

export const MenulistStory: Story = {
  render: (args) => ({
    components: { Menulist: MenuListComponent },

    setup() {
      return { args };
    },
    props: args,
    //template: '<Menulist v-bind="args" />',
  }),
};
