'use client';

import { useState, useEffect, useCallback } from 'react';
import { getTimeRemaining } from '@/utils/discountCookies';

const formatTimeUnit = (value) => {
  if (typeof value !== 'number') return '00';
  return value.toString().padStart(2, '0');
};

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const updateTime = useCallback(() => {
    try {
      const remaining = getTimeRemaining();
      if (remaining && typeof remaining === 'object') {
        // Ensure all required properties exist and are numbers
        const validatedTime = {
          days: Number(remaining.days) || 0,
          hours: Number(remaining.hours) || 0,
          minutes: Number(remaining.minutes) || 0,
          seconds: Number(remaining.seconds) || 0
        };
        setTimeLeft(validatedTime);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating countdown:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    if (!updateTime()) return;

    // Update every second for a smoother countdown
    const timer = setInterval(() => {
      if (!updateTime()) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [updateTime]);

  if (!isMounted || !timeLeft) return null;

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div 
      className="inline-flex items-center gap-2 bg-[rgb(0,122,255)]/10 dark:bg-[rgb(10,132,255)]/10 text-[rgb(0,122,255)] dark:text-[rgb(10,132,255)] px-6 py-2 rounded-full text-sm animate-fade-in"
      role="timer"
      aria-label="Special pricing countdown timer"
    >
      <span className="sr-only">Special pricing ends in:</span>
      <span aria-hidden="true">🕒</span>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center">
          <span className="font-mono font-bold">{formatTimeUnit(days)}</span>
          <span className="text-xs opacity-70">{days === 1 ? 'day' : 'days'}</span>
        </div>
        <span aria-hidden="true">:</span>
        <div className="flex flex-col items-center">
          <span className="font-mono font-bold">{formatTimeUnit(hours)}</span>
          <span className="text-xs opacity-70">{hours === 1 ? 'hour' : 'hours'}</span>
        </div>
        <span aria-hidden="true">:</span>
        <div className="flex flex-col items-center">
          <span className="font-mono font-bold">{formatTimeUnit(minutes)}</span>
          <span className="text-xs opacity-70">{minutes === 1 ? 'min' : 'mins'}</span>
        </div>
        <span aria-hidden="true">:</span>
        <div className="flex flex-col items-center">
          <span className="font-mono font-bold">{formatTimeUnit(seconds)}</span>
          <span className="text-xs opacity-70">{seconds === 1 ? 'sec' : 'secs'}</span>
        </div>
      </div>
    </div>
  );
}
