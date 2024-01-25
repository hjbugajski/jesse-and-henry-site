import { HTMLProps, forwardRef } from 'react';

import { cn } from '@/lib/utils/cn';

import { IconBorgoCorsignano } from './IconBorgoCorsignano';

const customIcons: Record<string, any> = {
  borgo_corsignano: IconBorgoCorsignano,
};

interface IconProps extends HTMLProps<HTMLElement> {
  name: string;
}

const Icon = forwardRef<HTMLElement, IconProps>(({ className, name, ...props }, ref) => {
  const CustomIcon = customIcons[name];

  if (CustomIcon) {
    return <CustomIcon ref={ref} className={cn(className)} {...props} />;
  }

  return (
    <i ref={ref} aria-hidden className={cn('material-symbols-rounded', className)} {...props}>
      {name}
    </i>
  );
});
Icon.displayName = 'Icon';

export { Icon };
