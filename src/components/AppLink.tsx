import Link, { LinkProps } from 'next/link';

import { classes } from '@/utils/classes';

export type AppLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
};

export default function AppLink(props: AppLinkProps) {
  const { className, children } = props;

  return (
    <Link
      {...props}
      className={classes(
        className,
        'flex flex-row items-center gap-2 rounded transition-all hover:text-primary-40 focus:outline-none focus:ring-2 focus:ring-primary-40/50 focus:ring-opacity-75',
      )}
    >
      {children}
    </Link>
  );
}
