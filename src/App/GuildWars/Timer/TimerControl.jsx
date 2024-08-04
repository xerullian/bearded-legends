import Arrays from '@utils/Arrays';
import React from 'react';
import * as Styles from './TimerControl.scss';

export default function TimerControl({ className, children, onClick }) {
  return (
    <div className={Arrays.pack(className, Styles.TimerControl).join(' ')}>
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
