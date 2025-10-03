// 功能：价格标签组件，覆盖在商品卡片上显示标题与价格，并可选展示对比价（compare price）
// 设计：保持黑/白/灰配色与圆角半透明毛玻璃效果，强化信息层级与可读性；对比价采用灰色删除线弱化显示
import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  compareAtAmount,
  compareAtCurrencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  compareAtAmount?: string; // 可选：对比价金额
  compareAtCurrencyCode?: string; // 可选：对比价货币
  position?: 'bottom' | 'center';
}) => {
  // 逻辑：仅当compareAt存在且大于当前价格时，展示对比价
  const showCompare =
    compareAtAmount && parseFloat(compareAtAmount) > parseFloat(amount);

  return (
    <div
      className={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center'
      })}
    >
      {/* 改为上下两行布局：标题一行，价格与对比价一行，提升可读性 */}
      <div className="flex w-full flex-col items-start gap-1 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60 bg-white/70 dark:bg-black/60 p-2 text-xs font-semibold text-black dark:text-white backdrop-blur-md shadow-sm">
        {/* 商品标题（最多两行，独占一行） */}
        <h3 className="line-clamp-2 w-full pl-1 pr-1 leading-tight tracking-tight">
          {title}
        </h3>

        {/* 价格区块：当前价与可选的对比价（第二行） */}
        <div className="mt-1 flex w-full items-center gap-2">
          <Price
            // 当前价格：在此前去除白底基础上，整体略微提亮（更浅的黑灰渐变），并增加轻微高光边与玻璃质感
            className="rounded-xl px-3 py-1 text-white bg-gradient-to-b from-neutral-800/85 to-neutral-600/75 dark:from-neutral-800/85 dark:to-neutral-600/75 shadow-sm ring-1 ring-white/20 backdrop-blur-[3px]"
            amount={amount}
            currencyCode={currencyCode}
            currencyCodeClassName="hidden @[275px]/label:inline"
          />
          {showCompare ? (
            <Price
              // 对比价：灰色、删除线、与当前价并列，弱化显示
              className="text-neutral-500 dark:text-neutral-400 line-through"
              amount={compareAtAmount!}
              currencyCode={compareAtCurrencyCode || currencyCode}
              currencyCodeClassName="hidden @[275px]/label:inline"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Label;
