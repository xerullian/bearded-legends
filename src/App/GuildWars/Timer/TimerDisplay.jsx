import useContentBundle from '@hooks/useContentBundle';
import { pack } from '@utils/Arrays';
import Logger from '@utils/Logger';
import React from 'react';
import content from './Timer.yaml';
import * as Styles from './TimerDisplay.scss';

export default function TimerDisplay({ className, hours, minutes, seconds }) {
  const _logger = new Logger('TimerDisplay');
  const b = useContentBundle(content);

  return (
    <div className={pack(className, Styles.TimerDisplay).join(' ')}>
      <div className={Styles.Hours} data-value={hours}>
        {hours}
        <abbr title={b.Hours()}>
          <b.HoursAbbr />
        </abbr>
      </div>
      <div className={Styles.Minutes}>
        {hours ? String(minutes).padStart(2, '0') : minutes}
        <abbr title={b.Minutes()}>
          <b.MinutesAbbr />
        </abbr>
      </div>
      <div className={Styles.Seconds}>
        {seconds}
        <abbr title={b.Seconds()}>
          <b.SecondsAbbr />
        </abbr>
      </div>
    </div>
  );
}
