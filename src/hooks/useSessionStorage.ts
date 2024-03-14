import { useEffect, useState } from 'react';

type UseSessionStorageParams<T> = {
  initialValue: T;
  key: string;
  transformValue?: (value: T) => T;
};

export function useSessionStorage<T>({
  initialValue,
  key,
  transformValue,
}: UseSessionStorageParams<T>) {
  const [value, setValue] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const item = window.sessionStorage.getItem(key);

    if (item) {
      const newValue = JSON.parse(item);
      setValue(transformValue ? transformValue(newValue) : newValue);
    }

    setLoaded(true);
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value, loaded]);

  return [value, setValue] as const;
}
