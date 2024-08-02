import React from 'react';
import * as styles from './Card.css';

export default function Card({ className, children }) {
  return (
    <div className={[className, styles.Card].cleanJoin()}>
      <div className={styles.Body}>{children}</div>
    </div>
  );
}
