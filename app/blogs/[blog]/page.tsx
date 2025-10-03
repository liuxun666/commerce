import ArticleGrid from 'components/blog/article-grid';
import BlogHeader from 'components/blog/blog-header';
import { getBlog, getBlogArticles } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: Promise<{
    blog: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

/**
 * 生成Blog详情页的元数据
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blog: blogHandle } = await params;
  const blog = await getBlog(blogHandle);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog could not be found.'
    };
  }

  return {
    title: `${blog.title} | Blog`,
    description: blog.seo?.description || `探索 ${blog.title} 的精彩内容`,
    openGraph: {
      type: 'website',
      title: `${blog.title} | Blog`,
      description: blog.seo?.description || `探索 ${blog.title} 的精彩内容`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blog.title} | Blog`,
      description: blog.seo?.description || `探索 ${blog.title} 的精彩内容`,
    }
  };
}

/**
 * Blog详情页组件 - 展示特定博客的文章列表
 */
export default async function BlogDetailPage({ params, searchParams }: Props) {
  const { blog: blogHandle } = await params;
  const { page } = await searchParams;
  
  const blog = await getBlog(blogHandle);
  
  if (!blog) {
    notFound();
  }

  const currentPage = page ? parseInt(page, 10) : 1;
  const articlesPerPage = 12;
  
  const { articles, pageInfo } = await getBlogArticles({
    blogHandle,
    first: articlesPerPage,
    after: currentPage > 1 ? btoa(`arrayconnection:${(currentPage - 1) * articlesPerPage - 1}`) : undefined
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-shanfan-50 via-shanfan-100 to-fuguang-50 dark:from-yuepo-950 dark:via-yuepo-900 dark:to-shanfan-950">
      {/* 博客头部 */}
      <BlogHeader blog={blog} />
      
      {/* 文章列表区域 */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Suspense fallback={<ArticleGridSkeleton />}>
          <ArticleGrid 
            articles={articles} 
            blogHandle={blogHandle}
          />
        </Suspense>
      </div>
    </div>
  );
}

/**
 * 文章网格加载骨架屏
 */
function ArticleGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-700 rounded-2xl mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}