// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((f) => f),
}));

const mockAxios = <T>(data: T) => {
  const get = jest.fn().mockResolvedValue(data);
  (axios.create as jest.Mock).mockReturnValue({ get });
  return { get };
};

describe('throttledGetDataFromApi', () => {
  const fakePath = 'go/for/sleep';
  const fakeData = { data: 'fake-data' };
  const baseURL = 'https://jsonplaceholder.typicode.com';

  beforeEach(jest.clearAllMocks);

  test('should create instance with provided base url', async () => {
    mockAxios(fakeData);
    await throttledGetDataFromApi(fakePath);
    const { create } = axios;
    expect(create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const { get } = mockAxios(fakeData);
    await throttledGetDataFromApi(fakePath);
    expect(get).toHaveBeenCalledWith(fakePath);
  });

  test('should return response data', async () => {
    mockAxios({ data: fakeData });
    expect(await throttledGetDataFromApi(fakePath)).toEqual(fakeData);
  });
});
