import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { clearAll, selectItems } from '../../services/constructor';
import { selectIsAuth } from '../../services/auth';
import {
  selectNewOrders,
  newOrder,
  clearOrder
} from '../../services/newOrders';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(selectItems).constructorItems;
  const isAuth = useSelector(selectIsAuth);
  const { order, orderRequest } = useSelector(selectNewOrders);
  const onOrderClick = () => {
    if (!isAuth) navigate('/login');
    if (!constructorItems?.bun || orderRequest) return;
    dispatch(
      newOrder([
        constructorItems?.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems?.bun._id
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
      (constructorItems?.bun ? constructorItems?.bun.price * 2 : 0) +
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
