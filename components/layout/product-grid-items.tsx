import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

/**
 * 商品网格项组件
 * 作用：在商品列表中渲染每个商品卡片，并将标题、价格与可选的对比价（compare price）传递给标签组件展示
 * 逻辑：选择与maxVariantPrice匹配的变体，如果其compareAtPrice存在且大于当前价，则在Label中显示删除线对比价
 */
export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => {
        const maxAmount = product.priceRange.maxVariantPrice.amount;
        const maxCurrency = product.priceRange.maxVariantPrice.currencyCode;
        const variantForMax = product.variants.find(
          (v) => v.price.amount === maxAmount && v.price.currencyCode === maxCurrency
        );

        const compareAtAmount = variantForMax?.compareAtPrice?.amount;
        const compareAtCurrencyCode = variantForMax?.compareAtPrice?.currencyCode;
        const shouldShowCompare =
          compareAtAmount && parseFloat(compareAtAmount) > parseFloat(maxAmount);

        return (
          <Grid.Item key={product.handle} className="animate-fadeIn">
            <Link
              className="relative inline-block h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: maxAmount,
                  currencyCode: maxCurrency,
                  compareAtAmount: shouldShowCompare ? compareAtAmount : undefined,
                  compareAtCurrencyCode: shouldShowCompare ? compareAtCurrencyCode : undefined
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </Link>
          </Grid.Item>
        );
      })}
    </>
  );
}
