import Button from '@components/Button';
import useContentBundle from '@hooks/useContentBundle';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import React from 'react';
import Card from '../../components/Card';
import { useLocalStorage } from '../../hooks/useStorage';
import content from '../App.yaml';
import Clock from './Header/Clock';
import NodeDataList from './NodeDataList';
import Timer from './Timer/Timer';
import * as Styles from './WarTimer.scss';

export default function WarTimer({ className }) {
  const b = useContentBundle(content);
  const [timers, setTimers] = useLocalStorage('BL.WarTimer.Data', []);

  const onClickAddButton = (domEvent) => {
    const _timers = timers.map((timer) => ({ ...timer }));
    _timers.push({ name: '', startTimestamp: 0, pauseTimestamp: 0 });
    setTimers(_timers);
  };

  return (
    <div className={Arrays.pack(className, Styles.GuildWars).join(' ')}>
      <div
        className={Arrays.pack(
          Layout.Flex,
          Layout.JustifyCenter,
          Layout.AlignCenter,
        ).join(' ')}
      >
        <div>
          <div
            className={Arrays.pack(
              Layout.Flex,
              Layout.JustifyCenter,
              Layout.AlignCenter,
              Layout.NoWrap,
            ).join(' ')}
          >
            <Clock className={Styles.Clock} />
          </div>
          <div className={Layout.TextCenter}>
            <b.GuildNameDecorative />
          </div>
        </div>
      </div>

      <ul
        className={Arrays.pack(
          Layout.Flex,
          Layout.JustifyStart,
          Layout.AlignCenter,
          Layout.Wrap,
        ).join(' ')}
      >
        {timers.map((timer, index) => (
          <li key={index}>
            <Card>
              <Timer
                timestamp={timer}
                setTimestamp={(value) =>
                  setTimers(timers.map((e, i) => (i === index ? value : e)))
                }
                dataListId="nodeDataList"
              />
            </Card>
          </li>
        ))}

        <li>
          <Card className={Styles.Add}>
            <Button onClick={onClickAddButton}>
              <b.AddButtonLabel />
            </Button>
          </Card>
        </li>
      </ul>

      <NodeDataList />
    </div>
  );
}
