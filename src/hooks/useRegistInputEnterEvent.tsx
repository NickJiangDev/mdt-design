import { useCallback } from 'react';
import useKey from 'react-use/lib/useKey';

const useRegistInputEnterEvent = (
  inputRef: React.RefObject<Element>,
  onPressEnter?: (e: KeyboardEvent) => void,
) => {
  const keyFilter = useCallback(
    (event: KeyboardEvent) => {
      return event.key === 'Enter' && event.target === inputRef.current;
    },
    [inputRef],
  );
  useKey(keyFilter, onPressEnter, undefined, [onPressEnter]);
};

export default useRegistInputEnterEvent;
