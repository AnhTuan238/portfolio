import { useState, useEffect, useRef } from "react";

export const useSmartLoading = (
  isLoading: boolean,
  delay = 200,
  minDisplay = 400,
) => {
  const [show, setShow] = useState(false);
  const shownAt = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (isLoading) {
      timerRef.current = setTimeout(() => {
        setShow(true);
        shownAt.current = Date.now();
      }, delay);
    } else {
      if (!shownAt.current) return;

      const elapsed = Date.now() - shownAt.current;
      const remaining = minDisplay - elapsed;

      if (remaining > 0) {
        timerRef.current = setTimeout(() => {
          setShow(false);
          shownAt.current = null;
        }, remaining);
      } else {
        setShow(false);
        shownAt.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isLoading, delay, minDisplay]);

  return show;
};
