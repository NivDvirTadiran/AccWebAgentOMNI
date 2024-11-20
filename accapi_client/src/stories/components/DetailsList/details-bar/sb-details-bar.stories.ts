import {Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { SbDetailsBarComponent } from "./sb-details-bar.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TagsComponent} from "./tags/tags.component";
import {DetailsMenuComponent} from "./details-menu/details-menu.component";
import {AddTagComponent} from "./tags/add-tag/add-tag.component";
import {SideCategoryComponent} from "./details-menu/side-category/side-category.component";
import {SideCategory1Component} from "./details-menu/side-category/side-category1/side-category1.component";

const meta: Meta<SbDetailsBarComponent> = {
  title: "Design System/DetailsBar/DetailsBar",
  component: SbDetailsBarComponent,
  parameters: {layout: 'centered',},
  decorators: [
    moduleMetadata({
      declarations: [DetailsMenuComponent, TagsComponent, AddTagComponent, SideCategoryComponent, SideCategory1Component],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<SbDetailsBarComponent>;

export const DetailsBarStory: Story = {
  render: (args) => ({
    components: { DetailsBar: SbDetailsBarComponent },
    setup() {
      return { args };
    },
    props: args,
  }),
  args: {},
};
