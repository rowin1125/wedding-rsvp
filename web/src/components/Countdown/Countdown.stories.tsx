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

import Countdown from './Countdown';

const meta: Meta<typeof Countdown> = {
    component: Countdown,
};

export default meta;

type Story = StoryObj<typeof Countdown>;

export const Primary: Story = {};
