import {Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { DetailsMenu } from "./DropdownMenuDetailsMenu.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const meta: Meta<DetailsMenu> = {
  title: "/DetailsMenu",
  component: DetailsMenu,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<DetailsMenu>;

export const DetailsMenuStory: Story = {
  render: (args) => ({
    components: { DetailsMenu },
    setup() {
      return { args };
    },
    props: args,
  }),
};
