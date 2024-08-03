import Flex from '@components/Flex';
import { pack } from '@utils/Arrays';
import React from 'react';
import Clock from './Clock/Clock';
import * as styles from './GuildWars.scss';
import Timer from './Timer/Timer';

export default function GuildWars({ className }) {
  return (
    <div className={pack(className, styles.GuildWars).join(' ')}>
      <Clock />
      <Flex>
        <Timer id="0" />
        <Timer id="1" />
        <Timer id="2" />
        <Timer id="3" />
        <Timer id="4" />
        <Timer id="5" />
        <Timer id="6" />
        <Timer id="7" />
        <Timer id="8" />
      </Flex>
    </div>
  );
}
