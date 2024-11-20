import {Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { AddTagComponent } from "./add-tag.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const meta: Meta<AddTagComponent> = {
  title: "Design System/DetailsBar/AddTag",
  component: AddTagComponent,
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
type Story = StoryObj<AddTagComponent>;

export const AddTagStory: Story = {
  render: (args) => ({
    components: { AddTag: AddTagComponent },
    setup() {
      return { args };
    },
    props: args,
  }),
  args: {},
};
