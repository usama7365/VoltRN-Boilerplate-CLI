import { DependencyList, useCallback, useState } from 'react';

export function useAsyncCallback<
  T extends (...args: never[]) => Promise<unknown>,
>(callback: T, deps: DependencyList): [T, boolean] {
  const [isLoading, setLoading] = useState(false);

  const cb = useCallback(async (...argsx: never[]) => {
    setLoading(true);
    try {
      const res = await callback(...argsx);
      return res;
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps) as T;

  return [cb, isLoading];
}
