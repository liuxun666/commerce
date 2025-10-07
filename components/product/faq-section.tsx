"use client";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { FAQ } from 'lib/types/product-page-data';

const defaultFaqs: FAQ[] = [
  { question: '如何选择合适的规格？', answer: '建议按照手围或佩戴偏好进行选择，若不确定可联系在线客服获取建议。' },
  { question: '支持哪些配送方式？', answer: '默认快递配送，全国可达。支持加固包装，确保安全送达。' },
  { question: '是否支持退换？', answer: '收到后七天内支持无理由退换，请保持商品完好并保留包装。' }
];

/**
 * FAQSectionClient 客户端组件
 * 用途：展示常见问题列表，采用 headlessui Disclosure 实现轻量交互。
 * 输入：无（内部使用静态 FAQ 数据，后续可替换为服务端数据）。
 * 输出：渲染为卡片容器，统一使用 bg-card、border-card、text-primary/secondary/muted 配色；
 *       图标颜色与 hover 动效遵循新样式系统；在 light/dark 两种模式下自动适配。
 */
export default function FAQSectionClient({ faqs }: { faqs?: FAQ[] }) {

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="rounded-3xl border border-card bg-card p-6 md:p-10">
        <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6">常见问题</h3>
        <div className="">
          {(faqs ? faqs : defaultFaqs).map((item, idx) => (
              <Disclosure key={idx}>
                {({ open }) => (
                  <div className="py-4 px-4 mb-4 rounded-xl border border-card hover:bg-[var(--surface-hover-bg)]">  
                    <DisclosureButton className="w-full flex items-center justify-between text-left">
                      <span className="text-sm font-medium text-primary transition-colors">{item.question}</span>
                      <ChevronDownIcon className={`w-5 h-5 text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 text-sm text-secondary">{item.answer}</DisclosurePanel>
                  </div>
                )}
              </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}