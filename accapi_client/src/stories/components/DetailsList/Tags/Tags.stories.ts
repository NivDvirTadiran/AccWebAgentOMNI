import type { Meta, StoryObj } from "@storybook/angular";
import { Tags } from "./Tags.component";

const meta: Meta<Tags> = {
  title: "/Tags",
  component: Tags,
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<Tags>;

export const TagsStory: Story = {
  render: (args) => ({
    components: { Tags },
    setup() {
      return { args };
    },
    template: '<Tags v-bind="args" />',
  }),
};
