import { render } from '@redwoodjs/testing/web';

import DeleteDialog from './DeleteDialog';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DeleteDialog', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeleteDialog />);
    }).not.toThrow();
  });
});
