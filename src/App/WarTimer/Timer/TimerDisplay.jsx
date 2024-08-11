import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';

import React, { useEffect, useRef, useState } from 'react';

import * as Styles from './TimerDisplay.scss';

export default function TimerDisplay({
  className,
  remainingMillis,
  updateRemainingMillis,
}) {
  const _logger = new Logger('TimerDisplay');
  const b = useContentBundle(content);
  const ref = useRef(null);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [hoursBuffer, setHoursBuffer] = useState('');
  const [minutesBuffer, setMinutesBuffer] = useState('');
  const [secondsBuffer, setSecondsBuffer] = useState('');

  useEffect(() => {
    const _remainingMillis = Math.abs(remainingMillis);
    const remainingSeconds = _remainingMillis / 1000;
    const remainingMinutes = remainingSeconds / 60;
    const remainingHours = remainingMinutes / 60;

    const seconds = (remainingSeconds | 0) % 60;
    const minutes = (remainingMinutes | 0) % 60;
    const hours = remainingHours | 0;

    if (remainingMillis) {
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    } else {
      setHours(Math.abs(hours));
      setMinutes(Math.abs(minutes));
      setSeconds(Math.abs(seconds));
    }
  }, [remainingMillis]);

  const onFocus = (domEvent) => {
    const { target } = domEvent;

    setHoursBuffer(String(hours));
    setMinutesBuffer(String(minutes).padStart(2, '0'));
    setSecondsBuffer(String(seconds).padStart(2, '0'));

    setTimeout(() => {
      target.selectionStart = target.selectionEnd = target.value.length;
    }, 0);
  };

  const onChange = (domEvent) => {
    const { target } = domEvent;
    const { value } = target;
    const el = target.closest('[class]');

    if (el.classList.contains(Styles.Hours)) {
      setHoursBuffer(value);
    } else if (el.classList.contains(Styles.Minutes)) {
      setMinutesBuffer(value);
    } else if (el.classList.contains(Styles.Seconds)) {
      setSecondsBuffer(value);
    }
  };

  const onSubmit = (domEvent) => {
    onChange(domEvent);

    updateRemainingMillis(
      Number(hoursBuffer || 0) * 3_600_000 +
        Number(minutesBuffer || 0) * 60_000 +
        Number(secondsBuffer || 0) * 1_000,
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
              value={hoursBuffer}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onSubmit}
              onSubmit={onSubmit}
            />

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
            value={minutesBuffer}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onSubmit}
            onSubmit={onSubmit}
          />

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
            value={secondsBuffer}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onSubmit}
            onSubmit={onSubmit}
          />

          <abbr title={b.Seconds()}>
            <b.SecondsAbbr />
          </abbr>
        </label>
      </div>
    </div>
  );
}
