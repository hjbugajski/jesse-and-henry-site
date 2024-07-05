import Image from 'next/image';

import { PayloadBlockGallery } from '@/lib/types/payload';

export default function BlockGallery({ images }: PayloadBlockGallery) {
  return (
    <ul className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <li key={image.id} className={image.width > image.height ? 'md:col-span-2' : ''}>
          <Image
            src={image.url}
            width={image.width}
            height={image.height}
            placeholder="blur"
            blurDataURL={image.dataUrl}
            alt={image.alt}
            loading="lazy"
            className="rounded-xl"
          />
        </li>
      ))}
    </ul>
  );
}
