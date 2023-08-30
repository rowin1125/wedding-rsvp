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

import Mvps from './Mvps';

const meta: Meta<typeof Mvps> = {
    component: Mvps,
};

export default meta;

type Story = StoryObj<typeof Mvps>;

export const Primary: Story = {};
