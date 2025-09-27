import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getProducts } from 'lib/shopify';

/**
 * 搜索页面元数据
 */
export const metadata = {
  title: '搜索商品 - 温润工艺',
  description: '在温润工艺中搜索您心仪的精美工艺品，发现更多承载匠心精神的温润之作。',
  keywords: '搜索,温润工艺,匠心制作,艺术品,搜索商品'
};

/**
 * 搜索页面组件 - 温润工艺美学风格
 * 提供商品搜索功能和结果展示，采用高对比度配色方案
 */
export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? '件商品' : '件商品';

  return (
    <div className="min-h-screen rounded animate-fade-in">
      {/* 搜索结果标题区域 */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4">
          {searchValue ? (
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-8">
                搜索结果
              </h1>
              <div className="space-y-6">
                {products.length === 0 ? (
                  <p className="text-xl text-yuepo-700 dark:text-yuepo-300 font-medium">
                    很抱歉，没有找到与 <span className="font-bold text-chizhi-600 dark:text-chizhi-400 px-2 py-1 bg-fuguang-100/50 dark:bg-fuguang-900/30 rounded-lg">&quot;{searchValue}&quot;</span> 相关的商品
                  </p>
                ) : (
                  <p className="text-xl text-yuepo-700 dark:text-yuepo-300 font-medium">
                    为您找到 <span className="font-bold text-chizhi-600 dark:text-chizhi-400 px-2 py-1 bg-fuguang-100/50 dark:bg-fuguang-900/30 rounded-lg">{products.length}</span> {resultsText}，
                    关键词：<span className="font-bold text-chizhi-600 dark:text-chizhi-400 px-2 py-1 bg-fuguang-100/50 dark:bg-fuguang-900/30 rounded-lg">&quot;{searchValue}&quot;</span>
                  </p>
                )}
              </div>
              
              {/* 装饰性分隔线 - 增强艺术感 */}
              <div className="mt-12 flex items-center justify-center animate-pulse">
                <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-500 to-transparent w-40"></div>
                <div className="mx-6 w-3 h-3 bg-chizhi-400 rounded-full animate-float"></div>
                <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-500 to-transparent w-40"></div>
              </div>
              
              {/* 装饰性几何图形 */}
              <div className="relative mt-8">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-2 h-2 bg-fuguang-400 rounded-full animate-float"></div>
                <div className="absolute left-1/2 top-6 -translate-x-1/2 w-1 h-1 bg-chizhi-400 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-chizhi-600 via-fuguang-600 to-chizhi-700 bg-clip-text text-transparent dark:from-chizhi-400 dark:via-fuguang-400 dark:to-chizhi-500 mb-8">
                发现温润工艺
              </h1>
              <p className="text-xl text-yuepo-700 dark:text-yuepo-300 font-medium max-w-4xl mx-auto leading-relaxed">
                浏览我们精心甄选的匠心工艺品，每一件都承载着深厚的文化内涵与温润之美
              </p>
              
              {/* 装饰性分隔线 */}
              <div className="mt-12 flex items-center justify-center animate-pulse">
                <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-500 to-transparent w-40"></div>
                <div className="mx-6 w-3 h-3 bg-chizhi-400 rounded-full animate-float"></div>
                <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-500 to-transparent w-40"></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 商品展示区域 */}
      <section className="py-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="max-w-7xl mx-auto px-4">
          {products.length > 0 ? (
            <div className="animate-fade-in">
              <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                <ProductGridItems products={products} />
              </Grid>
            </div>
          ) : searchValue ? (
            // 无搜索结果时的提示
            <div className="text-center py-20 animate-slide-up">
              <div className="relative rounded-3xl bg-gradient-to-br from-shanfan-100/80 to-fuguang-100/60 p-16 max-w-lg mx-auto shadow-2xl backdrop-blur-sm border border-fuguang-200/50 dark:from-yuepo-800/80 dark:to-shanfan-900/60 dark:border-fuguang-700/30 hover:shadow-3xl transition-all duration-500 animate-hover-float">
                {/* 装饰性图标 */}
                <div className="mb-8 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-chizhi-400 to-fuguang-500 flex items-center justify-center animate-pulse">
                    <svg className="w-8 h-8 text-shanfan-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-yuepo-800 dark:text-shanfan-100 mb-6">未找到相关商品</h3>
                <div className="space-y-6 text-yuepo-600 dark:text-yuepo-300 font-medium">
                  <p className="text-lg">请尝试以下建议：</p>
                  <ul className="space-y-3 text-left max-w-xs mx-auto">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-fuguang-400 rounded-full animate-pulse"></div>
                      <span>检查拼写是否正确</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-chizhi-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <span>使用更简单的关键词</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-fuguang-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      <span>尝试相关的搜索词</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-chizhi-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                      <span>浏览我们的商品分类</span>
                    </li>
                  </ul>
                </div>
                
                {/* 装饰性边框 */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-fuguang-400/60 rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-chizhi-400/60 rounded-br-3xl"></div>
              </div>
            </div>
          ) : (
            // 展示所有商品
            <div className="space-y-12 animate-fade-in">
              <div className="text-center">
                <p className="text-xl text-yuepo-600 dark:text-yuepo-300 font-medium">
                  共有 <span className="font-bold text-yuepo-800 dark:text-shanfan-100 px-2 py-1 bg-fuguang-100/50 dark:bg-fuguang-900/30 rounded-lg">{products.length}</span> 件精美工艺品
                </p>
                
                {/* 装饰性分隔线 */}
                <div className="mt-8 flex items-center justify-center">
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-400 to-transparent w-32 animate-pulse"></div>
                  <div className="mx-4 w-2 h-2 bg-chizhi-400 rounded-full animate-float"></div>
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-400 to-transparent w-32 animate-pulse"></div>
                </div>
              </div>
              
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
