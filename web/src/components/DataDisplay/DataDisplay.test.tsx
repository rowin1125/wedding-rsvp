import { render } from '@redwoodjs/testing/web';

import DataDisplay from './DataDisplay';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DataDisplay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DataDisplay />);
    }).not.toThrow();
  });
});
