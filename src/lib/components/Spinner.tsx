import { HTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils/cn';

const Spinner = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('h-4 w-4 animate-spin rounded-full border-2 border-neutral-80/80 border-t-neutral-60/80', className)}
    {...props}
  />
));
Spinner.displayName = 'Spinner';

export { Spinner };
