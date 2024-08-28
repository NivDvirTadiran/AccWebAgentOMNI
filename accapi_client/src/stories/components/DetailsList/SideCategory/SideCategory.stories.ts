import type { Meta, StoryObj } from "@storybook/angular";
import { SideCategory } from "./SideCategory.component";

const meta: Meta<SideCategory> = {
  title: "/SideCategory",
  component: SideCategory,
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<SideCategory>;

export const SideCategoryStory: Story = {
  render: (args) => ({
    components: { SideCategory },
    setup() {
      return { args };
    },
    template: '<SideCategory v-bind="args" />',
  }),
  args: {
    callHistory: "משתתפים בשיחה",
    participants: "22.44x22.44x4242168431",
    propMinWidth: "124px",
  },
};
