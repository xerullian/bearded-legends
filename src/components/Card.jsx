import { pack } from '@utils/Arrays';
import React from 'react';
import * as styles from './Card.scss';

export default function Card({ className, children }) {
  return (
    <div className={pack(className, styles.Card).join(' ')}>
      <div>{children}</div>
    </div>
  );
}
