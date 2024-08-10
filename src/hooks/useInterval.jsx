import { useRef, useState } from 'react';
import Logger from '@utils/Logger';

export default function useInterval({ delay = 1000, strict = false } = {}) {
  const _logger = new Logger('useInterval');
  // const [tid, setTid] = useState(0);
  const tidRef = useRef();
  const lastRef = useRef();
  const [tick, setTick] = useState(false);

  const getDelay = () => {
    const now = Date.now();

    if (lastRef.current) {
      const elapsed = now - lastRef.current;

      lastRef.current = now;

      if (strict) {
        delay -= elapsed;
      }
    }

    return delay - 100;
  };

  const next = () => {
    setTick((x) => !x);
    tidRef.current = setTimeout(next, getDelay());
  };

  const stop = () => {
    clearTimeout(tidRef.current);
    tidRef.current = 0;
  };

  const start = () => {
    stop();
    next();
  };

  return [tick, start, stop];
}
