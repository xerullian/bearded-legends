import useContentBundle from '@hooks/useContentBundle';
import useInterval from '@hooks/useInterval';
import Arrays from '@utils/Arrays';
import React, { useEffect, useState } from 'react';
import * as Styles from './Clock.scss';
import content from '@content/Content.yaml';
import stringToTemplate from '../../../utils/stringToTemplate';

export default function Clock({ className, timeZone = 'UTC' }) {
  const [tick, start] = useInterval({ strict: true });
  const b = useContentBundle(content);
  const [clock, setClock] = useState('');
  const [progress, setProgress] = useState(0);
  const CLOCK_FORMAT = b.CLOCK_FORMAT();

  useEffect(() => start(), []);

  useEffect(() => {
    const now = new Date();
    const hour = now.getUTCHours();
    const minute = now.getUTCMinutes();

    setProgress(hour * 60 + minute);

    setClock(
      stringToTemplate(CLOCK_FORMAT, {
        hour: String(hour).padStart(2, '0'),
        minute: String(minute).padStart(2, '0'),
      }),
    );
  }, [tick]);

  return (
    <div className={Arrays.pack(className, Styles.Clock).join(' ')}>
      <div className={Styles.Time}>
        <div className={Styles.HoursMinutes}>{clock}</div>
        <div className={Styles.TimeZone}>{timeZone}</div>
      </div>
    </div>
  );
}
