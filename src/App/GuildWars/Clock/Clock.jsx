import useContentBundle from '@hooks/useContentBundle';
import useInterval from '@hooks/useInterval';
import { pack } from '@utils/Arrays';
import React, { useEffect, useState } from 'react';
import Card from '../../../components/Card';
import * as styles from './Clock.scss';
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
    <Card className={pack(className, styles.Clock).join(' ')}>
      <div>
        <div className={styles.Date}>{formatDate(now)}</div>
        <div className={styles.Time}>
          <div className={styles.HoursMinutes}>{formatTime(now)}</div>
          <div className={styles.TimeZone}>{timeZone}</div>
        </div>
      </div>
    </Card>
  );
}
