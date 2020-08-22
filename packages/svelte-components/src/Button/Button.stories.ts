import Button from './Button.svelte';
import { action } from '@storybook/addon-actions';
export default {
  title: 'MyButton',
  argTypes: {
    text: {
      control: 'text',
    },
    rounded: {
      control: 'boolean',
    },
    circle: {
      control: 'boolean',
    },
    slot: {
      control: 'object',
    },
  },
  on: {
    click: action('I am logging in the actions tab too'),
  },
};

const Template = (args) => ({
  Component: Button,
  props: args,
});

export const withText = Template.bind({});
withText.args = { text: 'Hello Storybook' };

export const withEmoji = Template.bind({});
withEmoji.args = {
  text: '😀 😎 👍 💯',
};
