import { render } from '@redwoodjs/testing/web';

import FooterMenu from './FooterMenu';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FooterMenu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FooterMenu />);
    }).not.toThrow();
  });
});
