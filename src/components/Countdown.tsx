'use client';

import React, { useEffect, useState } from 'react';

import { DateTime, Interval } from 'luxon';

import { Icon } from '@/lib/components/Icon';

interface ConstructedInterval {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [interval, setInterval] = useState<ConstructedInterval>(constructInterval());

  const allZeros = isNaN(interval.days) && isNaN(interval.hours) && isNaN(interval.minutes) && isNaN(interval.seconds);

  function constructInterval(): ConstructedInterval {
    const interval = Interval.fromDateTimes(
      DateTime.now(),
      DateTime.fromISO('2024-07-26T18:30:00.000+02:00'),
    ).toDuration(['days', 'hours', 'minutes', 'seconds']);

    return {
      days: interval.days,
      hours: interval.hours,
      minutes: interval.minutes,
      seconds: interval.seconds,
    };
  }

  useEffect(() => {
    const timeout = setTimeout(() => setInterval(constructInterval()), 1000);

    return () => clearTimeout(timeout);
  });

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Icon name={allZeros ? 'hourglass_bottom' : 'hourglass_top'} className="text-3xl text-neutral-variant-30" />
      <dl className="grid grid-cols-4 items-center justify-center gap-4">
        {Object.entries(interval).map(([key, value], i) => (
          <div key={i} className="flex flex-col-reverse items-center justify-center gap-1">
            <dt className="text-xs text-neutral-variant-30/80">{key}</dt>
            <dd className="text-xl text-neutral-variant-30" suppressHydrationWarning>
              {isNaN(value) ? 0 : value.toFixed()}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
