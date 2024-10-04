'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom hook that sets up an interval to repeatedly call a callback function.
 * @param callback - The function to be called at each interval.
 * @param delay - The delay in milliseconds between each interval.
 */
export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
