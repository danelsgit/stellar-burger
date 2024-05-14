import {
  initialState,
  TConstructorState,
  addItem,
  clearAll,
  constructorReducer,
  deleteItem
} from '../ingredientsConstructor';

describe('Тест раблты конструктора ингредиентов', () => {
  const testState: TConstructorState = {
    constructorItems: {
      bun: null,
      ingredients: [
        {
          _id: '4',
          name: 'test',
          type: 'test',
          proteins: 4,
          fat: 4,
          carbohydrates: 4,
          calories: 4,
          price: 4,
          image: 'test',
          image_mobile: 'test',
          image_large: 'test',
          id: '4'
        }
      ]
    }
  }

  test('Тест очистки', () => {
    const state = constructorReducer(testState, clearAll());
    expect(state.constructorItems.ingredients.length).toBe(0);
  })

  test('Тест удаления ингредиента', () => {
    const action = deleteItem('4');
    const state = constructorReducer(testState, action);
    expect(state.constructorItems.ingredients.length).toBe(0);
  })

  test('Тест добавления ингредиента', () => {
    const action = addItem({
      _id: '4',
      name: 'test',
      type: 'test',
      proteins: 4,
      fat: 4,
      carbohydrates: 4,
      calories: 4,
      price: 4,
      image: 'test',
      image_mobile: 'test',
      image_large: 'test',
    });

    const state = constructorReducer(initialState, action);
    expect(state.constructorItems.ingredients.length).toBe(1);
  })

 
})
