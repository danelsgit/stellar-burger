import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  isLoading: boolean;
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
};

const initialState: TIngredientsState = {
  isLoading: false,
  ingredients: [],
  buns: [],
  mains: [],
  sauces: []
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientById: (state, payload): TIngredient | undefined =>
      state.ingredients.find((item) => item._id === payload.id),
    getIngredients: (state) => state
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
      state.buns = action.payload.filter((item) => item.type === 'bun');
      state.mains = action.payload.filter((item) => item.type === 'main');
      state.sauces = action.payload.filter((item) => item.type === 'sauce');
    }),
      builder.addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { getIngredients, getIngredientById } = ingredientsSlice.selectors;
export const reducer = ingredientsSlice.reducer;
