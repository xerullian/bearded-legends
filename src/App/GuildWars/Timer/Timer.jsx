import React, { useEffect, useState } from 'react';
import useContentBundle from '@hooks/useContentBundle';
import content from '../../App.yaml';
import * as styles from './Timer.css';
import { useSessionStorage } from '../../../hooks/useStorage';
import Logger from '@utils/Logger';
import useInterval from '../../../hooks/useInterval';
import Card from '../../../components/Card';

export default function Timer({ className }) {
  const logger = new Logger('Timer');
  const b = useContentBundle(content, { es: { GuildName: 'foo' } });
  const [tick, start, stop] = useInterval();
  const [elapsedMillis, setElapsedMillis] = useState(0);
  const [remainingMillis, setRemainingMillis] = useState(0);

  const [value, _setValue, _updateValue, _removeValue] = useSessionStorage(
    'BL.Timer',
    {
      foo: 'FOO',
      bar: 'BAR',
    },
  );

  const [startTimestamp, setStartTimestamp] = useState(0);
  const [pauseTimestamp, setPauseTimestamp] = useState(0);

  useEffect(() => {
    logger.log('BL.Timer', value);
  }, [value]);

  const onClickStartButton = (_domEvent) => {
    onClickResetButton();
    start();
    setStartTimestamp(Date.now());
  };

  const onClickPauseButton = (_domEvent) => {
    if (!pauseTimestamp) {
      stop();
      setPauseTimestamp(Date.now());
    }
  };

  const onClickResumeButton = (_domEvent) => {
    if (pauseTimestamp) {
      setStartTimestamp(startTimestamp + Date.now() - pauseTimestamp);
      start();
      setPauseTimestamp(0);
    }
  };

  const onClickResetButton = (_domEvent) => {
    stop();
    setStartTimestamp(0);
    setPauseTimestamp(0);
    setElapsedMillis(0);
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
    if (startTimestamp) {
      setElapsedMillis(Date.now() - startTimestamp);
      setRemainingMillis(1_800_000 - elapsedMillis);
    }
  }, [tick]);

  const format = (remainingMillis) => {
    const remainingSeconds = Math.floor(remainingMillis / 1000);
    const remainingMinutes = Math.floor(remainingSeconds / 60);
    const pad = (number) => String(number).padStart(2, '0');
    return `${pad(remainingMinutes)}:${pad(remainingSeconds % 60)}`;
  };

  return (
    <div className={`${className ?? ''} ${styles.Timer}`}>
      <Card header="Timer">
        <div className={styles.Elapsed}>{format(remainingMillis)}</div>

        <button type="button" onClick={onClickSuperButton}>
          {!startTimestamp
            ? 'Start'
            : startTimestamp && pauseTimestamp
              ? 'Resume'
              : 'Pause'}
        </button>

        <button type="button" onClick={onClickResetButton}>
          Reset
        </button>
      </Card>
    </div>
  );
}
