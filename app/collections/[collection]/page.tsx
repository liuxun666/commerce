import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';

/**
 * 生成品类页面元数据 - SEO优化
 */
export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: `${collection.title} - 传统风水服务`,
    description: collection.seo?.description || collection.description || `精选${collection.title}系列传统摆件，承载东方文化底蕴，为您的生活空间增添雅致韵味。`,
    keywords: `${collection.title},传统风水,服务,传统工艺,文化摆件,${collection.title}装饰`,
    openGraph: {
      title: `${collection.title} - 传统风水服务`,
      description: collection.seo?.description || `发现${collection.title}系列的精美传统摆件`,
      type: 'website'
    }
  };
}

/**
 * 品类页面组件 - 温润工艺美学风格
 * 展示特定品类下的所有商品，采用高对比度配色方案
 */
export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  
  const collection = await getCollection(params.collection);
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });

  if (!collection) return notFound();

  return (
    <div className="min-h-screen animate-fade-in">
      {/* 品类标题区域 */}
      <section className="py-10 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-8 animate-breathe">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-xl text-secondary max-w-4xl mx-auto leading-relaxed font-medium animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {collection.description}
            </p>
          )}
          
          {/* 装饰性分隔线 - 增强艺术感 */}
          <div className="mt-12 flex items-center justify-center animate-pulse">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-500 to-transparent w-40"></div>
            <div className="mx-6 w-3 h-3 bg-chizhi-400 rounded-full animate-float"></div>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-500 to-transparent w-40"></div>
          </div>
        </div>
      </section>

      {/* 商品展示区域 */}
      <section className="py-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="max-w-7xl mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-20 animate-slide-up">
              <div className="relative rounded-3xl p-16 max-w-lg mx-auto shadow-2xl backdrop-blur-sm border border-fuguang-200/50 dark:from-yuepo-800/80 dark:to-shanfan-900/60 dark:border-fuguang-700/30 hover:shadow-3xl transition-all duration-700 animate-hover-float">
                {/* 装饰性图标 */}
                <div className="mb-8 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-chizhi-500 dark:bg-chizhi-400 flex items-center justify-center animate-pulse">
                    <svg className="w-8 h-8 text-shanfan-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-yuepo-800 dark:text-shanfan-100 mb-6">暂无商品</h3>
                <p className="text-lg text-yuepo-600 dark:text-yuepo-300 font-medium">
                  该品类下暂时没有商品，请关注我们的最新上架信息。
                </p>
                
                {/* 装饰性边框 */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-fuguang-400/60 rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-chizhi-400/60 rounded-br-3xl"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-12 animate-fade-in">
              {/* 商品网格 */}
              <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                <ProductGridItems products={products} />
              </Grid>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
