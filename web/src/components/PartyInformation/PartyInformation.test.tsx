import { render } from '@redwoodjs/testing/web';

import PartyInformation from './PartyInformation';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PartyInformation', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<PartyInformation />);
        }).not.toThrow();
    });
});
