import { PayloadHeroBlock } from '@/types/payload';

export default function HeroBlock({ block: { titleOne, titleTwo, subtitle } }: { block: PayloadHeroBlock }) {
  return (
    <div className="md:ml-4">
      <div className="flex h-[768px] w-full justify-center bg-[url('../../public/images/cover.jpeg')] bg-cover bg-center p-4 sm:h-[1024px] md:justify-start md:rounded-bl-3xl md:rounded-tl-3xl md:p-8 lg:h-[825px]">
        <div className="flex h-fit w-full max-w-xs flex-1 flex-col items-center justify-center gap-6 rounded-xl bg-neutral-variant-90/75 p-6 text-center backdrop-blur-sm md:p-8">
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
