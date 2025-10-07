import {
  CheckIcon,
  ShieldCheckIcon,
  SparklesIcon,
  StarIcon,
  TruckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { FeaturesSection } from 'components/features-section';
import { GridTileImage } from 'components/grid/tile';
import Footer from 'components/layout/footer';
import FAQSectionClient from 'components/product/faq-section';
import { Gallery } from 'components/product/gallery';
import { ProductCard } from 'components/product/prodcut-card';
import { ProductBasicInfo } from 'components/product/product-basic-info';
import { ProductProvider } from 'components/product/product-context';
import { ProductDetailDescription } from 'components/product/product-detail-description';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations, getProducts } from 'lib/shopify';
import { Image } from 'lib/shopify/types';
import { parseProductPageData, type ImageCTASection } from 'lib/types/product-page-data';

export const revalidate = 60;

/**
 * 生成 product2 商品页面的元数据（SEO）
 * - 使用 SSR 生成动态元信息
 * - 根据商品是否可索引控制 robots
 */
export async function generateMetadata(props: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);
  if (!product) return notFound();
  const productPageData = parseProductPageData(product);

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: `${productPageData?.name || product.title} | 商品详情`,
    description: productPageData?.description || product.description || '精选优雅且功能与美感平衡的商品详情页展示。',
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: { index: indexable, follow: indexable }
    },
    openGraph: url
      ? {
        title: `${productPageData?.name || product.title} | 商品详情`,
        description: productPageData?.description || product.description || '优雅极简的东方美学商品详情页',
        type: 'website',
        images: [{ url, width, height, alt: alt || product.title }]
      }
      : null
  };
}

/**
 * product2 页面主组件
 * - 布局：顶部画廊 + 基本信息；下部为图文模块、优势、对比、FAQ、口碑与评论、推荐等
 * - 样式：尽量采用黑白灰文字，保留极简优雅的圆角与细腻微交互
 * - 数据：复用 lib/shopify 的 getProduct / getProductRecommendations，并解析 product_page_data 元字段
 */
export default async function Product2Page(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  // 解析产品页面数据
  const productPageData = parseProductPageData(product);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productPageData?.name || product.title,
    description: productPageData?.description || product.description || '精选优雅且功能与美感平衡的商品详情页展示。',
    image: product.featuredImage?.url,
    brand: { '@type': 'Brand', name: '檀轩' },
    offers: {
      '@type': 'AggregateOffer',
      offerCount: product.variants.length,
      availability: product.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: productPageData?.best_comment.star || 4.5,
        bestRating: 5,
        worstRating: 1
      },
      author: {
        '@type': 'Person',
        name: productPageData?.best_comment.username
      },
      datePublished:  product.updatedAt
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: productPageData?.review_data.average_rating || 4.9,
      reviewCount: productPageData?.review_data.total_reviews || 0
    }
  };

  return (
    <div className="min-h-screen bg-app">
      <ProductProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

        {/* 顶部区域：画廊 + 基本信息 */}
        <section className="max-w-7xl mx-auto px-4 pt-8 pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 rounded-3xl border border-card bg-card p-6 md:p-10">
            {/* 图片画廊 */}
            <div className="min-w-0">
              <Suspense
                fallback={<div className="relative aspect-square max-h-[600px] w-full rounded-2xl bg-surface animate-pulse" />}
              >
                <Gallery
                  images={product.images.map((img: Image) => ({ src: img.url, altText: img.altText }))}
                />
              </Suspense>
            </div>

            {/* 商品基本信息 */}
            <div className="min-w-0 mt-8 lg:mt-0">
              <Suspense
                fallback={<div className="space-y-4 animate-pulse"><div className="h-8 bg-surface rounded" /><div className="h-6 bg-surface rounded w-1/3" /></div>}
              >
                <ProductBasicInfo product={product} productPageData={productPageData} />
              </Suspense>

              {/* 店铺/服务信息条 */}
              <ServiceStrip />

              {/* 精选评论展示 */}
              {productPageData?.best_comment && (
                <BestCommentInline comment={productPageData.best_comment} />
              )}
              
            </div>
          </div>
        </section>

        {/* 动态图文模块 */}
        {productPageData?.image_cta_sections && productPageData.image_cta_sections.length > 0 ? (
          <DynamicImageCTASections sections={productPageData.image_cta_sections} />
        ) : (
          // 展示product的内容
          <ProductDetailDescription product={product}/>
        )}

        {/* FAQ 折叠问答 */}
        <FAQSectionClient faqs={productPageData?.faqs} />

        {/* 用户口碑与评论 */}
        {productPageData?.review_data ? (
          <ReviewsAndSocialProofSectionWithData reviewData={productPageData.review_data} />
        ) : (
          <ReviewsAndSocialProofSection />
        )}

        {/* 核心优势模块（可复用站点 FeaturesSection） */}
        <section className="max-w-7xl mx-auto px-4 py-4">
          <FeaturesSection />
        </section>

        {/* 相关推荐 */}
        <RelatedProducts id={product.id} />

        <Footer />
      </ProductProvider>
    </div>
  );
}

/**
 * 内联精选评论展示组件
 * 用途：在产品信息区域内展示最佳用户评论，紧凑布局
 * 输入：comment（包含头像、用户名、评分、评论内容）
 * 输出：渲染为紧凑卡片形式的精选评论
 */
function BestCommentInline({ comment }: { comment: { avatar: string; username: string; star: number; comment: string } }) {
  return (
    <div className="mt-6 rounded-xl border border-card bg-surface p-4 card-interactive">
      <div className="flex items-start gap-3">
        <img 
          src={comment.avatar} 
          alt={comment.username}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-primary text-sm">{comment.username}</span>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon 
                  key={i} 
                  className={`w-3 h-3 ${i < comment.star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
          </div>
          <p className="text-secondary text-sm leading-relaxed">{comment.comment}</p>
        </div>
      </div>
    </div>
  );
}


/**
 * 精选评论展示组件
 * 用途：展示最佳用户评论，增强社会背书
 * 输入：comment（包含头像、用户名、评分、评论内容）
 * 输出：渲染为卡片形式的精选评论
 */
function BestCommentSection({ comment }: { comment: { avatar: string; username: string; star: number; comment: string } }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="rounded-3xl border border-card bg-card p-6 md:p-10">
        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">精选评论</h3>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <img 
              src={comment.avatar} 
              alt={comment.username}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-primary">{comment.username}</span>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`w-4 h-4 ${i < comment.star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-secondary leading-relaxed">{comment.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 动态图文模块组件
 * 用途：根据不同类型渲染不同布局的图文内容
 * 输入：sections（图文模块数组）
 * 输出：渲染为多种布局类型的图文展示
 */
function DynamicImageCTASections({ sections }: { sections: ImageCTASection[] }) {
  return (
    <>
      {sections.map((section, index) => (
        <DynamicImageCTASection key={index} section={section} />
      ))}
    </>
  );
}

/**
 * 单个动态图文模块组件
 * 用途：根据类型渲染不同布局的单个图文内容
 * 输入：section（单个图文模块数据）
 * 输出：渲染为对应类型的图文展示
 */
function DynamicImageCTASection({ section }: { section: ImageCTASection }) {
  const { type, image, title, description, button_text, sub_descriptions, compare_items, enhance_items } = section;

  if (type === 'compare') {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-8 p-6 md:p-10 rounded-3xl bg-surface card-interactive">
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-primary">{title}</h3>
            <p className="text-secondary">{description}</p>
            <div>
              <Link href="#buy" className="inline-flex items-center justify-center rounded-xl btn-primary px-6 py-3 text-sm font-semibold hover:shadow-elegant-lg transition-colors">{button_text || '立即购买'}</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-card bg-card overflow-hidden shadow-sm">
            <div className="grid grid-cols-3">
              <div className="py-4 px-6 bg-surface"></div>
              <div className="py-4 px-6 text-sm font-semibold text-primary text-center">本产品</div>
              <div className="py-4 px-6 text-sm font-semibold text-secondary text-center">其他</div>
            </div>
            <ul>
              {compare_items?.map((item, i) => (
                <li key={item}>
                  <div className="grid grid-cols-3">
                    <div className={`py-4 px-6 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface'} text-primary`}>{item}</div>
                    <div className="flex items-center justify-center py-4">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-surface">
                        <CheckIcon className="w-5 h-5 text-green-500" />
                      </span>
                    </div>
                    <div className="flex items-center justify-center py-4">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-surface">
                        <XMarkIcon className="w-5 h-5 text-red-500" />
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  if (type === 'enhance-list') {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="rounded-3xl border border-card bg-card p-6 md:p-10 card-interactive">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {image && (
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">{title}</h3>
              <div className="space-y-4">
                {enhance_items?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-primary">{item.score}%</div>
                    <div className="text-secondary">{item.title}</div>
                  </div>
                ))}
              </div>
              {button_text && (
                <div>
                  <Link href="#buy" className="inline-flex items-center justify-center rounded-xl btn-primary px-6 py-3 text-sm font-semibold hover:shadow-elegant-lg transition-colors">{button_text}</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (type === 'image-center') {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="rounded-3xl border border-card bg-card p-6 md:p-10">
          {/* 顶部标题和描述 */}
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">{title}</h3>
            {description && <p className="text-secondary max-w-2xl mx-auto">{description}</p>}
          </div>
          
          {/* 主要内容区域：左侧特性 + 中央图片 + 右侧特性 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* 左侧特性 */}
            {sub_descriptions && sub_descriptions.length >= 2 && (
              <div className="space-y-6 lg:text-right">
                {sub_descriptions.slice(0, 2).map((sub, index) => (
                  <div key={index} className="flex items-center gap-4 lg:flex-row-reverse">
                    <div className="w-12 h-12 flex-shrink-0 rounded-full bg-primary/10 p-2">
                      {sub.icon && (
                        <img src={sub.icon} alt={sub.title} className="w-full h-full object-contain" />
                      )}
                    </div>
                    <div className="flex-1 lg:text-right">
                      <h4 className="font-semibold text-primary mb-2  text-center">{sub.title}</h4>
                      <p className="text-sm text-secondary leading-relaxed text-center">{sub.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* 中央圆形图片 */}
            {image && (
              <div className="flex justify-center">
                <div className="relative w-96 h-96 rounded-full overflow-hidden border-4 border-card shadow-lg">
                  <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>
              </div>
            )}
            
            {/* 右侧特性 */}
            {sub_descriptions && sub_descriptions.length >= 4 && (
              <div className="space-y-6">
                {sub_descriptions.slice(2, 4).map((sub, index) => (
                  <div key={index + 2} className="flex items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0 rounded-full bg-primary/10 p-2">
                      {sub.icon && (
                        <img src={sub.icon} alt={sub.title} className="w-full h-full object-contain" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary mb-2 text-center">{sub.title}</h4>
                      <p className="text-sm text-secondary leading-relaxed text-center">{sub.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {button_text && (
            <div className="text-center mt-12">
              <Link href="#buy" className="inline-flex items-center justify-center rounded-xl btn-primary px-6 py-3 text-sm font-semibold hover:shadow-elegant-lg transition-colors">{button_text}</Link>
            </div>
          )}
        </div>
      </section>
    );
  }

  // image-left 和 image-right 布局
  const isImageLeft = type === 'image-left';
  
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="rounded-3xl border border-card bg-card p-6 md:p-10 card-interactive">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${isImageLeft ? '' : 'md:grid-flow-col-dense'}`}>
          <div className={`relative aspect-square w-full rounded-3xl overflow-hidden ${isImageLeft ? '' : 'md:col-start-2'}`}>
            {image && <img src={image} alt={title} className="w-full h-full object-cover" />}
          </div>
          <div className={`space-y-6 ${isImageLeft ? '' : 'md:col-start-1'}`}>
            <h3 className="text-2xl md:text-3xl font-bold text-primary">{title}</h3>
            {description && <p className="text-secondary">{description}</p>}
            {button_text && (
              <div>
                <Link href="#buy" className="inline-flex items-center justify-center rounded-xl btn-primary px-6 py-3 text-sm font-semibold hover:shadow-elegant-lg transition-colors">{button_text}</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * FAQ 组件（使用元字段数据）
 * 用途：展示来自元字段的 FAQ 数据
 * 输入：faqs（FAQ 数组）
 * 输出：渲染为折叠式问答列表
 */
function FAQSectionWithData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="rounded-3xl border border-card bg-card p-6 md:p-10 shadow-sm">
        <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6">常见问题</h3>
        <div className="divide-y divide-card">
          {faqs.map((faq, index) => (
            <div key={index} className="py-4">
              <h4 className="text-lg font-medium text-primary mb-2">{faq.question}</h4>
              <p className="text-secondary">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 评论和社会背书组件（使用元字段数据）
 * 用途：展示来自元字段的评论数据
 * 输入：reviewData（评论数据对象）
 * 输出：渲染为统计信息和评论列表
 */
function ReviewsAndSocialProofSectionWithData({ reviewData }: { reviewData: { average_rating: number; good_rating: number; total_reviews: number; reviews: Array<{ rating: number; comment: string; name: string }> } }) {
  const stats = [
    { label: '综合评分', value: `${reviewData.average_rating}/5` },
    { label: '好评率', value: `${reviewData.good_rating}%` },
    { label: '累计评价', value: `${reviewData.total_reviews}+` }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="rounded-3xl border border-card bg-card p-6 md:p-10 card-interactive">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-primary">用户口碑与评论</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-card bg-surface p-6 text-center">
              <p className="text-sm text-secondary">{s.label}</p>
              <p className="mt-2 text-2xl font-semibold text-primary">{s.value}</p>
            </div>
          ))}
        </div>  

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewData.reviews.slice(0, 9).map((review, idx) => (
            <div key={review.name + idx} className="rounded-xl border border-card bg-surface p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-primary">{maskUsername(review.name)}</p>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-xs text-secondary">已验证买家</span>
                </div>
              </div>
              <div className="mt-2 flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <p className="mt-3 text-sm text-secondary">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function ServiceStrip() {
  const items = [
    { icon: TruckIcon, title: '快速发货', desc: '专业物流，安全包装' },
    { icon: ShieldCheckIcon, title: '品质保障', desc: '支持七天无理由退换' },
    { icon: SparklesIcon, title: '匠心工艺', desc: '精致做工，舒适佩戴' }
  ];

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((it) => (
        <div key={it.title} className="flex card-interactive items-center gap-3 rounded-xl border border-card bg-card p-4">
          <div className="w-10 h-10 rounded-lg bg-surface p-2">
            <it.icon className="w-full h-full text-secondary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-primary">{it.title}</p>
            <p className="text-xs text-secondary">{it.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 大幅图 + CTA 模块
 * - 以大图突出商品气质，配合行动按钮聚焦转化
 */
/**
 * ImageCTASection 组件
 * 用途：展示精选商品大图与核心文案，并提供主行动按钮。
 * 输入：product（包含 featuredImage 可选字段）
 * 输出：渲染包含图片、文案与购买按钮的横向两列布局。
 */
function ImageCTASection({ product }: { product: { featuredImage?: Image } }) {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-12">
      <div className="rounded-3xl border border-card bg-card p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden">
            {product.featuredImage?.url ? (
              <GridTileImage
                alt={product.featuredImage?.altText || 'product image'}
                src={product.featuredImage.url}
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
              />
            ) : null}
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-primary">精选材质，精工细作</h3>
            <p className="text-secondary">每一处细节都经过打磨，优雅与舒适并重，满足日常佩戴与收藏欣赏的双重需求。</p>
            <div>
              <Link href="#buy" className="inline-flex items-center justify-center rounded-xl btn-primary px-6 py-3 text-sm font-semibold hover:shadow-elegant-lg transition-colors">立即购买</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 关键维度优劣对比
 * - 左侧为标题与描述、按钮；右侧为三列表格：维度 | 本店产品 | 其他商家
 * - 本店列用绿色勾（CheckIcon），其他列用灰色 X（XMarkIcon）
 */
/**
 * ComparisonSection 组件
 * 用途：以三列表格结构展示产品在关键维度的优势比较。
 * 输入：内部定义标题、描述与维度集合。
 * 输出：呈现左文案与右侧对比表格的组合模块。
 */
function ComparisonSection() {
  const title = '多圈幸运金砂手链的独特之处';
  const desc = '多圈幸运金砂手链以其独特的设计和寓意，提供无与伦比的佩戴体验，提升您的个人风格和自信心。';
  const features = ['设计', '寓意', '舒适', '百搭', '价格'];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-6 md:p-10 rounded-3xl bg-surface">
        {/* 左侧说明 */}
        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-primary">{title}</h3>
          <p className="text-secondary">{desc}</p>
          <div>
            <Link href="#buy" className="inline-flex items-center justify-center rounded-xl btn-primary px-6 py-3 text-sm font-semibold hover:shadow-elegant-lg transition-colors">立即购买</Link>
          </div>
        </div>

        {/* 右侧三列对比表 */}
        <div className="rounded-3xl border border-card bg-card overflow-hidden shadow-sm">
          {/* 表头 */}
          <div className="grid grid-cols-3">
            <div className="py-4 px-6 bg-surface">{/* 维度 */}</div>
            <div className="py-4 px-6 text-sm font-semibold text-primary text-center">多圈幸运金砂手链</div>
            <div className="py-4 px-6 text-sm font-semibold text-secondary text-center">其他</div>
          </div>
          {/* 行 */}
          <ul>
            {features.map((name, i) => (
              <li key={name}>
                <div className="grid grid-cols-3">
                  {/* 维度名：左列深灰块 */}
                  <div className={`py-4 px-6 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface'} text-primary`}>{name}</div>
                  {/* 本店产品：绿色勾 */}
                  <div className="flex items-center justify-center py-4">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-surface">
                      <CheckIcon className="w-5 h-5" color='green' />
                    </span>
                  </div>
                  {/* 其他商家：灰色 X */}
                  <div className="flex items-center justify-center py-4">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-surface">
                      <XMarkIcon className="w-5 h-5" color='red' />
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * 次级图文模块组合
 * - 两张配图与文字说明，形成更完整的叙述节奏
 */
/**
 * SecondaryImagesSection 组件
 * 用途：展示两张次级图片及简短文案，承接主图后补充更多视觉信息。
 * 输入：product（包含 images 数组）
 * 输出：两列卡片，每张卡片包含图片、标题、描述与次级按钮。
 */
function SecondaryImagesSection({ product }: { product: { images: Image[] } }) {
  const pair = product.images.slice(1, 3);
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 rounded-3xl overflow-hidden">
      <div className="rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface p-6 md:p-10 overflow-hidden">
        {pair.map((img, idx) => (
          <div key={img.url + idx} className="rounded-3xl overflow-hidden border border-card bg-card p-6 md:p-8">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-surface">
              <GridTileImage alt={img.altText || 'product image'} src={img.url} fill sizes="(min-width:1024px) 40vw, 100vw" />
            </div>
            <div className="mt-6 space-y-3">
              <h4 className="text-lg font-semibold text-primary">匠心细节·精致观感</h4>
              <p className="text-sm text-secondary">线条与比例经过推敲，观感轻盈通透，兼具实用与审美。</p>
              <div>
                <Link href="#buy" className="inline-flex items-center justify-center rounded-xl btn-primary px-6 py-3 text-sm font-semibold hover:shadow-elegant-lg transition-colors">立即购买</Link>
              </div>            
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * 用户口碑与评论（综合模块）
 * - 上方：展示评价统计信息（综合评分/好评率/累计评价）
 * - 下方：展示 n 条详细用户评价（若无真实评价，服务端生成随机数据）
 */
/**
 * ReviewsAndSocialProofSection 组件
 * 用途：展示口碑统计与精选评论，增强社会背书与信任感。
 * 输入：count（生成的评论总数），display（页面展示数量）
 * 输出：统计卡片 + 评论网格列表，并可跳转查看全部评价。
 */
function ReviewsAndSocialProofSection({ count = 20, display = 9 }: { count?: number; display?: number }) {
  const stats = [
    { label: '综合评分', value: '5/5' },
    { label: '好评率', value: '100%' },
    { label: '累计评价', value: '1,263+' }
  ];

  const reviews = getRandomReviews(count);
  const shown = reviews.slice(0, display);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="rounded-3xl border border-card bg-card p-6 md:p-10">
        {/* 口碑统计 */}
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-primary">用户口碑与评论</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-card bg-surface p-6 text-center">
              <p className="text-sm text-secondary">{s.label}</p>
              <p className="mt-2 text-2xl font-semibold text-primary">{s.value}</p>
            </div>
          ))}
        </div>

        {/* 详细评论 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((r, idx) => (
            <div key={r.username + idx} className="rounded-xl border border-card bg-surface p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-primary">{r.username}</p>
                {r.verified && <span className="text-xs text-secondary">已验证买家</span>}
              </div>
              <div className="mt-2 flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className='w-4 h-4' color={i < r.rating ? 'orange' : 'gray'} fill={i < r.rating ? 'orange' : 'gray'} />
                ))}
              </div>
              <p className="mt-3 text-sm text-secondary">{r.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 相关商品推荐（复用 Shopify 推荐接口）
 * - 保持与既有商品页一致的推荐网格风格
 * - 当 Shopify 的推荐为空时，使用 BEST_SELLING 列表作为兜底，避免界面无内容
 */
/**
 * RelatedProducts 组件
 * 用途：展示相关推荐商品卡片，提升浏览深度与转化率。
 * 输入：id（当前商品的全局 ID，用于 Shopify 推荐接口）
 * 输出：若推荐为空，兜底展示畅销商品列表；渲染为网格卡片。
 */
async function RelatedProducts({ id }: { id: string }) {
  let related = await getProductRecommendations(id);

  if (!related.length) {
    try {
      related = await getProducts({ sortKey: 'BEST_SELLING', reverse: false });
    } catch (e) {
      return null;
    }
  }

  if (!related.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-primary">相关推荐</h2>
        <p className="text-sm text-secondary">也许您还会喜欢以下产品</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {related.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>
    </section>
  );
}

/**
 * 生成随机评论数据
 * - 返回包含用户名（已脱敏）、verified=true、rating=5、content 的数组
 */
function getRandomReviews(count: number): Array<{ username: string; verified: boolean; rating: number; content: string }> {
  const chineseNames = ['小李', '阿明', '南风', '木子', '一一', '小王', '小陈', '花卷', '西西', '阿豪', '阿强', '可乐', '星河', '景行'];
  const englishNames = ['Alex', 'Chris', 'Sam', 'Taylor', 'Jordan', 'Jamie', 'Charlie', 'Pat', 'Lee', 'Morgan', 'Casey', 'Robin'];
  const comments = [
    '做工很细致，佩戴舒适，整体质感很好。',
    '包装严实，到手完好无损，喜欢。',
    '细节很到位，颜色耐看，适合日常。',
    '物流很快，客服耐心，满意的一次购物。',
    '设计简洁优雅，搭配衣服很好看。',
    '材质手感不错，尺寸合适，值得推荐。',
    '性价比高，送人也体面。',
    '整体体验不错，会回购。',
    '质感高级，细节讲究，有氛围感。',
    '精致小巧，佩戴轻盈，没有负担。',
    '非常满意，和描述一致。',
    '颜色很美，和图片一致。'
  ];

  const namesPool = [...chineseNames, ...englishNames];
  const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]!;

  const maskName = (name: string) => {
    // 姓名脱敏：首尾保留，中间用 * 替换
    if (name.length <= 2) return name.charAt(0) + '*';
    const first = name.charAt(0);
    const last = name.charAt(name.length - 1);
    const middleLen = Math.max(1, name.length - 2);
    return first + '*'.repeat(middleLen) + last;
  };

  const list = Array.from({ length: count }).map(() => {
    const raw = pick(namesPool);
    return {
      username: maskName(raw),
      verified: true,
      rating: 5,
      content: pick(comments)
    };
  });

  return list;
}


function maskUsername(username: string) {
  if (username.length <= 3) {
    return username.charAt(0) + '*'.repeat(Math.max(0, username.length - 1));
  }
  
  const firstChar = username.charAt(0);
  const lastTwoChars = username.slice(-2);
  const stars = '*'.repeat(username.length - 3);
  
  return firstChar + stars + lastTwoChars;
}