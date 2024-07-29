import React from 'react';
import useContentBundle from '@hooks/useContentBundle';
import * as styles from './App.css';
import '@styles/Global.css';
import content from './App.yaml';
import Timer from './GuildWars/Timer/Timer';
import Clock from './GuildWars/Clock/Clock';

export default function App(_props) {
  const b = useContentBundle(content);

  return (
    <div className={styles.App}>
      <h1>
        <b.GuildName />
      </h1>

      <Clock />

      <Timer />
    </div>
  );
}
