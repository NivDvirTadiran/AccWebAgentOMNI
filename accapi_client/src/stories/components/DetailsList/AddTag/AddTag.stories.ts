import type { Meta, StoryObj } from "@storybook/angular";
import { AddTag } from "./ButtonAddTag.component";

const meta: Meta<AddTag> = {
  title: "/AddTag",
  component: AddTag,
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<AddTag>;

export const AddTagStory: Story = {
  render: (args) => ({
    components: { AddTag },
    setup() {
      return { args };
    },
    template: '<AddTag v-bind="args" />',
  }),
};
