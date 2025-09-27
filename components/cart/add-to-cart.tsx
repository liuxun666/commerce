'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import LoadingDots from 'components/loading-dots';
import { useCart } from './cart-context';

/**
 * 提交按钮组件 - 东方美学设计风格
 * 采用优雅的渐变效果、精致的动画和现代化的交互体验
 */
function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonClasses = clsx(
    'group relative w-full overflow-hidden rounded-2xl px-8 py-4 font-semibold transition-all duration-500 ease-out',
    {
      // 可用状态 - 优雅的深色渐变
      'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white shadow-xl shadow-slate-800/30 hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-800/40 active:scale-[0.98] dark:from-slate-600 dark:via-slate-500 dark:to-slate-600 dark:shadow-slate-900/50':
        availableForSale && selectedVariantId,
      // 不可用状态 - 柔和的灰色
      'cursor-not-allowed bg-gradient-to-r from-slate-300 to-slate-400 text-slate-600 shadow-lg shadow-slate-300/20 dark:from-slate-700 dark:to-slate-800 dark:text-slate-400 dark:shadow-slate-900/30':
        !availableForSale || !selectedVariantId
    }
  );

  const disabledButton = !availableForSale || !selectedVariantId;

  return (
    <button
      aria-label={
        !availableForSale
          ? '缺货'
          : !selectedVariantId
          ? '请选择规格'
          : '添加到购物车'
      }
      disabled={pending || disabledButton}
      className={buttonClasses}
      type="submit"
    >
      {/* 背景动画效果 */}
      {!disabledButton && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]"></div>
      )}
      
      {/* 装饰性内边框 */}
      {!disabledButton && (
        <div className="absolute inset-0 rounded-2xl border border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      )}
      
      {/* 悬浮时的光晕效果 */}
      {!disabledButton && (
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-slate-600/20 via-slate-500/20 to-slate-600/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 dark:from-slate-400/20 dark:via-slate-300/20 dark:to-slate-400/20"></div>
      )}

      {/* 按钮内容 */}
      <div className="relative z-10 flex items-center justify-center space-x-3">
        {pending ? (
          <div className="flex items-center space-x-2">
            <LoadingDots className="bg-white" />
            <span className="text-sm">添加中...</span>
          </div>
        ) : (
          <>
            {!disabledButton && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                <PlusIcon className="h-3 w-3 transition-transform duration-300 group-hover:rotate-90" />
              </div>
            )}
            <span className="text-base">
              {!availableForSale
                ? '缺货'
                : !selectedVariantId
                ? '请选择规格'
                : '添加到购物车'}
            </span>
          </>
        )}
      </div>

      {/* 涟漪效果 */}
      {!disabledButton && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-600/0 via-slate-500/10 to-slate-600/0 opacity-0 transition-opacity duration-300 group-active:opacity-100"></div>
      )}
    </button>
  );
}

/**
 * 添加到购物车组件 - 东方美学设计风格
 * 处理商品添加到购物车的逻辑和用户交互
 */
export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        addItemAction();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
