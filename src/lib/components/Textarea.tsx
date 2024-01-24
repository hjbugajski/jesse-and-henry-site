import { TextareaHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'block w-full rounded-lg border-2 border-neutral-50/80 bg-neutral-98 p-3 text-inherit placeholder:text-neutral-variant-60/80 hover:border-neutral-50 hover:bg-neutral-99 focus:bg-neutral-99 focus:outline-none focus:ring-2 focus:ring-neutral-50/50 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export { Textarea };
