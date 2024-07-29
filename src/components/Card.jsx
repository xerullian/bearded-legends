import React from 'react';
import * as styles from './Card.css';

export default function Card(props) {
  const { header, children } = props;

  return (
    <div className={styles.Card}>
      <div className={styles.Header}>{header}</div>
      <div className={styles.Body}>{children}</div>
    </div>
  );
}
