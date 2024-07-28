import React from 'react';
import useContentBundle from '@hooks/useContentBundle';
import * as styles from './App.css';
import content from './App.yaml';
import Timer from './GuildWars/Timer/Timer';

export default function App(_props) {
  const b = useContentBundle(content);

  return (
    <div className={styles.App}>
      <h1>
        <b.GuildName />
      </h1>

      <p>
        <b.WelcomeMessage place={<b.GameName />} />
      </p>

      <p>
        <b.Greeting name="World" />
      </p>

      <Timer />
    </div>
  );
}
