import { PayloadSectionBlock } from '@/types/payload';
import { classes } from '@/utils/classes';

import Serialize from '../Serialize';

import { Blocks } from '.';

export default function SectionBlock({ block }: { block: PayloadSectionBlock }) {
  const { border, description, id, layout, title } = block;

  const variant = {
    left: 'border-neutral-variant-50/50 border-t border-b md:border-l md:ml-4 pl-4 md:pl-0 pr-4 md:rounded-tl-3xl md:rounded-bl-3xl',
    right:
      'border-neutral-variant-50/50 border-t border-b md:border-r md:mr-4 pr-4 md:pr-0 pl-4 md:rounded-tr-3xl md:rounded-br-3xl',
    none: '',
  };

  return (
    <section className={classes(variant[border])}>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-9 px-4 py-12">
        <div>
          <a
            href={`#${id}`}
            className="block w-fit rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-40/50"
          >
            <h1 id={id} className="mb-6 w-fit text-3xl tracking-wider">
              {title}
            </h1>
          </a>
          {description && <Serialize nodes={description as any} />}
        </div>
        {layout?.map((block, i) => <Blocks key={i} block={block as any} />)}
      </div>
    </section>
  );
}
