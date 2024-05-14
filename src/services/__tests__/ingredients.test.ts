import {
  initialState,
  ingredientsReducer,
  getIngredients
} from '../ingredients';
import { TIngredient } from '@utils-types';

describe('Тест редьюсера ингредиентов', () => {
  const testIngredients: TIngredient[] = [
    {
      _id: '4',
      name: 'test',
      type: 'sauce',
      proteins: 4,
      fat: 4,
      carbohydrates: 4,
      calories: 4,
      price: 4,
      image: 'image',
      image_mobile: 'image',
      image_large: 'image'
    }
  ];

  test('Тест успешного запроса ингредиентов', () => {
    const state = ingredientsReducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: testIngredients
    });
    expect(state.ingredients).toEqual(testIngredients);
    expect(state.isLoading).toEqual(false);
  });

  test('Тест запроса ингредиентов', () => {
    const state = ingredientsReducer(initialState, {
      type: getIngredients.pending.type,
      payload: testIngredients
    });
    expect(state.ingredients).toEqual([]);
    expect(state.isLoading).toEqual(true);
  });

  test('Тест ошибки запроса ингредиентов', () => {
    const state = ingredientsReducer(initialState, {
      type: getIngredients.rejected.type
    });
    expect(state.ingredients).toEqual([]);
    expect(state.isLoading).toEqual(false);
  });
});
