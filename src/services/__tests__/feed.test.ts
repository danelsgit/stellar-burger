import { feedReducer, getFeed, initialState } from '../feed';
import { TOrder } from '@utils-types';

describe('Тест ленты заказов', () => {
  const testOrder = {
    orders: [
      {
        _id: '4',
        ingredients: ['1', '2'],
        status: 'done',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        name: 'name',
        number: 4
      }
    ] as TOrder[],
    total: 1,
    totalToday: 1
  };

  test('Тест успешного отображения ленты', () => {
    const state = feedReducer(initialState, {
      type: getFeed.fulfilled.type,
      payload: testOrder
    });
    expect(state).toEqual(testOrder);
  });
});
