import Animation from '@components/Animation';
import TimerButton from '@components/IconButton';
import SrOnly from '@components/SrOnly';
import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import useInterval from '@hooks/useInterval';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import Logger from '@utils/Logger';

import React, { useEffect, useState } from 'react';
import { PauseCircle, PlayCircle, XCircle } from 'react-bootstrap-icons';

import * as Styles from './Timer.scss';
import TimerDisplay from './TimerDisplay';
import TimerLabel from './TimerLabel';

const DEFAULT_REMAINING_MILLIS = 1_800_000; //FIXME Repeated definition
const WARNING_REMAINING_MILLIS = 240_000;
const EXPIRING_REMAINING_MILLIS = 120_000;

export default function Timer({ className, nodeDataListId, timer, setTimer }) {
  const _logger = new Logger('Timer');
  const b = useContentBundle(content);
  const [tick, start, stop] = useInterval({ strict: true });
  const [{ hours, minutes, seconds }, setDisplay] = useState({});

  const {
    name,
    startTimestamp,
    pauseTimestamp,
    endTimestamp,
    remainingMillis,
  } = timer;

  const setName = (name) => {
    setTimer({ ...timer, name });
  };

  const onClickStartButton = (_domEvent) => {
    start();
    setTimer({ ...timer, startTimestamp: Date.now() });
  };

  const onClickPauseButton = (_domEvent) => {
    stop();
    setTimer({ ...timer, pauseTimestamp: Date.now() });
  };

  const onClickResumeButton = (_domEvent) => {
    const now = Date.now();
    const elapsed = now - pauseTimestamp;

    setTimer({
      ...timer,
      startTimestamp: now,
      pauseTimestamp: 0,
      endTimestamp: endTimestamp + elapsed,
    });

    start();
  };

  const onClickResetButton = (_domEvent) => {
    stop();

    setTimer({
      ...timer,
      startTimestamp: 0,
      pauseTimestamp: 0,
      endTimestamp: DEFAULT_REMAINING_MILLIS,
      remainingMillis: DEFAULT_REMAINING_MILLIS,
    });
  };

  const onClickSuperButton = (domEvent) => {
    if (remainingMillis < 0) {
      onClickResetButton(domEvent);
    } else if (pauseTimestamp) {
      onClickResumeButton(domEvent);
    } else if (!startTimestamp) {
      onClickStartButton(domEvent);
    } else if (!pauseTimestamp) {
      onClickPauseButton(domEvent);
    }
  };

  const adjustRemainingMillis = (newRemainingMillis) => {
    if (startTimestamp) {
      setTimer({
        ...timer,
        startTimestamp: (pauseTimestamp || startTimestamp) - newRemainingMillis,
        remainingMillis: newRemainingMillis,
      });
    } else {
      setTimer({
        ...timer,
        remainingMillis: newRemainingMillis,
      });
    }
  };

  useEffect(() => {
    if (pauseTimestamp) {
      // Had the timer been paused prior to browser refresh, we should adjust
      // the paused timing so that the start/pause timestamps are relevant.
      const now = Date.now();

      setTimer({
        ...timer,
        startTimestamp: now,
        pauseTimestamp: now,
        endTimestamp: endTimestamp + remainingMillis,
      });

      _logger.info('onStart: Pause', timer.uuid);
    } else if (startTimestamp) {
      // Had the timer been running when browser was refreshed, we should
      // pick up where we originally left off.
      start();
      _logger.info('onStart: Start', timer.uuid);
    }
  }, []);

  useEffect(() => {
    if (startTimestamp && !pauseTimestamp) {
      setTimer({
        ...timer,
        remainingMillis: endTimestamp - Date.now(),
      });
    }
  }, [tick]);

  useEffect(() => {
    setTimer({
      ...timer,
      endTimestamp: startTimestamp + remainingMillis,
    });
  }, [startTimestamp]);

  useEffect(() => {
    const _remainingMillis = Math.abs(remainingMillis);
    const remainingSeconds = _remainingMillis / 1000;
    const remainingMinutes = remainingSeconds / 60;
    const remainingHours = remainingMinutes / 60;

    const seconds = remainingSeconds % 60;
    const minutes = remainingMinutes % 60;
    const hours = remainingHours;

    if (remainingMillis) {
      setDisplay({
        hours: Math.floor(hours),
        minutes: Math.floor(minutes),
        seconds: Math.floor(seconds),
      });
    } else {
      setDisplay({
        hours: Math.abs(Math.floor(hours)),
        minutes: Math.abs(Math.floor(minutes)),
        seconds: Math.abs(Math.floor(seconds)),
      });
    }
  }, [remainingMillis]);

  return (
    <div className={Arrays.pack(className, Styles.Timer).join(' ')}>
      <div
        className={Arrays.pack(
          pauseTimestamp && Styles.Paused,
          startTimestamp && Styles.Started,
          !startTimestamp && Styles.Paused,
          remainingMillis < WARNING_REMAINING_MILLIS && Styles.Warning,
          remainingMillis < 0 && Styles.Expired,
        ).join(' ')}
      >
        <TimerLabel
          className={Styles.Label}
          name={name}
          dataListId={nodeDataListId}
          setName={setName}
        />

        <div
          className={Arrays.pack(
            Layout.Flex,
            Layout.JustifySpaceBetween,
            Layout.AlignCenter,
          ).join(' ')}
        >
          <div
            className={Arrays.pack(
              Layout.Flex,
              Layout.JustifyStart,
              Layout.AlignCenter,
              Layout.NoWrap,
            ).join(' ')}
          >
            <TimerButton onClick={onClickSuperButton}>
              {remainingMillis < 0 ? (
                <>
                  <XCircle />
                  <SrOnly>
                    <b.ResetButtonLabel />
                  </SrOnly>
                </>
              ) : pauseTimestamp ? (
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
            </TimerButton>

            <Animation
              display={remainingMillis > 0 && !!pauseTimestamp}
              expand={Styles.Expand}
              collapse={Styles.Collapse}
            >
              <TimerButton onClick={onClickResetButton}>
                <XCircle />
                <SrOnly>
                  <b.ResetButtonLabel />
                </SrOnly>
              </TimerButton>
            </Animation>

            <TimerDisplay
              className={Styles.Display}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              adjustRemainingMillis={adjustRemainingMillis}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
