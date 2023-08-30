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

import StoryTimeline from './StoryTimeline';

const meta: Meta<typeof StoryTimeline> = {
    component: StoryTimeline,
};

export default meta;

type Story = StoryObj<typeof StoryTimeline>;

export const Primary: Story = {};
