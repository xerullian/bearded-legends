import React, { useEffect } from 'react';
// import useContentBundle from '@hooks/useContentBundle';
import * as styles from './App.css';
// import content from './App.yaml';
import Timer from './GuildWars/Timer/Timer';
import Clock from './GuildWars/Clock/Clock';
import useServiceWorker from '../hooks/useServiceWorker';
import useSwipe from '../hooks/useSwipe';

Array.prototype.cleanJoin = function (delimiter = ' ') {
  return this.filter(Boolean).join(delimiter);
};

export default function App({ className }) {
  // const b = useContentBundle(content);

  useServiceWorker();
  const [ref, swipe] = useSwipe();

  useEffect(() => {
    if (swipe === 'down') {
      // TODO Give visual feedback to the user
      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }

      window.location.reload(true);
    }
  }, [swipe]);

  return (
    <div className={[className, styles.App].cleanJoin()} ref={ref}>
      <Clock />
      <Timer id="0" />
      <Timer id="1" />
      <Timer id="2" />
      <Timer id="3" />
      <Timer id="4" />
    </div>
  );
}
