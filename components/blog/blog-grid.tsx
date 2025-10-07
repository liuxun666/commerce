'use client';

import { Article, Blog } from 'lib/shopify/types';
import Link from 'next/link';

interface BlogGridProps {
  blogs: Blog[];
}

/**
 * Blog网格展示组件 - 展示所有博客分类及其最新文章
 * 每个Blog分类显示其最新的几篇文章，用户可以直接点击文章阅读或点击"更多"进入分类页面
 */
export default function BlogGrid({ blogs }: BlogGridProps) {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm text-secondary">
            暂无博客内容
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* 博客分类及文章展示 */}
      <div className="space-y-16">
        {blogs.map((blog) => (
          <BlogCategorySection key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

interface BlogCategorySectionProps {
  blog: Blog;
}

/**
 * 单个博客分类区域组件
 * 展示分类标题和该分类下的最新文章
 */
function BlogCategorySection({ blog }: BlogCategorySectionProps) {
  const articles = blog.articles?.edges?.map(edge => edge.node) || [];
  
  return (
    <section className="relative">
      {/* 分类标题区域 */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-primary mb-2">
            {blog.title}
          </h3>
          <p className="text-secondary">
            {blog.seo?.description || `探索${blog.title}分类中的精彩文章`}
          </p>
        </div>
        
        {articles.length > 0 && (
          <Link
            href={`/blogs/${blog.handle}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-secondary hover:text-primary bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200"
          >
            查看更多
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* 文章网格 */}
      {articles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              blogHandle={blog.handle}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-xl border border-card-border">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <p className="text-secondary">
            该分类暂无文章
          </p>
        </div>
      )}
    </section>
  );
}

interface ArticleCardProps {
  article: Article;
  blogHandle: string;
  index: number;
}

/**
 * 文章卡片组件
 * 展示单篇文章的信息，点击后进入文章详情页面
 */
function ArticleCard({ article, blogHandle, index }: ArticleCardProps) {
  /**
   * 格式化日期显示
   */
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
      className="group block overflow-hidden rounded-xl bg-card shadow-sm hover:shadow-lg transition-all duration-300 border border-card-border"
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* 文章图片 */}
      {article.image && (
        <div className="aspect-[16/10] overflow-hidden bg-card-image">
          <img
            src={article.image.url}
            alt={article.image.altText || article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      
      {/* 文章内容 */}
      <div className="p-6">
        <div className="mb-3">
          <h4 className="text-lg font-semibold text-primary group-hover:text-primary/90 transition-colors line-clamp-2">
            {article.title}
          </h4>
        </div>
        
        {article.excerpt && (
          <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
            {article.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-secondary">
          <div className="flex items-center space-x-3">
            {article.author?.displayName && (
              <span>{article.author.displayName}</span>
            )}
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          
          {article.tags && article.tags.length > 0 && (
            <span className="bg-tag px-2 py-1 rounded-full">
              {article.tags[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}