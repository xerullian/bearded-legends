import React, { useEffect, useState } from 'react';
import useContentBundle from '@hooks/useContentBundle';
import appContent from '../../App.yaml';
import * as styles from './Timer.css';
import * as animation from '@styles/Animation.css';
import * as a11y from '@styles/Accessibility.css';
import { useLocalStorage } from '../../../hooks/useStorage';
import Logger from '@utils/Logger';
import useInterval from '../../../hooks/useInterval';
import Card from '../../../components/Card';
import content from './Timer.yaml';
import useSwipe from '../../../hooks/useSwipe';
import {
  PauseCircle,
  PauseFill,
  PlayCircle,
  StopCircle,
} from 'react-bootstrap-icons';

// const DEFAULT_REMAINING_MILLIS = 10_000;
const DEFAULT_REMAINING_MILLIS = 1_800_000;

// FIXME auto generate ID if one is not provided

export default function Timer({ id, className }) {
  const _logger = new Logger('Timer');
  const b = useContentBundle(appContent, content);
  const [ref, swipe] = useSwipe();
  const [tick, start, stop] = useInterval({ strict: false });
  const [{ minutes, seconds }, setDisplay] = useState({});

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
      const elapsedMillis = Date.now() - startTimestamp;
      setRemainingMillis(DEFAULT_REMAINING_MILLIS - elapsedMillis);
    }
  }, [tick]);

  useEffect(() => {
    if (remainingMillis > 0) {
      setDisplay({
        minutes: Math.floor(remainingMillis / 60_000),
        seconds: Math.abs(Math.floor((remainingMillis % 60_000) / 1000)),
      });
    } else {
      setDisplay({
        minutes: Math.abs(Math.ceil(remainingMillis / 60_000)),
        seconds: Math.abs(Math.floor((remainingMillis % 60_000) / 1000)),
      });
    }
  }, [remainingMillis]);

  // FIXME header
  return (
    <Card>
      <div className={[className, styles.Timer].cleanJoin()} ref={ref}>
        <div
          className={[
            styles.Elapsed,
            startTimestamp && styles.Started,
            pauseTimestamp && styles.Paused,
            remainingMillis < 240_000 && styles.Warning,
            remainingMillis < 120_000 && styles.Error,
            remainingMillis < 0 && animation.Blink,
          ].cleanJoin()}
        >
          <div className={[styles.Minutes].cleanJoin()}>
            {minutes}
            <span>
              <abbr title={b.Minutes()}>
                <b.MinutesAbbr />
              </abbr>
            </span>
          </div>
          <div className={[styles.Seconds].cleanJoin()}>
            {seconds}
            <span>
              <abbr title={b.Seconds()}>
                <b.SecondsAbbr />
              </abbr>
            </span>
          </div>
        </div>
        <div className={styles.Controls}>
          <button type="button" onClick={onClickSuperButton}>
            {!startTimestamp ? (
              <>
                <PlayCircle />
                <span className={a11y.srOnly}>
                  <b.StartButtonLabel />
                </span>
              </>
            ) : startTimestamp && pauseTimestamp ? (
              <>
                <PlayCircle />
                <span className={a11y.srOnly}>
                  <b.ResumeButtonLabel />
                </span>
              </>
            ) : (
              <>
                <PauseCircle />
                <span className={a11y.srOnly}>
                  <b.PauseButtonLabel />
                </span>
              </>
            )}
          </button>
          <button type="button" onClick={onClickResetButton}>
            <StopCircle />
            <span className={a11y.srOnly}>
              <b.ResetButtonLabel />
            </span>
          </button>
        </div>
      </div>
    </Card>
  );
}
