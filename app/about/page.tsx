import { Metadata } from 'next';

/**
 * 关于我们页面元数据
 */
export const metadata: Metadata = {
  title: '关于我们 - 东方雅韵传统摆件',
  description: '东方雅韵致力于传承和弘扬东方传统文化，精选手工制作的传统摆件，每一件作品都承载着深厚的文化内涵和匠心工艺。',
  keywords: '东方雅韵,传统文化,手工摆件,文化传承,东方美学,品牌故事',
  openGraph: {
    title: '关于我们 - 东方雅韵',
    description: '传承千年文化底蕴，匠心打造每一件东方传统摆件',
    type: 'website'
  }
};

/**
 * 关于我们页面组件
 * 展示品牌故事、文化理念和匠心工艺
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ink-50/30 to-white">
      {/* 英雄区域 */}
      <section className="py-20 bg-gradient-to-r from-ink-100/50 via-white to-gold-50/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient-ink mb-8">
            东方雅韵
          </h1>
          <p className="text-xl text-ink-700 leading-relaxed font-chinese mb-8">
            传承千年文化底蕴，匠心打造每一件东方传统摆件
          </p>
          
          {/* 装饰性分隔线 */}
          <div className="flex items-center justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent w-32"></div>
            <div className="mx-4 w-2 h-2 bg-gold-400 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent w-32"></div>
          </div>
        </div>
      </section>

      {/* 品牌故事 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gradient-ink">品牌故事</h2>
              <div className="space-y-6 text-ink-700 leading-relaxed">
                <p className="font-chinese text-lg">
                  东方雅韵诞生于对传统文化的深深眷恋与敬畏。在这个快节奏的现代社会中，
                  我们希望通过精美的传统摆件，让人们重新感受到东方文化的博大精深。
                </p>
                <p className="font-chinese text-lg">
                  每一件摆件都经过精心挑选，承载着匠人的心血与智慧。从选材到制作，
                  从设计到包装，我们都秉承着对品质的极致追求和对文化的深度理解。
                </p>
                <p className="font-chinese text-lg">
                  我们相信，真正的美不仅仅在于外表，更在于其背后所蕴含的文化内涵和精神追求。
                  东方雅韵，不仅是摆件，更是一种生活态度，一种文化传承。
                </p>
              </div>
            </div>
            
            <div className="card-oriental p-8 bg-gradient-to-br from-white to-ink-50/30">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cinnabar-500 to-cinnabar-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">韵</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-ink-800 mb-2">文化传承</h3>
                  <p className="text-ink-600 font-chinese">
                    每一件作品都是对传统文化的致敬与传承
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心价值 */}
      <section className="py-20 bg-gradient-to-r from-ink-50/30 via-white to-gold-50/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient-ink mb-6">核心价值</h2>
            <p className="text-lg text-ink-700 font-chinese max-w-3xl mx-auto">
              我们坚持以文化为根，以品质为本，以创新为翼，传承东方美学精神
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '文化传承',
                description: '深入挖掘传统文化内涵，让每件作品都有故事可讲',
                icon: '传'
              },
              {
                title: '匠心工艺',
                description: '精选优质材料，坚持手工制作，追求完美品质',
                icon: '匠'
              },
              {
                title: '创新设计',
                description: '在传承中创新，在创新中传承，让传统焕发新生',
                icon: '新'
              }
            ].map((value, index) => (
              <div key={index} className="card-oriental-hover p-8 text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-3xl font-bold">{value.icon}</span>
                </div>
                <h3 className="text-2xl font-semibold text-ink-800 mb-4">{value.title}</h3>
                <p className="text-ink-600 font-chinese leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 匠心工艺 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="card-oriental p-8 bg-gradient-to-br from-celadon-50 to-white">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gradient-ink">传统工艺</h3>
                <div className="space-y-4">
                  {[
                    '精选天然材料，确保每件作品的品质',
                    '传承古法工艺，保持传统制作技艺',
                    '手工精雕细琢，追求完美细节',
                    '严格质量把控，确保作品完美呈现'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                      <span className="text-ink-700 font-chinese">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gradient-ink">匠心工艺</h2>
              <div className="space-y-6 text-ink-700 leading-relaxed">
                <p className="font-chinese text-lg">
                  我们与经验丰富的传统工艺大师合作，确保每一件作品都承载着正宗的传统工艺。
                  从原材料的甄选到最终成品的完成，每一个环节都体现着匠人的专业与用心。
                </p>
                <p className="font-chinese text-lg">
                  传统的制作工艺不仅是技术的传承，更是文化精神的延续。
                  我们坚持使用传统工具和方法，让每件作品都散发着浓郁的文化气息。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="py-20 bg-gradient-to-r from-ink-100/50 via-white to-gold-50/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gradient-ink mb-8">联系我们</h2>
          <p className="text-lg text-ink-700 font-chinese mb-12 leading-relaxed">
            如果您对我们的产品或文化理念有任何疑问，欢迎随时与我们联系。
            我们期待与您分享更多关于东方传统文化的美好。
          </p>
          
          <div className="card-oriental p-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-ink-800 mb-4">客服邮箱</h3>
                <p className="text-ink-600">service@dongfangyayun.com</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-ink-800 mb-4">客服热线</h3>
                <p className="text-ink-600">400-888-8888</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}