import type { Meta, StoryObj } from '@storybook/react';

import WeddingSettingsPage from './WeddingSettingsPage';

const meta: Meta<typeof WeddingSettingsPage> = {
    component: WeddingSettingsPage,
};

export default meta;

type Story = StoryObj<typeof WeddingSettingsPage>;

export const Primary: Story = {};
