export interface PayloadButtonLinkBlock {
  text: string;
  icon?: string;
  color: 'neutral' | 'neutral-variant' | 'primary' | 'secondary' | 'tertiary' | 'danger';
  type: 'reference' | 'external';
  newTab?: boolean;
  reference: PayloadPage;
  url: string;
  id?: string;
  blockName?: string;
  blockType: 'buttonLink';
}

export interface PayloadContentBlock {
  width?: 'full' | 'max';
  content: {
    [k: string]: unknown;
  }[];
  id?: string;
  blockName?: string;
  blockType: 'content';
}

export interface PayloadHeroBlock {
  titleOne: string;
  titleTwo: string;
  subtitle: string;
  id?: string;
  blockName?: string;
  blockType: 'hero';
}

export interface PayloadSectionBlock {
  id: string;
  title: string;
  description?: {
    [k: string]: unknown;
  }[];
  border: 'none' | 'left' | 'right';
  layout?: (PayloadContentBlock | PayloadButtonLinkBlock)[];
  blockName?: string;
  blockType: 'section';
}

export interface PayloadPage {
  id: string;
  name: string;
  slug?: string;
  meta: {
    title: string;
    description: string;
  };
  content: {
    layout?: (PayloadContentBlock | PayloadHeroBlock | PayloadSectionBlock)[];
  };
  _status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface PayloadNavMenu {
  id: string;
  links?: {
    type: 'reference' | 'external';
    newTab?: boolean;
    text: string;
    reference: PayloadPage;
    url: string;
    id?: string;
  }[];
  updatedAt?: string;
  createdAt?: string;
}
