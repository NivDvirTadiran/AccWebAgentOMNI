import {Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { SideCategoryComponent } from "./side-category.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SideCategory1Component} from "./side-category1/side-category1.component";

const meta: Meta<SideCategoryComponent> = {
  title: "Design System/DetailsBar/SideCategory",
  component: SideCategoryComponent,
  decorators: [
    moduleMetadata({
      declarations: [SideCategory1Component],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<SideCategoryComponent>;

export const SideCategoryStory: Story = {
  render: (args) => ({
    components: { SideCategory: SideCategoryComponent },
    setup() {
      return { args };
    },
    props: args,
  }),
  args: {
    callHistory: "משתתפים בשיחה",
    participants: "22.44x22.44x4242168431",
    propMinWidth: "124px",
  },
};
