'use client';

import { Article } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleGridProps {
  articles: Article[];
  blogHandle: string;
}

/**
 * 文章网格展示组件 - 展示博客下的所有文章
 */
export default function ArticleGrid({ articles, blogHandle }: ArticleGridProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-6 py-3 text-sm text-slate-600 dark:text-slate-400">
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            暂无文章内容
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      {/* 标题区域 */}
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          最新文章
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          探索精彩内容，发现生活美学
        </p>
        <div className="mt-8 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
        </div>
      </div>

      {/* 文章网格 */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <ArticleCard key={article.handle} article={article} blogHandle={blogHandle} index={index} />
        ))}
      </div>
    </div>
  );
}

interface ArticleCardProps {
  article: Article;
  blogHandle: string;
  index: number;
}

/**
 * 单个文章卡片组件
 */
function ArticleCard({ article, blogHandle, index }: ArticleCardProps) {
  // 为不同的卡片添加不同的动画延迟
  const animationDelay = `${index * 100}ms`;

  // 格式化发布日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link 
      href={`/blogs/${blogHandle}/${article.handle}`}
      className="group block"
      style={{ animationDelay }}
    >
      <article className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-slate-200/50 dark:border-slate-700/50">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-slate-100/30 dark:from-slate-800/50 dark:to-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* 图片区域 */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {article.image ? (
            <Image
              src={article.image.url}
              alt={article.image.altText || article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center mb-3">
                  <svg className="h-6 w-6 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">暂无配图</p>
              </div>
            </div>
          )}
          
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* 标签 */}
          {article.tags && article.tags.length > 0 && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-slate-800/90 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 backdrop-blur-sm">
                {article.tags[0]}
              </span>
            </div>
          )}
        </div>

        {/* 内容区域 */}
        <div className="relative p-6">
          {/* 发布日期和作者 */}
          <div className="mb-3 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
            {article.author && (
              <span className="flex items-center">
                <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {article.author.displayName}
              </span>
            )}
          </div>

          {/* 标题 */}
          <h3 className="text-xl font-medium text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 mb-3 line-clamp-2">
            {article.title}
          </h3>

          {/* 摘要 */}
          {article.excerpt && (
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
              {article.excerpt}
            </p>
          )}

          {/* 底部信息 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              阅读文章
            </div>
            
            {/* 箭头指示器 */}
            <div className="flex items-center text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors duration-300">
              <span className="text-sm mr-2">查看详情</span>
              <svg 
                className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* 装饰性边框 */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </article>
    </Link>
  );
}

/**
 * 文章网格骨架屏组件
 */
export function ArticleGridSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* 标题骨架屏 */}
      <div className="mb-16 text-center">
        <div className="mx-auto h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
        <div className="mx-auto h-6 w-64 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-8"></div>
        <div className="mx-auto h-px w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
      </div>

      {/* 网格骨架屏 */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
            {/* 图片骨架屏 */}
            <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            
            {/* 内容骨架屏 */}
            <div className="p-6">
              {/* 日期和作者骨架屏 */}
              <div className="flex items-center justify-between mb-3">
                <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              </div>
              
              {/* 标题骨架屏 */}
              <div className="space-y-2 mb-3">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              </div>
              
              {/* 摘要骨架屏 */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              </div>
              
              {/* 底部信息骨架屏 */}
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}