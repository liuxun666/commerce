import Grid from 'components/grid';

/**
 * 搜索页面加载组件 - 温润工艺美学风格
 * 提供优雅的加载动画效果，采用高对比度配色方案
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-shanfan-50 via-shanfan-100 to-fuguang-50 dark:from-yuepo-950 dark:via-yuepo-900 dark:to-shanfan-950 animate-fade-in">
      {/* 加载标题区域 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {/* 标题骨架屏 */}
          <div className="animate-pulse space-y-6">
            <div className="h-16 bg-gradient-to-r from-fuguang-200/60 via-chizhi-200/40 to-fuguang-200/60 dark:from-fuguang-700/60 dark:via-chizhi-700/40 dark:to-fuguang-700/60 rounded-2xl mx-auto max-w-md animate-breathe"></div>
            <div className="h-6 bg-gradient-to-r from-shanfan-200/60 to-fuguang-200/40 dark:from-shanfan-700/60 dark:to-fuguang-700/40 rounded-xl mx-auto max-w-2xl animate-pulse"></div>
          </div>
          
          {/* 装饰性分隔线 */}
          <div className="mt-12 flex items-center justify-center animate-pulse">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-400/60 to-transparent w-40 animate-pulse"></div>
            <div className="mx-6 w-3 h-3 bg-chizhi-300/60 dark:bg-chizhi-600/60 rounded-full animate-float"></div>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-400/60 to-transparent w-40 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* 商品网格加载区域 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* 统计信息骨架屏 */}
          <div className="text-center mb-12">
            <div className="h-6 bg-gradient-to-r from-shanfan-200/60 to-fuguang-200/40 dark:from-shanfan-700/60 dark:to-fuguang-700/40 rounded-xl mx-auto max-w-xs animate-pulse"></div>
            
            {/* 装饰性分隔线 */}
            <div className="mt-8 flex items-center justify-center">
              <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-300/60 to-transparent w-32 animate-pulse"></div>
              <div className="mx-4 w-2 h-2 bg-chizhi-300/60 dark:bg-chizhi-600/60 rounded-full animate-float"></div>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-300/60 to-transparent w-32 animate-pulse"></div>
            </div>
          </div>
          
          {/* 商品网格骨架屏 */}
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {Array(12)
              .fill(0)
              .map((_, index) => {
                return (
                  <Grid.Item 
                    key={index} 
                    className="group animate-pulse bg-gradient-to-br from-shanfan-100/80 to-fuguang-100/60 dark:from-yuepo-800/80 dark:to-shanfan-900/60 rounded-3xl p-6 shadow-lg backdrop-blur-sm border border-fuguang-200/50 dark:border-fuguang-700/30 hover:shadow-xl transition-all duration-500"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* 商品图片骨架 */}
                    <div className="aspect-square bg-gradient-to-br from-fuguang-200/60 via-chizhi-200/40 to-fuguang-200/60 dark:from-fuguang-700/60 dark:via-chizhi-700/40 dark:to-fuguang-700/60 rounded-2xl mb-6 animate-breathe"></div>
                    
                    {/* 商品标题骨架 */}
                    <div className="space-y-4">
                      <div className="h-6 bg-gradient-to-r from-shanfan-200/60 to-fuguang-200/40 dark:from-shanfan-700/60 dark:to-fuguang-700/40 rounded-xl animate-pulse"></div>
                      <div className="h-4 bg-gradient-to-r from-fuguang-200/40 to-shanfan-200/60 dark:from-fuguang-700/40 dark:to-shanfan-700/60 rounded-lg w-3/4 animate-pulse"></div>
                    </div>
                    
                    {/* 价格骨架 */}
                    <div className="mt-6 h-8 bg-gradient-to-r from-chizhi-200/60 to-fuguang-200/40 dark:from-chizhi-700/60 dark:to-fuguang-700/40 rounded-xl w-1/2 animate-pulse"></div>
                    
                    {/* 装饰性边框 */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-fuguang-300/40 dark:border-fuguang-600/40 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-chizhi-300/40 dark:border-chizhi-600/40 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Grid.Item>
                );
              })}
          </Grid>
        </div>
      </section>
    </div>
  );
}
