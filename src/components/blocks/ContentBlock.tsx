import Serialize from '@/components/Serialize';
import { PayloadContentBlock } from '@/lib/types/payload';

export default function ContentBlock({ block }: { block: PayloadContentBlock }) {
  return (
    <div className={block.width === 'max' ? 'mx-auto w-full max-w-4xl px-4 py-12 md:px-8 md-lg:px-4' : ''}>
      <Serialize nodes={block.content as any} />
    </div>
  );
}
