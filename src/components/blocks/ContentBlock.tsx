import { PayloadContentBlock } from '@/types/payload';

import classes from './ContentBlock.module.scss';
import Serialize from '../Serialize';

export default function ContentBlock({ block }: { block: PayloadContentBlock }) {
  return (
    <div className={classes.container}>
      <Serialize nodes={block.content as any} />
    </div>
  );
}
