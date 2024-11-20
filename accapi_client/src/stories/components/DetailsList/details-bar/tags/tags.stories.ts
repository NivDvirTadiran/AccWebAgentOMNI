import {Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { TagsComponent } from "./tags.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddTagComponent} from "./add-tag/add-tag.component";

const meta: Meta<TagsComponent> = {
  title: "Design System/DetailsBar/Tags",
  component: TagsComponent,
  parameters: {layout: 'centered',},
  decorators: [
    moduleMetadata({
      declarations: [TagsComponent, AddTagComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<TagsComponent>;

export const TagsStory: Story = {
  render: (args) => ({
    components: { Tags: TagsComponent },
    setup() {
      return { args };
    },
    props: args
  }),
  args: {},
};
