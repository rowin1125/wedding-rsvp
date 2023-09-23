import type { Meta, StoryObj } from '@storybook/react';

import WeddingRsvpPage from './WeddingRsvpPage';

const meta: Meta<typeof WeddingRsvpPage> = {
    component: WeddingRsvpPage,
};

export default meta;

type Story = StoryObj<typeof WeddingRsvpPage>;

export const Primary: Story = {};
