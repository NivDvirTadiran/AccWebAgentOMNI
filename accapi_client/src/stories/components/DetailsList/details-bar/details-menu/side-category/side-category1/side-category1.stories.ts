import {Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { SideCategory1Component } from "./side-category1.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const meta: Meta<SideCategory1Component> = {
  title: "Design System/DetailsBar/SideCategory1",
  component: SideCategory1Component,
  parameters: {layout: 'centered',},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<SideCategory1Component>;

export const SideCategory1Story: Story = {
  render: (args) => ({
    components: { SideCategory1: SideCategory1Component },
    setup() {
      return { args };
    },
    props: args,
  }),
  args: {
    prop: "משתתפים בשיחה",
    propMinWidth: "124px",
    iconLarge33: "false",
  },
};
