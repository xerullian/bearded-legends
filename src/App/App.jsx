import useContentBundle from '@hooks/useContentBundle';
import { pack } from '@utils/Arrays';
import React from 'react';
import useServiceWorker from '../hooks/useServiceWorker';
import * as Styles from './App.scss';
import content from './App.yaml';
import GuildWars from './GuildWars/GuildWars';

export default function App({ className }) {
  const b = useContentBundle(content);

  useServiceWorker();

  return (
    <div>
      <GuildWars className={pack(className, Styles.App).join(' ')} />
    </div>
  );
}
