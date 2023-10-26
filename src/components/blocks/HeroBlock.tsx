import Image from 'next/image';

import { PayloadHeroBlock } from '@/lib/types/payload';

export default function HeroBlock({ block: { titleOne, titleTwo, subtitle, image } }: { block: PayloadHeroBlock }) {
  return (
    <div className="mx-auto w-full max-w-7xl md:px-4">
      <div className="relative flex h-[768px] w-full justify-center overflow-clip sm:h-[1024px] md:justify-start md:rounded-3xl lg:h-[825px]">
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          placeholder="blur"
          blurDataURL={image.dataUrl}
          loading="eager"
          className="w-full object-cover object-center"
        />
        <div className="absolute top-4 flex h-fit w-full max-w-xs flex-1 flex-col items-center justify-center gap-6 rounded-xl bg-neutral-variant-90/75 p-6 text-center backdrop-blur-sm md:left-8 md:top-8 md:p-8">
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <h1 className="text-5xl tracking-[0.5rem]">{titleOne}</h1>
            <div className="flex w-full flex-row items-center justify-center gap-8 font-serif text-3xl">
              <span className="w-full border-t border-t-neutral-10/80" />
              &
              <span className="w-full border-t border-t-neutral-10/80" />
            </div>
            <h1 className="text-5xl tracking-[0.5rem]">{titleTwo}</h1>
          </div>
          <p>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
