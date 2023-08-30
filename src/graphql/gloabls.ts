import { LINK } from './link';

export const GLOBALS = `
  query Globals {
    NavMenu {
      links {
        ${LINK}
      }
    }
  }
`;
