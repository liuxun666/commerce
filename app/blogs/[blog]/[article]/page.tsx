import ArticleContent from 'components/blog/article-content';
import ArticleHeader from 'components/blog/article-header';
import RecommendedArticles from 'components/blog/recommended-articles';
import RecommendedProducts from 'components/blog/recommended-products';
import ShareButtons from 'components/blog/share-buttons';
import { getArticle, getBlogArticles, getProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: Promise<{
    blog: string;
    article: string;
  }>;
};

/**
 * 生成文章详情页的元数据
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blog: blogHandle, article: articleHandle } = await params;
  const article = await getArticle(blogHandle, articleHandle);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    };
  }

  return {
    title: `${article.title} | ${article.blog?.title || 'Blog'}`,
    description: article.excerpt || article.seo?.description || '探索传统国学风水与品质生活',
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt || article.seo?.description || '探索传统国学风水与品质生活',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.displayName],
      images: article.image ? [
        {
          url: article.image.url,
          width: article.image.width,
          height: article.image.height,
          alt: article.image.altText || article.title
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || article.seo?.description || '探索传统国学风水与品质生活',
      images: article.image ? [article.image.url] : undefined,
    }
  };
}

/**
 * 文章详情页组件 - 展示完整的文章内容和相关推荐
 */
export default async function ArticleDetailPage({ params }: Props) {
  const { blog: blogHandle, article: articleHandle } = await params;
  
  const article = await getArticle(blogHandle, articleHandle);
  
  if (!article) {
    notFound();
  }

  // 获取推荐内容（并行请求）
  const [recommendedArticlesData, recommendedProducts] = await Promise.all([
    getBlogArticles({
      blogHandle,
      first: 4,
      sortKey: 'PUBLISHED_AT',
      reverse: true
    }),
    // 根据文章标签获取相关商品
    getProducts({
      query: article.tags?.length > 0 ? `tag:${article.tags[0]}` : '',
      sortKey: 'RELEVANCE'
    })
  ]);

  // 过滤掉当前文章
  const recommendedArticles = recommendedArticlesData.articles.filter(
    (a) => a.handle !== articleHandle
  ).slice(0, 4);

  // 限制推荐商品数量
  const limitedRecommendedProducts = recommendedProducts.slice(0, 3);

  return (
    <div className="min-h-screen bg-app">
      {/* 文章头部 */}
      <ArticleHeader article={article} />
      
      {/* 文章内容区域 */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <Suspense fallback={<ArticleContentSkeleton />}>
            <ArticleContent article={article} />
          </Suspense>
        </article>

        {/* 分享按钮 */}
        <div className="mt-6 pt-8 border-t border-slate-200 dark:border-slate-700">
          <ShareButtons article={article} />
        </div>

        {/* 推荐商品 */}
        {limitedRecommendedProducts.length > 0 && (
          <div className="mt-16">
            <Suspense fallback={<RecommendedProductsSkeleton />}>
              <RecommendedProducts products={limitedRecommendedProducts} />
            </Suspense>
          </div>
        )}

        {/* 推荐文章 */}
        {recommendedArticles.length > 0 && (
          <div className="mt-16">
            <Suspense fallback={<RecommendedArticlesSkeleton />}>
              <RecommendedArticles 
                articles={recommendedArticles} 
                currentArticleHandle={articleHandle}
              />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 文章内容加载骨架屏
 */
function ArticleContentSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/5"></div>
      <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
        ))}
      </div>
    </div>
  );
}

/**
 * 推荐商品加载骨架屏
 */
function RecommendedProductsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-2xl mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 推荐文章加载骨架屏
 */
function RecommendedArticlesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-700 rounded-2xl mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}