import { ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';

/**
 * 联系我们页面元数据
 */
export const metadata: Metadata = {
  title: '联系我们 - 檀轩',
  description: '联系檀轩，了解更多传统手工艺品信息。我们致力于为您提供最优质的服务和产品咨询。',
  keywords: '檀轩,联系方式,客户服务,传统工艺品咨询,售后服务',
  openGraph: {
    title: '联系我们 - 檀轩',
    description: '联系檀轩，了解更多传统手工艺品信息',
    type: 'website'
  }
};

/**
 * 联系我们页面组件
 * 展示联系方式、联系表单和公司信息
 */
export default function ContactPage() {
  return (
    <div className="min-h-screen ">
      {/* 英雄区域 */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient-primary mb-8">
            联系我们
          </h1>
          <p className="text-xl text-secondary leading-relaxed font-chinese mb-8">
            我们期待与您交流，为您提供最优质的服务
          </p>
          
          {/* 装饰性分隔线 */}
          <div className="flex items-center justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-fuguang-400 to-transparent w-32"></div>
            <div className="mx-4 w-2 h-2 bg-fuguang-400 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-fuguang-400 to-transparent w-32"></div>
          </div>
        </div>
      </section>

      {/* 联系信息和表单 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* 联系信息 */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-gradient-primary mb-8">联系信息</h2>
                <p className="text-lg text-secondary font-chinese leading-relaxed mb-8">
                  我们致力于传承千年匠心工艺，为每一位客户提供专业的咨询服务。无论您对我们的产品有任何疑问，或需要定制服务，都欢迎与我们联系。
                </p>
              </div>

              {/* 联系方式卡片 */}
              <div className="space-y-6">
                <div className="bg-surface rounded-2xl p-6 shadow-warm hover:shadow-elegant transition-all duration-300 border border-shanfan-200/50 dark:border-yuepo-700/50">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-card rounded-xl">
                      <PhoneIcon className="w-6 h-6 text-fuguang-600 dark:text-fuguang-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">客服热线</h3>
                      <p className="text-secondary">400-888-0000</p>
                      <p className="text-sm text-secondary mt-1">周一至周日 9:00-21:00</p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-2xl p-6 shadow-warm hover:shadow-elegant transition-all duration-300 border border-shanfan-200/50 dark:border-yuepo-700/50">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-card rounded-xl">
                      <EnvelopeIcon className="w-6 h-6 text-chizhi-600 dark:text-chizhi-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">邮箱地址</h3>
                      <p className="text-secondary">contact@tanxuan.com</p>
                      <p className="text-sm text-secondary mt-1">我们会在24小时内回复您的邮件</p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-2xl p-6 shadow-warm hover:shadow-elegant transition-all duration-300 border border-shanfan-200/50 dark:border-yuepo-700/50">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-card rounded-xl">
                      <MapPinIcon className="w-6 h-6 text-shanfan-600 dark:text-shanfan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">公司地址</h3>
                      <p className="text-secondary">北京市朝阳区工体北路8号</p>
                      <p className="text-sm text-secondary mt-1">欢迎预约参观我们的展厅</p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-2xl p-6 shadow-warm hover:shadow-elegant transition-all duration-300 border border-shanfan-200/50 dark:border-yuepo-700/50">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-card rounded-xl">  
                      <ClockIcon className="w-6 h-6 text-yuepo-600 dark:text-yuepo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">营业时间</h3>
                      <p className="text-secondary">周一至周日 10:00-19:00</p>
                      <p className="text-sm text-secondary mt-1">节假日正常营业</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 联系表单 */}
            <div className="bg-surface rounded-3xl p-8 shadow-elegant border border-shanfan-200/50 dark:border-yuepo-700/50">
              <h2 className="text-3xl font-bold text-gradient-primary mb-8">在线咨询</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                      姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-shanfan-200 dark:border-yuepo-600 bg-input focus:ring-2 focus:ring-fuguang-400 focus:border-transparent transition-all duration-200"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                      联系电话
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl border border-shanfan-200 dark:border-yuepo-600 bg-input focus:ring-2 focus:ring-fuguang-400 focus:border-transparent transition-all duration-200"
                      placeholder="请输入您的联系电话"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    邮箱地址 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-shanfan-200 dark:border-yuepo-600 bg-input focus:ring-2 focus:ring-fuguang-400 focus:border-transparent transition-all duration-200"
                    placeholder="请输入您的邮箱地址"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                    咨询主题
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-xl border border-shanfan-200 dark:border-yuepo-600 bg-input focus:ring-2 focus:ring-fuguang-400 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">请选择咨询主题</option>
                    <option value="product">产品咨询</option>
                    <option value="custom">定制服务</option>
                    <option value="after-sales">售后服务</option>
                    <option value="cooperation">合作洽谈</option>
                    <option value="other">其他问题</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    详细描述 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-shanfan-200 dark:border-yuepo-600 bg-input focus:ring-2 focus:ring-fuguang-400 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="请详细描述您的需求或问题，我们会尽快为您解答..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-4 text-lg font-semibold shadow-glow-fuguang hover:shadow-elegant-lg transition-all duration-300"
                >
                  提交咨询
                </button>
              </form>

              <p className="text-sm text-yuepo-500 dark:text-yuepo-400 mt-6 text-center">
                * 为必填项。我们承诺保护您的隐私信息，不会用于其他用途。
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}