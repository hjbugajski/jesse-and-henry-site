import { PayloadHeroTitleBlock } from '@/types/payload';

import styles from './HeroTitle.module.scss';

export default function HeroTitle({ block: { titleOne, titleTwo, subtitle } }: { block: PayloadHeroTitleBlock }) {
  return (
    <div className={styles.hero}>
      <div className={styles.heroInnerContainer}>
        <h1>{titleOne}</h1>
        <div className={styles.heroDivider}>
          <span className={styles.divider}></span>&<span className={styles.divider}></span>
        </div>
        <h1>{titleTwo}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
