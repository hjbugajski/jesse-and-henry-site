'use client';

import { useState } from 'react';

import { AuthCollection, fetchLogout } from '@/app/actions';
import { Button } from '@/lib/components/Button';
import { Icon } from '@/lib/components/Icon';
import { Spinner } from '@/lib/components/Spinner';
import { useToast } from '@/lib/hooks/use-toast';

export default function LogOutButton({ collection, redirectUrl }: { collection: AuthCollection; redirectUrl: string }) {
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  async function logout() {
    setPending(true);

    const state = await fetchLogout(collection, redirectUrl);

    if (state?.status === 'error') {
      toast({
        title: 'Logout error',
        description: 'There was an error logging out. Refresh the page and try again.',
        variant: 'danger',
      });
    }

    setPending(false);
  }

  return (
    <Button onClick={() => logout()} disabled={pending} size="sm" iconPosition="right">
      Log out
      {pending ? <Spinner /> : <Icon name="logout" />}
    </Button>
  );
}
