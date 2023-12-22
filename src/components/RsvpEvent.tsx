'use client';

import { useCallback, useState } from 'react';

import * as RadioGroup from '@radix-ui/react-radio-group';

import { fetchGuestRsvp } from '@/lib/api';
import { Button } from '@/lib/components/Button';
import { FieldSet, Legend } from '@/lib/components/FormField';
import Icon from '@/lib/components/Icon';
import Spinner from '@/lib/components/Spinner';
import { PayloadGuest } from '@/lib/types/payload';
import { cn } from '@/lib/utils/cn';

import { Event } from './RsvpForm';

export default function RsvpEvent({ event, guest }: { event: Event; guest: PayloadGuest }) {
  const [value, setValue] = useState<'accept' | 'decline' | undefined>(guest[event.field] || undefined);
  const [pending, setPending] = useState(false);

  const accepted = value === 'accept';
  const declined = value === 'decline';

  const onValueChange = useCallback(
    async (status: 'accept' | 'decline') => {
      if (status === value) {
        return;
      }

      setPending(true);

      const prev = value;

      await fetchGuestRsvp(guest.id, event.field, status || null)
        .then(() => setValue(status))
        .catch(() => setValue(prev))
        .finally(() => setPending(false));
    },
    [event.field, guest.id, value],
  );

  return (
    <FieldSet className="space-y-2">
      <Legend className="text-sm">
        <div className="font-sans font-bold normal-case text-neutral-10/80">
          {event.name} &ndash; {event.date}
        </div>
        {event.description}
      </Legend>
      <RadioGroup.Root className="grid grid-cols-2 gap-2" value={value} onValueChange={onValueChange}>
        <Button
          asChild
          color={accepted ? 'secondary' : 'neutral'}
          size="lg"
          className={cn(
            'w-full text-sm [&>.material-symbols-rounded]:text-base',
            accepted && !pending && 'bg-secondary-90/50',
          )}
        >
          <RadioGroup.Item value="accept">
            {pending && <Spinner className="h-3 w-3" />}
            {!pending && accepted && <Icon name="check_circle" />}
            {!pending && (accepted ? 'Accepted' : 'Accept')}
          </RadioGroup.Item>
        </Button>
        <Button
          asChild
          color={declined ? 'danger' : 'neutral'}
          size="lg"
          className={cn('w-full', declined && !pending && 'bg-danger-90/50')}
        >
          <RadioGroup.Item value="decline">
            {pending && <Spinner className="h-3 w-3" />}
            {!pending && declined && <Icon name="cancel" />}
            {!pending && (declined ? 'Declined' : 'Decline')}
          </RadioGroup.Item>
        </Button>
      </RadioGroup.Root>
    </FieldSet>
  );
}
