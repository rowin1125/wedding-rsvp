import type { Meta, StoryObj } from '@storybook/react';

import EveningGuestsPage from './EveningGuestsPage';

const meta: Meta<typeof EveningGuestsPage> = {
    component: EveningGuestsPage,
};

export default meta;

type Story = StoryObj<typeof EveningGuestsPage>;

export const Primary: Story = {};
