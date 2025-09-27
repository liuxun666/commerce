'use client';

import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LoadingDots from 'components/loading-dots';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createCartAndSetCookie, redirectToCheckout } from './actions';
import { useCart } from './cart-context';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';
import OpenCart from './open-cart';

type MerchandiseSearchParams = {
  [key: string]: string;
};

/**
 * 购物车模态框组件 - 东方美学设计风格
 * 采用优雅的毛玻璃效果、柔和的渐变和精致的布局
 */
export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-500"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-md"
            leave="transition-all ease-in-out duration-300"
            leaveFrom="opacity-100 backdrop-blur-md"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/50 backdrop-blur-md" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-out duration-500"
            enterFrom="translate-x-full opacity-0 scale-95"
            enterTo="translate-x-0 opacity-100 scale-100"
            leave="transition-all ease-in duration-300"
            leaveFrom="translate-x-0 opacity-100 scale-100"
            leaveTo="translate-x-full opacity-0 scale-95"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-slate-200/30 bg-gradient-to-br from-white/95 via-slate-50/90 to-white/95 p-8 text-slate-800 shadow-2xl shadow-slate-900/20 backdrop-blur-xl md:w-[420px] dark:border-slate-700/30 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-slate-900/95 dark:text-slate-100 dark:shadow-black/40">
              {/* 装饰性顶部边框 */}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-slate-300/50 to-transparent dark:via-slate-600/50"></div>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg dark:from-slate-700 dark:to-slate-800">
                    <ShoppingCartIcon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-300">
                    购物车
                  </h2>
                </div>
                <button 
                  aria-label="Close cart" 
                  onClick={closeCart}
                  className="group"
                >
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="flex h-full w-full flex-col items-center justify-center space-y-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-100/80 to-slate-200/60 shadow-xl dark:from-slate-800/80 dark:to-slate-700/60">
                    <ShoppingCartIcon className="h-12 w-12 text-slate-400 dark:text-slate-500" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-xl font-semibold text-slate-600 dark:text-slate-300">
                      购物车为空
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      快去挑选心仪的商品吧
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden">
                  <ul className="grow space-y-4 overflow-auto py-2 pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300/50 dark:scrollbar-thumb-slate-600/50">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(
                          b.merchandise.product.title
                        )
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams =
                          {} as MerchandiseSearchParams;

                        item.merchandise.selectedOptions.forEach(
                          ({ name, value }) => {
                            if (value !== DEFAULT_OPTION) {
                              merchandiseSearchParams[name.toLowerCase()] =
                                value;
                            }
                          }
                        );

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams)
                        );

                        return (
                          <li
                            key={i}
                            className="group relative rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white/80 to-slate-50/40 p-4 shadow-lg shadow-slate-200/30 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-300/40 dark:border-slate-700/50 dark:from-slate-800/80 dark:to-slate-900/40 dark:shadow-slate-900/30 dark:hover:shadow-slate-900/50"
                          >
                            <div className="relative flex w-full flex-row justify-between">
                              <div className="absolute -left-2 -top-2 z-40">
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                              <div className="flex flex-row space-x-4">
                                <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-slate-200/60 bg-gradient-to-br from-slate-100 to-slate-200 shadow-md dark:border-slate-700/60 dark:from-slate-700 dark:to-slate-800">
                                  <Image
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    width={80}
                                    height={80}
                                    alt={
                                      item.merchandise.product.featuredImage
                                        .altText ||
                                      item.merchandise.product.title
                                    }
                                    src={
                                      item.merchandise.product.featuredImage.url
                                    }
                                  />
                                  {/* 图片遮罩效果 */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                </div>
                                <Link
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className="z-30 flex flex-1 flex-col justify-center space-y-1"
                                >
                                  <div className="flex flex-1 flex-col">
                                    <span className="font-medium leading-tight text-slate-800 transition-colors duration-200 hover:text-slate-600 dark:text-slate-100 dark:hover:text-slate-300">
                                      {item.merchandise.product.title}
                                    </span>
                                    {item.merchandise.title !==
                                    DEFAULT_OPTION ? (
                                      <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {item.merchandise.title}
                                      </p>
                                    ) : null}
                                  </div>
                                </Link>
                              </div>
                              <div className="flex flex-col items-end justify-between space-y-3">
                                <Price
                                  className="text-right text-lg font-semibold text-slate-800 dark:text-slate-100"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={
                                    item.cost.totalAmount.currencyCode
                                  }
                                />
                                <div className="flex h-10 flex-row items-center rounded-full border border-slate-200/60 bg-gradient-to-r from-white/80 to-slate-50/60 shadow-md backdrop-blur-sm dark:border-slate-700/60 dark:from-slate-800/80 dark:to-slate-700/60">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-8 text-center">
                                    <span className="font-medium text-slate-700 dark:text-slate-200">
                                      {item.quantity}
                                    </span>
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  
                  {/* 结算区域 */}
                  <div className="mt-6 space-y-4 rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white/90 to-slate-50/70 p-6 shadow-xl backdrop-blur-sm dark:border-slate-700/50 dark:from-slate-800/90 dark:to-slate-900/70">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 dark:border-slate-700/60">
                        <p className="text-slate-600 dark:text-slate-400">税费</p>
                        <Price
                          className="font-medium text-slate-800 dark:text-slate-100"
                          amount={cart.cost.totalTaxAmount.amount}
                          currencyCode={cart.cost.totalTaxAmount.currencyCode}
                        />
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 dark:border-slate-700/60">
                        <p className="text-slate-600 dark:text-slate-400">运费</p>
                        <p className="text-slate-600 dark:text-slate-400">结算时计算</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">总计</p>
                        <Price
                          className="text-lg font-bold text-slate-900 dark:text-slate-50"
                          amount={cart.cost.totalAmount.amount}
                          currencyCode={cart.cost.totalAmount.currencyCode}
                        />
                      </div>
                    </div>
                    <form action={redirectToCheckout} className="mt-6">
                      <CheckoutButton />
                    </form>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

/**
 * 关闭购物车按钮组件
 */
function CloseCart({ className }: { className?: string }) {
  return (
    <div className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/60 bg-gradient-to-br from-white/90 to-slate-50/80 text-slate-600 shadow-lg shadow-slate-200/40 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-slate-300/80 hover:shadow-xl hover:shadow-slate-300/50 dark:border-slate-700/60 dark:from-slate-800/90 dark:to-slate-900/80 dark:text-slate-300 dark:shadow-slate-900/40 dark:hover:border-slate-600/80 dark:hover:shadow-slate-900/60">
      <XMarkIcon
        className={clsx(
          'h-5 w-5 transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-90',
          className
        )}
      />
      {/* 悬浮时的光晕效果 */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-slate-200/20 to-slate-300/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100 dark:from-slate-600/20 dark:to-slate-700/20"></div>
    </div>
  );
}

/**
 * 结算按钮组件
 */
function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 p-4 font-semibold text-white shadow-xl shadow-slate-800/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-800/40 disabled:cursor-not-allowed disabled:opacity-60 dark:from-slate-600 dark:via-slate-500 dark:to-slate-600 dark:shadow-slate-900/50"
      type="submit"
      disabled={pending}
    >
      {/* 按钮背景动画 */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]"></div>
      
      {/* 按钮内容 */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {pending ? (
          <LoadingDots className="bg-white" />
        ) : (
          <span>前往结算</span>
        )}
      </div>
      
      {/* 装饰性边框 */}
      <div className="absolute inset-0 rounded-2xl border border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </button>
  );
}
