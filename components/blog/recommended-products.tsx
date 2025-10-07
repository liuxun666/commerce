import { ProductCard } from 'components/product/prodcut-card';
import { Product } from 'lib/shopify/types';

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
        <h2 className="text-3xl font-blod text-primary mb-4">
          相关商品推荐
        </h2>
        <p className="text-secondary max-w-2xl mx-auto">
          发现更多精选商品，为您的生活增添美好
        </p>
        <div className="mt-6 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>
    </div>
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