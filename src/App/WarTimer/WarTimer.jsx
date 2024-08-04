import Button from '@components/Button';
import useContentBundle from '@hooks/useContentBundle';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import React from 'react';
import Card from '../../components/Card';
import content from '../App.yaml';
import Clock from './Header/Clock';
import NodeDataList from './NodeDataList';
import Timer from './Timer/Timer';
import * as Styles from './WarTimer.scss';

export default function WarTimer({ className }) {
  const b = useContentBundle(content);

  const onClickAddButton = (domEvent) => {
    // TODO Implement me!
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
        <li>
          <Card>
            <Timer id="0" dataListId={'nodeDataList'} />
          </Card>
        </li>
        <li>
          <Card>
            <Timer id="1" dataListId={'nodeDataList'} />
          </Card>
        </li>
        <li>
          <Card>
            <Timer id="2" dataListId={'nodeDataList'} />
          </Card>
        </li>
        <li>
          <Card>
            <Timer id="3" dataListId={'nodeDataList'} />
          </Card>
        </li>
        <li>
          <Card>
            <Timer id="4" dataListId={'nodeDataList'} />
          </Card>
        </li>
        <li>
          <Card>
            <Timer id="5" dataListId={'nodeDataList'} />
          </Card>
        </li>
        <li>
          <Card>
            <Timer id="6" dataListId={'nodeDataList'} />
          </Card>
        </li>
        <li>
          <Card>
            <Timer id="7" dataListId={'nodeDataList'} />
          </Card>
        </li>
        <li>
          <Card>
            <Timer id="8" dataListId={'nodeDataList'} />
          </Card>
        </li>
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
