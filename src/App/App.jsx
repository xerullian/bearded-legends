import React, { useEffect } from 'react';
// import useContentBundle from '@hooks/useContentBundle';
import * as styles from './App.scss';
// import content from './App.yaml';
import { pack } from '@utils/Arrays';
import useServiceWorker from '../hooks/useServiceWorker';
import useSwipe from '../hooks/useSwipe';
import Clock from './GuildWars/Clock/Clock';
import Timer from './GuildWars/Timer/Timer';
import * as layout from '@styles/Layout.scss';

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
      <FlexWrap>
        <Timer id="0" />
        <Timer id="1" />
        <Timer id="2" />
        <Timer id="3" />
        <Timer id="4" />
        <Timer id="5" />
        <Timer id="6" />
        <Timer id="7" />
        <Timer id="8" />
      </FlexWrap>
    </div>
  );
}

function FlexWrap({ children }) {
  return <div className={layout.FlexWrap}>{children}</div>;
}
