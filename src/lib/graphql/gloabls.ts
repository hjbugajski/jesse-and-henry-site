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
        id
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
    Config {
      rsvpDeadline
    }
  }
`;
