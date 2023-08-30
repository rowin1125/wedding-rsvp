// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react';

import Hero from './Hero';

const meta: Meta<typeof Hero> = {
    component: Hero,
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Primary: Story = {};
