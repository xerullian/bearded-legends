import { pack } from '@utils/Arrays';
import React from 'react';
import * as styles from './TimerControl.scss';

export default function TimerControl({ className, children, onClick }) {
  return (
    <div className={pack(className, styles.TimerControl).join(' ')}>
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
