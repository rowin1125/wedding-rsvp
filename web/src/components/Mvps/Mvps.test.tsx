import { render } from '@redwoodjs/testing/web';

import Mvps from './Mvps';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Mvps', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<Mvps />);
        }).not.toThrow();
    });
});
