import { render } from '@redwoodjs/testing/web';

import UpdateWeddingInvitationPage from './UpdateWeddingInvitationPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UpdateWeddingInvitationPage', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<UpdateWeddingInvitationPage />);
        }).not.toThrow();
    });
});
