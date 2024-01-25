import Link from 'next/link';

import Serialize from '@/components/Serialize';
import { PayloadBlockSection } from '@/lib/types/payload';
import { cn } from '@/lib/utils/cn';
import { slugify } from '@/lib/utils/slugify';

export default function BlockSection({ border, content, heading }: PayloadBlockSection) {
  return (
    <section
      className={cn(
        border && 'border-b-2 border-t-2 border-neutral-variant-50/50 xl:rounded-3xl xl:border-2',
        'mx-auto w-full max-w-7xl',
      )}
    >
      <div className="mx-auto w-full max-w-5xl px-4 py-12">
        {heading && (
          <Link
            href={`#${slugify(heading)}`}
            className="mb-6 block w-fit rounded-md no-underline focus:outline-none focus:ring-2 focus:ring-neutral-40/50"
          >
            <h1 id={slugify(heading)} className="w-fit text-3xl tracking-wider">
              {heading}
            </h1>
          </Link>
        )}
        {content && <Serialize nodes={content.root.children!} />}
      </div>
    </section>
  );
}
