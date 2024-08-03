import useContentBundle from '@hooks/useContentBundle';
import React from 'react';
import content from '../../App.yaml';
import * as Styles from './Logo.scss';

export default function Logo(props) {
  const b = useContentBundle(content);

  return (
    <div className={Styles.Logo}>
      <img alt="" src="/icons/banner-inverted.png"></img>
    </div>
  );
}
