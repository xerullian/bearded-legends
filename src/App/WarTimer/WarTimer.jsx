import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import React from 'react';
import * as Styles from './WarTimer.scss';
import Clock from './Header/Clock';
import NodeDataList from './NodeDataList';
import Timer from './Timer/Timer';
import useContentBundle from '@hooks/useContentBundle';
import content from '../App.yaml';
import Card from '../../components/Card';

export default function WarTimer({ className }) {
  const b = useContentBundle(content);

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
      <div
        className={Arrays.pack(
          Layout.Flex,
          Layout.JustifyStart,
          Layout.AlignCenter,
          Layout.Wrap,
        ).join(' ')}
      >
        <Card>
          <Timer id="0" dataListId={'nodeDataList'} />
        </Card>
        <Card>
          <Timer id="1" dataListId={'nodeDataList'} />
        </Card>
        <Card>
          <Timer id="2" dataListId={'nodeDataList'} />
        </Card>
        <Card>
          <Timer id="3" dataListId={'nodeDataList'} />
        </Card>
        <Card>
          <Timer id="4" dataListId={'nodeDataList'} />
        </Card>
        <Card>
          <Timer id="5" dataListId={'nodeDataList'} />
        </Card>
        <Card>
          <Timer id="6" dataListId={'nodeDataList'} />
        </Card>
        <Card>
          <Timer id="7" dataListId={'nodeDataList'} />
        </Card>
        <Card>
          <Timer id="8" dataListId={'nodeDataList'} />
        </Card>
        <Card className={Styles.Add}>
          <button type="button">
            <b.AddButtonLabel />
          </button>
        </Card>
      </div>
      <NodeDataList />
    </div>
  );
}
