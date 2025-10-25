"use client";

import { useCallback, useEffect, useRef } from "react";

export const useDebounce = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debounceFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        console.log("Again Timer")
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  return debounceFunction;
};
