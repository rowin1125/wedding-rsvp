import { render } from '@redwoodjs/testing/web';

import ActivatePage from './ActivatePage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ActivatePage', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<ActivatePage />);
        }).not.toThrow();
    });
});
