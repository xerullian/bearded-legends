import { useEffect, useRef, useState } from 'react';

const DEFAULT_MIN_SWIPE_DISTANCE = 30;

export default function useSwipe(
  minSwipeDistance = DEFAULT_MIN_SWIPE_DISTANCE,
) {
  const [swipe, setSwipe] = useState(null);
  const [start, setStart] = useState({});
  const [end, setEnd] = useState({});
  const ref = useRef(null);

  function onTouchStart(domEvent) {
    const { pageX, pageY } = domEvent.changedTouches[0];
    setStart({ pageX, pageY });
  }

  function onTouchEnd(domEvent) {
    const { pageX, pageY } = domEvent.changedTouches[0];
    setEnd({ pageX, pageY });
  }

  useEffect(() => {
    const x = end.pageX - start.pageX;
    const y = end.pageY - start.pageY;
    const absX = Math.abs(x);
    const absY = Math.abs(y);

    if (absX > absY && absX > minSwipeDistance) {
      if (x < 0) {
        setSwipe('left');
      } else {
        setSwipe('right');
      }
    } else if (absX < absY && absY > minSwipeDistance) {
      if (y < 0) {
        setSwipe('up');
      } else {
        setSwipe('down');
      }
    }
  }, [end]);

  useEffect(() => {
    const el = ref.current;

    if (el) {
      el.addEventListener('touchstart', onTouchStart, { passive: true });
      el.addEventListener('touchend', onTouchEnd, { passive: true });
    }

    return () => {
      if (el) {
        el.removeEventListener('touchstart', onTouchStart);
        el.removeEventListener('touchend', onTouchEnd);
      }
    };
  }, []);

  return [ref, swipe];
}
