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
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteItem: (state, action) => {
      const matchingItemIndex = state.constructorItems.ingredients.findIndex(
        (item) => item._id === action.payload
      );
      if (matchingItemIndex !== -1) {
        state.constructorItems.ingredients.splice(matchingItemIndex, 1);
      }
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
