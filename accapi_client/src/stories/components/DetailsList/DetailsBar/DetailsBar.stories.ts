import {Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { DetailsBar } from "./FrameInstanceDetailsBar.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const meta: Meta<DetailsBar> = {
  title: "/DetailsBar",
  component: DetailsBar,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<DetailsBar>;

export const DetailsBarStory: Story = {
  render: (args) => ({
    components: { DetailsBar },
    setup() {
      return { args };
    },
    props: args,
  }),
};
