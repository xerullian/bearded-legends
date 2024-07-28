import { useEffect, useState } from 'react';
import stringify from 'json-stable-stringify';

export function useSessionStorage(key, initialValue = null) {
  return useStorage(sessionStorage, key, initialValue);
}

export function useLocalStorage(key, initialValue = null) {
  return useStorage(localStorage, key, initialValue);
}

function useStorage(storage, key, initialValue = null) {
  const [error, setError] = useState();

  const [value, setValue] = useState(() => {
    const string = storage.getItem(key);

    try {
      return string ? JSON.parse(string) : initialValue;
    } catch (e) {
      setError(e);
      storage.removeItem(string);
      return initialValue;
    }
  });

  useEffect(() => {
    if (value === null) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, stringify(value));
    }
  }, [value]);

  return [value, setValue, { error }];
}
