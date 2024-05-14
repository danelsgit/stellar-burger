import { ordersReducer, initialState, getOrders } from '../getOrders';
import { TOrder } from '@utils-types';

describe('Тест заказов', () => {
  const testOrders: TOrder[] = [
    {
      _id: '4',
      ingredients: ['1', '2'],
      status: 'done',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      name: 'name',
      number: 4
    }
  ];

  test('Тест успешного отображения заказов', () => {
    const state = ordersReducer(initialState, {
      type: getOrders.fulfilled.type,
      payload: testOrders
    });
    expect(state.orders).toEqual(testOrders);
  });
});
