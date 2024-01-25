export const GLOBALS = `#graphql
  query Globals {
    Navigation {
      links {
        text
        icon
        type
        relationship {
          slug
        }
        anchor
        url
        rel
        newTab
      }
      showCta
      callToAction {
        text
        icon
        type
        relationship {
          slug
        }
        anchor
        url
        rel
        newTab
        color
      }
    }
  }
`;
