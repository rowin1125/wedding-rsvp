import { render } from '@redwoodjs/testing/web';

import WeddingRsvpPage from './WeddingRsvpPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WeddingRsvpPage', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<WeddingRsvpPage />);
        }).not.toThrow();
    });
});
