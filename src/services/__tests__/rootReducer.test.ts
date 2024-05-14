import { initialState as ingredientsInitialState } from '../ingredients';
import { initialState as authInitialState } from '../auth';
import { initialState as ordersInitialState } from '../getOrders';
import { initialState as ingredientsConstructorInitialState } from '../ingredientsConstructor';
import { initialState as feedInitialState } from '../feed';
import { initialState as newOrderInitialState } from '../newOrder';
import { rootReducer } from '../store';

const initialState = {
  auth: authInitialState,
  feed: feedInitialState,
  orders: ordersInitialState,
  newOrder: newOrderInitialState,
  ingredients: ingredientsInitialState,
  ingredientsConstructor: ingredientsConstructorInitialState,
};

describe('Проверяем работу rootReducer', () => {
  test('Проверяем что инициализация rootReducer успешна', () => {
    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });
});
