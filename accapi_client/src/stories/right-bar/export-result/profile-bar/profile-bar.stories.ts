import { moduleMetadata, StoryObj, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileBarComponent } from "./profile-bar.component";
import {AgentStatusComponent} from "../agent-status/agent-status.component";

export default {
  title: 'Design System/RightBar/ProfileBar',
  component: ProfileBarComponent,
  parameters: {},
  decorators: [
    moduleMetadata({
      declarations: [AgentStatusComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<ProfileBarComponent> = (args: ProfileBarComponent) => ({
  props: args,
});

export const ProfileBar_Clean = Template.bind({});


