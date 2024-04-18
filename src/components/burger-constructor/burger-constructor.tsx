import React, { FC, useMemo } from 'react';
import { TConstructorIngredient } from '../../utils/types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearAll,
  constructorSelector,
  TConstructorState
} from '../../services/ingredientsConstructor';
import { selectIsAuth } from '../../services/auth';
import { selectNewOrders, newOrder, clearOrder } from '../../services/newOrder';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { constructorItems } = useSelector(constructorSelector);
  const isAuth = useSelector(selectIsAuth);
  const { order, orderRequest } = useSelector(selectNewOrders);
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth) navigate('/login');
    dispatch(
      newOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(clearAll());
    dispatch(clearOrder());
    navigate('/login');
  };

  const setPrice = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={setPrice}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
