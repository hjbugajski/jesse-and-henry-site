import Link from 'next/link';

import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <p>404</p>
        <span className={styles.divider}></span>
        <p>Page not found</p>
      </div>
    </div>
  );
}
