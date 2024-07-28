import React, { useEffect } from 'react';
import useContentBundle from '@hooks/useContentBundle';
import content from '../../App.yaml';
import * as styles from './Timer.css';
import { useSessionStorage } from '../../../hooks/useStorage';
import Logger from '@utils/Logger';

export default function Timer({ className }) {
  const logger = new Logger('Timer');
  const b = useContentBundle(content, { es: { GuildName: 'foo' } });

  const [value, setValue, updateValue, removeValue] = useSessionStorage(
    'BL.Timer',
    {
      foo: 'FOO',
      bar: 'BAR',
    },
  );

  useEffect(() => {
    logger.log('BL.Timer', value);
  }, [value]);

  return <div className={`${className ?? ''} ${styles.Timer}`}></div>;
}
