'use client';

import { Article } from 'lib/shopify/types';

interface ArticleContentProps {
  article: Article;
}

/**
 * 文章内容展示组件 - 展示文章的HTML内容
 */
export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
      {/* 内容容器 */}
      <div className="relative">
        {/* 背景装饰 */}
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-slate-100/30 to-slate-200/20 dark:from-slate-800/30 dark:to-slate-700/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-tl from-slate-200/25 to-slate-100/30 dark:from-slate-700/25 dark:to-slate-800/30 rounded-full blur-xl"></div>
        
        {/* 文章内容 */}
        <article className="relative prose prose-slate dark:prose-invert prose-lg max-w-none">
          {/* 自定义样式覆盖 */}
          <style jsx global>{`
            .prose {
              --tw-prose-body: rgb(71 85 105);
              --tw-prose-headings: rgb(15 23 42);
              --tw-prose-lead: rgb(71 85 105);
              --tw-prose-links: rgb(51 65 85);
              --tw-prose-bold: rgb(15 23 42);
              --tw-prose-counters: rgb(100 116 139);
              --tw-prose-bullets: rgb(148 163 184);
              --tw-prose-hr: rgb(226 232 240);
              --tw-prose-quotes: rgb(15 23 42);
              --tw-prose-quote-borders: rgb(226 232 240);
              --tw-prose-captions: rgb(100 116 139);
              --tw-prose-code: rgb(15 23 42);
              --tw-prose-pre-code: rgb(226 232 240);
              --tw-prose-pre-bg: rgb(15 23 42);
              --tw-prose-th-borders: rgb(226 232 240);
              --tw-prose-td-borders: rgb(226 232 240);
            }
            
            .dark .prose {
              --tw-prose-body: rgb(148 163 184);
              --tw-prose-headings: rgb(248 250 252);
              --tw-prose-lead: rgb(148 163 184);
              --tw-prose-links: rgb(203 213 225);
              --tw-prose-bold: rgb(248 250 252);
              --tw-prose-counters: rgb(100 116 139);
              --tw-prose-bullets: rgb(71 85 105);
              --tw-prose-hr: rgb(51 65 85);
              --tw-prose-quotes: rgb(248 250 252);
              --tw-prose-quote-borders: rgb(51 65 85);
              --tw-prose-captions: rgb(100 116 139);
              --tw-prose-code: rgb(248 250 252);
              --tw-prose-pre-code: rgb(226 232 240);
              --tw-prose-pre-bg: rgb(15 23 42);
              --tw-prose-th-borders: rgb(51 65 85);
              --tw-prose-td-borders: rgb(51 65 85);
            }

            /* 自定义样式 */
            .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
              font-weight: 400;
              letter-spacing: -0.025em;
              margin-top: 2em;
              margin-bottom: 1em;
            }

            .prose h1 {
              font-size: 2.25rem;
              line-height: 2.5rem;
            }

            .prose h2 {
              font-size: 1.875rem;
              line-height: 2.25rem;
              border-bottom: 1px solid rgb(226 232 240);
              padding-bottom: 0.5rem;
            }

            .dark .prose h2 {
              border-bottom-color: rgb(51 65 85);
            }

            .prose h3 {
              font-size: 1.5rem;
              line-height: 2rem;
            }

            .prose p {
              margin-top: 1.5em;
              margin-bottom: 1.5em;
              line-height: 1.8;
            }

            .prose blockquote {
              font-style: normal;
              border-left: 4px solid rgb(226 232 240);
              padding-left: 1.5rem;
              margin: 2rem 0;
              background: rgb(248 250 252);
              border-radius: 0 0.5rem 0.5rem 0;
              padding: 1.5rem;
            }

            .dark .prose blockquote {
              border-left-color: rgb(51 65 85);
              background: rgb(30 41 59);
            }

            .prose ul, .prose ol {
              margin: 1.5em 0;
              padding-left: 1.5rem;
            }

            .prose li {
              margin: 0.5em 0;
            }

            .prose img {
              border-radius: 0.75rem;
              box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
              margin: 2rem auto;
            }

            .prose pre {
              border-radius: 0.75rem;
              padding: 1.5rem;
              margin: 2rem 0;
              overflow-x: auto;
            }

            .prose code {
              background: rgb(248 250 252);
              padding: 0.25rem 0.5rem;
              border-radius: 0.375rem;
              font-size: 0.875em;
            }

            .dark .prose code {
              background: rgb(30 41 59);
            }

            .prose table {
              margin: 2rem 0;
              border-radius: 0.75rem;
              overflow: hidden;
              box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
            }

            .prose th {
              background: rgb(248 250 252);
              font-weight: 500;
              padding: 1rem;
            }

            .dark .prose th {
              background: rgb(30 41 59);
            }

            .prose td {
              padding: 1rem;
            }

            .prose a {
              text-decoration: none;
              border-bottom: 1px solid transparent;
              transition: all 0.2s ease;
            }

            .prose a:hover {
              border-bottom-color: currentColor;
            }

            /* 响应式调整 */
            @media (max-width: 640px) {
              .prose {
                font-size: 1rem;
                line-height: 1.7;
              }
              
              .prose h1 {
                font-size: 1.875rem;
                line-height: 2.25rem;
              }
              
              .prose h2 {
                font-size: 1.5rem;
                line-height: 2rem;
              }
              
              .prose h3 {
                font-size: 1.25rem;
                line-height: 1.75rem;
              }
            }
          `}</style>
          
          {/* 渲染HTML内容 */}
          <div 
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            className="article-content"
          />
        </article>

        {/* 文章底部装饰 */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-slate-300 dark:to-slate-600"></div>
            <div className="flex space-x-1">
              <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600"></div>
              <div className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500"></div>
              <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600"></div>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-600 to-slate-300 dark:to-slate-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 文章内容骨架屏组件
 */
export function ArticleContentSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {/* 段落骨架屏 */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-3">
            {/* 随机生成不同长度的行 */}
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-5/6"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-4/5"></div>
            {index % 3 === 0 && (
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4"></div>
            )}
          </div>
        ))}

        {/* 图片骨架屏 */}
        <div className="my-8">
          <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
        </div>

        {/* 更多段落骨架屏 */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={`extra-${index}`} className="space-y-3">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-4/5"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-5/6"></div>
          </div>
        ))}

        {/* 底部装饰骨架屏 */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center space-x-4">
            <div className="h-px w-20 bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            <div className="flex space-x-1">
              <div className="h-1 w-1 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
              <div className="h-1 w-1 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
              <div className="h-1 w-1 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            </div>
            <div className="h-px w-20 bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}