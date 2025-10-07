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
          className="w-full rounded-2xl border-2 border-primary bg-input px-5 py-3 pr-12 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-chizhi-400" 
        />
        <div className="absolute right-0 top-0 mr-4 flex h-full items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-yuepo-600 dark:text-yuepo-400 group-hover:text-chizhi-500" />
        </div>
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
