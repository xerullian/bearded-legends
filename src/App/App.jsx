import useContentBundle from '@hooks/useContentBundle';
import useServiceWorker from '@hooks/useServiceWorker';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import React from 'react';
import * as Styles from './App.scss';
import content from './App.yaml';
import Logo from './GuildWars/Header/Logo';
import * as LogoStyles from './GuildWars/Header/Logo.scss';

export default function App({ className }) {
  const b = useContentBundle(content);

  useServiceWorker();

  return (
    <div
      className={Arrays.pack(
        className,
        Styles.App,
        Layout.Flex,
        Layout.JustifyCenter,
        Layout.AlignCenter,
      ).join(' ')}
    >
      <Logo className={LogoStyles.Largest} />
    </div>
  );
}
