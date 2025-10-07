import { Carousel } from 'components/carousel';
import { FeaturesSection } from 'components/features-section';
import { ThreeItemGrid } from 'components/grid/three-items';
import { HeroSection } from 'components/hero-section';
import Footer from 'components/layout/footer';

export const metadata = {
  title: '檀轩 - 传承千年匠心之美',
  description: '探索精美的传统手工艺品，传承千年匠心工艺，展现温润质感之美。每一件作品都承载着深深的文化底蕴和艺术价值。',
  keywords: '檀轩,traditional crafts,handmade art,artistry,history,quality',
  openGraph: {
    title: '檀轩 - 传承千年匠心之美',
    description: '探索精美的传统手工艺品，传承千年匠心工艺，展现温润质感之美',
    images: ['/og-image.jpg'],
  },
};

/**
 * HomePage 首页组件
 * 用途：展示英雄区、特色网格、功能介绍与轮播等核心模块。
 * 输入：无
 * 输出：统一应用 bg-app 背景与模块间合理留白，减少渐变使用；与全局变量驱动的暗黑模式自动适配。
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-app">
      {/* 英雄区域 */}
      <section className='py-6'>
        <HeroSection />
      </section>
      
      {/* 特色商品网格 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <ThreeItemGrid />
      </section>
      
      {/* 功能特色介绍 */}
      <section className="py-16">
        <FeaturesSection />
      </section>
      
      {/* 热门推荐轮播 */}
      <section className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 w-5/6 mx-auto">
        <Carousel />
      </section>
      
      {/* 页脚 */}
      <Footer />
    </div>
  );
}
