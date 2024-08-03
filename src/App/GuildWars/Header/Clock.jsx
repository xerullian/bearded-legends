import useContentBundle from '@hooks/useContentBundle';
import useInterval from '@hooks/useInterval';
import { pack } from '@utils/Arrays';
import React, { useEffect, useState } from 'react';
import * as Styles from './Clock.scss';
import content from './Clock.yaml';
import useFormatDateTime from './useLocaleDateTime';

export default function Clock({ className, timeZone = 'UTC' }) {
  const [tick, start] = useInterval({ strict: true });
  const [now, setNow] = useState(Date.now());
  const b = useContentBundle(content);

  const [formatDate] = useFormatDateTime({
    timeZone,
    month: 'short',
    weekday: 'short',
    day: '2-digit',
  });

  const [formatTime] = useFormatDateTime({
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    hour12: false,
  });

  useEffect(() => start(), []);
  useEffect(() => setNow(Date.now()), [tick]);

  return (
    <div className={pack(className, Styles.Clock).join(' ')}>
      {/* <div className={Styles.Date}>{formatDate(now)}</div> */}
      <div className={Styles.Time}>
        <div className={Styles.HoursMinutes}>{formatTime(now)}</div>
        <div className={Styles.TimeZone}>{timeZone}</div>
      </div>
    </div>
  );
}
