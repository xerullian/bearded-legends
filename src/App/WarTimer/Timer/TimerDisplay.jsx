import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';

import React, { useRef, useState } from 'react';

import * as Styles from './TimerDisplay.scss';

export default function TimerDisplay({
  className,
  hours,
  minutes,
  seconds,
  adjustRemainingMillis,
}) {
  const _logger = new Logger('TimerDisplay');
  const b = useContentBundle(content);
  const ref = useRef(null);
  const [buffer, setBuffer] = useState({ hours: '', minutes: '', seconds: '' });

  const onFocus = (domEvent) => {
    const { target } = domEvent;

    setBuffer({
      ...buffer,
      hours: String(hours),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    });

    setTimeout(() => {
      target.selectionStart = target.selectionEnd = target.value.length;
    });
  };

  const onChange = (domEvent) => {
    const { target } = domEvent;
    const { value } = target;
    const el = target.closest('[class]');

    if (el.classList.contains(Styles.Hours)) {
      setBuffer({ ...buffer, hours: value });
    }

    if (el.classList.contains(Styles.Minutes)) {
      setBuffer({ ...buffer, minutes: value });
    }

    if (el.classList.contains(Styles.Seconds)) {
      setBuffer({ ...buffer, seconds: value });
    }
  };

  const onBlur = (domEvent) => {
    onChange(domEvent);

    adjustRemainingMillis(
      Number(buffer.hours || 0) * 3_600_000 +
        Number(buffer.minutes || 0) * 60_000 +
        Number(buffer.seconds || 0) * 1_000,
    );
  };

  return (
    <div
      ref={ref}
      className={Arrays.pack(
        className,
        Styles.TimerDisplay,
        Layout.FlexRow,
        Layout.JustifyStart,
        Layout.AlignBaseline,
      ).join(' ')}
    >
      {!!hours && (
        <div className={Styles.Hours}>
          {hours}
          <label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={buffer.hours}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            ></input>
            <abbr title={b.Hours()}>
              <b.HoursAbbr />
            </abbr>
          </label>
        </div>
      )}
      <div className={Styles.Minutes}>
        {hours
          ? String(minutes || 0).padStart(2, '0')
          : String(minutes || 0).padStart(2, '0')}
        <label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={buffer.minutes}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
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
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={buffer.seconds}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          ></input>
          <abbr title={b.Seconds()}>
            <b.SecondsAbbr />
          </abbr>
        </label>
      </div>
    </div>
  );
}
