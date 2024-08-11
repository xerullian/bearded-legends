import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';
import React, { useEffect, useState } from 'react';
import * as Styles from './Clock.scss';

export default function Clock({ className, tick, timeZone = 'UTC' }) {
  const _logger = new Logger('Clock');
  const _b = useContentBundle(content);
  const [clock, setClock] = useState({});

  useEffect(() => {
    const now = new Date();
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();
    const seconds = now.getUTCSeconds();
    const millis = now.getUTCMilliseconds();

    setClock({
      hours,
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      millis: String(millis).padStart(3, '0'),
    });
  }, [tick]);

  // TODO Abstract formatting and reconsider seconds display / feedback

  return (
    <div className={Arrays.pack(className, Styles.Clock).join(' ')}>
      <div className={Styles.Time}>
        <div className={Styles.TimeDisplay}>
          {clock.hours}:{clock.minutes}
          <small>.{clock.seconds}</small>
        </div>
        <div className={Styles.TimeZone}>{timeZone}</div>
      </div>
    </div>
  );
}
