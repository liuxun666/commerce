import Link from 'next/link';
import { Article } from 'lib/shopify/types';

interface RecommendedArticlesProps {
  articles: Article[];
  currentArticleHandle?: string;
}

/**
 * 推荐文章组件 - 展示相关文章推荐
 */
export default function RecommendedArticles({ articles, currentArticleHandle }: RecommendedArticlesProps) {
  // 过滤掉当前文章
  const filteredArticles = articles.filter(article => article.handle !== currentArticleHandle);
  
  if (!filteredArticles || filteredArticles.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light text-slate-900 dark:text-slate-100 mb-4">
          相关文章推荐
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          探索更多精彩内容，拓展您的视野
        </p>
        <div className="mt-6 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.slice(0, 6).map((article) => (
          <ArticleCard key={article.handle} article={article} />
        ))}
      </div>
    </div>
  );
}

/**
 * 文章卡片组件
 */
function ArticleCard({ article }: { article: Article }) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link
      href={`/blogs/${article.blog?.handle}/${article.handle}`}
      className="group relative block overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.02] hover:border-slate-300 dark:hover:border-slate-600"
    >
      {/* 文章图片 */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-700">
        {article.image ? (
          <img
            src={article.image.url}
            alt={article.image.altText || article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
            <svg
              className="h-16 w-16 text-slate-400 dark:text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        )}
        
        {/* 悬浮效果 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        
        {/* 发布日期标签 */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
          {publishedDate}
        </div>
      </div>

      {/* 文章信息 */}
      <div className="p-6">
        {/* 标签 */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-xl font-medium text-slate-900 dark:text-slate-100 mb-3 line-clamp-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-200">
          {article.title}
        </h3>
        
        {article.excerpt && (
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        )}

        {/* 作者和阅读时间 */}
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            {article.author && (
              <>
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    {article.author.displayName?.charAt(0) || 'A'}
                  </span>
                </div>
                <span>{article.author.displayName}</span>
              </>
            )}
          </div>
          
          {/* 阅读更多指示器 */}
          <div className="flex items-center text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-200">
            <span className="mr-1">阅读更多</span>
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 装饰性边框 */}
      <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-slate-200/0 via-slate-200/50 to-slate-200/0 dark:from-slate-700/0 dark:via-slate-700/50 dark:to-slate-700/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"></div>
    </Link>
  );
}

/**
 * 推荐文章骨架屏组件
 */
export function RecommendedArticlesSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="mx-auto h-9 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
        <div className="mx-auto h-5 w-80 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-6"></div>
        <div className="mx-auto h-px w-24 bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

/**
 * 文章卡片骨架屏组件
 */
function ArticleCardSkeleton() {
  return (
    <div className="relative block overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
      {/* 图片骨架屏 */}
      <div className="relative aspect-[16/10] bg-slate-200 dark:bg-slate-700 animate-pulse">
        <div className="absolute top-4 left-4 h-6 w-20 bg-slate-300 dark:bg-slate-600 rounded-full animate-pulse"></div>
      </div>

      {/* 内容骨架屏 */}
      <div className="p-6">
        {/* 标签骨架屏 */}
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
          <div className="h-5 w-12 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
        </div>

        {/* 标题骨架屏 */}
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-3 w-3/4"></div>
        
        {/* 摘要骨架屏 */}
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2 w-5/6"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4 w-2/3"></div>
        
        {/* 作者信息骨架屏 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
            <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}