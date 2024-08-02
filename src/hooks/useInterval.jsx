import { useState } from 'react';

export default function useInterval({ delay = 1000, strict = false } = {}) {
  const [tid, setTid] = useState(0);
  const [tick, setTick] = useState(false);

  const getDelay = () => {
    if (strict) {
      return delay - (Date.now() % delay);
    }

    return delay;
  };

  const next = () => {
    setTick((x) => !x);

    setTid(
      setTimeout(() => {
        next();
      }, getDelay()),
    );
  };

  const stop = () => {
    clearTimeout(tid);
  };

  const start = () => {
    clearTimeout(tid);
    next();
  };

  return [tick, start, stop];
}
