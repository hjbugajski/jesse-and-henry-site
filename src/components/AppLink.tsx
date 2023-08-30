import Link, { LinkProps } from 'next/link';

import { Color } from '@/types/color';
import { classes, focusColorClass, textColorClass, textColorHoverClass } from '@/utils/classes';

export type AppLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  color?: Color;
  rel?: string;
  target?: string;
};

export default function AppLink(props: AppLinkProps) {
  const { className, children, color = 'neutral', ...rest } = props;

  return (
    <Link
      {...rest}
      className={classes(
        className,
        textColorClass[color],
        textColorHoverClass[color],
        focusColorClass[color],
        'inline-flex flex-row items-center gap-2 rounded-md transition-all focus:outline-none focus:ring-2',
      )}
    >
      {children}
    </Link>
  );
}
