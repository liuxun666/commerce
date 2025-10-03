import Link from 'next/link';
import { Product } from 'lib/shopify/types';
import Price from 'components/price';

interface RecommendedProductsProps {
  products: Product[];
}

/**
 * 推荐商品组件 - 展示相关商品推荐
 */
export default function RecommendedProducts({ products }: RecommendedProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light text-slate-900 dark:text-slate-100 mb-4">
          相关商品推荐
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          发现更多精选商品，为您的生活增添美好
        </p>
        <div className="mt-6 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.handle} product={product} />
        ))}
      </div>
    </div>
  );
}

/**
 * 商品卡片组件
 */
function ProductCard({ product }: { product: Product }) {
  const featuredImage = product.featuredImage;
  const price = product.priceRange.maxVariantPrice;

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group relative block overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.02] hover:border-slate-300 dark:hover:border-slate-600"
    >
      {/* 商品图片 */}
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
        {featuredImage ? (
          <img
            src={featuredImage.url}
            alt={featuredImage.altText || product.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-700">
            <svg
              className="h-16 w-16 text-slate-400 dark:text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        
        {/* 悬浮效果 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>

      {/* 商品信息 */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-200">
          {product.title}
        </h3>
        
        {product.description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* 价格 */}
        <div className="flex items-center justify-between">
          <Price
            amount={price.amount}
            currencyCode={price.currencyCode}
            className="text-lg font-semibold text-slate-900 dark:text-slate-100"
          />
          
          {/* 查看详情按钮 */}
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-200">
            <span className="mr-1">查看详情</span>
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 装饰性边框 */}
      <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-slate-200/0 via-slate-200/50 to-slate-200/0 dark:from-slate-700/0 dark:via-slate-700/50 dark:to-slate-700/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"></div>
    </Link>
  );
}

/**
 * 推荐商品骨架屏组件
 */
export function RecommendedProductsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="mx-auto h-9 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
        <div className="mx-auto h-5 w-80 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-6"></div>
        <div className="mx-auto h-px w-24 bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

/**
 * 商品卡片骨架屏组件
 */
function ProductCardSkeleton() {
  return (
    <div className="relative block overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
      {/* 图片骨架屏 */}
      <div className="relative aspect-square bg-slate-200 dark:bg-slate-700 animate-pulse"></div>

      {/* 内容骨架屏 */}
      <div className="p-6">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-1 w-3/4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4 w-1/2"></div>
        
        <div className="flex items-center justify-between">
          <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}