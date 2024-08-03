import { SrOnly } from '@components/SrOnly';
import useContentBundle from '@hooks/useContentBundle';
import { pack } from '@utils/Arrays';
import Logger from '@utils/Logger';
import React from 'react';
import { PauseCircle, PlayCircle, StopCircle } from 'react-bootstrap-icons';
import appContent from '../../App.yaml';
import content from './Timer.yaml';
import * as styles from './TimerControl.scss';

export default function TimerControl({
  id,
  className,
  startTimestamp,
  pauseTimestamp,
  onClickSuperButton,
  onClickResetButton,
}) {
  const _logger = new Logger('TimerControl');
  const b = useContentBundle(appContent, content);

  return (
    <div className={pack(className, styles.TimerControl).join(' ')}>
      <button type="button" onClick={onClickSuperButton}>
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
      </button>
      <button type="button" onClick={onClickResetButton}>
        <StopCircle />
        <SrOnly>
          <b.ResetButtonLabel />
        </SrOnly>
      </button>
    </div>
  );
}
