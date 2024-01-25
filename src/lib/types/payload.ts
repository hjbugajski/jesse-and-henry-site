// [START] RSVP Fields
export type PayloadRsvpFields = 'rsvpWelcomeParty' | 'rsvpRehearsalDinner' | 'rsvpWeddingDay' | 'rsvpPoolDay';

export type PayloadRsvpStatus = 'accept' | 'decline' | null;
// [END] RSVP Fields

// [START] Payload Fields
export interface PayloadFieldButtonLink extends PayloadFieldLink {
  color: 'neutral' | 'neutral-variant' | 'primary' | 'secondary' | 'tertiary' | 'danger';
}

export interface PayloadFieldLink {
  text: string;
  icon?: string | null;
  type: 'internal' | 'external';
  relationship?: PayloadPage | null;
  anchor?: string | null;
  url?: string | null;
  rel?: 'noreferrer'[] | null;
  newTab?: boolean | null;
}
// [END] Payload Fields

// [START] Payload Blocks
export interface PayloadBlockAlert {
  blockType: 'alert';
  heading: string;
  icon: string;
  color: 'neutral' | 'neutral-variant' | 'primary' | 'secondary' | 'tertiary' | 'danger';
  content?: {
    root: {
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      type: string;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  action: boolean;
  link?: PayloadFieldLink | null;
}

export interface PayloadBlockButtonLink extends PayloadFieldLink {
  blockType: 'buttonLink';
  color: 'neutral' | 'neutral-variant' | 'primary' | 'secondary' | 'tertiary' | 'danger';
}

export interface PayloadBlockGallery {
  blockType: 'gallery';
  images: PayloadMedia[];
}

export interface PayloadBlockHero {
  blockType: 'hero';
  titleOne: string;
  titleTwo: string;
  subtitle: string;
  image: PayloadMedia;
}

export interface PayloadBlockImageLink extends PayloadFieldLink {
  blockType: 'imageLink';
  image: PayloadMedia;
}

export interface PayloadBlockSection {
  blockType: 'section';
  heading?: string;
  border: boolean;
  content?: {
    root: {
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      type: string;
      version: number;
    };
    [k: string]: unknown;
  } | null;
}
// [END] Payload Blocks

// [START] Payload Collections
export interface PayloadGuest {
  id: string;
  first?: string;
  middle?: string;
  last?: string;
  rsvpWelcomeParty?: 'accept' | 'decline';
  rsvpRehearsalDinner?: 'accept' | 'decline';
  rsvpWeddingDay?: 'accept' | 'decline';
  rsvpPoolDay?: 'accept' | 'decline';
  legalName?: string | null;
  dateOfBirth?: string | null;
  countryOfBirth?: string | null;
  allergies?: string | null;
  transportationToVenue?: ('yes' | 'no') | null;
  transportationFromVenue?: ('yes' | 'no') | null;
  updatedAt: string;
  createdAt: string;
}

export interface PayloadMedia {
  id: string;
  alt: string;
  dataUrl: string;
  updatedAt: string;
  createdAt: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  sizes: {
    preview: {
      url: string;
      width: number;
      height: number;
      mimeType: string;
      filesize: number;
      filename: string;
    };
    thumbnail: {
      url: string;
      width: number;
      height: number;
      mimeType: string;
      filesize: number;
      filename: string;
    };
  };
}

export interface PayloadPage {
  id: string;
  title: string;
  description: string;
  content?: {
    root: {
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      type: string;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  slug: string;
  protected: boolean;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}

export interface PayloadParty {
  id: string;
  value: string;
  color?: 'green' | 'teal' | 'cyan' | 'blue' | 'violet' | 'purple' | 'plum' | 'pink' | 'red' | 'orange';
  sort?: number;
  code?: string;
  updatedAt: string;
  createdAt: string;
}

export interface PayloadRelation {
  id: string;
  value: string;
  color?: 'green' | 'teal' | 'cyan' | 'blue' | 'violet' | 'purple' | 'plum' | 'pink' | 'red' | 'orange';
  sort?: number;
  updatedAt: string;
  createdAt: string;
}

export interface PayloadSide {
  id: string;
  value: string;
  color?: 'green' | 'teal' | 'cyan' | 'blue' | 'violet' | 'purple' | 'plum' | 'pink' | 'red' | 'orange';
  sort?: number;
  updatedAt: string;
  createdAt: string;
}

export interface PayloadUser {
  id: string;
  roles: ('admin' | 'public')[];
  updatedAt: string;
  createdAt: string;
  email: string;
}
// [END] Payload Collections

// [START] Payload Globals
export interface PayloadNavigation {
  links?: PayloadFieldLink[] | null;
  showCta?: boolean;
  callToAction?: PayloadFieldButtonLink | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
// [END] Payload Globals

// [START] Payload API
export interface PayloadApi<T = any> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface PayloadApiLogin<T = any> {
  exp: number;
  message: string;
  token: string;
  user: T;
}

export interface PayloadApiLogout {
  message: string;
}

export interface PayloadApiMe<T = any> {
  user: T;
  collection: string;
  token: string;
  exp: number;
}
// [END] Payload API
