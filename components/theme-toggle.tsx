'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * 主题切换组件 - 支持明暗模式切换
 * 采用东方美学设计，包含滑动动画和图标切换效果
 */
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // 确保组件在客户端挂载后再渲染
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-20 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="group relative h-10 w-20 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 p-1 shadow-inner transition-all duration-300 hover:shadow-lg dark:from-slate-700 dark:to-slate-600"
      aria-label={isDark ? '切换到明亮模式' : '切换到暗黑模式'}
    >
      {/* 滑动背景 */}
      <div
        className={`absolute inset-1 rounded-full bg-gradient-to-r transition-all duration-300 ${
          isDark
            ? 'translate-x-0 from-slate-800 to-slate-900 shadow-lg'
            : 'translate-x-0 from-white to-slate-50 shadow-md'
        }`}
      />
      
      {/* 图标容器 */}
      <div className="relative flex h-full w-full items-center justify-between px-2">
        {/* 太阳图标 */}
        <SunIcon
          className={`h-5 w-5 transition-all duration-300 ${
            isDark
              ? 'text-slate-400 opacity-50 scale-90'
              : 'text-amber-500 opacity-100 scale-100'
          }`}
        />
        
        {/* 月亮图标 */}
        <MoonIcon
          className={`h-5 w-5 transition-all duration-300 ${
            isDark
              ? 'text-blue-400 opacity-100 scale-100'
              : 'text-slate-400 opacity-50 scale-90'
          }`}
        />
      </div>
      
      {/* 悬停效果 */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}