import { render } from '@redwoodjs/testing/web';

import WeddingSettingsPage from './WeddingSettingsPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WeddingSettingsPage', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<WeddingSettingsPage />);
        }).not.toThrow();
    });
});
