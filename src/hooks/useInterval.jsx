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
