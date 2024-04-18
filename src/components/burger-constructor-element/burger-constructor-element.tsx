import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { deleteItem } from '../../services/ingredientsConstructor';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  clearAll,
  constructorSelector,
  ingredientMoveDown,
  ingredientMoveUp
} from '../../services/ingredientsConstructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(ingredientMoveDown(index));
    };

    const handleMoveUp = () => {
      dispatch(ingredientMoveUp(index));
    };

    const handleClose = () => {
      dispatch(deleteItem(ingredient._id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
