import { classes } from '@/utils/classes';

import AppLink, { AppLinkProps } from './AppLink';

export default function ButtonLink(props: AppLinkProps) {
  const { children, className } = props;

  return (
    <AppLink
      {...props}
      className={classes(
        className,
        'flex h-7 flex-row items-center gap-2 border px-3 transition-all hover:border-primary-40 hover:text-primary-40',
      )}
    >
      {children}
    </AppLink>
  );
}
