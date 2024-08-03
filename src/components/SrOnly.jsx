import * as styles from '@styles/Accessibility.scss';
import React from 'react';

export function SrOnly({ children }) {
  return <span className={styles.SrOnly}>{children}</span>;
}
