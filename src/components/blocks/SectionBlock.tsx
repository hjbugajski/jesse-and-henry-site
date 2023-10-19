import Link from 'next/link';

import { Blocks } from '@/components/blocks';
import Serialize from '@/components/Serialize';
import { PayloadSectionBlock } from '@/lib/types/payload';
import { classes } from '@/lib/utils/classes';

export default function SectionBlock({ block }: { block: PayloadSectionBlock }) {
  const { anchorId, border, description, layout, title } = block;

  const variant = {
    left: 'border-neutral-variant-50/50 border-t-2 border-b-2 md:border-l-2 md:ml-4 pl-4 md:pl-0 pr-4 md:rounded-tl-3xl md:rounded-bl-3xl',
    right:
      'border-neutral-variant-50/50 border-t-2 border-b-2 md:border-r-2 md:mr-4 pr-4 md:pr-0 pl-4 md:rounded-tr-3xl md:rounded-br-3xl',
    none: 'px-4',
  };

  return (
    <section className={classes(variant[border])}>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-9 py-12 md:px-4">
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
