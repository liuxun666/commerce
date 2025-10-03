import { readFile } from 'fs/promises';
import { ImageResponse } from 'next/og';
import { join } from 'path';
import BrandLogoOG from './icons/brand-logo-og';

export type Props = {
  title?: string;
};

/**
 * 生成 Open Graph 图片（OG Image），仅使用服务端安全的元素，避免引用客户端组件。
 * - 不使用 next/image 等客户端模块，确保在服务端环境下可渲染。
 * - 加载本地字体以实现标题的粗体展示。
 * - 视觉风格：黑白灰极简卡片，符合项目的东方美学与留白风格。
 */
export default async function OpengraphImage(
  props?: Props
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME
    },
    ...props
  };

  // 加载品牌字体（粗体）
  const file = await readFile(join(process.cwd(), './fonts/Inter-Bold.ttf'));
  const font = Uint8Array.from(file).buffer;

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
        {/* 品牌标识卡片（纯服务端元素，不引用客户端组件） */}
        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl relative">
          {/* 纯 SVG 品牌 Logo，用于 OG 渲染 */}
          <BrandLogoOG size={128} />
          {/* 在外层以 HTML 文本显示首字母，避免 SVG <text> 不被支持的问题 */}
          {title?.trim() && (
            <div tw="absolute center text-5xl font-bold text-white">
              {title.trim().charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        {/* 标题文案 */}
        <p tw="mt-12 text-6xl font-bold text-white">{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: font,
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}
