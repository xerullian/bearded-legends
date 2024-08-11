import Logger from '@utils/Logger';
import { useEffect } from 'react';

export default function useServiceWorker() {
  const logger = new Logger('userServiceWorker');

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            logger.log(
              'serviceWorker registered with scope:',
              registration.scope,
            );
          })
          .catch((error) => {
            logger.error('Error while registering serviceWorker:', error);
          });
      });
    }
  });
}
