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

import PartyInformation from './PartyInformation';

const meta: Meta<typeof PartyInformation> = {
    component: PartyInformation,
};

export default meta;

type Story = StoryObj<typeof PartyInformation>;

export const Primary: Story = {};
