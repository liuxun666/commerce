import { Metadata } from 'next';

/**
 * 关于我们页面元数据
 */
export const metadata: Metadata = {
  title: '关于我们 - 檀轩',
  description: '檀轩致力于传承和弘扬东方传统文化，精选手工制作的传统工艺品，每一件作品都承载着深厚的文化内涵和匠心工艺。',
  keywords: '檀轩,传统文化,手工艺品,文化传承,东方美学,品牌故事',
  openGraph: {
    title: '关于我们 - 檀轩',
    description: '传承千年文化底蕴，匠心打造每一件东方传统工艺品',
    type: 'website'
  }
};

/**
 * 关于我们页面组件
 * 展示品牌故事、文化理念和匠心工艺
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-shanfan-50 via-shanfan-100 to-fuguang-50 dark:from-yuepo-950 dark:via-yuepo-900 dark:to-shanfan-950">
      {/* 英雄区域 */}
      <section className="py-20 bg-gradient-to-r from-shanfan-100/50 via-white to-fuguang-50/30 dark:from-yuepo-900/50 dark:via-yuepo-800 dark:to-shanfan-900/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient-primary mb-8">
            檀轩
          </h1>
          <p className="text-xl text-shanfan-700 dark:text-shanfan-300 leading-relaxed font-chinese mb-8">
            传承千年文化底蕴，匠心打造每一件东方传统工艺品
          </p>
          
          {/* 装饰性分隔线 */}
          <div className="flex items-center justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-fuguang-400 to-transparent w-32"></div>
            <div className="mx-4 w-2 h-2 bg-fuguang-400 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-fuguang-400 to-transparent w-32"></div>
          </div>
        </div>
      </section>

      {/* 品牌故事 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gradient-primary">品牌故事</h2>
              <div className="space-y-6 text-shanfan-700 dark:text-shanfan-300 leading-relaxed">
                <p className="font-chinese text-lg">
                  檀轩诞生于对传统文化的深深眷恋与敬畏。在这个快节奏的现代社会中，
                  我们希望通过精美的传统工艺品，让人们重新感受到东方文化的博大精深。
                </p>
                <p className="font-chinese text-lg">
                  每一件工艺品都经过精心挑选，承载着匠人的心血与智慧。从选材到制作，
                  从设计到包装，我们都秉承着对品质的极致追求和对文化的深度理解。
                </p>
                <p className="font-chinese text-lg">
                  我们相信，真正的美不仅仅在于外表，更在于其背后所蕴含的文化内涵和精神追求。
                  檀轩，不仅是工艺品，更是一种生活态度，一种文化传承。
                </p>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-yuepo-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-elegant border border-shanfan-200/50 dark:border-yuepo-700/50">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-fuguang-500 to-fuguang-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">檀</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-shanfan-800 dark:text-shanfan-200 mb-2">文化传承</h3>
                  <p className="text-shanfan-600 dark:text-shanfan-400 font-chinese">
                    每一件作品都是对传统文化的致敬与传承
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心价值 */}
      <section className="py-20 bg-gradient-to-r from-fuguang-50/30 via-white to-shanfan-50/30 dark:from-fuguang-900/30 dark:via-yuepo-800 dark:to-shanfan-900/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient-primary mb-6">核心价值</h2>
            <p className="text-lg text-shanfan-700 dark:text-shanfan-300 font-chinese max-w-3xl mx-auto">
              我们坚持以文化为根，以品质为本，以创新为翼，传承东方美学精神
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '文化传承',
                description: '深入挖掘传统文化内涵，让每件作品都有故事可讲',
                icon: '传',
                color: 'fuguang'
              },
              {
                title: '匠心工艺',
                description: '精选优质材料，坚持手工制作，追求完美品质',
                icon: '匠',
                color: 'chizhi'
              },
              {
                title: '创新设计',
                description: '在传承中创新，在创新中传承，让传统焕发新生',
                icon: '新',
                color: 'shanfan'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white/60 dark:bg-yuepo-800/60 backdrop-blur-sm rounded-2xl p-8 text-center group shadow-warm hover:shadow-elegant transition-all duration-300 border border-shanfan-200/30 dark:border-yuepo-700/30">
                <div className={`w-20 h-20 bg-gradient-to-r from-${value.color}-400 to-${value.color}-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white text-3xl font-bold">{value.icon}</span>
                </div>
                <h3 className="text-2xl font-semibold text-shanfan-800 dark:text-shanfan-200 mb-4">{value.title}</h3>
                <p className="text-shanfan-600 dark:text-shanfan-400 font-chinese leading-relaxed">
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
            <div className="bg-white/80 dark:bg-yuepo-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-elegant border border-shanfan-200/50 dark:border-yuepo-700/50">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gradient-primary">传统工艺</h3>
                <div className="space-y-4">
                  {[
                    '精选天然材料，确保每件作品的品质',
                    '传承古法工艺，保持传统制作技艺',
                    '手工精雕细琢，追求完美细节',
                    '严格质量把控，确保作品完美呈现'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-fuguang-400 rounded-full"></div>
                      <span className="text-shanfan-700 dark:text-shanfan-300 font-chinese">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gradient-primary">匠心工艺</h2>
              <div className="space-y-6 text-shanfan-700 dark:text-shanfan-300 leading-relaxed">
                <p className="font-chinese text-lg">
                  檀轩秉承千年传统工艺，每一件作品都经过匠人的精心雕琢。
                  我们深信，只有用心制作的作品，才能承载深厚的文化内涵。
                </p>
                <p className="font-chinese text-lg">
                  从原材料的甄选到最终成品的呈现，每一个环节都体现着我们对品质的执着追求。
                  传统与现代的完美融合，让每件作品都成为独一无二的艺术珍品。
                </p>
                <p className="font-chinese text-lg">
                  我们不仅仅是在制作工艺品，更是在传承一种文化，一种精神，
                  让东方美学在现代生活中焕发新的光彩。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 品牌理念 */}
      <section className="py-20 bg-gradient-to-r from-shanfan-50/30 via-white to-fuguang-50/30 dark:from-shanfan-900/30 dark:via-yuepo-800 dark:to-fuguang-900/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient-primary mb-6">品牌理念</h2>
            <p className="text-lg text-shanfan-700 dark:text-shanfan-300 font-chinese max-w-3xl mx-auto">
              传承不是复制，而是在理解中创新，在创新中传承
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: '传承',
                description: '承载千年文化精髓',
                icon: '承'
              },
              {
                title: '创新',
                description: '融入现代美学理念',
                icon: '新'
              },
              {
                title: '品质',
                description: '追求完美工艺标准',
                icon: '质'
              },
              {
                title: '文化',
                description: '弘扬东方美学精神',
                icon: '文'
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-fuguang-100 to-fuguang-200 dark:from-fuguang-900/50 dark:to-fuguang-800/50 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-warm">
                  <span className="text-fuguang-600 dark:text-fuguang-400 text-4xl font-bold">{item.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-shanfan-800 dark:text-shanfan-200 mb-3">{item.title}</h3>
                <p className="text-shanfan-600 dark:text-shanfan-400 font-chinese text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使命愿景 */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gradient-primary mb-12">使命愿景</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/80 dark:bg-yuepo-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-elegant border border-shanfan-200/50 dark:border-yuepo-700/50">
              <div className="w-16 h-16 bg-gradient-to-r from-chizhi-400 to-chizhi-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">使</span>
              </div>
              <h3 className="text-2xl font-semibold text-shanfan-800 dark:text-shanfan-200 mb-4">我们的使命</h3>
              <p className="text-shanfan-600 dark:text-shanfan-400 font-chinese leading-relaxed">
                传承和弘扬东方传统文化，让每一件工艺品都成为文化的载体，
                在现代生活中重现传统之美，让更多人感受到东方文化的魅力。
              </p>
            </div>

            <div className="bg-white/80 dark:bg-yuepo-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-elegant border border-shanfan-200/50 dark:border-yuepo-700/50">
              <div className="w-16 h-16 bg-gradient-to-r from-shanfan-400 to-shanfan-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-orange-500 text-2xl font-bold">愿</span>
              </div>
              <h3 className="text-2xl font-semibold text-shanfan-800 dark:text-shanfan-200 mb-4">我们的愿景</h3>
              <p className="text-shanfan-600 dark:text-shanfan-400 font-chinese leading-relaxed">
                成为东方传统工艺品领域的引领者，让檀轩成为品质与文化的象征，
                在全球范围内传播东方美学，让世界感受中华文化的深厚底蕴。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}