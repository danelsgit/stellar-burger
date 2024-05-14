import { newOrderReducer, newOrder, initialState } from '../newOrder';
import { TNewOrderResponse } from '@api';

describe('Тест оформления нового заказа', () => {
  const testOrder: TNewOrderResponse = {
    order: {
      _id: '4',
      ingredients: ['1', '2'],
      status: 'done',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      name: 'test',
      number: 4
    },
    name: 'test',
    success: true
  };

  test('Успешное создание нового заказа', () => {
    const state = newOrderReducer(initialState, {
      type: newOrder.fulfilled.type,
      payload: testOrder,
    });
    expect(state.orderRequest).toEqual(false);
    expect(state.name).toEqual(testOrder.name);
    expect(state.order).toEqual(testOrder.order);
  });

  test('Запрос создания нового заказа', () => {
    const state = newOrderReducer(initialState, {
      type: newOrder.pending.type,
      payload: testOrder,
    });
    expect(state.orderRequest).toEqual(true); 
    expect(state.name).toEqual(''); 
    expect(state.order).toEqual(null); 
  });
    
  test('Ошибка создания нового заказа', () => {
    const state = newOrderReducer(initialState, {
      type: newOrder.rejected.type,
      payload: testOrder,
    });
    expect(state.orderRequest).toEqual(false);
    expect(state.name).toEqual('');
    expect(state.order).toEqual(null);
  });
  
});
