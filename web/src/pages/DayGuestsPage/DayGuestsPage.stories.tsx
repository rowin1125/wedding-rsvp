import type { Meta, StoryObj } from '@storybook/react';

import DayGuestsPage from './DayGuestsPage';

const meta: Meta<typeof DayGuestsPage> = {
    component: DayGuestsPage,
};

export default meta;

type Story = StoryObj<typeof DayGuestsPage>;

export const Primary: Story = {};
