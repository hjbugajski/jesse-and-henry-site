import { InputHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils/cn';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'block h-11 w-full rounded-lg border-2 border-neutral-50/80 bg-neutral-98 px-3 text-inherit placeholder:text-neutral-variant-60/80 hover:border-neutral-50 hover:bg-neutral-99 focus:bg-neutral-99 focus:outline-none focus:ring-2 focus:ring-neutral-50/50 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
