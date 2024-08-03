import useContentBundle from '@hooks/useContentBundle';
import useSwipe from '@hooks/useSwipe';
import { pack } from '@utils/Arrays';
import React, { useEffect } from 'react';
import useServiceWorker from '../hooks/useServiceWorker';
import * as styles from './App.scss';
import content from './App.yaml';
import GuildWars from './GuildWars/GuildWars';

export default function App({ className }) {
  const b = useContentBundle(content);
  const [ref, swipe] = useSwipe();

  useServiceWorker();

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
    <div ref={ref}>
      <GuildWars className={pack(className, styles.App).join(' ')} />
    </div>
  );
}
