import React from 'react';
import * as Styles from '@styles/Accessibility.scss';

export function SrOnly({ children }) {
  return <span className={Styles.SrOnly}>{children}</span>;
}
