import Link from 'next/link';

import { AppLinkProps } from '@/lib/components/AppLink';
import { Color } from '@/lib/types/color';
import {
  borderColorClass,
  borderColorHoverClass,
  classes,
  focusColorClass,
  textColorClass,
  textColorHoverClass,
} from '@/lib/utils/classes';

export type AbstractButtonProps = (ButtonProps | ButtonLinkProps) & {
  Component: React.ElementType;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  color?: Color;
  iconPosition?: 'left' | 'right' | 'none';
  size?: 'sm' | 'md' | 'lg';
};

export type ButtonLinkProps = AppLinkProps & {
  color?: Color;
  iconPosition?: 'left' | 'right' | 'none';
  size?: 'sm' | 'md' | 'lg';
};

function AbstractButton(props: AbstractButtonProps) {
  const { Component, children, className, color = 'neutral', iconPosition = 'none', size = 'sm', ...rest } = props;
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
    <Component
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
        'flex flex-row items-center justify-center rounded-lg border-2 font-bold transition-all focus:outline-none focus:ring-2',
      )}
    >
      {children}
    </Component>
  );
}

export const Button = (props: ButtonProps) => {
  return (
    <AbstractButton
      {...props}
      Component="button"
      className={classes(
        props.className,
        props.disabled ? 'cursor-not-allowed !border-neutral-80/80 !text-neutral-80/80' : '',
      )}
    />
  );
};

export const ButtonLink = (props: ButtonLinkProps) => <AbstractButton Component={Link} {...props} />;
