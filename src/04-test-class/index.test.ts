// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const startBalance = 3500;
  const userAccount = getBankAccount(startBalance);
  const recipientAccount = getBankAccount(startBalance);
  test('should create account with initial balance', () => {
    expect(userAccount.getBalance()).toBe(startBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => userAccount.withdraw(startBalance * 1.1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      userAccount.transfer(userAccount.getBalance() * 1.1, recipientAccount),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      userAccount.transfer(userAccount.getBalance(), userAccount),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const newSum = 760;
    const currentSum = userAccount.getBalance();
    expect(userAccount.deposit(newSum).getBalance()).toBe(currentSum + newSum);
  });

  test('should withdraw money', () => {
    const withdrawSum = 321;
    const currentSum = userAccount.getBalance();
    expect(userAccount.withdraw(withdrawSum).getBalance()).toBe(
      currentSum - withdrawSum,
    );
  });

  test('should transfer money', () => {
    const transferSum = 1245;
    const userCurrenSum = userAccount.getBalance();
    const recipientCurrentSum = recipientAccount.getBalance();
    expect(
      userAccount.transfer(transferSum, recipientAccount).getBalance(),
    ).toBe(userCurrenSum - transferSum);
    expect(recipientAccount.getBalance()).toBe(
      recipientCurrentSum + transferSum,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const expectedNumber = 88;
    jest
      .spyOn(userAccount, 'fetchBalance')
      .mockResolvedValueOnce(expectedNumber);
    const res = await userAccount.fetchBalance();
    expect(res).toBe(expectedNumber);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const expectedNumber = 31;
    jest
      .spyOn(userAccount, 'fetchBalance')
      .mockResolvedValueOnce(expectedNumber);
    await userAccount.synchronizeBalance();
    const res = userAccount.getBalance();
    expect(res).toBe(expectedNumber);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const expected = null;
    jest.spyOn(userAccount, 'fetchBalance').mockResolvedValueOnce(expected);
    await expect(userAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
