import { ChevronRightIcon, FireIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

/**
 * 首页英雄区域组件 - 温润工艺品主题
 * 采用高对比度配色和艺术质感设计，融入现代美学元素
 */
export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-shanfan-50 via-fuguang-50 to-shanfan-100 dark:from-yuepo-950 dark:via-shanfan-950 dark:to-yuepo-900" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center bg-red">
        {/* 主标题 */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="text-gradient-primary block mb-4">檀轩</span>
            <span className="text-2xl md:text-4xl font-medium text-shanfan-700 dark:text-shanfan-300">传承千年匠心之美</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-shanfan-600 dark:text-shanfan-400 max-w-3xl mx-auto leading-relaxed font-chinese mb-8">
            每一件作品都承载着深厚的文化底蕴和艺术价值
            <br />
            在现代生活中重拾传统匠心，让品质与美学完美融合
          </p>
          
          <p className="text-lg text-yuepo-600 dark:text-yuepo-400 max-w-2xl mx-auto font-chinese opacity-90">
            精选上乘材质，传承古法工艺，每一处细节都体现着匠人的用心与坚持
          </p>
        </div>
        
        {/* 特色标签 - 增强对比度 */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <span className="px-6 py-3 bg-fuguang-100/80 backdrop-blur-sm rounded-2xl text-base font-semibold text-fuguang-800 border border-fuguang-200 shadow-warm hover:shadow-elegant transition-all duration-300 hover:scale-105">
            匠心独运
          </span>
          <span className="px-6 py-3 bg-chizhi-50/80 backdrop-blur-sm rounded-2xl text-base font-semibold text-chizhi-700 border border-chizhi-200 shadow-warm hover:shadow-elegant transition-all duration-300 hover:scale-105">
            文化传承
          </span>
          <span className="px-6 py-3 bg-chizhi-400/80 backdrop-blur-sm rounded-2xl text-base font-semibold text-yuepo-200 border border-yuepo-200 shadow-warm hover:shadow-elegant transition-all duration-300 hover:scale-105">
            品质保证
          </span>
        </div>
        
        {/* 行动按钮 - 增强视觉冲击力 */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center" style={{ animationDelay: '0.3s' }}>
          <Link 
            href="/search" 
            className="btn-primary group inline-flex items-center gap-3 text-xl px-10 py-5 shadow-glow-fuguang hover:shadow-elegant-lg"
          >
            探索收藏
            <ChevronRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
          
          <Link 
            href="/collections/bracelet" 
            className="btn-accent group inline-flex items-center gap-3 text-xl px-10 py-5"
          >
            精选推荐
            <FireIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
        
        {/* 装饰性文字 - 增强艺术感 */}
        <div className="mt-20 opacity-75" style={{ animationDelay: '0.6s' }}>
          <p className="text-base text-yuepo-600 dark:text-yuepo-400 font-chinese tracking-widest mb-4">
            「 器以载道，匠心传世 」
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-fuguang-400 to-transparent mx-auto"></div>
        </div>
      </div>
      
      {/* 底部渐变遮罩 - 增强层次感 */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-shanfan-50/90 via-shanfan-50/50 to-transparent dark:from-yuepo-950/90 dark:via-yuepo-950/50" />
    </section>
  );
}