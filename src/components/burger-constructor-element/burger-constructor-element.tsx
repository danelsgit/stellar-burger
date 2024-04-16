import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { deleteItem } from '../../services/constructor';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  clearAll,
  selectItems,
  TConstructorState
} from '../../services/constructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const { constructorItems } = useSelector(selectItems);
    const handleMoveDown = (state: TConstructorState) => {
      const newIngredients = [...state.constructorItems.ingredients];
      const [movedIngredient] = newIngredients.splice(index, 1);
      newIngredients.splice(index + 1, 0, movedIngredient);

      return {
        ...state,
        constructorItems: {
          ...state.constructorItems,
          ingredients: newIngredients
        }
      };
    };

    const handleMoveUp = (state: TConstructorState) => {
      const newIngredients = [...state.constructorItems.ingredients];
      const [movedIngredient] = newIngredients.splice(index, 1);
      newIngredients.splice(index - 1, 0, movedIngredient);

      return {
        ...state,
        constructorItems: {
          ...state.constructorItems,
          ingredients: newIngredients
        }
      };
    };

    const handleClose = () => {
      dispatch(deleteItem(ingredient._id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={() => handleMoveUp(useSelector(selectItems))}
        handleMoveDown={() => handleMoveDown(useSelector(selectItems))}
        handleClose={handleClose}
      />
    );
  }
);
