'use client';

import { Blog } from 'lib/shopify/types';

interface BlogHeaderProps {
  blog: Blog;
}

/**
 * Blog详情页Header组件 - 展示博客标题和描述
 */
export default function BlogHeader({ blog }: BlogHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0">
        {/* 渐变光斑 */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-slate-200/20 to-slate-300/10 dark:from-slate-700/20 dark:to-slate-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-tl from-slate-300/15 to-slate-200/20 dark:from-slate-600/15 dark:to-slate-700/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* 几何装饰 */}
        <div className="absolute top-16 left-16 w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-slate-500 dark:bg-slate-400 rounded-full opacity-40"></div>
        <div className="absolute top-1/3 right-8 w-px h-12 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
      </div>

      {/* 主要内容 */}
      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center space-y-8">
          {/* 面包屑导航 */}
          <nav className="flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
            <a href="/blogs" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200">
              博客
            </a>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-700 dark:text-slate-300">{blog.title}</span>
          </nav>

          {/* 分类标签 */}
          <div className="inline-flex items-center rounded-full bg-slate-100/80 dark:bg-slate-800/80 px-6 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 backdrop-blur-sm">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500"></span>
            专题分类
          </div>
          
          {/* 标题 */}
          <h1 className="text-5xl font-light tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl">
            {blog.title}
          </h1>
          
          {/* 装饰性分隔线 */}
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
          </div>

          {/* 描述文字 */}
          {blog.seo?.description && (
            <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              {blog.seo.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * BlogHeader骨架屏组件
 */
export function BlogHeaderSkeleton() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-slate-200/20 to-slate-300/10 dark:from-slate-700/20 dark:to-slate-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-tl from-slate-300/15 to-slate-200/20 dark:from-slate-600/15 dark:to-slate-700/20 rounded-full blur-3xl"></div>
      </div>

      {/* 主要内容 */}
      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center space-y-8">
          {/* 面包屑骨架屏 */}
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>

          {/* 分类标签骨架屏 */}
          <div className="inline-flex items-center rounded-full bg-slate-100/80 dark:bg-slate-800/80 px-6 py-3">
            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>

          {/* 标题骨架屏 */}
          <div className="space-y-4">
            <div className="h-12 w-3/4 mx-auto bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-12 w-1/2 mx-auto bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>

          {/* 分隔线骨架屏 */}
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-20 bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            <div className="h-px w-20 bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
          </div>

          {/* 描述文字骨架屏 */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <div className="h-5 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-5 w-3/4 mx-auto bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}