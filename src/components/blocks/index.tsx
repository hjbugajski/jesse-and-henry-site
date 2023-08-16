import { PayloadHeroBlock } from '@/types/payload';

import Hero from './Hero';

const blocks = {
  hero: Hero,
};

export function Blocks({ block }: { block: PayloadHeroBlock }) {
  const RenderBlock = blocks[block.blockType];

  return RenderBlock ? <RenderBlock block={block} /> : null;
}
