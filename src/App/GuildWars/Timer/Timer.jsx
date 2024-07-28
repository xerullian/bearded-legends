import React from 'react';
import useContentBundle from '@hooks/useContentBundle.jsx';
import contentBundle from '../../App.yaml';
import * as styles from './Timer.css';

export default function Timer({ className }) {
  const c = useContentBundle(contentBundle);

  return (
    <div className={`${className ?? ''} ${styles.Timer}`}>
      {/* <div>{c.Knighthood}</div> */}
      {/* <div>{c.hour}</div> */}
    </div>
  );
}
