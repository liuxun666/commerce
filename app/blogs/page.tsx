import BlogGrid from 'components/blog/blog-grid';
import BlogHero from 'components/blog/blog-hero';
import { getBlogs } from 'lib/shopify';
import { Blog } from 'lib/shopify/types';
import { Metadata } from 'next';
import { Suspense } from 'react';

/**
 * 生成Blog首页的元数据
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog | 探索传统国学风水与品质生活',
    description: '发现生活中的美好瞬间，分享品质生活理念，探索东方美学与现代设计的完美融合。',
    openGraph: {
      type: 'website',
      title: 'Blog | 探索传统国学风水与品质生活',
      description: '发现生活中的美好瞬间，分享品质生活理念，探索东方美学与现代设计的完美融合。',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | 探索传统国学风水与品质生活',
      description: '发现生活中的美好瞬间，分享品质生活理念，探索东方美学与现代设计的完美融合。',
    }
  };
}

/**
 * Blog首页组件 - 展示所有博客分类和精选文章
 */
export default async function BlogPage() {

  let blogs: Blog[] = [];
  try {
    blogs = await getBlogs(3); // 获取每个分类下的最新3篇文章
  } catch (error) {
    console.error('Error loading blogs:', error);
  }

  return (
    <div className="min-h-screen bg-app">
      {/* Hero区域 */}
      <BlogHero />
      {/* 博客网格 */}
      <Suspense fallback={<BlogGridSkeleton />}>
        <BlogGrid blogs={blogs} />
      </Suspense>
    </div>
  );

}

/**
 * 博客网格加载骨架屏
 */
function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-700 rounded-2xl mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}