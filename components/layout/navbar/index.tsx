import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import ThemeToggle from 'components/theme-toggle';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

/**
 * 导航栏组件 - 温润工艺美学设计
 * 包含品牌标识、菜单导航、搜索功能、主题切换和购物车
 * 采用温润工艺配色方案，增强视觉层次和对比度
 */
export async function Navbar() {
  const menu = await getMenu('main-menu');

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-shanfan-50/95 via-fuguang-50/90 to-shanfan-100/95 dark:from-yuepo-950/95 dark:via-shanfan-950/90 dark:to-yuepo-900/95 backdrop-blur-xl border-b border-fuguang-200/60 dark:border-yuepo-700/60 transition-all duration-300 shadow-elegant">
      {/* 顶部装饰光晕 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chizhi-400/40 through-fuguang-400/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative flex items-center justify-between py-6">
          {/* 移动端菜单按钮 */}
          <div className="block flex-none md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>

          <div className="flex w-full items-center">
            {/* 品牌标识和导航菜单 */}
            <div className="flex w-full md:w-2/5 lg:w-1/2">
              <Link
                href="/"
                prefetch={true}
                className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-8 xl:mr-12 group"
              >
                <div className="relative">
                  <LogoSquare />
                  {/* 品牌标识光晕效果 - 增强视觉冲击力 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-fuguang-400/40 to-chizhi-400/30 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm scale-110" />
                </div>
                <div className="ml-4 flex-none text-xl font-semibold text-yuepo-900 dark:text-shanfan-100 md:hidden lg:block tracking-wide">
                  {SITE_NAME || '温润工艺'}
                </div>
              </Link>
              
              {/* 桌面端导航菜单 - 增强对比度 */}
              {menu.length ? (
                <ul className="hidden gap-8 lg:gap-10 xl:gap-12 text-base md:flex md:items-center">
                  {menu.map((item: Menu) => (
                    <li key={item.title}>
                      <Link
                        href={item.path}
                        prefetch={true}
                        className="relative text-yuepo-700 dark:text-shanfan-300 hover:text-chizhi-600 dark:hover:text-chizhi-400 transition-all duration-300 font-medium tracking-wide group py-2 px-1"
                      >
                        {item.title}
                        {/* 悬停下划线效果 - 增强艺术感 */}
                        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-chizhi-500 via-fuguang-400 to-chizhi-500 group-hover:w-full transition-all duration-500 rounded-full" />
                        {/* 悬停背景光晕 */}
                        <span className="absolute inset-0 bg-gradient-to-r from-fuguang-100/0 via-fuguang-100/30 to-fuguang-100/0 dark:from-fuguang-900/0 dark:via-fuguang-900/20 dark:to-fuguang-900/0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg -z-10" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* 搜索框 - 调整宽度避免重叠 */}
            <div className="hidden justify-center md:flex md:w-1/5 lg:w-1/4">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>

            {/* 右侧功能区 - 增强视觉层次 */}
            <div className="flex items-center justify-end gap-6 lg:gap-8 md:w-2/5 lg:w-1/4">
              {/* 主题切换按钮 */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              
              {/* 购物车 */}
              <CartModal />
            </div>
          </div>
        </div>
      </div>

      {/* 底部装饰线 - 增强艺术质感 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuguang-400/50 through-chizhi-400/30 to-transparent" />
    </nav>
  );
}
