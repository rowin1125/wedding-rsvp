import { render } from '@redwoodjs/testing/web';

import DayGuestsPage from './DayGuestsPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DayGuestsPage', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<DayGuestsPage />);
        }).not.toThrow();
    });
});
