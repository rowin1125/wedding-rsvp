import { render } from '@redwoodjs/testing/web';

import EveningGuestsPage from './EveningGuestsPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EveningGuestsPage', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<EveningGuestsPage />);
        }).not.toThrow();
    });
});
