import { ButtonSendComponent } from './button-send.component';
import {moduleMetadata} from "@storybook/angular";
import {Story, Meta} from "@storybook/angular/types-6-0";
import {CommonModule} from "@angular/common";


export default {
    title: 'Design System/Buttons/SendButton',
    component: ButtonSendComponent,
    parameters: {layout: 'centered',},
    decorators: [
        moduleMetadata({
            declarations: [],
            imports: [CommonModule],
        }),
        /*componentWrapperDecorator<ButtonContinueComponent>((story) => `<div class="container" style="height: 200px">${story}</div>`),*/
    ],
    // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
} as Meta;


const Template: Story<ButtonSendComponent> = (args: ButtonSendComponent) => ({
    props: args,
});

const Template2: Story<ButtonSendComponent> = (args: ButtonSendComponent) => ({
    props: args,
    /*template: '<storybook-button-tadiran ></storybook-button-tadiran>',*/

});



export const Gallery = Template2.bind({});
Gallery.args = {
    gallery: true,
};

export const Primary3 = Template2.bind({});
Primary3.args = {
    gallery: false,
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
    primary: true,
    label: 'Continue',
};

export const Secondary = Template.bind({});
Secondary.args = {
    label: 'שליחה2',
};


export const Large = Template.bind({});
Large.args = {
    size: 'large',
    label: 'שליחה3',
};

export const Small = Template.bind({});
Small.args = {
    size: 'small',
    label: 'שליחה4',
};
