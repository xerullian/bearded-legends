import React, { useEffect, useState } from 'react';
import * as styles from './Clock.css';
import useInterval from '@hooks/useInterval';
import useContentBundle from '@hooks/useContentBundle';
import content from './Clock.yaml';
import Card from '../../../components/Card';
import useFormatDateTime from './useLocaleDate';

export default function Clock(props) {
  const { timeZone = 'UTC' } = props;
  const [tick, start] = useInterval();
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
    second: '2-digit',
    hour12: false,
  });

  useEffect(() => start(), []);
  useEffect(() => setNow(Date.now()), [tick]);

  return (
    <div className={styles.Clock}>
      <Card header={<b.CurrentTimeMessage timeZone={timeZone} />}>
        <div className={styles.Date}>{formatDate(now)}</div>
        <div className={styles.Time}>{formatTime(now)}</div>
      </Card>
    </div>
  );
}
