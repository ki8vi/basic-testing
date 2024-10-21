// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const linkList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 'three',
      next: {
        value: 4,
        next: {
          value: true,
          next: {
            value: 6,
            next: {
              value: 7,
              next: {
                value: '',
                next: {
                  value: 9,
                  next: {
                    value: 10,
                    next: {
                      value: null,
                      next: null,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(
      generateLinkedList([1, 2, 'three', 4, true, 6, 7, '', 9, 10]),
    ).toStrictEqual(linkList);
  });
  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(
      generateLinkedList([false, '45', ' ', [], {}, NaN]),
    ).toMatchSnapshot();
  });
});
