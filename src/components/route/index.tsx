import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { selectIsAuth, selectUser } from '../../services/auth';
import React from 'react';

type TProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnauth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnauth = false
}: TProtectedRouteProps) => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth && !onlyUnauth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  if (isAuth && onlyUnauth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
