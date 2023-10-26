import Serialize from '@/components/Serialize';
import { PayloadContentBlock } from '@/lib/types/payload';

export default function ContentBlock({ block }: { block: PayloadContentBlock }) {
  return (
    <div className={block.width === 'max' ? 'mx-auto w-full max-w-5xl px-4 py-12' : ''}>
      <Serialize nodes={block.content as any} />
    </div>
  );
}
