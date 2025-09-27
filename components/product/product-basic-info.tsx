import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

/**
 * 商品基本信息组件 - 包含标题、价格、规格选择和购买按钮
 * 用于商品页面上半部分的基本信息展示
 */
export function ProductBasicInfo({ product }: { product: Product }) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* 商品标题和价格区域 */}
      <div className="space-y-6 animate-slide-up">
        {/* 装饰性顶部边框 */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-px bg-chizhi-300/40 dark:bg-chizhi-600/40 animate-breathe"></div>
          <div className="w-2 h-2 rounded-full bg-chizhi-400/60 animate-pulse"></div>
          <div className="w-12 h-px bg-chizhi-300/40 dark:bg-chizhi-600/40 animate-breathe"></div>
        </div>
        
        <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-shanfan-800 dark:text-shanfan-200 leading-tight animate-slide-down">
          {product.title}
        </h1>
        
        {/* 价格标签 - 温润工艺设计 */}
        <div className="inline-flex items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="relative group">
            {/* 装饰性背景 */}
            <div className="absolute -inset-1 bg-chizhi-500/10 dark:bg-chizhi-400/10 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300 animate-breathe"></div>
            
            <div className="relative bg-chizhi-500 dark:bg-chizhi-400 text-white px-8 py-4 rounded-2xl shadow-xl border border-chizhi-400/30 dark:border-chizhi-500/30 group-hover:scale-105 transition-all duration-300">
              {/* 装饰性边框 */}
              <div className="absolute top-1 left-1 w-4 h-4 border-t border-l border-white/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-1 right-1 w-4 h-4 border-b border-r border-white/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <Price
                amount={product.priceRange.maxVariantPrice.amount}
                currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                className="text-xl font-bold tracking-wide"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 优雅分隔线 */}
      <div className="flex items-center space-x-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex-1 h-px bg-fuguang-200/60 dark:bg-fuguang-700/60"></div>
        <div className="w-3 h-3 rounded-full bg-chizhi-400 dark:bg-chizhi-500 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="flex-1 h-px bg-fuguang-200/60 dark:bg-fuguang-700/60"></div>
      </div>

      {/* 规格选择器 */}
      <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-chizhi-400 dark:bg-chizhi-500 rounded-full animate-pulse"></div>
          <h3 className="text-xl font-bold text-shanfan-700 dark:text-shanfan-300">
            选择规格
          </h3>
        </div>
        
        <div className="relative p-6 bg-shanfan-50/80 dark:bg-yuepo-900/80 rounded-3xl border border-fuguang-200/50 dark:border-fuguang-700/30 shadow-lg group">
          {/* 装饰性边框 */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-fuguang-300/40 dark:border-fuguang-600/40 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-chizhi-300/40 dark:border-chizhi-600/40 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <VariantSelector options={product.options} variants={product.variants} />
        </div>
      </div>

      {/* 购买按钮区域 */}
      <div className="pt-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
        {/* 装饰性分隔线 */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-1 h-px bg-chizhi-200/60 dark:bg-chizhi-700/60"></div>
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-chizhi-400/60 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-fuguang-400/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 rounded-full bg-chizhi-400/60 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div className="flex-1 h-px bg-chizhi-200/60 dark:bg-chizhi-700/60"></div>
        </div>
        
        <AddToCart product={product} />
      </div>
    </div>
  );
}