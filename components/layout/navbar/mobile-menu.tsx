'use client';

import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState } from 'react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ThemeToggle from 'components/theme-toggle';
import { Menu } from 'lib/shopify/types';
import Search, { SearchSkeleton } from './search';

/**
 * 移动端菜单组件 - 温润工艺美学设计
 * 提供移动端导航菜单、搜索和主题切换功能，采用高对比度配色方案
 */
export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="打开移动端菜单"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-fuguang-200 dark:border-fuguang-700 text-yuepo-800 dark:text-shanfan-200 transition-all duration-300 hover:bg-fuguang-50 dark:hover:bg-yuepo-800 hover:border-chizhi-300 dark:hover:border-chizhi-600 animate-hover-float"
      >
        <Bars3Icon className="h-6" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-yuepo-900/40 dark:bg-yuepo-950/60 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-gradient-to-b from-shanfan-50/95 via-fuguang-50/90 to-shanfan-100/95 dark:from-yuepo-900/95 dark:via-shanfan-950/90 dark:to-yuepo-800/95 backdrop-blur-xl pb-6 animate-slide-up">
              {/* 头部区域 */}
              <div className="border-b border-fuguang-200/60 dark:border-fuguang-700/60 p-6 bg-gradient-to-r from-shanfan-100/80 to-fuguang-100/60 dark:from-yuepo-800/80 dark:to-shanfan-900/60">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-yuepo-900 dark:text-shanfan-100 animate-fade-in">
                    菜单导航
                  </h2>
                  <button
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-fuguang-200 dark:border-fuguang-700 text-yuepo-800 dark:text-shanfan-200 transition-all duration-300 hover:bg-fuguang-100 dark:hover:bg-yuepo-800 hover:border-chizhi-400 dark:hover:border-chizhi-500 animate-hover-float"
                    onClick={closeMobileMenu}
                    aria-label="关闭移动端菜单"
                  >
                    <XMarkIcon className="h-6" />
                  </button>
                </div>

                {/* 搜索框 */}
                <div className="mb-6 w-full animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </Suspense>
                </div>

                {/* 主题切换 */}
                <div className="flex items-center justify-between animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <span className="text-sm text-yuepo-700 dark:text-yuepo-300 font-medium">
                    主题模式
                  </span>
                  <ThemeToggle />
                </div>
              </div>

              {/* 菜单列表 */}
              <div className="flex-1 overflow-y-auto p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                {menu.length ? (
                  <ul className="space-y-3">
                    {menu.map((item: Menu, index) => (
                      <li key={item.title} className="animate-slide-up" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                        <Link
                          href={item.path}
                          prefetch={true}
                          onClick={closeMobileMenu}
                          className="block py-4 px-6 text-lg text-yuepo-800 dark:text-shanfan-200 font-medium tracking-wide rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-fuguang-100/80 hover:to-chizhi-100/60 dark:hover:from-fuguang-900/30 dark:hover:to-chizhi-900/20 hover:text-yuepo-900 dark:hover:text-shanfan-100 hover:shadow-lg hover:scale-105 border border-transparent hover:border-fuguang-300/50 dark:hover:border-fuguang-600/50"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-chizhi-400 rounded-full opacity-60"></div>
                            <span>{item.title}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-12 animate-fade-in">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-fuguang-200 to-chizhi-200 dark:from-fuguang-700 dark:to-chizhi-700 flex items-center justify-center">
                      <svg className="w-8 h-8 text-yuepo-600 dark:text-yuepo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </div>
                    <p className="text-yuepo-600 dark:text-yuepo-400 font-medium">
                      暂无菜单项
                    </p>
                  </div>
                )}
              </div>

              {/* 底部装饰 */}
              <div className="p-6 border-t border-fuguang-200/60 dark:border-fuguang-700/60 bg-gradient-to-r from-fuguang-100/40 to-shanfan-100/60 dark:from-yuepo-800/40 dark:to-shanfan-900/60 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="text-center relative">
                  {/* 装饰性分隔线 */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-400 to-transparent w-20"></div>
                    <div className="mx-3 w-2 h-2 bg-chizhi-400 rounded-full animate-pulse"></div>
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-fuguang-400 to-transparent w-20"></div>
                  </div>
                  
                  <p className="text-xs text-yuepo-600 dark:text-yuepo-400 font-medium tracking-widest">
                    「 温润工艺 · 传承经典 」
                  </p>
                  
                  {/* 装饰性几何图形 */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-1 h-1 bg-fuguang-400 rounded-full animate-float"></div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
