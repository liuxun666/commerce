import './globals.css';

import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { getCart } from 'lib/shopify';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

const {SITE_NAME} = process.env;

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  description: '传承东方美学，品味经典雅韵',
  robots: {
    follow: true,
    index: true
  }
};

/**
 * RootLayout 根布局组件
 * 用途：提供全局主题（class 模式）、购物车上下文、导航与主内容区域，并应用统一样式基线。
 * 输入：children（页面内容）
 * 输出：页面框架，应用 bg-app 与 text-primary 作为全局基色，去除 dark: 前缀依赖，使用 CSS 变量驱动的类在 light/dark 下自动适配。
 */
export default async function RootLayout({ children }: { children: ReactNode }) {
  const cartPromise = getCart();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-app text-primary antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider cartPromise={cartPromise}>
            <Navbar />
            <main>
              {children}
              <Toaster closeButton />
            </main>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
