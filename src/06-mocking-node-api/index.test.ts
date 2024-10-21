// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

describe('doStuffByTimeout', () => {
  const time = 2000;
  const passedFn = jest.fn();
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(passedFn, time);
    expect(setTimeout).toHaveBeenCalledWith(passedFn, time);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(passedFn, time);
    jest.advanceTimersByTime(time);
    expect(passedFn).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const intervalMs = 1000;
  const passedFn = jest.fn();
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(passedFn, intervalMs);
    jest.advanceTimersByTime(intervalMs);
    expect(setInterval).toHaveBeenCalledWith(passedFn, intervalMs);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callTimes = 5;
    doStuffByInterval(passedFn, intervalMs);
    jest.advanceTimersByTime(intervalMs * callTimes);
    expect(passedFn).toBeCalledTimes(callTimes);
  });
});

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));
jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));
jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('readFileAsynchronously', () => {
  const fakePath = 'some-file.md';
  const fakeExistsSync = existsSync as jest.Mock;
  const fakeJoin = join as jest.Mock;
  const fakeReadFile = readFile as jest.Mock;

  beforeEach(jest.clearAllMocks);

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(fakePath);
    expect(fakeJoin).toHaveBeenCalledWith(__dirname, fakePath);
  });

  test('should return null if file does not exist', async () => {
    fakeExistsSync.mockReturnValue(false);
    expect(await readFileAsynchronously(fakePath)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const textOfFile = 'hello from some-file.md';
    fakeExistsSync.mockReturnValue(true);
    fakeReadFile.mockResolvedValue(textOfFile);
    expect(await readFileAsynchronously(fakePath)).toBe(textOfFile);
  });
});
