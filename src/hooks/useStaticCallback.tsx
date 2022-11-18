import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StaticCallback = (...args: any) => void;
const useStaticCallback = (callback: StaticCallback) => {
  const ref = useRef<StaticCallback>();
  ref.current = callback;

  const action = useCallback((...args) => {
    ref.current && ref.current(...args);
  }, []);

  return action;
};

export default useStaticCallback;
