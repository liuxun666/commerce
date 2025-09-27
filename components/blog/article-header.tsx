'use client';

import Image from 'next/image';
import { Article } from 'lib/shopify/types';

interface ArticleHeaderProps {
  article: Article;
}

/**
 * 文章详情页Header组件 - 展示文章标题、作者、发布时间等信息
 */
export default function ArticleHeader({ article }: ArticleHeaderProps) {
  // 格式化发布日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 格式化时间
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0">
        {/* 渐变光斑 */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-slate-200/20 to-slate-300/10 dark:from-slate-700/20 dark:to-slate-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-tl from-slate-300/15 to-slate-200/20 dark:from-slate-600/15 dark:to-slate-700/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        
        {/* 几何装饰 */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full opacity-50"></div>
        <div className="absolute bottom-32 right-16 w-1.5 h-1.5 bg-slate-500 dark:bg-slate-400 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 left-8 w-px h-16 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
      </div>

      {/* 主要内容 */}
      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center space-y-8">
          {/* 面包屑导航 */}
          <nav className="flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
            <a href="/blog" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200">
              博客
            </a>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
            {article.blog && (
              <>
                <a href={`/blogs/${article.blog.handle}`} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200">
                  {article.blog.title}
                </a>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
            <span className="text-slate-700 dark:text-slate-300">{article.title}</span>
          </nav>

          {/* 标签 */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {article.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex items-center rounded-full bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1 text-sm font-medium text-slate-600 dark:text-slate-400 backdrop-blur-sm"
                >
                  <span className="mr-2 h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* 标题 */}
          <h1 className="text-4xl font-light tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl leading-tight">
            {article.title}
          </h1>
          
          {/* 摘要 */}
          {article.excerpt && (
            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              {article.excerpt}
            </p>
          )}

          {/* 作者和发布信息 */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-500 dark:text-slate-400">
            {/* 作者信息 */}
            {article.author && (
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                  <svg className="h-5 w-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{article.author.displayName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">作者</p>
                </div>
              </div>
            )}

            {/* 分隔线 */}
            <div className="hidden sm:block h-8 w-px bg-slate-200 dark:bg-slate-700"></div>

            {/* 发布时间 */}
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {formatDate(article.publishedAt)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {formatTime(article.publishedAt)} 发布
                </p>
              </div>
            </div>
          </div>

          {/* 装饰性分隔线 */}
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-slate-300 dark:to-slate-600"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-600 to-slate-300 dark:to-slate-600"></div>
          </div>
        </div>

        {/* 特色图片 */}
        {article.image && (
          <div className="mt-16">
            <div className="relative mx-auto max-w-4xl aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={article.image.url}
                alt={article.image.altText || article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
              {/* 图片遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
              
              {/* 装饰性边框 */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-200/20 dark:ring-slate-700/20"></div>
            </div>
            
            {/* 图片装饰元素 */}
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-slate-200/30 to-slate-300/20 dark:from-slate-700/30 dark:to-slate-600/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-tl from-slate-300/25 to-slate-200/30 dark:from-slate-600/25 dark:to-slate-700/30 rounded-full blur-lg"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 文章Header骨架屏组件
 */
export function ArticleHeaderSkeleton() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center space-y-8">
          {/* 面包屑骨架屏 */}
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>

          {/* 标签骨架屏 */}
          <div className="flex justify-center gap-2">
            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
            <div className="h-6 w-14 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
          </div>
          
          {/* 标题骨架屏 */}
          <div className="space-y-4">
            <div className="mx-auto h-12 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="mx-auto h-12 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>
          
          {/* 摘要骨架屏 */}
          <div className="mx-auto max-w-3xl space-y-3">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-6 w-5/6 mx-auto bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-6 w-3/4 mx-auto bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>

          {/* 作者和发布信息骨架屏 */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
              <div className="space-y-1">
                <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                <div className="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
              <div className="space-y-1">
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* 分隔线骨架屏 */}
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-20 bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            <div className="h-px w-20 bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
          </div>
        </div>

        {/* 图片骨架屏 */}
        <div className="mt-16">
          <div className="relative mx-auto max-w-4xl aspect-[16/9] bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}