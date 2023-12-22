import { cn } from '@/lib/utils/cn';

export default function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'h-4 w-4 animate-spin rounded-full border-2 border-neutral-80/80 border-t-neutral-60/80',
        className,
      )}
    />
  );
}
