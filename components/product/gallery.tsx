'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { GridTileImage } from 'components/grid/tile';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import Image from 'next/image';

/**
 * 商品图片画廊组件 - 温润工艺美学风格
 * 提供优雅的图片浏览体验，支持缩略图导航和手势操作
 */
export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName =
    'h-full px-6 transition-all duration-300 ease-in-out hover:scale-110 hover:text-chizhi-600 dark:hover:text-chizhi-400 flex items-center justify-center group-hover:opacity-100 opacity-70';

  return (
    <form className="w-full animate-fade-in">
      <div className="relative aspect-square h-full max-h-[600px] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-shanfan-100/80 to-fuguang-100/60 dark:from-yuepo-800/80 dark:to-shanfan-900/60 shadow-2xl border border-fuguang-200/50 dark:border-fuguang-700/30 group">
        {/* 装饰性边框 */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-fuguang-300/40 dark:border-fuguang-600/40 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-chizhi-300/40 dark:border-chizhi-600/40 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={images[imageIndex]?.src as string}
            priority={true}
          />
        )}

        {/* 图片导航控制器 */}
        {images.length > 1 ? (
          <div className="absolute bottom-[5%] flex w-full justify-center animate-slide-up">
            <div className="mx-auto flex h-12 items-center rounded-2xl border border-fuguang-200/60 dark:border-fuguang-700/60 bg-gradient-to-r from-shanfan-100/90 via-fuguang-100/80 to-shanfan-100/90 dark:from-yuepo-800/90 dark:via-shanfan-900/80 dark:to-yuepo-800/90 text-shanfan-600 dark:text-shanfan-400 backdrop-blur-md shadow-lg">
              <button
                formAction={() => {
                  const newState = updateImage(previousImageIndex.toString());
                  updateURL(newState);
                }}
                aria-label="Previous product image"
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5 w-5 animate-hover-wiggle" />
              </button>
              <div className="mx-2 h-6 w-px bg-gradient-to-b from-fuguang-300/60 to-chizhi-300/60 dark:from-fuguang-600/60 dark:to-chizhi-600/60"></div>
              <button
                formAction={() => {
                  const newState = updateImage(nextImageIndex.toString());
                  updateURL(newState);
                }}
                aria-label="Next product image"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5 w-5 animate-hover-wiggle" />
              </button>
            </div>
          </div>
        ) : null}

        {/* 图片指示器 */}
        {images.length > 1 && (
          <div className="absolute top-6 right-6 flex space-x-2 animate-fade-in">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === imageIndex
                    ? 'bg-chizhi-500 dark:bg-chizhi-400 scale-125 animate-pulse'
                    : 'bg-fuguang-300/60 dark:bg-fuguang-600/60 hover:bg-fuguang-400/80 dark:hover:bg-fuguang-500/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 缩略图导航 */}
      {images.length > 1 ? (
        <ul className="my-12 pl-2 flex items-center flex-wrap justify-begin gap-4 overflow-auto py-2 lg:mb-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={image.src} className="h-20 w-20 animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                <button
                  formAction={() => {
                    const newState = updateImage(index.toString());
                    updateURL(newState);
                  }}
                  aria-label="Select product image"
                  className={`h-full w-full rounded-3xl overflow-hidden transition-all duration-300 ${
                    isActive
                      ? 'ring-2 ring-chizhi-500 dark:ring-chizhi-400 scale-110 shadow-lg'
                      : 'ring-1 ring-fuguang-200/60 dark:ring-fuguang-700/60 hover:ring-2 hover:ring-fuguang-400/80 dark:hover:ring-fuguang-500/80 hover:scale-105'
                  }`}
                >
                  <div className="relative h-full w-full group">
                    {/* 装饰性边框 */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-fuguang-300/40 dark:border-fuguang-600/40 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-chizhi-300/40 dark:border-chizhi-600/40 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <GridTileImage
                      alt={image.altText}
                      src={image.src}
                      width={96}
                      height={96}
                      active={isActive}
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}
