import { CheckIcon } from '@heroicons/react/24/outline';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import { ProductPageData } from 'lib/types/product-page-data';
import { VariantSelector } from './variant-selector';

/**
 * 商品基本信息组件 - 包含标题、价格、规格选择和购买按钮
 * 用于商品页面上半部分的基本信息展示
 */
export function ProductBasicInfo({ product, productPageData }: { product: Product, productPageData?: ProductPageData }) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* 商品标题和价格区域 */}
      <div className="space-y-6 animate-slide-up">
        <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-primary leading-tight animate-slide-down">
          {productPageData?.name || product.title}
        </h1>
        <p className="text-secondary text-sm animate-slide-down" style={{ animationDelay: '0.2s' }}>
          {productPageData?.description || product.description}
        </p>

        {/* 价格标签 - 温润工艺设计 */}
        <div className="inline-flex items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="relative group">
            {/* 装饰性背景 */}
            <div className="absolute -inset-1 bg-chizhi-500/10 dark:bg-chizhi-400/10 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300 animate-breathe"></div>

            <div className="relative bg-chizhi-500 dark:bg-chizhi-400 text-white px-8 py-4 rounded-2xl shadow-xl border border-chizhi-400/30 dark:border-chizhi-500/30 transition-all duration-300">
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

      {/* 产品亮点 */}
      {productPageData?.highlights && (
        <ProductHighlights highlights={productPageData.highlights} />
      )}

      {/* 规格选择器 */}
      <div className="space-y-6 animate-slide-up card-shadow" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-chizhi-400 dark:bg-chizhi-500 rounded-full animate-pulse"></div>
          <h3 className="text-xl font-bold text-primary">
            选择规格
          </h3>
        </div>

        <div className="relative p-6 bg-card rounded-3xl border border-fuguang-200/50 dark:border-fuguang-700/30 shadow-lg group">
          {/* 装饰性边框 */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-fuguang-300/40 dark:border-fuguang-600/40 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-chizhi-300/40 dark:border-chizhi-600/40 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <VariantSelector options={product.options} variants={product.variants} />
        </div>
      </div>

      {/* 购买按钮区域 */}
      <div className="pt-8 animate-slide-up card-shadow" style={{ animationDelay: '0.6s' }}>
        <AddToCart product={product} />
      </div>
    </div>
  );
}


/**
 * 产品亮点展示组件
 * 用途：展示产品的核心特色和优势点
 * 输入：highlights（字符串数组）
 * 输出：渲染为列表形式的亮点展示
 */
function ProductHighlights({ highlights }: { highlights: string[] }) {
  return (
    <div className="mt-6 space-y-3">
      <h4 className="text-lg font-semibold text-primary">产品亮点</h4>
      <ul className="space-y-2">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-secondary">
            <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
