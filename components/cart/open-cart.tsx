import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

/**
 * 购物车图标按钮组件 - 东方美学设计风格
 * 采用优雅的圆角、微妙的阴影和渐变效果
 */
export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white/90 to-slate-50/80 text-slate-700 shadow-lg shadow-slate-200/40 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-slate-300/80 hover:shadow-xl hover:shadow-slate-300/50 dark:border-slate-700/60 dark:from-slate-800/90 dark:to-slate-900/80 dark:text-slate-200 dark:shadow-slate-900/40 dark:hover:border-slate-600/80 dark:hover:shadow-slate-900/60">
      {/* 装饰性内边框 */}
      <div className="absolute inset-1 rounded-xl border border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:border-slate-600/30"></div>
      
      <ShoppingCartIcon
        className={clsx(
          'h-6 w-6 transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-3',
          className
        )}
      />

      {quantity ? (
        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-[10px] font-bold text-white shadow-lg shadow-red-500/30 ring-2 ring-white/80 transition-all duration-300 group-hover:scale-110 dark:ring-slate-800/80">
          <span className="relative z-10">{quantity > 99 ? '99+' : quantity}</span>
          {/* 数量徽章的光晕效果 */}
          <div className="absolute inset-0 rounded-full bg-red-400/50 blur-sm"></div>
        </div>
      ) : null}
      
      {/* 悬浮时的光晕效果 */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-slate-200/20 to-slate-300/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 dark:from-slate-600/20 dark:to-slate-700/20"></div>
    </div>
  );
}
