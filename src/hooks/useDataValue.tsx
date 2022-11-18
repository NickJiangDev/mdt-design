import { useRef, useCallback } from 'react';

export type DataValueCallback = (val: string, e: React.MouseEvent) => void;
const useDataValue = (callback?: DataValueCallback) => {
  const ref = useRef<DataValueCallback>();
  ref.current = callback;

  const action = useCallback((e: React.MouseEvent) => {
    const value = e.currentTarget.getAttribute('data-value');
    ref.current && ref.current(value as string, e);
  }, []);

  return action;
};
export default useDataValue;
