import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import React from 'react';
import useSwipe from '../hooks/useSwipe';
import * as Styles from './Card.scss';

export default function Card({ className, children }) {
  const [swipeRef, swipe] = useSwipe();

  const frontChildren = React.Children.toArray(children).filter(
    (child) => child.type !== SlideIn,
  );

  const slideInChildren = React.Children.toArray(children).filter(
    (child) => child.type === SlideIn,
  );

  return (
    <div
      className={Arrays.pack(
        className,
        Styles.Card,
        Layout.FlexRow,
        Layout.JustifySpaceBetween,
        Layout.AlignStart,
        swipe === 'left' && Styles.Open,
      ).join(' ')}
      ref={swipeRef}
    >
      <div
        className={Arrays.pack(
          Styles.Front,
          swipe === 'left' && Styles.Collapse,
        ).join(' ')}
      >
        {frontChildren}
      </div>

      <div
        className={Arrays.pack(
          Styles.SlideIn,
          swipe === 'left' && Styles.Open,
        ).join(' ')}
      >
        {slideInChildren}
      </div>
    </div>
  );
}

Card.SlideIn = SlideIn;

export function SlideIn({ children }) {
  return children;
}
