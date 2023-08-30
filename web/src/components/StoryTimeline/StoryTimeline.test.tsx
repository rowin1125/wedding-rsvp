import { render } from '@redwoodjs/testing/web';

import StoryTimeline from './StoryTimeline';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StoryTimeline', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<StoryTimeline />);
        }).not.toThrow();
    });
});
