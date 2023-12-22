import { FieldsetHTMLAttributes, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, forwardRef } from 'react';

import { cn } from '../utils/cn';

const FieldSet = forwardRef<HTMLFieldSetElement, FieldsetHTMLAttributes<HTMLFieldSetElement>>(
  ({ className, ...props }, ref) => <fieldset ref={ref} {...props} className={cn('space-y-1', className)} />,
);
FieldSet.displayName = 'FieldSet';

const Legend = forwardRef<HTMLLegendElement, HTMLAttributes<HTMLLegendElement>>(({ className, ...props }, ref) => (
  <legend ref={ref} {...props} className={cn('text-xs text-neutral-variant-30/80', className)} />
));
Legend.displayName = 'Legend';

const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(({ className, ...props }, ref) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label ref={ref} {...props} className={cn('text-xs text-neutral-variant-30/80', className)} />
));
Label.displayName = 'Label';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    {...props}
    className={cn(
      'block h-11 w-full rounded-lg border-2 border-neutral-50/80 bg-neutral-98 px-3 text-inherit placeholder:text-neutral-variant-60/80 hover:border-neutral-50 hover:bg-neutral-99 focus:bg-neutral-99 focus:outline-none focus:ring-2 focus:ring-neutral-50/50',
      className,
    )}
  />
));
Input.displayName = 'Input';

const Message = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} {...props} className={cn('text-xs text-neutral-variant-30/80', className)} />
  ),
);
Message.displayName = 'Message';

export { FieldSet, Legend, Label, Input, Message };
