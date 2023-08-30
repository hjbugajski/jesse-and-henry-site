import { PayloadContentBlock, PayloadHeroBlock, PayloadSectionBlock } from '@/types/payload';

import ButtonLinkBlock from './ButtonLinkBlock';
import ContentBlock from './ContentBlock';
import HeroBlock from './HeroBlock';
import SectionBlock from './SectionBlock';

const blocks = {
  buttonLink: ButtonLinkBlock,
  content: ContentBlock,
  hero: HeroBlock,
  section: SectionBlock,
};

export function Blocks({ block }: { block: PayloadContentBlock | PayloadHeroBlock | PayloadSectionBlock }) {
  const RenderBlock = blocks[block.blockType];

  // @ts-expect-error block type is correct
  return RenderBlock ? <RenderBlock block={block} /> : null;
}
