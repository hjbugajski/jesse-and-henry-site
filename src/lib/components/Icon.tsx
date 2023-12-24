import { cn } from '@/lib/utils/cn';

export default function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <i aria-hidden className={cn('material-symbols-rounded', className)}>
      {name}
    </i>
  );
}
