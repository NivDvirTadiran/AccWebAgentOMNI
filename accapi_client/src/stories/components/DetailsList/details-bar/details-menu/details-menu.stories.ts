import {Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { DetailsMenuComponent } from "./details-menu.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SideCategoryComponent} from "./side-category/side-category.component";
import {SideCategory1Component} from "./side-category/side-category1/side-category1.component";

const meta: Meta<DetailsMenuComponent> = {
  title: "Design System/DetailsBar/DetailsMenu",
  component: DetailsMenuComponent,
  parameters: {layout: 'centered',},
  decorators: [
    moduleMetadata({
      declarations: [SideCategoryComponent, SideCategory1Component],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<DetailsMenuComponent>;

export const DetailsMenuStory: Story = {
  render: (args) => ({
    components: { DetailsMenu: DetailsMenuComponent },
    setup() {
      return { args };
    },
    props: args,
  }),
  args: {},
};
