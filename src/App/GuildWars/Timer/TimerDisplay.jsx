import useContentBundle from '@hooks/useContentBundle';
import { pack } from '@utils/Arrays';
import Logger from '@utils/Logger';
import React from 'react';
import content from './Timer.yaml';
import * as styles from './TimerDisplay.scss';

export default function TimerDisplay({ className, hours, minutes, seconds }) {
  const _logger = new Logger('TimerDisplay');
  const b = useContentBundle(content);

  return (
    <div className={pack(className, styles.TimerDisplay).join(' ')}>
      <div className={styles.Hours} data-value={hours}>
        {hours}
        <abbr title={b.Hours()}>
          <b.HoursAbbr />
        </abbr>
      </div>
      <div className={styles.Minutes}>
        {hours ? String(minutes).padStart(2, '0') : minutes}
        <abbr title={b.Minutes()}>
          <b.MinutesAbbr />
        </abbr>
      </div>
      <div className={styles.Seconds}>
        {seconds}
        <abbr title={b.Seconds()}>
          <b.SecondsAbbr />
        </abbr>
      </div>
    </div>
  );
}
