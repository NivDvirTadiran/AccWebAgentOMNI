import {Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { IntroComponent } from "./intro.component";



const meta: Meta<IntroComponent> = {
  title: "Design System/Intro",
  component: IntroComponent,
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
type Story = StoryObj<IntroComponent>;



export const Intro: Story = {
  render: args => ({
    //setup() {return { args };},
    props: args
    //template: '<Menulist v-bind="args" />',
  }),
  args: {

  },
};

/*
export const Active: Story = {
  render: args => ({props: args}),
  args: {agentStatus: {...StatusLabels.active}},
};

export const DeActive: Story = {
  args: {agentStatus: {...StatusLabels.deactive}}
};


export const DeActive2: Story = {
  args: {agentStatus: StatusLabels.active}
};

*/
//new Active()
//export const ProfileBar_Clean: Story ={};
//ProfileBar_Clean.args.statusAgentModel = { name: "Deactive", color: "#BCBCBC", label: 'לא זמין' };

/*
export const Active = Template.bind({});
Active.args = {
  statusAgentModel: { name: "Active", color: "#1FC777", label: 'פעיל'}
}

export const break1 = Template.bind({});


export const break2 = Template.bind({});
export const break3 = Template.bind({});
export const busy1 = Template.bind({});
export const busy2 = Template.bind({});
export const deactive = Template.bind({});
active.args = {
  statusAgentModel: {
    name: "Deactive",
    color: "#BCBCBC",
    label: 'לא זמין'
  }
}

export const suspend = Template.bind({});
*/
