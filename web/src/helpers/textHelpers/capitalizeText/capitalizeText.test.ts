import { capitalizeText } from './capitalizeText';

describe('capitalizeText()', () => {
  test('should capitalize first letter of a word', () => {
    const text = 'hello world';
    expect(capitalizeText(text)).toBe('Hello world');
  });
});
