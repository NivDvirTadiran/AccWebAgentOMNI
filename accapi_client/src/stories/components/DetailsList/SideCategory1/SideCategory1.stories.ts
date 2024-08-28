import type { Meta, StoryObj } from "@storybook/angular";
import { SideCategory1 } from "./SideCategory1.component";

const meta: Meta<SideCategory1> = {
  title: "/SideCategory1",
  component: SideCategory1,
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<SideCategory1>;

export const SideCategory1Story: Story = {
  render: (args) => ({
    components: { SideCategory1 },
    setup() {
      return { args };
    },
    template: '<SideCategory1 v-bind="args" />',
  }),
  args: {
    prop: "משתתפים בשיחה",
    propMinWidth: "124px",
    iconLarge33: "false",
  },
};
