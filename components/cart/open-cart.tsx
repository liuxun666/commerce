import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

/**
 * 购物车图标按钮组件 - 统一配色方案
 * 采用优雅的圆角、微妙的阴影和统一的黑白灰配色
 * 支持 light/dark 模式自动适配，增强视觉对比度
 */
export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-primary bg-card text-primary shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-surface">
      {/* 装饰性内边框 */}
      {/* <div className="absolute inset-1 rounded-xl border border-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div> */}
      
      <ShoppingCartIcon
        className={clsx(
          'h-6 w-6 transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-3',
          className
        )}
      />

      {quantity ? (
        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg ring-2 ring-app transition-all duration-300 group-hover:scale-110">
          <span className="relative z-10">{quantity > 99 ? '99+' : quantity}</span>
          {/* 数量徽章的光晕效果 */}
          <div className="absolute inset-0 rounded-full bg-red-400/50 blur-sm"></div>
        </div>
      ) : null}
      
      {/* 悬浮时的光晕效果 */}
      <div className="absolute -inset-2 rounded-3xl bg-primary/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>
    </div>
  );
}
