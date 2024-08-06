import { useState } from 'react';

export default function useInterval({
  delay = 1000,
  strict = false,
  onTheMinute,
} = {}) {
  const [tid, setTid] = useState(0);
  const [tick, setTick] = useState(false);

  const getDelay = () => {
    const now = new Date();
    const elapsed = now.getTime() - tick;

    if (onTheMinute) {
      // This gets relatively close to firing the event when the second hand
      // hits 0 on the clock, but on my machine, it is consistently late by
      // roughly 50ms. This is close enough for now.
      return delay - now.getUTCMilliseconds();
    }

    if (strict) {
      return delay - elapsed;
    }

    return delay;
  };

  const next = () => {
    setTick(Date.now());
    setTid(setTimeout(next, getDelay()));
  };

  const stop = () => {
    clearTimeout(tid);
    setTid(0);
  };

  const start = () => {
    stop();
    next();
  };

  return [tick, start, stop];
}
