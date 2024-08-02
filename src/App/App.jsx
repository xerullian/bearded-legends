import React, { useEffect } from 'react';
// import useContentBundle from '@hooks/useContentBundle';
import * as styles from './App.scss';
// import content from './App.yaml';
import Timer from './GuildWars/Timer/Timer';
import Clock from './GuildWars/Clock/Clock';
import useServiceWorker from '../hooks/useServiceWorker';
import useSwipe from '../hooks/useSwipe';
import { pack } from '@utils/Arrays';

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
    <div className={pack(className, styles.App).join(' ')} ref={ref}>
      <Clock />
      <Timer id="0" />
      <Timer id="1" />
      <Timer id="2" />
      <Timer id="3" />
      <Timer id="4" />
    </div>
  );
}
