// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 45, b: 2, action: Action.Add, expected: 47 },
  { a: 512, b: 2, action: Action.Divide, expected: 256 },
  { a: 546, b: 200, action: Action.Subtract, expected: 346 },
  { a: 15, b: 2, action: Action.Multiply, expected: 30 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 'empty', b: 2, action: Action.Exponentiate, expected: null },
  { a: 5, b: 'oops', action: Action.Exponentiate, expected: null },
  { a: 45, b: 28, action: ':-)', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('returns $expected when $a $action $b', (caseItem) => {
    const { a, b, action, expected } = caseItem;
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
