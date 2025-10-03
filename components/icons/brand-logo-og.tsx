import * as React from 'react';

export type BrandLogoOGProps = {
  size?: number;
  initial?: string;
};

/**
 * 纯 SVG 品牌 Logo（用于 Open Graph 生成场景）。
 * - 服务端安全：不依赖客户端模块（如 next/image），可在 @vercel/og 的服务端渲染中使用。
 * - 视觉风格：黑白灰、圆角卡片、东方写意元素（弧线），与极简主义保持一致。
 * - 可传入首字母 initial（当前不直接在 SVG 中渲染文本，因 @vercel/og 不支持 <text>，建议在外层 HTML 中渲染）。
 * - size 控制像素尺寸。
 */
export default function BrandLogoOG({ size = 128 }: BrandLogoOGProps): React.ReactElement {
  const s = Math.max(64, Math.min(size, 512));

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Brand logo"
    >
      {/* 背景卡片：深色填充 + 细灰描边，圆角舒适 */}
      <rect x="4" y="4" width="120" height="120" rx="24" fill="#111111" stroke="#404040" strokeWidth="2" />



      {/* 内圈轮廓：轻微的结构引导，保持通透 */}
      <circle cx="64" cy="64" r="34" fill="none" stroke="#666666" strokeWidth="2" opacity="0.35" />


    </svg>
  );
}