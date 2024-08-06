import useContentBundle from '@hooks/useContentBundle';
import useInterval from '@hooks/useInterval';
import Arrays from '@utils/Arrays';
import React, { useEffect, useState } from 'react';
import * as Styles from './Clock.scss';
import content from '@content/Content.yaml';
import stringToTemplate from '../../../utils/stringToTemplate';

export default function Clock({ className, timeZone = 'UTC' }) {
  const [tick, start] = useInterval({ strict: true, onTheMinute: true });
  const b = useContentBundle(content);
  const [clock, setClock] = useState({});
  const CLOCK_FORMAT = b.CLOCK_FORMAT();

  useEffect(() => start(), []);

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
