import Link from 'next/link';

import { Color } from '@/types/color';
import {
  borderColorClass,
  borderColorHoverClass,
  classes,
  focusColorClass,
  textColorClass,
  textColorHoverClass,
} from '@/utils/classes';

import { AppLinkProps } from './AppLink';

export type ButtonLinkProps = AppLinkProps & {
  color?: Color;
  iconPosition?: 'left' | 'right' | 'none';
  size?: 'sm' | 'md' | 'lg';
};

export function ButtonLink(props: ButtonLinkProps) {
  const { children, className, color = 'neutral', iconPosition = 'none', size = 'sm', ...rest } = props;
  const iconClass = {
    left: {
      sm: 'pl-2 pr-3',
      md: 'pl-3 pr-4',
      lg: 'pl-4 pr-5',
    },
    right: {
      sm: 'pl-3 pr-2',
      md: 'pl-4 pr-3',
      lg: 'pl-5 pr-4',
    },
    none: {
      sm: 'px-3',
      md: 'px-4',
      lg: 'px-5',
    },
  };
  const sizeClass = {
    sm: 'h-7 text-xs gap-1',
    md: 'h-9 text-sm gap-1',
    lg: 'h-11 text-base gap-2',
  };

  return (
    <Link
      {...rest}
      className={classes(
        className,
        borderColorClass[color],
        borderColorHoverClass[color],
        focusColorClass[color],
        iconClass[iconPosition][size],
        sizeClass[size],
        textColorClass[color],
        textColorHoverClass[color],
        'flex flex-row items-center justify-center rounded-md border font-bold transition-all focus:outline-none focus:ring-2',
      )}
    >
      {children}
    </Link>
  );
}
