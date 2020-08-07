import Button from './Button.svelte';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
export default { title: 'MyButton' };

export const withText = () => ({
  Component: Button,
  props: {
    text: text('Label', 'Hello Storybook'),
  },
  on: {
    click: action('I am logging in the actions tab too'),
  },
});
export const withEmoji = () => ({
  Component: Button,
  props: {
    text: '😀 😎 👍 💯',
  },
});
