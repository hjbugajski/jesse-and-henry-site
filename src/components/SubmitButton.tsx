'use client';

import { useFormStatus } from 'react-dom';

import { Button } from '@/lib/components/Button';
import Spinner from '@/lib/components/Spinner';

export default function SubmitButton({ children, className }: { children?: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} size="lg" variant="solid" className={className}>
      {pending ? <Spinner /> : children || 'Submit'}
    </Button>
  );
}
