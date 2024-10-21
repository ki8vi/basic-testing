// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const [a, b] = [145, 894];
    const result = a + b;
    expect(simpleCalculator({ a, b, action: Action.Add })).toBe(result);
  });

  test('should subtract two numbers', () => {
    const [a, b] = [5, 184];
    const result = a - b;
    expect(simpleCalculator({ a, b, action: Action.Subtract })).toBe(result);
  });

  test('should multiply two numbers', () => {
    const [a, b] = [15, 234];
    const result = a * b;
    expect(simpleCalculator({ a, b, action: Action.Multiply })).toBe(result);
  });

  test('should divide two numbers', () => {
    const [a, b] = [674, 32];
    const result = a / b;
    expect(simpleCalculator({ a, b, action: Action.Divide })).toBe(result);
  });

  test('should exponentiate two numbers', () => {
    const [a, b] = [66, 54];
    const result = a ** b;
    expect(simpleCalculator({ a, b, action: Action.Exponentiate })).toBe(
      result,
    );
  });

  test('should return null for invalid action', () => {
    const [a, b] = [42, Number.MAX_VALUE];
    expect(simpleCalculator({ a, b, action: 'ku!' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: '42', b: Number.MIN_VALUE, action: Action.Add }),
    ).toBeNull();
    expect(
      simpleCalculator({
        a: Number.MIN_VALUE,
        b: '88',
        action: Action.Subtract,
      }),
    ).toBeNull();
  });
});
