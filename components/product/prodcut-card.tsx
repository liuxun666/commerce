import { GridTileImage } from "components/grid/tile";
import { Product } from "lib/shopify/types";
import Link from "next/link";

/**
 * 商品卡片组件
 */
export function ProductCard({ product }: { product: Product }) {
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
    <Link
      className="relative inline-block h-full w-full aspect-square"
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
  );
}