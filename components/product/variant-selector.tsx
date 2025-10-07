'use client';

import clsx from 'clsx';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import { ProductOption, ProductVariant } from 'lib/shopify/types';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

/**
 * 变体选择器组件 - 温润工艺美学风格
 * 提供优雅的商品规格选择体验，支持多种选项和状态显示
 */
export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  // 判断是否无可选项（当商品没有 options 时，仍展示一个默认选项）
  const hasNoOptions = options.length === 0;
  if (hasNoOptions) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  return (
    <div className="space-y-8">
      {options.map((option, optionIndex) => (
        <form key={option.id} className="animate-fade-in" style={{ animationDelay: `${0.1 * optionIndex}s` }}>
          <dl className="space-y-4">
            {/* 选项标题 */}
            <dt className="flex items-center space-x-3">
              <div className="w-1 h-5 bg-chizhi-400 dark:bg-chizhi-500 rounded-full animate-pulse"></div>
              <span className="text-lg font-bold text-primary tracking-wide">
                {option.name}
              </span>
            </dt>
            
            {/* 选项值 */}
            <dd className="flex flex-wrap gap-3">
              {option.values.map((value, valueIndex) => {
                const optionNameLowerCase = option.name.toLowerCase();

                // Base option params on current selectedOptions so we can preserve any other param state.
                const optionParams = { ...state, [optionNameLowerCase]: value };

                // Filter out invalid options and check if the option combination is available for sale.
                const filtered = Object.entries(optionParams).filter(([key, value]) =>
                  options.find(
                    (option) => option.name.toLowerCase() === key && option.values.includes(value)
                  )
                );
                const isAvailableForSale = combinations.find((combination) =>
                  filtered.every(
                    ([key, value]) => combination[key] === value && combination.availableForSale
                  )
                );

                // The option is active if it's in the selected options.
                const isActive = state[optionNameLowerCase] === value;

                return (
                  <button
                    formAction={() => {
                      const newState = updateOption(optionNameLowerCase, value);
                      updateURL(newState);
                    }}
                    key={value}
                    aria-disabled={!isAvailableForSale}
                    disabled={!isAvailableForSale}
                    title={`${option.name} ${value}${!isAvailableForSale ? ' (缺货)' : ''}`}
                    className={clsx(
                      'relative group flex min-w-[60px] items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 animate-fade-in',
                      {
                        // 激活状态 - 温润工艺风格
                        'bg-chizhi-500 dark:bg-chizhi-400 text-white shadow-xl border-2 border-chizhi-400/50 dark:border-chizhi-500/50 scale-110 animate-pulse': isActive,
                        
                        // 可用状态 - 优雅悬停效果
                        'bg-shanfan-100/80 dark:bg-yuepo-800/80 text-shanfan-700 dark:text-shanfan-300 border border-fuguang-200/60 dark:border-fuguang-700/60 hover:border-chizhi-400/80 dark:hover:border-chizhi-500/80 hover:shadow-lg hover:scale-105 hover:bg-fuguang-100/90 dark:hover:bg-chizhi-800/90': 
                          !isActive && isAvailableForSale,
                        
                        // 缺货状态 - 优雅的禁用效果
                        'relative cursor-not-allowed bg-shanfan-100/40 dark:bg-yuepo-900/40 text-shanfan-400 dark:text-shanfan-600 border border-fuguang-200/30 dark:border-fuguang-700/30 opacity-60': 
                          !isAvailableForSale
                      }
                    )}
                    style={{ animationDelay: `${0.05 * valueIndex}s` }}
                  >
                    {/* 激活状态装饰边框 */}
                    {isActive && (
                      <>
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </>
                    )}
                    
                    {/* 缺货状态斜线 */}
                    {!isAvailableForSale && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-px bg-shanfan-400/60 dark:bg-shanfan-600/60 transform -rotate-45"></div>
                      </div>
                    )}
                    
                    {/* 选项值文本 */}
                    <span className="relative z-10 tracking-wide">
                      {value}
                    </span>
                    
                    {/* 悬停状态装饰 */}
                    {!isActive && isAvailableForSale && (
                      <div className="absolute inset-0 rounded-2xl bg-chizhi-500/0 group-hover:bg-chizhi-500/10 transition-all duration-300"></div>
                    )}
                  </button>
                );
              })}
            </dd>
          </dl>
        </form>
      ))}
    </div>
  );
}
