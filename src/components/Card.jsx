import React from 'react';
import * as styles from './Card.scss';
import { pack } from '@utils/Arrays';

export default function Card({ className, children }) {
  return (
    <div className={pack(className, styles.Card).join(' ')}>{children}</div>
  );
}
