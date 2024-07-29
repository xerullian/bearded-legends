import { useState } from 'react';

export default function useInterval(delay = 1000) {
  const [tick, setTick] = useState(0);

  const next = () => {
    return setTick(setTimeout(next, delay));
  };

  const stop = () => {
    if (tick) {
      clearTimeout(tick);
      setTick(0);
    }
  };

  const start = () => {
    stop();
    next();
  };

  return [tick, start, stop];
}
