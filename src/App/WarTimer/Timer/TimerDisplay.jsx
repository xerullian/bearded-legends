import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';
import React from 'react';
import * as Styles from './TimerDisplay.scss';

export default function TimerDisplay({ className, hours, minutes, seconds }) {
  const _logger = new Logger('TimerDisplay');
  const b = useContentBundle(content);

  return (
    <div
      className={Arrays.pack(
        className,
        Styles.TimerDisplay,
        Layout.FlexRow,
        Layout.JustifyStart,
        Layout.AlignBaseline,
      ).join(' ')}
    >
      <div className={Styles.Hours} data-value={hours}>
        {hours}
        <input type="number"></input>
      </div>
      <abbr title={b.Hours()} data-value={hours}>
        <b.HoursAbbr />
      </abbr>
      <div className={Styles.Minutes}>
        {hours
          ? String(minutes || 0).padStart(2, '0')
          : String(minutes || 0).padStart(2, '0')}
        <input type="number"></input>
      </div>
      <abbr title={b.Minutes()}>
        <b.MinutesAbbr />
      </abbr>
      <div className={Styles.Seconds}>
        {String(seconds || 0).padStart(2, '0')}
        <input type="number"></input>
      </div>
      <abbr title={b.Seconds()}>
        <b.SecondsAbbr />
      </abbr>
    </div>
  );
}
