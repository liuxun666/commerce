'use client';

/**
 * Blog首页Hero组件 - 展示优雅的东方美学设计
 */
export default function BlogHero() {
  return (
    <div className="relative overflow-hidden">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0">
        {/* 渐变光斑 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-slate-200/30 to-slate-300/20 dark:from-slate-700/30 dark:to-slate-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-slate-300/20 to-slate-200/30 dark:from-slate-600/20 dark:to-slate-700/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* 主要内容 */}
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-10">
        <div className="text-center">
          {/* 标题区域 */}
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-slate-100/80 dark:bg-slate-800/80 px-6 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 backdrop-blur-sm">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500"></span>
              探索生活美学
            </div>
            
            <h1 className="text-5xl font-light tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl">
              <span className="block">品质生活</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              发现生活中的美好瞬间，分享品质生活理念
              <br />
              探索东方美学与现代设计的完美融合
            </p>
          </div>

          {/* 装饰性引导元素 */}
          <div className="mt-6 flex justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
              <div className="animate-bounce">
                <svg 
                  className="h-5 w-5 text-slate-400 dark:text-slate-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}