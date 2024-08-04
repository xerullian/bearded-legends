import * as Styles from '@styles/Accessibility.scss';
import React from 'react';

export function SrOnly({ children }) {
  return <span className={Styles.SrOnly}>{children}</span>;
}
