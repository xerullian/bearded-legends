import React, { useEffect, useState } from 'react';
import * as styles from './Clock.css';
import useInterval from '@hooks/useInterval';
import useContentBundle from '@hooks/useContentBundle';
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
    <div className={[className, styles.Clock].cleanJoin()}>
      <div>
        <div className={styles.Date}>{formatDate(now)}</div>
        <div className={styles.Time}>
          <div className={styles.HoursMinutes}>{formatTime(now)}</div>
          <div className={styles.TimeZone}>{timeZone}</div>
        </div>
      </div>
    </div>
  );
}
