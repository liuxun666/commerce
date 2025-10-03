import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GridTileImage } from 'components/grid/tile';
import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { ProductBasicInfo } from 'components/product/product-basic-info';
import { ProductProvider } from 'components/product/product-context';
import { ProductDetailDescription } from 'components/product/product-detail-description';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { Image } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';

/**
 * 生成商品页面元数据 - 优化SEO
 * 包含结构化数据和Open Graph信息
 */
export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: `${product.seo.title || product.title} | 温润工艺传统摆件`,
    description: product.seo.description || product.description || '精美的温润工艺传统摆件，承载深厚文化内涵，为您的生活空间增添东方韵味。',
    keywords: `${product.title},温润工艺,传统摆件,东方美学,文化摆件,手工艺品`,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          title: `${product.title} | 温润工艺`,
          description: product.description || '精美的温润工艺传统摆件',
          type: 'website',
          images: [
            {
              url,
              width,
              height,
              alt: alt || product.title
            }
          ]
        }
      : null
  };
}

/**
 * 商品详情页面组件 - 温润工艺美学风格
 * 展示商品详细信息、图片画廊和相关推荐
 */
export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    brand: {
      '@type': 'Brand',
      name: '温润工艺'
    },
    category: '传统工艺摆件',
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-shanfan-50 via-shanfan-100 to-fuguang-50 dark:from-yuepo-950 dark:via-yuepo-900 dark:to-shanfan-950 animate-fade-in">
      <ProductProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productJsonLd)
          }}
        />
        
        {/* 面包屑导航 */}
        <div className="max-w-7xl mx-auto px-4 py-8 animate-slide-down">
          <nav className="text-sm text-shanfan-700 dark:text-shanfan-300 font-medium">
            <div className="flex items-center space-x-2">
              <span className="hover:text-chizhi-600 dark:hover:text-chizhi-400 transition-colors duration-300 cursor-pointer">首页</span>
              <div className="w-1 h-1 bg-fuguang-400 dark:bg-fuguang-500 rounded-full animate-pulse"></div>
              <span className="hover:text-chizhi-600 dark:hover:text-chizhi-400 transition-colors duration-300 cursor-pointer">传统摆件</span>
              <div className="w-1 h-1 bg-fuguang-400 dark:bg-fuguang-500 rounded-full animate-pulse"></div>
              <span className="text-chizhi-700 dark:text-chizhi-300 font-semibold">{product.title}</span>
            </div>
          </nav>
        </div>

        {/* 主要内容区域 */}
        <div className="max-w-7xl mx-auto px-4 pb-20 space-y-12">
          {/* 上半部分：图片和基本信息 */}
          <div className="relative bg-gradient-to-br from-shanfan-100/80 via-fuguang-100/60 to-shanfan-200/70 dark:from-yuepo-800/80 dark:via-shanfan-900/60 dark:to-yuepo-700/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:flex lg:gap-16 shadow-2xl border border-fuguang-200/50 dark:border-fuguang-700/30 animate-slide-up">
            {/* 装饰性几何图形 */}
            <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-chizhi-200/30 to-fuguang-200/30 dark:from-chizhi-700/30 dark:to-fuguang-700/30 rounded-2xl rotate-12 animate-float"></div>
            <div className="absolute bottom-6 left-6 w-12 h-12 bg-gradient-to-br from-fuguang-200/30 to-shanfan-200/30 dark:from-fuguang-700/30 dark:to-shanfan-700/30 rounded-xl -rotate-12 animate-breathe"></div>
            
            {/* 商品图片画廊 */}
            <div className="w-full lg:w-1/2 lg:flex-1 min-w-0 animate-fade-in">
              <Suspense
                fallback={
                  <div className="relative aspect-square h-full max-h-[600px] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-fuguang-200/60 via-chizhi-200/40 to-fuguang-200/60 dark:from-fuguang-700/60 dark:via-chizhi-700/40 dark:to-fuguang-700/60 animate-pulse">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-chizhi-300/60 dark:border-chizhi-600/60 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>
                }
              >
                <Gallery
                  images={product.images.slice(0, 5).map((image: Image) => ({
                    src: image.url,
                    altText: image.altText
                  }))}
                />
              </Suspense>
            </div>

            {/* 商品基本信息（标题、价格、规格选择） */}
            <div className="w-full lg:w-1/2 lg:flex-1 lg:pl-8 mt-8 lg:mt-0 min-w-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Suspense fallback={
                <div className="space-y-6 animate-pulse">
                  <div className="h-12 bg-gradient-to-r from-shanfan-200/60 to-fuguang-200/40 dark:from-shanfan-700/60 dark:to-fuguang-700/40 rounded-2xl"></div>
                  <div className="h-8 bg-gradient-to-r from-chizhi-200/60 to-fuguang-200/40 dark:from-chizhi-700/60 dark:to-fuguang-700/40 rounded-xl w-1/3"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gradient-to-r from-fuguang-200/40 to-shanfan-200/60 dark:from-fuguang-700/40 dark:to-shanfan-700/60 rounded-lg"></div>
                    <div className="h-4 bg-gradient-to-r from-shanfan-200/60 to-fuguang-200/40 dark:from-shanfan-700/60 dark:to-fuguang-700/40 rounded-lg w-4/5"></div>
                    <div className="h-4 bg-gradient-to-r from-fuguang-200/40 to-chizhi-200/60 dark:from-fuguang-700/40 dark:to-chizhi-700/60 rounded-lg w-3/4"></div>
                  </div>
                </div>
              }>
                <ProductBasicInfo product={product} />
              </Suspense>
            </div>
          </div>

          {/* 下半部分：商品详情描述 */}
          <div className="relative bg-gradient-to-br from-shanfan-100/80 via-fuguang-100/60 to-shanfan-200/70 dark:from-yuepo-800/80 dark:via-shanfan-900/60 dark:to-yuepo-700/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-fuguang-200/50 dark:border-fuguang-700/30 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {/* 装饰性几何图形 */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-fuguang-200/30 to-chizhi-200/30 dark:from-fuguang-700/30 dark:to-chizhi-700/30 rounded-xl rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-6 left-6 w-8 h-8 bg-gradient-to-br from-chizhi-200/30 to-shanfan-200/30 dark:from-chizhi-700/30 dark:to-shanfan-700/30 rounded-lg -rotate-45 animate-breathe" style={{ animationDelay: '1.5s' }}></div>
            
            <Suspense fallback={
              <div className="space-y-6 animate-pulse">
                <div className="h-8 bg-gradient-to-r from-shanfan-200/60 to-fuguang-200/40 dark:from-shanfan-700/60 dark:to-fuguang-700/40 rounded-xl w-1/4"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-fuguang-200/40 to-shanfan-200/60 dark:from-fuguang-700/40 dark:to-shanfan-700/60 rounded-lg"></div>
                  <div className="h-4 bg-gradient-to-r from-shanfan-200/60 to-fuguang-200/40 dark:from-shanfan-700/60 dark:to-fuguang-700/40 rounded-lg w-5/6"></div>
                  <div className="h-4 bg-gradient-to-r from-fuguang-200/40 to-chizhi-200/60 dark:from-fuguang-700/40 dark:to-chizhi-700/60 rounded-lg w-4/5"></div>
                  <div className="h-4 bg-gradient-to-r from-chizhi-200/60 to-fuguang-200/40 dark:from-chizhi-700/60 dark:to-fuguang-700/40 rounded-lg w-3/4"></div>
                </div>
              </div>
            }>
              <ProductDetailDescription product={product} />
            </Suspense>
          </div>
        </div>
          
        {/* 相关商品推荐 */}
        <RelatedProducts id={product.id} />
        
        <Footer />
      </ProductProvider>
    </div>
  );
}

/**
 * 相关商品推荐组件 - 温润工艺美学风格
 * 展示与当前商品相关的推荐商品
 */
async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <section className="mt-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      {/* 区域标题 */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-chizhi-700 via-fuguang-600 to-shanfan-700 dark:from-chizhi-300 dark:via-fuguang-400 dark:to-shanfan-300 bg-clip-text text-transparent mb-6 animate-slide-down">
          相关推荐
        </h2>
        <p className="text-shanfan-600 dark:text-shanfan-400 text-lg font-medium animate-fade-in" style={{ animationDelay: '0.1s' }}>
          您可能还喜欢这些
        </p>
        
        {/* 装饰性分隔线 */}
        <div className="mt-8 flex items-center justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-400/60 to-transparent w-32 animate-pulse"></div>
          <div className="mx-6 w-3 h-3 bg-chizhi-300/60 dark:bg-chizhi-600/60 rounded-full animate-float"></div>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-400/60 to-transparent w-32 animate-pulse"></div>
        </div>
      </div>
      
      {/* 商品网格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {relatedProducts.map((product, index) => (
          <div
            key={product.handle}
            className="group animate-fade-in"
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            <Link
              className="block"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <div className="relative bg-gradient-to-br from-shanfan-100/80 to-fuguang-100/60 dark:from-yuepo-800/80 dark:to-shanfan-900/60 rounded-3xl overflow-hidden shadow-lg backdrop-blur-sm border border-fuguang-200/50 dark:border-fuguang-700/30 hover:shadow-2xl hover:scale-105 transition-all duration-500 group-hover:animate-hover-float">
                {/* 装饰性边框 */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-fuguang-300/40 dark:border-fuguang-600/40 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-chizhi-300/40 dark:border-chizhi-600/40 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
