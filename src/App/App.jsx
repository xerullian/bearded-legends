import React from 'react';
import useContentBundle from '@hooks/useContentBundle.jsx';
import * as styles from './App.css';
import bundle from './App.yaml';
import Timer from './GuildWars/Timer/Timer.jsx';

export default function App(props) {
  const c = useContentBundle(bundle);

  return (
    <div className={styles.App}>
      <h1>
        <c.GuildName />
      </h1>

      <p>
        <c.WelcomeMessage place={<c.GameName />} />
      </p>

      <Timer />
    </div>
  );
}
