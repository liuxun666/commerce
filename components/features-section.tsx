import {
  HeartIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

/**
 * 特色功能展示组件
 * 展示温润工艺品商店的核心价值和服务特色
 */
export function FeaturesSection() {
  const features = [
    {
      icon: SparklesIcon,
      title: '匠心工艺',
      description: '每件工艺品都经过资深工匠精心制作，传承千年工艺精髓',
      gradient: 'from-fuguang-500 to-fuguang-600',
      delay: '0s'
    },
    {
      icon: HeartIcon,
      title: '文化传承',
      description: '承载深厚文化内涵，让传统艺术在现代生活中焕发新生',
      gradient: 'from-chizhi-500 to-chizhi-600',
      delay: '0.1s'
    },
    {
      icon: ShieldCheckIcon,
      title: '品质保证',
      description: '严格质量把控，每件商品都经过专业鉴定和品质检验',
      gradient: 'from-fuguang-600 to-chizhi-500',
      delay: '0.2s'
    },
    {
      icon: TruckIcon,
      title: '安全配送',
      description: '专业包装，安全快递，确保您的珍品完好无损送达',
      gradient: 'from-chizhi-600 to-fuguang-700',
      delay: '0.3s'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* 区域标题 */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gradient-primary mb-6 hover-breathe">
            为什么选择我们
          </h2>
          <p className="text-xl text-shanfan-700 dark:text-shanfan-300 max-w-3xl mx-auto font-chinese leading-relaxed animate-slide-up">
            我们不仅仅是在售卖工艺品，更是在传承一种文化，一种生活态度。
            每一件作品都是对传统工艺的致敬，对美好生活的向往。
          </p>
        </div>

        {/* 特色网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card-interactive text-center p-8 group hover-float"
              style={{ 
                animationDelay: feature.delay,
                animation: `slideUp 0.6s ease-out ${feature.delay} both`
              }}
            >
              {/* 图标容器 */}
              <div className="relative mb-6 hover-wiggle">
                {/* 主图标 */}
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-elegant group-hover:shadow-glow-fuguang transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3`}>
                  <feature.icon className="w-full h-full text-shanfan-50 group-hover:animate-pulse" />
                </div>
                
                {/* 装饰性光晕 */}
                <div className={`absolute inset-0 w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 animate-pulse`} />
                
              </div>

              {/* 标题 */}
              <h3 className="text-xl font-bold text-shanfan-800 dark:text-shanfan-200 mb-4 group-hover:text-gradient-primary transition-all duration-300 hover-heartbeat">
                {feature.title}
              </h3>

              {/* 描述 */}
              <p className="text-shanfan-600 dark:text-shanfan-400 leading-relaxed font-chinese group-hover:text-shanfan-700 dark:group-hover:text-shanfan-300 transition-all duration-300">
                {feature.description}
              </p>

              {/* 底部装饰线 */}
              <div className="mt-6 w-0 group-hover:w-12 h-0.5 bg-gradient-to-r from-fuguang-500 to-chizhi-500 mx-auto transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>

        {/* 底部装饰文字 */}
        <div className="text-center mt-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="inline-block px-8 py-4 bg-shanfan-50/80 dark:bg-yuepo-900/80 backdrop-blur-md rounded-full border border-fuguang-200/50 dark:border-yuepo-700/50 shadow-elegant hover:shadow-glow-fuguang transition-all duration-500 hover-breathe cursor-pointer">
            <p className="text-shanfan-600 dark:text-shanfan-400 font-chinese tracking-widest text-gradient-secondary">
              「 以器载道，以美化人 」
            </p>
          </div>
        </div>

        {/* 装饰性几何图形 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-fuguang-200/20 to-chizhi-200/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-chizhi-200/20 to-fuguang-200/20 rounded-full blur-2xl animate-gentle-bounce" />
        </div>
      </div>
    </section>
  );
}