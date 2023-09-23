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

import Rsvp from './UpdateRsvp';

const meta: Meta<typeof Rsvp> = {
    component: Rsvp,
};

export default meta;

type Story = StoryObj<typeof Rsvp>;

export const Primary: Story = {};
