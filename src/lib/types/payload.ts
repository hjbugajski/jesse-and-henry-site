export interface PayloadAlertBlock {
  title: string;
  icon: string;
  content: {
    [k: string]: unknown;
  }[];
  alertColor: 'neutral' | 'neutral-variant' | 'primary' | 'secondary' | 'tertiary' | 'danger';
  action?: boolean;
  alertLink?: {
    type: 'reference' | 'external';
    newTab?: boolean;
    text: string;
    reference: PayloadPage;
    url: string;
    icon?: string;
  };
  alertWidth?: 'full' | 'max';
  id?: string;
  blockName?: string;
  blockType: 'alert';
}

export interface PayloadButtonLinkBlock {
  color: 'neutral' | 'neutral-variant' | 'primary' | 'secondary' | 'tertiary' | 'danger';
  link: {
    type: 'reference' | 'external';
    newTab?: boolean;
    text: string;
    reference: PayloadPage;
    url: string;
    icon?: string;
  };
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
  anchorId: string;
  title: string;
  description?: {
    [k: string]: unknown;
  }[];
  border: 'none' | 'left' | 'right';
  layout?: (PayloadAlertBlock | PayloadContentBlock | PayloadButtonLinkBlock)[];
  id?: string;
  blockName?: string;
  blockType: 'section';
}

export interface PayloadPage {
  id: string;
  slug?: string;
  protected?: boolean;
  name: string;
  meta: {
    title: string;
    description: string;
  };
  content: {
    layout?: (PayloadAlertBlock | PayloadContentBlock | PayloadHeroBlock | PayloadSectionBlock)[];
  };
  _status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface PayloadNavMenu {
  id: string;
  links?: {
    link: {
      type: 'reference' | 'external';
      newTab?: boolean;
      text: string;
      reference: PayloadPage;
      url: string;
      icon?: string;
    };
    id?: string;
  }[];
  updatedAt?: string;
  createdAt?: string;
}

export interface PayloadApiMe {
  user: {
    id: string;
    email: string;
    _verified: boolean;
    createdAt: string;
    updatedAt: string;
    _strategy: string;
  };
  collection: string;
  token: string;
  exp: number;
}
