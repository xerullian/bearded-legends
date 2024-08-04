import React from 'react';
import * as Styles from './Button.scss';
import Arrays from '@utils/Arrays';

export default function Button({ className, children, onClick }) {
  return (
    <button
      className={Arrays.pack(className, Styles.Button).join(' ')}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
