/**
 * 产品页面数据类型定义
 * 基于 product_page_data 元字段的 JSON schema
 */

import { Product } from "lib/shopify/types";

export interface ProductPageData {
  name: string;
  description: string;
  highlights: string[];
  best_comment: BestComment;
  image_cta_sections: ImageCTASection[];
  faqs: FAQ[];
  review_data: ReviewData;
}

export interface BestComment {
  avatar: string;
  username: string;
  star: number;
  comment: string;
}

export interface ImageCTASection {
  type: 'image-left' | 'image-right' | 'image-center' | 'compare' | 'enhance-list';
  image_idx?: number;
  image?: string;
  title: string;
  description?: string;
  sub_descriptions?: SubDescription[];
  button_text?: string;
  compare_items?: string[];
  enhance_items?: EnhanceItem[];
}

export interface SubDescription {
  icon: string;
  title: string;
  description: string;
}

export interface EnhanceItem {
  score: number;
  title: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ReviewData {
  average_rating: number;
  good_rating: number;
  total_reviews: number;
  reviews: Review[];
}

export interface Review {
  rating: number;
  comment: string;
  name: string;
}

/**
 * 解析产品元字段中的 product_page_data
 * @param metafields 产品的元字段数组
 * @returns 解析后的产品页面数据，如果未找到或解析失败则返回 null
 */
export function parseProductPageData(product: Product): ProductPageData | undefined {
  const productPageDataField = product.metafields.find(field => field?.key === 'product_page_data');
  
  if (!productPageDataField) {
    return undefined;
  }

  try {
    const ppd =  JSON.parse(productPageDataField.value) as ProductPageData;
    // 替换ppd中image_cta_sections图片为当前产品的图片
    ppd.image_cta_sections.forEach((section, idx) => {
      if (section.image_idx !== undefined) {
        section.image = product.images?.[section.image_idx % product.images.length]?.url || '';
      }
    });

    return ppd;
  } catch (error) {
    console.error('Failed to parse product_page_data:', error);
    return undefined;
  }
}