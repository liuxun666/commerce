import { getCollectionProducts } from 'lib/shopify';
import Link from 'next/link';

/**
 * 三项网格组件 - 展示精选商品
 * 采用高对比度配色方案和微动画效果，提升艺术质感
 */
export async function ThreeItemGrid() {
  // 模拟商品数据
    // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  });

  if (!products?.length) return null;

  const [firstProduct, secondProduct, thirdProduct] = products;

  return (
    <section className="mx-auto max-w-screen-2xl px-4 pb-4 animate-fade-in">
      {/* 标题区域 - 独立布局，避免被商品图片遮挡 */}
      <div className="mb-10 text-center animate-slide-down">
        <h2 className="mb-6 text-2xl md:text-4xl font-medium animate-breathe">
          匠心臻选
        </h2>
        <p className="text-xl text-spring-500 font-medium">
          温润工艺，传承千年匠心之美
        </p>
        <div className="mx-auto mt-8 h-0.5 w-32 bg-gradient-to-r from-transparent via-slate-400 to-transparent animate-pulse"></div>
      </div>

      {/* 商品网格 - 调整布局确保不遮挡标题 */}
      <div className="grid gap-6 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        {/* 第一个商品 - 大尺寸 */}
        <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
        
        {/* 第二个商品 - 调整为与第三个商品一致的尺寸 */}
        <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
        
        {/* 第三个商品 - 中等尺寸 */}
        <ThreeItemGridItem size="half" item={thirdProduct} />
      </div>
    </section>
  );
}

/**
 * 网格项组件
 */
function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: any;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={`${
        size === 'full'
          ? 'md:col-span-4 md:row-span-2'
          : 'md:col-span-2 md:row-span-1'
      } animate-slide-up`}
      style={{ animationDelay: size === 'full' ? '0.2s' : size === 'half' ? '0.4s' : '0.6s' }}
    >
      <Link
        className="group relative block aspect-square h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-rotate-1 dark:from-slate-800 dark:to-slate-900 animate-hover-float"
        href={`/product/${item.handle}`}
        prefetch={priority ? true : false}
      >
        {/* 装饰性边框 - 增强艺术质感 */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br from-slate-300/50 via-transparent to-slate-300/50 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:animate-pulse dark:from-slate-600/30 dark:to-slate-600/30 z-10"></div>
        
        {/* 光晕效果 */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-slate-400/20 via-slate-400/20 to-slate-400/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100 animate-breathe"></div>
        
        {/* 商品图片 */}
        <div className="relative h-full w-full overflow-hidden rounded-3xl">
          <img
            src={item.featuredImage.url}
            alt={item.featuredImage.altText}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
          />
          {/* 渐变遮罩 - 增强对比度 */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-transparent"></div>
          
          {/* 装饰性光斑 */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-slate-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-slate-500 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* 商品信息 */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
          <h3 className={`mb-3 font-bold transition-all duration-300 group-hover:text-slate-200 line-clamp-2 ${size === 'full' ? 'text-3xl' : 'text-xl'}`}>
            {item.title}
          </h3>
          <p className={`font-bold text-slate-300 transition-all duration-300 group-hover:text-slate-200 ${size === 'full' ? 'text-2xl' : 'text-lg'}`}>
            {item.priceRange.maxVariantPrice.amount} {item.priceRange.maxVariantPrice.currencyCode}
          </p>
          
          {/* 装饰性元素 - 增强艺术感 */}
          <div className="mt-6 flex items-center space-x-2">
            <div className="h-0.5 w-20 bg-gradient-to-r from-slate-400 to-transparent opacity-80 transition-all duration-300 group-hover:w-24"></div>
            <div className="w-1 h-1 bg-slate-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* 微妙的品质标识 */}
          <div className="absolute top-4 left-4 text-xs text-slate-200/80 font-medium tracking-wider">
            匠心工艺
          </div>
        </div>
        
        {/* 悬停效果 - 增强交互感 */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-slate-800/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 z-10 animate-hover-breathe"></div>
        
        {/* 边角装饰 */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-slate-400/60 rounded-tl-3xl opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-slate-500/60 rounded-br-3xl opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
      </Link>
    </div>
  );
}

// export async function ThreeItemGrid() {
//   // Collections that start with `hidden-*` are hidden from the search page.
//   const homepageItems = await getCollectionProducts({
//     collection: 'hidden-homepage-featured-items'
//   });

//   if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

//   const [firstProduct, secondProduct, thirdProduct] = homepageItems;

//   return (
//     <section className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
//       <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
//       <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
//       <ThreeItemGridItem size="half" item={thirdProduct} />
//     </section>
//   );
// }
