import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUser } from '../../services/auth';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUser).name;
  return <AppHeaderUI userName={userName} />;
};
