import useSwipe from '@hooks/useSwipe';
import * as Layout from '@styles/Layout.scss';
import Arrays from '@utils/Arrays';
import React, { useEffect, useState } from 'react';
import * as Styles from './Card.scss';

export default function Card({ className, children }) {
  const [swipeRef, swipe] = useSwipe();
  const [edit, setEdit] = useState(false);

  const frontChildren = React.Children.toArray(children).filter(
    (child) => child.type !== SlideIn,
  );

  const slideInChildren = React.Children.toArray(children).filter(
    (child) => child.type === SlideIn,
  );

  useEffect(() => {
    setEdit(swipe === 'left');
  }, [swipe]);

  return (
    <div
      className={Arrays.pack(className, Styles.Card, edit && Styles.Flip).join(
        ' ',
      )}
      ref={swipeRef}
    >
      <div
        className={Arrays.pack(
          Styles.Content,
          Layout.FlexRow,
          Layout.JustifySpaceBetween,
          Layout.AlignStart,
        ).join(' ')}
      >
        <div
          className={Arrays.pack(Styles.Front, edit && Styles.Collapse).join(
            ' ',
          )}
        >
          {frontChildren}
        </div>

        <div
          className={Arrays.pack(
            Styles.SlideIn,
            Layout.FlexRow,
            Layout.JustifyEnd,
            edit && Styles.Open,
          ).join(' ')}
        >
          {slideInChildren}
        </div>
      </div>
    </div>
  );
}

Card.SlideIn = SlideIn;

function SlideIn({ className, children }) {
  return <div className={Arrays.pack(className).join(' ')}>{children}</div>;
}
