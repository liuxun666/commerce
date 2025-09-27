'use client';

import { useState } from 'react';
import { Article } from 'lib/shopify/types';

interface ShareButtonsProps {
  article: Article;
}

/**
 * 分享按钮组件 - 提供多种社交媒体分享选项
 */
export default function ShareButtons({ article }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // 获取当前页面URL
  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  // 复制链接到剪贴板
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // 分享配置
  const shareOptions = [
    {
      name: '微信',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.900 7.852.194-.242-2.751-2.904-4.854-6.425-4.854-.118 0-.235.002-.353.006C9.724 2.25 9.209 2.188 8.691 2.188z"/>
          <path d="M17.31 11.188c-3.99 0-7.31 2.45-7.31 5.469 0 1.665.88 3.167 2.265 4.176a.59.59 0 0 1 .213.665l-.295 1.117c-.014.053-.036.106-.036.16 0 .122.098.22.22.22a.245.245 0 0 0 .126-.041l1.435-.84a.651.651 0 0 1 .54-.074 7.656 7.656 0 0 0 2.142.304c3.99 0 7.31-2.45 7.31-5.469s-3.32-5.469-7.31-5.469z"/>
        </svg>
      ),
      action: () => {
        // 微信分享通常需要通过二维码或复制链接
        copyToClipboard();
      },
      color: 'hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400'
    },
    {
      name: '微博',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.31 8.17c-2.09.21-3.75 1.5-3.75 3.31 0 1.81 1.66 3.1 3.75 3.31 2.09-.21 3.75-1.5 3.75-3.31 0-1.81-1.66-3.1-3.75-3.31zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2.69 13.5c-3.03 0-5.5-1.93-5.5-4.31 0-2.38 2.47-4.31 5.5-4.31s5.5 1.93 5.5 4.31c0 2.38-2.47 4.31-5.5 4.31z"/>
        </svg>
      ),
      action: () => {
        const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(getShareUrl())}&title=${encodeURIComponent(article.title)}&pic=${encodeURIComponent(article.image?.url || '')}`;
        window.open(url, '_blank', 'width=600,height=400');
      },
      color: 'hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      action: () => {
        const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(article.title)}`;
        window.open(url, '_blank', 'width=600,height=400');
      },
      color: 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`;
        window.open(url, '_blank', 'width=600,height=400');
      },
      color: 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      action: () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`;
        window.open(url, '_blank', 'width=600,height=400');
      },
      color: 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400'
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 p-8 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
        {/* 背景装饰 */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-slate-200/20 to-slate-300/10 dark:from-slate-700/20 dark:to-slate-600/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tl from-slate-300/15 to-slate-200/20 dark:from-slate-600/15 dark:to-slate-700/20 rounded-full blur-xl"></div>

        <div className="relative text-center">
          {/* 标题 */}
          <div className="mb-8">
            <h3 className="text-2xl font-light text-slate-900 dark:text-slate-100 mb-3">
              分享这篇文章
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              将精彩内容分享给更多朋友
            </p>
            <div className="mt-4 flex justify-center">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
            </div>
          </div>

          {/* 分享按钮 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className={`group flex items-center space-x-3 px-6 py-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 transition-all duration-300 ${option.color} hover:shadow-md hover:scale-105 hover:border-transparent`}
                aria-label={`分享到${option.name}`}
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {option.icon}
                </span>
                <span className="font-medium">{option.name}</span>
              </button>
            ))}
          </div>

          {/* 复制链接 */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              或复制链接直接分享
            </p>
            <div className="flex items-center justify-center space-x-3">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    value={getShareUrl()}
                    readOnly
                    className="w-full px-4 py-3 pr-12 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:border-transparent"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                    aria-label="复制链接"
                  >
                    {copied ? (
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* 复制成功提示 */}
            {copied && (
              <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm">
                <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                链接已复制到剪贴板
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 分享按钮骨架屏组件
 */
export function ShareButtonsSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 p-8 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
        <div className="relative text-center">
          {/* 标题骨架屏 */}
          <div className="mb-8">
            <div className="mx-auto h-8 w-40 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-3"></div>
            <div className="mx-auto h-5 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
            <div className="mx-auto h-px w-16 bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
          </div>

          {/* 分享按钮骨架屏 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-3 px-6 py-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                <div className="h-5 w-5 bg-slate-200 dark:bg-slate-600 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-600 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* 复制链接骨架屏 */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
            <div className="mx-auto h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
            <div className="flex items-center justify-center">
              <div className="flex-1 max-w-md">
                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}