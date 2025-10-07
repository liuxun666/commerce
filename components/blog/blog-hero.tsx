'use client';

/**
 * Blog首页Hero组件 - 展示优雅的东方美学设计
 */
export default function BlogHero() {
  return (
    <div className="relative overflow-hidden">
      {/* 主要内容 */}
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-10">
        <div className="text-center">
          {/* 标题区域 */}
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-tag px-6 py-2 text-sm font-medium text-primary backdrop-blur-sm">  
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-tag"></span>
              探索生活美学
            </div>
            
            <h1 className="text-5xl font-light tracking-tight text-primary sm:text-6xl lg:text-7xl">
              <span className="block">品质生活</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg leading-8 text-secondary">
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