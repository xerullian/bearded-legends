import useContentBundle from '@hooks/useContentBundle';
import React, { useRef } from 'react';
import content from './Timer.yaml';
import * as Styles from './TimerLabel.scss';

export default function TimerLabel({ name, setName, dataListId }) {
  const inputRef = useRef(null);
  const b = useContentBundle(content);

  const onFocus = (_domEvent) => {
    inputRef.current.select();
  };

  const onChange = (domEvent) => {
    const { target } = domEvent;
    const { value } = target;
    setName(value);
  };

  return (
    <div className={Styles.TimerLabel}>
      <input
        ref={inputRef}
        value={name}
        autoCorrect={'false'}
        spellCheck={false}
        list={dataListId}
        placeholder={b.DefaultTimerName()}
        onChange={onChange}
        onFocus={onFocus}
      ></input>
      <div></div>
    </div>
  );
}
