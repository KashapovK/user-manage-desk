import { useEffect, useRef } from 'react';

export function useSuccessPopup(onTimeout: () => void) {
  const timerRef = useRef<number | null>(null);

  const startTimer = () => {
    timerRef.current = window.setTimeout(() => {
      onTimeout();
      timerRef.current = null;
    }, 4000);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return { startTimer, clearTimer };
}
