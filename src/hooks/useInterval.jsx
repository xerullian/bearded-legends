import { useState } from 'react';

export default function useInterval({ delay = 1000, strict = false } = {}) {
  const [tid, setTid] = useState(0);
  const [tick, setTick] = useState(false);

  const getDelay = () => {
    const elapsed = Date.now() - tick;

    if (strict) {
      const offset = delay - elapsed;
      return offset > 0 ? offset : 0;
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
