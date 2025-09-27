'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';

/**
 * 搜索组件 - 温润工艺美学设计
 * 提供产品搜索功能，采用高对比度配色和优雅的视觉效果
 */
export default function Search() {
  const searchParams = useSearchParams();

  return (
    <Form action="/search" className="relative w-full max-w-md lg:max-w-sm xl:max-w-md">
      <div className="relative group">
        <input
          key={searchParams?.get('q')}
          type="text"
          name="q"
          placeholder="搜索商品..."
          autoComplete="off"
          defaultValue={searchParams?.get('q') || ''}
          className="w-full rounded-2xl border-2 border-fuguang-200/60 dark:border-fuguang-700/60 bg-shanfan-50/80 dark:bg-yuepo-900/80 backdrop-blur-sm px-5 py-3 pr-12 text-sm text-yuepo-800 dark:text-shanfan-200 placeholder:text-yuepo-500 dark:placeholder:text-yuepo-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-chizhi-400/50 focus:border-chizhi-400 dark:focus:border-chizhi-500 hover:border-fuguang-300 dark:hover:border-fuguang-600 hover:bg-shanfan-100/90 dark:hover:bg-yuepo-800/90"
        />
        <div className="absolute right-0 top-0 mr-4 flex h-full items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-yuepo-600 dark:text-yuepo-400 group-hover:text-chizhi-500 dark:group-hover:text-chizhi-400 transition-colors duration-300" />
        </div>
        
        {/* 装饰性边框光晕 */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-fuguang-400/20 via-chizhi-400/10 to-fuguang-400/20 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-sm" />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full max-w-md lg:max-w-sm xl:max-w-md">
      <div className="relative group">
        <input
          placeholder="搜索商品..."
          className="w-full rounded-2xl border-2 border-fuguang-200/60 dark:border-fuguang-700/60 bg-shanfan-50/80 dark:bg-yuepo-900/80 backdrop-blur-sm px-5 py-3 pr-12 text-sm text-yuepo-800 dark:text-shanfan-200 placeholder:text-yuepo-500 dark:placeholder:text-yuepo-400 animate-pulse"
          disabled
        />
        <div className="absolute right-0 top-0 mr-4 flex h-full items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-yuepo-600 dark:text-yuepo-400" />
        </div>
      </div>
    </form>
  );
}
