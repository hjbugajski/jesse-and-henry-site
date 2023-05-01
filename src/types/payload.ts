export interface PayloadContentBlock {
  content: {
    [k: string]: unknown;
  }[];
  id?: string;
  blockName?: string;
  blockType: 'content';
}

export interface PayloadHeroTitleBlock {
  titleOne: string;
  titleTwo: string;
  subtitle: string;
  id?: string;
  blockName?: string;
  blockType: 'heroTitle';
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
    layout?: (PayloadContentBlock | PayloadHeroTitleBlock)[];
  };
  _status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}
