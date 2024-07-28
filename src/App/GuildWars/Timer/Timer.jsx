import React from 'react';
import useContentBundle from '@hooks/useContentBundle';
import content from '../../App.yaml';
import * as styles from './Timer.css';

export default function Timer({ className }) {
  const b = useContentBundle(content, { es: { GuildName: 'foo' } });

  return (
    <div className={`${className ?? ''} ${styles.Timer}`}>
      <b.FooBar />
    </div>
  );
}
