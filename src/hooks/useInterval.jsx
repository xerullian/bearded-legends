import { useRef, useState } from 'react';
import Logger from '@utils/Logger';

export default function useInterval({ delay = 1000, strict = false } = {}) {
  const _logger = new Logger('useInterval');
  const tidRef = useRef();
  const lastRef = useRef();
  const [tick, setTick] = useState(false);

  const getDelay = () => {
    const now = Date.now();

    if (lastRef.current) {
      lastRef.current = now;

      if (strict) {
        const elapsed = now - lastRef.current;
        const lag = elapsed - delay;

        // More time has passed since the last task execution than the
        // specified delay. Compensate the next task execution so it is
        // more likely to be on time.

        if (lag > 0) {
          delay -= 2 * lag;
        } else {
          delay -= lag;
        }
      }
    }

    return delay - 100; //FIXME Better way to handle the first time execution
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
