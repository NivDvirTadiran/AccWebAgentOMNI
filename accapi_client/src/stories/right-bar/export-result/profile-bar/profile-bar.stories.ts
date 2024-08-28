import { moduleMetadata, StoryObj, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileBarComponent } from "./profile-bar.component";
/*
const meta: Meta<ProfileBar> = {
  title: "/ProfileBar",
  component: ProfileBar,
  //tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<ProfileBar>;

export const ProfileBarStory: Story = {
  render: (args) => ({
    components: { ProfileBar },
    setup() {
      return { args };
    },
    template: '<ProfileBar v-bind="args" />',
  }),
};






import { IconLarge13MdComponent } from './icon-large13-md.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
*/
export default {
  title: 'Design System/RightBar/ProfileBar',
  component: ProfileBarComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<ProfileBarComponent> = (args: ProfileBarComponent) => ({
  props: args,
});

export const ProfileBar_Clean = Template.bind({});


