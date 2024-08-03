import * as layout from '@styles/Layout.scss';
import React from 'react';

export default function Flex({ children }) {
  return <div className={layout.Flex}>{children}</div>;
}
