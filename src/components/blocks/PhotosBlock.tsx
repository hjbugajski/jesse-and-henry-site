import Image from 'next/image';

import { PayloadPhotosBlock } from '@/lib/types/payload';

export default function PhotosBlock({ block }: { block: PayloadPhotosBlock }) {
  const { photos } = block;

  return (
    <ul className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo, i) => (
        <li key={i} className={photo.width > photo.height ? 'md:col-span-2' : ''}>
          <Image
            src={photo.url}
            width={photo.width}
            height={photo.height}
            placeholder="blur"
            blurDataURL={photo.dataUrl}
            alt={photo.alt}
            loading="lazy"
            className="rounded-xl"
          />
        </li>
      ))}
    </ul>
  );
}
