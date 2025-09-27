import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';

/**
 * 商品详情描述组件 - 专门展示商品的详细描述信息
 * 用于商品页面下半部分的详情展示
 */
export function ProductDetailDescription({ product }: { product: Product }) {
  // 如果没有描述内容，返回空
  if (!product.descriptionHtml) {
    return null;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 标题区域 */}
      <div className="flex items-center space-x-4 animate-slide-up">
        <div className="w-1 h-8 bg-fuguang-400 dark:bg-fuguang-500 rounded-full animate-pulse"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-shanfan-700 dark:text-shanfan-300">
          商品详情
        </h2>
        <div className="flex-1 h-px bg-fuguang-200/60 dark:bg-fuguang-700/60"></div>
        <div className="w-3 h-3 rounded-full bg-fuguang-400 dark:bg-fuguang-500 animate-pulse"></div>
      </div>

      {/* 描述内容区域 */}
      <div className="relative p-8 md:p-12 bg-shanfan-50/90 dark:bg-yuepo-900/90 rounded-3xl border border-fuguang-200/50 dark:border-fuguang-700/30 shadow-xl group animate-slide-up" style={{ animationDelay: '0.2s' }}>
        {/* 装饰性几何图形 */}
        <div className="absolute top-6 right-6 w-12 h-12 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <div className="w-full h-full border-2 border-chizhi-400 rounded-full animate-spin" style={{ animationDuration: '12s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-fuguang-400 rounded-full animate-pulse"></div>
        </div>
        
        {/* 装饰性边框 */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-fuguang-300/40 dark:border-fuguang-600/40 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-chizhi-300/40 dark:border-chizhi-600/40 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* 内容区域 */}
        <div className="relative z-10">
          <Prose
            className="text-shanfan-700 dark:text-shanfan-300 leading-relaxed prose-lg max-w-none"
            html={product.descriptionHtml}
          />
        </div>

        {/* 底部装饰线 */}
        <div className="flex items-center justify-center space-x-4 mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="w-16 h-px bg-chizhi-200/60 dark:bg-chizhi-700/60"></div>
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-chizhi-400/60 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-fuguang-400/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 rounded-full bg-chizhi-400/60 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div className="w-16 h-px bg-chizhi-200/60 dark:bg-chizhi-700/60"></div>
        </div>
      </div>
    </div>
  );
}