import { getBlogs, getCollections, getPages, getProducts } from 'lib/shopify';
import { baseUrl, validateEnvironmentVariables } from 'lib/utils';
import { MetadataRoute } from 'next';

type Route = {
  url: string;
  lastModified: string;
};

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  const routesMap = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0]
  }));

  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}${collection.path}`,
      lastModified: collection.updatedAt?.split('T')[0] || ''
    }))
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt?.split('T')[0] || ''
    }))
  );

  const pagesPromise = getPages().then((pages) =>
    pages.map((page) => ({
      url: `${baseUrl}/${page.handle}`,
      lastModified: page.updatedAt?.split('T')[0] || ''
    }))
  );

  const blogPromise = getBlogs(240).then((blogCategories) => {
    return blogCategories.map((blogCategory) => ({
      url: `${baseUrl}/blogs/${blogCategory.handle}`,
      lastModified: new Date('2025-09-11').toISOString().split('T')[0] || ''
    }))
    .concat(
      blogCategories.flatMap((blogCategory) =>
        blogCategory.articles?.edges.map((article) => ({
          url: `${baseUrl}/blogs/${blogCategory.handle}/${article.node.handle}`,
          lastModified: article.node.publishedAt?.split('T')[0] || ''
        })) || []
      )
    );
  });

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise, pagesPromise, blogPromise])
    ).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...routesMap, ...fetchedRoutes];
}
