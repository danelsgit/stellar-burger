import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';

export type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

export const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'ingredientsConstructor',
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = { ...action.payload, id: uuidv4() };
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: uuidv4()
        });
      }
    },
    deleteItem: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item._id !== action.payload
        );
    },
    clearAll: (state) => (state = initialState),

    ingredientMoveDown: (state, action) => {
      const index = action.payload;
      const newIngredients = state.constructorItems.ingredients;
      const [movedIngredient] = newIngredients.splice(index, 1);
      newIngredients.splice(index + 1, 0, movedIngredient);
    },
    ingredientMoveUp: (state, action) => {
      const index = action.payload;
      const newIngredients = state.constructorItems.ingredients;
      const [movedIngredient] = newIngredients.splice(index, 1);
      newIngredients.splice(index - 1, 0, movedIngredient);
    }
  },
  selectors: {
    constructorSelector: (state) => state
  }
});

export const {
  addItem,
  deleteItem,
  clearAll,
  ingredientMoveDown,
  ingredientMoveUp
} = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
export const { constructorSelector } = constructorSlice.selectors;
