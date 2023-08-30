import { render } from '@redwoodjs/testing/web';

import Rsvp from './Rsvp';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Rsvp', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<Rsvp />);
        }).not.toThrow();
    });
});
