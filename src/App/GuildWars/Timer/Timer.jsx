import { SrOnly } from '@components/SrOnly';
import useContentBundle from '@hooks/useContentBundle';
// import * as animation from '@styles/Animation.scss';
import { pack } from '@utils/Arrays';
import Logger from '@utils/Logger';
import React, { useEffect, useState } from 'react';
import { PauseCircle, PlayCircle, StopCircle } from 'react-bootstrap-icons';
import Card from '../../../components/Card';
import useInterval from '../../../hooks/useInterval';
import { useLocalStorage } from '../../../hooks/useStorage';
import useSwipe from '../../../hooks/useSwipe';
import appContent from '../../App.yaml';
import * as styles from './Timer.scss';
import content from './Timer.yaml';
import TimerDisplay from './TimerDisplay';
import TimerControl from './TimerControl';

// const DEFAULT_REMAINING_MILLIS = 10_000;
const DEFAULT_REMAINING_MILLIS = 1_800_000;

// FIXME auto generate ID if one is not provided

export default function Timer({ id, className }) {
  const _logger = new Logger('Timer');
  const b = useContentBundle(appContent, content);
  const [ref, swipe] = useSwipe();
  const [tick, start, stop] = useInterval({ strict: false });
  const [{ hours, minutes, seconds }, setDisplay] = useState({});

  const [remainingMillis, setRemainingMillis] = useState(
    DEFAULT_REMAINING_MILLIS,
  );

  const [{ startTimestamp, pauseTimestamp }, setTimestamp] = useLocalStorage(
    `BL.Timer.${id}`,
    {
      startTimestamp: 0,
      pauseTimestamp: 0,
    },
  );

  const onClickStartButton = (_domEvent) => {
    onClickResetButton();
    start();
    setTimestamp({ startTimestamp: Date.now(), pauseTimestamp });
  };

  const onClickPauseButton = (_domEvent) => {
    if (!pauseTimestamp) {
      stop();
      setTimestamp({ startTimestamp, pauseTimestamp: Date.now() });
    }
  };

  const onClickResumeButton = (_domEvent) => {
    if (pauseTimestamp) {
      const _startTimestamp = startTimestamp + Date.now() - pauseTimestamp;

      setTimestamp({
        startTimestamp: _startTimestamp,
        pauseTimestamp: 0,
      });

      start();

      setTimestamp({ startTimestamp: _startTimestamp, pauseTimestamp: 0 });
    }
  };

  const onClickResetButton = (_domEvent) => {
    stop();
    setTimestamp({ startTimestamp: 0, pauseTimestamp: 0 });
    setRemainingMillis(DEFAULT_REMAINING_MILLIS);
  };

  const onClickSuperButton = (_domEvent) => {
    if (!startTimestamp) {
      onClickStartButton(_domEvent);
    } else if (startTimestamp && pauseTimestamp) {
      onClickResumeButton(_domEvent);
    } else if (!pauseTimestamp) {
      onClickPauseButton(_domEvent);
    }
  };

  useEffect(() => {
    if (pauseTimestamp) {
      // Had the timer been paused prior to browser refresh, we should adjust
      // the paused timing so that the start/pause timestamps are relevant.
      const now = Date.now();
      const elapsed = now - pauseTimestamp;

      setTimestamp({
        startTimestamp: startTimestamp + elapsed,
        pauseTimestamp: now,
      });
    } else if (startTimestamp) {
      // Had the timer been running when browser was refreshed, we should
      // pick up where we originally left off.
      start();
    }
  }, []);

  useEffect(() => {
    if (startTimestamp) {
      const now = pauseTimestamp || Date.now();
      const elapsedMillis = now - startTimestamp;
      setRemainingMillis(DEFAULT_REMAINING_MILLIS - elapsedMillis);
    }
  }, [tick, startTimestamp, pauseTimestamp]);

  useEffect(() => {
    const remainingSeconds = remainingMillis / 1000;
    const remainingMinutes = remainingSeconds / 60;
    const remainingHours = remainingMinutes / 60;

    const seconds = remainingSeconds % 60;
    const minutes = remainingMinutes % 60;
    const hours = remainingHours;

    if (remainingMillis > 0) {
      setDisplay({
        hours: Math.abs(Math.floor(hours)),
        minutes: Math.abs(Math.floor(minutes)),
        seconds: Math.abs(Math.floor(seconds)),
      });
    } else {
      setDisplay({
        hours: Math.abs(Math.ceil(hours)),
        minutes: Math.abs(Math.ceil(minutes)),
        seconds: Math.abs(Math.ceil(seconds)),
      });
    }
  }, [remainingMillis]);

  // FIXME header
  return (
    <Card>
      <div
        className={pack(
          className,
          styles.Timer,
          pauseTimestamp && styles.Paused,
          startTimestamp && styles.Started,
          !startTimestamp && styles.Paused,
          remainingMillis < 240_000 && styles.Warning,
          remainingMillis < 120_000 && styles.Expiring,
          remainingMillis < 0 && styles.Expired,
        ).join(' ')}
        ref={ref}
      >
        <TimerControl
          id={id}
          className={styles.Control}
          startTimestamp={startTimestamp}
          pauseTimestamp={pauseTimestamp}
          onClickSuperButton={onClickSuperButton}
          onClickResetButton={onClickResetButton}
        />

        <TimerDisplay
          className={styles.Display}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </div>

      <div>
        <input value="Graypen Jetty"></input>
      </div>
    </Card>
  );
}
