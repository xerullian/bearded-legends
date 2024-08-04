import { SrOnly } from '@components/SrOnly';
import useContentBundle from '@hooks/useContentBundle';
import * as Layout from '@styles/Layout.scss';
import { pack } from '@utils/Arrays';
import Logger from '@utils/Logger';
import React, { useEffect, useState } from 'react';
import { ArrowClockwise, PauseCircle, PlayCircle } from 'react-bootstrap-icons';
import Card from '../../../components/Card';
import useInterval from '../../../hooks/useInterval';
import { useLocalStorage } from '../../../hooks/useStorage';
import useSwipe from '../../../hooks/useSwipe';
import appContent from '../../App.yaml';
import * as Styles from './Timer.scss';
import content from './Timer.yaml';
import TimerControl from './TimerControl';
import TimerDisplay from './TimerDisplay';
import TimerLabel from './TimerLabel';

const DEFAULT_REMAINING_MILLIS = 1_800_000;

// FIXME auto generate ID if one is not provided

export default function Timer({ id, className, dataListId }) {
  const _logger = new Logger('Timer');
  const b = useContentBundle(appContent, content);
  const [swipeRef, swipe, resetSwipe] = useSwipe();
  const [tick, start, stop] = useInterval({ strict: false });
  const [{ hours, minutes, seconds }, setDisplay] = useState({});

  const [remainingMillis, setRemainingMillis] = useState(
    DEFAULT_REMAINING_MILLIS,
  );

  const [timestamp, setTimestamp] = useLocalStorage(`BL.Timer.${id}`, {
    name: b.DefaultTimerName(),
    startTimestamp: 0,
    pauseTimestamp: 0,
  });

  const { name, startTimestamp, pauseTimestamp } = timestamp;

  const setName = (name) => {
    setTimestamp({
      ...timestamp,
      name,
    });
  };

  const onClickStartButton = (_domEvent) => {
    onClickResetButton();
    start();

    setTimestamp({
      ...timestamp,
      startTimestamp: Date.now(),
    });
  };

  const onClickPauseButton = (_domEvent) => {
    if (!pauseTimestamp) {
      stop();
      setTimestamp({ ...timestamp, pauseTimestamp: Date.now() });
    }
  };

  const onClickResumeButton = (_domEvent) => {
    if (pauseTimestamp) {
      const _startTimestamp = startTimestamp + Date.now() - pauseTimestamp;

      setTimestamp({
        ...timestamp,
        startTimestamp: _startTimestamp,
        pauseTimestamp: 0,
      });

      start();

      setTimestamp({
        ...timestamp,
        startTimestamp: _startTimestamp,
        pauseTimestamp: 0,
      });
    }
  };

  const onClickResetButton = (_domEvent) => {
    stop();
    setTimestamp({ ...timestamp, startTimestamp: 0, pauseTimestamp: 0 });
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
        ...timestamp,
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

  return (
    <Card className={pack(className, Styles.Timer).join(' ')}>
      <div
        ref={swipeRef}
        className={pack(
          pauseTimestamp && Styles.Paused,
          startTimestamp && Styles.Started,
          !startTimestamp && Styles.Paused,
          remainingMillis < 240_000 && Styles.Warning,
          remainingMillis < 120_000 && Styles.Expiring,
          remainingMillis < 0 && Styles.Expired,
        ).join(' ')}
      >
        <TimerLabel
          className={Styles.Label}
          name={name}
          dataListId={dataListId}
          setName={setName}
        />

        <div className={Layout.FlexSpaceBetween}>
          <div
            className={pack(
              Layout.FlexStart,
              Layout.NoWrap,
              swipe === 'left' && Layout.OverflowHidden,
            ).join(' ')}
          >
            <TimerControl onClick={onClickSuperButton}>
              {pauseTimestamp ? (
                <>
                  <PlayCircle />
                  <SrOnly>
                    <b.ResumeButtonLabel />
                  </SrOnly>
                </>
              ) : !startTimestamp ? (
                <>
                  <PlayCircle />
                  <SrOnly>
                    <b.StartButtonLabel />
                  </SrOnly>
                </>
              ) : (
                <>
                  <PauseCircle />
                  <SrOnly>
                    <b.PauseButtonLabel />
                  </SrOnly>
                </>
              )}
            </TimerControl>

            <TimerDisplay
              className={Styles.Display}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />

            {!!pauseTimestamp && (
              <TimerControl onClick={onClickResetButton}>
                <ArrowClockwise />
                <SrOnly>
                  <b.ResetButtonLabel />
                </SrOnly>
              </TimerControl>
            )}
          </div>

          {/* <div className={Styles.SlideIn} data-open={swipe === 'left'}> */}
          <div
            className={pack(
              Styles.SlideIn,
              swipe === 'left' && Styles.Open,
            ).join(' ')}
          >
            <button
              type="button"
              onClick={(domEvent) => {
                onClickResetButton(domEvent);
                resetSwipe();
              }}
            >
              <div className={Layout.FlexStart}>
                <b.RemoveButtonLabel />
              </div>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
