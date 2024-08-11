import Arrays from '@utils/Arrays';
import React from 'react';
import * as Styles from './Logo.scss';

export default function Logo({ className }) {
  return <div className={Arrays.pack(className, Styles.Logo).join(' ')}></div>;
}
