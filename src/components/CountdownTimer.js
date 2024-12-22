'use client';

import { useState, useEffect } from 'react';
import { getTimeRemaining } from '@/utils/discountCookies';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(getTimeRemaining());
    
    const timer = setInterval(() => {
      const remaining = getTimeRemaining();
      if (!remaining) {
        clearInterval(timer);
      }
      setTimeLeft(remaining);
    }, 1000 * 60); // Update every minute

    return () => clearInterval(timer);
  }, []);

  if (!isMounted || !timeLeft) return null;

  return (
    <div className="inline-block bg-blue-600/30 text-blue-200 px-6 py-2 rounded-full text-sm">
      🕒 Special pricing ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
    </div>
  );
}
