import type { Meta, StoryObj } from "@storybook/angular";
import { CallsListNew } from "./CallsListNew.component";
import { moduleMetadata } from '@storybook/angular';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const meta: Meta<CallsListNew> = {
  title: "/CallsListNew",
  component: CallsListNew,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<CallsListNew>;

export const CallsListNewStory: Story = {
  render: (args) => ({
    components: { CallsListNew },
    setup() {
      return { args };
    },
    props: args,
  }),
  args: {

  },
};
