import {Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgentStatusComponent, busy, launch, login, logon, meeting, release} from "./agent-status.component";




const meta: Meta<AgentStatusComponent> = {
  title: "Design System/RightBar/AgentStatus",
  component: AgentStatusComponent,
  parameters: {layout: 'centered',},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<AgentStatusComponent>;



export const AgentStatusStory: Story = {
  render: args => ({
    //setup() {return { args };},
    props: args
    //template: '<Menulist v-bind="args" />',
  }),
  args: {
    agentStatus: logon.mStatus
  },
};


export const Logon: Story = {
  render: args => ({props: args}),
  args: {agentStatus: logon.mStatus},
};

export const Login: Story = {
  args: {agentStatus: login.mStatus}
};


export const Release: Story = {args: {agentStatus: release.mStatus}}
export const Busy: Story = {args: {agentStatus: busy.mStatus}}
export const Launch: Story = {args: {agentStatus: launch.mStatus}}
export const Meeting: Story = {args: {agentStatus: meeting.mStatus}}
