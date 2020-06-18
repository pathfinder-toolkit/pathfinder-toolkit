import { useEffect, useRef } from 'react';

export const useTimer = (callback, delay, deps = []) => {
  const lastRan = useRef(Date.now());

  useEffect(
    () => {
      const handler = setTimeout(function() {
        if (Date.now() - lastRan.current >= delay) {
          callback();
          lastRan.current = Date.now();
        }
      }, delay - (Date.now() - lastRan.current));

      return () => {
        clearTimeout(handler);
      };
    },
    [delay, ...deps],
  );
};

export default useTimer;