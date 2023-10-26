import Link from 'next/link';

import { Blocks } from '@/components/blocks';
import Serialize from '@/components/Serialize';
import { PayloadSectionBlock } from '@/lib/types/payload';
import { classes } from '@/lib/utils/classes';

export default function SectionBlock({ block }: { block: PayloadSectionBlock }) {
  const { anchorId, border, description, layout, title } = block;

  return (
    <section
      className={classes(
        border && 'border-b-2 border-t-2 border-neutral-variant-50/50 xl:rounded-3xl xl:border-2',
        'mx-auto w-full max-w-7xl',
      )}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-9 px-4 py-12">
        <div>
          <Link
            href={`#${anchorId}`}
            className="block w-fit rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-40/50"
          >
            <h1 id={anchorId} className="mb-6 w-fit text-3xl tracking-wider">
              {title}
            </h1>
          </Link>
          {description && <Serialize nodes={description as any} />}
        </div>
        {layout?.map((block, i) => <Blocks key={i} block={block as any} />)}
      </div>
    </section>
  );
}
