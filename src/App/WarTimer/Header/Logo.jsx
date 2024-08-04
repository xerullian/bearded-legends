// import useContentBundle from '@hooks/useContentBundle';
import React from 'react';
// import content from '../../App.yaml';
import * as Styles from './Logo.scss';
import Arrays from '@utils/Arrays';

export default function Logo({ className }) {
  // const b = useContentBundle(content);
  return <div className={Arrays.pack(className, Styles.Logo).join(' ')}></div>;
}
