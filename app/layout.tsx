import './globals.css';

import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { GeistSans } from 'geist/font/sans';
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
 * 根布局组件 - 应用程序的主要布局结构
 * 包含主题提供者、导航栏、购物车上下文等全局组件
 */
export default async function RootLayout({ children }: { children: ReactNode }) {
  const cartPromise = getCart();

  return (
    <html lang="zh-CN" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-100">
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
