'use client';

import { useEffect, useState } from 'react';
import { getTimeRemaining } from '@/lib/utils/time';

interface CountdownProps {
  endTime: string;
  onExpire?: () => void;
}

export function Countdown({ endTime, onExpire }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const time = getTimeRemaining(endTime);
      
      if (time.isExpired) {
        onExpire?.();
        return;
      }

      let display = '';
      if (time.days > 0) {
        display = `${time.days}d ${time.hours}h remaining`;
      } else if (time.hours > 0) {
        display = `${time.hours}h ${time.minutes}m remaining`;
      } else {
        display = `${time.minutes}m ${time.seconds}s remaining`;
      }
      
      setTimeLeft(display);
    };

    // Initial update
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTime, onExpire]);

  // Don't render anything until we have a value on the client
  if (!timeLeft) return null;

  return (
    <div className="flex items-center text-sm text-gray-600">
      <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
        <span className="font-medium">{timeLeft}</span>
      </div>
    </div>
  );
}