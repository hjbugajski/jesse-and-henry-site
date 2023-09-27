export const PAGE = `#graphql
  query Page($slug: String) {
    Pages(where: { slug: { equals: $slug}, _status: { equals: published } }) {
      docs {
        slug
        name
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
                  relationTo
                  value {
                    ... on Page {
                      slug
                    }
                    ... on ProtectedPage {
                      slug
                    }
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
            ...on Hero {
              titleOne
              titleTwo
              subtitle
              blockType
            }
            ...on Section {
              id
              title
              description
              border
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
                      relationTo
                      value {
                        ... on Page {
                          slug
                        }
                        ... on ProtectedPage {
                          slug
                        }
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
                  icon
                  color
                  blockType
                  link {
                    text
                    newTab
                    icon
                    reference {
                      relationTo
                      value {
                        ... on Page {
                          slug
                        }
                        ... on ProtectedPage {
                          slug
                        }
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

export const PROTECTED_PAGE = `#graphql
  query ProtectedPage($slug: String) {
    ProtectedPages(where: { slug: { equals: $slug}, _status: { equals: published } }) {
      docs {
        slug
        name
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
                  relationTo
                  value {
                    ... on Page {
                      slug
                    }
                    ... on ProtectedPage {
                      slug
                    }
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
            ...on Hero {
              titleOne
              titleTwo
              subtitle
              blockType
            }
            ...on Section {
              id
              title
              description
              border
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
                      relationTo
                      value {
                        ... on Page {
                          slug
                        }
                        ... on ProtectedPage {
                          slug
                        }
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
                  icon
                  color
                  blockType
                  link {
                    text
                    newTab
                    icon
                    reference {
                      relationTo
                      value {
                        ... on Page {
                          slug
                        }
                        ... on ProtectedPage {
                          slug
                        }
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

export const PROTECTED_PAGES = `#graphql
  query ProtectedPages {
    ProtectedPages(limit: 500) {
      docs {
        slug
      }
    }
  }
`;
