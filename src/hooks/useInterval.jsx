import { useState } from 'react';

export default function useInterval({ delay = 1000, strict = false } = {}) {
  const [tid, setTid] = useState(0);
  const [tick, setTick] = useState(false);

  const getDelay = () => {
    if (strict) {
      const offset = Date.now() % delay;
      return delay - offset;
    }

    return delay;
  };

  const next = () => {
    setTick((x) => !x);
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
