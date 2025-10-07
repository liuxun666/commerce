import { getCollectionProducts } from 'lib/shopify';
import Link from 'next/link';

/**
 * 轮播组件 - 展示热门商品的无缝滚动轮播
 * 使用服务端渲染获取商品数据，支持无缝循环滚动效果
 */
export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  if (!products?.length) return null;

  // 复制数组以创建无缝循环效果
  const carouselProducts = [...products, ...products];

  return (
    <div className="w-full animate-fade-in">
      {/* 标题区域 */}
      <div className="mb-10 text-center animate-slide-down">
        <h2 className="mb-6 text-5xl font-bold text-primary font-chinese animate-breathe">
          热门臻选
        </h2>
        <p className="text-xl text-secondary font-medium">    
          精心甄选，品味非凡温润之美
        </p>
        <div className="mx-auto mt-8 h-0.5 w-32 bg-gradient-to-r from-transparent via-slate-500 to-transparent animate-pulse"></div>
      </div>

      {/* 轮播容器 */}
      <div className="relative overflow-hidden rounded-3xl bg-card p-8">
        {/* 背景装饰 */}
        
        <div className="flex animate-scroll space-x-8 hover:pause">
          {carouselProducts.map((product, i) => (
            <Link
              key={`${product.handle}${i}`}
              href={`/product/${product.handle}`}
              className="group relative flex-none animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative h-96 w-72 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-rotate-1 dark:from-slate-800 dark:to-slate-900 animate-hover-float">
                {/* 装饰性边框 - 增强艺术质感 */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br from-slate-300/50 via-transparent to-slate-300/50 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:animate-pulse dark:from-slate-600/30 dark:to-slate-600/30 z-10"></div>
                
                {/* 商品图片 */}
                <div className="relative h-56 overflow-hidden rounded-t-3xl">
                  <img
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />
                </div>
                
                {/* 商品信息 */}
                <div className="p-8 relative z-20">
                  <h3 className="mb-3 line-clamp-2 text-xl font-bold text-slate-800 dark:text-slate-100 transition-all duration-300 group-hover:text-slate-600 dark:group-hover:text-slate-300 ">
                    {product.title}
                  </h3>
                  <p className="text-2xl font-bold text-slate-600 dark:text-slate-400 transition-all duration-300 group-hover:text-slate-600 dark:group-hover:text-slate-400">
                    {product.priceRange.maxVariantPrice.amount} {product.priceRange.maxVariantPrice.currencyCode}
                  </p>
                  
                  {/* 装饰性元素 - 增强艺术感 */}
                  <div className="mt-6 flex items-center space-x-2">
                    <div className="h-0.5 w-16 bg-gradient-to-r from-slate-400 to-transparent opacity-80 transition-all duration-300 group-hover:w-20"></div>
                    <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* 微妙的品质标识 */}
                  <div className="absolute top-4 left-4 text-xs text-slate-600/80 dark:text-slate-200/80 font-medium tracking-wider">
                    匠心工艺
                  </div>
                </div>
                
                {/* 边角装饰 */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-slate-400/60 rounded-tl-3xl opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-slate-400/60 rounded-br-3xl opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
