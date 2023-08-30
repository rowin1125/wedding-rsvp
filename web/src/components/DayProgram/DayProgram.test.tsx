import { render } from '@redwoodjs/testing/web';

import DayProgram from './DayProgram';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DayProgram', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<DayProgram />);
        }).not.toThrow();
    });
});
