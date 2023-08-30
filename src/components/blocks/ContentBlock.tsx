import { PayloadContentBlock } from '@/types/payload';

import Serialize from '../Serialize';

export default function ContentBlock({ block }: { block: PayloadContentBlock }) {
  return (
    <div className={block.width === 'max' ? 'mx-auto w-full max-w-4xl px-4 py-12' : ''}>
      <Serialize nodes={block.content as any} />
    </div>
  );
}
