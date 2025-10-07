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
 * 导航栏组件（统一样式版）
 * 说明：提供站点的全局导航，包含品牌标识、菜单、搜索、主题切换与购物车；采用统一的黑/白/灰风格与轻微阴影层次。
 * 输入：无（内部异步请求 Shopify 菜单：getMenu('main-menu')）。
 * 输出：返回导航栏 JSX（服务端组件），样式基于全局 CSS 变量与类（bg-surface/border-card/text-primary/text-secondary），自动适配 light/dark 模式。
 */
export async function Navbar() {
  const menu = await getMenu('main-menu');

  return (
    <nav className="sticky top-0 z-50 bg-surface backdrop-blur-xl border-b border-card transition-all duration-300 shadow-sm">
      {/* 顶部装饰线（统一样式，去除彩色渐变） */}
      {/* 已移除彩色装饰线，保持干净的顶部边缘 */}
      
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
                <div className="relative transition-transform duration-300 group-hover:scale-[1.03]">
                  <LogoSquare />
                </div>
                <div className="ml-4 flex-none text-xl font-semibold text-primary md:hidden lg:block tracking-wide">
                  {SITE_NAME || '商店'}
                </div>
              </Link>
              
              {/* 桌面端导航菜单 */}
              {menu.length ? (
                <ul className="hidden gap-8 lg:gap-10 xl:gap-12 text-base md:flex md:items-center">
                  {menu.map((item: Menu) => (
                    <li key={item.title}>
                      <Link
                        href={item.path}
                        prefetch={true}
                        className="relative text-secondary hover:text-primary transition-colors duration-300 font-medium tracking-wide py-2 px-1"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* 搜索框 */}
            <div className="hidden justify-center md:flex md:w-1/5 lg:w-1/4">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>

            {/* 右侧功能区 */}
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

      {/* 底部装饰线（保留底部边框，移除彩色渐变） */}
      {/* 已通过 border-b 实现，下方不再额外绘制 */}
    </nav>
  );
}
