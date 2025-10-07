import Footer from 'components/layout/footer';
import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import { Suspense } from 'react';
import ChildrenWrapper from './children-wrapper';

/**
 * 搜索页面布局组件
 * 采用高对比度配色方案和温润工艺美学设计
 */
export default function SearchLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-app">
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 md:flex-row min-h-screen animate-fade-in">
        {/* 左侧分类导航 */}
        <div className="pt-10 order-first w-full flex-none md:max-w-[125px] animate-slide-up">
          <div className="sticky top-8 rounded-2xl bg-gradient-to-br from-shanfan-100/80 to-fuguang-100/60 p-6 shadow-lg backdrop-blur-sm border border-fuguang-200/50 dark:from-yuepo-800/80 dark:to-shanfan-900/60 dark:border-fuguang-700/30 hover:shadow-xl transition-all duration-500 animate-hover-float">
            <Collections />
          </div>
        </div>
        
        {/* 主内容区域 */}
        <div className="order-last min-h-screen w-full md:order-none animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-fuguang-200 border-t-chizhi-500 dark:border-fuguang-700 dark:border-t-chizhi-400"></div>
            </div>
          }>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>
        
        {/* 右侧排序筛选 */}
        <div className="pt-10 order-none flex-none md:order-last md:w-[125px] animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="sticky top-8 rounded-2xl bg-gradient-to-br from-shanfan-100/80 to-fuguang-100/60 p-6 shadow-lg backdrop-blur-sm border border-fuguang-200/50 dark:from-yuepo-800/80 dark:to-shanfan-900/60 dark:border-fuguang-700/30 hover:shadow-xl transition-all duration-500 animate-hover-float">
            <FilterList list={sorting} title="排序方式" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
