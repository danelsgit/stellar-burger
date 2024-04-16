import React, { FC } from 'react';
import styles from './common.module.css';

type WrapperProps = {
  title: string;
  component: JSX.Element;
};

export const Wrapper: FC<WrapperProps> = ({ title, component }) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-large'>{title}</h3>
      {component}
    </div>
  </main>
);
