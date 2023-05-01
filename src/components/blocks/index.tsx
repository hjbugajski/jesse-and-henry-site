import { PayloadContentBlock, PayloadHeroTitleBlock } from '@/types/payload';

import ContentBlock from './ContentBlock';
import HeroTitle from './HeroTitle';

const blocks = {
  content: ContentBlock,
  heroTitle: HeroTitle
};

export function Blocks({ block }: { block: PayloadContentBlock | PayloadHeroTitleBlock }) {
  const RenderBlock = blocks[block.blockType];

  // @ts-ignore
  return RenderBlock ? <RenderBlock block={block} /> : null;
}
