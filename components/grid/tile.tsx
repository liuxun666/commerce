// 功能：网格图片卡片组件，统一商品卡片的基础样式与微交互效果，支持价格标签覆盖与选中态高亮
// 设计：遵循项目的东方极简美学与圆角、阴影、微交互规范；保持文字颜色为黑/白/灰
import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    // 可选：对比价（compare at price）
    compareAtAmount?: string;
    compareAtCurrencyCode?: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        // 基础容器样式：圆角、细边框、半透明背景、阴影与过渡
        'group relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border bg-card backdrop-blur-sm  transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-[1.02] hover:border-card dark:hover:border-card',
        {
          // 选中态：更强的中性色边框
          'border-2 border-primary dark:border-card': active,
          // 默认态：中性边框
          'border-card dark:border-card': !active,
          // 当存在标签时，使容器成为定位上下文
          relative: label
        }
      )}
    >
      {props.src ? (
        <Image
          className={clsx(
            // 图片显示为包含，确保商品完整呈现
            'relative h-full w-full object-contain',
            {
              // 微交互：细微缩放与对比度提升
              'transition duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-105 group-hover:contrast-105':
                isInteractive
            }
          )}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          compareAtAmount={label.compareAtAmount}
          compareAtCurrencyCode={label.compareAtCurrencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
