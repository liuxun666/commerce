import seoFragment from '../fragments/seo';

/**
 * Blog文章片段 - 定义文章的基本字段
 */
const articleFragment = /* GraphQL */ `
  fragment article on Article {
    id
    title
    handle
    excerpt
    contentHtml
    publishedAt
    tags
    image {
      id
      url
      altText
      width
      height
    }
    author {
      name
    }
  }
`;

/**
 * Blog片段 - 定义博客的基本字段
 */
const blogFragment = /* GraphQL */ `
  fragment blog on Blog {
    id
    title
    handle
    seo {
      ...seo
    }
  }
  ${seoFragment}
`;

/**
 * 获取所有博客分类及其最新文章的GraphQL查询
 */
export const getBlogsQuery = /* GraphQL */ `
  query getBlogs($first: Int!, $articlesFirst: Int!) {
    blogs(first: $first) {
      edges {
        node {
          ...blog
          articles(first: $articlesFirst) {
            edges {
              node {
                ...article
              }
            }
          }
        }
      }
    }
  }
  ${blogFragment}
  ${articleFragment}
`;

/**
 * 根据handle获取特定博客的查询
 */
export const getBlogQuery = /* GraphQL */ `
  query getBlog($handle: String!, $first: Int = 20) {
    blogByHandle(handle: $handle) {
      ...blog
      articles(first: $first) {
        edges {
          node {
            ...article
          }
        }
      }
    }
  }
  ${blogFragment}
  ${articleFragment}
`;

/**
 * 根据handle获取特定文章的查询
 */
export const getArticleQuery = /* GraphQL */ `
  query getArticle($blogHandle: String!, $articleHandle: String!) {
    blogByHandle(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        ...article
        blog {
          ...blog
        }
      }
    }
  }
  ${blogFragment}
  ${articleFragment}
`;

/**
 * 获取博客文章列表的查询（支持分页和排序）
 */
export const getBlogArticlesQuery = /* GraphQL */ `
  query getBlogArticles(
    $blogHandle: String!
    $first: Int = 20
    $after: String
    $sortKey: ArticleSortKeys = PUBLISHED_AT
    $reverse: Boolean = true
  ) {
    blogByHandle(handle: $blogHandle) {
      ...blog
      articles(
        first: $first
        after: $after
        sortKey: $sortKey
        reverse: $reverse
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            ...article
          }
        }
      }
    }
  }
  ${blogFragment}
  ${articleFragment}
`;

/**
 * 根据标签获取文章的查询
 */
export const getArticlesByTagQuery = /* GraphQL */ `
  query getArticlesByTag(
    $blogHandle: String!
    $tag: String!
    $first: Int = 20
  ) {
    blogByHandle(handle: $blogHandle) {
      ...blog
      articles(first: $first, query: $tag) {
        edges {
          node {
            ...article
          }
        }
      }
    }
  }
  ${blogFragment}
  ${articleFragment}
`;