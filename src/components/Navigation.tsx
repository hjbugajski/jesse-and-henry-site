import Link from 'next/link';

import { classes } from '@/utils/classes';

import styles from './Navigation.module.scss';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={classes(styles.title, 'link')}>
        Jesse & Henry
      </Link>
    </nav>
  );
}
