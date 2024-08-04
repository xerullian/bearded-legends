import * as Layout from '@styles/Layout.scss';
import { pack } from '@utils/Arrays';
import React from 'react';
import * as Styles from './GuildWars.scss';
import Clock from './Header/Clock';
import Logo from './Header/Logo';
import NodeDataList from './NodeDataList';
import Timer from './Timer/Timer';
import useContentBundle from '@hooks/useContentBundle';
import content from '../App.yaml';
import Card from '../../components/Card';

export default function GuildWars({ className }) {
  const b = useContentBundle(content);

  return (
    <div className={pack(className, Styles.GuildWars).join(' ')}>
      <div className={Layout.FlexCenter}>
        <div>
          <div className={pack(Layout.FlexCenter, Layout.NoWrap).join(' ')}>
            <Logo />
            <Clock className={Styles.Clock} />
          </div>
          <div className={Layout.TextCenter}>
            <b.GuildNameDecorative />
          </div>
        </div>
      </div>
      <div className={pack(Layout.FlexStart, Layout.Wrap).join(' ')}>
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
