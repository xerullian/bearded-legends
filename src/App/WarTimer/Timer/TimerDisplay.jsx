import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';
import React, { useRef, useState } from 'react';
import * as Styles from './TimerDisplay.scss';

export default function TimerDisplay({ className, hours, minutes, seconds }) {
  const _logger = new Logger('TimerDisplay');
  const b = useContentBundle(content);
  const [buffer, setBuffer] = useState({});
  const hoursInputRef = useRef(null);
  const minutesInputRef = useRef(null);
  const secondsInputRef = useRef(null);

  const onChangeHours = (domEvent) => {
    setBuffer({ ...buffer, hours: domEvent.target.value });
  };

  const onFocusHours = (_domEvent) => {
    setBuffer({ ...buffer, hours });

    setTimeout(() => {
      const el = hoursInputRef.current;
      el.selectionStart = el.selectionEnd = el.value.length;
    });
  };

  const onChangeMinutes = (domEvent) => {
    setBuffer({ ...buffer, minutes: domEvent.target.value });
  };

  const onFocusMinutes = (_domEvent) => {
    setBuffer({ ...buffer, minutes: String(minutes).padStart(2, '0') });

    setTimeout(() => {
      const el = minutesInputRef.current;
      el.selectionStart = el.selectionEnd = el.value.length;
    });
  };

  const onChangeSeconds = (domEvent) => {
    setBuffer({ ...buffer, seconds: domEvent.target.value });
  };

  const onFocusSeconds = (_domEvent) => {
    setBuffer({ ...buffer, seconds: String(seconds).padStart(2, '0') });

    setTimeout(() => {
      const el = secondsInputRef.current;
      el.selectionStart = el.selectionEnd = el.value.length;
    });
  };

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
      <div className={Styles.Hours}>
        {hours}
        <label>
          <input
            ref={hoursInputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={buffer.hours}
            onChange={onChangeHours}
            onFocus={onFocusHours}
          ></input>
          <abbr title={b.Hours()}>
            <b.HoursAbbr />
          </abbr>
        </label>
      </div>
      <div className={Styles.Minutes}>
        {hours
          ? String(minutes || 0).padStart(2, '0')
          : String(minutes || 0).padStart(2, '0')}
        <label>
          <input
            ref={minutesInputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={buffer.minutes}
            onChange={onChangeMinutes}
            onFocus={onFocusMinutes}
          ></input>
          <abbr title={b.Minutes()}>
            <b.MinutesAbbr />
          </abbr>
        </label>
      </div>
      <div className={Styles.Seconds}>
        {String(seconds || 0).padStart(2, '0')}
        <label>
          <input
            ref={secondsInputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={buffer.seconds}
            onChange={onChangeSeconds}
            onFocus={onFocusSeconds}
          ></input>
          <abbr title={b.Seconds()}>
            <b.SecondsAbbr />
          </abbr>
        </label>
      </div>
    </div>
  );
}
