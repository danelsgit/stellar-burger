import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  buns: [],
  mains: [],
  sauces: []
};

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state,
    getIngredientById: (state, payload): TIngredient | undefined =>
      state.ingredients.find((item) => item._id === payload.id)
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
      state.buns = action.payload.filter((item) => item.type === 'bun');
      state.mains = action.payload.filter((item) => item.type === 'main');
      state.sauces = action.payload.filter((item) => item.type === 'sauce');
    }),
      builder.addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(getIngredients.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { selectIngredients, getIngredientById } =
  ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
