import React from 'react';
import * as styles from '@styles/Accessibility.css';

export function SrOnly({ children }) {
  return <span className={styles.SrOnly}>{children}</span>;
}
