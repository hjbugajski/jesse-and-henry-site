export const PAGE = `#graphql
  query Page($slug: String) {
    Pages(where: { slug: { equals: $slug }, _status: { equals: published } }) {
      docs {
        slug
        protected
        meta {
          title
          description
        }
        content {
          layout {
            ... on Alert {
              title
              alertIcon: icon
              content
              alertColor: color
              alertLink: link {
                text
                newTab
                icon
                reference {
                  ... on Page {
                    slug
                  }
                }
                type
                url
              }
              alertWidth: width
              blockType
            }
            ... on Content {
              blockType
              content
              width
            }
            ... on Hero {
              titleOne
              titleTwo
              subtitle
              blockType
            }
            ... on Section {
              anchorId
              title
              description
              border
              layout {
                ... on Alert {
                  title
                  icon
                  content
                  alertColor: color
                  action
                  alertLink: link {
                    text
                    newTab
                    icon
                    reference {
                      ... on Page {
                        slug
                      }
                    }
                    type
                    url
                  }
                  alertWidth: width
                  blockType
                }
                ... on Content {
                  blockType
                  content
                  width
                }
                ... on ButtonLink {
                  color
                  blockType
                  link {
                    text
                    newTab
                    icon
                    reference {
                      ... on Page {
                        slug
                      }
                    }
                    type
                    url
                  }
                }
              }
              blockType
            }
          }
        }
      }
    }
  }
`;

export const PAGES = `#graphql
  query Pages {
    Pages(limit: 500) {
      docs {
        slug
      }
    }
  }
`;
