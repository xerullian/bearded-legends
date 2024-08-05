import Button from '@components/Button';
import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import React, { useEffect } from 'react';
import Card from '../../components/Card';
import { useLocalStorage } from '../../hooks/useStorage';
import Clock from './Header/Clock';
import NodeDataList from './NodeDataList';
import Timer from './Timer/Timer';
import * as Styles from './WarTimer.scss';
import { v4 as uuidv4 } from 'uuid';
import Logger from '@utils/Logger';

export default function WarTimer({ className }) {
  const _logger = new Logger('WarTimer');
  const b = useContentBundle(content);
  const [timers, setTimers] = useLocalStorage('BL.WarTimer.Data', []);

  const onClickAddButton = (_domEvent) => {
    const _timers = timers.map((timer) => ({ ...timer }));

    _timers.push({
      uuid: uuidv4(),
      name: '',
      startTimestamp: 0,
      pauseTimestamp: 0,
    });

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
          Layout.AlignStart,
          Layout.Wrap,
        ).join(' ')}
      >
        {timers.map((timer, index) => (
          <li key={timer.uuid}>
            <Card className={Styles.Card}>
              <Timer
                timer={timer}
                setTimer={(value) =>
                  // Replace the timer value that was updated by the caller.
                  setTimers(timers.map((e, i) => (i === index ? value : e)))
                }
                nodeDataListId="nodeDataList"
              />
              <Card.SlideIn className={Styles.SlideIn}>
                <Button
                  className={Styles.RemoveButton}
                  onClick={(_domEvent) => {
                    // Delete the timer that was removed by the caller.
                    setTimers([
                      ...timers.slice(0, index),
                      ...timers.slice(index + 1),
                    ]);
                  }}
                >
                  <b.RemoveButtonLabel />
                </Button>
              </Card.SlideIn>
            </Card>
          </li>
        ))}

        <li>
          <Card className={Styles.Card}>
            <div
              className={Arrays.pack(
                Layout.FullWidth,
                Layout.FlexRow,
                Layout.JustifyCenter,
                Layout.AlignStart,
              ).join(' ')}
            >
              <Button className={Styles.AddButton} onClick={onClickAddButton}>
                <b.AddButtonLabel />
              </Button>
            </div>
          </Card>
        </li>
      </ul>

      <NodeDataList />
    </div>
  );
}
