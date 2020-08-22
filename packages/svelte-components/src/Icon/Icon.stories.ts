import Icon from './Icon.svelte';
import { action } from '@storybook/addon-actions';

export default {
  title: 'MyIcon',
  argTypes: {
    class: {
      control: 'text',
    },
  },
  on: {
    click: action('I am logging in the actions tab too'),
  },
};

const Template = (args) => ({
  Component: Icon,
  props: args,
});
export const standard = Template.bind({});
standard.args = {
  class: 'fab fa-github',
};

export const withButton = Template.bind({});
withButton.args = {
  class: 'fab fa-github',
};
