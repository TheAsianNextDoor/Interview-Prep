import { getById } from './products';
import { vi, describe, test, expect } from 'vitest';

describe('getById', () => {
  test('retrieves item properly', () => {
    const req = {
      params: {
        id: '1',
      },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    const result = getById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      products: ['a', 'b', 'c'],
    });
  });
});
